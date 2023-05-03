import math
from datetime import datetime
from typing import List

from src.gateways.gateway_amadeus import AbstractGateway
from src.models.model import Airport, Flight, Coordinate
from src.repositories.repository_iata import AbstractRepository


def find_flights_within_range(source: Airport, initial_date: datetime, final_date: datetime, desired_range: int,
                              repository: AbstractRepository, gateway: AbstractGateway) -> List[Flight]:
    airports = repository.fetch_airports()
    possible_airports = []
    for airport in airports:
        if _distance_in_km(source.coordinate, airport.coordinate) <= desired_range and airport != source:
            possible_airports.append(airport)

    flights = gateway.get(source, possible_airports, initial_date, final_date)

    return flights


def _distance_in_km(p1: Coordinate, p2: Coordinate):
    radius_earth_in_km = 6371

    lat1 = math.radians(p1.latitude)
    lon1 = math.radians(p1.longitude)
    lat2 = math.radians(p2.latitude)
    lon2 = math.radians(p2.longitude)

    difference_latitude = lat2 - lat1
    difference_longitude = lon2 - lon1
    a = math.sin(difference_latitude / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(
        difference_longitude / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return radius_earth_in_km * c
