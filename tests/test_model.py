from datetime import datetime

import pytest

from _decimal import Decimal

from models.model import Airport, Flight, find_flights, Coordinate


def test_given_range_and_date_with_flight_when_search_for_flight_then_return_ordered_by_price():
    source = Airport('GRU', Coordinate(Decimal('-23.4355556'), Decimal('-46.4730556')))
    original_destination = Airport('LAX', Coordinate(Decimal('33.9425361'), Decimal('-118.408075')))
    cheaper_possible_destination = Airport('LAS', Coordinate(Decimal('36.080056'), Decimal('-115.15225')))
    flights = [
        Flight(source, original_destination, Decimal('100'), datetime(2021, 1, 1)),
        Flight(source, cheaper_possible_destination, Decimal('50'), datetime(2021, 1, 1)),
    ]
    expected = [
        Flight(source, cheaper_possible_destination, Decimal('50'), datetime(2021, 1, 1)),
        Flight(source, original_destination, Decimal('100'), datetime(2021, 1, 1))
    ]

    searched_flights = find_flights(source, flights, datetime(2021, 1, 1), datetime(2021, 1, 1), 10000000)

    assert searched_flights == expected


def test_given_none_flight_within_date_range_when_search_then_return_empty():
    source = Airport('GRU', Coordinate(Decimal('-23.4355556'), Decimal('-46.4730556')))
    destination = Airport('LAX', Coordinate(Decimal('33.9425361'), Decimal('-118.408075')))
    flights = [
        Flight(source, destination, Decimal('100'), datetime(2021, 1, 1)),
    ]

    searched_flights = find_flights(source, flights, datetime(2021, 1, 2), datetime(2021, 1, 2), 10000000)

    assert searched_flights == []


def test_given_none_flight_within_range_when_search_then_return_empty():
    source = Airport('GRU', Coordinate(Decimal('-23.4355556'), Decimal('-46.4730556')))
    destination = Airport('LAX', Coordinate(Decimal('33.9425361'), Decimal('-118.408075')))
    flights = [
        Flight(source, destination, Decimal('100'), datetime(2021, 1, 1)),
    ]

    searched_flights = find_flights(source, flights, datetime(2021, 1, 1), datetime(2021, 1, 1), 1)

    assert searched_flights == []
