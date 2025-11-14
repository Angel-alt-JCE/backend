const reviews = require("../models/reviews");

exports.obtenerReseñas = async (req, res) => {
  try {
    const reseñas = await Review.find();
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener todas las reseñas" });
  }
};

exports.obtenerReseñasPorJuego = async (req, res) => {
  try {
    const reseñas = await Review.find({ juegoId: req.params.juegoId });
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener reseñas por juego" });
  }
};

exports.crearReseña = async (req, res) => {
  try {
    const nuevaReseña = new Review(req.body);
    await nuevaReseña.save();
    res.json(nuevaReseña);
  } catch (error) {
    res.status(500).json({ error: "Error al crear reseña" });
  }
};

exports.actualizarReseña = async (req, res) => {
  try {
    const reseña = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(reseña);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar reseña" });
  }
};

exports.eliminarReseña = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Reseña eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar reseña" });
  }
};
