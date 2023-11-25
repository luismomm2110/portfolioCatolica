from datetime import datetime
from unittest.mock import patch

import pytest

from TravelAgents.gateways.gateways import FakeTravelAgentGateway
from TravelAgents.services.services import create_travel_agent, login_as_travel_agent, \
    TravelAgentAlreadyExistsException


@patch('server.src.TravelAgents.services.services.datetime')
def test_when_create_user_then_it_is_saved(mock_datetime):
    date_joined = datetime(2020, 1, 1)
    mock_datetime.now.return_value = date_joined
    travel_agent_data = {
        'name': 'John Doe',
        'email': 'johndoe@gmail.com',
        'password': 'john123',
        'phone_number': '(11) 99999-9999',
    }

    fake_travel_agent_gateway = FakeTravelAgentGateway()
    create_travel_agent(fake_travel_agent_gateway, travel_agent_data)

    actual_travel_agent =\
        fake_travel_agent_gateway.get_travel_agent_by_email('johndoe@gmail.com')
    assert actual_travel_agent.name == 'John Doe'
    assert actual_travel_agent.email == 'johndoe@gmail.com'
    assert actual_travel_agent.password is not None or ''
    assert actual_travel_agent.phone_number == '(11) 99999-9999'
    assert actual_travel_agent.date_joined == date_joined.isoformat()


def test_when_try_to_create_a_user_without_name_then_it_raises_an_exception():
    fake_travel_agent_gateway = FakeTravelAgentGateway()

    with pytest.raises(ValueError) as excinfo:
        travel_agent_information = {
            'name': '',
            'email': 'joohndoe@gmail.com',
            'password': 'john123',
            'phone_number': '(11) 99999-9999',
        }
        create_travel_agent(fake_travel_agent_gateway, travel_agent_information)

    assert "'name' cannot be empty or None" in str(excinfo.value)


def test_when_login_with_correct_password_then_it_true():
    fake_travel_agent_gateway = FakeTravelAgentGateway()
    travel_agent_information = {
        'name': 'John Doe',
        'email': 'johndoe@gmail.com',
        'password': 'john123',
        'phone_number': '(11) 99999-9999',
    }
    create_travel_agent(fake_travel_agent_gateway, travel_agent_information)

    travel_agent_data = login_as_travel_agent(fake_travel_agent_gateway,
                                              'johndoe@gmail.com',
                                              'john123')

    assert travel_agent_data.name == 'John Doe'
    assert travel_agent_data.email == 'johndoe@gmail.com'
    assert travel_agent_data.password is not None or ''
    assert travel_agent_data.phone_number == '(11) 99999-9999'


def test_when_login_with_incorrect_email_then_throws_exception():
    wrong_email = 'missing@person.com'
    fake_travel_agent_gateway = FakeTravelAgentGateway()

    with pytest.raises(ValueError) as excinfo:
        login_as_travel_agent(fake_travel_agent_gateway, wrong_email, 'password')

    assert 'Invalid email or password' in str(excinfo.value)


def test_when_login_with_incorrect_password_then_throws_exception():
    fake_travel_agent_gateway = FakeTravelAgentGateway()
    travel_agent_information = {
        'name': 'John Doe',
        'email': 'johndoe@gmail.com',
        'password': 'john123',
        'phone_number': '(11) 99999-9999',
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
        'password': 'john123',
        'phone_number': '(11) 99999-9999',
    }

    with pytest.raises(TravelAgentAlreadyExistsException) as excinfo:
        create_travel_agent(fake_travel_agent_gateway, travel_agent_information)
        create_travel_agent(fake_travel_agent_gateway, travel_agent_information)

    assert 'Email already in use' in str(excinfo.value)


if __name__ == '__main__':
    pytest.main()
