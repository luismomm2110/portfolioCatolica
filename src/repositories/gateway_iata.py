import abc


class AbstractGateway(abc.ABC):
    @abc.abstractmethod
    def fetch_airports(self):
        raise NotImplementedError


class IataGateway(AbstractGateway):

    def fetch_airports(self) -> str:
        with open('../resources/iata.csv') as json_file:
            data = json_file.read()

            return data
