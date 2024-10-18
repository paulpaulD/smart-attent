import React, { useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import './TakePhoto.css'; // Ensure CSS is imported

const TakePhoto = ({ onMarkAttendance }) => {
    const [location, setLocation] = useState(null);
    const webcamRef = React.useRef(null);
  
    const capture = useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          console.log("Location retrieved:", { latitude, longitude }); // Debugging log
  
          // ... (rest of your code for marking attendance)
        },
        (error) => {
          console.log("Geolocation error:", error); // Log the error
          alert("Unable to retrieve your location. Please ensure location services are enabled.");
        }
      );
    }, [webcamRef]);
  
    return (
      <div className="take-photo-container">
        <h2>Take Photo</h2>
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        <button onClick={capture}>Capture Photo</button>
        {location && (
          <div className="location-info">
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
          </div>
        )}
      </div>
    );
  };
  
  

export default TakePhoto;
