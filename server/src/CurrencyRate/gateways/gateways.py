from abc import abstractmethod, ABC
from decimal import Decimal

from CurrencyRate.models.models import BRLCurrencyRateMapping, CurrencyRate


class AbstractCurrencyRateGateway(ABC):
    @abstractmethod
    def get_currency_rate_mapping(self) -> BRLCurrencyRateMapping:
        pass


class FakeCurrencyRateGateway(AbstractCurrencyRateGateway):
    def get_currency_rate_mapping(self) -> BRLCurrencyRateMapping:
        euro = CurrencyRate(currency='EUR', rate=Decimal('5.6'), last_update='2021-01-01')
        usd = CurrencyRate(currency='USD', rate=Decimal('4.8'), last_update='2021-01-01')
        mapping = {
            euro.currency: euro.rate,
            usd.currency: usd.rate
        }

        return BRLCurrencyRateMapping(mapping=mapping)
