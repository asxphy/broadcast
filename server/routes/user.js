// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Register user
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    // Validate fields
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Please fill in all fields" });
    }

    // Check if the email is already registered
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ error: "User already exists" });
    }

    // Create user
    try {
        const user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, "password", {
            expiresIn: "1h",
        });

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error registering user" });
    }
});

// routes/auth.js (Login Endpoint)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
        return res
            .status(400)
            .json({ error: "Please provide both email and password" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id }, "password", {
            expiresIn: "1h",
        });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (error) {
        res.status(500).json({ error: "Error logging in" });
    }
});

module.exports = router;
