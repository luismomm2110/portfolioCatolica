from _decimal import Decimal
from datetime import datetime, timedelta

import pytest

from src.gateways.gateway_amadeus import FakeGateway
from src.models.model import Airport, Coordinate, Flight
from src.repositories.repository_iata import FakeRepository
from src.services.services import find_flights_within_range

source = Airport(code='GRU', coordinate=Coordinate(latitude=Decimal('-23.4323'), longitude=Decimal('-46.4695')))
destination = Airport(code='LAX', coordinate=Coordinate(latitude=Decimal('33.9425361'),
                                                        longitude=Decimal('-118.408075')))
other_destinations = [Airport(code='SAN', coordinate=Coordinate(latitude=Decimal('32.733556'),
                                                                longitude=Decimal('-117.189657'))),
                      Airport(code='SFO', coordinate=Coordinate(latitude=Decimal('37.618972'),
                                                                longitude=Decimal('-122.374889')))]
default_date = datetime(2020, 1, 1)
original_flight = Flight(source=source, destination=destination, departure=default_date, price=Decimal('100.00'))


def test_returns_list_of_flights(fake_repository, fake_gateway):
    distance = 375000

    flights = find_flights_within_range(iata_source=source.code, iata_destination=destination.code,
                                        departure=default_date, desired_range=distance, repository=fake_repository,
                                        gateway=fake_gateway)

    assert len(flights) == 3


def test_when_no_there_is_no_airport_within_range_then_return_only_original_destination(fake_repository, fake_gateway):
    distance = 100

    flights = find_flights_within_range(iata_source=source.code, iata_destination=destination.code,
                                        departure=default_date, desired_range=distance, repository=fake_repository,
                                        gateway=fake_gateway)

    assert flights == [original_flight]


def test_when_search_for_a_date_without_flights_then_return_empty_list(fake_repository, fake_gateway):
    distance = 375000

    flights = find_flights_within_range(iata_source=source.code, iata_destination=destination.code,
                                        departure=default_date + timedelta(days=1), desired_range=distance,
                                        repository=fake_repository, gateway=fake_gateway)

    assert flights == []


@pytest.fixture
def fake_repository():
    return FakeRepository(airports=[source, destination, *other_destinations])


@pytest.fixture
def fake_gateway():
    flights = [
        original_flight,
        Flight(source=source, destination=other_destinations[0], departure=default_date, price=Decimal('100.00')),
        Flight(source=source, destination=other_destinations[1], departure=default_date, price=Decimal('100.00')),
    ]

    return FakeGateway(flights=flights)
