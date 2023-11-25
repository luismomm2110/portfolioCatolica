from decimal import Decimal

from flask import request, jsonify

from flight_search.Airports.repositories.repository import IataAirportRepository
from flight_search.CurrencyRate.gateways.gateways import FakeCurrencyRateGateway
from flight_search.Flights.gateways.gateway_amadeus import AmadeusGateway
from flight_search.Flights.services.services import find_all_flights_from_airports


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

