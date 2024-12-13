from flask import Blueprint, jsonify, request
from app.services import fetch_filters

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