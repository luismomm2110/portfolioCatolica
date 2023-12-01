from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import jwt_required
from pymongo import MongoClient

from flight_search.TravelAgents.gateways.gateways import MongoTravelAgentGateway
from settings import get_jwt_key, get_mongo_url
from flight_search.Airports.repositories.repositories import IataAirportRepository, MongoAirportRepository
from flight_search.Airports.services.services import find_nearest_airports_by_city, find_city

app = Flask(__name__)
CORS(app)

mongo_client = MongoClient(get_mongo_url(), 27017)

app.config['SECRET_KEY'] = get_jwt_key()
airport_client = mongo_client['search_flight_db']['travel_agent']
repository = MongoAirportRepository(airport_client)


@jwt_required
@app.route('/airports', methods=['GET'])
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


@jwt_required()
def search_city():
    city = request.args.get('city', type=str)
    repository = IataAirportRepository()

    city = find_city(city, repository)
    if not city:
        return jsonify({'error': 'No city found'}), 404

    return jsonify({'data': city}), 200
