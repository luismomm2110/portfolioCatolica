from src.travelAgents.gateways.gateways import TravelAgentGateway
from src.travelAgents.models.models import TravelAgent


def create_travel_agent(travel_agent_gateway: TravelAgentGateway, travel_agent: TravelAgent):
    travel_agent_gateway.save(travel_agent)
