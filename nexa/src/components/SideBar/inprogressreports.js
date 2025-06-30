import React from 'react';
import { useNavigate } from 'react-router-dom';

const InprogressReports = ({ reports }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f6f9',
        minHeight: '100vh',
        width: '79.2%',
        marginLeft: 'auto',
        transform: 'translateY(-94%)',
      }}
    >
      <button
        onClick={() => navigate(-1)} // 👈 Go back one step in history
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        ← Back
      </button>

       <h1 style={{ clear: 'both', borderBottom: '1px solid #007BFF', paddingBottom: '5px', color: '#333' }}>
        Inprogress Reports
      </h1>

      <ul>
        {reports?.map((report, index) => (
          <li key={index}>
            {Object.entries(report).map(([key, value]) => (
              <div key={key}>
                <strong>{key}:</strong> {value}
              </div>
            ))}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InprogressReports;
