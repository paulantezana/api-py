"""
User routes
"""

from flask import Blueprint, jsonify, request
from app.models.ScreenEntityRecord import ScreenEntityRecord
from app.services.Database import get_connection

screen_entity = Blueprint('screen_entity', __name__,
                          url_prefix='/screenentity')


@screen_entity.route('/paginate/properties', methods=['POST'])
def paginate_properties():
    """Paginate properties"""
    data = request.get_json()
    connection = get_connection()

    entity = ScreenEntityRecord(connection)
    paginate_header = entity.paginate_header(screen_id=data['screen_id'])

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

    entity = ScreenEntityRecord(connection=connection)
    page = entity.dynamic_paginate(page_request=data)

    return jsonify(page)


@screen_entity.route('/insertorupdate', methods=['POST'])
def insert_or_update():
    """insert or update"""
    data = request.get_json()
    connection = get_connection()

    entity_model = ScreenEntityRecord(connection=connection)

    # if data['entity']['id'] > 0:
    #     entity_model.dynamic_update(data['entity'], data['screen_id'])
    # else:
    result = entity_model.dynamic_insert(data['entity'], data['screen_id'])

    return jsonify(result)
