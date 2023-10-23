import React, {useState} from "react";
import ReusableForm from "../systemDesign/ReusableForm/ReusableForm";

const CreateFlightArea: React.FC = () => {
    const [formData, setFormData] = useState({
        flightAreaName: '', flightAreaNameError: '',
    })

    const validateField = (id: string, value: string) => {
        if (id === 'flightAreaName') {
            if (value === '') {
                return 'Campo obrigatório';
            }
        }
        return '';
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
        }]

    return (
        <>
            <header>
                <h1>Create Flight Area</h1>
            </header>
            <main>
            <ReusableForm
                formTitle="Create Flight Area"
                fields={flightAreaFields}
                handleSubmit={() => {}}
                handleChange={handleChange}
            />
            </main>
        </>
    );
}

export default CreateFlightArea;