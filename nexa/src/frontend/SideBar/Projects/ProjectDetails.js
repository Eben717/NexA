import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ProjectDetail = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const decodedProjectName = decodeURIComponent(projectName);

  const [newName, setNewName] = useState('');
  const [file, setFile] = useState(null);

  // 📎 Attach Document Handler
  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('document', file);

    try {
      const res = await fetch(`http://localhost:2000/api/projects/${decodedProjectName}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert('📎 Document uploaded successfully!');
      } else {
        alert('❌ Failed to upload document.');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Error uploading file.');
    }
  };

  // ✏️ Rename Project Handler
  const handleRename = async () => {
    if (!newName.trim()) return;

    try {
      const res = await fetch(`http://localhost:2000/api/projects/${decodedProjectName}/rename`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newName }),
      });

      if (res.ok) {
        alert('✏️ Project renamed successfully!');
        navigate(`/projects/${encodeURIComponent(newName)}`);
      } else {
        alert('❌ Failed to rename project.');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Error renaming project.');
    }
  };

  // 🗑️ Delete Project Handler
  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${decodedProjectName}"?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:2000/api/projects/${decodedProjectName}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('🗑️ Project deleted successfully!');
        navigate('/projects');
      } else {
        alert('❌ Failed to delete project.');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Error deleting project.');
    }
  };

  // 📤 Share Documents (Copy URL to clipboard)
  const handleShare = () => {
    const shareLink = `${window.location.origin}/projects/${encodeURIComponent(decodedProjectName)}`;
    navigator.clipboard.writeText(shareLink);
    alert('📤 Share link copied to clipboard!');
  };

  return (
    <>
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

      <h1 className="header">{decodedProjectName}</h1>

      <div className="project-detail-wrapper">
        <p>Here you can:</p>
        <ul>
          <li>
            📎 Attach relevant documents:
            <br />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleFileUpload}>Upload</button>
          </li>

          <li>
            ✏️ Rename the project:
            <br />
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter new name"
            />
            <button onClick={handleRename}>Rename</button>
          </li>

          <li>
            🗑️ Delete the project:
            <br />
            <button onClick={handleDelete} style={{ color: 'red' }}>
              Delete Project
            </button>
          </li>

          <li>
            📤 Share the documents:
            <br />
            <button onClick={handleShare}>Copy Share Link</button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProjectDetail;
