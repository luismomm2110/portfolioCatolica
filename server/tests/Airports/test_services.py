from server.src.Airports.services.services import find_nearest_airports_by_city


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
