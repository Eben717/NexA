import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotCompleted = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:2000/api/projects/not-completed');
        const data = await res.json();

        if (data.auditsNotCompleted) {
          setProjects(data.auditsNotCompleted);
        }
      } catch (err) {
        console.error('❌ Failed to fetch projects:', err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <button onClick={() => navigate('/projects')} className="back-button">
        ← Back
      </button>

      <h2 className="header">Audits Not Completed</h2>

      <ul className="project-list">
        {projects.map((item, index) => {
          const project = item.AuditsNotCompleted;

          return (
            <li key={index} className="project-item">
              {typeof project === 'object' ? (
                Object.entries(project).map(([key, value]) => (
                  <div key={key}>
                    <strong>{key}:</strong> {value?.toString()}
                  </div>
                ))
              ) : (
                <div>{project}</div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default NotCompleted;
