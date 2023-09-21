from server.src.models.model import get_possible_airports

source = {'iata_code': 'GRU', 'coordinates': '-23.4355556, -46.4730556'}
original_destination = {'iata_code': 'LAX', 'coordinates': '33.9425361, -118.4080751'}
other_destinations = [
    {'iata_code': 'SAN', 'coordinates': '32.733556, -117.189657'},
    {'iata_code': 'SFO', 'coordinates': '37.618972, -122.374889'}
]


def test_given_range_when_search_for_airport_inside_it_then_return_all():
    searched_flights = get_possible_airports(source, original_destination, other_destinations, 10000000)

    assert searched_flights == other_destinations


def test_given_none_airport_within_distance_range_then_return_emppy():
    searched_airports = get_possible_airports(source, original_destination, other_destinations, 100)

    assert searched_airports == []
