import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import Messages from './pages/Messages';
import StaffDashboard from './pages/staff/StaffDashboard';
import PatientDetailPage from './pages/doctor/PatientDetailsPage';
import ProtectedRoute from './common/ProtectedRoute';
import { UserProvider } from './UserContext';
import PatientDashboard from './pages/patient/PatientDashboard';
function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/doctor/dashboard"
                        element={
                            <ProtectedRoute role="DOCTOR">
                                <DoctorDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/doctor/patient/:patientId"
                        element={
                            <ProtectedRoute role="DOCTOR">
                                <PatientDetailPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/messages" element={<Messages />} />
                    <Route
                        path="/staff/dashboard"
                        element={
                            <ProtectedRoute role="STAFF">
                                <StaffDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/patient/dashboard"
                        element={
                            <ProtectedRoute role="PATIENT">
                                <PatientDashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;