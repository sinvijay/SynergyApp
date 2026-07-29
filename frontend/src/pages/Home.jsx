import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page-container">
      <div className="hero">
        <h1>Synergy Tools</h1>
        <p>Your all-in-one suite for compressing images, merging PDFs, and extracting text. Fast, secure, and entirely online.</p>
        <div className="hero-buttons">
          <Link to="/login" className="btn btn-primary">Sign In</Link>
          <Link to="/signup" className="btn btn-outline">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;