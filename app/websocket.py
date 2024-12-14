from flask_socketio import emit
from app import socketio  # Import the `socketio` instance from the main app
from app.in_memory_store import InMemoryStore

@socketio.on('connect')
def handle_connect():
    print("Client connected:", socketio.server.environ.get('REMOTE_ADDR'))
    # Fetch initial data from InMemoryStore and send to the client
    store = InMemoryStore.get_instance()
    data = store.get_all_data()
    if data:  # Only emit if data exists
        emit('update', data)
    else:
        emit('update', {'message': 'No data available'})

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')