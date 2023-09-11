from datetime import datetime

from src.travelAgents.models.models import TravelAgent


def test_when_set_password_then_password_hash_is_not_empty():
    travel_agent = TravelAgent(
        name='John Doe',
        email='johndoe@gmail.com',
        password_hash='',
        phone_number='(11) 99999-9999',
        company='Travel Agent Company',
        date_of_birth=datetime(1990, 1, 1),
        date_joined=datetime(2020, 1, 1)
    )

    travel_agent.set_password('alice123')

    assert travel_agent.password_hash != ''


def test_when_check_correct_password_then_return_true():
    travel_agent = TravelAgent(
        name='John Doe',
        email='johndoe@gmail.com',
        password_hash='',
        phone_number='(11) 99999-9999',
        company='Travel Agent Company',
        date_of_birth=datetime(1990, 1, 1),
        date_joined=datetime(2020, 1, 1)
    )

    travel_agent.set_password('alice123')

    assert travel_agent.check_password('alice123') is True
