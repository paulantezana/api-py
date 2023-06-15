"""
API  V1
"""

from flask import Blueprint
from flask_cors import CORS
from . import user, screen_entity, config

api1 = Blueprint('api1', __name__, url_prefix='/api/v1')
cors = CORS(api1, resources={r"/*": {"origins": "*"}})

api1.register_blueprint(config.config)
api1.register_blueprint(user.user)
api1.register_blueprint(screen_entity.screen_entity)
