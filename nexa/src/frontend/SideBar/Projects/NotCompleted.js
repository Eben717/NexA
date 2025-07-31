import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotCompleted = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    projectId: '',
    projectName: '',
    clientName: '',
    auditType: '',
    auditor: '',
    startDate: '',
    expectedEndDate: '',
    status: 'not-completed',
    notes: '',
  });

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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:2000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const newProject = await res.json();
      if (newProject) {
        setProjects((prev) => [...prev, newProject]);
        setFormData({
          projectId: '',
          projectName: '',
          clientName: '',
          auditType: '',
          auditor: '',
          startDate: '',
          expectedEndDate: '',
          status: 'not-completed',
          notes: '',
        });
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <div className="project-page">
      {/* ✅ Back Button */}
      <button className="back-button" onClick={() => navigate('/projects')}>
        ← Back
      </button>

      {/* 📝 Form Section */}
      <h2 className="header">Unexecuted Audit</h2>
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <input
            type="text"
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            placeholder="Project ID"
            required
          />
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            placeholder="Project Name"
            required
          />
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            placeholder="Client Name"
            required
          />
          <input
            type="text"
            name="auditType"
            value={formData.auditType}
            onChange={handleChange}
            placeholder="Audit Type"
          />
          <input
            type="text"
            name="auditor"
            value={formData.auditor}
            onChange={handleChange}
            placeholder="Auditor"
          />
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            placeholder="Start Date"
          />
          <input
            type="date"
            name="expectedEndDate"
            value={formData.expectedEndDate}
            onChange={handleChange}
            placeholder="Expected End Date"
          />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes"
            rows={2}
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit" className="submit-button">➕ Add Project</button>
      </form>

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
