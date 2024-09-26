from datetime import datetime

import requests
from abc import abstractmethod, ABC
from decimal import Decimal

from flight_search.CurrencyRate.models.models import BRLCurrencyRateMapping, CurrencyRate
from infrastructure.cache import cached
from settings import get_currency_api_url


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


def end_of_day():
    now = datetime.now()
    end = datetime(now.year, now.month, now.day, 23, 59, 59)
    return (end - now).seconds


class ProductionCurrencyRateGateway(AbstractCurrencyRateGateway):
    @cached(key='currency_rate:brl:today', expire=end_of_day())
    def get_currency_rate_mapping(self) -> BRLCurrencyRateMapping:
        url = get_currency_api_url()
        response = requests.get(url)
        data = response.json()
        mapping = {
            currency: 1/Decimal(str(rate))
            for currency, rate in data['conversion_rates'].items()
        }

        return BRLCurrencyRateMapping(mapping=mapping)


if __name__ == '__main__':
    gateway = ProductionCurrencyRateGateway()
    print(gateway.get_currency_rate_mapping())
