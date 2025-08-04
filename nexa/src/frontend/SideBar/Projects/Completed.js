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

        if (data.auditsCompleted) {
          setProjects(data.auditsCompleted); // ✅ Correct key from API response
        }
      } catch (err) {
        console.error('❌ Failed to fetch projects:', err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      {/* Back Button */}
      <button onClick={() => navigate('/projects')} className="back-button">
        ← Back
      </button>

      <h1 className="header">Completed Projects</h1>

      {/* ✅ Display Completed Projects */}
      <ul className="project-list">
        {projects.map((item, index) => {
          const project = item.AuditsCompleted; // ✅ Extract nested project object

          return (
            <li key={index} className="project-item">
              {typeof project === 'object' ? (
                Object.entries(project).map(([key, value]) => (
                  <div key={key}>
                    <strong>{key}:</strong> {value}
                  </div>
                ))
              ) : (
                <div>{project}</div> // In case AuditsCompleted is a string
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Completed;
