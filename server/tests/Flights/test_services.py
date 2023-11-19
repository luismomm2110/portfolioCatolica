from _decimal import Decimal
from datetime import datetime, timedelta

import pytest

from server.src.Airports.repositories.repository import FakeAirportRepository
from server.src.CurrencyRate.gateways.gateways import FakeCurrencyRateGateway
from server.src.Flights.gateways.gateway_amadeus import FakeGateway
from server.src.Flights.models.model import FoundFlight
from server.src.Flights.services.services import find_all_flights_from_airports
from server.tests.utils import source, all_airports

currency_rate_mapping = FakeCurrencyRateGateway().get_currency_rate_mapping()
price = Decimal('100')
city_source = 'São Paulo'
iata_airports_destinations = {'LAX', 'SAN'}
departure = datetime.now().isoformat().split('T')[0]
airport_repository = FakeAirportRepository(airports=[*all_airports])


def test_when_search_for_flights_with_all_inputs_then_should_return_correct_flights(fake_repository, fake_gateway):
    flights, _ = find_all_flights_from_airports(city_origin=city_source, iata_airports_destinations=iata_airports_destinations, departure=departure,
                                                airport_repository=fake_repository, flight_gateway=fake_gateway, currency_rate_mapping=currency_rate_mapping, max_price=price)

    assert len(flights) == 2
    assert flights[0].city_source == city_source
    assert flights[0].city_destination == all_airports[1]['municipality']
    assert flights[0].departure_date == departure
    assert flights[0].total_price == price
    assert flights[0].currency == 'BRL'
    assert flights[1].city_source == city_source
    assert flights[1].city_destination == all_airports[2]['municipality']
    assert flights[1].departure_date == departure
    assert flights[1].total_price == price
    assert flights[0].currency == 'BRL'


def test_when_send_missing_destinations_then_it_should_not_find(fake_repository, fake_gateway):
    missing_iata_airports_destinations = {'FOO', 'BAR'}

    flights, _ = find_all_flights_from_airports(city_origin=city_source, iata_airports_destinations=missing_iata_airports_destinations, departure=departure,
                                                airport_repository=fake_repository, flight_gateway=fake_gateway, currency_rate_mapping=currency_rate_mapping, max_price=price)

    assert len(flights) == 0


def test_when_dont_find_city_source_then_should_return_error(fake_repository, fake_gateway):
    wrong_city_source = 'Missing city'

    _, error = find_all_flights_from_airports(city_origin=wrong_city_source, iata_airports_destinations=iata_airports_destinations, departure=departure,
                                              airport_repository=fake_repository, flight_gateway=fake_gateway, currency_rate_mapping=currency_rate_mapping, max_price=price)

    assert error == 'City not found'


def test_dont_find_flights_when_departure_is_not_available(fake_repository, fake_gateway):
    date_in_the_far_future = (datetime.now() + timedelta(days=100)).isoformat().split('T')[0]

    flights, _ = find_all_flights_from_airports(city_origin=city_source, iata_airports_destinations=iata_airports_destinations, departure=date_in_the_far_future,
                                                airport_repository=fake_repository, flight_gateway=fake_gateway, currency_rate_mapping=currency_rate_mapping, max_price=price)

    assert len(flights) == 0


def test_when_dont_send_price_then_it_should_no_cap_by_price(fake_repository, fake_gateway):
    missing_max_price = None

    flights, _ = find_all_flights_from_airports(city_origin=city_source, iata_airports_destinations=iata_airports_destinations, departure=departure,
                                                airport_repository=fake_repository, flight_gateway=fake_gateway, currency_rate_mapping=currency_rate_mapping,
                                                max_price=missing_max_price)

    assert len(flights) == 2


def test_when_date_is_in_the_past_then_should_return_error(fake_repository, fake_gateway):
    departure_in_the_past = (datetime.now() - timedelta(days=1)).isoformat().split('T')[0]

    _, error = find_all_flights_from_airports(city_origin=city_source, iata_airports_destinations=iata_airports_destinations, departure=departure_in_the_past,
                                              airport_repository=fake_repository, flight_gateway=fake_gateway, currency_rate_mapping=currency_rate_mapping, max_price=price)

    assert error == 'Departure date is in the past'


def test_when_departure_is_not_at_iso_format_yyyy_mm_dd_then_should_return_error(fake_repository, fake_gateway):
    departure_in_the_wrong_format = (datetime.now() + timedelta(days=1)).isoformat()

    _, error = find_all_flights_from_airports(city_origin=city_source, iata_airports_destinations=iata_airports_destinations, departure=departure_in_the_wrong_format,
                                              airport_repository=fake_repository, flight_gateway=fake_gateway, currency_rate_mapping=currency_rate_mapping, max_price=price)

    assert error == 'Invalid departure date'


def test_when_dont_find_city_destination_then_should_return_error(fake_repository, fake_gateway):
    fake_repository = FakeAirportRepository(airports=[source])
    fake_gateway = FakeGateway(flights=[])

    _, error = find_all_flights_from_airports(city_origin=city_source, iata_airports_destinations=iata_airports_destinations, departure=departure,
                                              airport_repository=fake_repository, flight_gateway=fake_gateway, currency_rate_mapping=currency_rate_mapping, max_price=price)

    assert error == 'City not found for one or more destinations'


@pytest.fixture
def fake_repository():
    return FakeAirportRepository(airports=[*all_airports])


@pytest.fixture
def fake_gateway():
    departure_date = datetime.now()
    arrival_date = departure_date + timedelta(hours=2)
    flights = [
        FoundFlight(city_source=source['code'],
                    city_destination=all_airports[1]['code'],
                    departure_date=departure_date,
                    arrival_date=arrival_date,
                    carrier='Carrier',
                    total_price=Decimal('560.00'),
                    currency='EUR'),
        FoundFlight(city_source=source['code'],
                    city_destination=all_airports[2]['code'],
                    departure_date=departure_date,
                    arrival_date=arrival_date,
                    carrier='Carrier',
                    total_price=Decimal('560.00'),
                    currency='EUR')
    ]

    return FakeGateway(flights=flights)


@pytest.fixture
def fake_currency_rate_gateway():
    return FakeCurrencyRateGateway()
