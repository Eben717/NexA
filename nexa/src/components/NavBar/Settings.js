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
            <h1>Settings</h1>
            <form onSubmit={handleSubmit}>
                <div className="account-settings">
                    <h2>Account Settings</h2>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={accountSettings.email}
                            onChange={handleAccountChange}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={accountSettings.password}
                            onChange={handleAccountChange}
                        />
                    </label>
                </div>

                <div className="profile-settings">
                    <h2>Profile Settings</h2>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={profileSettings.username}
                            onChange={handleProfileChange}
                        />
                    </label>
                    <label>
                        Bio:
                        <textarea
                            name="bio"
                            value={profileSettings.bio}
                            onChange={handleProfileChange}
                        />
                    </label>
                </div>

                <button type="submit">Save Settings</button>
            </form>
        </div>
    );
};

export default Settings;