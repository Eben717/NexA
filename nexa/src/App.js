import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/SideBar/Dashboard';
import NavBar from './components/NavBar/NavBar';
import LoginPage from './components/LoginPage';
import SideBar from './components/SideBar/SideBar';
import Projects from './components/SideBar/Projects';
import Reports from './components/SideBar/reports';
import ProfilePage from './components/NavBar/ProfilePage';
import Logout from './components/NavBar/Logout';
import Settings from './components/NavBar/Settings';
import Library from './components/SideBar/Library';


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            <div className="App">
                {isAuthenticated && <NavBar />}
                {isAuthenticated && <SideBar />}
                <Routes>
                    <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
                    <Route path="/projects" element={isAuthenticated ? <Projects /> : <Navigate to="/" />} />
                    <Route path="/reports" element={isAuthenticated ? <Reports /> : <Navigate to="/" />} />
                    <Route path="/library" element={isAuthenticated ? <Library /> : <Navigate to="/" />} />
                    <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/" />} />
                    <Route path="/logout" element={isAuthenticated ? <Logout /> : <Navigate to="/" />} />
                    <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;