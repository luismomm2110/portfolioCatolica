import abc
import json
from datetime import datetime
from decimal import Decimal
from typing import List, Optional

from amadeus import Client

from settings import get_api_key_amadeus, get_api_secret_amadeus
from server.src.Flights.models.model import TripGoal, FoundFlight
from server.src.Airports.models.model import Airport


class AbstractGateway(abc.ABC):
    @abc.abstractmethod
    def get(self, iata_code_origin: Airport, destinations: List[str], departure_date: str, max_price: Optional[int] = None):
        raise NotImplementedError


class FakeGateway(AbstractGateway):
    def __init__(self, flights: List[TripGoal]):
        self.flights = flights

    def get(self, iata_code_origin: str, destinations: List[str],
            departure_date: str, max_price: Optional[int] = None) -> \
            List[TripGoal]:

        max_price = 999999999999999 if max_price is None else max_price

        results = []
        for flight in self.flights:
            if flight.source['code'] == iata_code_origin and flight.destination['code'] in destinations and \
               flight.departure == departure_date and flight.price <= max_price:
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
            try:
                result.append(amadeus.shopping.flight_offers_search.get(
                    originLocationCode=iata_code_origin,
                    destinationLocationCode=destination,
                    departureDate=departure_date,  # YYYY-MM-DD
                    maxPrice=max_price,
                    adults=1,
                    max=5
                ))
            except Exception as e:
                print(e)

        cleaned_result = presenter_raws_flights(result)

        return cleaned_result


def presenter_raws_flights(single_amadeus_response: json) -> List[FoundFlight]:
    result = []
    data = single_amadeus_response['data']
    mapping = single_amadeus_response['dictionaries']

    for raw_flight in data:
        flight = {}

        first_segment = raw_flight['itineraries'][0]['segments'][0]
        last_segment = raw_flight['itineraries'][0]['segments'][-1]
        flight['source'] = first_segment['departure']['iataCode']
        flight['destination'] = last_segment['arrival']['iataCode']
        flight['departure'] = datetime.strptime(first_segment['departure']['at'], '%Y-%m-%dT%H:%M:%S')
        flight['arrival'] = datetime.strptime(last_segment['arrival']['at'], '%Y-%m-%dT%H:%M:%S')
        flight['total_price'] = Decimal(raw_flight['price']['total'])
        flight['currency'] = raw_flight['price']['currency']
        carrier_code = first_segment['carrierCode']
        flight['carrier'] = mapping['carriers'][carrier_code]
        result.append(FoundFlight(**flight))

    return result
