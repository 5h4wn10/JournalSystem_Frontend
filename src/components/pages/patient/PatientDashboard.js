// src/components/PatientDashboard.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosConfig';

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

    return (
        <div>
            <h2>Patient Dashboard</h2>
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
