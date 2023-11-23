import React, {useState} from 'react';

import './FoundFlightTable.css';

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
    const [sortedFlights, setSortedFlights] = useState(flights);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortType, setSortType] = useState<'price' |  'arrival' | 'airline'>('price');

    const sortFlights = (type: 'price' | 'arrival'| 'airline') => {
        const sorted = [...sortedFlights].sort((a, b) => {
            if (type === 'price') {
                return sortOrder === 'asc' ? a.total_price - b.total_price : b.total_price - a.total_price;
            } else if (type === 'arrival') {
                const dateA = new Date(a.arrival_date);
                const dateB = new Date(b.arrival_date);
                return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
            } else {
                return sortOrder === 'asc' ? a.carrier.localeCompare(b.carrier) : b.carrier.localeCompare(a.carrier);
            }
        });

        setSortedFlights(sorted);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setSortType(type);
    };

    const formatDateToDDMMYYYY = (date: string) => {
        const day = date.split('-')[2];
        const month = date.split('-')[1];
        const year = date.split('-')[0];

        return `${day}/${month}/${year}`;
    }

    return (
        <table className={'flight-table'}>
            <thead>
                <tr>
                    <th>Origem</th>
                    <th>Destino</th>
                    <th>Moeda</th>
                    <th onClick={() => sortFlights('price')} style={{ cursor: 'pointer' }}>
                        Preço Total {sortType === 'price' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                    </th>
                    <th>
                        Data de Partida
                    </th>
                    <th onClick={() => sortFlights('arrival')} style={{ cursor: 'pointer' }}>
                        Data de Chegada {sortType === 'arrival' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                    </th>
                    <th>Companhia Aérea</th>
                </tr>
            </thead>
            <tbody>
                {sortedFlights.map((flight, index) => (
                    <tr key={index}>
                        <td>{flight.city_source}</td>
                        <td>{flight.city_destination}</td>
                        <td>{flight.currency}</td>
                        <td>{flight.total_price}</td>
                        <td>{formatDateToDDMMYYYY(flight.departure_date)}</td>
                        <td>{formatDateToDDMMYYYY(flight.arrival_date)}</td>
                        <td>{flight.carrier}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default FlightTable;