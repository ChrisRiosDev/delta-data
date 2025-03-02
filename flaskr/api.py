# flaskr/api.py
from flask import Blueprint, jsonify, request
from flaskr.db import get_db

bp = Blueprint('api', __name__, url_prefix='/api')

@bp.route('/credito', methods=['GET'])
def get_posts():
    # Obtiene la lista de creditos ortorgados
    db = get_db()
    creditos = db.execute(
        'SELECT * FROM credito').fetchall()    
    # Convertir la lista de creditos a un diccionario
    creditos = [dict(row) for row in creditos]
    return jsonify(creditos)

@bp.route('/credito/<int:id>', methods=['GET'])
def get_post(id):
    # Obtiene un credito en particular
    db = get_db()
    credito = db.execute(
        'SELECT * FROM credito WHERE id = ?', (id,)
    ).fetchone()
    return jsonify(dict(credito))

@bp.route('/credito', methods=['POST'])
def create_post():
    # Crea un nuevo credito
    data = request.json
    db = get_db()
    db.execute(
        'INSERT INTO credito (cliente, monto, tasa_interes, plazo) VALUES (?, ?, ?, ?)',
        (
            data['cliente'],
            data['monto'], 
            data['tasa_interes'], 
            data['plazo'], 
        )
    )
    db.commit()
    return jsonify({'message': 'Credito creado'}), 201

@bp.route('/credito/<int:id>', methods=['PUT'])
def update_post(id):
    # Actualiza un credito
    data = request.json
    db = get_db()
    db.execute(
        'UPDATE credito SET cliente = ?, monto = ?, tasa_interes = ?, plazo = ?'
        ' WHERE id = ?',
        (
            data['cliente'],
            data['monto'], 
            data['tasa_interes'], 
            data['plazo'],  
            id
        )
    )
    db.commit()
    return jsonify({'message': 'Credito actualizado'})

@bp.route('/credito/<int:id>', methods=['DELETE'])
def delete_post(id):
    # Elimina un credito
    db = get_db()
    db.execute('DELETE FROM credito WHERE id = ?', (id,))
    db.commit()
    return jsonify({'message': 'Credito eliminado'})