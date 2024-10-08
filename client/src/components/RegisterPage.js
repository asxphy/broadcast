// src/components/RegisterPage.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../global.css"; // Import global CSS

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    name: username,
                    email,
                    password,
                }
            );

            if (response.status === 201) {
                setSuccess("Registration successful! Redirecting to login...");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                setError("Registration failed. Please try again.");
            }
        } catch (err) {
            setError("Registration error: " + err.message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
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
                    <div>
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
