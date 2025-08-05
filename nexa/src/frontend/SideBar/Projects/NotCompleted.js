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

  const handleProjectClick = (projectName) => {
    const encodedName = encodeURIComponent(projectName);
    navigate(`/projects/not-completed/${encodedName}`);
  };

  return (
    <>
      {/* Back Button */}
      <button onClick={() => navigate('/projects')} className="back-button">
        ← Back
      </button>

      <h1 className="header">Audits Not Completed</h1>

      {/* Scrollable Project List */}
      <div className="project-list-wrapper">
        <ul className="project-list">
          {projects.map((item, index) => {
            const project = item.AuditsNotCompleted;
            const projectName =
              typeof project === 'string'
                ? project
                : project?.projectName || project?.clientName || `Project-${index + 1}`;

            return (
              <li key={index}>
                <div
                  className="project-card"
                  onClick={() => handleProjectClick(projectName)}
                  style={{ cursor: 'pointer' }}
                >
                  {typeof project === 'object' ? (
                    Object.entries(project).map(([key, value]) => (
                      <div key={key}>
                        <strong>{key}:</strong> {value?.toString()}
                      </div>
                    ))
                  ) : (
                    <div>{projectName}</div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default NotCompleted;
