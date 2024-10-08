// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("token");

    // If authenticated, render the children components (the protected page)
    // Otherwise, redirect to the login page using Navigate
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
