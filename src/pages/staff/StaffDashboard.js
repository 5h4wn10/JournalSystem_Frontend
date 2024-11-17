import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig';
import '../../styles/Dashboard.css';
import NavBar from '../../common/NavBar';

function StaffDashboard() {
    const [patients, setPatients] = useState([]); // List of patients
    const [selectedPatient, setSelectedPatient] = useState(""); // Selected patient ID
    const [observation, setObservation] = useState(""); // Observation content
    const [condition, setCondition] = useState(""); // Condition name
    const [conditionDescription, setConditionDescription] = useState(""); // Condition description
    const [success, setSuccess] = useState(""); // Success message
    const [error, setError] = useState(""); // Error message
    const [observationDate, setObservationDate] = useState("");

    // Fetch list of patients on component load
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axiosInstance.get('/api/patients');
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patients:', error);
                setError('Failed to fetch patients');
            }
        };
        fetchPatients();
    }, []);

    // Handle observation submission
    const handleSendObservation = async () => {
        if (!selectedPatient || !observation) {
            setError("Please select a patient and provide an observation");
            return;
        }
        try {
            await axiosInstance.post(`/api/observations/patient/${selectedPatient}`, {
                details: observation,
            });
            setSuccess("Observation sent successfully");
            setObservation(""); // Clear input
        } catch (error) {
            console.error("Error sending observation:", error);
            setError("Failed to send observation");
        }
    };

    // Handle condition submission
    const handleSendCondition = async () => {
        if (!selectedPatient || !condition || !conditionDescription) {
            setError("Please select a patient and provide a condition and description");
            return;
        }
        try {
            await axiosInstance.post(`/api/conditions/patient/${selectedPatient}`, {
                name: condition,
                description: conditionDescription,
            });
            setSuccess("Condition sent successfully");
            setCondition(""); // Clear inputs
            setConditionDescription("");
        } catch (error) {
            console.error("Error sending condition:", error);
            setError("Failed to send condition");
        }
    };

    // Handle logout
    const handleLogout = () => {
        axiosInstance.defaults.headers.common['Authorization'] = '';
        window.location.href = '/login'; // Redirect to login page
    };

    return (
        <div>
            <NavBar></NavBar>
            <h2>Staff Dashboard</h2>
            
            <h3>Send Observations and Conditions</h3>
            {success && <p className="success">{success}</p>}
            {error && <p className="error">{error}</p>}

            <div className="form-section">
                <label htmlFor="patient-select">Select Patient:</label>
                <select
                    id="patient-select"
                    value={selectedPatient}
                    onChange={(e) => setSelectedPatient(e.target.value)}
                >
                    <option value="">-- Select a Patient --</option>
                    {patients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                            {patient.name}
                        </option>
                    ))}
                </select>

                {/* Send Observation */}
                <div className="form-group">
                    <h4>Send Observation</h4>
                    <textarea
                        placeholder="Write your observation"
                        value={observation}
                        onChange={(e) => setObservation(e.target.value)}
                    ></textarea>
                    <input
                    type="date"
                    value={observationDate}
                    onChange={(e) => setObservationDate(e.target.value)}
                    className="input-field"
                    />
                    <button onClick={handleSendObservation} className="button">Send Observation</button>
                </div>

                {/* Send Condition */}
                <div className="form-group">
                    <h4>Send Condition</h4>
                    <input
                        type="text"
                        placeholder="Condition Name"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                    />
                    <textarea
                        placeholder="Condition Description"
                        value={conditionDescription}
                        onChange={(e) => setConditionDescription(e.target.value)}
                    ></textarea>
                    <button onClick={handleSendCondition} className="button">Send Condition</button>
                </div>
            </div>
        </div>
    );
}

export default StaffDashboard;
