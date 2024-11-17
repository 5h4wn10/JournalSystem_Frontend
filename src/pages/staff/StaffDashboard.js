import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";
import "../../styles/StaffDashboard.css";
import NavBar from "../../common/NavBar";

function StaffDashboard() {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState("");
    const [observation, setObservation] = useState("");
    const [condition, setCondition] = useState("");
    const [conditionDescription, setConditionDescription] = useState("");
    const [observationDate, setObservationDate] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axiosInstance.get("/api/patients");
                setPatients(response.data);
            } catch (error) {
                setError("Failed to fetch patients");
            }
        };
        fetchPatients();
    }, []);

    const handleSendObservation = async () => {
        if (!selectedPatient || !observation) {
            setError("Please select a patient and provide an observation");
            return;
        }
        try {
            await axiosInstance.post(`/api/observations/patient/${selectedPatient}`, {
                details: observation,
                observationDate,
            });
            setSuccess("Observation sent successfully");
            setObservation("");
            setObservationDate("");
        } catch (error) {
            setError("Failed to send observation");
        }
    };

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
            setCondition("");
            setConditionDescription("");
        } catch (error) {
            setError("Failed to send condition");
        }
    };

    return (
        <div className="staff-dashboard-container">
            <NavBar />
            <h2>Staff Dashboard</h2>
            <div className="dashboard-content">
                <h3>Send Observations and Conditions</h3>
                {success && <p className="success-message">{success}</p>}
                {error && <p className="error-message">{error}</p>}

                <div className="form-container">
                    <label htmlFor="patient-select">Select Patient:</label>
                    <select
                        id="patient-select"
                        value={selectedPatient}
                        onChange={(e) => setSelectedPatient(e.target.value)}
                        className="select-field"
                    >
                        <option value="">-- Select a Patient --</option>
                        {patients.map((patient) => (
                            <option key={patient.id} value={patient.id}>
                                {patient.name}
                            </option>
                        ))}
                    </select>

                    {/* Send Observation */}
                    <div className="form-section">
                        <h4>Send Observation</h4>
                        <textarea
                            placeholder="Write your observation"
                            value={observation}
                            onChange={(e) => setObservation(e.target.value)}
                            className="textarea-field"
                        ></textarea>
                        <input
                            type="date"
                            value={observationDate}
                            onChange={(e) => setObservationDate(e.target.value)}
                            className="input-field"
                        />
                        <button onClick={handleSendObservation} className="button">
                            Send Observation
                        </button>
                    </div>

                    {/* Send Condition */}
                    <div className="form-section">
                        <h4>Send Condition</h4>
                        <input
                            type="text"
                            placeholder="Condition Name"
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                            className="input-field"
                        />
                        <textarea
                            placeholder="Condition Description"
                            value={conditionDescription}
                            onChange={(e) => setConditionDescription(e.target.value)}
                            className="textarea-field"
                        ></textarea>
                        <button onClick={handleSendCondition} className="button">
                            Send Condition
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StaffDashboard;
