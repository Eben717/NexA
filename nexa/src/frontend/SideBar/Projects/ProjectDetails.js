// src/components/ProjectDetail.js
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProjectDetail = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();

  const decodedProjectName = decodeURIComponent(projectName);

  // States for each section
  const [clientInfo, setClientInfo] = useState({});
  const [metaInfo, setMetaInfo] = useState({});
  const [engagementDetails, setEngagementDetails] = useState({});
  const [documents, setDocuments] = useState([]);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch project details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `http://localhost:2000/api/projects/${encodeURIComponent(
            decodedProjectName
          )}`
        );
        if (res.ok) {
          const data = await res.json();

          setClientInfo(data.clientInfo || {});
          setMetaInfo(data.metaInfo || {});
          setEngagementDetails(data.engagementDetails || {});
          setDocuments(data.documents || []);
        } else {
          console.error("❌ Failed to fetch project details.");
        }
      } catch (err) {
        console.error("❌ Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [decodedProjectName]);

  // ✅ Upload new document
  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("projectName", decodedProjectName);

    try {
      const res = await fetch("http://localhost:2000/api/projects/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("✅ File uploaded successfully!");
        const updated = await res.json();
        setDocuments(updated.documents || []);
        setFile(null);
      } else {
        alert("❌ File upload failed.");
      }
    } catch (err) {
      console.error("❌ Upload error:", err);
    }
  };

  return (
    <div className="project-detail-wrapper">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

      <h1 className="header">{decodedProjectName}</h1>

      {loading ? (
        <p>Loading project details...</p>
      ) : (
        <>
          {/* 1. Client Information */}
          <section>
            <h2>👤 Client Information</h2>
            <p><strong>Name:</strong> {clientInfo.name}</p>
            <p><strong>Contact Person:</strong> {clientInfo.contactPerson}</p>
            <p><strong>Address:</strong> {clientInfo.address}</p>
            <p><strong>Email:</strong> {clientInfo.email}</p>
            <p><strong>Phone:</strong> {clientInfo.phone}</p>
          </section>

          {/* 2. Meta Information */}
          <section>
            <h2>📊 Meta Information</h2>
            <p><strong>Audit Duration:</strong> {metaInfo.duration}</p>
            <p><strong>Audit Team:</strong> {metaInfo.teamMembers?.join(", ")}</p>
          </section>

          {/* 3. Engagement Details */}
          <section>
            <h2>📑 Audit Engagement Details</h2>
            <p><strong>Scope:</strong> {engagementDetails.scope}</p>
            <p><strong>Objectives:</strong> {engagementDetails.objectives}</p>
            <p><strong>Risks:</strong> {engagementDetails.risks}</p>
          </section>

          {/* 4. Documentation */}
          <section>
            <h2>📂 Documentation</h2>
            {documents.length > 0 ? (
              <ul>
                {documents.map((doc, idx) => (
                  <li key={idx}>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                      {doc.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No documents uploaded yet.</p>
            )}

            <div className="upload-section">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <button onClick={handleFileUpload}>Upload Document</button>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ProjectDetail;
