from decimal import Decimal

from flask import Flask, request, jsonify

from server.src.Airports.repositories.repository import IataAirportRepository
from server.src.CurrencyRate.gateways.gateways import FakeCurrencyRateGateway
from server.src.Flights.gateways.gateway_amadeus import AmadeusGateway
from server.src.Flights.services.services import find_all_flights_from_airports

app = Flask(__name__)


@app.route('/flights', methods=['GET'])
def flights_endpoint():
    repository = IataAirportRepository()
    gateway = AmadeusGateway()

    source = request.args['source']
    destinations = request.args.getlist('destination')
    departure = request.args['departure']
    raw_max_price = request.args.get('price', None)
    max_price = Decimal(raw_max_price) if raw_max_price else None
    currency_rate_mapping = FakeCurrencyRateGateway().get_currency_rate_mapping()

    flights, error = find_all_flights_from_airports(source, destinations, departure, repository, gateway, max_price,
                                                    currency_rate_mapping)
    if error:
        return jsonify({'error': error}), 400

    return jsonify({'data': flights}), 200


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5001)
