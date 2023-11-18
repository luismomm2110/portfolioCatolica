from datetime import datetime
from decimal import Decimal
from typing import List, Optional

from server.src.Airports.models.model import Airport
from server.src.Airports.repositories.repository import AbstractAirportRepository
from server.src.CurrencyRate.models.models import BRLCurrencyRateMapping
from server.src.Flights.gateways.gateway_amadeus import AbstractGateway
from server.src.Flights.models.model import TripGoal, FoundFlight


def find_all_flights_from_airports(city_source: str, iata_airports_destinations: set[str], departure: str,
                                   airport_repository: AbstractAirportRepository, flight_gateway: AbstractGateway,
                                   currency_rate_mapping: BRLCurrencyRateMapping, max_price: Optional[Decimal] = None) -> [List[TripGoal], str]:
    airport_from_the_source = next(iter(airport_repository.fetch_airports_by_municipality(city_source)), None)
    if not airport_from_the_source:
        return [], 'City not found'

    airports_from_destinations = airport_repository.fetch_airports_by_iata_code(iata_airports_destinations)
    if len(airports_from_destinations) != len(iata_airports_destinations):
        return [], 'City not found for one or more destinations'

    if invalid_date_message := _verify_if_departure_is_in_past(departure):
        return [], invalid_date_message

    max_price_converted_to_euros = currency_rate_mapping.convert_to('EUR', max_price) if max_price else None

    flights_in_euro = flight_gateway.get(airport_from_the_source.code,
                                         iata_airports_destinations,
                                         departure,
                                         max_price_converted_to_euros)


    flights_in_real = [FoundFlight(city_source=city_source,
                                   city_destination=_find_city_by_iata_code(flight.city_destination, airports_from_destinations),
                                   total_price=currency_rate_mapping.convert_from('EUR', flight.total_price),
                                   departure_date=flight.departure_date.date().strftime('%Y-%m-%d'),
                                   arrival_date=flight.arrival_date.date().strftime('%Y-%m-%d'),
                                   currency='BRL',
                                   carrier=flight.carrier)
                       for flight in flights_in_euro]

    return flights_in_real, ''


def _find_city_by_iata_code(iata_code: str, airports: tuple[Airport]) -> str:
    return next(iter(airport.municipality for airport in airports if airport.code == iata_code))


def _verify_if_departure_is_in_past(date: str):
    try:
        datetime.strptime(date, '%Y-%m-%d')
        if date < datetime.now().isoformat().split('T')[0]:
            return 'Departure date is in the past'
        return ''
    except ValueError:
        return 'Invalid departure date'
