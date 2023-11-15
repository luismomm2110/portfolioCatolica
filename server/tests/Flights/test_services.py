from _decimal import Decimal
from datetime import datetime, timedelta

import pytest

from server.src.Airports.repositories.repository import FakeRepository
from server.src.Flights.gateways.gateway_amadeus import FakeGateway
from server.src.Flights.models.model import Flight
from server.src.Flights.services.services import find_all_flights_from_airports
from server.tests.utils import source, destinations

default_date = (datetime.now() + timedelta(days=1)).isoformat().split('T')[0]


def test_when_search_for_flights_with_all_inputs_then_should_return_correct_flights(fake_repository, fake_gateway):
    city_source = 'São Paulo'
    iata_airports_destinations = ['LAX', 'SAN']
    departure = default_date
    price = 100

    flights, _ = find_all_flights_from_airports(city_source=city_source,
                                                iata_airports_destinations=iata_airports_destinations,
                                                departure=departure, airport_repository=fake_repository,
                                                flight_gateway=fake_gateway, max_price=price)

    assert len(flights) == 2
    assert flights[0].source == source
    assert flights[0].destination == destinations[1]
    assert flights[0].departure == departure
    assert flights[0].price == Decimal('100.00')
    assert flights[1].source == source
    assert flights[1].destination == destinations[2]
    assert flights[1].departure == departure
    assert flights[1].price == Decimal('100.00')


def test_when_dont_find_city_source_then_should_return_error(fake_repository, fake_gateway):
    city_source = 'Missing city'
    iata_airports_destinations = ['LAX', 'SAN']
    departure = default_date
    price = 100

    _, error = find_all_flights_from_airports(city_source=city_source,
                                              iata_airports_destinations=iata_airports_destinations,
                                              departure=departure, airport_repository=fake_repository,
                                              flight_gateway=fake_gateway, max_price=price)

    assert error == 'City not found'


def test_dont_find_flights_when_departure_is_not_available(fake_repository, fake_gateway):
    city_source = 'São Paulo'
    iata_airports_destinations = ['LAX', 'SAN']
    departure = (datetime.now() + timedelta(days=100)).isoformat().split('T')[0]
    price = 100

    flights, _ = find_all_flights_from_airports(city_source=city_source,
                                                iata_airports_destinations=iata_airports_destinations,
                                                departure=departure, airport_repository=fake_repository,
                                                flight_gateway=fake_gateway, max_price=price)

    assert len(flights) == 0


def test_when_dont_send_price_then_it_should_no_cap_by_price(fake_repository, fake_gateway):
    city_source = 'São Paulo'
    iata_airports_destinations = ['LAX', 'SAN']
    departure = default_date

    flights, _ = find_all_flights_from_airports(city_source=city_source,
                                                iata_airports_destinations=iata_airports_destinations,
                                                departure=departure, airport_repository=fake_repository,
                                                flight_gateway=fake_gateway)

    assert len(flights) == 2


def test_when_date_is_in_the_past_then_should_return_error(fake_repository, fake_gateway):
    city_source = 'São Paulo'
    iata_airports_destinations = ['LAX', 'SAN']
    departure = (datetime.now() - timedelta(days=1)).isoformat().split('T')[0]
    price = 100

    _, error = find_all_flights_from_airports(city_source=city_source,
                                              iata_airports_destinations=iata_airports_destinations,
                                              departure=departure, airport_repository=fake_repository,
                                              flight_gateway=fake_gateway, max_price=price)

    assert error == 'Departure date is in the past'


def test_when_departure_is_not_at_iso_format_yyyy_mm_dd_then_should_return_error(fake_repository, fake_gateway):
    city_source = 'São Paulo'
    iata_airports_destinations = ['LAX', 'SAN']
    departure = (datetime.now() + timedelta(days=1)).isoformat()
    price = 100

    _, error = find_all_flights_from_airports(city_source=city_source,
                                              iata_airports_destinations=iata_airports_destinations,
                                              departure=departure, airport_repository=fake_repository,
                                              flight_gateway=fake_gateway, max_price=price)

    assert error == 'Invalid departure date'


def test_converter_para_reais(fake_repository, fake_gateway):
    city_source = 'São Paulo'
    iata_airports_destinations = ['LAX', 'SAN']
    departure = default_date
    price = 100
    currency_rates = {'EUR': Decimal('6.00')}

    flights, _ = find_all_flights_from_airports(city_source=city_source,
                                                iata_airports_destinations=iata_airports_destinations,
                                                departure=departure, airport_repository=fake_repository,
                                                flight_gateway=fake_gateway, max_price=price, currency_rate=currency_rates)

    assert flights[0].price == Decimal('600.00')
    assert flights[0].currency_code == 'BRL'


@pytest.fixture
def fake_repository():
    return FakeRepository(airports=[*destinations])


@pytest.fixture
def fake_gateway():
    flights = [
        Flight(source=source, destination=destinations[1], departure=default_date, price=Decimal('100.00'), currency_code='EUR'),
        Flight(source=source, destination=destinations[2], departure=default_date, price=Decimal('100.00'), currency_code='EUR'),
    ]

    return FakeGateway(flights=flights)
