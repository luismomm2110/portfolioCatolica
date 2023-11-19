import React from 'react';
import './LoadingPage.css';

const LoadingPage = () => {
  return (
    <div className="loadingPage">
      <div className="spinner"></div>
      <h1 style={{ marginLeft: '10px' }}>Carregando...</h1>
    </div>
  );
};

export default LoadingPage;
