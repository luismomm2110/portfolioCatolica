from flask import Flask
from flask_cors import CORS

from server.src.Airports.endpoints.endpoints import search_city, search_airports
from server.src.Flights.endpoints.endpoints import search_flights
from server.src.TravelAgents.endpoints.endpoint import create_flight_agent, login

app = Flask(__name__)
CORS(app)


@app.route('/flights', methods=['GET'])
def flights_endpoint():
    return search_flights()


@app.route('/cities', methods=['GET'])
def city_endpoint():
    return search_city()


@app.route('/airports', methods=['GET'])
def airports_endpoint():
    return search_airports()


@app.route('/travel_agent', methods=['POST'])
def travel_agent_endpoint():
    return create_flight_agent()


@app.route('/login', methods=['POST'])
def login_endpoint():
    return login()


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5003)
