const express = require('express');
const router = express.Router();
const mockData = require('../data/mockData.json');

// GET /api/reviews/tracker
router.get('/', (req, res) => {
  try {
    const reviews = mockData.competitorReviews;
    const totalReviews = reviews.length;
    const criticalCount = reviews.filter(r => r.sentiment.includes('Critical')).length;
    const avgRating = (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1);

    // Aggregate pain point tags
    const painPointsMap = {};
    reviews.forEach(r => {
      r.extractedPainPoints.forEach(p => {
        painPointsMap[p] = (painPointsMap[p] || 0) + 1;
      });
    });

    const topPainPoints = Object.entries(painPointsMap)
      .map(([point, count]) => ({ point, count }))
      .sort((a, b) => b.count - a.count);

    res.json({
      success: true,
      stats: {
        totalReviewsAnalyzed: totalReviews,
        averageCompetitorRating: Number(avgRating),
        criticalNegativeComplaints: criticalCount,
        negativeReviewVelocity: '+38% vs last week'
      },
      topPainPoints,
      reviews
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
