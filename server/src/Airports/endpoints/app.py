from flask import Flask, request, jsonify

from server.src.Airports.repositories.repository import IataRepository
from server.src.Airports.services.services import find_nearest_airports_by_city

app = Flask(__name__)


@app.route('/airports', methods=['GET'])
def airports_endpoint():
    city = request.args.get('city', type=str)
    limit = request.args.get('limit', default=10, type=int)
    repository = IataRepository()

    ### TODO error handling
    return jsonify(
        {'airports': find_nearest_airports_by_city(city,
                                                   limit,
                                                   repository)}), 200


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5001)
