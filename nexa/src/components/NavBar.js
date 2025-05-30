import React, { useState } from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

const NavBar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const styles = {
        navbar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            backgroundColor: '#333',
            color: '#fff',
            position: 'relative',
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
            position: 'relative',
        },
        icon: {
            fontSize: '30px',
            cursor: 'pointer',
        },
        dropdown: {
            position: 'absolute',
            top: '50px',
            right: '0',
            backgroundColor: '#007BFF',
            color: '#fff',
            borderRadius: '5px',
            padding: '10px',
            width: '150px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        },
        dropdownItem: {
            padding: '8px 12px',
            cursor: 'pointer',
            borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        },
        lastDropdownItem: {
            padding: '8px 12px',
            cursor: 'pointer',
        }
    };

    return (
        <nav style={styles.navbar}>
            <a href="/" style={styles.logo}>
                <img 
                    src="\logo\android-chrome-192x192.png" 
                    alt="Logo" 
                    style={{ height: '40px', width: '40px' }} 
                />
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
                <FaUserCircle 
                    style={styles.icon} 
                    title="User Profile" 
                    onClick={toggleDropdown} 
                />
                {dropdownVisible && (
                    <div style={styles.dropdown}>
                        <div style={styles.dropdownItem}>Profile</div>
                        <div style={styles.dropdownItem}>Settings</div>
                        <div style={styles.lastDropdownItem}>Sign Out</div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;