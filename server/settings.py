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

if __name__ == '__main__':
    print(get_key_amadeus())
    print(get_secret_amadeus())
    print(get_jwt_key())
    print(get_mongo_url())
