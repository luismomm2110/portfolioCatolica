from _decimal import Decimal
from dataclasses import dataclass


@dataclass(frozen=True)
class Airport:
    code: str


@dataclass(frozen=True)
class Flight:
    source: Airport
    destination: Airport
    price: Decimal


class TouristicArea:
    def __init__(self, name: str, flights: list[Flight]):
        self.name = name
        self.flights = flights

    def find_all_flights_from_source(self, source: Airport) -> [Flight]:
        return sorted([flight for flight in self.flights if flight.source == source], key=lambda flight: flight.price)
