// src/components/StaffDashboard.js
import React, { useState, useEffect, navigate} from 'react';
import axiosInstance from '../../axiosConfig';
import '../../styles/Dashboard.css';
function StaffDashboard() {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axiosInstance.get('/api/patients');
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };
        fetchPatients();
    }, []);

    const handleLogout = () => {
        // Rensa alla autentiseringsuppgifter och navigera till login
        axiosInstance.defaults.headers.common['Authorization'] = '';
        navigate('/login');
    };

    return (
        <div>
            <h2>Staff Dashboard</h2>
            <button onClick={handleLogout} className="button logout-button">Log out</button>
            <h3>Patient List</h3>
            <ul>
                {patients.map((patient) => (
                    <li key={patient.id}>{patient.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default StaffDashboard;
