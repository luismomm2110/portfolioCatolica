import React from "react";
import {Airport} from "./types";
import CheckBoxesFoundAirports from "./CheckBoxFoundAirports";

export const FoundAirportsList = (props: {
    airports: Airport[],
    selectedAirports: Airport[],
    handleSelectingAirport: (airport: Airport) => void,
    selectedAirportLimit: number
}) => {
    const selectedAirportsMessage = () => {
        if (props.selectedAirports.length >= props.selectedAirportLimit) {
            return `Você atingiu o limite de ${props.selectedAirportLimit} aeroporto(s)`;
        }

        if (props.selectedAirports.length === 0) {
            return 'Nenhum aeroporto selecionado';
        }
        if (props.selectedAirports.length === 1) {
            return '1 aeroporto selecionado';
        }

        return `${props.selectedAirports.length} aeroportos selecionados`;
    }

    return <>
        <p>{selectedAirportsMessage()}</p>
        <CheckBoxesFoundAirports
            airports={props.airports}
            handleSelectingAirport={props.handleSelectingAirport}
            selectedAirports={props.selectedAirports}
            isAirportLimitReached={props.selectedAirports.length >= props.selectedAirportLimit}
        />
    </>;
}