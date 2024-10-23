/*
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
*/
// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('token'); // Check if the user is authenticated
    const userRole = localStorage.getItem('role'); // Get the user role from local storage

    // If the user is not logged in or the role is not allowed, redirect to the login page
    if (!token || !allowedRoles.includes(userRole)) {
        return <Navigate to="/" />;
    }

    return children; // Render the protected route if authorized
};

export default ProtectedRoute;
