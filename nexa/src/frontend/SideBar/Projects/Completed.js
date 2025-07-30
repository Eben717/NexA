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
    // You could POST this to the API if needed.
  };

  return (
    <div className="completed-container" style={{ padding: '1rem' }}>
      {/* Back Button */}
      <button
        onClick={() => navigate('/projects')}
        className='back-button'
        style={{ marginBottom: '1rem' }}
      >
        ← Back
      </button>

    <h1 className='header'>Completed Projects</h1>
      
      {/* ✅ Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2></h2>

        <input type="text" name="projectId" placeholder="Project ID" value={newProject.projectId} onChange={handleChange} required /><br />
        <input type="text" name="projectName" placeholder="Project Name" value={newProject.projectName} onChange={handleChange} required /><br />
        <input type="text" name="auditType" placeholder="Audit Type" value={newProject.auditType} onChange={handleChange} /><br />
        <input type="text" name="client" placeholder="Client" value={newProject.client} onChange={handleChange} /><br />
        <input type="text" name="auditor" placeholder="Auditor(s)" value={newProject.auditor} onChange={handleChange} /><br />
        <input type="date" name="startDate" value={newProject.startDate} onChange={handleChange} /><br />
        <input type="date" name="endDate" value={newProject.endDate} onChange={handleChange} /><br />
        <textarea name="findings" placeholder="Key Findings" value={newProject.findings} onChange={handleChange} rows="3" /><br />
        <textarea name="recommendations" placeholder="Recommendations" value={newProject.recommendations} onChange={handleChange} rows="3" /><br />
        <input type="url" name="reportLink" placeholder="Final Report Link (optional)" value={newProject.reportLink} onChange={handleChange} /><br />

        <button type="submit">Save Project</button>
      </form>

      {/* ✅ Display Completed Projects */}
      <ul>
        {projects.map((project, index) => (
          <li key={index} style={{ marginBottom: '1rem', padding: '1rem', background: '#f4f4f4', borderRadius: '6px' }}>
            {Object.entries(project).map(([key, value]) => (
              <div key={key}>
                <strong>{key}:</strong> {value}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Completed;
