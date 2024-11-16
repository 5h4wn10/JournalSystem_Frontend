import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

function NavBar({ showBackButton, onBack }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any auth-related information or reset context/state if necessary
        navigate('/login');
    };

    const handleNavigateToMessages = () => {
        navigate('/messages');
    };

    return (
        <div className="navbar">
            {showBackButton && (
                <button onClick={onBack} className="back-button">
                    ← Back
                </button>
            )}
            <button onClick={handleNavigateToMessages} className="messages-button">
                Messages
            </button>
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
        </div>
    );
}

export default NavBar;
