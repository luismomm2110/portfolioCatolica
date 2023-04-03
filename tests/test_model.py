import pytest

from _decimal import Decimal

from models.model import Airport, TouristicArea, Flight


def test_find_all_flights_within_searched_area_ordered_by_price():
    source = Airport('CGH')
    flight_1 = Flight(source, Airport('EZE'), Decimal(2000))
    flight_2 = Flight(source, Airport('SCL'), Decimal(1000))

    area = TouristicArea('South America', [flight_1, flight_2])

    flights = area.find_all_flights_from_source(source)

    assert len(flights) == 2
    assert flights[0].source.code == 'CGH'
    assert flights[0].destination.code == 'SCL'
    assert flights[0].price == 1000
    assert flights[1].source.code == 'CGH'
    assert flights[1].destination.code == 'EZE'
    assert flights[1].price == 2000


def test_dont_find_flights_from_other_sources():
    source = Airport('CGH')
    other_source = Airport('EZE')
    flight_1 = Flight(source, Airport('SCL'), Decimal(1000))
    flight_2 = Flight(source, Airport('EZE'), Decimal(2000))

    area = TouristicArea('South America', [flight_1, flight_2])

    flights = area.find_all_flights_from_source(other_source)

    assert len(flights) == 0
