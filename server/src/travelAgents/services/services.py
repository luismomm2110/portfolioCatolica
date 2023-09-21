from server.src.travelAgents.gateways.gateways import TravelAgentGateway
from server.src.travelAgents.models.models import TravelAgent


class TravelAgentAlreadyExistsException(ValueError):
    pass


def create_travel_agent(travel_agent_gateway: TravelAgentGateway, travel_agent: dict):
    if travel_agent_gateway.get_travel_agent_by_email(travel_agent['email']):
        raise TravelAgentAlreadyExistsException('Email already in use')
    travel_agent = TravelAgent(**travel_agent)
    travel_agent.set_password(travel_agent.password_hash)
    travel_agent_gateway.save(travel_agent)


def login_as_travel_agent(travel_agent_gateway: TravelAgentGateway, email: str, password: str):
    try:
        travel_agent = travel_agent_gateway.get_travel_agent_by_email(email)
        travel_agent.check_password(password)
        return True
    except (KeyError, ValueError):
        raise ValueError('Invalid email or password')