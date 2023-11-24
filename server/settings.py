from dotenv import load_dotenv
import os

load_dotenv()


def get_api_key_amadeus():
    return os.environ.get('KEY_AMADEUS')


def get_secret_amadeus():
    return os.environ.get('SECRET_AMADEUS')


if __name__ == '__main__':
    print(get_api_key_amadeus())
    print(get_secret_amadeus())
