from dataclasses import field
from datetime import datetime
from typing import List, Optional

from server.src.Airports.repositories.repository import AbstractRepository
from server.src.Flights.gateways.gateway_amadeus import AbstractGateway
from server.src.Flights.models.model import Flight


def find_all_flights_from_airports(city_source: str, iata_airports_destinations: list[str], departure: str,
                                   airport_repository: AbstractRepository, flight_gateway: AbstractGateway,
                                   max_price: Optional[int] = None, currency_rate=None) -> [List[Flight], str]:

    currencies_mapping = _get_currencies_mapping(currency_rate)

    if not city_source:
        return [], 'City not found'

    airport_from_the_source = airport_repository.fetch_airports_by_municipality(city_source)
    if not airport_from_the_source:
        return [], 'City not found'
    airport_from_the_source = airport_from_the_source[0].code

    if invalid_message := _validate_date(departure):
        return [], invalid_message

    raw_flights = flight_gateway.get(airport_from_the_source, iata_airports_destinations, departure, max_price)

    return _present_flights(raw_flights, currencies_mapping), ''


def _get_currencies_mapping(currency_rate):
    if currency_rate is None:
        currency_rate = dict()
    return currency_rate


def _validate_date(date: str):
    try:
        datetime.strptime(date, '%Y-%m-%d')
        if date < datetime.now().isoformat().split('T')[0]:
            return 'Departure date is in the past'
        return ''
    except ValueError:
        return 'Invalid departure date'


def _present_flights(raw_flights: List[Flight], currencies_mapping) -> List[Flight]:
    flights = []
    for raw_flight in raw_flights:
        price = raw_flight.price
        currency = raw_flight.currency_code
        if currency in currencies_mapping:
            price = price * currencies_mapping[currency]
        flights.append(Flight(source=raw_flight.source,
                              destination=raw_flight.destination,
                              departure=raw_flight.departure,
                              price=price,
                              currency_code='BRL'))

    return flights
