import React, { useState } from 'react';
import {loginGateway} from "../gateways/Login";

import './Login.css';

import ReusableForm from "../../systemDesign/ReusableForm/ReusableForm";
import {ReusableButton} from "../../systemDesign/Button/ReusableButton";

interface Props {
  onShowSignUp: () => void;
  setToken: (token: string) => void;
  navigate: (path: string, options?: any) => void;
}


const Login: React.FC<Props> = ({ onShowSignUp, setToken, navigate }) => {
  const [gatewayError, setGatewayError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginGateway(formData.email, formData.password).then((response) => {
      setToken(response.access_token);
      navigate("/profile", { replace: true });
    }).catch((error) => {
        setGatewayError(error.message);
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const error = validateField(id, value);
    setFormData({ ...formData, [id]: value, [id + 'Error']: error });
  }

  const validateField = (id: string, value: string): string => {
    switch(id) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(value)) {
          return 'Por favor entre um email válido';
        }
        break;
      case 'password':
        if(value.length < 8) {
          return 'Senha deve ter pelo menos 8 caracteres';
        }
        break;
      default:
        break;
    }
    return '';
  };

  const loginFields = [
  {
    id: 'email',
    type: 'email',
    placeholder: 'Email',
    label: 'Email',
    value: formData.email,
    error: ''
  },
  {
    id: 'password',
    type: 'password',
    placeholder: 'Password',
    label: 'Password',
    value: formData.password,
    error: ''
  },
];

  return (
    <main className={'Login'}>
      <ReusableForm
          formTitle="Login"
          fields={loginFields}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
      />
      <section className={'error'}>{gatewayError && <p>{gatewayError}</p>}</section>
      <section>
        <ReusableButton
            description={'Sign Up'}
            label={'Crie sua conta'}
            callback={onShowSignUp}
        />
      </section>
    </main>
    );
  };

export default Login;
