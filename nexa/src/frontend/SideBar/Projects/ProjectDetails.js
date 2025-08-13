import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ProjectDetail = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();

  const decodedProjectName = decodeURIComponent(projectName);
  const [newName, setNewName] = useState('');
  const [file, setFile] = useState(null);

  // Upload File
  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectName', decodedProjectName);

    try {
      const res = await fetch('http://localhost:2000/api/projects/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) alert('File uploaded successfully!');
      else alert('❌ File upload failed.');
    } catch (err) {
      console.error('❌ Upload error:', err);
    }
  };

  // Rename Project
  const handleRename = async () => {
    if (!newName.trim()) return;

    try {
      const res = await fetch(`http://localhost:2000/api/projects/rename`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldName: decodedProjectName,
          newName,
        }),
      });

      if (res.ok) {
        alert('✅ Project renamed!');
        navigate(`/projects/${encodeURIComponent(newName)}`);
      } else {
        alert('❌ Rename failed.');
      }
    } catch (err) {
      console.error('❌ Rename error:', err);
    }
  };

  // Delete Project
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`http://localhost:2000/api/projects/delete/${encodeURIComponent(decodedProjectName)}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('🗑️ Project deleted.');
        navigate('/projects');
      } else {
        alert('❌ Delete failed.');
      }
    } catch (err) {
      console.error('❌ Delete error:', err);
    }
  };

  // Share - For simplicity, generate a link
  const handleShare = () => {
    const shareLink = `${window.location.origin}/projects/${encodeURIComponent(decodedProjectName)}`;
    navigator.clipboard.writeText(shareLink);
    alert('📤 Shareable link copied to clipboard!');
  };

  return (
    <>
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

      <h1 className="header">{decodedProjectName}</h1>

      <div className="project-detail-wrapper">
        <ul>
          <li>
            📎 Attach relevant documents
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleFileUpload}>Upload</button>
          </li>

          <li>
            ✏️ Rename the project
            <input
              type="text"
              placeholder="New name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button onClick={handleRename}>Rename</button>
          </li>

          <li>
            🗑️ Delete the project
            <button onClick={handleDelete} style={{ color: 'red' }}>Delete</button>
          </li>

          <li>
            📤 Share the documents
            <button onClick={handleShare}>Copy Shareable Link</button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProjectDetail;
