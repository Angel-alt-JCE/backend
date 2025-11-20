const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Rutas
const gamesRoutes = require('./routes/games');
const reviewsRoutes = require('./routes/reviews');

// Modelos
const Game = require('./models/game');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Ruta base para juegos
app.use("/api/games", gamesRoutes);

// 🔹 Ruta base para reseñas
app.use('/api/reviews', reviewsRoutes);

// 🔹 Endpoint principal (devuelve juegos)
app.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los juegos', details: error.message });
  }
});

// Conexión a MongoDB
const DB_URL = process.env.DB_URL || 
  "mongodb+srv://ovarossa:Password@cluster0.xchsapl.mongodb.net/games?retryWrites=true&w=majority";

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
