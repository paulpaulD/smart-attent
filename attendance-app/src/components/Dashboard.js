import React from 'react';
import './Dashboard.css'; // Ensure CSS is imported

const Dashboard = ({ onTakePhoto }) => {
  return (
    <div className="dashboard-container">
      <h2>Welcome! Select an action</h2>
      <button onClick={onTakePhoto}>Take Photo</button>
    </div>
  );
};

export default Dashboard;
