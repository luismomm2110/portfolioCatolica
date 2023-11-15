from typing import List, Optional

from server.src.Airports.repositories.repository import AbstractRepository
from server.src.Flights.gateways.gateway_amadeus import AbstractGateway
from server.src.Flights.models.model import Flight


def find_all_flights_from_airports(city_source: str,
                                   iata_airports_destinations: list[str],
                                   departure: str,
                                   airport_repository: AbstractRepository, flight_gateway: AbstractGateway,
                                   price: Optional[int] = None) -> [List[Flight], str]:

    if not city_source:
        return [], 'City not found'

    airport_from_the_source = airport_repository.fetch_airports_by_municipality(city_source)
    if not airport_from_the_source:
        return [], 'City not found'
    airport_from_the_source = airport_from_the_source[0]

    flights = flight_gateway.get(airport_from_the_source, iata_airports_destinations, departure, price)

    return flights, ''
