import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, role }) {
    const userRole = localStorage.getItem('userRole');
    console.log("ProtectedRoute userRole:", userRole); // Lägg till för felsökning

    if (userRole !== role) {
        console.log("Access denied: userRole does not match required role.");
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
