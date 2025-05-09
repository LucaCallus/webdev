// Backend server file

const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let gameState = {
    money: 0,
    rate: 0,
    rates: [1, 0, 0, 0, 0, 0],
    cost: [10, 75, 100, 125, 150, 200],
    levels: [1, 0, 0, 0, 0, 0]
};

// Load game state
app.get("/gameState", (req, res) => {
    fs.readFile("gameState.json", "utf8", (err, data) => {
        if(err) return res.json(gameState); // fallback default
        res.json(JSON.parse(data));
    });
});

// Save game state
app.post("/gameState", (req, res) => {
    gameState = req.body; // update from frontend
    fs.writeFile("gameState.json", JSON.stringify(gameState, null, 2), err => {
        if(err) return res.status(500).send("Failed to save");
        res.sendStatus(200);
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});