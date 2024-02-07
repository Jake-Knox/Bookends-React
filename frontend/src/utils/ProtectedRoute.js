// PrivateRoute.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (
        <Route {...rest} element={<Component />} />
    ) : (
        <Navigate to="/" replace />
    );
};

export default ProtectedRoute;