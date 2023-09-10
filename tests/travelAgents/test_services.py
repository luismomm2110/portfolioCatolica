from datetime import datetime

from src.travelAgents.gateways.gateways import FakeTravelAgentGateway
from src.travelAgents.models.models import TravelAgent
from src.travelAgents.services.services import create_travel_agent


def test_when_create_user_then_it_is_saved():
    travel_agent = TravelAgent(
        user_id=1,
        name='John Doe',
        email='johndoe@gmail.com',
        password_hash='john123',
        phone_number='(11) 99999-9999',
        company='Travel Agent Company',
        date_of_birth=datetime(1990, 1, 1),
        date_joined=datetime(2020, 1, 1)
    )

    fake_travel_agent_gateway = FakeTravelAgentGateway()
    create_travel_agent(fake_travel_agent_gateway, travel_agent)

    assert fake_travel_agent_gateway.get_all_travel_agents() == {1: travel_agent}




