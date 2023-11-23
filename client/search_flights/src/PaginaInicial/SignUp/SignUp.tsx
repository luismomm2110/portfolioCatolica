import React from "react";
import ReusableForm from "../../systemDesign/ReusableForm/ReusableForm";
import {ReusableButton} from "../../systemDesign/Button/ReusableButton";
import './SignUp.css'


interface Props {
    onShowLogin: () => void;
}

export const SignUp: React.FC<Props> = ({ onShowLogin }) => {
const [formData, setFormData] = React.useState({
        name: '', nameError: '',
        email: '', emailError: '',
        password: '', passwordError: '',
        confirmPassword: '', confirmPasswordError: '',
        phone_number: '', phoneError: '',
    });

    const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formattedFormData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone_number: formData.phone_number,
            };
        fetch('http://127.0.0.1:5000/travel_agent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedFormData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if(data.error) {
                    console.log(data.error);
                } else {
                    console.log(data);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            }
        );
    };

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
            error: formData.nameError,
            required: true
        },
        {
            id: 'email',
            type: 'email',
            placeholder: 'Email',
            label: 'Email',
            value: formData.email,
            error: formData.emailError,
            required: true
        },
        {
            id: 'phone_number',
            type: 'tel',
            placeholder: 'Telefone',
            label: 'Telefone',
            value: formData.phone_number,
            error: formData.phoneError,
            required: true
        },
        {
            id: 'password',
            type: 'password',
            placeholder: 'Password',
            label: 'Password',
            value: formData.password,
            error: formData.passwordError,
            required: true
        },
        {
            id: 'confirmPassword',
            type: 'password',
            placeholder: 'Confirme sua senha',
            label: 'Confirme sua senha',
            value: formData.confirmPassword,
            error: formData.confirmPasswordError,
            required: true
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
            const phoneRegex = /^\(?([1-9]{2})\)?[-. ]?([9]\d{4})[-. ]?(\d{4})$/;
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
      return '';
    };

   return (
       <main className={'SignUp'}>
           <ReusableForm
               formTitle="Crie sua conta!"
               fields={loginFields}
               handleSubmit={handleSubmit}
               handleChange={handleChange}
           />
           <ReusableButton
               description={'Faça Login'}
               label={'Faça Login'}
               callback={onShowLogin}
           />
       </main>
    )
}
