import React, { useState } from 'react';
import {loginGateway} from "../gateways/Login";

import './Login.css';

interface Props {
  onShowSignUp: () => void;
}

const Login: React.FC<Props> = ({ onShowSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    loginGateway(username, password).then((response) => {
      console.log(response);
    }).catch((error) => {
        setError(error.message);
    })
  }

  return (
  <main>
    <form>
      <header>
          <h2>Login</h2>
        </header>
        <label htmlFor="login">Email:</label>
          <input
            id={'login'}
            type="email"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
            <label htmlFor="password">Password:</label>
          <input
            id={'password'}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" aria-label={'login'} onClick={e => handleSubmit(e)}>Login</button>
      </form>
      <section className={'error'}>{error && <p>{error}</p>}</section>
      <section>
        <button onClick={onShowSignUp}>Crie sua conta</button>
      </section>
    </main>
    );
  };

export default Login;
