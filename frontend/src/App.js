import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import StudentManagement from './components/StudentManagement';
import VaccinationDriveManagement from './components/VaccinationDriveManagement';
import Login from './components/Login';
import GenerateReports from './components/GenerateReports';
import './App.css';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/students"
          element={
            <PrivateRoute>
              <StudentManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/vaccination-drives"
          element={
            <PrivateRoute>
              <VaccinationDriveManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/generate-reports"
          element={
            <PrivateRoute>
              <GenerateReports />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
