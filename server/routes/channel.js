// routes/channel.js
const express = require("express");
const protect = require("../middleware/authMiddleware");
const Channel = require("../models/Channel");
const User = require("../models/User");
const router = express.Router();

// Create channel (user can create only 1 channel)
router.post("/create", protect, async (req, res) => {
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

module.exports = router;
