import React from 'react';
import { useNavigate } from 'react-router-dom';

const DueReports = ({ reports }) => {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate(-1)} // 👈 Go back one step in history
        className='back-button'
      >
        ← Back
      </button>

      <h1 className='header'>
        Due Reports
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
    </>
  );
};

export default DueReports;
