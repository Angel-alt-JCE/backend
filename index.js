const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const gamesRouter = require('./routes/games');


const Game = require('./models/game');


const gamesRoutes = require('./routes/games');     
const reviewsRoutes = require('./routes/reviews'); 

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


app.use("/api/games", gamesRouter);    
app.use('/api/reviews', reviewsRoutes); 

app.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los juegos', details: error.message });
  }
});


const DB_URL = process.env.DB_URL || "mongodb+srv://ovarossa:Password@cluster0.xchsapl.mongodb.net/?appName=Cluster0";

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));


app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
