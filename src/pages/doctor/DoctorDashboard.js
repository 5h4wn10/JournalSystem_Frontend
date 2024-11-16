import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosConfig';
import '../../styles/Dashboard.css';
import NavBar from '../../common/NavBar';

function DoctorDashboard() {
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook för att navigera programmatisk

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axiosInstance.get('/api/patients');
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patients:', error);
                setError('Could not load patients');
            }
        };
        fetchPatients();
    }, []);

    const handlePatientClick = (id) => {
        navigate(`/doctor/patient/${id}`);
    };

    return (
        <div className="dashboard-container">
            <NavBar /> {/* Add NavBar with just Logout button */}
            <h2>Doctor Dashboard</h2>
            <h3>All Patients</h3>
            {error && <p className="error-message">{error}</p>}
            <ul className="patient-list">
                {patients.map((patient) => (
                    <li 
                        key={patient.id} 
                        className="patient-item" 
                        onClick={() => handlePatientClick(patient.id)}
                    >
                        {patient.name || patient.fullName} {/* Justera beroende på vad backend skickar */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DoctorDashboard;