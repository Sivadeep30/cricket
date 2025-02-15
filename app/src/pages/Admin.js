import React, { useState, useEffect } from "react";
import axios from "axios";
import "./page.css"
const Admin = () => {
  const [players, setPlayers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    stats: "",
    format: "ODI", // Default format
    runs: "",
    wickets: "",
    role: "",
    image: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingPlayerId, setEditingPlayerId] = useState(null);

  // Fetch players
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

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file input
  const handleImageChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  // Handle form submit (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("stats", formData.stats);
    data.append("format", formData.format);
    data.append("runs", formData.runs);
    data.append("wickets", formData.wickets);
    data.append("role", formData.role);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (isEditing) {
        // Update player
        await axios.put(`http://localhost:5000/api/players/${editingPlayerId}`, data);
        setIsEditing(false);
        setEditingPlayerId(null);
      } else {
        // Add new player
        await axios.post("http://localhost:5000/api/players", data);
      }
      fetchPlayers();
      setFormData({ name: "", stats: "", format: "ODI", runs: "", wickets: "", role: "", image: null });
    } catch (error) {
      console.error("Error saving player:", error);
    }
  };

  // Handle delete player
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/players/${id}`);
      fetchPlayers();
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  // Handle edit player
  const handleEdit = (player) => {
    setFormData({
      name: player.name,
      stats: player.stats,
      format: player.format,
      runs: player.runs,
      wickets: player.wickets,
      role: player.role,
      image: null, // Keeping image null to avoid re-uploading it
    });
    setIsEditing(true);
    setEditingPlayerId(player._id);
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit} className="player-form">
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Player Name" required />
        
        <select name="format" value={formData.format} onChange={handleInputChange}>
          <option value="ODI">ODI</option>
          <option value="T20">T20</option>
          <option value="Test">Test</option>
        </select>

        <input type="number" name="runs" value={formData.runs} onChange={handleInputChange} placeholder="Runs" required />
        <input type="number" name="wickets" value={formData.wickets} onChange={handleInputChange} placeholder="Wickets" required />
        <input type="text" name="role" value={formData.role} onChange={handleInputChange} placeholder="Role (Batsman/Bowler)" required />

        <input type="file" onChange={handleImageChange} />
        <button type="submit">{isEditing ? "Update Player" : "Add Player"}</button>
      </form>

      <h2>Manage Players</h2>
      <ul className="players-list">
        {players.map((player) => (
          <li key={player._id} className="player-card">
            <div className="player-details">
              <img src={`http://localhost:5000/${player.image}`} alt={player.name} width="100" />
              <h3>{player.name}</h3>
              <p>Format: {player.format}</p>
              <p>Runs: {player.runs}</p>
              <p>Wickets: {player.wickets}</p>
              <p>Role: {player.role}</p>
              <button onClick={() => handleEdit(player)}>Edit</button>
              <button onClick={() => handleDelete(player._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
