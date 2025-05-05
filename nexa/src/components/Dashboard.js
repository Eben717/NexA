import React from 'react';

const Dashboard = () => {
    const handleClick = (label) => {
        // No action needed for click events
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
            {/* Header */}
            <h1 style={{ borderBottom: '2px solid #007BFF', paddingBottom: '10px', color: '#333' }}>Dashboard</h1>

            {/* Circles */}
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px', flexWrap: 'wrap', gap: '20px' }}>
                {['Audit Status Overview', 'Recent Activity', 'Due Reports', 'NC Reports', 'KPIs'].map((label) => (
                    <div
                        key={label}
                        onClick={() => handleClick(label)}
                        style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            textAlign: 'center',
                            fontSize: '14px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
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