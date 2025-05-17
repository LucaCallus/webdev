// Backend server file

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const {body , validationResult} = require("express-validator");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let gameState = {
    money: 0,
    rate: 0,
    hired: [0, 0, 0, 0, 0, 0],
    bought: [0, 0, 0, 0, 0],
    achievements: [0, 0, 0, 0]
};

const gameStateFilePath = path.join(__dirname, "gameState.json"); // construct file path dynamically

app.get("/", (req, res) => res.send("It works"));

// Load game state
app.get("/gameState", (req, res) => {
    fs.readFile(gameStateFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading gameState.json:", err);
            return res.json(gameState); // fallback default
        }
        try {
            res.json(JSON.parse(data));
        } catch (parseError) {
            console.error("Error parsing gameState.json:", parseError);
            res.json(gameState); // fallback default
        }
    });
});

// Save game state
app.post("/gameState", 
    [
        // Validation and Sanitisation
        body("money").isNumeric().withMessage("Money must be a number").toInt(),
        body("rate").isNumeric().withMessage("Rate must be a number").toInt(),
        body("hired").isArray().withMessage("Hired must be an array"),
        body("bought").isArray().withMessage("Bought must be an array"),
        body("achievements").isArray().withMessage("Achievements must be an array"),
    ],
    (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const newGameState = req.body;
        if (!newGameState || typeof newGameState !== "object"){
            return res.status(400).send("Invalid game state data");
        }
        gameState = newGameState;
        fs.writeFile(gameStateFilePath, JSON.stringify(gameState, null, 2), err => {
            if (err){
                console.error("Error saving gameState.json:", err);
                return res.status(500).send("Failed to save game state");
            }
            res.sendStatus(200);
        });

});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// on close - save