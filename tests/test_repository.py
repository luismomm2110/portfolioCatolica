from src.repositories.gateway_iata import IataGateway


def test_should_fetch_airports_from_iata_resource():
    iata_gateway = IataGateway()

    result = iata_gateway.fetch_airports()

    assert result is not None
