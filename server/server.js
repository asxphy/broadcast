// server.js
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Create an Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Setup HTTP server
const server = http.createServer(app);
const io = socketIO(server);

// Connect to MongoDB (replace '<MONGO_URI>' with your MongoDB connection string)
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

// Socket.IO handling for WebRTC signaling
io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Handle joining a channel
    socket.on("join-channel", ({ channelId, userId }) => {
        socket.join(channelId);
        console.log(`${userId} joined channel: ${channelId}`);
        io.to(channelId).emit("user-joined", { userId, channelId });
    });

    // Handle sending an offer (SDP) to another user
    socket.on("offer", ({ offer, toUserId, fromUserId }) => {
        io.to(toUserId).emit("offer", { offer, fromUserId });
    });

    // Handle sending an answer (SDP) to another user
    socket.on("answer", ({ answer, toUserId, fromUserId }) => {
        io.to(toUserId).emit("answer", { answer, fromUserId });
    });

    // Handle exchanging ICE candidates
    socket.on("ice-candidate", ({ candidate, toUserId, fromUserId }) => {
        io.to(toUserId).emit("ice-candidate", { candidate, fromUserId });
    });

    // Handle leaving the channel
    socket.on("leave-channel", ({ channelId, userId }) => {
        socket.leave(channelId);
        console.log(`${userId} left channel: ${channelId}`);
        io.to(channelId).emit("user-left", { userId, channelId });
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

// Channel and User API Endpoints (MongoDB models)

const Channel = mongoose.model(
    "Channel",
    new mongoose.Schema({
        name: String,
        creatorId: String,
        listeners: [String],
    })
);

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        password: String,
    })
);

// API for creating a channel
app.post("/api/channel", async (req, res) => {
    const { name, creatorId } = req.body;
    const channel = new Channel({ name, creatorId });
    await channel.save();
    res.status(201).json(channel);
});

// API for getting all channels
app.get("/api/channels", async (req, res) => {
    const channels = await Channel.find();
    res.status(200).json(channels);
});

// API for user registration
app.post("/api/register", async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json(user);
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
