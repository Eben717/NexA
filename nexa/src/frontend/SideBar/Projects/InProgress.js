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

        if (data.auditsInProgress) {
          setProjects(data.auditsInProgress);
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

      <h2 className="header">Audits In-Progress</h2>

      <ul>
        {projects.map((item, index) => {
          const project = item.AuditsInProgress;

          return (
            <li key={index}>
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

export default Inprogress;
