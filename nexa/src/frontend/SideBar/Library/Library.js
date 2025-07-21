import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Library = () => {
    const [libraryList, setLibraryList] = useState([]);
    const [sectionTitle, setSectionTitle] = useState('');
    const navigate = useNavigate();

    const handleClick = async (label) => {
        if (label === 'Library List') {
            navigate('/library-list');
            return;
        }
        if (label === 'Documents') {
            navigate('/documents');
            return;
        }
        if (label === 'Templates') {
            navigate('/templates');
            return;
        }
        if (label === 'Guides') {
            navigate('/guides');
            return;
        }

        let endpoint = '';
        let title = '';

        switch (label) {
            case 'Documents':
                endpoint = 'documents';
                title = 'Documents';
                break;
            case 'Templates':
                endpoint = 'templates';
                title = 'Templates';
                break;
            case 'Guides':
                endpoint = 'guides';
                title = 'Guides';
                break;
            default:
                return;
        }

        try {
            const response = await fetch(`http://localhost:2000/api/library/${endpoint}`);
            const data = await response.json();
            const key = Object.keys(data)[0];
            setLibraryList(data[key] || []);
            setSectionTitle(title);
        } catch (error) {
            console.error('❌ Error fetching data:', error);
        }
    };

    return (
        <div className='wrapper'>
        <div className='container'>
            {/* Header */}
            <h1 className='header'>
                Library
            </h1>

            {/* Circles */}
            <div className='circles'>
                {['Documents', 'Templates', 'Guides', 'Library List'].map((label) => (
                    <div
                        key={label}
                        onClick={() => handleClick(label)}
                        className='circles2'
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.boxShadow = '0 6px 10px rgba(26, 58, 107, 0.18)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(26, 58, 107, 0.10)';
                        }}
                    >
                        {label}
                    </div>

                ))}
            </div>

            {/* Display Result List */}
            {libraryList.length > 0 && (
                <div style={{ marginTop: '40px' }}>
                    <h2>{sectionTitle}</h2>
                    <ul>
                        {libraryList.map((item, index) => (
                            <li key={index}>
                                {Object.entries(item).map(([key, value]) => (
                                    <div key={key}>
                                        <strong>{key}:</strong> {value}
                                    </div>
                                ))}
                                <hr />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
        </div>
    );
};

export default Library;