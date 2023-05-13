from datetime import datetime
from typing import List

from src.gateways.gateway_amadeus import AbstractGateway
from src.models.model import Airport, Flight, get_possible_airports
from src.repositories.repository_iata import AbstractRepository


def find_flights_within_range(source: str, destination: str, departure: datetime, desired_range: int,
                              repository: AbstractRepository, gateway: AbstractGateway) -> List[Flight]:
    airports = repository.fetch_airports()
    source = repository.fetch_airport(source)
    destination = repository.fetch_airport(destination)
    possible_airports = get_possible_airports(source, destination, airports, desired_range)
    flights = gateway.get(source, possible_airports, departure)

    return flights
