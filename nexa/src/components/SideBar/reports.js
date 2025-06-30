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
      title = 'Audits Not Completed';
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
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh', width: '79.2%', alignItems: 'center', marginLeft: 'auto', transform: 'translateY(-94%)' }}>
            {/* Header */}
            <h1 style={{ borderBottom: '1px solid #007BFF', paddingBottom: '5px', color: '#333' }}>Reports</h1>
            
            {/* Circles */}
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px', flexWrap: 'wrap', gap: '20px' }}>
                {['Completed', 'In-Progress', 'Due', 'Reports List'].map((label) => (
                    <div
                        key={label}
                        onClick={() => handleClick(label)}
                        style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            textAlign: 'center',
                            fontSize: '14px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                        }}
                    >
                        {label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reports;