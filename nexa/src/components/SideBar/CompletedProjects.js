import React from 'react';

const CompletedProjects = () => {

    const [isClicked, setIsClicked] = React.useState(false);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh', width: '79.2%', alignItems: 'center', marginLeft: 'auto', transform: 'translateY(-94%)' }}>
            {/* Header */}
            <h1 style={{ borderBottom: '1px solid #007BFF', paddingBottom: '5px', color: '#333' }}>Library</h1>
            {/* Folder Icon*/}
            <div
                tabIndex={0}
                style={{
                    marginTop: '20px',
                    marginBottom: '10px',
                    display: 'inline-block',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'transform 0.15s cubic-bezier(.17,.67,.83,.67)',
                    transform: isClicked ? 'scale(1.15)' : 'scale(1)',
                }}>
            </div>
        </div>
    );
};

export default CompletedProjects;