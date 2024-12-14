from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(
        __name__,
        static_folder='../frontend',  # Serve the React frontend build files
        static_url_path='/'         # Serve static files at the root URL
    )

    # Allow CORS for all origins and methods
    CORS(app)  # No restrictions on CORS

    # Register blueprints
    from app.routes import main
    app.register_blueprint(main)

    return app