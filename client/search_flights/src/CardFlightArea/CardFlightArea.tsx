import React from 'react';
import {FlightArea} from "../createFlightArea/types";


interface CardFlightAreaProps {
    flightArea: FlightArea;
}

const CardFlightArea: React.FC<CardFlightAreaProps> = ({flightArea}) => {
    return (
        <>
            <div className={'card-flight-area'}>
                <h2>{flightArea.name}</h2>
            </div>
        </>
    );
}

export default CardFlightArea;