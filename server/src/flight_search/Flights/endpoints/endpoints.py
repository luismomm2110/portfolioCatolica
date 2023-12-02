from decimal import Decimal

from flask import request, jsonify
from flask_jwt_extended import jwt_required

from flight_search.Airports.repositories.repositories import IataAirportRepository
from flight_search.CurrencyRate.gateways.gateways import FakeCurrencyRateGateway
from flight_search.Flights.gateways.gateways import AmadeusGateway
from flight_search.Flights.services.services import find_all_flights_from_airports


@jwt_required()
def search_flights():
    repository = IataAirportRepository()
    gateway = AmadeusGateway()

    city_origin = request.args['city_origin']
    destinations = set(request.args.getlist('destination'))
    departure = request.args['departure']
    raw_max_price = request.args.get('price', None)
    max_price = Decimal(raw_max_price) if raw_max_price else None
    currency_rate_mapping = FakeCurrencyRateGateway().get_currency_rate_mapping()

    flights, error = find_all_flights_from_airports(city_origin, destinations, departure, repository,
                                                    gateway, currency_rate_mapping, max_price)
    if error:
        return jsonify({'error': error}), 400

    return jsonify({'data': flights}), 200

