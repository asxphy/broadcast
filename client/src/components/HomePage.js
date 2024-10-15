// components/HomePage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const fetchChannels = async () => {
            const token = localStorage.getItem("token");
            console.log(token);
            const { data } = await axios.get(
                "http://localhost:5000/api/channel/followed",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log(data);

            // Sort live channels to the top
            const liveChannels = data.filter((channel) => channel.isLive);
            const offlineChannels = data.filter((channel) => !channel.isLive);
            setChannels([...liveChannels, ...offlineChannels]);
        };

        fetchChannels();
    }, []);

    return (
        <div className="home-page">
            <h2>Your Channels</h2>
            <Link to="/create-channel">create-channel</Link>
            <ul>
                {channels.map((channel) => (
                    <li key={channel._id}>
                        <Link to={`/channel/${channel._id}`}>
                            <h3>{channel.name}</h3>
                            <p>{channel.isLive ? "Live" : "Offline"}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
