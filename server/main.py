"""Inicializacion"""

from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from app.routes import api1

app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = "SBl^#zZB7H1BN4fo"
jwt = JWTManager(app)

if __name__ == '__main__':
    app.register_blueprint(api1)
    # app.before_request(protected_routes_middleware)
    app.run(debug=True)
