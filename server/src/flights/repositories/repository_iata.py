import abc
import os
from typing import List, Tuple

import pandas as pd


class AbstractRepository(abc.ABC):
    @abc.abstractmethod
    def fetch_airports(self):
        raise NotImplementedError

    def fetch_airport(self, source):
        raise NotImplementedError


class FakeRepository(AbstractRepository):
    def __init__(self, airports: List[dict]):
        self.airports = airports

    def fetch_airports(self) -> Tuple[dict, ...]:
        return tuple(self.airports)

    def fetch_airport(self, iata_code: str):
        return next(airport for airport in self.airports if airport['iata_code'] == iata_code)


class IataRepository(AbstractRepository):
    def __init__(self):
        csv_path = os.path.join(os.path.dirname(__file__), '../../../resources/iata.csv')
        with open(csv_path) as csv_file:
            df = pd.read_csv(csv_file)
            df = df.dropna(subset=['iata_code'])

            self.airports = df.to_dict('records')

    def fetch_airports(self) -> Tuple[dict, ...]:
        return tuple(self.airports)

    def fetch_airport(self, iata_code: str):
        return next(airport for airport in self.airports if airport['iata_code'] == iata_code)
