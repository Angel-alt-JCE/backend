const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },

  genre: { 
    type: String, 
    required: true,
    trim: true 
  },

  developer: { 
    type: String, 
    required: true,
    trim: true 
  },

  description: { 
    type: String, 
    required: true,
    trim: true 
  },

  imageSrc: { 
    type: String, 
    required: false,
    default: "" 
  },

  idGamer: { 
    type: String, 
    required: false,
    default: null 
  }
}, {
  timestamps: true // crea createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Game', gameSchema);
