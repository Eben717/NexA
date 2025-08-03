import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Inprogress = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    projectId: '',
    projectName: '',
    clientName: '',
    auditType: '',
    auditor: '',
    startDate: '',
    expectedEndDate: '',
    status: 'in-progress',
    notes: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:2000/api/projects/in-progress');
        const data = await res.json();
        if (data.projects) {
          setProjects(data.projects);
        }
      } catch (err) {
        console.error('Failed to fetch projects:', err);
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
          status: 'in-progress',
          notes: '',
        });
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <>
      <button onClick={() => navigate('/projects')} className="back-button">
        ← Back
      </button>

      <h2 className='header'>Audits In-Projects</h2>

      <form onSubmit={handleSubmit} className="project-form">
        <div className='form-inputs'>
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
          />
        <button type="submit" style={{ marginTop: '1rem' }}>➕ Add Project</button>
      </div>
      </form>

      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {projects.map((project, index) => (
          <li key={index} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
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

export default Inprogress;
