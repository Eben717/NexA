// Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Clear authentication data (if stored in localStorage, sessionStorage, or cookies)
    localStorage.removeItem('token'); // or whatever you're using
    sessionStorage.clear();

    // ✅ Redirect to login page
    navigate('/');
  }, [navigate]);

  return null; // or a loading spinner/message
};

export default Logout;
