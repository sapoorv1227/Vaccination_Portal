import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VaccinationDriveManagement() {
  const [drives, setDrives] = useState([]);
  const [newDrive, setNewDrive] = useState({ vaccineName: '', date: '', availableDoses: 0 });

  useEffect(() => {
    // Fetch vaccination drives from the backend
    axios.get('http://localhost:5000/api/vaccination-drives')
      .then((response) => {
        setDrives(response.data);
      })
      .catch((error) => {
        console.error('Error fetching vaccination drives:', error);
      });
  }, []);

  const handleAddDrive = () => {
    // Add a new vaccination drive
    axios.post('http://localhost:5000/api/vaccination-drives', newDrive)
      .then((response) => {
        setDrives([...drives, response.data]);
        setNewDrive({ vaccineName: '', date: '', availableDoses: 0 });
      })
      .catch((error) => {
        console.error('Error adding vaccination drive:', error);
      });
  };

  const handleEditDrive = (id, updatedDrive) => {
    axios.put(`http://localhost:5000/api/vaccination-drives/${id}`, updatedDrive)
      .then((response) => {
        setDrives(drives.map((drive) => (drive._id === id ? response.data : drive)));
        alert('Drive updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating drive:', error);
        alert('Failed to update drive.');
      });
  };

  return (
    <div>
      <h1>Vaccination Drive Management</h1>
      <h2>Create New Drive</h2>
      <input
        type="text"
        placeholder="Vaccine Name"
        value={newDrive.vaccineName}
        onChange={(e) => setNewDrive({ ...newDrive, vaccineName: e.target.value })}
      />
      <input
        type="date"
        value={newDrive.date}
        onChange={(e) => setNewDrive({ ...newDrive, date: e.target.value })}
      />
      <input
        type="number"
        placeholder="Available Doses"
        value={newDrive.availableDoses}
        onChange={(e) => setNewDrive({ ...newDrive, availableDoses: e.target.value })}
      />
      <button onClick={handleAddDrive}>Create Drive</button>

      <h2>Vaccination Drives</h2>
      <ul>
        {drives.map((drive) => (
          <li key={drive._id}>
            {drive.vaccineName} - {new Date(drive.date).toLocaleDateString()} - {drive.availableDoses} doses
            {new Date(drive.date) > new Date() && (
              <button onClick={() => handleEditDrive(drive._id, { ...drive, availableDoses: drive.availableDoses + 10 })}>
                Edit
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VaccinationDriveManagement;