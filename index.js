const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Game = require('./models/game');
require('dotenv').config();

const app = express();
const port = 3000;

// 🔐 Recomendado: usar .env para guardar tu URL
const DB_URL = process.env.DB_URL || "mongodb+srv://ovarossa:Password@cluster0.xchsapl.mongodb.net/?appName=Cluster0";

app.use(cors());
app.use(express.json());

// ✅ Conexión a MongoDB
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// ✅ Obtener todos los juegos (desde MongoDB)
app.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los juegos', details: error.message });
  }
});

// ✅ Crear un nuevo juego
app.post('/games', async (req, res) => {
  try {
    const { name, genre, developer, description, imageSrc, idGamer } = req.body;
    const newGame = new Game({ name, genre, developer, description, imageSrc, idGamer });
    await newGame.save();
    res.status(201).json({ message: 'Juego agregado correctamente', game: newGame });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el juego', details: error.message });
  }
});

// ✅ Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
