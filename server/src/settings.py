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


def get_currency_api_url():
    return f'https://v6.exchangerate-api.com/v6/{os.environ.get("CURRENCY_API_KEY")}/latest/BRL'


def get_aws_access_key_id():
    return os.environ.get('AWS_ACCESS_KEY_ID')


def get_aws_secret_access_key():
    return os.environ.get('AWS_SECRET_ACCESS_KEY')


def get_redis_url():
    return os.environ.get('REDIS_URL')