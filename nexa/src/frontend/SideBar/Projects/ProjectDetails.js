// src/components/ProjectDetail.js
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const API_BASE = "http://localhost:2000/api/project-detail";

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

  const [projectData, setProjectData] = useState(null);
  const [editMode, setEditMode] = useState({
    client: true,
    meta: true,
    engagement: true,
  });

  const [file, setFile] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);

  // load project detail
  useEffect(() => {
    fetch(`${API_BASE}/${decodedProjectName}`)
      .then((res) => res.json())
      .then((data) =>
        setProjectData(
          data || {
            projectName: decodedProjectName,
            clientInfo: {},
            metaInfo: {},
            engagementInfo: {},
            documents: [],
          }
        )
      )
      .catch(() =>
        setProjectData({
          projectName: decodedProjectName,
          clientInfo: {},
          metaInfo: {},
          engagementInfo: {},
          documents: [],
        })
      );
  }, [decodedProjectName]);

  const toggleSection = (section) =>
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));

  const toggleEdit = (section) =>
    setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));

  const handleSave = async () => {
    const res = await fetch(`${API_BASE}/${decodedProjectName}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData),
    });

    if (res.ok) {
      const updated = await res.json();
      setProjectData(updated);
      alert("✅ Saved successfully!");
    } else {
      alert("❌ Save failed");
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
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>
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
                    placeholder="Client Name"
                    value={projectData.clientInfo?.name || ""}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        clientInfo: { ...projectData.clientInfo, name: e.target.value },
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Contact Person"
                    value={projectData.clientInfo?.contact || ""}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        clientInfo: { ...projectData.clientInfo, contact: e.target.value },
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={projectData.clientInfo?.address || ""}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        clientInfo: { ...projectData.clientInfo, address: e.target.value },
                      })
                    }
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={projectData.clientInfo?.email || ""}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        clientInfo: { ...projectData.clientInfo, email: e.target.value },
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    value={projectData.clientInfo?.phone || ""}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        clientInfo: { ...projectData.clientInfo, phone: e.target.value },
                      })
                    }
                  />
                  <button onClick={() => toggleEdit("client")} className="rename-btn">Save</button>
                </>
              ) : (
                <ul>
                  <li><b>Name:</b> {projectData.clientInfo?.name}</li>
                  <li><b>Contact:</b> {projectData.clientInfo?.contact}</li>
                  <li><b>Address:</b> {projectData.clientInfo?.address}</li>
                  <li><b>Email:</b> {projectData.clientInfo?.email}</li>
                  <li><b>Phone:</b> {projectData.clientInfo?.phone}</li>
                  <button onClick={() => toggleEdit("client")} className="rename-btn">Edit</button>
                </ul>
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
                    placeholder="Audit Duration"
                    value={projectData.metaInfo?.duration || ""}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        metaInfo: { ...projectData.metaInfo, duration: e.target.value },
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Team Members"
                    value={projectData.metaInfo?.team || ""}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        metaInfo: { ...projectData.metaInfo, team: e.target.value },
                      })
                    }
                  />
                  <button onClick={() => toggleEdit("meta")} className="rename-btn">Save</button>
                </>
              ) : (
                <ul>
                  <li><b>Duration:</b> {projectData.metaInfo?.duration}</li>
                  <li><b>Team:</b> {projectData.metaInfo?.team}</li>
                  <button onClick={() => toggleEdit("meta")} className="rename-btn">Edit</button>
                </ul>
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
                    placeholder="Scope"
                    value={projectData.engagementInfo?.scope || ""}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        engagementInfo: { ...projectData.engagementInfo, scope: e.target.value },
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Objectives"
                    value={projectData.engagementInfo?.objectives || ""}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        engagementInfo: { ...projectData.engagementInfo, objectives: e.target.value },
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Risks"
                    value={projectData.engagementInfo?.risks || ""}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        engagementInfo: { ...projectData.engagementInfo, risks: e.target.value },
                      })
                    }
                  />
                  <button onClick={() => toggleEdit("engagement")} className="rename-btn">Save</button>
                </>
              ) : (
                <ul>
                  <li><b>Scope:</b> {projectData.engagementInfo?.scope}</li>
                  <li><b>Objectives:</b> {projectData.engagementInfo?.objectives}</li>
                  <li><b>Risks:</b> {projectData.engagementInfo?.risks}</li>
                  <button onClick={() => toggleEdit("engagement")} className="rename-btn">Edit</button>
                </ul>
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
                {projectData.documents?.map((doc, index) => (
                  <li key={index}>
                    <span
                      onClick={() => setPreviewDoc(doc)}
                      style={{ cursor: "pointer", color: "#1a3a6b" }}
                    >
                      {doc.name}
                    </span>
                    <button onClick={() => handleDeleteDoc(index)} style={{ marginLeft: "10px", color: "red" }}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
              <div className="upload-section">
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <button onClick={handleFileUpload} className="rename-btn">Upload</button>
              </div>

              {previewDoc && (
                <div className="preview-section">
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h4>Preview: {previewDoc.name}</h4>
                    <button onClick={() => setPreviewDoc(null)} style={{ color: "red" }}>✖</button>
                  </div>
                  {previewDoc.name.match(/\.(pdf)$/i) ? (
                    <embed src={previewDoc.url} type="application/pdf" width="100%" height="500px" />
                  ) : previewDoc.name.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                    <img src={previewDoc.url} alt={previewDoc.name} style={{ maxWidth: "100%" }} />
                  ) : (
                    <iframe src={previewDoc.url} width="100%" height="400px" title="preview"></iframe>
                  )}
                </div>
              )}
            </div>
          )}
        </section>

        <button onClick={handleSave} className="save-btn">💾 Save All</button>
      </div>
    </>
  );
};

export default ProjectDetail;
