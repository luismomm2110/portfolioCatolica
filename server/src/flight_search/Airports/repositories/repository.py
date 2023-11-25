import abc
import os
from typing import List, Tuple

import pandas as pd

from flight_search.Airports.models.model import Airport


class AbstractAirportRepository(abc.ABC):
    @abc.abstractmethod
    def fetch_airports(self):
        raise NotImplementedError

    def fetch_airport(self, source):
        raise NotImplementedError

    def fetch_airports_by_municipality(self, city: str):
        raise NotImplementedError

    def fetch_municipalities(self):
        raise NotImplementedError

    def fetch_airports_by_iata_code(self, iata_codes: set[str]) -> Tuple[Airport]:
        raise NotImplementedError


class FakeAirportRepository(AbstractAirportRepository):
    def __init__(self, airports: List[dict]):
        self.airports = [Airport(**airport) for airport in airports]

    def fetch_airports(self) -> Tuple[Airport]:
        return tuple(self.airports)

    def fetch_airport(self, iata_code: str) -> Airport:
        return next(airport for airport in self.airports if airport.code == iata_code)

    def fetch_airports_by_municipality(self, city: str) -> Tuple[Airport]:
        return tuple(airport for airport in self.airports if airport.municipality == city)

    def fetch_municipalities(self) -> Tuple[str]:
        return tuple(set(airport.municipality for airport in self.airports))

    def fetch_airports_by_iata_code(self, iata_codes: List[str]) -> Tuple[Airport]:
        return tuple(airport for airport in self.airports if airport.code in iata_codes)


class IataAirportRepository(AbstractAirportRepository):
    def __init__(self):
        csv_path = os.path.join(os.path.dirname(__file__), '../../../resources/iata.csv')
        with open(csv_path) as csv_file:
            df = pd.read_csv(csv_file)
            df = df.dropna(subset=['iata_code'])
            self.airports = [Airport(code=row['iata_code'],
                                     coordinates=row['coordinates'],
                                     municipality=row['municipality'],
                                     name=row['name']) for _, row in df.iterrows()]

    def fetch_airports(self) -> Tuple[Airport, ...]:
        return tuple(self.airports)

    def fetch_airport(self, iata_code: str):
        return next(airport for airport in self.airports if
                    airport.code == iata_code)

    def fetch_airports_by_municipality(self, city: str):
        return tuple(airport for airport in self.airports if airport.municipality == city)

    def fetch_municipalities(self) -> Tuple[str]:
        return tuple(set(airport.municipality for airport in self.airports if airport.municipality))

    def fetch_airports_by_iata_code(self, iata_codes: List[str]) -> Tuple[Airport]:
        return tuple(airport for airport in self.airports if airport.code in iata_codes)