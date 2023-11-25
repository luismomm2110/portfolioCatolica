import unicodedata
from dataclasses import asdict

from Airports.models.model import distance_in_km
from Airports.repositories.repository import AbstractAirportRepository


def find_nearest_airports_by_city(city: str, limit: int, repository: AbstractAirportRepository):
    airports_of_city = repository.fetch_airports_by_municipality(city)
    if not airports_of_city:
        return []

    first_airport_of_city = airports_of_city[0]

    airports = repository.fetch_airports()
    all_airports = set(airports + airports_of_city)
    airports_data = []
    for airport in all_airports:
        airport_data = asdict(airport)
        airport_data['distance'] = round(distance_in_km(first_airport_of_city.coordinates, airport.coordinates), 2)
        airports_data.append(airport_data)

    return sorted(airports_data, key=lambda a: a['distance'])[:limit + len(airports_of_city)]


def find_city(city: str, repository: AbstractAirportRepository):
    fetched_cities = repository.fetch_municipalities()
    normalized_input_city = city.strip().lower()
    normalized_input_city = _remove_accents(normalized_input_city)

    for fecthed_city in fetched_cities:
        if isinstance(fecthed_city, str):
            normalized_city_in_repository = fecthed_city.lower()
            normalized_city_in_repository = _remove_accents(normalized_city_in_repository)
            if normalized_city_in_repository == normalized_input_city:
                return fecthed_city
    return None


def _remove_accents(input_str):
    # Normalize the input string to decompose the characters into base characters and their modifiers
    nfkd_form = unicodedata.normalize('NFKD', input_str)
    # Return the string with only base characters, removing the modifiers (accents)
    return "".join([c for c in nfkd_form if not unicodedata.combining(c)])
