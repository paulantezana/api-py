"""
User routes
"""

from flask import Blueprint, jsonify, request
from app.models.Menu import Menu
from app.services.Database import get_connection

config = Blueprint('config', __name__, url_prefix='/config')


@config.route('/init', methods=['POST'])
def paginate_properties():
    """Paginate properties"""
    connection = get_connection()
    menu_model = Menu(connection=connection)
    menus = menu_model.get_all()

    return jsonify({"menu": menus})

