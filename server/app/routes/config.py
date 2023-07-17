"""
User routes
"""

from flask import Blueprint, jsonify, request
from app.models.MenuRecord import MenuRecord
from app.models.ActionRecord import ActionRecord
from app.models.UserRecord import UserRecord
from app.services.Database import get_connection
from app.entities.Result import Result

config = Blueprint('config', __name__, url_prefix='/config')


@config.route('/init', methods=['POST'])
def init():
    """Gent initial settings"""
    res = Result()
    data = request.get_json()
    connection = get_connection()

    menu_model = MenuRecord(connection=connection)
    user_model = UserRecord(connection=connection)

    user = user_model.get_by_id(data['user_id'])
    menus = menu_model.get_all_and_screen()

    res.success = True
    res.result =  {
        'user': user,
        'menus': menus,
    }

    return jsonify(res.__dict__), 200

@config.route('/actions', methods=['POST'])
def screen():
    """Get screen properties"""
    res = Result()
    data = request.get_json()
    connection = get_connection()

    action_model = ActionRecord(connection=connection)
    actions = action_model.get_all_by_screen_id_auth(data['screen_id'])

    res.success = True
    res.result = actions

    return jsonify(res.__dict__), 200

