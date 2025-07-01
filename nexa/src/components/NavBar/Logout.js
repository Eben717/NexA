// Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session or token
    sessionStorage.clear();
    localStorage.removeItem('token');

    // Update auth state
    setIsAuthenticated(false);

    // Navigate to login
    navigate('/');
  }, [navigate, setIsAuthenticated]);

  return null;
};

export default Logout;
