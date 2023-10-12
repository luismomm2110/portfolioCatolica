from datetime import datetime

from flask import Flask, request, jsonify

from server.src.flights.gateways import AmadeusGateway
from server.src.flights.repositories.repository_iata import IataRepository
from server.src.flights.services.services import find_flights_within_range

app = Flask(__name__)


@app.route('/flights', methods=['GET'])
def flights_endpoint():
    source = str(request.json['source'])
    destination = str(request.json['destination'])
    departure = datetime.strptime(request.json['departure'], '%Y-%m-%d')
    desired_range = int(request.json['desired_range'])
    repository = IataRepository()
    gateway = AmadeusGateway()

    return jsonify({'flights': find_flights_within_range(source, destination, departure, desired_range, repository,
                                                         gateway)}), 200


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
