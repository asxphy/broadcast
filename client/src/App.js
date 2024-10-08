// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import CreateChannelPage from "./components/CreateChannelPage";
import ChannelPage from "./components/ChannelPage";
import SearchPage from "./components/SearchPage";

const App = () => {
    return (
        <Router>
            <Routes>
                {" "}
                {/* Use Routes instead of Switch */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/create-channel" element={<CreateChannelPage />} />
                <Route path="/channel/:id" element={<ChannelPage />} />
                <Route path="/search" element={<SearchPage />} />
            </Routes>
        </Router>
    );
};

export default App;
