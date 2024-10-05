// routes/broadcast.js
const express = require("express");
const protect = require("../middleware/authMiddleware");
const User = require("../models/User");
const Channel = require("../models/Channel");
const router = express.Router();

// Get current user's created channel
router.get("/mychannel", protect, async (req, res) => {
    // Get the user's channel
    const user = await User.findById(req.user._id).populate("createdChannel");
    if (!user.createdChannel) {
        return res
            .status(404)
            .json({ error: "You have not created a channel" });
    }

    res.status(200).json(user.createdChannel);
});

module.exports = router;
