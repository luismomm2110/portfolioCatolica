import uuid
from datetime import datetime

from TravelAgents.gateways.gateways import TravelAgentGateway
from TravelAgents.models.models import TravelAgent, set_password


class TravelAgentAlreadyExistsException(ValueError):
    pass


def create_travel_agent(travel_agent_gateway: TravelAgentGateway, travel_agent_data: dict):
    if travel_agent_gateway.get_travel_agent_by_email(travel_agent_data['email']):
        raise TravelAgentAlreadyExistsException('Email already in use')
    travel_agent_data['_id'] = uuid.uuid4()
    travel_agent_data['password'] = set_password(travel_agent_data['password'])
    travel_agent_data['date_joined'] = datetime.now().isoformat()
    travel_agent_data = TravelAgent(**travel_agent_data)
    travel_agent_gateway.save(travel_agent_data)


def login_as_travel_agent(travel_agent_gateway: TravelAgentGateway, email: str, password: str) -> TravelAgent:
    travel_agent = travel_agent_gateway.get_travel_agent_by_email(email)

    if not travel_agent or not travel_agent.check_password(password):
        raise ValueError('Invalid email or password')

    return travel_agent
