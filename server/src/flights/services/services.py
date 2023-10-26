import math
from datetime import datetime
from decimal import Decimal
from typing import List, Tuple

from server.src.flights.gateways.gateway_amadeus import AbstractGateway
from server.src.flights.models.model import get_possible_airports, Flight, Airport
from server.src.flights.repositories.repository_iata import AbstractRepository


def find_flights_within_range(iata_source: str, iata_destination: str, departure: datetime, desired_range: int,
                              repository: AbstractRepository, gateway: AbstractGateway) -> List[Flight]:
    airports = repository.fetch_airports()
    iata_source = repository.fetch_airport(iata_source)
    iata_destination = repository.fetch_airport(iata_destination)
    possible_airports = get_possible_airports(iata_source, iata_destination, airports, desired_range)
    flights = gateway.get(iata_source, possible_airports, departure)

    return flights


def find_nearest_airports_by_city(city: str, limit: int, repository: AbstractRepository) -> List[Tuple[Airport, Decimal]]:
    airports_of_city = repository.fetch_airports_by_municipality(city)
    if not airports_of_city:
        return []

    first_airport_of_city = airports_of_city[0]

    airports = repository.fetch_airports()
    all_airports = set(airports + airports_of_city)
    airports_and_distance = []
    for airport in all_airports:
        airports_and_distance.append((airport, _distance_in_km(first_airport_of_city.coordinates, airport.coordinates)))

    return sorted(airports_and_distance, key=lambda x: x[1])[:limit + len(airports_of_city)]


def _distance_in_km(p1: str, p2: str) -> Decimal:
    lat1, lon1 = p1.split(',')
    lat2, lon2 = p2.split(',')
    radius_earth_in_km = 6371

    lat1 = math.radians(float(lat1))
    lon1 = math.radians(float(lon1))
    lat2 = math.radians(float(lat2))
    lon2 = math.radians(float(lon2))

    difference_latitude = lat2 - lat1
    difference_longitude = lon2 - lon1
    a = math.sin(difference_latitude / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(difference_longitude / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return Decimal(str(radius_earth_in_km * c))
