import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    projectId: '',
    projectName: '',
    clientName: '',
    auditType: '',
    auditor: '',
    startDate: '',
    expectedEndDate: '',
    status: 'pending',
    notes: '',
  });

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
          status: 'pending',
          notes: '',
        });
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <>
      {/* ✅ Back Button */}
      <button onClick={() => navigate('/projects')} className="back-button">
        ← Back
      </button>

      <h1 className="header">Project List</h1>

      {/* ➕ Form Section */}
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-grid">
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
            placeholder="Auditor Name"
          />
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
          <input
            type="date"
            name="expectedEndDate"
            value={formData.expectedEndDate}
            onChange={handleChange}
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="select-field"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="not-completed">Not Completed</option>
          </select>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes"
            rows={2}
            className="textarea-full"
          />
        </div>
        <button type="submit" className="submit-button">➕ Add Project</button>
      </form>

      {/* 🔽 List of Projects */}
      <ul className="project-list">
        {projects.map((project, index) => (
          <li key={index} className="project-item">
            {Object.entries(project).map(([key, value]) => (
              <div key={key}>
                <strong>{key}:</strong> {value?.toString()}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </>
  );
};

export default AllProjects;
