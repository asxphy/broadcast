const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const channelRoutes = require("./routes/channel");
const followRoutes = require("./routes/follow");
const unfollowRoutes = require("./routes/unfollow");
const broadcastRoutes = require("./routes/broadcast");
const path = require("path");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware for JSON parsing and CORS
app.use(express.json());
app.use(cors()); // Handling CORS

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Routes for different functionalities
app.use("/api/auth", userRoutes);
app.use("/api/channel", channelRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/unfollow", unfollowRoutes);
app.use("/api/broadcast", broadcastRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
    app.get("*", (req, res) =>
        res.sendFile(path.join(__dirname, "client", "build", "index.html"))
    );
}

// Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
