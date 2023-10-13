import json
import os
from dataclasses import asdict

from flask import Flask, request, abort
from flask_cors import CORS

from http import HTTPStatus
from pymongo import MongoClient

from server.src.infrastructure.auth_middleware import create_token
from server.src.travelAgents.gateways.gateways import MongoTravelAgentGateway
from server.src.travelAgents.services.services import create_travel_agent, login_as_travel_agent, \
    TravelAgentAlreadyExistsException

app = Flask(__name__)
CORS(app)

SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
print(SECRET_KEY)
app.config['SECRET_KEY'] = SECRET_KEY
mongo_client = MongoClient('localhost', 27017)
travel_agent_client = mongo_client['search_flight_db']['travel_agent']
gateway = MongoTravelAgentGateway(travel_agent_client)


@app.route('/create_travel_agent', methods=['POST'])
def insert():
    data = request.json
    try:
        create_travel_agent(gateway, data)
        return "", HTTPStatus.CREATED
    except TravelAgentAlreadyExistsException as e:
        abort(HTTPStatus.UNPROCESSABLE_ENTITY, description=e.args)
    except ValueError as e:
        abort(HTTPStatus.UNPROCESSABLE_ENTITY, description=e.args)


@app.route('/login', methods=['POST'])
def login():
    try:
        email, password = request.json['email'], request.json['password']
        if travel_agent := login_as_travel_agent(gateway, email, password):
            create_token(SECRET_KEY, travel_agent._id)
            return json.dumps(asdict(travel_agent))
    except ValueError as e:
        abort(HTTPStatus.UNAUTHORIZED, description=e.args)


if __name__ == '__main__':
    app.run(port=5001, debug=True)
