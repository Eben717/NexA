import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Reports = () => {
  const [reportsList, setReportsList] = useState([]);
  const [sectionTitle, setSectionTitle] = useState('');

  const navigate = useNavigate();

  const handleClick = async (label) => {
    if (label === 'Reports List') {
      navigate('/reports-list');
      return;
    }
    if (label === 'Completed') {
      navigate('/completed-reports');
      return;
    }
    if (label === 'In-Progress') {
      navigate('/in-progress-reports');
      return;
    }
    if (label === 'Due') {
      navigate('/due-reports');
      return;
    }

    let endpoint = '';
    let title = '';

    switch (label) {
      case 'Completed':
        endpoint = 'completed';
        title = 'Reports Completed';
        break;
      case 'In-Progress':
        endpoint = 'in-progress';
        title = 'Reports In Progress';
        break;
      case 'Due':
        endpoint = 'not-completed';
        title = 'Reports Not Completed';
        break;
      default:
        return;
    }

    try {
      const response = await fetch(`http://localhost:2000/api/projects/${endpoint}`);
      const data = await response.json();
      const key = Object.keys(data)[0];
      setReportsList(data[key] || []);
      setSectionTitle(title);
    } catch (error) {
      console.error('❌ Error fetching data:', error);
    }
  };

  return (
    <div className='container'>
      {/* Header */}
      <h1 className='header'>
        Reports
      </h1>

      {/* Circles */}
      <div className='circles'>
        {['Completed', 'In-Progress', 'Due', 'Reports List'].map((label) => (
          <div
            key={label}
            onClick={() => handleClick(label)}
            className='circles2'
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 6px 10px rgba(26, 58, 107, 0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(26, 58, 107, 0.10)';
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Display Result List */}
      {reportsList.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h2>{sectionTitle}</h2>
          <ul>
            {reportsList.map((report, index) => (
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
      )}
    </div>
  );
};

export default Reports;