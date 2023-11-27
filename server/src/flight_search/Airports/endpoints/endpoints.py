from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import jwt_required

from settings import get_jwt_key
from flight_search.Airports.repositories.repository import IataAirportRepository
from flight_search.Airports.services.services import find_nearest_airports_by_city, find_city

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = get_jwt_key()


@jwt_required
@app.route('/airports', methods=['GET'])
def search_airports():
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


@jwt_required()
def search_city():
    city = request.args.get('city', type=str)
    repository = IataAirportRepository()

    city = find_city(city, repository)
    if not city:
        return jsonify({'error': 'No city found'}), 404

    return jsonify({'data': city}), 200
