const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const gamesRouter = require("../controllers/juegosController");

// GET: buscar todos los juegos
router.get("/", async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los juegos" });
  }
});

// POST: agregar un juego
router.post("/", async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.json({ message: "Juego creado", game });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el juego" });
  }
});

// PUT: editar un juego
router.put("/:id", async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el juego" });
  }
});

// DELETE: eliminar un juego
router.delete("/:id", async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.json({ message: "Juego eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el juego" });
  }
});

module.exports = router;
