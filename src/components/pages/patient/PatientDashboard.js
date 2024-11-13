// src/components/PatientDashboard.js
import React, { useState, useEffect, handleLogout, navigate} from 'react';
import axiosInstance from '../../../axiosConfig';
import '../../styles/Dashboard.css';
function PatientDashboard() {
    const [observations, setObservations] = useState([]);

    useEffect(() => {
        const fetchObservations = async () => {
            try {
                const response = await axiosInstance.get('/api/observations');
                setObservations(response.data);
            } catch (error) {
                console.error('Error fetching observations:', error);
            }
        };
        fetchObservations();
    }, []);

    const handleLogout = () => {
        // Rensa alla autentiseringsuppgifter och navigera till login
        axiosInstance.defaults.headers.common['Authorization'] = '';
        navigate('/login');
    };

    return (
        <div>
            <h2>Patient Dashboard</h2>
            <button onClick={handleLogout} className="button logout-button">Log out</button>
            <h3>Your Observations</h3>
            <ul>
                {observations.map((obs) => (
                    <li key={obs.id}>{obs.details}</li>
                ))}
            </ul>
        </div>
    );
}

export default PatientDashboard;
