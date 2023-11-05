import React, {useState} from "react";
import ReusableForm from "../systemDesign/ReusableForm/ReusableForm";
import {searchAirportGateway} from "./gateways/searchAirportGateway";
import {Airport} from "./types";
import './styles.css';

interface CreateFlightAreaProps {
  selectedAirportLimit?: number;
}

const CreateFlightArea: React.FC<CreateFlightAreaProps> = ({selectedAirportLimit = 10}) => {
    const [formData, setFormData] = useState({
        flightAreaName: '', flightAreaNameError: '',
        flightAreaOriginalAirport: '', flightAreaOriginalAirportError: ''
    })
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
        if (id === 'flightAreaOriginalAirport') {
            if (value === '') {
                return 'Campo obrigatório';
            }
        }
        return '';
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        searchAirportGateway(formData.flightAreaOriginalAirport).then((response) => {
            setAirports(response.data)
        }).catch((error) => {
            setGatewayError('Contate o suporte');
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        const error = validateField(id, value);
        setFormData({...formData, [id]: value, [id + 'Error']: error});
    }

    const handleSelectingAirport = (airport: Airport) => {
        if (selectedAirports.includes(airport)) {
            setSelectedAirports(selectedAirports.filter((selectedAirport) => selectedAirport.code !== airport.code));
        } else {
            setSelectedAirports([...selectedAirports, airport]);
        }
    }

    const checkBoxes = airports.map((airport, index) => (
        <div key={airport.code}>
            <input
                type="checkbox"
                id={`checkbox-${airport.code}`}
                name="airport" value={airport.name}
                onClick={() => handleSelectingAirport(airport)}
                disabled={isAirportLimitReached && !selectedAirports.includes(airport)}
            />
            <label
                htmlFor={`checkbox-${airport.code}`}>{`${airport.name}: ${airport.distance} km`}
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
            id: 'flightAreaOriginalAirport',
            label: 'Aeroporto de origem',
            name: 'Aeroporto de origem',
            type: 'text',
            placeholder: 'Insira o nome da cidade',
            value: formData.flightAreaOriginalAirport,
            error: formData.flightAreaOriginalAirportError,
        },
    ]

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
        <section>
            <li key={airport.code}>{airport.name}</li>
            <button
                name={'Remover'}
                onClick={() => handleSelectingAirport(airport)}
                >X
            </button>
        </section>
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
                        formTitle=""
                        fields={flightAreaFields}
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                    />
                    <div>
                        {isSelectingAirports && <p>{selectedAirportsMessage()}</p>}
                        {isSelectingAirports && <ul>{selectedAirportsList}</ul>}
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