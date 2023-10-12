from server.src.flights.repositories.repository_iata import IataRepository


def test_should_fetch_airports_from_iata_resource_as_tuple_of_dicts():
    iata_gateway = IataRepository()

    result = iata_gateway.fetch_airports()

    assert result is not None
    assert type(result) is tuple
    assert all(type(item) is dict for item in result) is True

