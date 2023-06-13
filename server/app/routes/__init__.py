"""
API  V1
"""

from flask import Blueprint
from flask_cors import CORS
from . import user

api1 = Blueprint('api1', __name__, url_prefix='/api/v1')
cors = CORS(api1, resources={r"/*": {"origins": "*"}})

api1.register_blueprint(user.user)
