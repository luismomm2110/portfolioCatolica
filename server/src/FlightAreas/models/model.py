from dataclasses import dataclass


@dataclass(frozen=True)
class FlightArea:
    _id: str
    travel_agent_id: str
    name: str
    city_origin: str
    airports: list[str]

    def to_dict(self):
        return {
            '_id': self._id,
            'travel_agent_id': self.travel_agent_id,
            'name': self.name,
            'city_origin': self.city_origin,
            'airports': self.airports
        }
