// src/components/LoginPage.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../global.css"; // Import global CSS

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password,
                }
            );

            if (response.status === 200) {
                // Save token or user data to local storage if needed
                localStorage.setItem("token", response.data.token); // Assuming token-based authentication
                navigate("/home"); // Redirect to homepage after login
            } else {
                setError("Login failed. Please check your credentials.");
            }
        } catch (err) {
            setError("Login error: " + err.message);
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
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
