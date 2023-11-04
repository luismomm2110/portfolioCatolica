import React, {useState} from "react";
import ReusableForm from "../systemDesign/ReusableForm/ReusableForm";
import {searchAirportGateway} from "./gateways/searchAirportGateway";
import {Airport} from "./types";
import './styles.css';

const CreateFlightArea: React.FC = () => {
    const [formData, setFormData] = useState({
        flightAreaName: '', flightAreaNameError: '',
        flightAreaOriginalAirport: '', flightAreaOriginalAirportError: ''
    })
    const [airports, setAirports] = useState<Airport[]>([])
    const [gatewayError, setGatewayError] = useState('');
    const isSelectingAirports = airports.length > 0;

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

    const checkBoxes = airports.map((airport, index) => (
        <div key={index}>
            <input type="checkbox" id={`checkbox-${airport.code}`} name="airport" value={airport.name}/>
            <label htmlFor={`checkbox-${index}`}>{airport.name}</label>
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
            disabled: isSelectingAirports
        },
        {
            id: 'flightAreaOriginalAirport',
            label: 'Aeroporto de origem',
            name: 'Aeroporto de origem',
            type: 'text',
            placeholder: 'Insira o nome da cidade',
            value: formData.flightAreaOriginalAirport,
            error: formData.flightAreaOriginalAirportError,
            disabled: isSelectingAirports
        },
    ]

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
                    {isSelectingAirports && <p>Nenhum aeroporto selecionado</p>}
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