import React, { useState, useEffect } from "react";
import axios from "axios";
import "./page.css"

const Admin = () => {
  const [players, setPlayers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    stats: "",
    format: "ODI",
    runs: "",
    wickets: "",
    role: "",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingPlayerId, setEditingPlayerId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPlayers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/players");
      setPlayers(response.data);
      setError("");
    } catch (error) {
      setError("Error fetching players. Please try again.");
      console.error("Error fetching players:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/players/${editingPlayerId}`, data);
        setSuccessMessage("Player updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/players", data);
        setSuccessMessage("Player added successfully!");
      }
      
      fetchPlayers();
      resetForm();
    } catch (error) {
      setError(error.response?.data?.message || "Error saving player. Please try again.");
      console.error("Error saving player:", error);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this player?")) return;
    
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/players/${id}`);
      setSuccessMessage("Player deleted successfully!");
      fetchPlayers();
    } catch (error) {
      setError("Error deleting player. Please try again.");
      console.error("Error deleting player:", error);
    }
    setIsLoading(false);
  };

  const handleEdit = (player) => {
    setFormData({
      name: player.name,
      stats: player.stats,
      format: player.format,
      runs: player.runs,
      wickets: player.wickets,
      role: player.role,
      image: null,
    });
    setIsEditing(true);
    setEditingPlayerId(player._id);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      stats: "",
      format: "ODI",
      runs: "",
      wickets: "",
      role: "",
      image: null,
    });
    setIsEditing(false);
    setEditingPlayerId(null);
  };

  return (
    <div className="admin-container">
      <h1>Cricket Player Management</h1>

      
      <form onSubmit={handleSubmit} className="player-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Player Name"
          required
          data-tooltip="Enter player's full name"
        />
        
        <select
          name="format"
          value={formData.format}
          onChange={handleInputChange}
          data-tooltip="Select match format"
        >
          <option value="ODI">ODI</option>
          <option value="T20">T20</option>
          <option value="Test">Test</option>
        </select>

        <input
          type="number"
          name="runs"
          value={formData.runs}
          onChange={handleInputChange}
          placeholder="Runs"
          required
          min="0"
          data-tooltip="Total runs scored"
        />

        <input
          type="number"
          name="wickets"
          value={formData.wickets}
          onChange={handleInputChange}
          placeholder="Wickets"
          required
          min="0"
          data-tooltip="Total wickets taken"
        />

        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          placeholder="Role (Batsman/Bowler)"
          required
          data-tooltip="Player's primary role"
        />

        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          data-tooltip="Upload player's photo"
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : isEditing ? "Update Player" : "Add Player"}
        </button>
      </form>

      <h2>Manage Players</h2>
      
      {isLoading && <div className="loading">Loading...</div>}
      
      
      <ul className="players-list">
        {players.map((player) => (
          <li key={player._id} className="player-card">
            <div className="player-details">
              <img
                src={`http://localhost:5000/${player.image}`}
                alt={player.name}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/120?text=No+Image";
                }}
              />
              <h3>{player.name}</h3>
              <p>Format: {player.format}</p>
              <p>Runs: {player.runs}</p>
              <p>Wickets: {player.wickets}</p>
              <p>Role: {player.role}</p>
              <div className="button-group">
                <button onClick={() => handleEdit(player)}>Edit</button>
                <button onClick={() => handleDelete(player._id)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;