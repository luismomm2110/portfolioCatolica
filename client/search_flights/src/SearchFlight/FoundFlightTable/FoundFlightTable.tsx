import React from 'react';

type Decimal = number;

interface FoundFlight {
    readonly city_source: string;
    readonly city_destination: string;
    readonly total_price: Decimal;
    readonly departure_date: string;
    readonly arrival_date: string;
    readonly currency: string;
    readonly carrier: string;
}

interface FlightTableProps {
    flights: FoundFlight[];
}

const FlightTable: React.FC<FlightTableProps> = ({ flights }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Source City</th>
                    <th>Destination City</th>
                    <th>Total Price</th>
                    <th>Departure Date</th>
                    <th>Arrival Date</th>
                    <th>Carrier</th>
                </tr>
            </thead>
            <tbody>
                {flights.map((flight, index) => (
                    <tr key={index}>
                        <td>{flight.city_source}</td>
                        <td>{flight.city_destination}</td>
                        <td>{flight.total_price}</td>
                        <td>{flight.departure_date}</td>
                        <td>{flight.arrival_date}</td>
                        <td>{flight.currency}</td>
                        <td>{flight.carrier}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default FlightTable;
