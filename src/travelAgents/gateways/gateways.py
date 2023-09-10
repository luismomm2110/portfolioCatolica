from src.travelAgents.models.models import TravelAgent


class TravelAgentGateway:
    def get_all_travel_agents(self) -> dict[TravelAgent]:
        raise NotImplementedError

    def save(self, travel_agent: TravelAgent) -> None:
        raise NotImplementedError


class FakeTravelAgentGateway(TravelAgentGateway):
    def __init__(self):
        self._travel_agents = {}

    def get_all_travel_agents(self) -> dict[TravelAgent]:
        return self._travel_agents

    def save(self, travel_agent: TravelAgent) -> None:
        self._travel_agents[travel_agent.user_id] = travel_agent
