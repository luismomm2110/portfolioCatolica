from dataclasses import dataclass


@dataclass(frozen=True)
class FlightArea:
    id: int
    name: str
    city_origin: str
    airports: list[str]
