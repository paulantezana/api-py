"""
User routes
"""

from flask import Blueprint, jsonify, request
from app.models.ScreenEntity import ScreenEntity
from app.services.Database import get_connection

screen_entity = Blueprint('screen_entity', __name__, url_prefix='/screenentity')

@screen_entity.route('/paginate/properties', methods=['POST'])
def paginate_properties():
    """Paginate properties"""
    data = request.get_json()
    connection = get_connection()

    entity = ScreenEntity(connection)
    paginate_header = entity.paginate_header(screen_id = data['screen_id'])

    result = {
        'header': paginate_header,
        # 'actions': data['screen_id'],
    }

    return jsonify(result)

@screen_entity.route('/paginate', methods=['POST'])
def paginate():
    """Paginate data"""
    data = request.get_json()
    connection = get_connection()

    entity = ScreenEntity(connection=connection)
    page = entity.paginate(page_request = data, screen_id = 1)

    return jsonify(page)

@screen_entity.route('/insertorupdate', methods=['POST'])
def insert_or_update():
    """insert or update"""
    data = request.get_json()