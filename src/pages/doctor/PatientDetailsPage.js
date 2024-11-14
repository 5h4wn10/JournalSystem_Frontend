import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosConfig';
import '../../styles/PatientDetails.css';

function PatientDetailPage() {
    const { patientId } = useParams();
    const [patient, setPatient] = useState(null);
    const [message, setMessage] = useState('');
    const [observation, setObservation] = useState('');
    const [observations, setObservations] = useState([]);
    const [condition, setCondition] = useState('');
    const [conditions, setConditions] = useState([]);
    const [observationDate, setObservationDate] = useState('');
    const [conditionDescription, setConditionDescription] = useState('');
    const [error, setError] = useState('');

    const fetchPatientData = async () => {
        try {
            // Fetch patient details
            const patientResponse = await axiosInstance.get(`/api/patients/${patientId}`);
            setPatient(patientResponse.data);

            // Fetch observations for the patient
            const observationsResponse = await axiosInstance.get(`/api/observations/patient/${patientId}`);
            setObservations(observationsResponse.data);

            // Fetch conditions for the patient
            const conditionsResponse = await axiosInstance.get(`/api/conditions/patient/${patientId}`);
            setConditions(conditionsResponse.data);
        } catch (error) {
            console.error('Error fetching patient data:', error);
            setError('Could not load patient details.');
        }
    };

    useEffect(() => {
        fetchPatientData();
    }, [patientId]);

    const handleAddObservation = async () => {
        try {
            await axiosInstance.post(`/api/observations/patient/${patientId}`, {
                details: observation,
                observationDate,
            });
            setObservation('');
            setObservationDate('');
            alert('Observation added successfully');
            fetchPatientData(); // Refetch data to update the observations list
        } catch (error) {
            alert('Failed to add observation');
            console.error(error);
        }
    };

    const handleAddCondition = async () => {
        try {
            await axiosInstance.post(`/api/conditions/patient/${patientId}`, {
                name: condition,
                description: conditionDescription,
            });
            setCondition('');
            setConditionDescription('');
            alert('Condition added successfully');
            fetchPatientData(); // Refetch data to update the conditions list
        } catch (error) {
            alert('Failed to add condition');
            console.error(error);
        }
    };

    const handleSendMessage = async () => {
        try {
            await axiosInstance.post(`/api/messages/patient/${patientId}`, {
                content: message,
            });
            alert('Message sent successfully');
            setMessage('');
        } catch (error) {
            alert('Failed to send message');
            console.error(error);
        }
    };

    return (
        <div className="patient-detail-container">
            {error && <p className="error-message">{error}</p>}
            {patient ? (
                <>
                    <h2>{patient.fullName}</h2>
                    <p><strong>Personal Number:</strong> {patient.personalNumber}</p>
                    <p><strong>Address:</strong> {patient.address}</p>
                    <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>

                    <h3>Actions</h3>
                    <div className="actions">
                        <div>
                            <h4>Add Observation</h4>
                            <input
                                type="text"
                                placeholder="Observation Details"
                                value={observation}
                                onChange={(e) => setObservation(e.target.value)}
                            />
                            <input
                                type="date"
                                value={observationDate}
                                onChange={(e) => setObservationDate(e.target.value)}
                            />
                            <button onClick={handleAddObservation}>Add Observation</button>
                        </div>

                        <div>
                            <h4>Add Condition</h4>
                            <input
                                type="text"
                                placeholder="Condition Name"
                                value={condition}
                                onChange={(e) => setCondition(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Condition Description"
                                value={conditionDescription}
                                onChange={(e) => setConditionDescription(e.target.value)}
                            />
                            <button onClick={handleAddCondition}>Add Condition</button>
                        </div>

                        <div>
                            <h4>Send Message</h4>
                            <textarea
                                placeholder="Write your message here"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                            <button onClick={handleSendMessage}>Send Message</button>
                        </div>
                    </div>

                    {/* Display Observations */}
                    <h3>Observations</h3>
                    <ul className="observation-list">
                        {observations.map((obs) => (
                            <li key={obs.id}>
                                <p><strong>Date:</strong> {obs.observationDate}</p>
                                <p><strong>Details:</strong> {obs.details}</p>
                            </li>
                        ))}
                    </ul>

                    {/* Display Conditions */}
                    <h3>Conditions</h3>
                    <ul className="condition-list">
                        {conditions.map((cond) => (
                            <li key={cond.id}>
                                <p><strong>Name:</strong> {cond.name}</p>
                                <p><strong>Description:</strong> {cond.description}</p>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Loading patient details...</p>
            )}
        </div>
    );
}

export default PatientDetailPage;
