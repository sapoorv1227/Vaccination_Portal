import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', class: '' });

  useEffect(() => {
    // Fetch students from the backend
    axios.get('http://localhost:5000/api/students')
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
  }, []);

  const handleAddStudent = () => {
    // Add a new student
    axios.post('http://localhost:5000/api/students', newStudent)
      .then((response) => {
        setStudents([...students, response.data]);
        setNewStudent({ name: '', class: '' });
      })
      .catch((error) => {
        console.error('Error adding student:', error);
      });
  };

  const handleBulkUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          axios.post('http://localhost:5000/api/students/bulk-upload', results.data)
            .then((response) => {
              setStudents([...students, ...response.data]);
              alert('Bulk upload successful!');
            })
            .catch((error) => {
              console.error('Error during bulk upload:', error);
              alert('Bulk upload failed.');
            });
        },
      });
    }
  };

  return (
    <div>
      <h1>Student Management</h1>
      <h2>Add New Student</h2>
      <input
        type="text"
        placeholder="Name"
        value={newStudent.name}
        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Class"
        value={newStudent.class}
        onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
      />
      <button onClick={handleAddStudent}>Add Student</button>

      <h2>Bulk Upload Students</h2>
      <input type="file" accept=".csv" onChange={handleBulkUpload} />

      <h2>Student List</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>{student.name} - Class {student.class}</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentManagement;