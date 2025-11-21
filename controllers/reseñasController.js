const Review = require("../models/reviews");

// Obtener todas las reseñas
exports.obtenerReseñas = async (req, res) => {
  try {
    const reseñas = await Review.find();
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener todas las reseñas" });
  }
};

// Obtener reseñas por nombre de juego
exports.obtenerReseñasPorJuego = async (req, res) => {
  try {
    const reseñas = await Review.find({ gameName: req.params.gameName });
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener reseñas por juego" });
  }
};

// Crear nueva reseña
exports.crearReseña = async (req, res) => {
  try {
    console.log("Body recibido:", req.body);

    const gameName = String(req.body?.gameName ?? "").trim();
    const user = String(req.body?.user ?? "").trim();
    const comment = String(req.body?.comment ?? "").trim();
    const rating = Number(req.body?.rating);

    if (!gameName || !user || !comment || Number.isNaN(rating)) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const nuevaReseña = await Review.create({
      gameName,
      user,
      rating,
      comment,
      date: new Date()
    });

    return res.status(201).json(nuevaReseña);
  } catch (error) {
    console.error("Error al crear reseña:", error);
    return res.status(500).json({
      error: "Error al crear reseña",
      details: error.message
    });
  }
};

// Actualizar reseña existente
exports.actualizarReseña = async (req, res) => {
  try {
    const reseña = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(reseña);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar reseña" });
  }
};

// Eliminar reseña
exports.eliminarReseña = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Reseña eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar reseña" });
  }
};
