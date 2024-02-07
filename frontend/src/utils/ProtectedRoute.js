// PrivateRoute.js
import React from 'react';
import { Outlet, Navigate, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated, authCheck } = useAuth();

    authCheck();

    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/" replace />
    )
};

export default ProtectedRoute;