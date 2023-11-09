from server.src.FlightAreas.gateways.gateways import FlightAreaGateway
from server.src.FlightAreas.models.model import FlightArea


def save_flight_area(gateway: FlightAreaGateway, flight_area_data: dict):
    flight_area = FlightArea(**flight_area_data)
    gateway.save_flight_area(flight_area)
