from decimal import Decimal

from flask import request, jsonify

from server.src.Airports.repositories.repository import IataAirportRepository
from server.src.CurrencyRate.gateways.gateways import FakeCurrencyRateGateway
from server.src.Flights.gateways.gateway_amadeus import AmadeusGateway
from server.src.Flights.services.services import find_all_flights_from_airports


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

