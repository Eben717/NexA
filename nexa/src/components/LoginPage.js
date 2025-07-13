import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
        fontFamily: 'Arial, sans-serif',
    },
    card: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '1rem',
    },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: 'bold',
        color: '#555',
    },
    error: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: '0.25rem',
    },
    button: {
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
    },
    link: {
        marginTop: '1rem',
        color: '#007BFF',
        cursor: 'pointer',
        fontSize: '0.9rem',
    },
    underline: {
        textDecoration: 'underline',
    },
};

const LoginPage = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSignIn = (e) => {
        e.preventDefault();
        let hasError = false;

        if (!email) {
            setEmailError('Enter email');
            hasError = true;
        } else if (!emailRegex.test(email)) {
            setEmailError('Incorrect format');
            hasError = true;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Enter password');
            hasError = true;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            hasError = true;
        } else {
            setPasswordError('');
        }

        if (!hasError) {
            setIsAuthenticated(true);
            navigate('/dashboard');
        }
    };

    const handleCreateAccount = () => {
        navigate('/register');
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <img
                    src="/logo/android-chrome-192x192.png"
                    alt="Login"
                    style={{ width: '60px', marginBottom: '1.5rem' }}
                />
                <form onSubmit={handleSignIn} noValidate>
                    <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                        <label htmlFor="email" style={styles.label}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError('');
                            }}
                            placeholder="name@example.com"
                            style={styles.input}
                            aria-describedby="email-error"
                        />
                        {emailError && (
                            <p
                                id="email-error"
                                style={styles.error}
                                aria-live="polite"
                            >
                                ❗ {emailError}
                            </p>
                        )}
                    </div>
                    <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                        <label htmlFor="password" style={styles.label}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordError('');
                            }}
                            placeholder="password"
                            style={styles.input}
                            aria-describedby="password-error"
                        />
                        {passwordError && (
                            <p
                                id="password-error"
                                style={styles.error}
                                aria-live="polite"
                            >
                                ❗ {passwordError}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        style={styles.button}
                        onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
                        onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
                    >
                        Sign In
                    </button>
                </form>
                <p
                    onClick={handleCreateAccount}
                    style={styles.link}
                    tabIndex={0}
                    role="button"
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') handleCreateAccount();
                    }}
                >
                    Don't have an account?{' '}
                    <span style={styles.underline}>Create one</span>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;