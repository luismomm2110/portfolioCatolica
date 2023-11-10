from server.src.FlightAreas.models.model import FlightArea


class FlightAreaGateway:
    def save_flight_area(self, flight_area: FlightArea):
        raise NotImplementedError

    def get_flight_area_by_id(self, flight_area_id):
        raise NotImplementedError

    def get_flight_area_from_travel_agent(self, travel_agent_id):
        raise NotImplementedError


class FakeFlightAreaGateway(FlightAreaGateway):
    def __init__(self):
        self._flight_areas = {}

    def save_flight_area(self, flight_area: FlightArea):
        self._flight_areas[flight_area._id] = flight_area

    def get_flight_area_by_id(self, flight_area_id):
        return self._flight_areas[flight_area_id]

    def get_flight_area_from_travel_agent(self, travel_agent_id):
        return [flight_area for flight_area in self._flight_areas.values()
                if flight_area.travel_agent_id == travel_agent_id]


class MongoFlightAreaGateway(FlightAreaGateway):
    def __init__(self, mongo_client_with_collection):
        self._mongo_client = mongo_client_with_collection

    def save_flight_area(self, flight_area: FlightArea):
        self._mongo_client.db.collection.insert_one(flight_area.to_dict())

    def get_flight_area_by_id(self, flight_area_id):
        flight_area_data = self._mongo_client.db.collection.find_one({"_id": flight_area_id})
        if not flight_area_data:
            return None
        return FlightArea(
            _id=flight_area_data['_id'],
            travel_agent_id=flight_area_data['travel_agent_id'],
            name=flight_area_data['name'],
            city_origin=flight_area_data['city_origin'],
            airports=flight_area_data['airports']
        )

    def get_flight_area_from_travel_agent(self, travel_agent_id):
        flight_area_data = self._mongo_client.db.collection.find({"travel_agent_id": travel_agent_id})
        if not flight_area_data:
            return []
        return [FlightArea(
            _id=flight_area['_id'],
            travel_agent_id=flight_area['travel_agent_id'],
            name=flight_area['name'],
            city_origin=flight_area['city_origin'],
            airports=flight_area['airports']
        ) for flight_area in flight_area_data]

