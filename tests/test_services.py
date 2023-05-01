from _decimal import Decimal
from datetime import datetime

from src.gateways.gateway_amadeus import FakeGateway
from src.models.model import Airport, Coordinate, Flight
from src.repositories.repository_iata import FakeRepository


def test_returns_list_of_flights():
    source = Airport(code='GRU', coordinate=Coordinate(latitude=Decimal('-23.4323'), longitude=Decimal('-46.4695')))
    possible_flights = [
        Flight(source=source, destination=Airport(code='BRC', coordinate=Coordinate(latitude=Decimal('-41.1629'),
                                                                                    longitude=Decimal('-71.2165'))),
               price=Decimal('125.00'), date=datetime(2020, 1, 1, 10, 0, 0)),
        Flight(source=source, destination=Airport(code='SCL', coordinate=Coordinate(latitude=Decimal('-33.3930'),
                                                                                    longitude=Decimal('-70.7858'))),
               price=Decimal('125.00'), date=datetime(2020, 1, 1, 10, 0, 0)),
    ]
    airports = [Airport(code='BRC', coordinate=Coordinate(latitude=Decimal('-41.1629'), longitude=Decimal('-71.2165'))),
                Airport(code='SCL', coordinate=Coordinate(latitude=Decimal('-33.3930'), longitude=Decimal('-70.7858')))]
    repository = FakeRepository(airports)
    gateway = FakeGateway(flights=possible_flights)



