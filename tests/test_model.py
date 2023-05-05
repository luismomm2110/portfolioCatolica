from datetime import datetime

from _decimal import Decimal

from src.models.model import Airport, Coordinate, Flight, get_possible_airports


def test_given_range_when_search_for_airport_inside_it_then_return_all():
    source = Airport('GRU', Coordinate(Decimal('-23.4355556'), Decimal('-46.4730556')))
    original_destination = Airport('LAX', Coordinate(Decimal('33.9425361'), Decimal('-118.408075')))
    expected = [
        Airport('BRC', Coordinate(Decimal('-41.162899'), Decimal('-71.216904'))),
        Airport('SCL', Coordinate(Decimal('-33.393001'), Decimal('-70.785797'))),
        Airport('PUQ', Coordinate(Decimal('-53.002602'), Decimal('-70.854599'))),
    ]

    searched_flights = get_possible_airports(source, expected, 10000000)

    assert searched_flights == expected


def test_given_none_airport_within_distance_range_then_return_emppy():
    source = Airport('GRU', Coordinate(Decimal('-23.4355556'), Decimal('-46.4730556')))
    airports = [
        Airport('LAX', Coordinate(Decimal('33.9425361'), Decimal('-118.408075'))),
        Airport('BRC', Coordinate(Decimal('-41.162899'), Decimal('-71.216904'))),
        Airport('SCL', Coordinate(Decimal('-33.393001'), Decimal('-70.785797'))),
        Airport('PUQ', Coordinate(Decimal('-53.002602'), Decimal('-70.854599'))),
    ]

    searched_flights = get_possible_airports(source, airports, 100)

    assert searched_flights == []
