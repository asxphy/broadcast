const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    isLive: {
        type: Boolean,
        default: false,
    },
});

const Channel = mongoose.model("Channel", channelSchema);

module.exports = Channel;
