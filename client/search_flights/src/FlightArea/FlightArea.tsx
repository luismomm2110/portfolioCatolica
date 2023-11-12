import React, {useState} from "react";
import ReusableForm from "../systemDesign/ReusableForm/ReusableForm";
import {searchAirportGateway} from "./gateways/searchAirportGateway";
import {Airport} from "./types";
import './styles.css';
import {cityOfOriginGateway} from "./gateways/cityOfOriginGateway";
import {ReusableDatePicker} from "../systemDesign/DatePicker/DatePicker";

interface CreateFlightAreaProps {
    selectedAirportLimit?: number;
}

const FlightArea: React.FC<CreateFlightAreaProps> = ({selectedAirportLimit = 10}) => {
    const [formData, setFormData] = useState({
        cityOfOrigin: '', cityOfOriginError: '',
        flightAreaOriginalAirport: '', flightAreaOriginalAirportError: ''
    })
    const [findedCityOfOrigin, setFindedCityOfOrigin] = useState('');
    const [airports, setAirports] = useState<Airport[]>([])
    const [gatewayError, setGatewayError] = useState('');
    const [selectedAirports, setSelectedAirports] = useState<Airport[]>([]);
    const [flightDate, setFlightDate] = useState<Date>(new Date());
    const isSelectingOrigin = findedCityOfOrigin.length === 0;
    const isSelectingDestiny = airports.length === 0 && !isSelectingOrigin;
    const isSelectingAirports = airports.length > 0;
    const isAirportLimitReached = selectedAirports.length >= selectedAirportLimit;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (findedCityOfOrigin.length === 0) {
            try {
                const response = await cityOfOriginGateway(formData.cityOfOrigin);
                setFindedCityOfOrigin(response.data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setGatewayError(error.message);
                }
            }
        } else {
            try {
                const response = await searchAirportGateway(formData.flightAreaOriginalAirport);
                setAirports(response.data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setGatewayError(error.message);
                }
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setFormData({...formData, [id]: value, [id + 'Error']: ''});
    }

    const handleSelectingAirport = (airport: Airport) => {
        if (selectedAirports.includes(airport)) {
            setSelectedAirports(selectedAirports.filter((selectedAirport) =>
                selectedAirport.code !== airport.code));
        } else {
            setSelectedAirports([...selectedAirports, airport]);
        }
    }

    const checkBoxes = airports.map((airport) => (
        <div key={airport.code}>
            <input
                type="checkbox"
                id={airport.code}
                name="airport" value={airport.name}
                onClick={() => handleSelectingAirport(airport)}
                disabled={isAirportLimitReached && !selectedAirports.includes(airport)}
                checked={selectedAirports.includes(airport)}
            />
            <label
                htmlFor={airport.code}>{`${airport.name}: ${airport.distance} km`}
            </label>
        </div>
    ));

    const flightAreaFields = [
        {
            id: 'cityOfOrigin',
            label: 'Cidade de origem',
            name: 'Cidade de origem',
            type: 'text',
            placeholder: 'Insira a cidade de origem',
            value: formData.cityOfOrigin,
            error: formData.cityOfOriginError,
        }
    ]

    const fieldAreaOriginalAirport = {
        id: 'flightAreaOriginalAirport',
        label: 'Aeroporto de destino',
        name: 'Aeroporto de destino',
        type: 'text',
        placeholder: 'Insira o nome do aeroporto de destino',
        value: formData.flightAreaOriginalAirport,
        error: formData.flightAreaOriginalAirportError,
    }

    const selectedAirportsMessage = () => {
        if (isAirportLimitReached) {
            return `Você atingiu o limite de ${selectedAirportLimit} aeroporto(s)`;
        }

        if (selectedAirports.length === 0) {
            return 'Nenhum aeroporto selecionado';
        }
        if (selectedAirports.length === 1) {
            return '1 aeroporto selecionado';
        }

        return `${selectedAirports.length} aeroportos selecionados`;
    }

    const selectedAirportsList = selectedAirports.map((airport) => (
        <>
            <li key={airport.code}>
                <span>{airport.name}</span>
                <button
                    name={'Remover'}
                    onClick={() => handleSelectingAirport(airport)}
                >
                    X
                </button>
            </li>
        </>
    ));

    const getHeaderTitle = () => {
        if (isSelectingOrigin) {
            return 'Selecione a origem';
        }
        if (isSelectingDestiny) {
            return 'Selecione o destino';
        }
        return 'Selecione os aeroportos';
    }

    return (
        <div className={'flight-area-container'}>
            <header>
                <h1>{getHeaderTitle()}</h1>
            </header>
            <main
                className={'create-flight-area'}
            >
                <div className={'select-airports'}>
                    <ReusableForm
                        formTitle=""
                        fields={findedCityOfOrigin.length === 0
                            ? flightAreaFields :
                            [...flightAreaFields, fieldAreaOriginalAirport]}
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                    />
                    <div>
                        {isSelectingAirports && <p>{selectedAirportsMessage()}</p>}
                        {isSelectingAirports &&
                            <ul className={'selected-airports-list'} >
                                {selectedAirportsList}
                            </ul>}
                    </div>
                </div>
                {gatewayError && <p className={'error-message'}>{gatewayError}</p>}
                {isSelectingAirports &&
                    <section className={'checkbox-container'}>
                        {checkBoxes}
                        <ReusableDatePicker onChange={(date) => setFlightDate(date)}/>
                    </section>
                }
            </main>
        </div>
    );
}

export default FlightArea;