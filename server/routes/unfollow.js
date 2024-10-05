// routes/unfollow.js
const express = require("express");
const protect = require("../middleware/authMiddleware");
const User = require("../models/User");
const Channel = require("../models/Channel");
const router = express.Router();

// Unfollow a channel
router.post("/unfollow/:channelId", protect, async (req, res) => {
    const { channelId } = req.params;

    // Find the channel
    const channel = await Channel.findById(channelId);
    if (!channel) {
        return res.status(404).json({ error: "Channel not found" });
    }

    // Remove channel from user's following list
    const user = await User.findById(req.user._id);
    if (!user.following.includes(channelId)) {
        return res
            .status(400)
            .json({ error: "You are not following this channel" });
    }

    user.following = user.following.filter((id) => id.toString() !== channelId);
    await user.save();

    // Update channel's follower count
    channel.followers = channel.followers.filter(
        (id) => id.toString() !== user._id.toString()
    );
    await channel.save();

    res.status(200).json({ message: `You have unfollowed ${channel.name}` });
});

module.exports = router;
