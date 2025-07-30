import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaPlus, FaTrash } from 'react-icons/fa';

const ProfilePage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    location: 'New York, USA',
    role: 'System Administrator',
  });

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
    sessionStorage.clear();
    localStorage.removeItem('token'); // or 'authToken' if that’s what you store
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleImageDelete = () => {
    setProfileImage(null);
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1>My Profile</h1>
      </header>

      <section className="profile-content">
        <div className="profile-image-wrapper" style={{ position: 'relative' }}>
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="profile-image"
              onClick={handleImageClick}
              style={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }}
            />
          ) : (
            <FaUser
              size={150}
              color="#ccc"
              onClick={handleImageClick}
              style={{ cursor: 'pointer' }}
            />
          )}

          {/* Plus icon - add/change image */}
          <div
            className="image-action-button"
            title="Add/Change Image"
            onClick={handleImageClick}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: '#007bff',
              color: '#fff',
              borderRadius: '50%',
              padding: '5px',
              cursor: 'pointer',
            }}
          >
            <FaPlus />
          </div>

          {/* Trash icon - delete image */}
          {profileImage && (
            <div
              className="image-action-button"
              title="Delete Image"
              onClick={handleImageDelete}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: '#dc3545',
                color: '#fff',
                borderRadius: '50%',
                padding: '5px',
                cursor: 'pointer',
              }}
            >
              <FaTrash />
            </div>
          )}

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
