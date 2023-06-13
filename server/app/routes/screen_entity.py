"""
User routes
"""

from flask import Blueprint, jsonify
from app.models.screen_entity import ScreenEntity

screen_entity = Blueprint('screen_entity', __name__,
                          url_prefix='/screenentity')


@screen_entity.route('/paginate/properties')
def paginate_properties():
    """Paginate properties"""
    
    screenEntity = ScreenEntity()
    paginate_header = screenEntity.paginate_header()

    # result = Result(
    #     success=True, message='Users retrieved successfully', data=data)

    data = {
        'header': paginate_header,
        'actions': []
    }

    return jsonify(data)
