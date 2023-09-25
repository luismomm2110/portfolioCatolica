import React, { useState } from 'react';
import {loginGateway} from "../gateways/Login";

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    loginGateway(username, password).then((response) => {
      console.log(response);
    }).catch((error) => {
        setError(error.message);
    })
  }

  return (
  <>
    <form>
        <h2>Login</h2>
        <label htmlFor="login">Email:</label>
          <input
            id={'login'}
            type="text"
            placeholder="Username"
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
          <button type="submit" aria-label={'login'} onClick={handleSubmit}>Login</button>
      </form>
      { error && <p>{error}</p> }
    </>
    );
  };

export default Login;
