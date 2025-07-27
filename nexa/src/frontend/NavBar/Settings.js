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

    return (
        <div className="settings-container">
            <h1 className="settings-header">Settings</h1>
            <form onSubmit={handleSubmit}>
                <div className="settings-section">
                    <h3>Account Settings</h3>
                    <div className="settings-field">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={accountSettings.email}
                            onChange={handleAccountChange}
                        />
                    </div>
                    <div className="settings-field">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={accountSettings.password}
                            onChange={handleAccountChange}
                        />
                    </div>
                </div>

                <div className="settings-section">
                    <h3>Profile Settings</h3>
                    <div className="settings-field">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={profileSettings.username}
                            onChange={handleProfileChange}
                        />
                    </div>
                    <div className="settings-field">
                        <label>Bio</label>
                        <input
                            type="text"
                            name="bio"
                            value={profileSettings.bio}
                            onChange={handleProfileChange}
                        />
                    </div>
                </div>

                <button className="settings-save-btn" type="submit">Save Settings</button>
            </form>
        </div>
    );
};

export default Settings;