import eventlet
eventlet.monkey_patch()

from app import create_app, socketio

app = create_app()

if __name__ == '__main__':
    # Use eventlet as the server for Flask-SocketIO
    socketio.init_app(app, cors_allowed_origins="*", logger=True, engineio_logger=True)
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)