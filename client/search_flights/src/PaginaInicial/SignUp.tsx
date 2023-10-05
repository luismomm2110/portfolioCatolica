import React from "react";
import ReusableForm from "../systemDesign/ReusableForm/ReusableForm";
import {ReusableButton} from "../systemDesign/Button/ReusableButton";


interface Props {
    onShowLogin: () => void;
}

export const SignUp: React.FC<Props> = ({ onShowLogin }) => {
const [formData, setFormData] = React.useState({
        name: '', nameError: '',
        email: '', emailError: '',
        password: '', passwordError: '',
        confirmPassword: '', confirmPasswordError: '',
        phone: '', phoneError: '',
    });

    const handleSubmit = () => {
        console.log(formData);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const error = validateField(id, value);
        setFormData({ ...formData, [id]: value, [id + 'Error']: error });
    }

    const loginFields = [
        {
            id: 'name',
            type: 'text',
            placeholder: 'Nome',
            label: 'Nome',
            value: formData.name,
            error: formData.nameError
        },
        {
            id: 'email',
            type: 'email',
            placeholder: 'Email',
            label: 'Email',
            value: formData.email,
            error: formData.emailError
        },
        {
            id: 'phone',
            type: 'tel',
            placeholder: 'Telefone',
            label: 'Telefone',
            value: formData.phone,
            error: formData.phoneError
        },
        {
            id: 'password',
            type: 'password',
            placeholder: 'Password',
            label: 'Password',
            value: formData.password,
            error: formData.passwordError
        },
        {
            id: 'confirmPassword',
            type: 'password',
            placeholder: 'Confirme sua senha',
            label: 'Confirme sua senha',
            value: formData.confirmPassword,
            error: formData.confirmPasswordError
        }
    ];

    const validateField = (id: string, value: string): string => {
      switch(id) {
        case 'name':
          if(value.length < 3) {
            return 'Nome deve ter pelo menos 3 caracteres';
          }
          break;
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if(!emailRegex.test(value)) {
            return 'Por favor entre um email válido';
          }
          break;
        case 'phone':
          const phoneRegex = /^\d{10}$/;
          if(!phoneRegex.test(value)) {
            return 'Please enter a valid phone number';
          }
          break;
        case 'password':
          if(value.length < 8) {
            return 'Senha deve ter pelo menos 8 caracteres';
          }
          break;
        case 'confirmPassword':
          if(value !== formData.password) {
            return 'Senhas não coincidem';
          }
          break;
        default:
          break;
      }
      return '';  // return empty string if there are no validation errors
    };

   return (
       <main>
           <ReusableForm formTitle="Crie sua conta!" fields={loginFields} handleSubmit={handleSubmit} handleChange={handleChange} />
           <ReusableButton description={'Faça Login'} label={'Faça Login'} callback={onShowLogin} />
       </main>
    )
}

