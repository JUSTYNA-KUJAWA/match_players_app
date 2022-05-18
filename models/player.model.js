const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  id: { type: Number },
  playerName: { type: String, minlength: 4, maxlength: 35, required: true },
  teamName: { type: String, required: true },
  season: { type: Number, min: 2000, max: 3000, required: true },
  age: { type: Number, min: 16, max: 50, required: true },
  playerNumber: { type: Number, min: 1, max: 99, required: true },
  position: { type: String, required: true },
  image: { type: String, required: true },
  });

module.exports = mongoose.model('Player', playerSchema);