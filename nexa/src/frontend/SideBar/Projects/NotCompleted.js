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
    <div className="project-page">
      {/* ✅ Back Button */}
      <button className="back-button" onClick={() => navigate('/projects')}>
        ← Back
      </button>

      {/* 🔍 Header */}
      <h2 className="header">Unexecuted Audit</h2>

      {/* 📋 Project List */}
      <ul className="project-list">
        {projects.map((project, index) => (
          <li key={index} className="project-card">
            {Object.entries(project).map(([key, value]) => (
              <div key={key}>
                <strong>{key}:</strong> {value?.toString()}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotCompleted;
