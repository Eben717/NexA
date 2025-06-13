import React, { useState } from 'react';

const Projects = () => {
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [allProjects, setAllProjects] = useState('');

  const handleClick = (label) => {
    setSelectedLabel(label);

    if (label === 'Project List') {
      fetch('http://localhost:2000/api/projects')
        .then((res) => res.json())
        .then((data) => {
          setAllProjects(data.allProjects || 'No data found');
        })
        .catch((err) => {
          console.error('Error fetching AllProjects:', err);
          setAllProjects('Error fetching data');
        });
    } else {
      setAllProjects('');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh', width: '79.2%', marginLeft: 'auto' }}>
      <h1 style={{ borderBottom: '1px solid #007BFF', paddingBottom: '5px', color: '#333' }}>Projects</h1>

      {/* Circles */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px', flexWrap: 'wrap', gap: '20px' }}>
        {['Completed', 'In-Progress', 'Unexecuted', 'Project List'].map((label) => (
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

      {/* Display AllProjects */}
      {selectedLabel === 'Project List' && (
        <div style={{ marginTop: '40px' }}>
          <h2 style={{ color: '#007BFF' }}>All Projects</h2>
          <p>{allProjects}</p>
        </div>
      )}
    </div>
  );
};

export default Projects;
