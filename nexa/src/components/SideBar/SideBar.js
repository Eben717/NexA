// src/components/SideBar/SideBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const sidebarItems = [
    { name: 'Dashboard', key: 'dashboard' },
    { name: 'Projects', key: 'projects' },
    { name: 'Risk Management', key: 'risk-management' },
    { name: 'Controls', key: 'controls' },
    { name: 'Findings', key: 'findings' },
    { name: 'Reports', key: 'reports' },
    { name: 'Library', key: 'library' },
];

const SideBar = () => (
    <aside style={styles.sidebar}>
        <div style={styles.header}>Menu</div>
        <ul style={styles.list}>
            {sidebarItems.map(item => (
                <li key={item.key} style={styles.listItem}>
                    <Link to={`/${item.key}`} style={{ color: '#fff', textDecoration: 'none' }}>
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
    </aside>
);

const styles = {
    sidebar: {
        width: '220px',
        height: '100vh',
        background: '#23272f',
        color: '#fff',
        padding: '24px 0',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        fontSize: '1.3rem',
        fontWeight: 'bold',
        marginBottom: '32px',
        textAlign: 'center',
        letterSpacing: '1px',
    },
    list: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        flex: 1,
    },
    listItem: {
        padding: '14px 32px',
        cursor: 'pointer',
        fontSize: '1rem',
        borderRadius: '4px',
        marginBottom: '8px',
        transition: 'background 0.2s',
    },
};

export default SideBar;
