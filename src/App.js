// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import DoctorDashboard from './components/pages/doctor/DoctorDashboard';
import StaffDashboard from './components/pages/staff/StaffDashboard';
import PatientDashboard from './components/pages/patient/PatientDashboard';
import ProtectedRoute from './common/ProtectedRoute';
import { UserProvider } from './UserContext';  // Importera UserProvider

function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/doctor/dashboard" element={<ProtectedRoute role="DOCTOR"><DoctorDashboard /></ProtectedRoute>} />
                    <Route path="/staff/dashboard" element={<ProtectedRoute role="STAFF"><StaffDashboard /></ProtectedRoute>} />
                    <Route path="/patient/dashboard" element={<ProtectedRoute role="PATIENT"><PatientDashboard /></ProtectedRoute>} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
