from typing import Optional

from server.src.travelAgents.models.models import TravelAgent


class TravelAgentGateway:
    def get_travel_agent_by_email(self, email: str) -> TravelAgent:
        raise NotImplementedError

    def get_travel_agent_by_id(self, _id: str) -> TravelAgent:
        raise NotImplementedError

    def save(self, travel_agent: TravelAgent) -> None:
        raise NotImplementedError


class FakeTravelAgentGateway(TravelAgentGateway):
    def __init__(self):
        self._travel_agents = {}

    def get_travel_agent_by_email(self, email: str) -> TravelAgent:
        return self._travel_agents.get(email)

    def get_travel_agent_by_id(self, _id: str) -> Optional[TravelAgent]:
        for travel_agent in self._travel_agents.values():
            if travel_agent._id == _id:
                return travel_agent
        return None

    def save(self, travel_agent: TravelAgent) -> None:
        self._travel_agents[travel_agent.email] = travel_agent


class MongoTravelAgentGateway(TravelAgentGateway):
    def __init__(self, mongo_client_with_collection):
        self._mongo_client = mongo_client_with_collection

    def get_travel_agent_by_email(self, email: str) -> Optional[TravelAgent]:
        travel_agent_data = self._mongo_client.db.collection.find_one({"email": email})
        if not travel_agent_data:
            return None
        return TravelAgent(
            _id=travel_agent_data['_id'],
            name=travel_agent_data['name'],
            email=travel_agent_data['email'],
            password=travel_agent_data['password_hash'],
            phone_number=travel_agent_data['phone_number'],
            date_joined=travel_agent_data['date_joined']
        )

    def get_travel_agent_by_id(self, _id: str) -> Optional[TravelAgent]:
        travel_agent_data = self._mongo_client.db.collection.find_one({"_id": id})
        if not travel_agent_data:
            return None
        return TravelAgent(
            _id=travel_agent_data['_id'],
            name=travel_agent_data['name'],
            email=travel_agent_data['email'],
            password=travel_agent_data['password_hash'],
            phone_number=travel_agent_data['phone_number'],
            date_joined=travel_agent_data['date_joined']
        )

    def save(self, travel_agent: TravelAgent) -> None:
        travel_agent_to_dict = {
            'name': travel_agent.name,
            'email': travel_agent.email,
            'password_hash': travel_agent.password,
            'phone_number': travel_agent.phone_number,
            'date_joined': travel_agent.date_joined
        }
        self._mongo_client.db.collection.insert_one(travel_agent_to_dict)
