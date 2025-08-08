const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  whatsappNumber:{
    type: String,
    required: true,
  },
  dob:{
    type: Date,
    required: true,
  },
  city:{
    type: String,
    required: true,
  },
  tShirtSize:{
    type: String,
    required: true,
  },
  shortSize:{
    type: String,
    required: true,
  },
  food:{
    type: String,
    required: true,
  },
  stay:{
    type: String,
    required: true, 
  }
});

// name || !whatsappNumber || !dob || !city || !tShirtSize || !shortSize || !food || !stay


module.exports = mongoose.model('Player', playerSchema);