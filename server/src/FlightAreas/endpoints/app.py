import os

from flask import Flask, request, abort, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity

from http import HTTPStatus
from pymongo import MongoClient

from server.src.FlightAreas.gateways.gateways import MongoFlightAreaGateway
from server.src.FlightAreas.services.services import save_flight_area


app = Flask(__name__)
CORS(app)
jwt = JWTManager(app)

SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
print(SECRET_KEY)
app.config['SECRET_KEY'] = SECRET_KEY
mongo_client = MongoClient('localhost', 27017)
flight_area_client = mongo_client['search_flight_db']['flight_area']
flight_area_gateway = MongoFlightAreaGateway(flight_area_client)


@app.route('/flight_area', methods=['POST'])
@jwt_required()
def create():
    data = request.json
    try:
        travel_agent_id = get_jwt_identity()
        data['travel_agent_id'] = travel_agent_id
        save_flight_area(flight_area_gateway, data)
        return "", HTTPStatus.CREATED
    except ValueError as e:
        abort(HTTPStatus.UNPROCESSABLE_ENTITY, description=e.args)


@app.route('/flight_area', methods=['DELETE'])
@jwt_required()
def delete_flight_area():
    # I receive by body the flight area id
    data = request.json
    try:
        flight_area_gateway.delete_flight_area(data['flight_area_id'])
        return "", HTTPStatus.OK
    except ValueError as e:
        abort(HTTPStatus.UNPROCESSABLE_ENTITY, description=e.args)



@app.route('/flight_area', methods=['GET'])
@jwt_required()
def get_flights_areas():
    travel_agent_id = get_jwt_identity()
    return jsonify({'data': flight_area_gateway.
                   get_flight_area_from_travel_agent(travel_agent_id)}), 200


if __name__ == '__main__':
    app.run(port=5001, debug=True)
