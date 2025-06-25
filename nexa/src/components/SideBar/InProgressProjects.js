import React from 'react';

const InProgressProjects = () => {

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
                }}
                onMouseDown={() => setIsClicked(true)}
                onMouseUp={() => setIsClicked(false)}
                onMouseLeave={() => setIsClicked(false)}
                onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') setIsClicked(true);
                }}
                onKeyUp={e => {
                    if (e.key === 'Enter' || e.key === ' ') setIsClicked(false);
                }}
                aria-label="Open Library Folder"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ display: 'block' }}
                > 
                    <rect
                        x="2"
                        y="7"
                        width="20"
                        height="13"
                        rx="3"
                        fill={isClicked ? "#F5F6FA" : undefined}
                        style={{ transition: 'fill 0.2s' }}
                        className="folder-body"
                    />
                    <path
                        d="M2 7V5a2 2 0 0 1 2-2h5.17a2 2 0 0 1 1.41.59l1.83 1.83A2 2 0 0 0 13.83 6H20a2 2 0 0 1 2 2v2"
                        fill="#FFFFFF"
                    />
                    <rect
                        x="2"
                        y="7"
                        width="20"
                        height="13"
                        rx="3"
                        stroke="#B0BEC5"
                        strokeWidth="1.5"
                    />
                </svg>
                <div style=
                {{ textAlign: 'center', marginTop: '8px', color: '#555', 
                fontSize: '16px', fontWeight: 500 }}> Documents </div>
                <style>{`
                    .folder-body {
                        fill: #E5E7EB;
                        transition: fill 0.2s;
                    }
                    div[tabindex]:hover .folder-body {
                        fill: #F5F6FA;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default InProgressProjects;