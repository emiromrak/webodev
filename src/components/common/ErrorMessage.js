import React from 'react';

const ErrorMessage = ({ message, onRetry }) => (
  <div className="error-container">
    <h2>Hata Oluştu!</h2>
    <p>{message}</p>
    <button onClick={onRetry}>Tekrar Dene</button>
  </div>
);

export default ErrorMessage;