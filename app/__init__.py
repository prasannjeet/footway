from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO

# Create the Flask-SocketIO app
socketio = SocketIO()

def create_app():
    app = Flask(
        __name__,
        static_folder='../frontend',
        static_url_path='/'
    )

    # Allow CORS for all origins and methods
    CORS(app)

    # Register blueprints
    from app.routes import main
    app.register_blueprint(main)

    # Initialize SocketIO with logging enabled for debugging
    socketio.init_app(app, cors_allowed_origins="*", logger=True, engineio_logger=True)

    return app