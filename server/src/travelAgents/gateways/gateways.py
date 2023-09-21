from server.src.travelAgents.models.models import TravelAgent


class TravelAgentGateway:
    def get_all_travel_agents(self) -> dict[TravelAgent]:
        raise NotImplementedError

    def get_travel_agent_by_email(self, email: str) -> TravelAgent:
        raise NotImplementedError

    def save(self, travel_agent: TravelAgent) -> None:
        raise NotImplementedError


class FakeTravelAgentGateway(TravelAgentGateway):
    def __init__(self):
        self._travel_agents = {}

    def get_all_travel_agents(self) -> dict[str: TravelAgent]:
        return self._travel_agents

    def get_travel_agent_by_email(self, email: str) -> TravelAgent:
        return self._travel_agents.get(email)

    def save(self, travel_agent: TravelAgent) -> None:
        self._travel_agents[travel_agent.email] = travel_agent


class MongoTravelAgentGateway(TravelAgentGateway):
    def __init__(self, mongo_client_with_collection):
        self._mongo_client = mongo_client_with_collection

    def get_all_travel_agents(self) -> dict[str: TravelAgent]:
        return self._mongo_client.db.collection.find()

    def get_travel_agent_by_email(self, email: str) -> TravelAgent:
        travel_agent_data = self._mongo_client.db.collection.find_one({"email": email})
        return TravelAgent(
            name=travel_agent_data['name'],
            email=travel_agent_data['email'],
            password_hash=travel_agent_data['password_hash'],
            phone_number=travel_agent_data['phone_number'],
            company=travel_agent_data['company'],
            date_of_birth=travel_agent_data['date_of_birth'],
            date_joined=travel_agent_data['date_joined']
        )

    def save(self, travel_agent: TravelAgent) -> None:
        travel_agent_to_dict = {
            'name': travel_agent.name,
            'email': travel_agent.email,
            'password_hash': travel_agent.password_hash,
            'phone_number': travel_agent.phone_number,
            'company': travel_agent.company,
            'date_of_birth': travel_agent.date_of_birth,
            'date_joined': travel_agent.date_joined
        }
        self._mongo_client.db.collection.insert_one(travel_agent_to_dict)
