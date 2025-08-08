const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
    unique: true,
  },
  event1Name: {
    type: String,
    required: true,
  },
  event1Partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    default: null,
  },
  event2Name: {
    type: String,
    required: true,
  },
  event2Partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    default: null,
  },
  ranking: {
    type: Number,
    default: null,
  },
});

module.exports = mongoose.model('Partner', partnerSchema);
