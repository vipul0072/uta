const Partner = require('../models/tbl_partner.model.js');
const Player = require('../models/tbl_player.model.js'); // Make sure this is added


// POST /api/v2/partner
const createPartner = async (req, res) => {
  try {
    const { playerId, event1Name, event1Partner, event2Name, event2Partner } = req.body;

    // Validate required fields
    if (!event1Name || !event2Name) {
      return res.status(400).json({ message: "Both event1Name and event2Name are required." });
    }

    // Create new partner document exactly matching schema fields
    const newPartner = new Partner({
      playerId,
      event1Name,
      event1Partner: event1Partner || null,
      event2Name,
      event2Partner: event2Partner || null,
    });

    await newPartner.save();

    res.status(201).json({ message: "Partner registered successfully", data: newPartner });
  } catch (error) {
    console.error("Error in partner registration:", error.message);
    res.status(500).json({ message: "Server error during partner registration" });
  }
};




// GET /api/v2/partner/details
const getPartnerDetails = async (req, res) => {
  try {
    const partnerDoc = await Partner.findOne({ playerId: req.user.id })
      .populate("event1Partner", "name")
      .populate("event2Partner", "name");

    const player = await Player.findById(req.user.id);

    if (!partnerDoc || !player) {
      return res.status(404).json({ message: "Player or Partner details not found" });
    }

    res.status(200).json({
      ...player.toObject(),
      event1: {
        eventName: partnerDoc.event1Name,
        partnerName: partnerDoc.event1Partner?.name || "N/A",
      },
      event2: {
        eventName: partnerDoc.event2Name,
        partnerName: partnerDoc.event2Partner?.name || "N/A",
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch player details", error: err.message });
  }
};


// update
const updatePartner = async (req, res) => {
  try {
    const { playerId } = req.params;
    const { event1Partner, event2Partner } = req.body;

    // Build update object dynamically
    const update = {};
    if (event1Partner !== undefined) update.event1Partner = event1Partner;
    if (event2Partner !== undefined) update.event2Partner = event2Partner;

    const updatedPartner = await Partner.findOneAndUpdate(
      { playerId },             // find by playerId
      { $set: update },         // update specified fields
      { new: true }             // return the updated document
    ).populate('event1Partner event2Partner');

    if (!updatedPartner) {
      return res.status(404).json({ message: 'Partner record not found' });
    }

    res.status(200).json(updatedPartner);
  } catch (error) {
    console.error('Error updating partner:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  createPartner,
  getPartnerDetails,
  updatePartner
};
