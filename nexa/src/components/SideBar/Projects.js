import React, { useState } from 'react';

const Projects = () => {
  const [projectList, setProjectList] = useState([]);
  const [sectionTitle, setSectionTitle] = useState('');

  const handleClick = async (label) => {
    let endpoint = '';
    let title = '';

    switch (label) {
      case 'Completed':
        endpoint = 'completed';
        title = 'Audits Completed';
        break;
      case 'In-Progress':
        endpoint = 'in-progress';
        title = 'Audits In Progress';
        break;
      case 'Unexecuted':
        endpoint = 'not-completed';
        title = 'Audits Not Completed';
        break;
      case 'Project List':
        endpoint = 'all-projects';
        title = 'All Projects';
        break;
      default:
        return;
    }

    try {
      const response = await fetch(`http://localhost:2000/api/projects/${endpoint}`);
      const data = await response.json();

      // Determine the right key to extract
      if (label === 'Project List' && data.projects) {
        setProjectList(data.projects);
      } else {
        // Extract whichever key exists
        const key = Object.keys(data)[0];
        setProjectList(data[key] || []);
      }

      setSectionTitle(title);
    } catch (error) {
      console.error('❌ Error fetching data:', error);
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f6f9',
        minHeight: '100vh',
        width: '79.2%',
        marginLeft: 'auto',
        transform: 'translateY(-94%)',
      }}
    >
      <h1 style={{ borderBottom: '1px solid #007BFF', paddingBottom: '5px', color: '#333' }}>
        Projects
      </h1>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '40px',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
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

      {/* Display Result List */}
      {projectList.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h2>{sectionTitle}</h2>
          <ul>
            {projectList.map((project, index) => (
              <li key={index}>
                {Object.entries(project).map(([key, value]) => (
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
  );
};

export default Projects;
