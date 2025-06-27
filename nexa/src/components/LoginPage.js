import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = () => {
        console.log('Sign In clicked', { username, password });

        // Placeholder authentication logic
        if (username && password) {
            setIsAuthenticated(true);  // Update authentication state
            navigate('/dashboard');     // Redirect to dashboard
        }
    };

    const handleCreateAccount = () => {
        console.log('Create Account clicked');
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f0f2f5',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <div
                style={{
                    backgroundColor: '#fff',
                    padding: '2rem',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: '400px',
                    textAlign: 'center',
                }}
            >
                <img
                    src="\logo\android-chrome-192x192.png"
                    alt="Login"
                    style={{ width: '60px', marginBottom: '1.5rem' }}
                />
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#555', marginRight: '20rem' }}>
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="name@example.com"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            fontSize: '1rem',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#555', marginRight: '20rem' }}>
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            fontSize: '1rem',
                        }}
                    />
                </div>
                <button
                    onClick={handleSignIn}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '50px',
                        border: 'none',
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
                >
                    Sign In
                </button>
                <p
                    onClick={handleCreateAccount}
                    style={{ marginTop: '1rem', color: '#007BFF', cursor: 'pointer', fontSize: '0.9rem' }}
                >
                    Don't have an account? <span style={{ textDecoration: 'underline' }}>Create one</span>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;