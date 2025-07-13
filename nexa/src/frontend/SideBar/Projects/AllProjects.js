import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Add this

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate(); // 👈 Initialize navigation

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:2000/api/projects/all-projects');
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
    <div
    className='container'
    >
      {/* ✅ Back Button */}
      <button
        onClick={() => navigate('/projects')}
    className='back-button'
      >
        ← Back
      </button>

      <h1 className='header'>
        Project List
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
    </div>
  );
};

export default AllProjects;