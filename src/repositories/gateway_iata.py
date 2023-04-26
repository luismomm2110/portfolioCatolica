import abc
from typing import List, Tuple

import pandas as pd


class AbstractGateway(abc.ABC):
    @abc.abstractmethod
    def fetch_airports(self):
        raise NotImplementedError


class IataGateway(AbstractGateway):

    def fetch_airports(self) -> Tuple[dict, ...]:
        with open('../resources/iata.csv') as csv_file:
            df = pd.read_csv(csv_file)

            dict_list = df.to_dict('records')
            dict_tuple = tuple(dict_list)

            return dict_tuple
