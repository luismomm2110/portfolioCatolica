import React, { useState } from 'react';
import {loginGateway} from "../gateways/Login";

import './Login.css';

import ReusableForm from "../systemDesign/FormContainer";

interface Props {
  onShowSignUp: () => void;
}

const Login: React.FC<Props> = ({ onShowSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    loginGateway(username, password).then((response) => {
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
  },
  {
    id: 'password',
    type: 'password',
    placeholder: 'Password',
    label: 'Password',
  },
];

  return (
  <main>
      <ReusableForm formTitle="Login" fields={loginFields} onSubmit={handleLoginSubmit} />
      <section className={'error'}>{error && <p>{error}</p>}</section>
      <section>
        <button onClick={onShowSignUp}>Crie sua conta</button>
      </section>
    </main>
    );
  };

export default Login;
