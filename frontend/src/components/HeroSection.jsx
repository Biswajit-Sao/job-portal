import React, { useState } from "react";
import "./HeroSection.css";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Find Your Dream Job</h1>
        <h2>Your next opportunity is just a click away</h2>
        <p>
          Explore thousands of job listings from top companies and apply with
          ease. Get hired faster with personalized job recommendations.
        </p>
        <div className="search-bar">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Job title, keywords, or location"
          />
          <button onClick={searchJobHandler}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;