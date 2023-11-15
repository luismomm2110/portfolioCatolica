from abc import abstractmethod, ABC
from decimal import Decimal

from server.src.CurrencyRate.models.models import CurrencyRateMapping, CurrencyRate


class AbstractCurrencyRateGateway(ABC):
    @abstractmethod
    def get_currency_rate_mapping(self) -> CurrencyRateMapping:
        pass


class FakeCurrencyRateGateway(AbstractCurrencyRateGateway):
    @property
    def get_currency_rate_mapping(self) -> CurrencyRateMapping:
        euro = CurrencyRate(currency='EUR', rate=Decimal('5.6'), last_update='2021-01-01')
        usd = CurrencyRate(currency='USD', rate=Decimal('4.8'), last_update='2021-01-01')
        mapping = {
            euro.currency: euro.rate,
            usd.currency: usd.rate
        }

        return CurrencyRateMapping(mapping=mapping)
