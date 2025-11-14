const express = require("express");
const router = express.Router();
const reseñasController = require("../controllers/reseñasController");

router.get("/", reseñasController.obtenerReseñas);
router.get("/juego/:juegoId", reseñasController.obtenerReseñasPorJuego);
router.post("/", reseñasController.crearReseña);
router.put("/:id", reseñasController.actualizarReseña);
router.delete("/:id", reseñasController.eliminarReseña);

module.exports = router;
