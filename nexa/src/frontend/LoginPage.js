import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f8fb',
        fontFamily: 'Segoe UI, Arial, sans-serif',
    },
    card: {
        backgroundColor: '#fff',
        padding: '2.5rem 2rem',
        borderRadius: '10px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
    },
    logo: {
        width: '60px',
        marginBottom: '1rem',
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#1a3a6b',
        marginBottom: '0.3rem',
        letterSpacing: '0.5px',
    },
    subtitle: {
        fontSize: '1rem',
        color: '#4a6fa5',
        marginBottom: '2rem',
    },
    input: {
        width: '100%',
        padding: '0.7rem',
        borderRadius: '5px',
        border: '1px solid #b0c4de',
        fontSize: '1rem',
        marginBottom: '0.5rem',
        backgroundColor: '#f7fbff',
    },
    label: {
        display: 'block',
        marginBottom: '0.3rem',
        fontWeight: '500',
        color: '#1a3a6b',
    },
    error: {
        color: '#d9534f',
        fontSize: '0.85rem',
        marginTop: '0.15rem',
        marginBottom: '0.3rem',
    },
    button: {
        width: '100%',
        padding: '0.8rem',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#1a3a6b',
        color: '#fff',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '0.5rem',
        marginBottom: '1rem',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#274e8e',
    },
    link: {
        color: '#007BFF',
        cursor: 'pointer',
        fontSize: '0.95rem',
        textDecoration: 'underline',
        marginTop: '0.5rem',
        display: 'inline-block',
    },
    footer: {
        marginTop: '2rem',
        fontSize: '0.85rem',
        color: '#adb5bd',
    },
};

const LoginPage = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [buttonHover, setButtonHover] = useState(false);
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSignIn = (e) => {
        e.preventDefault();
        let hasError = false;

        if (!email) {
            setEmailError('Please enter your email address.');
            hasError = true;
        } else if (!emailRegex.test(email)) {
            setEmailError('Invalid email format.');
            hasError = true;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Please enter your password.');
            hasError = true;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters.');
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

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <img
                    src="/logo/android-chrome-192x192.png"
                    alt="Audit System Logo"
                    style={styles.logo}
                />
                <div style={styles.title}>NexA Audit Portal</div>
                <div style={styles.subtitle}>
                  Welcome 
                  <p>Please sign in to continue.</p> 
                </div>
                <form onSubmit={handleSignIn} noValidate>
                    <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                        <label htmlFor="email" style={styles.label}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError('');
                            }}
                            placeholder="your.email@firm.com"
                            style={styles.input}
                            aria-describedby="email-error"
                        />
                        {emailError && (
                            <div
                                id="email-error"
                                style={styles.error}
                                aria-live="polite"
                            >
                                {emailError}
                            </div>
                        )}
                    </div>
                    <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
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
                            placeholder="Enter your password"
                            style={styles.input}
                            aria-describedby="password-error"
                        />
                        {passwordError && (
                            <div
                                id="password-error"
                                style={styles.error}
                                aria-live="polite"
                            >
                                {passwordError}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        style={{
                            ...styles.button,
                            ...(buttonHover ? styles.buttonHover : {}),
                        }}
                        onMouseOver={() => setButtonHover(true)}
                        onMouseOut={() => setButtonHover(false)}
                    >
                        Sign In
                    </button>
                </form>
                <span
                    onClick={handleForgotPassword}
                    style={styles.link}
                    tabIndex={0}
                    role="button"
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') handleForgotPassword();
                    }}
                >
                    Forgot password?
                </span>
                <br />
                <span
                    onClick={handleCreateAccount}
                    style={styles.link}
                    tabIndex={0}
                    role="button"
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') handleCreateAccount();
                    }}
                >
                    Request access
                </span>
                <div style={styles.footer}>
                    &copy; {new Date().getFullYear()} NexA Audit Portal. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default LoginPage;