// routes/channel.js
const express = require("express");
const protect = require("../middleware/authMiddleware");
const Channel = require("../models/Channel");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Create channel (user can create only 1 channel)
router.post("/create", protect, async (req, res) => {
    console.log(req.body);
    const { name, description } = req.body;

    // Check if user already has a created channel
    const user = await User.findById(req.user._id);
    if (user.createdChannel) {
        return res
            .status(400)
            .json({ error: "User has already created a channel" });
    }

    // Validate
    if (!name) {
        return res.status(400).json({ error: "Channel name is required" });
    }

    // Check if channel with same name exists
    const channelExists = await Channel.findOne({ name });
    if (channelExists) {
        return res
            .status(400)
            .json({ error: "Channel with this name already exists" });
    }

    // Create new channel
    try {
        const newChannel = new Channel({
            name,
            description,
            creator: req.user._id,
        });

        await newChannel.save();

        // Update user's createdChannel field
        user.createdChannel = newChannel._id;
        await user.save();

        res.status(201).json(newChannel);
    } catch (error) {
        res.status(500).json({ error: "Error creating channel" });
    }
});

router.get("/followed", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Assuming the user ID is set in req.user after authentication

        // Find the user by ID and populate the followed channels
        const user = await User.findById(userId).populate("following");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send the list of followed channels
        res.status(200).json({ followedChannels: user.followedChannels });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
