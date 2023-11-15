from dataclasses import dataclass
from decimal import Decimal


@dataclass(frozen=True)
class CurrencyRate:
    currency: str
    rate: Decimal
    last_update: str


@dataclass(frozen=True)
class CurrencyRateMapping:
    mapping: dict[CurrencyRate.currency, CurrencyRate.rate]

