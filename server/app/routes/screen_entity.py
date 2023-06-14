"""
User routes
"""

from flask import Blueprint, jsonify, request
from app.models.screen_entity import ScreenEntity

screen_entity = Blueprint('screen_entity', __name__,
                          url_prefix='/screenentity')


@screen_entity.route('/paginate/properties', methods=['POST'])
def paginate_properties():
    """Paginate properties"""
    data = request.get_json()

    entity = ScreenEntity()
    paginate_header = entity.paginate_header(screen_id = data['screen_id'])

    result = {
        'header': paginate_header,
        # 'actions': data['screen_id'],
    }

    return jsonify(result)
def paginate():
    """Paginate data"""
    data = request.get_json()

    entity = ScreenEntity()
    page = entity.paginate(page_request = data, screen_id = 1)

    return jsonify(page)
