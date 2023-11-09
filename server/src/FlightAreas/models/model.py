from dataclasses import dataclass


@dataclass(frozen=True)
class FlightArea:
    _id: str
    travel_agent_id: str
    name: str
    city_origin: str
    airports: list[str]
