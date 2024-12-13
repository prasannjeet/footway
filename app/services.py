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

    # Make the API request with query parameters
    response = requests.get(API_URL, headers=headers, params=query_params)
    response.raise_for_status()  # Raise an error if the request fails

    # Process the response
    data = response.json()

    # Post-process the data
    processed_data = process_filters(data)
    return processed_data

def process_filters(data):

    # Ensure `data` is not None
    if not data or not isinstance(data, dict):
        raise ValueError("Invalid or empty data received from the API")

    # Remove totalItems property if present
    data.pop("totalItems", None)

    # Remove merchants property if present
    data.pop("merchants", None)

    # Process vendors: sort by count (highest first), take top 10
    if "vendors" in data and data["vendors"] and "values" in data["vendors"]:
        vendors = data["vendors"].get("values", [])
        if vendors:
            vendors = sorted(vendors, key=lambda x: x.get("count", 0), reverse=True)[:10]
            vendors = filter_items(vendors)  # Remove items with empty or null "name"
            data["vendors"]["values"] = vendors

    # Rename departments to available_for
    if "departments" in data and data["departments"]:
        departments = data.pop("departments")
        if isinstance(departments, dict):
            departments["values"] = filter_items(departments.get("values", []))  # Filter items
            data["available_for"] = departments
        else:
            data["available_for"] = {"values": []}  # Default empty structure

    # # Process productGroups: randomly pick 10 items if more than 10
    # if "productGroups" in data and data["productGroups"] and "values" in data["productGroups"]:
    #     product_groups = data["productGroups"].get("values", [])
    #     if len(product_groups) > 10:
    #         product_groups = sample(product_groups, 10)
    #     product_groups = filter_items(product_groups)  # Remove items with empty or null "name"
    #     data["productGroups"]["values"] = product_groups

    # Rename productTypes to category
    if "productTypes" in data and data["productTypes"]:
        product_types = data.pop("productTypes")
        if isinstance(product_types, dict):
            product_types["values"] = filter_items(product_types.get("values", []))  # Filter items
            data["category"] = product_types
        else:
            data["category"] = {"values": []}  # Default empty structure

    # Rename productGroups to subCategory
    if "productGroups" in data and data["productGroups"]:
        sub_category = data.pop("productGroups")
        if isinstance(sub_category, dict):
            sub_category["values"] = filter_items(sub_category.get("values", []))  # Filter items
            data["subCategory"] = sub_category
        else:
            data["subCategory"] = {"values": []}  # Default empty structure

    # Rename vendors to brands
    if "vendors" in data and data["vendors"]:
        brands = data.pop("vendors")
        if isinstance(brands, dict):
            brands["values"] = filter_items(brands.get("values", []))  # Filter items
            data["brands"] = brands
        else:
            data["brands"] = {"values": []}  # Default empty structure

    return data

def filter_items(items):
    return [item for item in items if item.get("name")]