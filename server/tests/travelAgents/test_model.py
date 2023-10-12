from datetime import datetime

from server.src.travelAgents.models.models import TravelAgent


def test_when_check_correct_password_then_return_true():
    travel_agent = TravelAgent(
        _id='1',
        name='John Doe',
        email='johndoe@gmail.com',
        password='alice123',
        phone_number='(11) 99999-9999',
        date_joined=datetime(2020, 1, 1)
    )

    result = travel_agent.check_password('alice123')
    assert result is True
