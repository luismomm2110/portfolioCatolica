from _decimal import Decimal
from dataclasses import dataclass
from datetime import datetime

from typing import List

from server.src.Airports.models.model import _distance_in_km


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


