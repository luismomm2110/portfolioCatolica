from abc import abstractmethod, ABC


class AbstractCurrencyRateGateway(ABC):
    @abstractmethod
    def get_currency_rate_mapping(self, currency: str) -> float:
        pass