import abc
from datetime import datetime
from typing import List

from amadeus import Client

from models.model import Airport
from settings import API_KEY_AMADEUS, API_SECRET_AMADEUS


class AbstractGateway(abc.ABC):
    @abc.abstractmethod
    def get(self, origin: Airport, destinations: List[Airport], departure_date: datetime, return_date: datetime):
        raise NotImplementedError


class AmadeusGateway(AbstractGateway):
    def get(self, origin: Airport, destinations: List[Airport], departure_date: datetime, return_date: datetime,
            adults: int = 1):
        amadeus = Client(
            client_id=API_KEY_AMADEUS,
            client_secret=API_SECRET_AMADEUS
        )
        result = []

        for destination in destinations:
            result.append(amadeus.shopping.flight_offers_search.get(
                originLocationCode=origin.code,
                destinationLocationCode=destination.code,
                departureDate=departure_date.strftime('%Y-%m-%d'),
                returnDate=return_date.strftime('%Y-%m-%d'),
                adults=adults
            ).data)

        return result
