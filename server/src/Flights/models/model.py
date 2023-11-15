from _decimal import Decimal
from dataclasses import dataclass

from server.src.CurrencyRate.models.models import CurrencyRate


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
    price: Decimal
    departure: str # YYYY-MM-DD
    currency: CurrencyRate
