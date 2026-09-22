const express = require('express');
const router = express.Router();

// In-memory simulation of alert dispatch log
const alertLogs = [];

// POST /api/alerts/dispatch
router.post('/dispatch', (req, res) => {
  try {
    const { alertType, targetProduct, competitor, channels, message } = req.body;

    const dispatchRecord = {
      id: `dispatch-${Date.now()}`,
      alertType: alertType || 'PRICE_DROP_ALERT',
      targetProduct: targetProduct || 'All Monitored Items',
      competitor: competitor || 'Tracked Competitors',
      channels: channels || ['email', 'sms', 'webhook'],
      message: message || 'Price alert threshold exceeded.',
      dispatchedAt: new Date().toISOString(),
      deliveryStatus: {
        email: { status: 'Delivered', recipient: 'founder@sellerbrand.com', latencyMs: 142 },
        sms: { status: 'Delivered', recipient: '+1 (555) 019-2834', latencyMs: 310 },
        webhook: { status: '200 OK', endpoint: 'https://api.sellerbrand.com/webhooks/marketpulse', latencyMs: 88 }
      }
    };

    alertLogs.unshift(dispatchRecord);
    if (alertLogs.length > 20) alertLogs.pop();

    res.json({
      success: true,
      message: 'Alert successfully dispatched across configured channels',
      dispatchRecord
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/alerts/history
router.get('/history', (req, res) => {
  res.json({ success: true, count: alertLogs.length, logs: alertLogs });
});

module.exports = router;
