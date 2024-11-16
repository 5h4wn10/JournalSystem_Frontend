// src/pages/patient/PatientDashboard.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';
import '../../styles/PatientDashboard.css';
import NavBar from '../../common/NavBar';

function PatientDashboard() {
    const [patient, setPatient] = useState(null);
    const [observations, setObservations] = useState([]);
    const [conditions, setConditions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                // Fetch patient details
                const patientResponse = await axiosInstance.get(`/api/patients/me`);
                setPatient(patientResponse.data);

                // Fetch observations specific to the patient
                const observationResponse = await axiosInstance.get(`/api/observations/patient/${patientResponse.data.id}`);
                setObservations(observationResponse.data);

                // Fetch conditions specific to the patient
                const conditionResponse = await axiosInstance.get(`/api/conditions/patient/${patientResponse.data.id}`);
                setConditions(conditionResponse.data);
            } catch (error) {
                console.error('Error fetching patient data:', error);
                setError('Could not load all patient data');
            }
        };

        fetchPatientData();
    }, []);

    return (
        <div className="patient-dashboard-container">
            <NavBar /> {/* Add NavBar with just Logout button */} 
            <div className="patient-dashboard-container">
        {/* Existing dashboard content */}
            <button onClick={() => navigate('/patient/send-message')} className="button-send-message">
                Send a Message
            </button>
        </div>
            <h2>My Dashboard</h2>
            {error && <p className="error-message">{error}</p>}

            {patient ? (
                <>
                    <div className="patient-info">
                        <h3>Your Personal Information</h3>
                        <p><strong>Full Name:</strong> {patient.name || patient.fullName}</p>
                        <p><strong>Personal Number:</strong> {patient.personalNumber}</p>
                        <p><strong>Address:</strong> {patient.address}</p>
                        <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>
                    </div>

                    <div className="observations-section">
                        <h3>Observations</h3>
                        {observations.length > 0 ? (
                            <ul className="observation-list">
                                {observations.map((obs) => (
                                    <li key={obs.id} className="observation-item">
                                        <p><strong>Date:</strong> {obs.observationDate}</p>
                                        <p><strong>Details:</strong> {obs.details}</p>
                                        <p><strong>Doctor:</strong> {obs.practitionerName || 'Unknown'}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No observations available.</p>
                        )}
                    </div>

                    <div className="conditions-section">
                        <h3>Your Conditions</h3>
                        {conditions.length > 0 ? (
                            <ul className="condition-list">
                                {conditions.map((cond) => (
                                    <li key={cond.id} className="condition-item">
                                        <p><strong>Condition:</strong> {cond.conditionName}</p>
                                        <p><strong>Description:</strong> {cond.conditionDescription}</p>
                                        <p><strong>Doctor:</strong> {cond.practitionerName || 'Unknown'}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No conditions available.</p>
                        )}
                    </div>
                </>
            ) : (
                <p>Loading your information...</p>
            )}
        </div>
    );
}

export default PatientDashboard;
