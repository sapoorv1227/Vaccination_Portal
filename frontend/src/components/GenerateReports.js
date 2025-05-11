import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';

function GenerateReports() {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    // Fetch reports from the backend
    axios.get('http://localhost:5000/api/reports')
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => {
        console.error('Error fetching reports:', error);
      });
  }, []);

  const filteredReports = reports.filter((report) =>
    report.vaccineName.toLowerCase().includes(filter.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Generate Reports</h1>
      <input
        type="text"
        placeholder="Filter by vaccine name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Vaccination Status</th>
            <th>Date of Vaccination</th>
            <th>Vaccine Name</th>
          </tr>
        </thead>
        <tbody>
          {currentReports.map((report, index) => (
            <tr key={index}>
              <td>{report.studentName}</td>
              <td>{report.vaccinationStatus ? 'Vaccinated' : 'Not Vaccinated'}</td>
              <td>{new Date(report.date).toLocaleDateString()}</td>
              <td>{report.vaccineName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from({ length: Math.ceil(filteredReports.length / itemsPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      <CSVLink data={filteredReports} filename="vaccination_reports.csv">
        Download CSV
      </CSVLink>
    </div>
  );
}

export default GenerateReports;