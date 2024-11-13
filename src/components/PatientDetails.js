// src/components/PatientDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PatientDetails({ patientId }) {
    const [patient, setPatient] = useState(null);
    const [observation, setObservation] = useState('');
    const [condition, setCondition] = useState('');

    useEffect(() => {
        // Fetch patient data by ID
        axios.get(`/api/patients/${patientId}`)
            .then(response => setPatient(response.data))
            .catch(error => console.error(error));
    }, [patientId]);

    const addObservation = () => {
        axios.post(`/api/observations/patient/${patientId}`, { details: observation })
            .then(() => {
                setObservation('');
                alert('Observation added successfully!');
            })
            .catch(error => console.error(error));
    };

    const addCondition = () => {
        axios.post(`/api/conditions/patient/${patientId}`, { details: condition })
            .then(() => {
                setCondition('');
                alert('Condition added successfully!');
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Patient Details</h2>
            {patient && (
                <div>
                    <h3>{patient.fullName}</h3>
                    <div>
                        <input
                            type="text"
                            value={observation}
                            onChange={(e) => setObservation(e.target.value)}
                            placeholder="New Observation"
                        />
                        <button onClick={addObservation}>Add Observation</button>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                            placeholder="New Condition"
                        />
                        <button onClick={addCondition}>Add Condition</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PatientDetails;
