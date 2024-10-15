// src/components/LoginPage.js
import React, { useState } from "react";
import { Card, TextField, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                { ...formData }
            );
            console.log(res.data.token);
            login(res.data.token);
            navigate("/");
        } catch (err) {
            console.log(err);
            console.error("Login failed", err);
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Card sx={{ padding: 4, maxWidth: 400, boxShadow: 3 }}>
                <Typography variant="h5" textAlign="center" mb={2}>
                    Login to your Account
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </form>
                <Typography variant="body2" mt={2} textAlign="center">
                    Don't have an account?{" "}
                    <Link to="/register">Create one</Link>
                </Typography>
            </Card>
        </Box>
    );
};

export default LoginPage;
