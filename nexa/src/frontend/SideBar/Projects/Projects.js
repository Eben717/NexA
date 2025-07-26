import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const [projectList, setProjectList] = useState([]);
  const [sectionTitle, setSectionTitle] = useState('');

  const navigate = useNavigate();

  const handleClick = async (label) => {
    if (label === 'Project List') {
      navigate('/all-projects');
      return;
    }
    if (label === 'Completed') {
      navigate('/completed');
      return;
    }
    if (label === 'In-Progress') {
      navigate('/in-progress');
      return;
    }
    if (label === 'Unexecuted') {
      navigate('/not-completed');
      return;
    }

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
      default:
        return;
    }

    try {
      const response = await fetch(`http://localhost:2000/api/projects/${endpoint}`);
      const data = await response.json();
      const key = Object.keys(data)[0];
      setProjectList(data[key] || []);
      setSectionTitle(title);
    } catch (error) {
      console.error('❌ Error fetching data:', error);
    }
  };

  return (
    <>
      {/* Header */}
      <h1 className='header'>
        Projects
      </h1>
      
      {/* Circles */}
      <div className='circles'>
        {['Completed', 'In-Progress', 'Unexecuted', 'Project List'].map((label) => (
          <div
            key={label}
            onClick={() => handleClick(label)}
            className='circles2'
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
    </>
  );
};

export default Projects;
