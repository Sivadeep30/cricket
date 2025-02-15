const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://sivadeep:sivadeep@cluster0.2q6ww.mongodb.net/cricdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const playerSchema = new mongoose.Schema({
  name: String,
  format: String, // ODI, T20, or Test
  runs: String,
  wickets: String,
  role: String, // Batsman, Bowler, All-Rounder
  image: String,
});

const Player = mongoose.model("Player", playerSchema);

app.get("/api/players", async (req, res) => {
  try {
    const players = await Player.find();
    const playersWithFullImagePath = players.map(player => ({
      ...player._doc,
      image: `assets/${player.image}`
    }));
    res.json(playersWithFullImagePath);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/players", upload.single("image"), async (req, res) => {
  const { name, format, runs, wickets, role } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const player = new Player({
      name,
      format,
      runs,
      wickets,
      role,
      image,
    });

    await player.save();
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/players/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, format, runs, wickets, role } = req.body;
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });

    if (req.file) {
      if (player.image) {
        fs.unlinkSync(path.join(__dirname, "assets", player.image));
      }
      player.image = req.file.filename;
    }

    player.name = name;
    player.format = format;
    player.runs = runs;
    player.wickets = wickets;
    player.role = role;

    await player.save();
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/players/:id", async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });

    if (player.image) {
      fs.unlinkSync(path.join(__dirname, "assets", player.image));
    }

    res.json({ message: "Player deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use("/assets", express.static("assets"));

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
