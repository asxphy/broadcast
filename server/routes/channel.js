const express = require("express");
const Channel = require("../models/Channel");
const User = require("../models/User");
const router = express.Router();

// Get channels user follows, live channels on top
router.get("/following/:userId", async (req, res) => {
    const user = await User.findById(req.params.userId).populate("following");
    const channels = user.following.sort((a, b) => b.isLive - a.isLive);
    res.json(channels);
});

// Get specific channel info
router.get("/:channelId", async (req, res) => {
    const channel = await Channel.findById(req.params.channelId).populate(
        "creator"
    );
    res.json(channel);
});

// Create new channel
router.post("/create", async (req, res) => {
    const { name, creatorId } = req.body;
    const newChannel = new Channel({ name, creator: creatorId });
    await newChannel.save();
    res.status(201).json(newChannel);
});

// Broadcast (set channel live status)
router.post("/:channelId/live", async (req, res) => {
    const channel = await Channel.findById(req.params.channelId);
    channel.isLive = !channel.isLive; // toggle live status
    await channel.save();
    res.json(channel);
});

module.exports = router;
