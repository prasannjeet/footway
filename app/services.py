import os
import requests
from random import sample
from app.utils import load_env_var

API_URL = "https://api.footwayplus.com/v1/inventory/availableFilters"

def fetch_filters(query_params=None):
    # Load API key from environment variable
    api_key = load_env_var("API_KEY")

    # Prepare headers
    headers = {
        "X-API-KEY": api_key,
        "Content-Type": "application/json"
    }

    # Clean query parameters by removing null, empty values, or empty arrays
    if query_params:
        query_params = {
            key: value for key, value in query_params.items()
            if value not in (None, "", [])  # Remove null, empty string, or empty list
        }

    # Make the API request with query parameters
    response = requests.get(API_URL, headers=headers, params=query_params)
    response.raise_for_status()  # Raise an error if the request fails

    # Process the response
    data = response.json()

    # Post-process the data
    processed_data = process_filters(data)
    return processed_data

def process_filters(data):
    # Helper function to filter out items with empty or null "name"
    def filter_items(items):
        return [item for item in items if item.get("name")]

    # Remove totalItems property
    data.pop("totalItems", None)

    # Remove merchants property
    data.pop("merchants", None)

    # Process vendors: sort by count (highest first), take top 10
    if "vendors" in data and "values" in data["vendors"]:
        vendors = data["vendors"]["values"]
        vendors = sorted(vendors, key=lambda x: x.get("count", 0), reverse=True)[:10]
        vendors = filter_items(vendors)  # Remove items with empty or null "name"
        data["vendors"]["values"] = vendors

    # Rename departments to available_for
    if "departments" in data:
        departments = data.pop("departments")
        departments["values"] = filter_items(departments.get("values", []))  # Filter items
        data["available_for"] = departments

    # # Process productGroups: randomly pick 10 items if more than 10
    # if "productGroups" in data and "values" in data["productGroups"]:
    #     product_groups = data["productGroups"]["values"]
    #     if len(product_groups) > 10:
    #         product_groups = sample(product_groups, 10)
    #     product_groups = filter_items(product_groups)  # Remove items with empty or null "name"
    #     data["productGroups"]["values"] = product_groups

    # Rename productTypes to category
    if "productTypes" in data:
        product_types = data.pop("productTypes")
        product_types["values"] = filter_items(product_types.get("values", []))  # Filter items
        data["category"] = product_types

    # Rename productGroups to subCategory
    if "productGroups" in data:
        sub_category = data.pop("productGroups")
        sub_category["values"] = filter_items(sub_category.get("values", []))  # Filter items
        data["subCategory"] = sub_category

    # Rename vendors to brands
    if "vendors" in data:
        brands = data.pop("vendors")
        brands["values"] = filter_items(brands.get("values", []))  # Filter items
        data["brands"] = brands

    return data

def filter_items(items):
    return [item for item in items if item.get("name")]