const Partner = require('../models/tbl_partner.model.js');

const getAdminDashboard = async (req, res) => {
  try {
    const teams = await Partner.find()
      .populate("event1Partner", "name")
      .populate("event2Partner", "name");

    const formattedTeams = teams.map((team) => ({
      _id: team._id,
      partner1Name: team.event1Partner?.name || "N/A",
      partner2Name: team.event2Partner?.name || "N/A",
    }));

    res.status(200).json(formattedTeams);
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const updateRankings = async (req, res) => {
  try {
    const { rankings } = req.body;

    // Loop through each ranking update
    for (const item of rankings) {
      await Partner.findByIdAndUpdate(item.id, { ranking: item.ranking });
    }

    res.status(200).json({ success: true, message: "Rankings updated successfully" });
  } catch (err) {
    console.error("Error updating rankings:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { 

    getAdminDashboard,
    updateRankings

};
