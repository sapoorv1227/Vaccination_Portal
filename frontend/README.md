# School Vaccination Portal

## Overview
The School Vaccination Portal is a full-stack web application designed to manage and track vaccination drives in a school. It allows school coordinators to manage student records, schedule vaccination drives, update vaccination statuses, and generate reports.

## Features
- **Authentication**: Simulated login for school coordinators with hardcoded credentials.
- **Dashboard**: Displays key metrics such as total students, vaccinated students, and upcoming vaccination drives. Includes a logout button.
- **Student Management**: Add, edit, and view student details. Bulk upload functionality is supported via CSV.
- **Vaccination Drive Management**: Create and manage vaccination drives with validation to prevent scheduling conflicts. Edit functionality is available for upcoming drives, while completed drives are locked.
- **Generate Reports**: View vaccination reports with filtering, pagination, and CSV download functionality.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Styling**: CSS
- **API Communication**: Axios

## Setup Instructions

### Prerequisites
- Node.js and npm installed on your system.
- MongoDB installed and running locally or a connection string to a MongoDB Atlas cluster.

### Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add the following:
   ```env
   MONGO_URI=mongodb://localhost:27017/vaccination_portal
   PORT=5000
   ```
4. Start the backend server:
   ```bash
   node ../server.js
   ```

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

### Access the Application
- Open your browser and navigate to `http://localhost:3000` to access the frontend.
- The backend APIs are available at `http://localhost:5000`.

## API Endpoints

### Authentication
- **POST** `/api/auth/login`: Simulated login endpoint. Use the following credentials:
  - Username: `admin`
  - Password: `password123`

### Dashboard
- **GET** `/api/dashboard`: Fetch aggregate data for the dashboard.

### Students
- **GET** `/api/students`: Fetch all students.
- **POST** `/api/students`: Add a new student.
- **POST** `/api/students/bulk-upload`: Bulk upload students via CSV.

### Vaccination Drives
- **GET** `/api/vaccination-drives`: Fetch all vaccination drives.
- **POST** `/api/vaccination-drives`: Create a new vaccination drive.
- **PUT** `/api/vaccination-drives/:id`: Edit an existing vaccination drive.

### Reports
- **GET** `/api/reports`: Fetch vaccination reports.

## Folder Structure
```
server.js
backend/
  package.json
  controllers/
  middleware/
  models/
    Student.js
    VaccinationDrive.js
  routes/
    authRoutes.js
    studentRoutes.js
    vaccinationDriveRoutes.js
  utils/
frontend/
  package.json
  public/
    favicon.ico
    index.html
  src/
    App.js
    components/
      Dashboard.js
      Login.js
      StudentManagement.js
      VaccinationDriveManagement.js
      GenerateReports.js
```

## Demonstration
- Ensure both the backend and frontend servers are running.
- Use the application to manage students and vaccination drives.
- Test the login, logout, and report generation functionalities.

## Future Enhancements
- Add role-based access control.
- Implement bulk upload for vaccination drives.
- Add export functionality for reports in Excel and PDF formats.

## License
This project is licensed under the MIT License.
