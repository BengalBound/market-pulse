const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./src/config/config');

const pulseRoutes = require('./src/routes/pulse.routes');
const pricingRoutes = require('./src/routes/pricing.routes');
const reviewsRoutes = require('./src/routes/reviews.routes');
const suppliersRoutes = require('./src/routes/suppliers.routes');
const aiRoutes = require('./src/routes/ai.routes');
const alertsRoutes = require('./src/routes/alerts.routes');
const tiersRoutes = require('./src/routes/tiers.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static assets
app.use(express.static(path.join(__dirname, 'public')));

// Health endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    aiMode: config.hasLiveGemini ? 'Gemini 1.5 Flash (Live)' : 'Smart Contextual Engine (Mock / Zero-Latency Pitch Mode)'
  });
});

// API Routes
app.use('/api/pulse', pulseRoutes);
app.use('/api/competitors/pricing', pricingRoutes);
app.use('/api/reviews/tracker', reviewsRoutes);
app.use('/api/suppliers/discounts', suppliersRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/subscriptions/tiers', tiersRoutes);

// Fallback to index.html for SPA client navigation
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
const server = app.listen(config.port, () => {
  console.log(`
================================================================
🚀 MarketPulse AI - Pitch & Prototype Platform Online!
📡 Server running at: http://localhost:${config.port}
🤖 AI Generation Mode: ${config.hasLiveGemini ? 'Live Gemini 1.5' : 'Smart Contextual Heuristic Engine'}
📊 Pitch Deck & Dashboard: http://localhost:${config.port}/#pitch
================================================================
  `);
});

module.exports = { app, server };
