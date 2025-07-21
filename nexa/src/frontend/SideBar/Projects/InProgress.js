import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Import navigate

const Inprogress = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate(); // 👈 Initialize the hook

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:2000/api/projects/in-progress');
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
    <div className='wrapper'>
    <div className='container'>
      {/* ✅ Back Button */}
      <button className='back-button'
        onClick={() => navigate('/projects')}
      >
        ← Back
      </button>

      <h1 className='header'>
        In-Progress
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
    </div>
  );
};

export default Inprogress;