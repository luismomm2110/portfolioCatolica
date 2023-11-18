from _decimal import Decimal
from dataclasses import dataclass
from datetime import datetime

from server.src.Airports.models.model import Municipality


@dataclass(frozen=True)
class TripGoal:
    source: dict
    destination: dict
    price: Decimal
    departure: str # YYYY-MM-DD
    currency_code: str


@dataclass(frozen=True)
class FoundFlight:
    city_source: Municipality
    city_destination: Municipality
    total_price: Decimal
    departure_date: datetime # Isoformat
    arrival_date: datetime # Isoformat
    currency: str
    carrier: str
