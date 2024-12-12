import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def load_env_var(key):
    value = os.getenv(key)
    if not value:
        raise EnvironmentError(f"Environment variable '{key}' is not set.")
    return value