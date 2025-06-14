import React, { useState } from 'react';

const Projects = () => {
  const [projectList, setProjectList] = useState([]);

  const handleClick = async (label) => {
    if (label === 'Project List') {
      try {
        const response = await fetch('http://localhost:2000/api/projects');
        const data = await response.json();
        if (data.projects) {
          setProjectList(data.projects);
        } else {
          console.error('No projects found');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh', width: '79.2%', marginLeft: 'auto', transform: 'translateY(-94%)' }}>
      <h1 style={{ borderBottom: '1px solid #007BFF', paddingBottom: '5px', color: '#333' }}>Projects</h1>

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

      {/* Display Project List */}
      {projectList.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h2>All Projects</h2>
          <ul>
            {projectList.map((project, index) => (
              <li key={index}>
                <strong>AllProjects:</strong> {project.AllProjects} <br />
                <strong>AuditsCompleted:</strong> {project.AuditsCompleted} <br />
                <strong>AuditsInProgress:</strong> {project.AuditsInProgress} <br />
                <strong>AuditsNotCompleted:</strong> {project.AuditsNotCompleted}
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
