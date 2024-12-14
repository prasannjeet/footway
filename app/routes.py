from flask import Blueprint, jsonify, request
from app.services import fetch_filters, fetch_inventory

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

    # Fetch the filters with the cleaned query parameters
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
    return jsonify(search_results)