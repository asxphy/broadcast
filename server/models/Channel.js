const mongoose = require("mongoose");
const ChannelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isLive: { type: Boolean, default: false },
});
module.exports = mongoose.model("Channel", ChannelSchema);
