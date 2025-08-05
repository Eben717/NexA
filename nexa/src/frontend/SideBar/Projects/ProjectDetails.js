import { useParams, useNavigate } from 'react-router-dom';

const ProjectDetail = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

      <h1 className="header">{decodeURIComponent(projectName)}</h1>

      <div className="project-detail-wrapper">
        <p>Here you can:</p>
        <ul>
          <li>📎 Attach relevant documents</li>
          <li>✏️ Rename the project</li>
          <li>🗑️ Delete the project</li>
          <li>📤 Share the documents</li>
        </ul>

        {/* Add your actual file upload, delete, rename, and share logic here */}
      </div>
    </>
  );
};

export default ProjectDetail;
