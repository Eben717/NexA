import { useEffect, useState } from 'react';
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
          setProjects(data.auditsCompleted);
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

      {/* Scrollable Project List */}
      <div className="project-list-wrapper">
        <ul className="project-list">
          {projects.map((item, index) => {
            const project = item.AuditsCompleted;

            return (
              <li key={index}>
                <div className="project-card">
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

export default Completed;
