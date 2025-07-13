import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 

const Completed = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate(); // 

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:2000/api/projects/completed');
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
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f6f9',
        minHeight: '100vh',
        width: '79.2%',
        marginLeft: 'auto',
        transform: 'translateY(-94%)',
      }}
    >
      {/* ✅ Back Button */}
      <button
        onClick={() => navigate('/projects')}
        style={{
          marginBottom: '20px',
          padding: '10px 15px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          float: 'left',
        }}
      >
        ← Back
      </button>

      <h1 style={{ clear: 'both', borderBottom: '1px solid #007BFF', paddingBottom: '5px', color: '#333' }}>
        Completed
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
  );
};

export default Completed;