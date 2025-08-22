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

  const toggleSection = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
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
              <p><strong>Client Name:</strong> Example Company Ltd.</p>
              <p><strong>Contact Person:</strong> John Doe</p>
              <p><strong>Address:</strong> 123 Main Street, Accra</p>
              <p><strong>Email:</strong> johndoe@example.com</p>
              <p><strong>Phone:</strong> +233 24 000 1111</p>
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
              <p><strong>Audit Duration:</strong> Jan 5, 2025 – Jan 20, 2025</p>
              <p><strong>Audit Team:</strong> Alice, Michael, Ebenezer</p>
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
              <p><strong>Scope:</strong> Financial compliance & internal controls</p>
              <p><strong>Objectives:</strong> Ensure accurate reporting, assess risk exposure</p>
              <p><strong>Risks:</strong> Fraud, regulatory non-compliance</p>
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
                <li><a href="#">Audit Plan.pdf</a></li>
                <li><a href="#">Risk Assessment.xlsx</a></li>
                <li><a href="#">Evidence_Photos.zip</a></li>
              </ul>
              <div className="upload-section">
                <input type="file" />
                <button className="rename-btn">Upload</button>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default ProjectDetail;
