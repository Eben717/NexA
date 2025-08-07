import { useParams, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';

const ProjectDetail = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();

  const decodedProjectName = decodeURIComponent(projectName);
  const [newName, setNewName] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const notify = (msg) => alert(msg); // Replace with toast later

  const handleFileUpload = useCallback(async () => {
    if (!file) return notify('Please select a file to upload.');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectName', decodedProjectName);

    try {
      setLoading(true);
      const res = await fetch('http://localhost:2000/api/projects/upload', {
        method: 'POST',
        body: formData,
      });

      res.ok
        ? notify('✅ File uploaded successfully!')
        : notify('❌ File upload failed.');
    } catch (err) {
      console.error('Upload error:', err);
      notify('❌ An error occurred while uploading.');
    } finally {
      setLoading(false);
    }
  }, [file, decodedProjectName]);

  const handleRename = useCallback(async () => {
    if (!newName.trim()) return notify('New name cannot be empty.');

    try {
      setLoading(true);
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
        notify('✅ Project renamed!');
        navigate(`/projects/${encodeURIComponent(newName)}`);
      } else {
        notify('❌ Rename failed.');
      }
    } catch (err) {
      console.error('Rename error:', err);
      notify('❌ An error occurred while renaming.');
    } finally {
      setLoading(false);
    }
  }, [newName, decodedProjectName, navigate]);

  const handleDelete = useCallback(async () => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:2000/api/projects/delete/${encodeURIComponent(decodedProjectName)}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        notify('🗑️ Project deleted.');
        navigate('/projects');
      } else {
        notify('❌ Delete failed.');
      }
    } catch (err) {
      console.error('Delete error:', err);
      notify('❌ An error occurred while deleting.');
    } finally {
      setLoading(false);
    }
  }, [decodedProjectName, navigate]);

  const handleShare = useCallback(() => {
    const shareLink = `${window.location.origin}/projects/${encodeURIComponent(decodedProjectName)}`;
    navigator.clipboard.writeText(shareLink);
    notify('📤 Shareable link copied to clipboard!');
  }, [decodedProjectName]);

  return (
    <div className="project-detail-container max-w-2xl mx-auto px-4 py-6 bg-white shadow-lg rounded-lg">
      <button onClick={() => navigate(-1)} className="back-button mb-4">
        ← Back
      </button>

      <h1 className="header text-2xl font-bold text-gray-800 mb-6">{decodedProjectName}</h1>

      <div className="space-y-6">

        {/* Upload File */}
        <div className="action-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            📎 Upload Document
          </label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0])}
              className="block w-full text-sm text-gray-700"
            />
            <button
              onClick={handleFileUpload}
              disabled={loading}
              className="btn-primary"
            >
              Upload
            </button>
          </div>
        </div>

        {/* Rename Project */}
        <div className="action-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ✏️ Rename Project
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Enter new name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="input text-sm flex-1"
            />
            <button
              onClick={handleRename}
              disabled={loading}
              className="btn-secondary"
            >
              Rename
            </button>
          </div>
        </div>

        {/* Delete Project */}
        <div className="action-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🗑️ Delete Project
          </label>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="btn-danger w-full"
          >
            Delete Project
          </button>
        </div>

        {/* Share Project */}
        <div className="action-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            📤 Share Project
          </label>
          <button
            onClick={handleShare}
            className="btn-outline w-full"
          >
            Copy Shareable Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
