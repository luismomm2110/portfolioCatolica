import abc
from datetime import datetime
from typing import List, Optional

from amadeus import Client

from settings import get_api_key_amadeus, get_api_secret_amadeus
from server.src.Flights.models.model import Flight
from server.src.Airports.models.model import Airport


class AbstractGateway(abc.ABC):
    @abc.abstractmethod
    def get(self, origin: Airport, destinations: List[str], departure_date: str, max_price: Optional[int] = None):
        raise NotImplementedError


class FakeGateway(AbstractGateway):
    def __init__(self, flights: List[Flight]):
        self.flights = flights

    def get(self, origin: Airport,
            destinations: List[str],
            departure: str,
            adults: int = 1,
            max_price: Optional[int] = None) -> \
            List[Flight]:

        max_price = 999999999999999 if max_price is None else max_price

        results = []
        for flight in self.flights:
            if flight.source['code'] == origin.code and flight.destination['code'] in destinations and \
                    flight.departure == departure and flight.price <= max_price if max_price else True:
                results.append(flight)

        return results


class AmadeusGateway(AbstractGateway):
    def get(self, iata_code_origin: str, destinations: List[str], departure_date: str, max_price: Optional[int] = None):
        amadeus = Client(
            client_id=get_api_key_amadeus(),
            client_secret=get_api_secret_amadeus(),
        )
        result = []

        for destination in destinations:
            result.append(amadeus.shopping.flight_offers_search.get(
                originLocationCode=iata_code_origin,
                destinationLocationCode=destination,
                departureDate=departure_date,
                maxPrice=max_price,
            ).data)

        return result
