import abc
from datetime import datetime
from decimal import Decimal
from typing import List, Optional

from amadeus import Client, Response

from server.settings import get_api_key_amadeus, get_secret_amadeus
from server.src.Flights.models.model import FoundFlight
from server.src.Airports.models.model import Airport


class AbstractGateway(abc.ABC):
    @abc.abstractmethod
    def get(self, iata_code_origin: Airport, destinations: set[str], departure_date: str, max_price: Optional[int] = None) -> List[FoundFlight]:
        raise NotImplementedError


class FakeGateway(AbstractGateway):
    def __init__(self, flights: List[FoundFlight]):
        self.flights = flights

    def get(self, iata_code_origin: str, destinations: set[str],
            departure_date: str, max_price: Optional[int] = None) -> \
            List[FoundFlight]:

        max_price = 999999999999999 if max_price is None else int(max_price)

        results = []
        for flight in self.flights:
            if flight.city_source == iata_code_origin and flight.city_destination in destinations and \
               _compare_timestamp(flight.departure_date, departure_date) and flight.total_price <= max_price:
                results.append(flight)

        return results


def _compare_timestamp(timestamp: datetime, departure_date: str) -> bool:
    date_to_compare = datetime.strptime(departure_date, '%Y-%m-%d')

    return timestamp.date() == date_to_compare.date()


class AmadeusGateway(AbstractGateway):
    def get(self, iata_code_origin: str, destinations: set[str], departure_date: str, max_price: Optional[int] = None) -> List[FoundFlight]:
        max_price = 99999999 if max_price is None else int(max_price)
        amadeus = Client(
            client_id=get_api_key_amadeus(),
            client_secret=get_secret_amadeus(),
        )
        result = []

        for destination in destinations:
            try:
                result.extend(presenter_raws_flights(
                    amadeus.shopping.flight_offers_search.get(
                        originLocationCode=iata_code_origin,
                        destinationLocationCode=destination,
                        departureDate=departure_date,  # YYYY-MM-DD
                        maxPrice=max_price,
                        adults=1,
                        max=5
                    )))

            except Exception as e:
                print(e)

        return result


def presenter_raws_flights(single_amadeus_response: Response) -> List[FoundFlight]:
    amadeus_result = single_amadeus_response.result
    clean_result = []
    data = amadeus_result['data']
    dictionaries = amadeus_result['dictionaries']

    for raw_flight in data:
        flight = {}

        first_segment = raw_flight['itineraries'][0]['segments'][0]
        last_segment = raw_flight['itineraries'][0]['segments'][-1]
        flight['city_source'] = first_segment['departure']['iataCode']
        flight['city_destination'] = last_segment['arrival']['iataCode']
        flight['departure_date'] = datetime.strptime(first_segment['departure']['at'], '%Y-%m-%dT%H:%M:%S')
        flight['arrival_date'] = datetime.strptime(last_segment['arrival']['at'], '%Y-%m-%dT%H:%M:%S')
        flight['total_price'] = Decimal(raw_flight['price']['total'])
        flight['currency'] = raw_flight['price']['currency']
        carrier_code = first_segment['carrierCode']
        flight['carrier'] = dictionaries['carriers'][carrier_code]

        clean_result.append(FoundFlight(**flight))

    return clean_result
