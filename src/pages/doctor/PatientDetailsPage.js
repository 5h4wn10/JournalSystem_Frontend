import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosConfig';
import '../../styles/PatientDetails.css';
import NavBar from '../../common/NavBar';

function PatientDetailPage() {
    const navigate = useNavigate(); // Define navigate
    const { patientId } = useParams();
    const [patient, setPatient] = useState(null);
    const [observations, setObservations] = useState([]);
    const [conditions, setConditions] = useState([]);
    const [message, setMessage] = useState('');
    const [observation, setObservation] = useState('');
    const [observationDate, setObservationDate] = useState('');
    const [condition, setCondition] = useState('');
    const [description, setConditionDescription] = useState('');


    // Fetch patient details, observations, and conditions on component load
    useEffect(() => {
        fetchPatientDetails(); // Fetch patient information once
        fetchObservationsAndConditions(); // Fetch observations and conditions
    }, [patientId]);


    const fetchPatientDetails = async () => {
        try {
            const patientResponse = await axiosInstance.get(`/api/patients/${patientId}`);
            setPatient(patientResponse.data);
        } catch (error) {
            console.error('Error fetching patient details:', error);
        }
    };

    const fetchObservationsAndConditions = async () => {
        try {
            const observationResponse = await axiosInstance.get(`/api/observations/patient/${patientId}`);
            setObservations(observationResponse.data);
    
            const conditionResponse = await axiosInstance.get(`/api/conditions/patient/${patientId}`);
            setConditions(conditionResponse.data);
        } catch (error) {
            console.error('Error fetching observations or conditions:', error);
        }
    };

    const handleAddObservation = async () => {
        try {
            const response = await axiosInstance.post(`/api/observations/patient/${patientId}`, {
                details: observation,
                observationDate,
            });
            setObservation(''); // Clear input field
            setObservationDate('');
            fetchObservationsAndConditions(); // Refetch all observations and conditions
            alert('Observation added successfully');
        } catch (error) {
            alert('Failed to add observation');
            console.error(error);
        }
    };

    const handleAddCondition = async () => {
        try {
            const response = await axiosInstance.post(`/api/conditions/patient/${patientId}`, {
                name: condition,
                description,
            });
            setCondition(''); // Clear input fields
            setConditionDescription('');
            fetchObservationsAndConditions(); // Refetch all observations and conditions
            alert('Condition added successfully');
        } catch (error) {
            alert('Failed to add condition');
            console.error(error);
        }
    };

    const handleSendMessage = async () => {
        if (!message.trim()) {
            alert('Please write a message');
            return;
        }
    
        try {
            await axiosInstance.post('/api/messages/send', {
                content: message,
                receiverId: patient.id, // Använd patientens ID som mottagare
            });
            alert('Message sent successfully');
            setMessage(''); // Rensa meddelandefältet
        } catch (error) {
            alert('Failed to send message');
            console.error(error);
        }
    };
    

    const handleBack = () => {
        navigate('/doctor/dashboard');
    };

    return (
        <div className="patient-detail-container">
            {patient ? (
                <>
                    <NavBar showBackButton={true} onBack={handleBack} />
                    <h2>{patient.name || patient.fullName}</h2>
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
                                placeholder="Condition description"
                                value={description}
                                onChange={(e) => setConditionDescription(e.target.value)}
                            />
                            <button onClick={handleAddCondition}>Add Condition</button>
                        </div>

                        <div>
                            <h4>Send Message To Patient</h4>
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
                    <div className="observation-list">
                        {observations.map((obs) => (
                            <div key={obs.id} className="observation-card">
                                <p><strong>Date:</strong> {obs.observationDate}</p>
                                <p><strong>Details:</strong> {obs.details}</p>
                                <p><strong>Practitioner:</strong> {obs.practitionerName}</p>
                            </div>
                        ))}
                    </div>

                    {/* Display Conditions */}
                    <h3>Conditions</h3>
                    <div className="condition-list">
                        {conditions.map((cond) => (
                            <div key={cond.id} className="condition-card">
                                <p><strong>Name:</strong> {cond.conditionName}</p>
                                <p><strong>Description:</strong> {cond.conditionDescription}</p>
                                <p><strong>Practitioner:</strong> {cond.practitionerName}</p>
                            </div>
                        ))}
                    </div>

                </>
            ) : (
                <p>Loading patient details...</p>
            )}
        </div>
    );
}

export default PatientDetailPage;
