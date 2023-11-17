import json
from datetime import datetime, timedelta
from decimal import Decimal

import pytest

from server.src.Flights.gateways.gateway_amadeus import AmadeusGateway, presenter_raws_flights
from server.src.Flights.models.model import FoundFlight


@pytest.mark.skip(reason='Prevents from making requests to Amadeus API')
def test_gateway_can_search_a_flight():
    amadeus_gateway = AmadeusGateway()
    source = {'iata_code': 'GRU', 'coordinates': '-23.4355556, -46.4730556'}
    destinations = [{'iata_code': 'LAX', 'coordinates': '33.9425361, -118.4080751'},
                    {'iata_code': 'LAS', 'coordinates': '36.080056, -115.15225'}]
    current_date = datetime.now()
    one_month_from_now = current_date + timedelta(days=30)

    result = amadeus_gateway.get(source, destinations, current_date, one_month_from_now)

    assert result is not None


def test_presenter_can_convert_from_amadeus_model_to_domain_model():
    expected_first_flight = FoundFlight(
        source='SYD',
        destination='BKK',
        total_price=Decimal('355.34'),
        departure_date=datetime.strptime('2021-11-01T11:35:00', '%Y-%m-%dT%H:%M:%S'),
        arrival_date=datetime.strptime('2021-11-01T21:50:00', '%Y-%m-%dT%H:%M:%S'),
        carrier='PHILIPPINE AIRLINES',
        currency='EUR'
    )
    with open('./example.json') as f:
        amadeus_response = json.load(f)
        result = presenter_raws_flights(amadeus_response)

    assert result[0] == expected_first_flight

