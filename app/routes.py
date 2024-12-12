from flask import Blueprint, jsonify, request
from app.services import fetch_filters

main = Blueprint('main', __name__)

@main.route('/api/filters', methods=['GET'])
def get_filters():
    # Get query parameters from the request
    query_params = request.args.to_dict(flat=False)  # Supports array parameters (e.g., string[])

    # Fetch the filters with the provided query parameters
    filters = fetch_filters(query_params)
    return jsonify(filters)