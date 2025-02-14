import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [players, setPlayers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    stats: "",
    image: null,
  });

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

    const data = new FormData();
    data.append("name", formData.name);
    data.append("stats", formData.stats);
    data.append("image", formData.image);

    try {
      await axios.post("http://localhost:5000/api/players", data);
      fetchPlayers();  // Refresh the player list
      setFormData({ name: "", stats: "", image: null });
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/players/${id}`);
      fetchPlayers();  // Refresh the player list
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  const handleEdit = (player) => {
    setFormData({
      name: player.name,
      stats: player.stats,
      image: null, // You can add functionality to update the image if needed
    });
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit} className="player-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Player Name"
          required
        />
        <input
          type="text"
          name="stats"
          value={formData.stats}
          onChange={handleInputChange}
          placeholder="Player Stats"
          required
        />
        <input type="file" onChange={handleImageChange} required />
        <button type="submit">Add Player</button>
      </form>

      <h2>Manage Players</h2>
      <ul className="players-list">
        {players.map((player) => (
          <li key={player._id} className="player-card">
            <div className="player-details">
              <img src={`http://localhost:5000/${player.image}`} alt={player.name} width="100" />
              <h3>{player.name}</h3>
              <p>{player.stats}</p>
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
