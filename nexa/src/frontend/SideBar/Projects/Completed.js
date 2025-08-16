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

  const handleProjectClick = (projectName) => {
    const encodedName = encodeURIComponent(projectName);
    navigate(`/projects/completed/${encodedName}`);
  };

  return (
    <>
      {/* Back Button */}
      <button onClick={() => navigate('/projects')} className="back-button">
        ← Back
      </button>

      <h1 className="header">Completed Audits</h1>

      {/* Scrollable Project List */}
      <div className="project-list-wrapper">
        <ul className="project-list">
          {projects.map((item, index) => {
            const project = item.AuditsCompleted;
  const projectName = item.AuditsCompleted || `Project-${index + 1}`;

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

export default Completed;
