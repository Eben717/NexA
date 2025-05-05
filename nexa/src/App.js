import React from 'react';
import Dashboard from './components/Dashboard';
import NavBar from './components/NavBar';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <div className="App">
     <NavBar />
    <Dashboard />
    <LoginPage />
    </div>
  );
}

export default App;