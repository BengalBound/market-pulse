const express = require('express');
const router = express.Router();
const { generateCounterCampaign } = require('../services/aiService');

// POST /api/ai/generate-ad
router.post('/generate-ad', async (req, res) => {
  try {
    const { competitorName, product, priceDropPercent, topComplaint, targetPlatform } = req.body;

    const result = await generateCounterCampaign({
      competitorName: competitorName || 'SoundWave Global',
      product: product || 'ApexPro ANC Headphones',
      priceDropPercent: priceDropPercent || 17.5,
      topComplaint: topComplaint || 'Left ear cup crackles; zero human customer service reply',
      targetPlatform: targetPlatform || 'Meta Ads (Instagram & Facebook)'
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

module.exports = router;
