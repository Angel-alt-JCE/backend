const Game = require("../models/game");

// GET todos los juegos
exports.obtenerJuegos = async (req, res) => {
  const juegos = await Game.find();
  res.json(juegos);
};

// GET juego por ID
exports.obtenerJuego = async (req, res) => {
  const juego = await Game.findById(req.params.id);
  res.json(juego);
};

// POST crear juego
exports.crearJuego = async (req, res) => {
  const nuevoJuego = new Game(req.body);
  await nuevoJuego.save();
  res.json(nuevoJuego);
};

// PUT actualizar juego
exports.actualizarJuego = async (req, res) => {
  const juego = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(juego);
};

// DELETE borrar juego
exports.eliminarJuego = async (req, res) => {
  await Game.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Juego eliminado" });
};
