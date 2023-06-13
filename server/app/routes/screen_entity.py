"""
User routes
"""

from flask import Blueprint, jsonify, request
from app.models.screen_entity import ScreenEntity

screen_entity = Blueprint('screen_entity', __name__,
                          url_prefix='/screenentity')


@screen_entity.route('/paginate/properties', methods=['POST'])
# @screen_entity.route('/paginate/properties')
def paginate_properties():
    """Paginate properties"""
    data = request.get_json()

    print("sssssssssssssssssssssssss");

    entity = ScreenEntity()
    paginate_header = entity.paginate_header(screen_id=1)

    data = {
        'header': paginate_header,
        # 'actions': data.screen_id
    }

    return jsonify(data)
