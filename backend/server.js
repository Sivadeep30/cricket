const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Setup MongoDB connection
mongoose.connect("mongodb+srv://sivadeep:sivadeep@cluster0.2q6ww.mongodb.net/cricdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Multer Setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/"); // Save images to the 'assets' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage });

// Player Schema
const playerSchema = new mongoose.Schema({
  name: String,
  stats: String,
  image: String, // Store only the filename (e.g., '1739554402984.svg')
});

const Player = mongoose.model("Player", playerSchema);

// Routes
// Fetch all players
app.get("/api/players", async (req, res) => {
  try {
    const players = await Player.find();
    // For each player, prepend the "assets/" folder to the image path
    const playersWithFullImagePath = players.map(player => ({
      ...player._doc,
      image: `assets/${player.image}`
    }));
    res.json(playersWithFullImagePath);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a player
app.post("/api/players", upload.single("image"), async (req, res) => {
  const { name, stats } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const player = new Player({
      name,
      stats,
      image,
    });

    await player.save();
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a player
app.delete("/api/players/:id", async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json({ message: "Player deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Static folder for images
app.use("/assets", express.static("assets"));

// Start the server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
