import React from "react";
import {Airport} from "./types";
import CheckBoxesFoundAirports from "./CheckBoxFoundAirports";

export const SelectingAirports = (props: {
    elements: React.JSX.Element[],
    airports: Airport[],
    handleSelectingAirport: (airport: Airport) => void,
    selectedAirportLimit: number
}) => {
    const selectedAirports = props.airports.filter((airport) => airport.selected);

    const selectedAirportsMessage = () => {
        if (selectedAirports.length >= props.selectedAirportLimit) {
            return `Você atingiu o limite de ${props.selectedAirportLimit} aeroporto(s)`;
        }

        if (selectedAirports.length === 0) {
            return 'Nenhum aeroporto selecionado';
        }
        if (selectedAirports.length === 1) {
            return '1 aeroporto selecionado';
        }

        return `${selectedAirports.length} aeroportos selecionados`;
    }

    return <>
        <p>{selectedAirportsMessage()}</p>
        <ul className={"selected-airports-list"}>
            {props.elements}
        </ul>
        <CheckBoxesFoundAirports
            airports={props.airports}
            handleSelectingAirport={props.handleSelectingAirport}
            selectedAirports={selectedAirports}
            isAirportLimitReached={selectedAirports.length >= props.selectedAirportLimit}
        />
    </>;
}