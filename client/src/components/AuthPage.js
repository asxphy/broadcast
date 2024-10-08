// src/components/AuthPage.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css"; // Import the global styles

const AuthPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Assume there's an API call to authenticate the user
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password,
                }
            );

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token); // Store token in localStorage
                setError(""); // Clear any previous errors
                navigate("/home"); // Navigate to home page after successful login
            } else {
                setError("Invalid login credentials");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Failed to login");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default AuthPage;
