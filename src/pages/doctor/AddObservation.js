import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';

function AddObservation() {
    const [patientId, setPatientId] = useState('');
    const [details, setDetails] = useState('');
    const [observationDate, setObservationDate] = useState('');
    const [message, setMessage] = useState('');

    const handleAddObservation = async () => {
        try {
            await axiosInstance.post(`/api/observations/patient/${patientId}`, {
                details,
                observationDate,
            });
            setMessage('Observation added successfully');
        } catch (error) {
            setMessage('Failed to add observation');
            console.error(error);
        }
    };

    return (
        <div className="form-container">
            <h2>Add Observation</h2>
            <input
                type="text"
                placeholder="Patient ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="input-field"
            />
            <input
                type="text"
                placeholder="Observation Details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="input-field"
            />
            <input
                type="date"
                value={observationDate}
                onChange={(e) => setObservationDate(e.target.value)}
                className="input-field"
            />
            <button onClick={handleAddObservation} className="button">Add Observation</button>
            <p>{message}</p>
        </div>
    );
}

export default AddObservation;
