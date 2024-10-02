const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }],
});
module.exports = mongoose.model("User", UserSchema);
