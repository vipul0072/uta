const jwt = require('jsonwebtoken');
const Player = require('../models/tbl_player.model.js');
const Partner = require('../models/tbl_partner.model.js'); // Add this line to top


// JWT
const JWT_SECRET = process.env.JWT_SECRET ; 

// Register a player
const registerPlayer = async (req, res) => {
  const { name, whatsappNumber, dob, city, tShirtSize, shortSize, food, stay } = req.body;

  try {
    const existingPlayer = await Player.findOne({ whatsappNumber });

    if (existingPlayer) {
      return res.status(200).json({
        existPlayer: true,
        message: "Player already registered.",
        player: existingPlayer, // optional if needed for login or reuse
      });
    }

    const newPlayer = await Player.create({
      name,
      whatsappNumber,
      dob: new Date(dob),
      city,
      tShirtSize,
      shortSize,
      food,
      stay,
    });

    // Generate a JWT token for the new player
    const token = jwt.sign({ id: newPlayer._id }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(201).json({
      existPlayer: false,
      message: "Player registered successfully.",
      player: newPlayer,
      token, // Send the JWT token with the response
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
};


// Login Player


const loginPlayer = async (req, res) => {
  const { whatsappNumber, dob } = req.body;

  const player = await Player.findOne({ whatsappNumber });
  if (!player) {
    return res.status(404).json({ message: "Player not found" });
  }

  const inputDOB = dob;
  const storedDOB = new Date(player.dob).toISOString().split('T')[0];

  if (inputDOB !== storedDOB) {
    return res.status(401).json({ message: "Incorrect DOB" });
  }

  const token = jwt.sign({ id: player._id }, JWT_SECRET, { expiresIn: '7d' });

  // 👇 change key from player to user
  res.status(200).json({ message: "Login successful", token, user: player });
};



  // Get player
  const getPlayers = async (req, res) => {
  const { playerId } = req.query;

  if (!playerId) {
    return res.status(400).json({ message: "Player ID is required" });
  }

  try {
    const players = await Player.find({ _id: { $ne: playerId } }); // Exclude current player
    res.status(200).json({ data: players });
  } catch (error) {
    console.error("Error fetching players:", error.message);
    res.status(500).json({ message: "Failed to fetch players", error: error.message });
  }
};

// get all player

const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json({ data: players }); // ✅ To match frontend expectations
  } catch (err) {
    console.error('Failed to fetch players:', err);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
};

// Get Player details in user-detail component

const getPlayerDetails = async (req, res) => {
  try{
    const player = await Player.findById(req.user.id || req.user._id || req.user);

    if(!player) return res.status(404).json({message: "Player not found"});
    res.status(200).json(player);
  }catch(err){
    res.status(500).json({message: "Failed to fetch player details", error: err.message});
  }
}

  // update
  // Add to player.controller.js
const getUpdateDetails = async (req, res) => {
  try {
    const { playerId } = req.params;
    const player = await Player.findById(playerId);
    const partner = await Partner.findOne({ playerId });

    if (!player) return res.status(404).json({ message: "Player not found" });

    res.status(200).json({
      ...player.toObject(),
      event1: partner?.event1?.eventName || "",
      partner1: partner?.event1?.partnerName || "",
      event2: partner?.event2?.eventName || "",
      partner2: partner?.event2?.partnerName || "",
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch player details", error: err.message });
  }
};



const getPlayerAndPartnerDetails = async (req, res) => {
  try {
    const { playerId } = req.params;

    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    const partner = await Partner.findOne({ playerId })
      .populate('event1Partner', 'name whatsappNumber')
      .populate('event2Partner', 'name whatsappNumber');

      return res.status(200).json({
        _id: player._id,
        name: player.name,
        whatsappNumber: player.whatsappNumber,
        dob: player.dob,
        city: player.city,
        tShirtSize: player.tShirtSize,
        shortSize: player.shortSize,
        food: player.food,
        stay: player.stay,
        ranking: partner?.ranking || null, // ✅ get ranking from Partner model
        event1: partner && partner.event1Name
          ? {
              eventName: partner.event1Name,
              partner: partner.event1Partner || null,
            }
          : null,
        event2: partner && partner.event2Name
          ? {
              eventName: partner.event2Name,
              partner: partner.event2Partner || null,
            }
          : null,
      });
      
  } catch (err) {
    console.error("Error in getPlayerAndPartnerDetails:", err);
    return res.status(500).json({ message: "Failed to fetch player and partner details", error: err.message });
  }
};



const updatePlayerAndPartner = async (req, res) => {
  try {
    const { playerId } = req.params;
    const {
      name, whatsappNumber, dob, city, tShirtSize, shortSize, food, stay,
      event1Name, event1Partner, event2Name, event2Partner,
    } = req.body;

    // 1. Update Player personal info
    await Player.findByIdAndUpdate(playerId, {
      name, whatsappNumber, dob, city, tShirtSize, shortSize, food, stay,
    });

    // 2. Handle Partner document (create or update)
    let partnerDoc = await Partner.findOne({ playerId });

    if (!partnerDoc) {
      partnerDoc = new Partner({ playerId });
    }

    partnerDoc.event1Name = event1Name;
    partnerDoc.event1Partner = event1Partner || null;

    partnerDoc.event2Name = event2Name;
    partnerDoc.event2Partner = event2Partner || null;

    await partnerDoc.save();

    // 3. Mutual linking for partner1
    if (event1Partner) {
      let partner1Doc = await Partner.findOne({ playerId: event1Partner });
      if (!partner1Doc) partner1Doc = new Partner({ playerId: event1Partner });

      partner1Doc.event1Name = event1Name;
      partner1Doc.event1Partner = playerId;
      await partner1Doc.save();
    }

    // 4. Mutual linking for partner2
    if (event2Partner) {
      let partner2Doc = await Partner.findOne({ playerId: event2Partner });
      if (!partner2Doc) partner2Doc = new Partner({ playerId: event2Partner });

      partner2Doc.event2Name = event2Name;
      partner2Doc.event2Partner = playerId;
      await partner2Doc.save();
    }

    res.status(200).json({ message: "Player and partner info updated successfully." });

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error while updating details.", error: error.message });
  }
};


module.exports = {
    registerPlayer,
    getPlayers,
    loginPlayer,
    getPlayerDetails,
    getUpdateDetails,
    getPlayerAndPartnerDetails,
    getAllPlayers,
    updatePlayerAndPartner
}
