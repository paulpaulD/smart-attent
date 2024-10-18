// src/App.js
import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TakePhoto from './components/TakePhoto';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [attendance, setAttendance] = useState(null);

  const handleLogin = (status) => {
    setLoggedIn(status);
  };

  const handleTakePhoto = () => {
    setAttendance('takingPhoto');
  };

  const handleMarkAttendance = (imageSrc, isPresent) => {
    if (isPresent) {
      alert('You are marked present!');
      // Optionally, send imageSrc to the backend
    } else {
      alert('You are not on the company campus!');
    }
    setAttendance(null);
  };

  return (
    <div>
      {!loggedIn && <Login onLogin={handleLogin} />}
      {loggedIn && !attendance && <Dashboard onTakePhoto={handleTakePhoto} />}
      {attendance === 'takingPhoto' && (
        <TakePhoto onMarkAttendance={handleMarkAttendance} />
      )}
    </div>
  );
};

export default App;
