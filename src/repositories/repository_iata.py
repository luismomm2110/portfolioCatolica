import abc
from typing import List, Tuple

import pandas as pd


class AbstractRepository(abc.ABC):
    @abc.abstractmethod
    def fetch_airports(self):
        raise NotImplementedError


class FakeRepository(AbstractRepository):
    def __init__(self, airports: List[dict]):
        self.airports = airports

    def fetch_airports(self):
        return self.airports


class IataRepository(AbstractRepository):

    def fetch_airports(self) -> Tuple[dict, ...]:
        with open('resources/iata.csv') as csv_file:
            df = pd.read_csv(csv_file)

            dict_list = df.to_dict('records')
            dict_tuple = tuple(dict_list)

            return dict_tuple
