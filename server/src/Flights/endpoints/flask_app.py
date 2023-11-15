
from flask import Flask, request, jsonify

from server.src.Airports.repositories.repository import IataRepository
from server.src.Flights.gateways.gateway_amadeus import AmadeusGateway
from server.src.Flights.services.services import find_all_flights_from_airports

app = Flask(__name__)


## TODO proteger rota
@app.route('/flights', methods=['GET'])
def flights_endpoint():
    source = request.args['source']
    destinations = request.args.getlist('destination')
    departure = request.args['departure']
    price = request.args.get('price', None)
    repository = IataRepository()
    gateway = AmadeusGateway()

    flights, error = find_all_flights_from_airports(source, destinations, departure, repository, gateway, price)
    if error:
        return jsonify({'error': error}), 400

    return jsonify({'data': flights}), 200


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5001)
