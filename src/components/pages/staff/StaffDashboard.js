// src/components/StaffDashboard.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosConfig';

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

    return (
        <div>
            <h2>Staff Dashboard</h2>
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
