import abc
import os
from typing import List, Tuple

import pandas as pd

from server.src.flights.models.model import Airport


class AbstractRepository(abc.ABC):
    @abc.abstractmethod
    def fetch_airports(self):
        raise NotImplementedError

    def fetch_airport(self, source):
        raise NotImplementedError

    def fetch_airports_by_municipality(self, city: str):
        raise NotImplementedError


class FakeRepository(AbstractRepository):
    def __init__(self, airports: List[dict]):
        self.airports = [Airport(**airport) for airport in airports]

    def fetch_airports(self) -> Tuple[Airport]:
        return tuple(self.airports)

    def fetch_airport(self, iata_code: str) -> Airport:
        return next(airport for airport in self.airports if airport.code == iata_code)

    def fetch_airports_by_municipality(self, city: str) -> Tuple[Airport]:
        return tuple(airport for airport in self.airports if airport.municipality == city)


class IataRepository(AbstractRepository):
    def __init__(self):
        csv_path = os.path.join(os.path.dirname(__file__), '../../../resources/iata.csv')
        with open(csv_path) as csv_file:
            df = pd.read_csv(csv_file)
            df = df.dropna(subset=['iata_code'])

            # todo fix this

    def fetch_airports(self) -> Tuple[dict, ...]:
        return tuple(self.airports)

    def fetch_airport(self, iata_code: str):
        return next(airport for airport in self.airports if airport['iata_code'] == iata_code)

    def fetch_airports_by_municipality(self, city: str):
        return tuple(airport for airport in self.airports if airport.municipality == city)
