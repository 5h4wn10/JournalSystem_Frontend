import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/auth/login', {
                username,
                password,
            });

            if (response.status === 200) {
                console.log("Login successful:", response.data); // Kontrollera att rätt data returneras
                setMessage('Login successful');
                
                // Spara användarroll i localStorage för senare användning i `ProtectedRoute`
                const userRole = response.data.role;
                localStorage.setItem('userRole', userRole);

                // Omdirigera till rätt sida baserat på användarroll
                if (userRole === 'DOCTOR') {
                    navigate('/doctor/dashboard');
                } else if (userRole === 'PATIENT') {
                    navigate('/patient/dashboard');
                } else if (userRole === 'STAFF') {
                    navigate('/staff/dashboard');
                }
            }
        } catch (error) {
            setMessage('Login failed');
            console.error("Login error:", error);
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
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default Login;
