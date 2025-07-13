import React, { useState } from 'react';

const Settings = () => {
    const [accountSettings, setAccountSettings] = useState({
        email: 'user@example.com',
        password: 'password123',
    });

    const [profileSettings, setProfileSettings] = useState({
        username: '',
        bio: '',
    });

    const handleAccountChange = (e) => {
        setAccountSettings({
            ...accountSettings,
            [e.target.name]: e.target.value,
        });
    };

    const handleProfileChange = (e) => {
        setProfileSettings({
            ...profileSettings,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Account Settings:', accountSettings);
        console.log('Profile Settings:', profileSettings);
        alert('Settings saved!');
    };

    const styles = {
        container: {
            fontFamily: 'Segoe UI, Arial, sans-serif',
            maxWidth: '600px',
            transform: 'translateY(-90%) translateX(50%)',
            padding: '32px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: '18px',
            boxShadow: '0 8px 32px rgba(60, 60, 120, 0.15)',
            height: '95vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        header: {
            textAlign: 'center',
            marginBottom: '24px',
            color: '#2d3a4b',
            letterSpacing: '1px',
        },
        section: {
            marginBottom: '32px', // Increased from 16px to 32px for more space between forms
            background: '#fff',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        },
        inputGroup: {
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
        },
        label: {
            minWidth: '90px',
            marginRight: '16px',
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'right',
        },
        input: {
            flex: 'none',
            width: '260px', // Increased from 220px to 260px
            padding: '8px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '14px',
        },
        button: {
            padding: '10px 22px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: 500,
            transition: 'background 0.2s, box-shadow 0.2s',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            marginTop: '8px',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Settings</h1>
            <form onSubmit={handleSubmit}>
                <div style={styles.section}>
                    <h3>Account Settings</h3>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={accountSettings.email}
                            onChange={handleAccountChange}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={accountSettings.password}
                            onChange={handleAccountChange}
                            style={styles.input}
                        />
                    </div>
                </div>

                <div style={styles.section}>
                    <h3>Profile Settings</h3>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={profileSettings.username}
                            onChange={handleProfileChange}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Bio</label>
                        <input
                            type="text"
                            name="bio"
                            value={profileSettings.bio}
                            onChange={handleProfileChange}
                            style={styles.input}
                        />
                    </div>
                </div>

                <button type="submit" style={styles.button}>Save Settings</button>
            </form>
        </div>
    );
};

export default Settings;
