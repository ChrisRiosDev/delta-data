import os

from flask import Flask, render_template, jsonify


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/dashboard')
    def dashboard():
        with app.test_client() as client:
            response = client.get('/api/credito')
            if response.status_code != 200:
                return jsonify({'error': 'Falla interna al obtener datos'}), 500

            creditos = response.get_json()
            montos = [credito['monto'] for credito in creditos]
            
            return render_template('dashboard.html', montos=montos)

    # Registrar funciones de bases de datos
    from . import db
    db.init_app(app)

    # Registrar funciones de api
    from . import api
    app.register_blueprint(api.bp)

    return app

