from datetime import datetime

from flight_search.TravelAgents.models.models import TravelAgent, set_password


def test_when_check_correct_password_then_return_true():
    travel_agent = TravelAgent(
        _id='1',
        name='John Doe',
        email='johndoe@gmail.com',
        password='alice123',
        phone_number='(11) 99999-9999',
        date_joined=datetime(2020, 1, 1)
    )
    travel_agent.password = set_password('alice123')


    result = travel_agent.check_password('alice123')
    assert result is True
