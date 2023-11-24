import React from 'react';
import { render, screen } from '@testing-library/react';
import FoundFlightTable from '../FoundFlightTable';
import userEvent from '@testing-library/user-event'

const standardFlight = {
    city_source: "New York",
    city_destination: "London",
    total_price: 500,
    departure_date: '2023-01-01',
    arrival_date: '2023-01-02',
    currency: "USD",
    carrier: "Airways 1"
}

const expensiveFlight = {
    city_source: "New York",
    city_destination: "London",
    total_price: 1000,
    departure_date: '2023-01-01',
    arrival_date: '2023-02-01',
    currency: "USD",
    carrier: "Airways 1"
}

const latestDepartureFlight = {
    city_source: "New York",
    city_destination: "Liverpool",
    total_price: 500,
    departure_date: '2023-01-03',
    arrival_date: '2023-01-04',
    currency: "USD",
    carrier: "Airways 1"
}

const latestArrivalFlight = {
    city_source: "New York",
    city_destination: "Liverpool",
    total_price: 500,
    departure_date: '2023-01-01',
    arrival_date: '2023-01-03',
    currency: "USD",
    carrier: "Airways 1"
}

const anotherAirlineFlight = {
    city_source: "Boston",
    city_destination: "London",
    total_price: 500,
    departure_date: '2023-01-01',
    arrival_date: '2023-02-01',
    currency: "USD",
    carrier: "Airways 2"
}


describe('FlightTable Component Tests', () => {

  it('should render the flight table correctly', () => {
      render(<FoundFlightTable flights={[standardFlight]}/>);

      expect(screen.getByText('Origem')).toBeInTheDocument();
      expect(screen.getByText('Destino')).toBeInTheDocument();
      expect(screen.getByText('Moeda')).toBeInTheDocument();
      expect(screen.getByText('Preço Total ↑')).toBeInTheDocument();
      expect(screen.getByText('Data de Partida')).toBeInTheDocument();
      expect(screen.getByText('Data de Chegada')).toBeInTheDocument();
      expect(screen.getByText('Companhia Aérea')).toBeInTheDocument();
      expect(screen.getByText('New York')).toBeInTheDocument();
      expect(screen.getByText('London')).toBeInTheDocument();
      expect(screen.getByText('USD')).toBeInTheDocument();
      expect(screen.getByText('500')).toBeInTheDocument();
      expect(screen.getByText('01/01/2023')).toBeInTheDocument();
      expect(screen.getByText('02/01/2023')).toBeInTheDocument();
      expect(screen.getByText('Airways 1')).toBeInTheDocument();
 });

it('should order by price', () => {
    render(<FoundFlightTable flights={[expensiveFlight, standardFlight]} />);

    userEvent.click(screen.getByText('Preço Total ↑'))

    const f1= screen.getByText('500');
    const f2= screen.getByText('1000');
    expect(f1.compareDocumentPosition(f2)).toBe(2);
   });

it('should order by departure date', () => {
    render(<FoundFlightTable flights={[latestDepartureFlight, standardFlight]} />);

    userEvent.click(screen.getByText('Data de Chegada'))

    const f1 = screen.getByText('02/01/2023');
    const f2 = screen.getByText('03/01/2023');
    expect(f1.compareDocumentPosition(f2)).toBe(2);
   });

  it('should order by arrival date', () => {
    render(<FoundFlightTable flights={[latestArrivalFlight, standardFlight]} />);

    userEvent.click(screen.getByText('Data de Chegada'))

    const f1= screen.getByText('02/01/2023');
    const f2= screen.getByText('03/01/2023');
    expect(f1.compareDocumentPosition(f2)).toBe(2);
  });

  it('should order by airline', () => {
    render(<FoundFlightTable flights={[anotherAirlineFlight, standardFlight]} />);

    userEvent.click(screen.getByText('Companhia Aérea'))

    const f1= screen.getByText('Airways 1');
    const f2= screen.getByText('Airways 2');
    expect(f1.compareDocumentPosition(f2)).toBe(2);
   });
});

