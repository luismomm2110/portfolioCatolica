from _decimal import Decimal
from datetime import datetime, timedelta

import pytest

from server.src.Airports.repositories.repository import FakeRepository
from server.src.CurrencyRate.gateways.gateways import FakeCurrencyRateGateway
from server.src.Flights.gateways.gateway_amadeus import FakeGateway
from server.src.Flights.models.model import TripGoal, FoundFlight
from server.src.Flights.services.services import find_all_flights_from_airports
from server.tests.utils import source, destinations

currency_rate_mapping = FakeCurrencyRateGateway().get_currency_rate_mapping()
price = 100*Decimal(currency_rate_mapping.mapping.get('EUR'))
city_source = 'São Paulo'
iata_airports_destinations = ['LAX', 'SAN']
departure = datetime.now().isoformat().split('T')[0]


def test_when_search_for_flights_with_all_inputs_then_should_return_correct_flights(fake_repository, fake_gateway):
    flights, _ = find_all_flights_from_airports(city_source=city_source,
                                                iata_airports_destinations=iata_airports_destinations,
                                                departure=departure, airport_repository=fake_repository,
                                                flight_gateway=fake_gateway, max_price=price,
                                                currency_rate_mapping=currency_rate_mapping)

    assert len(flights) == 2
    assert flights[0].source == source
    assert flights[0].destination == destinations[1]
    assert flights[0].departure_date == departure
    assert flights[0].total_price == price
    assert flights[1].source == source
    assert flights[1].destination == destinations[2]
    assert flights[1].departure_date == departure
    assert flights[1].total_price == price


def test_when_send_missing_destinations_then_it_should_not_find(fake_repository, fake_gateway):
    missing_iata_airports_destinations = ['FOO', 'BAR']

    flights, _ = find_all_flights_from_airports(city_source=city_source,
                                                iata_airports_destinations=missing_iata_airports_destinations,
                                                departure=departure, airport_repository=fake_repository,
                                                flight_gateway=fake_gateway, max_price=price,
                                                currency_rate_mapping=currency_rate_mapping)

    assert len(flights) == 0


def test_when_dont_find_city_source_then_should_return_error(fake_repository, fake_gateway):
    wrong_city_source = 'Missing city'

    _, error = find_all_flights_from_airports(city_source=wrong_city_source,
                                              iata_airports_destinations=iata_airports_destinations,
                                              departure=departure, airport_repository=fake_repository,
                                              flight_gateway=fake_gateway, max_price=price, currency_rate_mapping=currency_rate_mapping)

    assert error == 'City not found'


def test_dont_find_flights_when_departure_is_not_available(fake_repository, fake_gateway):
    date_in_the_far_future = (datetime.now() + timedelta(days=100)).isoformat().split('T')[0]

    flights, _ = find_all_flights_from_airports(city_source=city_source,
                                                iata_airports_destinations=iata_airports_destinations,
                                                departure=date_in_the_far_future, airport_repository=fake_repository,
                                                flight_gateway=fake_gateway, max_price=price,
                                                currency_rate_mapping=currency_rate_mapping)

    assert len(flights) == 0


def test_when_dont_send_price_then_it_should_no_cap_by_price(fake_repository, fake_gateway):
    missing_max_price = None

    flights, _ = find_all_flights_from_airports(city_source=city_source,
                                                iata_airports_destinations=iata_airports_destinations,
                                                departure=departure, airport_repository=fake_repository,
                                                flight_gateway=fake_gateway, max_price=missing_max_price,
                                                currency_rate_mapping=currency_rate_mapping)

    assert len(flights) == 2


def test_when_date_is_in_the_past_then_should_return_error(fake_repository, fake_gateway):
    departure_in_the_past = (datetime.now() - timedelta(days=1)).isoformat().split('T')[0]

    _, error = find_all_flights_from_airports(city_source=city_source,
                                              iata_airports_destinations=iata_airports_destinations,
                                              departure=departure_in_the_past, airport_repository=fake_repository,
                                              flight_gateway=fake_gateway, max_price=price, currency_rate_mapping=currency_rate_mapping)

    assert error == 'Departure date is in the past'


def test_when_departure_is_not_at_iso_format_yyyy_mm_dd_then_should_return_error(fake_repository, fake_gateway):
    departure_in_the_wrong_format = (datetime.now() + timedelta(days=1)).isoformat()

    _, error = find_all_flights_from_airports(city_source=city_source,
                                              iata_airports_destinations=iata_airports_destinations,
                                              departure=departure_in_the_wrong_format, airport_repository=fake_repository,
                                              flight_gateway=fake_gateway, max_price=price, currency_rate_mapping=currency_rate_mapping)

    assert error == 'Invalid departure date'


def test_it_should_convert_it_back_to_brl_when_return(fake_repository, fake_gateway):
    flights, _ = find_all_flights_from_airports(city_source=city_source,
                                                iata_airports_destinations=iata_airports_destinations,
                                                departure=departure, airport_repository=fake_repository,
                                                flight_gateway=fake_gateway, max_price=price,
                                                currency_rate_mapping=currency_rate_mapping)

    assert flights[0].price == price
    assert flights[0].currency_code == 'BRL'


@pytest.fixture
def fake_repository():
    return FakeRepository(airports=[*destinations])


@pytest.fixture
def fake_gateway():
    departure_date = datetime.now()
    arrival_date = departure_date + timedelta(hours=2)
    flights = [
        FoundFlight(source=source['code'],
                    destination=destinations[1]['code'],
                    departure_date=departure_date,
                    arrival_date=arrival_date,
                    carrier='Carrier',
                    total_price=Decimal('100.00'),
                    currency='EUR'),
        FoundFlight(source=source['code'],
                    destination=destinations[2]['code'],
                    departure_date=departure_date,
                    arrival_date=arrival_date,
                    carrier='Carrier',
                    total_price=Decimal('100.00'),
                    currency='EUR')
    ]

    return FakeGateway(flights=flights)


@pytest.fixture
def fake_currency_rate_gateway():
    return FakeCurrencyRateGateway()
