from _decimal import Decimal
from dataclasses import dataclass


@dataclass(frozen=True)
class Flight:
    source: dict
    destination: dict
    price: Decimal
    departure: str
    currency_code: str


