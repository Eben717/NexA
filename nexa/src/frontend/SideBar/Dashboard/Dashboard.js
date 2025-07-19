import React from 'react';

const Dashboard = () => {
    const handleClick = (label) => {
        // No action needed for click events
    };

    return (
        <div className='container'>
                <h1>
                Dashboard
            </h1>
            
            {/* Circles */}
            <div className='circles'>
                {['Audit Status Overview', 'Recent Activity', 'Due Reports', 'NC Reports', 'KPIs'].map((label, idx) => (
                    <div
                        key={label}
                        onClick={() => handleClick(label)}
                        className='circles2'
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