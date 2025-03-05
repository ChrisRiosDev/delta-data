# flaskr/api.py
from flask import Blueprint, jsonify, request
from flaskr.db import get_db
from datetime import datetime

bp = Blueprint('api', __name__, url_prefix='/api')

def validacion_datos(data):
    # Validación de datos de entrada
    tipos = {
        'cliente': {'requerido': True, 'tipo': str},
        'monto': {'requerido': True, 'tipo': (int, float)},
        'tasa_interes': {'requerido': True, 'tipo': (int, float)},
        'plazo': {'requerido': True, 'tipo': int},
    }

    for dato in data:
        if dato in tipos:
            if tipos[dato]['requerido'] and (data[dato] is None):
                return f'{dato} es requerido', 400
            if not isinstance(data[dato], tipos[dato]['tipo']):
                return f'{dato} debe ser tipo {tipos[dato]['tipo']}', 400

    if 'fecha_otorgamiento' in data:
        fecha_otorgamiento = data['fecha_otorgamiento']

        try:
            datetime.strptime(fecha_otorgamiento, '%Y-%m-%d') # Formato de fecha esperado
        except ValueError:
            return 'Formato de fecha_otorgamiento inválido (YYYY-MM-DD)', 400

    return 'message', 'OK', 200

@bp.route('/credito', methods=['GET'])
def listar_creditos():
    # Obtiene la lista de creditos ortorgados
    db = get_db()
    creditos = db.execute(
        'SELECT * FROM credito ORDER BY fecha_otorgamiento DESC').fetchall()
    # Convertir la lista de creditos a un diccionario
    creditos = [dict(row, 
        fecha_otorgamiento=row['fecha_otorgamiento'].strftime('%Y-%m-%d')) 
        for row in creditos]
    return jsonify(creditos)

@bp.route('/credito/<int:id>', methods=['GET'])
def obtener_credito(id):
    # Obtiene un credito en particular
    db = get_db()
    credito = db.execute(
        'SELECT * FROM credito WHERE id = ?', (id,)
    ).fetchone()
    return jsonify(dict(credito))

@bp.route('/credito', methods=['POST'])
def crear_credito():
    # Crea un nuevo credito
    data = request.json
    
    # Evaluar datos validos
    validacion = validacion_datos(data)
    if validacion[1] == 400:
        return jsonify({'error': validacion[0]}), 400
    
    db = get_db()
    db.execute(
        'INSERT INTO credito (cliente, monto, tasa_interes, plazo, fecha_otorgamiento) VALUES (?, ?, ?, ?, ?)',
        (
            data['cliente'],
            data['monto'], 
            data['tasa_interes'], 
            data['plazo'], 
            data['fecha_otorgamiento'],
        )
    )
    db.commit()
    return jsonify({'message': 'Credito creado'}), 201

@bp.route('/credito/<int:id>', methods=['PUT'])
def actualizar_credito(id):
    # Actualiza un credito
    data = request.json
    
    # Evaluar datos validos
    validacion = validacion_datos(data)
    if validacion[1] == 400:
        return jsonify({'error': validacion[0]}), 400

    db = get_db()
    db.execute(
        'UPDATE credito SET cliente = ?, monto = ?, tasa_interes = ?, plazo = ?, fecha_otorgamiento = ?'
        ' WHERE id = ?',
        (
            data['cliente'],
            data['monto'], 
            data['tasa_interes'], 
            data['plazo'],  
            data['fecha_otorgamiento'],
            id
        )
    )
    db.commit()
    return jsonify({'message': 'Credito actualizado'})

@bp.route('/credito/<int:id>', methods=['DELETE'])
def borrar_credito(id):
    # Elimina un credito
    db = get_db()
    db.execute('DELETE FROM credito WHERE id = ?', (id,))
    db.commit()
    return jsonify({'message': 'Credito eliminado'})