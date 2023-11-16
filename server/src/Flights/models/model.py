from _decimal import Decimal
from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True)
class TripGoal:
    source: dict
    destination: dict
    price: Decimal
    departure: str # YYYY-MM-DD
    currency_code: str


@dataclass(frozen=True)
class FoundFlight:
    source: str
    destination: str
    total_price: Decimal
    departure: datetime # Isoformat
    arrival: datetime # Isoformat
    currency: str
    carrier: str
