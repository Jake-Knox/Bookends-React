// AuthProvider.js
import React, { createContext, useContext, useState } from 'react';

import { parseCookie } from '../utils/cookieUtils';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); // You may store user information here
    const [token, setToken] = useState(() => {
        // Initialize token from cookie if available
        const token = parseCookie('token');
        if (token) {
            setIsAuthenticated(true);
            return token;
        }
        return null;
    });


    const login = (token, username) => {
        // Perform authentication logic here
        console.log("Auth - Log In");
        setIsAuthenticated(true);
        setUser(username); // Set user information if needed
        setToken(token); // Store token in state
        document.cookie = `token=${token}; path=/;`;
    };

    const logout = () => {
        console.log("Auth - Log Out");
        // Perform logout logic here
        setIsAuthenticated(false);
        setUser(null);
        setToken(null); // Clear token on logout
        // Clear session cookie on logout
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    };

    const authCheck = () => {
        console.log("Auth check");
        console.log(`isAuthenticated:${isAuthenticated}`);
        // console.log(`user:${user}`);
        // console.log(`token:${token}`);
    }

    // const getIsAuthenticated = () => {
    //     return isAuthenticated;
    // }
    // const getUser = () => {
    //     return user;
    // }
    // const getToken = () => {
    //     return token;
    // }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, authCheck }}>
            {children}
        </AuthContext.Provider>
    );
};
