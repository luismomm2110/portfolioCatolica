from _decimal import Decimal
from datetime import datetime

from src.gateways.gateway_amadeus import FakeGateway
from src.models.model import Airport, Coordinate, Flight
from src.repositories.repository_iata import FakeRepository
from src.services.services import find_flights_within_range


def test_returns_list_of_flights():
    distance = 3750
    source = Airport(code='GRU', coordinate=Coordinate(latitude=Decimal('-23.4323'), longitude=Decimal('-46.4695')))
    destiny_one = Airport(code='BRC', coordinate=Coordinate(latitude=Decimal('-41.1629'), longitude=Decimal('-71.2165')))
    destiny_two = Airport(code='SCL', coordinate=Coordinate(latitude=Decimal('-33.3930'), longitude=Decimal('-70.7858')))
    possible_flights = [
        Flight(source=source, destination=destiny_one, price=Decimal('1000.00'), date=datetime(2020, 1, 1)),
        Flight(source=source, destination=destiny_two, price=Decimal('2000.00'), date=datetime(2020, 1, 1))
    ]
    airports_in_repository = [source, destiny_one, destiny_two]
    repository = FakeRepository(airports_in_repository)
    gateway = FakeGateway(flights=possible_flights)

    flights = find_flights_within_range(source=source, initial_date=datetime(2020, 1, 1),
                                        final_date=datetime(2020, 1, 1), desired_range=distance,
                                        repository=repository, gateway=gateway)

    assert flights == possible_flights


def test_when_no_flights_found_returns_empty_list():
    distance = 375
    source = Airport(code='GRU', coordinate=Coordinate(latitude=Decimal('-23.4323'), longitude=Decimal('-46.4695')))
    destiny_one = Airport(code='BRC', coordinate=Coordinate(latitude=Decimal('-41.1629'), longitude=Decimal('-71.2165')))
    destiny_two = Airport(code='SCL', coordinate=Coordinate(latitude=Decimal('-33.3930'), longitude=Decimal('-70.7858')))
    possible_flights = [
        Flight(source=source, destination=destiny_one, price=Decimal('1000.00'), date=datetime(2020, 1, 1)),
        Flight(source=source, destination=destiny_two, price=Decimal('2000.00'), date=datetime(2020, 1, 1))
    ]
    airports_in_repository = [source, destiny_one, destiny_two]
    repository = FakeRepository(airports_in_repository)
    gateway = FakeGateway(flights=possible_flights)

    flights = find_flights_within_range(source=source, initial_date=datetime(2020, 1, 1),
                                        final_date=datetime(2020, 1, 1), desired_range=distance,
                                        repository=repository, gateway=gateway)

    assert flights == []

