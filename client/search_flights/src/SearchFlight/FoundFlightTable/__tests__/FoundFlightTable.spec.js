import React from 'react';
import { render, screen } from '@testing-library/react';
import FoundFlightTable from '../FoundFlightTable';
import userEvent from '@testing-library/user-event'

const standardFlight = {
    city_source: "New York",
    city_destination: "London",
    total_price: 500,
    departure_date: '2023-01-01',
    arrival_date: '2023-02-01',
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

const latestFlight = {
    city_source: "New York",
    city_destination: "London",
    total_price: 500,
    departure_date: '2023-01-01',
    arrival_date: '2023-03-01',
    currency: "USD",
    carrier: "Airways 1"
}

const anotherAirlineFlight = {
    city_source: "New York",
    city_destination: "London",
    total_price: 500,
    departure_date: '2023-01-01',
    arrival_date: '2023-02-01',
    currency: "USD",
    carrier: "Airways 2"
}

const mockFoundFlightTable = [
    standardFlight,
    expensiveFlight,
    latestFlight,
    anotherAirlineFlight
];

describe('FlightTable Component Tests', () => {

  it('should render the flight table correctly', () => {
    render(<FoundFlightTable flights={mockFoundFlightTable} />);

    expect(screen.getByText('Source City')).toBeInTheDocument();
    expect(screen.getByText('Destination City')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Airways 1')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    expect(screen.getByText('2023-02-01')).toBeInTheDocument();
  });

it('should order by price', () => {
    render(<FoundFlightTable flights={[expensiveFlight, standardFlight]} />);

    userEvent.click(screen.getByText('Preço Total ↑'))

    const f1= screen.getByText('500');
    const f2= screen.getByText('1000');
    expect(f1.compareDocumentPosition(f2)).toBe(2);
   });

it('should order by date', () => {
    render(<FoundFlightTable flights={[latestFlight, standardFlight]} />);

    userEvent.click(screen.getByText('Data de Saída'))

    const f1= screen.getByText('2023-02-01');
    const f2= screen.getByText('2023-03-01');
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

