/**
 * MarketPulse Interactive 10-Slide Investor Pitch Deck
 * Built for pitching co-founders, angels, and seller partners
 */

window.MarketPitchDeck = (function() {
  const slides = [
    {
      id: 1,
      title: "1. Executive Vision",
      eyebrow: "SaaS Pitch Deck • Seed Opportunity",
      headline: "MarketPulse AI",
      subhead: "The Automated Market Intelligence & Counter-Campaign SaaS for E-Commerce Sellers.",
      contentHtml: `
        <div class="slide-grid-3">
          <div class="slide-card">
            <div class="slide-card-num">24/7</div>
            <div class="slide-card-title">Autonomous Monitoring</div>
            <div class="slide-card-body">Continuous tracking of competitor pricing shifts, review backlash, and supplier wholesale rebates.</div>
          </div>
          <div class="slide-card">
            <div class="slide-card-num">Instant</div>
            <div class="slide-card-title">Automated Counter-Strikes</div>
            <div class="slide-card-body">Turns raw competitor signals into ready-to-launch Meta, Google, and TikTok ad campaigns via LLMs.</div>
          </div>
          <div class="slide-card">
            <div class="slide-card-num">$199/mo</div>
            <div class="slide-card-title">High-LTV SaaS Model</div>
            <div class="slide-card-body">Recurring subscription targeting 4.8M+ active e-commerce brands on Shopify, Amazon, and TikTok Shop.</div>
          </div>
        </div>
      `,
      notes: "Open strong: Introduce MarketPulse as not just a passive scraping tool, but an actionable intelligence engine that directly protects margins and drives revenue."
    },
    {
      id: 2,
      title: "2. The Problem",
      eyebrow: "Pain Points in Modern E-Commerce",
      headline: "Sellers are Flying Blind & Reacting Weeks Too Late",
      subhead: "E-commerce is more brutal than ever. Manual market research costs thousands in lost profit.",
      contentHtml: `
        <div class="slide-grid-3">
          <div class="slide-card" style="border-color: rgba(244, 63, 94, 0.4);">
            <div class="slide-card-num" style="color: #f43f5e;">Blind Price Wars</div>
            <div class="slide-card-title">Competitors Slash Prices Overnight</div>
            <div class="slide-card-body">Brands lose buy-box ownership and ad spend efficiency without even knowing why conversions plummeted.</div>
          </div>
          <div class="slide-card" style="border-color: rgba(244, 63, 94, 0.4);">
            <div class="slide-card-num" style="color: #f43f5e;">Unmonitored Backlash</div>
            <div class="slide-card-title">Competitors Stumble Unnoticed</div>
            <div class="slide-card-body">When rival brands face shipping delays or product defects, sellers miss the golden window to steal market share.</div>
          </div>
          <div class="slide-card" style="border-color: rgba(244, 63, 94, 0.4);">
            <div class="slide-card-num" style="color: #f43f5e;">Supplier Disconnect</div>
            <div class="slide-card-title">Missing 20–35% Wholesale Rebates</div>
            <div class="slide-card-body">Supplier discounts slip through email noise while competitors renegotiate lower COGS.</div>
          </div>
        </div>
      `,
      notes: "Highlight the urgency: Today's sellers spend 10+ hours a week manually browsing competitor listings or paying bloated agencies that deliver outdated weekly PDFs."
    },
    {
      id: 3,
      title: "3. The Solution",
      eyebrow: "Continuous Automated Intelligence",
      headline: "From Signal to Ad Campaign in Seconds",
      subhead: "MarketPulse bridges the gap between raw data collection and revenue-generating execution.",
      contentHtml: `
        <div class="slide-grid-3">
          <div class="slide-card" style="border-color: rgba(0, 240, 255, 0.4);">
            <div class="slide-card-num" style="color: #00f0ff;">1. Scrape & Ingest</div>
            <div class="slide-card-title">Distributed Data Engine</div>
            <div class="slide-card-body">Anti-bot resilient crawlers log competitor pricing, Google reviews, and supplier wholesale drops into TimescaleDB.</div>
          </div>
          <div class="slide-card" style="border-color: rgba(139, 92, 246, 0.4);">
            <div class="slide-card-num" style="color: #c4b5fd;">2. Diff & Synthesize</div>
            <div class="slide-card-title">Automated Event Triggers</div>
            <div class="slide-card-body">Proprietary diff engine detects significant market shifts (>10% drop, negative review surges) and filters signal from noise.</div>
          </div>
          <div class="slide-card" style="border-color: rgba(16, 185, 129, 0.4);">
            <div class="slide-card-num" style="color: #10b981;">3. Counter-Strike</div>
            <div class="slide-card-title">Direct-Response AI Copy</div>
            <div class="slide-card-body">Google Gemini API converts competitor weak spots into punchy ad hooks, Meta creatives, and instant email/SMS alerts.</div>
          </div>
        </div>
      `,
      notes: "Emphasize our differentiator: Competitor software only shows boring charts. MarketPulse generates the exact ad copy and strategy to beat them."
    },
    {
      id: 4,
      title: "4. Live Interactive Prototype",
      eyebrow: "Product Demo",
      headline: "Tested, Working, & Built for Speed",
      subhead: "The platform you just saw live in this application is fully functional end-to-end.",
      contentHtml: `
        <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 24px;">
          <h4 style="font-size: 16px; font-weight: 700; color: #00f0ff; margin-bottom: 12px;">Validated Live Features:</h4>
          <ul style="list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; font-size: 13px;">
            <li>⚡ <strong>Live Market Pulse Feed:</strong> Aggregates high-impact events across catalog in real time.</li>
            <li>📊 <strong>30-Day TimescaleDB Visualizer:</strong> Interactive SVG curves with price diffing & margin math.</li>
            <li>💬 <strong>Google Reviews Sentiment Engine:</strong> Pulls competitor pain points like "slow shipping" or "ghost support".</li>
            <li>🤖 <strong>Instant Gemini AI Ad Generator:</strong> Converts competitor signals into high-converting Meta copy & Midjourney prompts.</li>
          </ul>
        </div>
      `,
      notes: "Offer to exit pitch mode at any moment to demonstrate live generation or chart interactions right on their screen."
    },
    {
      id: 5,
      title: "5. Core Feature Matrix",
      eyebrow: "The 4 Value Pillars",
      headline: "Engineered to Maximize Seller Margins",
      subhead: "Every module is designed to directly increase gross margin or protect ad ROAS.",
      contentHtml: `
        <div class="slide-grid-3">
          <div class="slide-card">
            <div class="slide-card-title" style="color: #00f0ff;">1. Price Change Alerts</div>
            <div class="slide-card-body">Customizable threshold percentage alerts dispatched via SMS, Email, and Webhooks within minutes of a competitor shift.</div>
          </div>
          <div class="slide-card">
            <div class="slide-card-title" style="color: #10b981;">2. Supplier Discount Radar</div>
            <div class="slide-card-body">Wholesale catalog monitoring identifying bulk discount windows to expand margins by 15% to 30%.</div>
          </div>
          <div class="slide-card">
            <div class="slide-card-title" style="color: #c4b5fd;">3. Competitor Review Tracker</div>
            <div class="slide-card-body">Google & Amazon review sentiment categorization extracting critical product flaws and customer complaints.</div>
          </div>
        </div>
      `,
      notes: "Explain that this bundle replaces 3 separate fragmented tools (a price scraper, a review tracker, and a copywriter)."
    },
    {
      id: 6,
      title: "6. Market Opportunity",
      eyebrow: "Total Addressable Market",
      headline: "A $4.2B Global Market Intelligence Opportunity",
      subhead: "Over 4.8 million active sellers across Shopify, Amazon, and WooCommerce need competitive intelligence.",
      contentHtml: `
        <div class="slide-grid-3">
          <div class="slide-card">
            <div class="slide-card-num">4.8M+</div>
            <div class="slide-card-title">Total Active Sellers (TAM)</div>
            <div class="slide-card-body">Shopify merchants + Amazon FBA brands operating in hyper-competitive consumer categories.</div>
          </div>
          <div class="slide-card">
            <div class="slide-card-num">350,000</div>
            <div class="slide-card-title">Target Core (SAM)</div>
            <div class="slide-card-body">Sellers doing between $250k and $5M in annual GMV who actively run paid Meta/Google ads.</div>
          </div>
          <div class="slide-card">
            <div class="slide-card-num">2,500 Brands</div>
            <div class="slide-card-title">Phase 1 Target (SOM)</div>
            <div class="slide-card-body">2,500 paying brands at $199/mo Pro Tier yields <strong>$6.0M ARR</strong>.</div>
          </div>
        </div>
      `,
      notes: "Highlight the unit economics: At just 1,000 subscribers on the $199 tier, the business hits $2.4M ARR with 85%+ gross margins."
    },
    {
      id: 7,
      title: "7. Business Model & SaaS Tiers",
      eyebrow: "Monetization Architecture",
      headline: "Predictable Tiered Recurring Revenue",
      subhead: "Subscription tiers structured around tracked URLs, scrape frequency, and AI prompt volume.",
      contentHtml: `
        <div class="slide-grid-3">
          <div class="slide-card">
            <div class="slide-card-num">$49<span style="font-size: 14px; color: #94a3b8;">/mo</span></div>
            <div class="slide-card-title">Starter Seller</div>
            <div class="slide-card-body">Up to 10 tracked products, daily scrape frequency, 30 AI ad generations/month. Low-friction entry tier.</div>
          </div>
          <div class="slide-card" style="border-color: #00f0ff; background: rgba(0, 240, 255, 0.05);">
            <div class="slide-card-num" style="color: #00f0ff;">$199<span style="font-size: 14px; color: #94a3b8;">/mo</span></div>
            <div class="slide-card-title">Growth Merchant (Core)</div>
            <div class="slide-card-body">Up to 100 products, hourly price checks, supplier discount radar, unlimited Gemini AI campaigns, SMS alerts.</div>
          </div>
          <div class="slide-card">
            <div class="slide-card-num">$499<span style="font-size: 14px; color: #94a3b8;">/mo</span></div>
            <div class="slide-card-title">Enterprise Brand</div>
            <div class="slide-card-body">Unlimited tracking, sub-15m scraping, custom private supplier scrapers, API access, multi-brand workspaces.</div>
          </div>
        </div>
      `,
      notes: "Our core revenue driver is the $199/mo Pro plan. Sellers spend $2,000 to $20,000/mo on ads, so $199 is an easy, no-brainer ROI calculation."
    },
    {
      id: 8,
      title: "8. Go-To-Market (GTM) Engine",
      eyebrow: "Customer Acquisition Strategy",
      headline: "Zero-Fluff Founder-Led Distribution",
      subhead: "Targeting high-intent e-commerce merchants with tangible, data-driven proof.",
      contentHtml: `
        <div class="slide-grid-3">
          <div class="slide-card">
            <div class="slide-card-num">Direct Outbound</div>
            <div class="slide-card-title">Free "Audit Reports"</div>
            <div class="slide-card-body">Send automated 1-page competitor teardowns to top Shopify stores showing recent price drops they missed.</div>
          </div>
          <div class="slide-card">
            <div class="slide-card-num">App Ecosystem</div>
            <div class="slide-card-title">Shopify App Store Listing</div>
            <div class="slide-card-body">1-click install for Shopify merchants with native sync of product catalog and automatic competitor detection.</div>
          </div>
          <div class="slide-card">
            <div class="slide-card-num">Partnerships</div>
            <div class="slide-card-title">E-Commerce Agency Revenue Share</div>
            <div class="slide-card-body">25% recurring rev-share for media buying agencies who use MarketPulse to manage client ad creative pivots.</div>
          </div>
        </div>
      `,
      notes: "Point out that cold outreach with real data (e.g. 'Your competitor dropped price by 18% yesterday, here is your counter-ad') achieves 40%+ reply rates."
    },
    {
      id: 9,
      title: "9. Technical Ownership & 50/50 Split",
      eyebrow: "Partnership Alignment",
      headline: "Clear Division of Responsibility",
      subhead: "A balanced partnership combining deep technical execution with aggressive market expansion.",
      contentHtml: `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          <div class="slide-card" style="border-color: rgba(0, 240, 255, 0.4);">
            <div class="slide-card-title" style="color: #00f0ff; font-size: 18px;">Technical Lead (Full-Stack & AI)</div>
            <ul style="list-style: none; margin-top: 12px; display: flex; flex-direction: column; gap: 8px; font-size: 13px; color: #cbd5e1;">
              <li>✓ Cloud infrastructure & TimescaleDB time-series engine</li>
              <li>✓ Anti-bot scraping pipelines (BrightData / Playwright)</li>
              <li>✓ Gemini API ad prompt engineering & fine-tuning</li>
              <li>✓ Stripe billing webhooks & multi-tenant auth</li>
              <li>✓ Ongoing product stability, uptime, and new features</li>
            </ul>
          </div>
          <div class="slide-card" style="border-color: rgba(139, 92, 246, 0.4);">
            <div class="slide-card-title" style="color: #c4b5fd; font-size: 18px;">Business & GTM Lead</div>
            <ul style="list-style: none; margin-top: 12px; display: flex; flex-direction: column; gap: 8px; font-size: 13px; color: #cbd5e1;">
              <li>✓ Seller customer discovery & beta cohort interviews</li>
              <li>✓ Outbound sales campaigns to Shopify brands</li>
              <li>✓ Agency partnership negotiations & rev-share</li>
              <li>✓ Content marketing, webinars, & e-commerce communities</li>
              <li>✓ Investor relations & fundraising execution</li>
            </ul>
          </div>
        </div>
      `,
      notes: "Be confident on alignment: A 50/50 equity split works when both founders carry equal weight with zero overlap—one owns the code and product, the other owns the distribution and sales."
    },
    {
      id: 10,
      title: "10. The Ask & 90-Day Roadmap",
      eyebrow: "Next Steps & Execution",
      headline: "Sprint to $25k MRR in 90 Days",
      subhead: "The prototype is complete. Here is the concrete roadmap to launch and revenue.",
      contentHtml: `
        <div class="slide-grid-3">
          <div class="slide-card">
            <div class="slide-card-num">Month 1</div>
            <div class="slide-card-title">Beta Cohort Validation</div>
            <div class="slide-card-body">Onboard 15 pilot e-commerce brands on free beta. Refine scraper accuracy and ad copy conversion rates.</div>
          </div>
          <div class="slide-card">
            <div class="slide-card-num">Month 2</div>
            <div class="slide-card-title">Paid Launch & Stripe Billing</div>
            <div class="slide-card-body">Turn on paid subscriptions. Target: 40 paying customers at $199/mo = <strong>$8,000 MRR</strong>.</div>
          </div>
          <div class="slide-card">
            <div class="slide-card-num">Month 3</div>
            <div class="slide-card-title">Shopify App & Agency Scale</div>
            <div class="slide-card-body">Launch public Shopify app and onboard 5 agency partners. Target: 125 paying brands = <strong>$25,000 MRR</strong>.</div>
          </div>
        </div>
      `,
      notes: "Close with conviction: 'The prototype is ready today. Let's align on terms, lock in the partnership, and start onboarding beta sellers next week.'"
    }
  ];

  let currentSlideIndex = 0;
  let showNotes = false;

  function init() {
    renderSlide();
    setupEventListeners();
  }

  function renderSlide() {
    const slide = slides[currentSlideIndex];
    if (!slide) return;

    // Update Header
    const titleEl = document.getElementById('pitch-current-title');
    const counterEl = document.getElementById('pitch-counter-display');
    const stageEl = document.getElementById('pitch-slide-stage');
    const notesEl = document.getElementById('pitch-notes-text');
    const dotsContainer = document.getElementById('pitch-nav-dots');

    if (titleEl) titleEl.textContent = slide.title;
    if (counterEl) counterEl.textContent = `Slide ${slide.id} of ${slides.length}`;
    if (notesEl) notesEl.textContent = slide.notes;

    // Render Slide Body
    if (stageEl) {
      stageEl.innerHTML = `
        <div class="slide-eyebrow">${slide.eyebrow}</div>
        <h2 class="slide-headline">${slide.headline}</h2>
        <p class="slide-subhead">${slide.subhead}</p>
        <div class="slide-body-content">${slide.contentHtml}</div>
      `;
    }

    // Render Navigation Dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((s, idx) => {
        const dot = document.createElement('div');
        dot.className = `pitch-dot ${idx === currentSlideIndex ? 'active' : ''}`;
        dot.title = s.title;
        dot.addEventListener('click', () => {
          currentSlideIndex = idx;
          renderSlide();
        });
        dotsContainer.appendChild(dot);
      });
    }
  }

  function nextSlide() {
    if (currentSlideIndex < slides.length - 1) {
      currentSlideIndex++;
      renderSlide();
    }
  }

  function prevSlide() {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      renderSlide();
    }
  }

  function toggleNotes() {
    showNotes = !showNotes;
    const notesDrawer = document.getElementById('pitch-speaker-notes');
    if (notesDrawer) {
      notesDrawer.style.display = showNotes ? 'block' : 'none';
    }
  }

  function openDeck(initialSlide = 0) {
    const modal = document.getElementById('pitch-modal');
    if (modal) {
      currentSlideIndex = initialSlide;
      renderSlide();
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDeck() {
    const modal = document.getElementById('pitch-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  function setupEventListeners() {
    const nextBtn = document.getElementById('pitch-next-btn');
    const prevBtn = document.getElementById('pitch-prev-btn');
    const closeBtn = document.getElementById('pitch-close-btn');
    const notesToggle = document.getElementById('pitch-speaker-notes-toggle');
    const pitchLaunchBtn = document.getElementById('btn-pitch-mode');

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (closeBtn) closeBtn.addEventListener('click', closeDeck);
    if (notesToggle) notesToggle.addEventListener('click', toggleNotes);
    if (pitchLaunchBtn) pitchLaunchBtn.addEventListener('click', () => openDeck(0));

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      const modal = document.getElementById('pitch-modal');
      const isVisible = modal && modal.style.display !== 'none';
      if (!isVisible) {
        if (e.key === 'p' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
          openDeck(0);
        }
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        closeDeck();
      } else if (e.key.toLowerCase() === 'n') {
        toggleNotes();
      }
    });
  }

  return {
    init,
    openDeck,
    closeDeck,
    nextSlide,
    prevSlide
  };
})();
