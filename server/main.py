"""Inicializacion"""

from flask import Flask
from app.routes

app = Flask(__name__)

if __name__ == '__main__':
    app.register_blueprint(user)
    app.run(debug=True)