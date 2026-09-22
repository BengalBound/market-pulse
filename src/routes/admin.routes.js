const express = require('express');
const router = express.Router();

// Seeded client workspaces for multi-tenant SaaS management
let clients = [
  {
    id: 'ws-101',
    brandName: 'AuraSound Audio DTC',
    slug: 'aurasound',
    ownerEmail: 'alex@aurasound.com',
    tier: 'Growth Merchant',
    monthlyPrice: 199,
    status: 'ACTIVE',
    trackedSkus: 24,
    skuLimit: 100,
    aiGenerationsUsed: 42,
    scrapeFrequency: 'Hourly',
    joinedDate: 'Sep 12, 2026',
    stripeCustomerId: 'cus_Q98aBc123'
  },
  {
    id: 'ws-102',
    brandName: 'ApexGrip Gaming Gear',
    slug: 'apexgrip',
    ownerEmail: 'mark@apexgrip.io',
    tier: 'Enterprise Brand',
    monthlyPrice: 499,
    status: 'ACTIVE',
    trackedSkus: 88,
    skuLimit: 500,
    aiGenerationsUsed: 184,
    scrapeFrequency: '15 Minutes',
    joinedDate: 'Sep 04, 2026',
    stripeCustomerId: 'cus_M44zYx789'
  },
  {
    id: 'ws-103',
    brandName: 'NordicThermal Drinkware',
    slug: 'nordicthermal',
    ownerEmail: 'sara@nordicthermal.store',
    tier: 'Starter Seller',
    monthlyPrice: 49,
    status: 'ACTIVE',
    trackedSkus: 8,
    skuLimit: 10,
    aiGenerationsUsed: 19,
    scrapeFrequency: 'Daily',
    joinedDate: 'Sep 18, 2026',
    stripeCustomerId: 'cus_L12kRt345'
  },
  {
    id: 'ws-104',
    brandName: 'VoltFlex Charging Co',
    slug: 'voltflex',
    ownerEmail: 'ken@voltflex.tech',
    tier: 'Growth Merchant',
    monthlyPrice: 199,
    status: 'ACTIVE',
    trackedSkus: 45,
    skuLimit: 100,
    aiGenerationsUsed: 88,
    scrapeFrequency: 'Hourly',
    joinedDate: 'Aug 29, 2026',
    stripeCustomerId: 'cus_V55pQw654'
  },
  {
    id: 'ws-105',
    brandName: 'LuxeGlow Beauty Labs',
    slug: 'luxeglow',
    ownerEmail: 'chloe@luxeglow.com',
    tier: 'Growth Merchant',
    monthlyPrice: 199,
    status: 'TRIALING',
    trackedSkus: 14,
    skuLimit: 100,
    aiGenerationsUsed: 12,
    scrapeFrequency: 'Hourly',
    joinedDate: 'Yesterday',
    stripeCustomerId: 'cus_T99xYz111'
  }
];

// GET /api/admin/clients
router.get('/clients', (req, res) => {
  try {
    const totalClients = clients.length;
    const activeClients = clients.filter(c => c.status === 'ACTIVE').length;
    const totalMrr = clients.reduce((acc, curr) => acc + (curr.status === 'ACTIVE' ? curr.monthlyPrice : 0), 0);
    const totalTrackedSkus = clients.reduce((acc, curr) => acc + curr.trackedSkus, 0);

    res.json({
      success: true,
      stats: {
        totalClients,
        activeClients,
        totalMrr: `$${totalMrr.toLocaleString()}`,
        arr: `$${(totalMrr * 12).toLocaleString()}`,
        totalTrackedSkus,
        avgMrrPerUser: `$${Math.round(totalMrr / activeClients)}`,
        systemHealth: '100% (Distributed Crawlers Operational)'
      },
      clients
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/admin/clients - Provision new client workspace
router.post('/clients', (req, res) => {
  try {
    const { brandName, ownerEmail, tier, customLimit, scrapeFrequency } = req.body;

    const tierPrices = {
      'Starter Seller': 49,
      'Growth Merchant': 199,
      'Enterprise Brand': 499
    };

    const selectedTier = tier || 'Growth Merchant';
    const price = tierPrices[selectedTier] || 199;
    const slug = (brandName || 'client').toLowerCase().replace(/[^a-z0-9]/g, '-');

    const newClient = {
      id: `ws-${Date.now()}`,
      brandName: brandName || 'New Merchant Workspace',
      slug,
      ownerEmail: ownerEmail || 'merchant@example.com',
      tier: selectedTier,
      monthlyPrice: price,
      status: 'ACTIVE',
      trackedSkus: 0,
      skuLimit: parseInt(customLimit) || (selectedTier === 'Starter Seller' ? 10 : selectedTier === 'Enterprise Brand' ? 500 : 100),
      aiGenerationsUsed: 0,
      scrapeFrequency: scrapeFrequency || (selectedTier === 'Enterprise Brand' ? '15 Minutes' : selectedTier === 'Starter Seller' ? 'Daily' : 'Hourly'),
      joinedDate: 'Today (Provisioned)',
      stripeCustomerId: `cus_${Math.random().toString(36).substring(2, 9)}`
    };

    clients.unshift(newClient);

    res.json({
      success: true,
      message: `Client workspace '${newClient.brandName}' provisioned successfully! Invite link generated.`,
      inviteUrl: `https://marketpulse.ai/invite/${newClient.slug}?token=mp_${Date.now()}`,
      client: newClient
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
