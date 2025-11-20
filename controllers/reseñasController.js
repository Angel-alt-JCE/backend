const { Router } = require("express");
const Review = require("../models/reviews");
const mongoose = require("mongoose");

// GET todas
exports.obtenerReseñas = async (req, res) => {
  try {
    const reseñas = await Review.find();
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener todas las reseñas" });
  }
};

// GET por juego
exports.obtenerReseñasPorJuego = async (req, res) => {
  try {
    const reseñas = await Review.find({ juegoId: req.params.juegoId });
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener reseñas por juego" });
  }
};

// POST crear
exports.crearReseña = async (req, res) => {
  try {
    console.log("Body recibido:", req.body);

    const { juegoId, user, rating, comment } = req.body;

    if (!juegoId || !user || rating == null || !comment) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const nuevaReseña = await Review.create({
      juegoId,
      user,
      rating,
      comment,
    });

    return res.status(201).json(nuevaReseña);
  } catch (error) {
    console.error("Error al crear reseña:", error);
    return res.status(500).json({
      error: "Error al crear reseña",
      details: error.message,
    });
  }
};

// PUT actualizar
exports.actualizarReseña = async (req, res) => {
  try {
    const reseña = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(reseña);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar reseña" });
  }
};

// DELETE
router.delete = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Reseña eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar reseña" });
  }
};
