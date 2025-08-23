import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const ProjectDetail = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const decodedProjectName = decodeURIComponent(projectName);

  const [expanded, setExpanded] = useState({
    client: false,
    meta: false,
    engagement: false,
    documentation: false,
  });

  // Editable sections state
  const [clientInfo, setClientInfo] = useState({
    name: "Example Company Ltd.",
    contact: "John Doe",
    address: "123 Main Street, Accra",
    email: "johndoe@example.com",
    phone: "+233 24 000 1111",
  });

  const [metaInfo, setMetaInfo] = useState({
    duration: "Jan 5, 2025 – Jan 20, 2025",
    team: "Alice, Michael, Ebenezer",
  });

  const [engagementInfo, setEngagementInfo] = useState({
    scope: "Financial compliance & internal controls",
    objectives: "Ensure accurate reporting, assess risk exposure",
    risks: "Fraud, regulatory non-compliance",
  });

  // Edit mode tracking
  const [editMode, setEditMode] = useState({
    client: false,
    meta: false,
    engagement: false,
  });

  // Documentation state
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);

  const toggleSection = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSave = (section) => {
    setEditMode((prev) => ({ ...prev, [section]: false }));
  };

  const handleFileUpload = () => {
    if (!file) return;
    const newDoc = { name: file.name, url: URL.createObjectURL(file) };
    setDocuments((prev) => [...prev, newDoc]);
    setFile(null);
  };

  const handleDeleteDoc = (index) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
    if (previewDoc && documents[index]?.name === previewDoc.name) {
      setPreviewDoc(null);
    }
  };

  return (
    <>
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

      <h1 className="header">{decodedProjectName}</h1>

      <div className="project-detail-wrapper">
        {/* Client Information */}
        <section>
          <h2 onClick={() => toggleSection("client")} className="collapsible-header">
            <span className={`arrow ${expanded.client ? "down" : ""}`}>▶</span> Client Information
          </h2>
          {expanded.client && (
            <div className="collapsible-content">
              {editMode.client ? (
                <>
                  <input
                    type="text"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                    placeholder="Client Name"
                  />
                  <input
                    type="text"
                    value={clientInfo.contact}
                    onChange={(e) => setClientInfo({ ...clientInfo, contact: e.target.value })}
                    placeholder="Contact Person"
                  />
                  <input
                    type="text"
                    value={clientInfo.address}
                    onChange={(e) => setClientInfo({ ...clientInfo, address: e.target.value })}
                    placeholder="Address"
                  />
                  <input
                    type="email"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    value={clientInfo.phone}
                    onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                    placeholder="Phone"
                  />
                  <button onClick={() => handleSave("client")}>Save</button>
                </>
              ) : (
                <>
                  <p><strong>Client Name:</strong> {clientInfo.name}</p>
                  <p><strong>Contact Person:</strong> {clientInfo.contact}</p>
                  <p><strong>Address:</strong> {clientInfo.address}</p>
                  <p><strong>Email:</strong> {clientInfo.email}</p>
                  <p><strong>Phone:</strong> {clientInfo.phone}</p>
                  <button onClick={() => setEditMode({ ...editMode, client: true })}>Edit</button>
                </>
              )}
            </div>
          )}
        </section>

        {/* Meta Information */}
        <section>
          <h2 onClick={() => toggleSection("meta")} className="collapsible-header">
            <span className={`arrow ${expanded.meta ? "down" : ""}`}>▶</span> Meta Information
          </h2>
          {expanded.meta && (
            <div className="collapsible-content">
              {editMode.meta ? (
                <>
                  <input
                    type="text"
                    value={metaInfo.duration}
                    onChange={(e) => setMetaInfo({ ...metaInfo, duration: e.target.value })}
                    placeholder="Audit Duration"
                  />
                  <input
                    type="text"
                    value={metaInfo.team}
                    onChange={(e) => setMetaInfo({ ...metaInfo, team: e.target.value })}
                    placeholder="Team Members"
                  />
                  <button onClick={() => handleSave("meta")}>Save</button>
                </>
              ) : (
                <>
                  <p><strong>Audit Duration:</strong> {metaInfo.duration}</p>
                  <p><strong>Audit Team:</strong> {metaInfo.team}</p>
                  <button onClick={() => setEditMode({ ...editMode, meta: true })}>Edit</button>
                </>
              )}
            </div>
          )}
        </section>

        {/* Audit Engagement */}
        <section>
          <h2 onClick={() => toggleSection("engagement")} className="collapsible-header">
            <span className={`arrow ${expanded.engagement ? "down" : ""}`}>▶</span> Audit Engagement
          </h2>
          {expanded.engagement && (
            <div className="collapsible-content">
              {editMode.engagement ? (
                <>
                  <input
                    type="text"
                    value={engagementInfo.scope}
                    onChange={(e) => setEngagementInfo({ ...engagementInfo, scope: e.target.value })}
                    placeholder="Scope"
                  />
                  <input
                    type="text"
                    value={engagementInfo.objectives}
                    onChange={(e) => setEngagementInfo({ ...engagementInfo, objectives: e.target.value })}
                    placeholder="Objectives"
                  />
                  <input
                    type="text"
                    value={engagementInfo.risks}
                    onChange={(e) => setEngagementInfo({ ...engagementInfo, risks: e.target.value })}
                    placeholder="Risks"
                  />
                  <button onClick={() => handleSave("engagement")}>Save</button>
                </>
              ) : (
                <>
                  <p><strong>Scope:</strong> {engagementInfo.scope}</p>
                  <p><strong>Objectives:</strong> {engagementInfo.objectives}</p>
                  <p><strong>Risks:</strong> {engagementInfo.risks}</p>
                  <button onClick={() => setEditMode({ ...editMode, engagement: true })}>Edit</button>
                </>
              )}
            </div>
          )}
        </section>

        {/* Documentation */}
        <section>
          <h2 onClick={() => toggleSection("documentation")} className="collapsible-header">
            <span className={`arrow ${expanded.documentation ? "down" : ""}`}>▶</span> Documentation
          </h2>
          {expanded.documentation && (
            <div className="collapsible-content">
              <ul className="documents-list">
                {documents.map((doc, index) => (
                  <li key={index}>
                    <span
                      onClick={() => setPreviewDoc(doc)}
                      style={{ cursor: "pointer", color: "#1a3a6b" }}
                    >
                      {doc.name}
                    </span>
                    <button
                      onClick={() => handleDeleteDoc(index)}
                      style={{ marginLeft: "10px", color: "red" }}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
              <div className="upload-section">
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <button onClick={handleFileUpload} className="rename-btn">Upload</button>
              </div>

              {/* File Preview */}
              {previewDoc && (
                <div className="preview-section">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4>Preview: {previewDoc.name}</h4>
                    <button
                      onClick={() => setPreviewDoc(null)}
                      style={{
                        background: "transparent",
                        border: "none",
                        fontSize: "1.2rem",
                        cursor: "pointer",
                        color: "#c00"
                      }}
                    >
                      ✖
                    </button>
                  </div>

                  {previewDoc.name.endsWith(".pdf") ? (
                    <embed src={previewDoc.url} type="application/pdf" width="100%" height="500px" />
                  ) : previewDoc.name.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                    <img src={previewDoc.url} alt={previewDoc.name} style={{ maxWidth: "100%", height: "auto" }} />
                  ) : (
                    <iframe src={previewDoc.url} width="100%" height="400px" title="preview"></iframe>
                  )}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default ProjectDetail;