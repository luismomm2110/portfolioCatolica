import React, {useState} from 'react';
import {FlightArea} from "../createFlightArea/types";
import {ReusableButton} from "../systemDesign/Button/ReusableButton";


interface CardFlightAreaProps {
    flightArea: FlightArea;
    onExcluir: (flightArea: FlightArea) => void;
}

const CardFlightArea: React.FC<CardFlightAreaProps> = ({flightArea, onExcluir}) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCompartilhar = async () => {
        try {
            const url = `http://localhost:3000/flight_area/${flightArea._id}`
            await navigator.clipboard.writeText(url);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    return (
        <>
            <div className={'card-flight-area'}>
                <header>
                    <h2>{flightArea.name}</h2>
                </header>
                <footer>
                    <ReusableButton
                        description={isCopied ? 'Copiado' : 'Compartilhar'}
                        label={isCopied ? 'Copiado' : 'Compartilhar'}
                        callback={handleCompartilhar}
                    />
                    <ReusableButton
                        description={'Excluir'}
                        label={'Excluir'}
                        callback={() => onExcluir(flightArea)}
                    />
                </footer>
            </div>
        </>
    );
}

export default CardFlightArea;