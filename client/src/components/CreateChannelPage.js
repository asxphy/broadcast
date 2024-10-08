import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateChannelPage = () => {
    const [channelName, setChannelName] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate(); // React Router v6 hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate channel name
        if (!channelName.trim()) {
            setError("Channel name is required");
            return;
        }

        try {
            // Request to create the channel (Adjust this based on your API)
            const response = await axios.post(
                "http://localhost:5000/api/channel/create",
                {
                    name: channelName,
                }
            );

            // If channel creation is successful
            if (response.status === 201) {
                setSuccess("Channel created successfully!");
                setError("");
                // Navigate to the newly created channel or home page
                navigate("/home"); // Navigate to home or channel page
            } else {
                setError("Failed to create channel");
            }
        } catch (err) {
            console.error("Error creating channel:", err);
            setError("Failed to create channel");
        }
    };

    return (
        <div>
            <h1>Create Channel</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        placeholder="Enter channel name"
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                <div>
                    <button type="submit">Create Channel</button>
                </div>
            </form>
        </div>
    );
};

export default CreateChannelPage;
