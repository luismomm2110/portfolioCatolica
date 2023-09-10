from src.travelAgents.models.models import TravelAgent


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
