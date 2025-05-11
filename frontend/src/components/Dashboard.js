import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [data, setData] = useState({
    totalStudents: 0,
    vaccinatedStudents: 0,
    upcomingDrives: [],
  });

  useEffect(() => {
    // Fetch aggregate data from the backend
    axios.get('http://localhost:5000/api/dashboard')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Students: {data.totalStudents}</p>
      <p>Vaccinated Students: {data.vaccinatedStudents}</p>
      <h2>Upcoming Vaccination Drives</h2>
      {data.upcomingDrives.length > 0 ? (
        <ul>
          {data.upcomingDrives.map((drive, index) => (
            <li key={index}>{drive.vaccineName} on {new Date(drive.date).toLocaleDateString()}</li>
          ))}
        </ul>
      ) : (
        <p>No upcoming drives</p>
      )}
    </div>
  );
}

export default Dashboard;