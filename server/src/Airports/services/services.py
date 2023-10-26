from decimal import Decimal
from typing import List, Tuple

from server.src.Airports.models.model import Airport, distance_in_km
from server.src.Airports.repositories.repository import AbstractRepository


def find_nearest_airports_by_city(city: str, limit: int, repository: AbstractRepository) -> List[Tuple[Airport, Decimal]]:
    airports_of_city = repository.fetch_airports_by_municipality(city)
    if not airports_of_city:
        return []

    first_airport_of_city = airports_of_city[0]

    airports = repository.fetch_airports()
    all_airports = set(airports + airports_of_city)
    airports_and_distance = []
    for airport in all_airports:
        airports_and_distance.append((airport, distance_in_km(first_airport_of_city.coordinates, airport.coordinates)))

    return sorted(airports_and_distance, key=lambda x: x[1])[:limit + len(airports_of_city)]
