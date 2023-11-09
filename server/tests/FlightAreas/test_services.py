from uuid import uuid4

from server.src.FlightAreas.gateways.gateways import FakeFlightAreaGateway
from server.src.FlightAreas.services.services import save_flight_area


def test_create_valid_travel_agent():
    fake_travel_agent_gateway = FakeFlightAreaGateway()

    flight_area_id = str(uuid4())
    travel_agent_id = uuid4()
    name = 'Aeroportos do Leste Europeu'
    city_origin = 'São Paulo'
    airports = ['GRU', 'LIS', 'MAD', 'BCN', 'FRA', 'CDG', 'LHR', 'AMS', 'FCO', 'MXP']
    flight_area_data = {
        '_id': flight_area_id,
        'travel_agent_id': travel_agent_id,
        'name': name,
        'city_origin': city_origin,
        'airports': airports,
    }

    save_flight_area(fake_travel_agent_gateway, flight_area_data)

    actual_flight_area = fake_travel_agent_gateway.get_flight_area_by_id(flight_area_id)
    assert actual_flight_area._id == flight_area_id
    assert actual_flight_area.travel_agent_id == travel_agent_id
    assert actual_flight_area.name == name
    assert actual_flight_area.city_origin == city_origin
    assert actual_flight_area.airports == airports


