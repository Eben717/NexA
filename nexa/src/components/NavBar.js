import React from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

const NavBar = () => {
    const styles = {
        navbar: {
            display: 'flex',
            justifyContent: 'space-between', // Adjust to include logo on the left
            alignItems: 'center',
            padding: '10px 20px',
            backgroundColor: '#333',
            color: '#fff',
        },
        logo: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#fff',
            textDecoration: 'none',
        },
        searchContainer: {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: '5px',
            padding: '5px 10px',
        },
        searchInput: {
            border: 'none',
            outline: 'none',
            marginRight: '5px',
        },
        searchIcon: {
            color: '#333',
        },
        iconsContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
        },
        icon: {
            fontSize: '20px',
            cursor: 'pointer',
        },
    };

    return (
        <nav style={styles.navbar}>
            <a href="/" style={styles.logo}>
                Logo
            </a>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search here"
                    style={styles.searchInput}
                />
                <FaSearch style={styles.searchIcon} />
            </div>
            <div style={styles.iconsContainer}>
                <FaBell style={styles.icon} title="Notifications" />
                <FaUserCircle style={styles.icon} title="User Profile" />
            </div>
        </nav>
    );
};

export default NavBar;
