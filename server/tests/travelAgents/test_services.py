from datetime import datetime

import pytest

from server.src.travelAgents.gateways.gateways import FakeTravelAgentGateway
from server.src.travelAgents.services.services import create_travel_agent, login_as_travel_agent, \
    TravelAgentAlreadyExistsException


def test_when_create_user_then_it_is_saved():
    travel_agent = {
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

    assert fake_travel_agent_gateway.get_all_travel_agents()['johndoe@gmail.com'].name == 'John Doe'
    assert fake_travel_agent_gateway.get_all_travel_agents()['johndoe@gmail.com'].email == 'johndoe@gmail.com'
    assert fake_travel_agent_gateway.get_all_travel_agents()['johndoe@gmail.com'].password_hash is not None or ''
    assert fake_travel_agent_gateway.get_all_travel_agents()['johndoe@gmail.com'].phone_number == '(11) 99999-9999'
    assert fake_travel_agent_gateway.get_all_travel_agents()['johndoe@gmail.com'].company == 'Travel Agent Company'
    assert fake_travel_agent_gateway.get_all_travel_agents()['johndoe@gmail.com'].date_of_birth == datetime(1990, 1, 1)
    assert fake_travel_agent_gateway.get_all_travel_agents()['johndoe@gmail.com'].date_joined == datetime(2020, 1, 1)


def test_when_try_to_create_a_user_without_name_then_it_raises_an_exception():
    fake_travel_agent_gateway = FakeTravelAgentGateway()

    with pytest.raises(ValueError) as excinfo:
        travel_agent_information = {
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


def test_when_login_with_correct_password_then_it_returns_true():
    fake_travel_agent_gateway = FakeTravelAgentGateway()
    travel_agent_information = {
        'name': 'John Doe',
        'email': 'johndoe@gmail.com',
        'password_hash': 'john123',
        'phone_number': '(11) 99999-9999',
        'company': 'Travel Agent Company',
        'date_of_birth': datetime(1990, 1, 1),
        'date_joined': datetime(2020, 1, 1)
    }
    create_travel_agent(fake_travel_agent_gateway, travel_agent_information)

    assert login_as_travel_agent(fake_travel_agent_gateway, 'johndoe@gmail.com', 'john123') is True


def test_when_login_with_incorrect_password_then_throws_exception():
    fake_travel_agent_gateway = FakeTravelAgentGateway()
    travel_agent_information = {
        'name': 'John Doe',
        'email': 'johndoe@gmail.com',
        'password_hash': 'john123',
        'phone_number': '(11) 99999-9999',
        'company': 'Travel Agent Company',
        'date_of_birth': datetime(1990, 1, 1),
        'date_joined': datetime(2020, 1, 1)
    }
    create_travel_agent(fake_travel_agent_gateway, travel_agent_information)

    with pytest.raises(ValueError) as excinfo:
        login_as_travel_agent(fake_travel_agent_gateway, 'johndoe@gmail.com', 'wrong_password')

    assert 'Invalid email or password' in str(excinfo.value)


def test_when_try_to_create_with_email_already_registered_then_it_raises_an_exception():
    fake_travel_agent_gateway = FakeTravelAgentGateway()
    travel_agent_information = {
        'name': 'John Doe',
        'email': 'johndoe@gmail.com',
        'password_hash': 'john123',
        'phone_number': '(11) 99999-9999',
        'company': 'Travel Agent Company',
        'date_of_birth': datetime(1990, 1, 1),
        'date_joined': datetime(2020, 1, 1)
    }

    with pytest.raises(TravelAgentAlreadyExistsException) as excinfo:
        create_travel_agent(fake_travel_agent_gateway, travel_agent_information)
        create_travel_agent(fake_travel_agent_gateway, travel_agent_information)

    assert 'Email already in use' in str(excinfo.value)


if __name__ == '__main__':
    pytest.main()