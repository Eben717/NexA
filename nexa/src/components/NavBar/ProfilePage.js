import React from 'react';

const ProfilePage = () => {
    const styles = {
        profilePage: {
            fontFamily: 'Arial, sans-serif',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        profileHeader: {
            textAlign: 'center',
            marginBottom: '20px',
        },
        profileInfo: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
        },
        profilePicture: {
            marginRight: '20px',
        },
        profileImg: {
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #ddd',
        },
        profileDetails: {
            flex: 1,
        },
        profileActions: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        btn: {
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
        },
        editProfile: {
            backgroundColor: '#007bff',
            color: '#fff',
        },
        logout: {
            backgroundColor: '#dc3545',
            color: '#fff',
        },
    };

    return (
        <div style={styles.profilePage}>
            <header style={styles.profileHeader}>
                <h1>My Profile</h1>
            </header>
            <section style={styles.profileInfo}>
                <div style={styles.profilePicture}>
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                        style={styles.profileImg}
                    />
                </div>
                <div style={styles.profileDetails}>
                    <h2>John Doe</h2>
                    <p><strong>Email:</strong> johndoe@example.com</p>
                    <p><strong>Location:</strong> New York, USA</p>
                    <p><strong>Role:</strong> System Administrator</p>
                </div>
            </section>
            <section style={styles.profileActions}>
                <button style={{ ...styles.btn, ...styles.editProfile }}>Edit Profile</button>
                <button style={{ ...styles.btn, ...styles.logout }}>Logout</button>
            </section>
        </div>
    );
};

export default ProfilePage;