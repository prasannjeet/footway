import os
from flask import Blueprint, jsonify, request, send_from_directory, current_app

from app import socketio
from app.services import fetch_filters, fetch_inventory
from app.in_memory_store import InMemoryStore  # Import the singleton class

main = Blueprint('main', __name__)

@main.route('/api/filters', methods=['GET'])
def get_filters():
    # Get query parameters from the request as a flat dictionary (single string for each key)
    query_params = request.args.to_dict(flat=True)  # Converts array-like parameters to single strings

    # Clean query parameters by removing null, empty values, or "xx"
    if query_params:
        query_params = {
            key: value for key, value in query_params.items()
            if value not in (None, "", "xx")  # Remove null, empty string, or "xx"
        }

    print('Query Params:')
    print(query_params)
    filters = fetch_filters(query_params)
    return jsonify(filters)


@main.route('/api/search', methods=['GET'])
def search_inventory():
    # Get query parameters from the request as a flat dictionary (single string for each key)
    query_params = request.args.to_dict(flat=True)  # Converts array-like parameters to single strings

    # Clean query parameters by removing null, empty values, or "xx"
    if query_params:
        query_params = {
            key: value for key, value in query_params.items()
            if value not in (None, "", "xx")  # Remove null, empty string, or "xx"
        }

    print('Query Params for Search:')
    print(query_params)

    # Fetch the search results with the cleaned query parameters
    search_results = fetch_inventory(query_params)

    # Update in-memory store
    store = InMemoryStore.get_instance()
    store.set_data('last_search', search_results)

    # Emit updated data to all connected WebSocket clients
    socketio.emit('update', store.get_all_data())

    # Extract unique values for size, productGroup, and department
    unique_sizes = list({item['size'] for item in search_results['items'] if 'size' in item})
    unique_product_groups = list({item['productGroup'] for item in search_results['items'] if 'productGroup' in item})
    unique_departments = list({item['department'] for item in search_results['items'] if 'department' in item})

    # Return the unique values in the API response
    return jsonify({
        'size': unique_sizes,
        'productGroup': unique_product_groups,
        'department': unique_departments
    })

@main.route('/', defaults={'path': ''})
@main.route('/<path:path>')
def serve_react(path):
    # Get the absolute path to the 'frontend' folder
    frontend_folder = os.path.join(current_app.root_path, '..', 'frontend')

    # Serve files from 'frontend/assets' folder if requested
    if path.startswith('assets'):
        return send_from_directory(os.path.join(frontend_folder, 'assets'), path[len('assets/'):])

    # Serve other static files (e.g., index.html)
    if path == '' or not os.path.exists(os.path.join(frontend_folder, path)):
        return send_from_directory(frontend_folder, 'index.html')

    # Serve other files directly
    return send_from_directory(frontend_folder, path)