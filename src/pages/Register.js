import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import '../styles/Register.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState('PATIENT');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(
                `/api/auth/register?role=${role}`,
                { username, password, fullName }
            );
            setMessage('Registration successful');
            setTimeout(() => navigate('/login'), 2000); // Navigera till login efter 2 sekunder
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
                    <option value="STAFF">Staff</option>
                    <option value="DOCTOR">Doctor</option>
                </select>
                <button type="submit" className="button">Register</button>
            </form>
            <button onClick={() => navigate('/login')} className="button secondary-button">Back to Login</button>
            <p>{message}</p>
        </div>
    );
}

export default Register;