const express = require('express');
const router = express.Router();
const { getAdminDashboard } = require('../controllers/admin.controller');
const { updateRankings } = require('../controllers/admin.controller');

// GET all teams for admin dashboard
router.get('/admin-dashboard', getAdminDashboard);

// POST to update rankings
router.post('/admin-dashboard/update-rankings', updateRankings);

module.exports = router;
