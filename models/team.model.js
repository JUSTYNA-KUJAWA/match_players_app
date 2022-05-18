const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: { type: String, minlength: 5, maxlength: 35, required: true },
  country: { type: String, minlength: 5, maxlength: 35, required: true },
  playerName: { type: String, minlength: 4, maxlength: 35, required: true },
});

module.exports = mongoose.model('Team', teamSchema);