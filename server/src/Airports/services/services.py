from dataclasses import asdict

from server.src.Airports.models.model import distance_in_km
from server.src.Airports.repositories.repository import AbstractRepository


def find_nearest_airports_by_city(city: str, limit: int, repository: AbstractRepository):
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
