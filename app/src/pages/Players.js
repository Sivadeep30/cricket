import React, { useState, useEffect } from "react";
import axios from "axios";
import "./page.css"; // Import CSS file for styling

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [showStats, setShowStats] = useState({});

  // Fetch players from the backend
  const fetchPlayers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/players");
      setPlayers(response.data);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  // Toggle stats visibility for a player
  const toggleStats = (playerId) => {
    setShowStats((prev) => ({
      ...prev,
      [playerId]: !prev[playerId],
    }));
  };

  return (
    <div className="players-container">
      <h1>Players List</h1>
      <ul className="players-list">
        {players.map((player) => (
          <li key={player._id} className="player-card">
            <div className="player-details">
              <img
                src={`http://localhost:5000/${player.image}`}
                alt={player.name}
                className="player-image"
              />
              <h3>{player.name}</h3>
              <p><strong>Role:</strong> {player.role}</p>
              <button onClick={() => toggleStats(player._id)}>
                {showStats[player._id] ? "Hide Stats" : "Show Stats"}
              </button>

              {showStats[player._id] && (
                <div className="player-stats">
                  <p><strong>Format:</strong> {player.format}</p>
                  <p><strong>Runs:</strong> {player.runs}</p>
                  <p><strong>Wickets:</strong> {player.wickets}</p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Players;
