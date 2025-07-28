import React from 'react';

const ProfilePage = () => {
    return (
        <div className="profile-container">
            <header className="profile-header">
                <h1>My Profile</h1>
            </header>
            <section className="profile-content">
                <div className="profile-image-wrapper">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                        className="profile-image"
                    />
                </div>
                <div className="profile-details">
                    <h2 className="profile-name">John Doe</h2>
                    <p><strong>Email:</strong> johndoe@example.com</p>
                    <p><strong>Location:</strong> New York, USA</p>
                    <p><strong>Role:</strong> System Administrator</p>
                </div>
            </section>
            <section className="profile-actions">
                <button className="profile-btn">Edit Profile</button>
                <button className="profile-btn logout">Logout</button>
            </section>
        </div>
    );
};

export default ProfilePage;
