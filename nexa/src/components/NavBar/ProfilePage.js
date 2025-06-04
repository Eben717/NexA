import React from 'react';

const ProfilePage = () => {
    const styles = {
        profilePage: {
            fontFamily: 'Segoe UI, Arial, sans-serif',
            maxWidth: '600px',
            transform: 'translateY(-110%) translateX(50%)',
            padding: '32px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: '18px',
            boxShadow: '0 8px 32px rgba(60, 60, 120, 0.15)',
        },
        profileHeader: {
            textAlign: 'center',
            marginBottom: '32px',
            color: '#2d3a4b',
            letterSpacing: '1px',
        },
        profileInfo: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '32px',
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            padding: '24px',
        },
        profilePicture: {
            marginRight: '28px',
        },
        profileImg: {
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '3px solid #007bff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        },
        profileDetails: {
            flex: 1,
            color: '#333',
        },
        profileActions: {
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '16px',
        },
        btn: {
            padding: '12px 28px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 500,
            transition: 'background 0.2s, box-shadow 0.2s',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
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