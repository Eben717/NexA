// src/components/ProjectDetail.js
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const API_BASE = "http://localhost:2000/api/project-detail"; // adjust if deployed

const ProjectDetail = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const decodedProjectName = decodeURIComponent(projectName);

  // Expand/collapse state
  const [expanded, setExpanded] = useState({
    client: false,
    meta: false,
    engagement: false,
    documentation: false,
  });

  // Data state
  const [projectData, setProjectData] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [file, setFile] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);

  // Load project detail on mount
  useEffect(() => {
    fetch(`${API_BASE}/${decodedProjectName}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => setProjectData(data))
      .catch(() => {
        // If not found, start with empty structure
        setProjectData({
          projectName: decodedProjectName,
          clientInfo: {},
          metaInfo: {},
          engagementInfo: {},
          documents: [],
        });
      });
  }, [decodedProjectName]);

  const toggleSection = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSave = async () => {
    if (!projectData) return;

    const res = await fetch(`${API_BASE}/${decodedProjectName}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData),
    });

    if (res.ok) {
      const updated = await res.json();
      setProjectData(updated);
      setEditMode({});
      alert("✅ Saved successfully!");
    } else {
      alert("❌ Failed to save");
    }
  };

  const handleFileUpload = () => {
    if (!file) return;
    const newDoc = { name: file.name, url: URL.createObjectURL(file) };

    setProjectData((prev) => ({
      ...prev,
      documents: [...(prev.documents || []), newDoc],
    }));
    setFile(null);
  };

  const handleDeleteDoc = (index) => {
    setProjectData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
    if (previewDoc && projectData.documents[index]?.name === previewDoc.name) {
      setPreviewDoc(null);
    }
  };

  if (!projectData) return <p>Loading...</p>;

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
            <span className={`arrow ${expanded.client ? "down" : ""}`}>▶</span>{" "}
            Client Information
          </h2>
          {expanded.client && (
            <div className="collapsible-content">
              <input
                type="text"
                value={projectData.clientInfo?.name || ""}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    clientInfo: { ...projectData.clientInfo, name: e.target.value },
                  })
                }
                placeholder="Client Name"
              />
              <input
                type="text"
                value={projectData.clientInfo?.contact || ""}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    clientInfo: { ...projectData.clientInfo, contact: e.target.value },
                  })
                }
                placeholder="Contact Person"
              />
              <input
                type="text"
                value={projectData.clientInfo?.address || ""}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    clientInfo: { ...projectData.clientInfo, address: e.target.value },
                  })
                }
                placeholder="Address"
              />
              <input
                type="email"
                value={projectData.clientInfo?.email || ""}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    clientInfo: { ...projectData.clientInfo, email: e.target.value },
                  })
                }
                placeholder="Email"
              />
              <input
                type="text"
                value={projectData.clientInfo?.phone || ""}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    clientInfo: { ...projectData.clientInfo, phone: e.target.value },
                  })
                }
                placeholder="Phone"
              />
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
              <input
                type="text"
                value={projectData.metaInfo?.duration || ""}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    metaInfo: { ...projectData.metaInfo, duration: e.target.value },
                  })
                }
                placeholder="Audit Duration"
              />
              <input
                type="text"
                value={projectData.metaInfo?.team || ""}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    metaInfo: { ...projectData.metaInfo, team: e.target.value },
                  })
                }
                placeholder="Team Members"
              />
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
              <input
                type="text"
                value={projectData.engagementInfo?.scope || ""}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    engagementInfo: { ...projectData.engagementInfo, scope: e.target.value },
                  })
                }
                placeholder="Scope"
              />
              <input
                type="text"
                value={projectData.engagementInfo?.objectives || ""}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    engagementInfo: {
                      ...projectData.engagementInfo,
                      objectives: e.target.value,
                    },
                  })
                }
                placeholder="Objectives"
              />
              <input
                type="text"
                value={projectData.engagementInfo?.risks || ""}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    engagementInfo: { ...projectData.engagementInfo, risks: e.target.value },
                  })
                }
                placeholder="Risks"
              />
            </div>
          )}
        </section>

        {/* Documentation */}
        <section>
          <h2 onClick={() => toggleSection("documentation")} className="collapsible-header">
            <span className={`arrow ${expanded.documentation ? "down" : ""}`}>▶</span>{" "}
            Documentation
          </h2>
          {expanded.documentation && (
            <div className="collapsible-content">
              <ul className="documents-list">
                {projectData.documents?.map((doc, index) => (
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

              {/* Preview */}
              {previewDoc && (
                <div className="preview-section">
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h4>Preview: {previewDoc.name}</h4>
                    <button onClick={() => setPreviewDoc(null)} style={{ color: "red" }}>
                      ✖
                    </button>
                  </div>

                  {previewDoc.name.match(/\.(pdf)$/i) ? (
                    <embed src={previewDoc.url} type="application/pdf" width="100%" height="500px" />
                  ) : previewDoc.name.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                    <img src={previewDoc.url} alt={previewDoc.name} style={{ maxWidth: "100%" }} />
                  ) : previewDoc.name.match(/\.(docx|doc|pptx|ppt|xlsx|xls)$/i) ? (
                    <iframe
                      src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                        previewDoc.url
                      )}`}
                      width="100%"
                      height="500px"
                      title="Office Preview"
                    ></iframe>
                  ) : (
                    <iframe src={previewDoc.url} width="100%" height="400px" title="preview"></iframe>
                  )}
                </div>
              )}
            </div>
          )}
        </section>

        <button onClick={handleSave} className="save-btn">
          💾 Save All
        </button>
      </div>
    </>
  );
};

export default ProjectDetail;
