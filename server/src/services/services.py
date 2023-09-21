from datetime import datetime
from typing import List

from src.gateways.gateway_amadeus import AbstractGateway
from src.models.model import Flight, get_possible_airports
from src.repositories.repository_iata import AbstractRepository


def find_flights_within_range(iata_source: str, iata_destination: str, departure: datetime, desired_range: int,
                              repository: AbstractRepository, gateway: AbstractGateway) -> List[Flight]:
    airports = repository.fetch_airports()
    iata_source = repository.fetch_airport(iata_source)
    iata_destination = repository.fetch_airport(iata_destination)
    possible_airports = get_possible_airports(iata_source, iata_destination, airports, desired_range)
    flights = gateway.get(iata_source, possible_airports, departure)

    return flights
