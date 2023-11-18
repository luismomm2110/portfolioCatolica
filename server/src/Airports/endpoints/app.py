import os

from flask import Flask, request, jsonify
from flask_cors import CORS

from server.src.Airports.repositories.repository import IataAirportRepository
from server.src.Airports.services.services import find_nearest_airports_by_city, find_city

app = Flask(__name__)
CORS(app)

SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
print(SECRET_KEY)
app.config['SECRET_KEY'] = SECRET_KEY


@app.route('/airports', methods=['GET'])
def airports_endpoint():
    city = request.args.get('city', type=str)
    limit = request.args.get('limit', default=10, type=int)
    repository = IataAirportRepository()

    airports = find_nearest_airports_by_city(city, limit, repository)
    if not airports:
        return jsonify({'error': 'No airports found'}), 404

    return jsonify(
        {'data': find_nearest_airports_by_city(city,
                                               limit,
                                               repository)}), 200


@app.route('/cities', methods=['GET'])
def cities_endpoint():
    city = request.args.get('city', type=str)
    repository = IataAirportRepository()

    city = find_city(city, repository)
    if not city:
        return jsonify({'error': 'No city found'}), 404

    return jsonify({'data': city}), 200


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5001)
