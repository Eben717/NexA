import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReportsList = ({ reports }) => {
  const navigate = useNavigate();

  return (
    <div className='wrapper'>
    <div className='container'>
      <button
        onClick={() => navigate(-1)} // 👈 Go back one step in history
        className='back-button'
      >
        ← Back
      </button>

       <h1 className='header'>
        Reports List
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
    </div>
  );
};

export default ReportsList;
