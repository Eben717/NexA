import React from 'react';

// NexA logo colors: #1a3a6b (dark blue), #4a6fa5 (medium blue), #f4f8fb (light background)
const LOGO_PRIMARY = '#1a3a6b';
const LOGO_SECONDARY = '#4a6fa5';
const LOGO_BG = '#f4f8fb';

const Dashboard = () => {
    const handleClick = (label) => {
        // No action needed for click events
    };

    return (
        <div style={{
            padding: '20px',
            fontFamily: 'Segoe UI, Arial, sans-serif',
            backgroundColor: LOGO_BG,
            minHeight: '100vh',
            alignItems: 'center',
            marginLeft: 'auto',
        }}>
            {/* Header */}
            <h1 style={{
                borderBottom: `2px solid ${LOGO_PRIMARY}`,
                paddingBottom: '10px',
                color: LOGO_PRIMARY,
                fontWeight: 600
            }}>
                Dashboard
            </h1>
            
            {/* Circles */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: '40px',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                {['Audit Status Overview', 'Recent Activity', 'Due Reports', 'NC Reports', 'KPIs'].map((label, idx) => (
                    <div
                        key={label}
                        onClick={() => handleClick(label)}
                        style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${LOGO_PRIMARY} 60%, ${LOGO_SECONDARY} 100%)`,
                            color: '#fff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            textAlign: 'center',
                            fontSize: '14px',
                            fontWeight: 500,
                            boxShadow: '0 4px 6px rgba(26, 58, 107, 0.10)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.boxShadow = '0 6px 10px rgba(26, 58, 107, 0.18)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(26, 58, 107, 0.10)';
                        }}
                    >
                        {label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;