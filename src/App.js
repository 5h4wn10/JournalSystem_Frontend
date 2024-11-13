import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import DoctorDashboard from './components/pages/doctor/DoctorDashboard';
import PatientDashboard from './components/pages/patient/PatientDashboard';
import StaffDashboard from './components/pages/staff/StaffDashboard';
import ProtectedRoute from './common/ProtectedRoute';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/doctor/dashboard"
                    element={<ProtectedRoute role="DOCTOR"><DoctorDashboard /></ProtectedRoute>}
                />
                <Route
                    path="/patient/dashboard"
                    element={<ProtectedRoute role="PATIENT"><PatientDashboard /></ProtectedRoute>}
                />
                <Route
                    path="/staff/dashboard"
                    element={<ProtectedRoute role="STAFF"><StaffDashboard /></ProtectedRoute>}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;