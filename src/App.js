import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import PatientDetailPage from './pages/doctor/PatientDetailsPage';
import ProtectedRoute from './common/ProtectedRoute';
import { UserProvider } from './UserContext';
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
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;