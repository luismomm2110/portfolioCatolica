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
    coordinates: Coordinate


@dataclass(frozen=True)
class Flight:
    source: dict
    destination: dict
    price: Decimal
    departure: datetime


def get_possible_airports(source: dict, destination: dict, airports: List[dict], desired_range: int) \
        -> List[dict]:
    return [airport for airport in airports if _distance_in_km(destination['coordinates'], airport['coordinates'])
            <= desired_range and airport != source]


def _distance_in_km(p1: str, p2: str):
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

    return radius_earth_in_km * c
