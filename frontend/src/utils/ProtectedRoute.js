// PrivateRoute.js
import React from 'react';
import { Outlet, Navigate, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated, authCheck } = useAuth();

    authCheck();

    // https://medium.com/@chiragmehta900/creating-protected-routes-in-react-js-with-react-router-v6-28f3a3ac53d
    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
    )
};

export default ProtectedRoute;