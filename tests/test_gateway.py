from _decimal import Decimal
from datetime import datetime, timedelta

import pytest

from src.gateways.gateway_amadeus import AmadeusGateway
from src.models.model import Airport, Coordinate


@pytest.mark.skip
def test_gateway_can_search_a_flight():
    amadeus_gateway = AmadeusGateway()
    source = Airport('GRU', Coordinate(Decimal('-23.4355556'), Decimal('-46.4730556')))
    destinations = [Airport('LAX', Coordinate(Decimal('33.9425361'), Decimal('-118.408075'))),
                    Airport('LAS', Coordinate(Decimal('36.080056'), Decimal('-115.15225')))]
    current_date = datetime.now()
    one_month_from_now = current_date + timedelta(days=30)

    result = amadeus_gateway.get(source, destinations, current_date, one_month_from_now)

    assert result is not None
