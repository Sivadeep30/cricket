import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>🇮🇳 Indian Cricket</h2>
      </div>
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/players" onClick={() => setMenuOpen(false)}>Players</Link></li>
        <li><Link to="/merchandise" onClick={() => setMenuOpen(false)}>Merchandise</Link></li>
        <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
        <li><Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
