from _decimal import Decimal
from datetime import datetime, timedelta

import pytest

from server.src.Airports.repositories.repository import FakeRepository
from server.src.Flights.gateways.gateway_amadeus import FakeGateway
from server.src.Flights.models.model import Flight
from server.src.Flights.services.services import find_flights_within_range
from server.src.Airports.services.services import find_nearest_airports_by_city
from server.tests.Airports.test_services import source, destination, destinations

default_date = datetime(2020, 1, 1)
original_flight = Flight(source=source, destination=destination, departure=default_date, price=Decimal('100.00'))


def test_returns_list_of_flights(fake_repository, fake_gateway):
    distance = 375000

    flights = find_flights_within_range(iata_source=source['code'], iata_destination=destination['code'],
                                        departure=default_date, desired_range=distance, repository=fake_repository,
                                        gateway=fake_gateway)

    assert len(flights) == 3


def test_when_no_there_is_no_airport_within_range_then_return_only_original_destination(fake_repository, fake_gateway):
    distance = 100

    flights = find_flights_within_range(iata_source=source['code'], iata_destination=destination['code'],
                                        departure=default_date, desired_range=distance, repository=fake_repository,
                                        gateway=fake_gateway)

    assert flights == [original_flight]


def test_when_search_for_a_date_without_flights_then_return_empty_list(fake_repository, fake_gateway):
    distance = 375000

    flights = find_flights_within_range(iata_source=source['code'], iata_destination=destination['code'],
                                        departure=default_date + timedelta(days=1), desired_range=distance,
                                        repository=fake_repository, gateway=fake_gateway)

    assert flights == []


def test_when_search_for_a_city_then_return_the_nearest_fifty_airports(fake_repository):
    city = 'São Paulo'
    limit = 50

    airports = find_nearest_airports_by_city(city, limit, fake_repository)

    assert len(airports) == limit


@pytest.fixture
def fake_repository():
    return FakeRepository(airports=[source, destination, *destinations])


@pytest.fixture
def fake_gateway():
    flights = [
        original_flight,
        Flight(source=source, destination=destinations[0], departure=default_date, price=Decimal('100.00')),
        Flight(source=source, destination=destinations[1], departure=default_date, price=Decimal('100.00')),
    ]

    return FakeGateway(flights=flights)
