const express = require("express");
const router = express.Router();
const Game = require("../models/game");

// GET: buscar todos los juegos
router.get("/", async (req, res) => {
  const games = await Game.find();
  res.json(games);
});

// POST: agregar un juego
router.post("/", async (req, res) => {
  const game = new Game(req.body);
  await game.save();
  res.json({ message: "Juego creado", game });
});

// PUT: editar un juego
router.put("/:id", async (req, res) => {
  const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(game);
});

// DELETE: eliminar un juego
router.delete("/:id", async (req, res) => {
  await Game.findByIdAndDelete(req.params.id);
  res.json({ message: "Juego eliminado" });
});

module.exports = router;
