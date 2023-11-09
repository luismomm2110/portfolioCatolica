from _decimal import Decimal
from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True)
class Flight:
    source: dict
    destination: dict
    price: Decimal
    departure: datetime


