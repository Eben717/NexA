import React from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [isDropdownOpen, setDropdownOpen] = React.useState(false);

    const styles = {
        navbar: {
            display: 'flex',
            justifyContent: 'space-between',
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
            position: 'relative',
        },
        icon: {
            fontSize: '30px',
            cursor: 'pointer',
        },
        Usericon: {
            fontSize: '30px',
            cursor: 'pointer',
        },
        dropdown: {
            position: 'absolute',
            top: '50px',
            right: '0',
            backgroundColor: '#007BFF',
            color: '#333',
            borderRadius: '5px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '10px',
            zIndex: 1000,
        },
        dropdownItem: {
            padding: '10px',
            cursor: 'pointer',
            borderBottom: '1px solid #ddd',
            textDecoration: 'none',
            color: '#fff',
        },
        dropdownItemLast: {
            padding: '10px',
            cursor: 'pointer',
            textDecoration: 'none',
            color: '#fff',
        },
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
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
                <div style={{ position: 'relative' }}>
                    <FaUserCircle
                        style={styles.Usericon}
                        title="User Profile"
                        onClick={toggleDropdown}
                    />
                    {isDropdownOpen && (
                        <div style={styles.dropdown}>
                            <Link to="/profile" style={styles.dropdownItem} 
                            onClick={() => setDropdownOpen(false)}>Profile</Link>
                            <div style={styles.dropdownItem}>Settings</div>
                            <div style={styles.dropdownItemLast}>Logout</div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
