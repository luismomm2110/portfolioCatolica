from datetime import datetime

import pytest

from src.travelAgents.gateways.gateways import FakeTravelAgentGateway
from src.travelAgents.services.services import create_travel_agent


def test_when_create_user_then_it_is_saved():
    travel_agent = {
        'user_id': 1,
        'name': 'John Doe',
        'email': 'johndoe@gmail.com',
        'password_hash': 'john123',
        'phone_number': '(11) 99999-9999',
        'company': 'Travel Agent Company',
        'date_of_birth': datetime(1990, 1, 1),
        'date_joined': datetime(2020, 1, 1)
    }

    fake_travel_agent_gateway = FakeTravelAgentGateway()
    create_travel_agent(fake_travel_agent_gateway, travel_agent)

    assert fake_travel_agent_gateway.get_all_travel_agents()[1].user_id == 1
    assert fake_travel_agent_gateway.get_all_travel_agents()[1].name == 'John Doe'
    assert fake_travel_agent_gateway.get_all_travel_agents()[1].email == 'johndoe@gmail.com'
    assert fake_travel_agent_gateway.get_all_travel_agents()[1].password_hash == 'john123'
    assert fake_travel_agent_gateway.get_all_travel_agents()[1].phone_number == '(11) 99999-9999'
    assert fake_travel_agent_gateway.get_all_travel_agents()[1].company == 'Travel Agent Company'
    assert fake_travel_agent_gateway.get_all_travel_agents()[1].date_of_birth == datetime(1990, 1, 1)
    assert fake_travel_agent_gateway.get_all_travel_agents()[1].date_joined == datetime(2020, 1, 1)


def test_when_try_to_create_a_user_without_name_then_it_raises_an_exception():
    fake_travel_agent_gateway = FakeTravelAgentGateway()

    with pytest.raises(ValueError) as excinfo:
        travel_agent_information = {
            'user_id': 1,
            'name': '',
            'email': 'joohndoe@gmail.com',
            'password_hash': 'john123',
            'phone_number': '(11) 99999-9999',
            'company': 'Travel Agent Company',
            'date_of_birth': datetime(1990, 1, 1),
            'date_joined': datetime(2020, 1, 1)
        }
        create_travel_agent(fake_travel_agent_gateway, travel_agent_information)

    assert "'name' cannot be empty or None" in str(excinfo.value)




