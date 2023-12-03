import requests
from abc import abstractmethod, ABC
from decimal import Decimal

from flight_search.CurrencyRate.models.models import BRLCurrencyRateMapping, CurrencyRate
from settings import get_currency_api_key


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


class ProductionCurrencyRateGateway(AbstractCurrencyRateGateway):
    def get_currency_rate_mapping(self) -> BRLCurrencyRateMapping:
        api_key = get_currency_api_key()
        url = f'https://v6.exchangerate-api.com/v6/{api_key}/latest/BRL'
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