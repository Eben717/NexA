import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LOGO_PRIMARY = '#1a3a6b';
const LOGO_SECONDARY = '#4a6fa5';
const LOGO_BG = '#f4f8fb';

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
    <div style={{
      padding: '20px',
      fontFamily: 'Segoe UI, Arial, sans-serif',
      backgroundColor: LOGO_BG,
      minHeight: '100vh',
      alignItems: 'center',
      marginLeft: 'auto',
    }}>
      {/* Header */}
      <h1 style={{
        borderBottom: `2px solid ${LOGO_PRIMARY}`,
        paddingBottom: '10px',
        color: LOGO_PRIMARY,
        fontWeight: 600
      }}>
        Reports
      </h1>

      {/* Circles */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '40px',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        {['Completed', 'In-Progress', 'Due', 'Reports List'].map((label) => (
          <div
            key={label}
            onClick={() => handleClick(label)}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${LOGO_PRIMARY} 60%, ${LOGO_SECONDARY} 100%)`,
              color: '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: 500,
              boxShadow: '0 4px 6px rgba(26, 58, 107, 0.10)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
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