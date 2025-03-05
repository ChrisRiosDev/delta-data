# Examen práctico: Delta Data 

Este repositorio contiene el código generado para crear un API en Flask con SQLite.
También contiene el diseño de 2 interfaces:
1. CRUD para un conjunto de créditos.
2. Gráfica para visualización de montos otorgados.

## Estructura de datos

Un crédito tiene los siguientes datos los cuales estructuran la tabla en SQL:
- **id**: INTEGER
- **cliente**: TEXT
- **monto**: NUMERIC
- **tasa_interes**: NUMERIC
- **plazo**: INTEGER
- **fecha_otorgamiento**: DATE

>Nota: La estructura anterior se define en `flaskr/schema.sql`

## Endpoints

- **/ (Home)**
Muestra la interfaz para el CRUD de créditos.

![image](https://github.com/user-attachments/assets/82d176cf-1164-42af-b850-8b8598c8f873)

- **/dashboard**
Muestra una gráfica con la distribución de montos.

![image](https://github.com/user-attachments/assets/6a8af26f-ff81-4dc6-a17e-a015b3affa7a)


### API

- **/api/credito/ GET**
Obtiene la lista de créditos ordenados por fecha.

- **/api/credito/id GET**
Retorna los datos de un crédito en específico.

- **/api/credito/ POST**
Operación para crear un registro de crédito.

- **/api/credito/id PUT**
Operación para actualizar un crédito en la base de datos.

- **/api/credito/id DELETE**
Elimina un crédito de la base de datos.

## Instrucciones para ejecutar
Las siguientes instrucciones son para ejecutar el proyecto en una máquina local.

**1. Requisitos**
Contar con python 3 instalado.

**2. Crear un entorno virtual**

Ejecute el siguiente comando para crear un entorno virtual. El cuál nos permitirá crear un entorno de Python aislado de otros proyectos.

```
python -m venv .venv
```

Una vez creado podrá activarlos con el siguiente comando:

**MacOS/Linux**
```
. .venv/bin/activate
```
**Windows**
```
.venv\Scripts\activate
```

**3. Instalar Flask**

Con el entorno virtual activo deberá instalar Flask a traés de pip.

```
pip install Flask
```

**4. Inicializar la base de datos**

El proyecto está listo para ser ejecutado, pero es necesario inicializar la base de datos para que se creen la tabla de créditos.

```
flask --app flaskr init-db
```

**5. Ejecutar el proyecto**

Como último paso solo queda ejecutar el comando para levantar el servicio con Flask, para ello se usa el comando flask.

```
flask --app flaskr run
```
- **Servidor visible**
Si desea que el servicio sea visible en otras máquinas que se encuentran en la red será necesario que agregue la siguiente opción al comando anteriro `--host=0.0.0.0`.
- **Debug Mode**
Permite que al ocurrir algún error se muestre la depuración en el navegador. Solo basta con agregar `--debug`.
