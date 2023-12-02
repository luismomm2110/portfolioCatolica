from flask import Flask, request, jsonify
from flask_cors import CORS

from flight_search.Airports.repositories.repositories import DynamoAirportRepository
from flight_search.Airports.services.services import find_nearest_airports_by_city, find_city

app = Flask(__name__)
CORS(app)

repository = DynamoAirportRepository()


def search_airports():
    city = request.args.get('city', type=str)
    limit = request.args.get('limit', default=10, type=int)

    airports = find_nearest_airports_by_city(city, limit, repository)
    if not airports:
        return jsonify({'error': 'No airports found'}), 404

    return jsonify(
        {'data': find_nearest_airports_by_city(city,
                                               limit,
                                               repository)}), 200


def search_city():
    city = request.args.get('city', type=str)

    city = find_city(city, repository)
    if not city:
        return jsonify({'error': 'No city found'}), 404

    return jsonify({'data': city}), 200
