from datetime import datetime
from decimal import Decimal
from typing import List, Optional

from server.src.Airports.repositories.repository import AbstractRepository
from server.src.CurrencyRate.models.models import CurrencyRateMapping
from server.src.Flights.gateways.gateway_amadeus import AbstractGateway
from server.src.Flights.models.model import TripGoal, FoundFlight


def find_all_flights_from_airports(city_source: str, iata_airports_destinations: list[str], departure: str,
                                   airport_repository: AbstractRepository, flight_gateway: AbstractGateway,
                                   currency_rate_mapping: CurrencyRateMapping, max_price: Optional[Decimal] = None) -> [List[TripGoal], str]:
    airport_from_the_source = next(iter(airport_repository.fetch_airports_by_municipality(city_source)), None)
    if not airport_from_the_source:
        return [], 'City not found'

    if invalid_date_message := _verify_if_departure_is_in_past(departure):
        return [], invalid_date_message

    max_price_converted_to_euros = currency_rate_mapping.convert_to('EUR', max_price) if max_price else None

    flights_in_euro = flight_gateway.get(airport_from_the_source.code,
                                         iata_airports_destinations,
                                         departure,
                                         max_price_converted_to_euros)

    flights_in_real = [FoundFlight(source=city_source,
                                   destination=flight.destination,
                                   total_price=currency_rate_mapping.convert_to('BRL', flight.total_price),
                                   departure_date=flight.departure_date,
                                   arrival_date=flight.arrival_date,
                                   currency='BRL',
                                   carrier=flight.carrier)
                       for flight in flights_in_euro]

    return flights_in_real, ''


def _verify_if_departure_is_in_past(date: str):
    try:
        datetime.strptime(date, '%Y-%m-%d')
        if date < datetime.now().isoformat().split('T')[0]:
            return 'Departure date is in the past'
        return ''
    except ValueError:
        return 'Invalid departure date'
