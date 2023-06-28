"""
User routes
"""

from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from app.models.UserRecord import UserRecord
from app.entities.Result import Result
from app.services.Database import get_connection

user = Blueprint('user', __name__, url_prefix='/user')


@user.route('/login', methods=['POST'])
def login():
    """Login user"""
    res = Result()
    data = request.get_json()
    connection = get_connection()

    user_record = UserRecord(connection)
    user_data = user_record.login(data['userName'], data['password'])

    if user_data is None:
        res.success = False
        res.message = 'Invalid username or password'
        return jsonify(res.__dict__), 401

    token = create_access_token(identity=user_data['id'])

    res.success = True
    res.result = {'user': {'id': user_data['id']}, 'token': token}
    res.message = 'Login success'

    return jsonify(res.__dict__), 200
