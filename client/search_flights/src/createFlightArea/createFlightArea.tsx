import React, {useState} from "react";
import ReusableForm from "../systemDesign/ReusableForm/ReusableForm";
import {searchAirportGateway} from "./gateways/searchAirportGateway";

const CreateFlightArea: React.FC = () => {
    const [formData, setFormData] = useState({
        flightAreaName: '', flightAreaNameError: '',
        flightAreaOriginalAirport: '', flightAreaOriginalAirportError: ''
    })
    const [gatewayError, setGatewayError] = useState('');

    const validateField = (id: string, value: string) => {
        if (id === 'flightAreaName') {
            if (value === '') {
                return 'Campo obrigatório';
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
            console.log(response);
        }).catch((error) => {
            setGatewayError(error.message);
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const error = validateField(id, value);
        setFormData({ ...formData, [id]: value, [id + 'Error']: error });
    }

    const flightAreaFields = [
        {
            id: 'flightAreaName',
            label: 'Nome da área de voo',
            name: 'flightAreaName',
            type: 'text',
            placeholder: 'Insira o nome da área de voo',
            value: formData.flightAreaName,
            error: formData.flightAreaNameError
        },
        {
            id: 'flightAreaOriginalAirport',
            label: 'Aeroporto de origem',
            name: 'Aeroporto de origem',
            type: 'text',
            placeholder: 'Insira um aeroporto de origem',
            value: formData.flightAreaOriginalAirport,
            error: formData.flightAreaOriginalAirportError
        }
    ]

    return (
        <>
            <header>
                <h1>Create Flight Area</h1>
            </header>
            <main>
            <ReusableForm
                formTitle=""
                fields={flightAreaFields}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
            />
            </main>
        </>
    );
}

export default CreateFlightArea;