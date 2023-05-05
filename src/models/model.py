import math
from _decimal import Decimal
from dataclasses import dataclass
from datetime import datetime

from typing import List


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


def get_possible_airports(source: Airport, airports: List[Airport], desired_range: int) -> List[Airport]:
    return [airport for airport in airports if _distance_in_km(source.coordinate, airport.coordinate)
            <= desired_range  and airport != source]


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
