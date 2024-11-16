import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import '../styles/Register.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState('PATIENT');
    const [dateOfBirth, setDateOfBirth] = useState(''); 
    const [address, setAddress] = useState(''); 
    const [personalNumber, setPersonalNumber] = useState(''); 
    const [specialty, setSpecialty] = useState(''); 
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const data = {
                username,
                password,
                fullName,
                ...(role === 'PATIENT' && { dateOfBirth }), 
                ...(role === 'PATIENT' && { address }), 
                ...(role === 'PATIENT' && { personalNumber }), 
                ...(role !== 'PATIENT' && { specialty }) 
            };
            console.log("Sending data to backend:", data);

            await axiosInstance.post(`/api/auth/register?role=${role}`, data);
            setMessage('Registration successful');
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            setMessage('Registration failed');
            console.error(error);
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="input-field"
                />
                <select value={role} onChange={(e) => setRole(e.target.value)} className="input-field">
                    <option value="PATIENT">Patient</option>
                    <option value="DOCTOR">Doctor</option>
                    <option value="STAFF">Staff</option>
                </select>

                {role === 'PATIENT' && (
                    <>
                    <input
                        type="date"
                        placeholder="Date of Birth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        required
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="Personal Number"
                        value={personalNumber}
                        onChange={(e) => setPersonalNumber(e.target.value)}
                        required
                        className="input-field"
                    />
                </>
                )}

                {role === 'DOCTOR' && (
                    <input
                        type="text"
                        placeholder="Specialty"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        className="input-field"
                    />
                )}
                <button type="submit" className="button-register">Register</button>
            </form>
            <button onClick={() => navigate('/login')} className="button secondary-button">Back to Login</button>
            <p>{message}</p>
        </div>
    );
    
}

export default Register;
