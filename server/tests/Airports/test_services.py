from server.src.Airports.services.services import find_nearest_airports_by_city, find_city
from server.src.Airports.repositories.repository import FakeRepository
from server.tests.utils import source, destination, destinations

import pytest


def test_when_find_airports_they_should_be_ordered_by_distance(fake_repository):
    city = 'São Paulo'
    limit = 2

    airports = find_nearest_airports_by_city(city, limit, fake_repository)

    airports_outside_city = [airport for airport in airports if airport['municipality'] != city]
    first_airport, second_aiport = airports_outside_city[0], airports_outside_city[1]
    assert first_airport['distance'] < second_aiport['distance']


def test_when_search_for_an_inexistent_city_then_return_empty_list(fake_repository):
    city = 'Inexistent City'
    limit = 50

    airports = find_nearest_airports_by_city(city, limit, fake_repository)

    assert airports == []


def test_when_search_for_a_city_with_perfetch_match_then_return_it(fake_repository):
    searched_city = 'São Paulo'

    returned_city = find_city(searched_city, fake_repository)

    assert returned_city == searched_city


def test_when_search_for_a_city_with_diferent_case_and_accentuation_then_should_return_it(fake_repository):
    searched_city = 'saO pauLo'

    returned_city = find_city(searched_city, fake_repository)

    assert returned_city == 'São Paulo'


def test_when_search_for_a_city_untrimmed(fake_repository):
    searched_city = '  São Paulo  '

    returned_city = find_city(searched_city, fake_repository)

    assert returned_city == 'São Paulo'

def test_when_search_for_a_city_then_return_the_nearest_fifty_airports(fake_repository):
    city = 'São Paulo'
    limit = 50

    airports = find_nearest_airports_by_city(city, limit, fake_repository)

    assert len(airports) == limit

@pytest.fixture
def fake_repository():
    return FakeRepository(airports=[source, destination, *destinations])

