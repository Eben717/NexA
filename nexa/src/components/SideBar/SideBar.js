// src/components/SideBar/SideBar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaFolderOpen, FaChartBar, FaBook } from 'react-icons/fa';

const sidebarItems = [
  { name: 'Dashboard', key: 'dashboard', icon: <FaTachometerAlt /> },
  { name: 'Projects', key: 'projects', icon: <FaFolderOpen /> },
  { name: 'Reports', key: 'reports', icon: <FaChartBar /> },
  { name: 'Library', key: 'library', icon: <FaBook /> },
];

const SideBar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <aside style={styles.sidebar}>
      <div style={styles.header}>Menu</div>
      <ul style={styles.list}>
        {sidebarItems.map(item => (
          <li
            key={item.key}
            style={{
              ...styles.listItem,
              backgroundColor:
                hoveredItem === item.key ? '#2e333d' : 'transparent', // Light grey on hover
            }}
            onMouseEnter={() => setHoveredItem(item.key)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link to={`/${item.key}`} style={styles.link}>
              <span style={styles.icon}>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

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
    marginBottom: '8px',
    borderRadius: '4px',
    transition: 'background 0.2s',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    padding: '14px 32px',
    fontSize: '1rem',
    gap: '10px',
  },
  icon: {
    fontSize: '1.1rem',
  },
};

export default SideBar;
