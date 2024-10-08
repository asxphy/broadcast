// components/SearchChannelPage.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchChannelPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const { data } = await axios.get(
            `http://localhost:5000/api/channel/search?name=${searchTerm}`
        );
        setResults(data);
    };

    return (
        <div className="search-channel-page">
            <h2>Search Channels</h2>
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            <ul>
                {results.map((channel) => (
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

export default SearchChannelPage;
