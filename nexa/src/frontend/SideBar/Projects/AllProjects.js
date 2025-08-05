import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

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

  const handleProjectClick = (projectName) => {
    const encodedName = encodeURIComponent(projectName);
    navigate(`/projects/${encodedName}`);
  };

  return (
    <>
      {/* Back Button */}
      <button onClick={() => navigate('/projects')} className="back-button">
        ← Back
      </button>

      <h1 className="header">Project List</h1>

      {/* Scrollable Project List */}
      <div className="project-list-wrapper">
        <ul className="project-list">
          {projects.map((item, index) => {
            // Try common fields for name, fallback to generic
            const projectName =
              item.name ||
              item.projectName ||
              item.AuditsCompleted ||
              item.AuditName ||
              `Project-${index + 1}`;

            return (
              <li key={index}>
                <div
                  className="project-card"
                  onClick={() => handleProjectClick(projectName)}
                  style={{ cursor: 'pointer' }}
                >
                  {projectName}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default AllProjects;
