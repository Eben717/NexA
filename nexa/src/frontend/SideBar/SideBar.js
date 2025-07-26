// src/components/SideBar/SideBar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaFolderOpen,
  FaChartBar,
  FaBook,
  FaBars,
} from 'react-icons/fa';

const sidebarItems = [
  { name: 'Dashboard', key: 'dashboard', icon: <FaTachometerAlt /> },
  { name: 'Projects', key: 'projects', icon: <FaFolderOpen /> },
  { name: 'Reports', key: 'reports', icon: <FaChartBar /> },
  { name: 'Library', key: 'library', icon: <FaBook /> },
];

const SideBar = () => {
  const location = useLocation();
  const currentPath = location.pathname.slice(1);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(prev => !prev);

  return (
   
    <aside className='aside-bar' style={{ ...styles.sidebar, width: isOpen ? '220px' : '60px' }}>
      {/* Header with Menu and Drawer Icon */}
      <div style={styles.header}>
        <span style={{ ...styles.menuText, display: isOpen ? 'inline' : 'none' }}>Menu</span>
        <FaBars onClick={toggleSidebar} style={styles.drawerIcon} />
      </div>

      {/* Sidebar Items */}
      <ul style={styles.list}>
        {sidebarItems.map(item => {
          const isActive = currentPath === item.key;
          const isHovered = hoveredItem === item.key;

          return (
            <li
              key={item.key}
              style={{
                ...styles.listItem,
                backgroundColor: isActive || isHovered ? '#2e333d' : 'transparent',
              }}
              onMouseEnter={() => setHoveredItem(item.key)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link to={`/${item.key}`} style={styles.link}>
                <span style={styles.icon}>{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

const styles = {
  sidebar: {
    height: '100vh',
    background: '#23272f',
    color: '#fff',
    padding: '24px 0',
    boxSizing: 'border-box',
    transition: 'width 0.3s ease',
    overflow: 'hidden',
    display: 'inline-block',
    float: 'left',
  },
  header: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginBottom: '32px',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    letterSpacing: '1px',
  },
  menuText: {
    fontSize: '1.3rem',
  },
  drawerIcon: {
    cursor: 'pointer',
    fontSize: '1.2rem',
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
