import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';

function AddCondition() {
    const [patientId, setPatientId] = useState('');
    const [conditionDetails, setConditionDetails] = useState('');
    const [conditionDate, setConditionDate] = useState('');
    const [message, setMessage] = useState('');

    const handleAddCondition = async () => {
        try {
            await axiosInstance.post(`/api/conditions/patient/${patientId}`, {
                details: conditionDetails,
                conditionDate,
            });
            setMessage('Condition added successfully');
        } catch (error) {
            setMessage('Failed to add condition');
            console.error(error);
        }
    };

    return (
        <div className="form-container">
            <h2>Add Condition</h2>
            <input
                type="text"
                placeholder="Patient ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="input-field"
            />
            <input
                type="text"
                placeholder="Condition Details"
                value={conditionDetails}
                onChange={(e) => setConditionDetails(e.target.value)}
                className="input-field"
            />
            <input
                type="date"
                value={conditionDate}
                onChange={(e) => setConditionDate(e.target.value)}
                className="input-field"
            />
            <button onClick={handleAddCondition} className="button">Add Condition</button>
            <p>{message}</p>
        </div>
    );
}

export default AddCondition;
