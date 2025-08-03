import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Completed = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    projectId: '',
    projectName: '',
    auditType: '',
    client: '',
    auditor: '',
    startDate: '',
    endDate: '',
    status: 'Completed',
    findings: '',
    recommendations: '',
    reportLink: ''
  });

  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Project:', newProject);
    // Optionally post to API
  };

  return (
    <>
      {/* Back Button */}
      <button onClick={() => navigate('/projects')} className="back-button">
        ← Back
      </button>

      <h1 className="header">Completed Projects</h1>

      {/* ✅ Form */}
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-inputs">
        <input
          type="text"
          name="projectId"
          placeholder="Project ID"
          value={newProject.projectId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="projectName"
          placeholder="Project Name"
          value={newProject.projectName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="auditType"
          placeholder="Audit Type"
          value={newProject.auditType}
          onChange={handleChange}
        />
        <input
          type="text"
          name="client"
          placeholder="Client"
          value={newProject.client}
          onChange={handleChange}
        />
        <input
          type="date"
          name="startDate"
          value={newProject.startDate}
          onChange={handleChange}
        />
        <input
          type="date"
          name="endDate"
          value={newProject.endDate}
          onChange={handleChange}
        />
        <textarea
          name="findings"
          placeholder="Key Findings"
          value={newProject.findings}
          onChange={handleChange}
          rows="3"
        />
        <textarea
          name="recommendations"
          placeholder="Recommendations"
          value={newProject.recommendations}
          onChange={handleChange}
          rows="3"
        />
        <input
          type="url"
          name="reportLink"
          placeholder="Final Report Link (optional)"
          value={newProject.reportLink}
          onChange={handleChange}
        />
        <button type="submit" className="submit-button">Save Project</button>
       </div>
      </form>

      {/* ✅ Display Completed Projects */}
      <ul className="project-list">
        {projects.map((project, index) => (
          <li key={index} className="project-item">
            {Object.entries(project).map(([key, value]) => (
              <div key={key}>
                <strong>{key}:</strong> {value}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Completed;
