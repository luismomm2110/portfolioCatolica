from _decimal import Decimal
from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True)
class TripGoal:
    source: str
    destination: str
    price: Decimal
    departure: str # YYYY-MM-DD
    currency_code: str


@dataclass(frozen=True)
class FoundFlight:
    city_source: str
    city_destination: str
    total_price: Decimal
    departure_date: str # Isoformat
    arrival_date: str # Isoformat
    currency: str
    carrier: str
