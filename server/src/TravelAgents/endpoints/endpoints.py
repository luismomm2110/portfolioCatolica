import os

from flask import Flask, request, abort, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token

from http import HTTPStatus
from pymongo import MongoClient

from server.settings import get_jwt_key, get_mongo_url
from server.src.TravelAgents.gateways.gateways import MongoTravelAgentGateway
from server.src.TravelAgents.services.services import create_travel_agent, login_as_travel_agent, \
    TravelAgentAlreadyExistsException

app = Flask(__name__)
CORS(app)
jwt = JWTManager(app)

app.config['SECRET_KEY'] = get_jwt_key()
mongo_client = MongoClient(get_mongo_url(), 27017)
travel_agent_client = mongo_client['search_flight_db']['travel_agent']
gateway = MongoTravelAgentGateway(travel_agent_client)


@app.route('/travel_agent', methods=['POST'])
def create_flight_agent():
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
            access_token = create_access_token(identity={'_id': travel_agent._id})
            return jsonify(access_token=access_token, name=travel_agent.name)
    except ValueError as e:
        abort(HTTPStatus.UNAUTHORIZED, description=e.args)
