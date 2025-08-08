const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Event', eventSchema);
