// src/components/DoctorDashboard.js
import React, { useState, useEffect, navigate} from 'react';
import axiosInstance from '../../../axiosConfig';
import '../../styles/Dashboard.css';

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

    const handleLogout = () => {
        // Rensa alla autentiseringsuppgifter och navigera till login
        axiosInstance.defaults.headers.common['Authorization'] = '';
        navigate('/login');
    };
    return (
        <div className="container">
            <h2>Doctor Dashboard</h2>
            <button onClick={handleLogout} className="button logout-button">Log out</button>
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
                    className="input"
                />
                <input
                    type="text"
                    placeholder="Observation Details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="input"
                />
                <input
                    type="date"
                    value={observationDate}
                    onChange={(e) => setObservationDate(e.target.value)}
                    className="input"
                />
                <button onClick={addObservation} className="button">Add Observation</button>
            </div>
        </div>
    );
}

export default DoctorDashboard;
