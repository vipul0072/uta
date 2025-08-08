// SuccessPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/SuccessPage.css';

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="success-container">
      <div className="success-message">
        <h1>Registration Successful!</h1>
        <p>Your registration has been completed successfully. You can now proceed with the tournament.</p>
        <button className="home-button" onClick={handleBackToHome}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
