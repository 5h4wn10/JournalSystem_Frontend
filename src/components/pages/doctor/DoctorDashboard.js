// src/components/DoctorDashboard.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosConfig';

function DoctorDashboard() {
    const [observations, setObservations] = useState([]);
    const [patientId, setPatientId] = useState('');
    const [details, setDetails] = useState('');
    const [observationDate, setObservationDate] = useState('');

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

    const addObservation = async () => {
        try {
            const response = await axiosInstance.post(`/api/observations/patient/${patientId}`, {
                details,
                observationDate,
            });
            setObservations([...observations, response.data]);
            setDetails('');
            setObservationDate('');
        } catch (error) {
            console.error('Error adding observation:', error);
        }
    };

    return (
        <div>
            <h2>Doctor Dashboard</h2>
            <h3>Observations</h3>
            <ul>
                {observations.map((obs) => (
                    <li key={obs.id}>{obs.details}</li>
                ))}
            </ul>
            <div>
                <input
                    type="text"
                    placeholder="Patient ID"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Observation Details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                />
                <input
                    type="date"
                    value={observationDate}
                    onChange={(e) => setObservationDate(e.target.value)}
                />
                <button onClick={addObservation}>Add Observation</button>
            </div>
        </div>
    );
}

export default DoctorDashboard;
