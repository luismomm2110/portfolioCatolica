from dotenv import load_dotenv
import os

load_dotenv()


def get_key_amadeus():
    return os.environ.get('AMADEUS_KEY')


def get_secret_amadeus():
    return os.environ.get('AMADEUS_SECRET')


def get_jwt_key():
    return os.environ.get('JWT_KEY')


def get_mongo_url():
    return os.environ.get('MONGO_URL')


def get_currency_api_key():
    return os.environ.get('CURRENCY_API_KEY')
