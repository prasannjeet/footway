from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    # Allow CORS for all origins and methods
    CORS(app, resources={r"/*": {"origins": "*"}})

    # Register blueprints
    from app.routes import main
    app.register_blueprint(main)

    return app