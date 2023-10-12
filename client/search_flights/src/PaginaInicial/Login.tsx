import React, { useState } from 'react';
import {loginGateway} from "../gateways/Login";

import './Login.css';

import ReusableForm from "../systemDesign/ReusableForm/ReusableForm";
import {ReusableButton} from "../systemDesign/Button/ReusableButton";

interface Props {
  onShowSignUp: () => void;
}

const Login: React.FC<Props> = ({ onShowSignUp }) => {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = () => {
    loginGateway('', '').then((response) => {
      console.log(response);
    }).catch((error) => {
        setError(error.message);
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  }

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
      <section className={'error'}>{error && <p>{error}</p>}</section>
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
