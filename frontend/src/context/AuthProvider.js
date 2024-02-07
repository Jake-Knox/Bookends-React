// AuthProvider.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); // You may store user information here

    const login = () => {
        // Perform authentication logic here
        setIsAuthenticated(true);
        setUser({ username: 'exampleUser' }); // Set user information if needed
    };

    const logout = () => {
        // Perform logout logic here
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
