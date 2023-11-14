from _decimal import Decimal
from datetime import datetime, timedelta

import pytest

from server.src.Airports.repositories.repository import FakeRepository
from server.src.Flights.gateways.gateway_amadeus import FakeGateway
from server.src.Flights.models.model import Flight
from server.src.Flights.services.services import find_all_flights_from_airports
from server.tests.utils import source, destination, destinations

default_date = datetime(2020, 1, 1).isoformat().split('T')[0]


def test_when_search_for_flights_with_all_inputs_then_should_return_correct_flights(fake_repository, fake_gateway):
    city_source = 'São Paulo'
    iata_airports_destinations = ['LAX', 'SAN']
    departure = default_date
    price = Decimal('100.00')

    flights = find_all_flights_from_airports(city_source=city_source, iata_airports_destinations=iata_airports_destinations,
                                             departure=departure, price=price, airport_repository=fake_repository,
                                             flight_gateway=fake_gateway)

    assert len(flights) == 2
    assert flights[0].source == source
    assert flights[0].destination == destinations[1]
    assert flights[0].departure == departure
    assert flights[1].source == source
    assert flights[1].destination == destinations[2]
    assert flights[1].departure == departure



@pytest.fixture
def fake_repository():
    return FakeRepository(airports=[*destinations])


@pytest.fixture
def fake_gateway():
    flights = [
        Flight(source=source, destination=destinations[1], departure=default_date, price=Decimal('100.00')),
        Flight(source=source, destination=destinations[2], departure=default_date, price=Decimal('100.00')),
    ]

    return FakeGateway(flights=flights)
