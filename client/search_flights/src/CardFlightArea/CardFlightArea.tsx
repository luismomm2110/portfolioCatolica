import React from 'react';
import {FlightArea} from "../createFlightArea/types";
import {ReusableButton} from "../systemDesign/Button/ReusableButton";


interface CardFlightAreaProps {
    flightArea: FlightArea;
}

const CardFlightArea: React.FC<CardFlightAreaProps> = ({flightArea}) => {
    return (
        <>
            <div className={'card-flight-area'}>
                <header>
                    <h2>{flightArea.name}</h2>
                </header>
                <footer>
                    <ReusableButton
                        description={'Compartilhar'}
                        label={'Editar'}/>
                    <ReusableButton
                        description={'Excluir'}
                        label={'Excluir'}
                    />
                </footer>
            </div>
        </>
    );
}

export default CardFlightArea;