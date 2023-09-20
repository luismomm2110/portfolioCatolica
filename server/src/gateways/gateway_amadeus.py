import abc
from datetime import datetime
from typing import List

from amadeus import Client

from settings import get_api_key_amadeus, get_api_secret_amadeus
from src.models.model import Airport, Flight


class AbstractGateway(abc.ABC):
    @abc.abstractmethod
    def get(self, origin: Airport, destinations: List[dict], departure_date: datetime):
        raise NotImplementedError


class FakeGateway(AbstractGateway):
    def __init__(self, flights: List[Flight]):
        self.flights = flights

    def get(self, origin: Airport, destinations: List[dict], departure: datetime) -> \
            List[Flight]:
        return [flight for flight in self.flights if flight.source == origin and flight.destination
                in destinations and flight.departure == departure]


class AmadeusGateway(AbstractGateway):
    def get(self, iata_code_origin: str, destinations: List[dict], departure_date: datetime, adults: int = 1):
        amadeus = Client(
            client_id=get_api_key_amadeus(),
            client_secret=get_api_secret_amadeus(),
        )
        result = []

        for destination in destinations:
            if iata_code_destination := destination['iata_code']:
                if isinstance(iata_code_destination, str):
                    result.append(amadeus.shopping.flight_offers_search.get(
                        originLocationCode=iata_code_origin['iata_code'],
                        destinationLocationCode=iata_code_destination,
                        departureDate=departure_date.strftime('%Y-%m-%d'),
                        adults=adults
                    ).data)

        return result
