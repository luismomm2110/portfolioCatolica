import React from "react";

import {Airport} from "./types";

interface SelectedAirportsListProps {
    selectedAirports: Airport[];
    handleRemoveSelectedAirport: (airport: Airport) => void;
}


const SelectedAirportsList: React.FC<SelectedAirportsListProps> = ({selectedAirports, handleRemoveSelectedAirport}) =>
(
    <>
        <ul className={'selected-airports-list'}>
            {selectedAirports.map((airport) => (
                <li key={airport.code}>
                <span>{airport.name}</span>
                <button
                    name={'Remover'}
                    onClick={() => handleRemoveSelectedAirport(airport)}
                >
                    X
                </button>
            </li>
            ))}
        </ul>
    </>
);
export default SelectedAirportsList;