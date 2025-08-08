const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { createPartner, getPartnerDetails } = require('../controllers/partner.controller');

router.post('/register', createPartner);
router.get('/partner-details',verifyToken , getPartnerDetails);

module.exports = router;


// http://locahost:5000/api/v2/partner/partner-details