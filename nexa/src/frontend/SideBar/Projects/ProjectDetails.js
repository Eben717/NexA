import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProjectDetail = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const decodedProjectName = decodeURIComponent(projectName);

  const [projectData, setProjectData] = useState(null);

  // Fetch client details from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:2000/api/projects/${decodedProjectName}`);
        const data = await res.json();
        setProjectData(data);
      } catch (err) {
        console.error("Error fetching project details:", err);
      }
    };
    fetchData();
  }, [decodedProjectName]);

  if (!projectData) return <p>Loading client details...</p>;

  return (
    <div className="project-detail-wrapper">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>
      <h1 className="header">{decodedProjectName}</h1>

      {/* GENERAL INFO */}
      <section>
        <h2>Client Information</h2>
        <p><b>Company:</b> {projectData.companyName}</p>
        <p><b>Contact:</b> {projectData.contactPerson}</p>
        <p><b>Scope:</b> {projectData.certificationScope.join(", ")}</p>
        <p><b>Status:</b> {projectData.status}</p>
      </section>

      {/* AUDIT INFO */}
      <section>
        <h2>Audit Details</h2>
        <ul>
          {projectData.audits.map((audit, idx) => (
            <li key={idx}>
              {audit.type} – {audit.date} – {audit.auditor} – {audit.status}
            </li>
          ))}
        </ul>
      </section>

      {/* DOCUMENTS */}
      <section>
        <h2>Documents</h2>
        <ul>
          {projectData.documents.map((doc, idx) => (
            <li key={idx}>
              <a href={doc.url} target="_blank" rel="noreferrer">{doc.name}</a>
            </li>
          ))}
        </ul>
      </section>

      {/* CHECKLISTS */}
      <section>
        <h2>Compliance Checklists</h2>
        {projectData.checklists.map((checklist, idx) => (
          <div key={idx}>
            <h3>{checklist.standard}</h3>
            <ul>
              {checklist.items.map((item, i) => (
                <li key={i}>
                  ✅ {item.requirement} – {item.status}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ProjectDetail;
