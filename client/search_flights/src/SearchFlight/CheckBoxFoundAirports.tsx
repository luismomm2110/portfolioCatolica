import React from 'react';
import {Airport} from "./types";

type CheckBoxesFoundAirportsProps = {
    airports: Airport[];
    handleSelectingAirport: (airport: Airport) => void;
    selectedAirports: Airport[];
    isAirportLimitReached: boolean;
};

const CheckBoxesFoundAirports: React.FC<CheckBoxesFoundAirportsProps> = ({
    airports,
    handleSelectingAirport,
    selectedAirports,
    isAirportLimitReached
}) => {
    return (
        <>
            {airports.map((airport) => (
                <section key={airport.code} className={'checkbox-container'}>
                    <label htmlFor={airport.code}>{`${airport.name}: ${airport.distance} km`}</label>
                    <input
                        type="checkbox"
                        id={airport.code}
                        name="airport"
                        value={airport.name}
                        onClick={() => handleSelectingAirport(airport)}
                        disabled={isAirportLimitReached && !selectedAirports.includes(airport)}
                        checked={selectedAirports.includes(airport)}
                    />
                </section>
            ))}
        </>
    );
};

export default CheckBoxesFoundAirports;
