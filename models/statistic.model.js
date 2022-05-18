const mongoose = require('mongoose');

const statisticSchema = new mongoose.Schema({
    playerName: { type: String, minlength: 4, maxlength: 35, required: true },
    position: { type: String, minlength: 4, maxlength: 35, required: true },
    matches: { type: Number, min: 0, required: true },
    goals: { type: Number, min: 0, required: true },
    assists: { type: Number, min: 0, required: true },
    stops: { type: Number, min: 0, required: true },
    penalities: { type: Number, min: 0, required: true },
  })

  module.exports = mongoose.model('Statistic', statisticSchema);