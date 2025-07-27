import React from 'react';

const ProfilePage = () => {
    return (
        <div>
            <header>
                <h1>My Profile</h1>
            </header>
            <section>
                <div>
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                    />
                </div>
                <div>
                    <h2>John Doe</h2>
                    <p><strong>Email:</strong> johndoe@example.com</p>
                    <p><strong>Location:</strong> New York, USA</p>
                    <p><strong>Role:</strong> System Administrator</p>
                </div>
            </section>
            <section>
                <button>Edit Profile</button>
                <button>Logout</button>
            </section>
        </div>
    );
};

export default ProfilePage;