from datetime import datetime
from typing import List

from src.gateways.gateway_amadeus import AbstractGateway
from src.models.model import Airport, Flight
from src.repositories.repository_iata import AbstractRepository


def find_flights_within_range(source: Airport, initial_date: datetime, final_date: datetime, desired_range: int,
                              repository: AbstractRepository, gateway: AbstractGateway) -> List[Flight]:
    return []
