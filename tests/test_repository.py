from src.repositories.gateway_iata import IataGateway


def test_should_fetch_airports_from_iata_resource_as_tuple_of_dicts():
    iata_gateway = IataGateway()

    result = iata_gateway.fetch_airports()

    assert result is not None
    assert type(result) is tuple
    assert all(type(item) is dict for item in result) is True

