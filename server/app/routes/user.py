"""
User routes
"""

from flask import Blueprint, jsonify
from app.models.screen_entity import ScreenEntity

user = Blueprint('user', __name__)


class Result:
    def __init__(self, success, message, data=None):
        self.success = success
        self.message = message
        self.data = data


@user.route('/')
def get_users():
    screenEntity = ScreenEntity()
    data = screenEntity.get_all()

    result = Result(
        success=True, message='Users retrieved successfully', data=data)

    return jsonify(result.__dict__), 200
