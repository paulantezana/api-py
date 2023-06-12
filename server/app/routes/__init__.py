"""
API  V1
"""

from flask import Blueprint
from . import user

api1 = Blueprint('api1', __name__, url_prefix='/api/v1')

api1.register_blueprint(user.user)
