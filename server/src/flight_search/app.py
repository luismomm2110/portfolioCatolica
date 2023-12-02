from flask import Flask
from flask_cors import CORS

from flight_search.Airports.endpoints.endpoints import search_city, search_airports
from flight_search.Flights.endpoints.endpoints import search_flights
from flight_search.TravelAgents.endpoints.endpoints import create_flight_agent, login

app = Flask(__name__)
CORS(app)

print('Starting server...')


@app.route('/api/flights', methods=['GET'])
def flights_endpoint():
    return search_flights()


@app.route('/api/cities', methods=['GET'])
def city_endpoint():
    return search_city()


@app.route('/api/airports', methods=['GET'])
def airports_endpoint():
    return search_airports()


@app.route('/api/travel_agent', methods=['POST'])
def travel_agent_endpoint():
    return create_flight_agent()


@app.route('/login', methods=['POST'])
def login_endpoint():
    return login()


@app.route('/api/', methods=['GET'])
def home():
    return 'Hello, World!'


# Health check endpoint
@app.route('/', methods=['GET'])
def health_check():
    return 200


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5001)
