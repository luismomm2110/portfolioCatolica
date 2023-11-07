import React, {useState} from "react";
import ReusableForm from "../systemDesign/ReusableForm/ReusableForm";
import {searchAirportGateway} from "./gateways/searchAirportGateway";
import {Airport} from "./types";
import './styles.css';
import {cityOfOriginGateway} from "./gateways/cityOfOriginGateway";

interface CreateFlightAreaProps {
    selectedAirportLimit?: number;
}

const CreateFlightArea: React.FC<CreateFlightAreaProps> = ({selectedAirportLimit = 10}) => {
    const [formData, setFormData] = useState({
        flightAreaName: '', flightAreaNameError: '',
        cityOfOrigin: '', cityOfOriginError: '',
        flightAreaOriginalAirport: '', flightAreaOriginalAirportError: ''
    })
    const [findedCityOfOrigin, setFindedCityOfOrigin] = useState('');
    const [airports, setAirports] = useState<Airport[]>([])
    const [gatewayError, setGatewayError] = useState('');
    const [selectedAirports, setSelectedAirports] = useState<Airport[]>([]);

    const isSelectingAirports = airports.length > 0;
    const isAirportLimitReached = selectedAirports.length >= selectedAirportLimit;

    const validateField = (id: string, value: string) => {
        if (id === 'flightAreaName') {
            if (value === '') {
                return 'Campo obrigatório';
            }
            if (value.length > 50) {
                return 'O nome da área de voo deve ter no máximo 50 caracteres';
            }
        }
        return '';
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (findedCityOfOrigin.length === 0) {
            cityOfOriginGateway(formData.cityOfOrigin).then((response) => {
                setFindedCityOfOrigin(response.data)
                }
            ).catch((error) => {
                setGatewayError(error.response.data.message);
            })
        } else {
            searchAirportGateway(formData.flightAreaOriginalAirport).then((response) => {
                setAirports(response.data)
            }).catch((error) => {
                console.log(error.response.data.message)
                setGatewayError(error.response.data.message);
            })
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        const error = validateField(id, value);
        setFormData({...formData, [id]: value, [id + 'Error']: error});
    }

    const handleSelectingAirport = (airport: Airport) => {
        if (selectedAirports.includes(airport)) {
            setSelectedAirports(selectedAirports.filter((selectedAirport) =>
                selectedAirport.code !== airport.code));
        } else {
            setSelectedAirports([...selectedAirports, airport]);
        }
    }

    const checkBoxes = airports.map((airport, index) => (
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
            id: 'flightAreaName',
            label: 'Nome da área de voo',
            name: 'flightAreaName',
            type: 'text',
            placeholder: 'Insira o nome da área de voo',
            value: formData.flightAreaName,
            error: formData.flightAreaNameError,
        },
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

    return (
        <div className={'flight-area-container'}>
            <header>
                <h1>Crie sua área de voo</h1>
            </header>
            <main
                className={'create-flight-area'}
            >
                <div className={'select-airports'}>
                    <ReusableForm
                        submitText={selectedAirports.length > 0 ? 'Salvar' : 'Submit'}
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
                    </section>
                }
            </main>
        </div>
    );
}

export default CreateFlightArea;