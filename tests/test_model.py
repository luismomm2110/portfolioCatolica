from _decimal import Decimal

from src.models.model import Airport, Coordinate, get_possible_airports

source = Airport('GRU', Coordinate(Decimal('-23.4355556'), Decimal('-46.4730556')))
original_destination = Airport('LAX', Coordinate(Decimal('33.9425361'), Decimal('-118.408075')))
other_destinations = [
    Airport('SAN', Coordinate(Decimal('32.733556'), Decimal('-117.189657'))),
    Airport('SFO', Coordinate(Decimal('37.618972'), Decimal('-122.374889'))),
]


def test_given_range_when_search_for_airport_inside_it_then_return_all():
    searched_flights = get_possible_airports(source, original_destination, other_destinations, 10000000)

    assert searched_flights == other_destinations


def test_given_none_airport_within_distance_range_then_return_emppy():
    searched_airports = get_possible_airports(source, original_destination, other_destinations, 100)

    assert searched_airports == []
