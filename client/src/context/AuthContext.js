import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AuthContext = createContext();

// Provide the context to components
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check localStorage for a token on app load
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    // Mock login function (real implementation would involve API call)
    const login = (token) => {
        localStorage.setItem("authToken", token);
        setIsAuthenticated(true);
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
    };

    // Provide the context value (authentication state and functions)
    return (
        <AuthContext.Provider
            value={{ isAuthenticated, loading, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
