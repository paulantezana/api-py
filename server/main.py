"""Inicializacion"""

from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from app.routes import api1

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "SBl^#zZB7H1BN4fo"
jwt = JWTManager(app)


@app.before_request
@jwt_required(optional=True)
def protected_routes_middleware():
    """middleware"""
    requested_route = request.path
    current_user = get_jwt_identity()
    allowed_routes = ['/api/v1/user/login']

    if requested_route not in allowed_routes and not current_user:
        return jsonify({'message': 'Authentication required', "success": False, "result": []}), 401


if __name__ == '__main__':
    app.register_blueprint(api1)
    app.before_request(protected_routes_middleware)
    app.run(debug=True)
