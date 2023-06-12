"""
User routes
"""

from flask import Blueprint

user = Blueprint('user', __name__)

@user.route('/')
def get_users():
    # print('homs')
    return 'hola'
