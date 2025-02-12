import React from "react";
import { Link } from "react-router-dom";
import "../styles.css"; // Import global styles

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>🇮🇳 Indian Cricket</h2>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/players">Players</Link></li>
        <li><Link to="/merchandise">Merchandise</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
