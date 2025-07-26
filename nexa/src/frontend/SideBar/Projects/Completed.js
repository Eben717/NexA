import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Completed = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:2000/api/projects/completed');
        const data = await res.json();
        if (data.projects) {
          setProjects(data.projects);
        }
      } catch (err) {
        console.error('❌ Failed to fetch projects:', err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      {/* ✅ Back Button */}
      <button
        onClick={() => navigate('/projects')}
        className='back-button'
      >
        ← Back
      </button>

      <h1 className='header'>
        Completed
      </h1>

      <ul>
        {projects.map((project, index) => (
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
    </>
  );
};

export default Completed;
