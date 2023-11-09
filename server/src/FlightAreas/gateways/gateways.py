from server.src.FlightAreas.models.model import FlightArea


class FlightAreaGateway:
    def save_flight_area(self, flight_area: FlightArea):
        raise NotImplementedError


class FakeFlightAreaGateway(FlightAreaGateway):
    def __init__(self):
        self._flight_areas = {}

    def save_flight_area(self, flight_area: FlightArea):
        self._flight_areas[flight_area._id] = flight_area

    def get_flight_area_by_id(self, flight_area_id):
        return self._flight_areas[flight_area_id]
