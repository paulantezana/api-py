"""Inicializacion"""

from flask import Flask
from app.routes import api1

app = Flask(__name__)

if __name__ == '__main__':
    app.register_blueprint(api1)
    app.run(debug=True)