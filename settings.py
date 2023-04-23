import os


def get_api_key_amadeus():
    return os.environ.get('API_KEY_AMADEUS')


def get_api_secret_amadeus():
    return os.environ.get('API_SECRET_AMADEUS')
