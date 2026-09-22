const express = require('express');
const router = express.Router();
const mockData = require('../data/mockData.json');

// GET /api/pulse
router.get('/', (req, res) => {
  try {
    const pulse = mockData.marketPulse;
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      pulse
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
