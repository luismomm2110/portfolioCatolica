import React from "react";
import ReusableForm from "../systemDesign/ReusableForm/ReusableForm";

export const SignUp: React.FC = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
    });

    const handleSubmit = () => {
        console.log(formData);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    }

    const loginFields = [
        {
            id: 'name',
            type: 'text',
            placeholder: 'Nome',
            label: 'Nome',
            value: formData.name,
        },
        {
            id: 'email',
            type: 'email',
            placeholder: 'Email',
            label: 'Email',
            value: formData.email,
        },
        {
            id: 'phone',
            type: 'text',
            placeholder: 'Telefone',
            label: 'Telefone',
            value: formData.phone,
        },
        {
            id: 'password',
            type: 'password',
            placeholder: 'Password',
            label: 'Password',
            value: formData.password,
        },
        {
            id: 'confirmPassword',
            type: 'password',
            placeholder: 'Confirme sua senha',
            label: 'Confirme sua senha',
            value: formData.confirmPassword,
        }
    ];

   return (
       <main>
           <ReusableForm formTitle="Crie sua conta!" fields={loginFields} handleSubmit={handleSubmit} handleChange={handleChange} />
       </main>
    )
}

