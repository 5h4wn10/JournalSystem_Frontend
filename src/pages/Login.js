// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance, { setAuthHeader } from '../axiosConfig';
import { useUser } from '../UserContext';
import '../styles/Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { setUserRole } = useUser();  // Använd setUserRole från UserContext

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/auth/login', {
                username,
                password,
            });

            setAuthHeader(username, password);
            setMessage(response.data.message);

            const roles = response.data.roles;
            if (roles.includes("DOCTOR")) {
                setUserRole("DOCTOR");
                navigate('/doctor/dashboard');
            } else if (roles.includes("STAFF")) {
                setUserRole("STAFF");
                navigate('/staff/dashboard');
            } else if (roles.includes("PATIENT")) {
                setUserRole("PATIENT");
                navigate('/patient/dashboard');
            }
        } catch (error) {
            setMessage('Login failed');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button> <button onClick={() => navigate('/register')} className="register-button">
                Register
            </button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default Login;