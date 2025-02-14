import React, { useState, useEffect } from "react";
import axios from "axios";

const Players = () => {
  const [players, setPlayers] = useState([]);

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

  return (
    <div className="players-container">
      <h1>Players List</h1>
      <ul className="players-list">
        {players.map((player) => (
          <li key={player._id} className="player-card">
            <div className="player-details">
              <img src={`http://localhost:5000/${player.image}`} alt={player.name} width="100" />
              <h3>{player.name}</h3>
              <p>{player.stats}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Players;
