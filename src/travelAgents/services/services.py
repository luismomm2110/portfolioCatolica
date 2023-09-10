from src.travelAgents.gateways.gateways import TravelAgentGateway
from src.travelAgents.models.models import TravelAgent


def create_travel_agent(travel_agent_gateway: TravelAgentGateway, travel_agent: dict):
    try:
        travel_agent = TravelAgent(**travel_agent)
        travel_agent_gateway.save(travel_agent)
    except ValueError as error:
        raise error
