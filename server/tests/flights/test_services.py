from _decimal import Decimal
from datetime import datetime, timedelta

import pytest

from server.src.flights.gateways.gateway_amadeus import FakeGateway
from server.src.flights.models.model import Flight
from server.src.flights.repositories.repository_iata import FakeRepository
from server.src.flights.services.services import find_flights_within_range, find_nearest_airports_by_city

source = {'code': 'GRU', 'coordinates': '-23.4355556, -46.4730556', 'municipality': 'São Paulo'}
destination = {'code': 'LAX', 'coordinates': '33.9425361, -118.4080751', 'municipality': 'Los Angeles'}
destinations = [
    source, destination,
    {'code': 'SAN', 'coordinates': '32.733556, -117.189657', 'municipality': 'San Diego'},
    {'code': 'SFO', 'coordinates': '37.618972, -122.374889', 'municipality': 'San Francisco'},
    {'code': 'SJC', 'coordinates': '37.3626, -121.929022', 'municipality': 'San Jose'},
    {'code': 'JFK', 'coordinates': '40.641311, -73.778139', 'municipality': 'New York'},
    {'code': 'ORD', 'coordinates': '41.974162, -87.907321', 'municipality': 'Chicago'},
    {'code': 'ATL', 'coordinates': '33.640728, -84.427700', 'municipality': 'Atlanta'},
    {'code': 'DFW', 'coordinates': '32.899809, -97.040335', 'municipality': 'Dallas-Fort Worth'},
    {'code': 'DEN', 'coordinates': '39.856096, -104.673738', 'municipality': 'Denver'},
    {'code': 'SEA', 'coordinates': '47.450250, -122.308817', 'municipality': 'Seattle'},
    {'code': 'MIA', 'coordinates': '25.795865, -80.287046', 'municipality': 'Miami'},
    {'code': 'BOS', 'coordinates': '42.365613, -71.009560', 'municipality': 'Boston'},
    {'code': 'PHL', 'coordinates': '39.871950, -75.241140', 'municipality': 'Philadelphia'},
    {'code': 'DCA', 'coordinates': '38.851242, -77.040232', 'municipality': 'Washington'},
    {'code': 'IAD', 'coordinates': '38.9531, -77.4565', 'municipality': 'Washington'},
    {'code': 'CLT', 'coordinates': '35.214403, -80.943126', 'municipality': 'Charlotte'},
    {'code': 'LAS', 'coordinates': '36.084, -115.153739', 'municipality': 'Las Vegas'},
    {'code': 'PHX', 'coordinates': '33.434278, -112.011583', 'municipality': 'Phoenix'},
    {'code': 'MCO', 'coordinates': '28.429394, -81.308994', 'municipality': 'Orlando'},
    {'code': 'HNL', 'coordinates': '21.326, -157.921997', 'municipality': 'Honolulu'},
    {'code': 'EWR', 'coordinates': '40.689531, -74.174462', 'municipality': 'Newark'},
    {'code': 'DTW', 'coordinates': '42.212063, -83.353302', 'municipality': 'Detroit'},
    {'code': 'MSP', 'coordinates': '44.884755, -93.222285', 'municipality': 'Minneapolis'},
    {'code': 'SLC', 'coordinates': '40.789940, -111.979071', 'municipality': 'Salt Lake City'},
    {'code': 'BWI', 'coordinates': '39.177404, -76.668392', 'municipality': 'Baltimore'},
    {'code': 'MDW', 'coordinates': '41.786776, -87.752188', 'municipality': 'Chicago'},
    {'code': 'FLL', 'coordinates': '26.074234, -80.150602', 'municipality': 'Fort Lauderdale'},
    {'code': 'IAH', 'coordinates': '29.984433, -95.341442', 'municipality': 'Houston'},
    {'code': 'TPA', 'coordinates': '27.975472, -82.533250', 'municipality': 'Tampa'},
    {'code': 'PDX', 'coordinates': '45.589769, -122.595094', 'municipality': 'Portland'},
    {'code': 'STL', 'coordinates': '38.748697, -90.370028', 'municipality': 'St. Louis'},
    {'code': 'HOU', 'coordinates': '29.645419, -95.278888', 'municipality': 'Houston'},
    {'code': 'OAK', 'coordinates': '37.721278, -122.220722', 'municipality': 'Oakland'},
    {'code': 'MKE', 'coordinates': '42.947553, -87.896646', 'municipality': 'Milwaukee'},
    {'code': 'IND', 'coordinates': '39.716859, -86.295595', 'municipality': 'Indianapolis'},
    {'code': 'RDU', 'coordinates': '35.877639, -78.787472', 'municipality': 'Raleigh/Durham'},
    {'code': 'LHR', 'coordinates': '51.470020, -0.454295', 'municipality': 'London'},
    {'code': 'CDG', 'coordinates': '49.009690, 2.547925', 'municipality': 'Paris'},
    {'code': 'AMS', 'coordinates': '52.310539, 4.768274', 'municipality': 'Amsterdam'},
    {'code': 'FRA', 'coordinates': '50.037932, 8.562152', 'municipality': 'Frankfurt'},
    {'code': 'IST', 'coordinates': '40.976898, 28.814598', 'municipality': 'Istanbul'},
    {'code': 'MAD', 'coordinates': '40.471926, -3.569498', 'municipality': 'Madrid'},
    {'code': 'BCN', 'coordinates': '41.296948, 2.078464', 'municipality': 'Barcelona'},
    {'code': 'FCO', 'coordinates': '41.800277, 12.238888', 'municipality': 'Rome'},
    {'code': 'MXP', 'coordinates': '45.630606, 8.728111', 'municipality': 'Milan'},
    {'code': 'DUB', 'coordinates': '53.421333, -6.270075', 'municipality': 'Dublin'},
    {'code': 'SVO', 'coordinates': '55.972642, 37.414589', 'municipality': 'Moscow'},
    {'code': 'CPT', 'coordinates': '-33.964806, 18.601667', 'municipality': 'Cape Town'},
    {'code': 'JNB', 'coordinates': '-26.139166, 28.246', 'municipality': 'Johannesburg'},
    {'code': 'DXB', 'coordinates': '25.253175, 55.365673', 'municipality': 'Dubai'},
    {'code': 'HKG', 'coordinates': '22.308047, 113.918480', 'municipality': 'Hong Kong'},
    {'code': 'NRT', 'coordinates': '35.764722, 140.386389', 'municipality': 'Tokyo'},
    {'code': 'ICN', 'coordinates': '37.469075, 126.450517', 'municipality': 'Seoul'},
]

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


def test_when_find_airports_they_should_be_ordered_by_distance(fake_repository):
    city = 'São Paulo'
    limit = 2

    airports = find_nearest_airports_by_city(city, limit, fake_repository)

    airports_outside_city = [airport for airport in airports if airport[0].municipality != city]
    assert (airports_outside_city[0][1] < airports_outside_city[1][1])


def test_when_search_for_an_inexistent_city_then_return_empty_list(fake_repository):
    city = 'Inexistent City'
    limit = 50

    airports = find_nearest_airports_by_city(city, limit, fake_repository)

    assert airports == []


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
