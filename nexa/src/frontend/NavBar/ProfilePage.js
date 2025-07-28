import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        email: 'johndoe@example.com',
        location: 'New York, USA',
        role: 'System Administrator',
    });

    const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleEditToggle = () => setIsEditing(true);
    const handleCancel = () => setIsEditing(false);

    const handleSave = () => {
        alert('Profile updated successfully!');
        setIsEditing(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result); // Set image as base64
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file.');
        }
    };

    return (
        <div className="profile-container">
            <header className="profile-header">
                <h1>My Profile</h1>
            </header>

            <section className="profile-content">
                <div className="profile-image-wrapper" onClick={handleImageClick}>
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="profile-image"
                        style={{ cursor: 'pointer' }}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                </div>

                <div className="profile-details">
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                name="name"
                                value={profileData.name}
                                onChange={handleChange}
                                className="profile-input"
                            />
                            <input
                                type="email"
                                name="email"
                                value={profileData.email}
                                onChange={handleChange}
                                className="profile-input"
                            />
                            <input
                                type="text"
                                name="location"
                                value={profileData.location}
                                onChange={handleChange}
                                className="profile-input"
                            />
                            <input
                                type="text"
                                name="role"
                                value={profileData.role}
                                onChange={handleChange}
                                className="profile-input"
                            />
                        </>
                    ) : (
                        <>
                            <h2 className="profile-name">{profileData.name}</h2>
                            <p><strong>Email:</strong> {profileData.email}</p>
                            <p><strong>Location:</strong> {profileData.location}</p>
                            <p><strong>Role:</strong> {profileData.role}</p>
                        </>
                    )}
                </div>
            </section>

            <section className="profile-actions">
                {isEditing ? (
                    <>
                        <button className="profile-btn" onClick={handleSave}>Save</button>
                        <button className="profile-btn" onClick={handleCancel}>Cancel</button>
                    </>
                ) : (
                    <button className="profile-btn" onClick={handleEditToggle}>Edit Profile</button>
                )}
                <button className="profile-btn logout" onClick={handleLogout}>Logout</button>
            </section>
        </div>
    );
};

export default ProfilePage;
