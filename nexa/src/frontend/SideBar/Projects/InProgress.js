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
        console.error('❌ Failed to fetch projects:', err);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (projectName) => {
    const encodedName = encodeURIComponent(projectName);
    navigate(`/projects/in-progress/${encodedName}`);
  };

  return (
    <>
      {/* Back Button */}
      <button onClick={() => navigate('/projects')} className="back-button">
        ← Back
      </button>

      <h1 className="header">Audits In-Progress</h1>

      {/* Scrollable Project List */}
      <div className="project-list-wrapper">
        <ul className="project-list">
          {projects.map((item, index) => {
            const project = item.AuditsInProgress;
            const projectName = typeof project === 'string' 
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
                    <div>{project}</div>
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

export default Inprogress;
