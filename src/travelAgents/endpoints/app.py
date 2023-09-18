from flask import Flask, jsonify, request
from pymongo import MongoClient

from src.travelAgents.gateways.gateways import MongoTravelAgentGateway
from src.travelAgents.services.services import create_travel_agent, get_all_travel_agents

app = Flask(__name__)

client = MongoClient('localhost', 27017)
mongo_client = client['search_flight_db']['travel_agent']
gateway = MongoTravelAgentGateway(mongo_client)


@app.route('/create_travel_agent', methods=['POST'])
def insert():
    data = request.json
    create_travel_agent(gateway, data)
    return "", 201


@app.route('/get_all_travel_agents', methods=['GET'])
def get_all():
    return jsonify(get_all_travel_agents(gateway))


if __name__ == '__main__':
    app.run(debug=True)
