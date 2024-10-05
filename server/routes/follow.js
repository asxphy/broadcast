// routes/follow.js
const express = require("express");
const protect = require("../middleware/authMiddleware");
const User = require("../models/User");
const Channel = require("../models/Channel");
const router = express.Router();

// Follow a channel
router.post("/follow/:channelId", protect, async (req, res) => {
    const { channelId } = req.params;

    // Find the channel
    const channel = await Channel.findById(channelId);
    if (!channel) {
        return res.status(404).json({ error: "Channel not found" });
    }

    // Add channel to user's following list
    const user = await User.findById(req.user._id);
    if (user.following.includes(channelId)) {
        return res
            .status(400)
            .json({ error: "You are already following this channel" });
    }

    user.following.push(channelId);
    await user.save();

    // Update channel's follower count
    channel.followers.push(user._id);
    await channel.save();

    res.status(200).json({ message: `You are now following ${channel.name}` });
});

module.exports = router;
