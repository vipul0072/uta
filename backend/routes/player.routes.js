const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/authMiddleware');


const { registerPlayer, getPlayers, loginPlayer, getPlayerDetails, getPlayerAndPartnerDetails, getAllPlayers , updatePlayerAndPartner} = require('../controllers/player.controller');

router.post('/register', registerPlayer);
router.get('/detail', getPlayers);
router.get('/all', getAllPlayers);
router.post('/login-player', loginPlayer);
router.get('/player-details/:playerId',verifyToken ,getPlayerDetails);
router.get('/partner/details/:playerId', getPlayerAndPartnerDetails);
router.put("/partner/update-details/:playerId", updatePlayerAndPartner);

// router.get('/partner/update-details/:playerId',verifyToken, updatePlayerAndPartnerDetails); // update

module.exports = router;


// http://localhost:5000/api/v1/player/partner/update-details/:playerId