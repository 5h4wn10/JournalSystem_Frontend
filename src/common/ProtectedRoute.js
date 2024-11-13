// src/components/common/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const ProtectedRoute = ({ children, role }) => {
    const { userRole } = useUser();  // Hämta userRole från UserContext

    console.log("ProtectedRoute userRole:", userRole);
    if (userRole !== role) {
        console.log("Access denied: userRole does not match required role.");
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
