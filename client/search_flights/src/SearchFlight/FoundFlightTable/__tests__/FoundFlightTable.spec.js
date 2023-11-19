import React from 'react';
import { render, screen } from '@testing-library/react';
import FoundFlightTable from '../FoundFlightTable';

const mockFoundFlightTable = [
    {
        city_source: "New York",
        city_destination: "London",
        total_price: 500,
        departure_date: '2023-01-01',
        arrival_date: '2023-02-01',
        currency: "USD",
        carrier: "Airways 1"
    },
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
});

