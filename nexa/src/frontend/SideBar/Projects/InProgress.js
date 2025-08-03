import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Inprogress = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:2000/api/projects/in-progress');
        const data = await res.json();
        if (data.projects) {
          setProjects(data.projects);
        }
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <button onClick={() => navigate('/projects')} className="back-button">
        ← Back
      </button>

      <h2 className='header'>Audits In-Progress</h2>

      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {projects.map((project, index) => (
          <li key={index} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
            {Object.entries(project).map(([key, value]) => (
              <div key={key}>
                <strong>{key}:</strong> {value?.toString()}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Inprogress;
