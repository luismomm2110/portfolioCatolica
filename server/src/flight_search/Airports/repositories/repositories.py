import abc
from typing import List, Tuple

import boto3

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


class DynamoAirportRepository(AbstractAirportRepository):
    def __init__(self):
        dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
        self.table = dynamodb.Table('Airports')

    def fetch_airports(self) -> Tuple[Airport]:
        airports_data = self.table.scan()['Items']
        return tuple(Airport(code=airport_data['iata_code'], coordinates=airport_data['coordinates'],
                             municipality=airport_data['municipality'], name=airport_data['name'])
                     for airport_data in airports_data)

    def fetch_airport(self, iata_code: str) -> Airport:
        airport_data = self.table.get_item(Key={'code': iata_code})['Item']
        return Airport(code=airport_data['iata_code'], coordinates=airport_data['coordinates'],
                       municipality=airport_data['municipality'], name=airport_data['name'])

    def fetch_airports_by_municipality(self, city: str) -> Tuple[Airport]:
        airports_data = self.table.scan(FilterExpression='municipality = :municipality',
                                        ExpressionAttributeValues={':municipality': city})['Items']
        return tuple(Airport(code=airport_data['iata_code'], coordinates=airport_data['coordinates'],
                             municipality=airport_data['municipality'], name=airport_data['name'])
                     for airport_data in airports_data)

    def fetch_municipalities(self) -> Tuple[set[str]]:
        airports_data = self.table.scan()['Items']
        return tuple(set(airport_data['municipality'] for airport_data in airports_data))

    def fetch_airports_by_iata_code(self, iata_codes: set[str]) -> Tuple[Airport]:
        expression_attribute_values = {f':val{i}': code for i, code in enumerate(iata_codes)}

        filter_expression = 'iata_code IN (' + ', '.join(expression_attribute_values.keys()) + ')'

        airports_data = self.table.scan(
            FilterExpression=filter_expression,
            ExpressionAttributeValues=expression_attribute_values
        )['Items']

        return tuple(
            Airport(
                code=airport_data['iata_code'],
                coordinates=airport_data['coordinates'],
                municipality=airport_data['municipality'],
                name=airport_data['name']
            ) for airport_data in airports_data
        )
