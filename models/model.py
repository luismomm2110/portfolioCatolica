import math
from _decimal import Decimal
from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True)
class Coordinate:
    latitude: Decimal
    longitude: Decimal


@dataclass(frozen=True)
class Airport:
    code: str
    coordinate: Coordinate


@dataclass(frozen=True)
class Flight:
    source: Airport
    destination: Airport
    price: Decimal
    date: datetime


def find_flights(source: Airport, flights: list[Flight], initial_date: datetime, final_date: datetime, desired_range: int) -> [Flight]:
    return sorted([flight for flight in flights if flight.source == source and
                   initial_date <= flight.date <= final_date and
                   _distance_in_km(source.coordinate, flight.destination.coordinate) <= desired_range
                   ], key=lambda flight: flight.price)


def _distance_in_km(p1: Coordinate, p2: Coordinate):
    radius_earth_in_km = 6371

    lat1 = math.radians(p1.latitude)
    lon1 = math.radians(p1.longitude)
    lat2 = math.radians(p2.latitude)
    lon2 = math.radians(p2.longitude)

    difference_latitude = lat2 - lat1
    difference_longitude = lon2 - lon1
    a = math.sin(difference_latitude / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(difference_longitude / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return radius_earth_in_km * c
