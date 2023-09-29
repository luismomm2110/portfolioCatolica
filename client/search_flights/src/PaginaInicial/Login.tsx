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
  const [name, setName] = useState('abobora');
  const [password, setPassword] = useState('abobora');

  const handleSubmit = () => {
    loginGateway('', '').then((response) => {
      console.log(response);
    }).catch((error) => {
        setError(error.message);
    })
  }

const loginFields = [
  {
    id: 'login',
    type: 'email',
    placeholder: 'Email',
    label: 'Email',
    value: name,
  },
  {
    id: 'password',
    type: 'password',
    placeholder: 'Password',
    label: 'Password',
    value: password,
  },
];

  return (
    <main>
      <ReusableForm formTitle="Login" fields={loginFields} onSubmit={handleSubmit} />
      <section className={'error'}>{error && <p>{error}</p>}</section>
      <section>
        <ReusableButton description={'Sign Up'} label={'Crie sua conta'} />
      </section>
    </main>
    );
  };

export default Login;
