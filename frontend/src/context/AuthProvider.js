// AuthProvider.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); // You may store user information here
    const [token, setToken] = useState(null); // Add token state

    const login = (token, username) => {
        // Perform authentication logic here
        console.log("Auth - Log In");
        setIsAuthenticated(true);
        setUser(username); // Set user information if needed
        setToken(token); // Store token in state
    };

    const logout = () => {
        console.log("Auth - Log Out");
        // Perform logout logic here
        setIsAuthenticated(false);
        setUser(null);
        setToken(null); // Clear token on logout
    };

    const authCheck = () => {
        console.log("Auth check");
        console.log(`isAuthenticated:${isAuthenticated}`);
        console.log(`user:${user}`);
        console.log(`token:${token}`);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, authCheck }}>
            {children}
        </AuthContext.Provider>
    );
};
