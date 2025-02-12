import React from "react";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import "../styles.css";

function HeroSection() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          <Typewriter
            options={{
              strings: ["Bleed Blue. Support Team India!", "One Team, One Dream!"],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
        <Link to="/team" className="hero-btn">Explore Team India</Link>
      </div>
    </div>
  );
}

export default HeroSection;
