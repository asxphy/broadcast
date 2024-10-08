// components/ChannelPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ChannelPage = () => {
    const { channelId } = useParams();
    const [channel, setChannel] = useState(null);

    useEffect(() => {
        const fetchChannel = async () => {
            const { data } = await axios.get(
                `http://localhost:5000/api/channel/${channelId}`
            );
            setChannel(data);
        };

        fetchChannel();
    }, [channelId]);

    if (!channel) return <div>Loading...</div>;

    return (
        <div className="channel-page">
            <h2>{channel.name}</h2>
            <p>Creator: {channel.creator}</p>
            <p>Followers: {channel.followers.length}</p>
            {channel.isLive ? (
                <button
                    onClick={() => {
                        /* Code to play audio via WebRTC */
                    }}
                >
                    Listen Live
                </button>
            ) : (
                <p>Currently Offline</p>
            )}
        </div>
    );
};

export default ChannelPage;
