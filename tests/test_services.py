from _decimal import Decimal
from datetime import datetime

from src.gateways.gateway_amadeus import FakeGateway
from src.models.model import Airport, Coordinate, Flight
from src.repositories.repository_iata import FakeRepository
from src.services.services import find_flights_within_range


def test_returns_list_of_flights():
    distance = 1000
    source = Airport(code='GRU', coordinate=Coordinate(latitude=Decimal('-23.4323'), longitude=Decimal('-46.4695')))
    possible_flights = [
        Flight(source=source, destination=Airport(code='BRC', coordinate=Coordinate(latitude=Decimal('-41.1629'),
                                                                                    longitude=Decimal('-71.2165'))),
               price=Decimal('125.00'), date=datetime(2020, 1, 1, 10, 0, 0)),
        Flight(source=source, destination=Airport(code='SCL', coordinate=Coordinate(latitude=Decimal('-33.3930'),
                                                                                    longitude=Decimal('-70.7858'))),
               price=Decimal('125.00'), date=datetime(2020, 1, 1, 10, 0, 0)),
    ]
    airports_in_repository = [Airport(code='BRC', coordinate=Coordinate(latitude=Decimal('-41.1629'), longitude=Decimal('-71.2165'))),
                              Airport(code='SCL', coordinate=Coordinate(latitude=Decimal('-33.3930'), longitude=Decimal('-70.7858')))]
    repository = FakeRepository(airports_in_repository)
    gateway = FakeGateway(flights=possible_flights)

    flights = find_flights_within_range(source=source, initial_date=datetime(2020, 1, 1, 0, 0, 0), final_date=datetime(2020, 1, 1, 23, 59, 59),
                                        desired_range=distance, repository=repository, gateway=gateway)

    assert flights == possible_flights



