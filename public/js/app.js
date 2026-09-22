/**
 * MarketPulse AI — Core Frontend Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // App State
  const state = {
    activeTab: 'tab-pulse',
    pricingData: [],
    selectedProductIndex: 0,
    reviewsData: null,
    suppliersData: [],
    pulseData: null,
    tiersData: [],
    lastGeneratedAd: null
  };

  // DOM Elements
  const tabButtons = document.querySelectorAll('.nav-tab');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const toastContainer = document.getElementById('toast-container');

  // Initialize
  initApp();

  async function initApp() {
    setupTabNavigation();
    setupAlertModal();
    if (window.MarketPitchDeck) {
      window.MarketPitchDeck.init();
    }

    // Check backend health & AI engine mode
    checkHealth();

    // Load API data
    await Promise.all([
      loadPulseData(),
      loadPricingData(),
      loadReviewsData(),
      loadSuppliersData(),
      loadTiersData()
    ]);

    setupQuickActions();
    setupAiForm();

    // Check URL hash for direct tab / pitch mode navigation
    const hash = window.location.hash.replace('#', '');
    if (hash === 'pitch') {
      if (window.MarketPitchDeck) window.MarketPitchDeck.openDeck(0);
    } else if (hash && document.getElementById(`tab-${hash}`)) {
      switchTab(`tab-${hash}`);
    }
  }

  // Toast Notification System
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    const icon = type === 'success' ? '✓' : type === 'alert' ? '⚠' : 'ℹ';
    toast.innerHTML = `<span style="font-weight: 700; color: #00f0ff;">${icon}</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 3500);
  }

  // Health Check
  async function checkHealth() {
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      const label = document.getElementById('ai-mode-label');
      if (label && data.aiMode) {
        label.textContent = data.aiMode.includes('Live') ? 'Gemini 1.5 Flash (Live)' : 'MarketPulse Smart Engine (Instant)';
      }
    } catch (err) {
      console.warn('Backend health check warning:', err.message);
    }
  }

  // Tab Navigation
  function setupTabNavigation() {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTabId = btn.getAttribute('data-tab');
        switchTab(targetTabId);
      });
    });

    const logoBtn = document.getElementById('brand-logo-btn');
    if (logoBtn) {
      logoBtn.addEventListener('click', () => switchTab('tab-pulse'));
    }
  }

  function switchTab(tabId) {
    state.activeTab = tabId;

    tabButtons.forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    tabPanes.forEach(pane => {
      if (pane.id === tabId) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    // Refresh charts if pricing tab is opened
    if (tabId === 'tab-pricing' && state.pricingData.length > 0) {
      setTimeout(() => renderActiveProductPricing(), 50);
    }

    window.location.hash = tabId.replace('tab-', '');
  }

  // 1. Load Market Pulse Data
  async function loadPulseData() {
    try {
      const res = await fetch('/api/pulse');
      const data = await res.json();
      if (!data.success) return;

      state.pulseData = data.pulse;
      const stats = data.pulse.stats;

      // Update KPI metrics
      const compEl = document.getElementById('stat-competitors');
      const alertsEl = document.getElementById('stat-alerts');
      const arbEl = document.getElementById('stat-arbitrage');
      const weakEl = document.getElementById('stat-weaknesses');

      if (compEl) compEl.textContent = `${stats.trackedCompetitors} Brands`;
      if (alertsEl) alertsEl.textContent = `${stats.activePriceAlerts} Drops (>15%)`;
      if (arbEl) arbEl.textContent = stats.potentialProfitBoost;
      if (weakEl) weakEl.textContent = `${stats.criticalReviewSpikes} Backlash Spikes`;

      // Render recent events feed
      const feedContainer = document.getElementById('pulse-events-list');
      if (feedContainer && data.pulse.recentEvents) {
        feedContainer.innerHTML = '';
        data.pulse.recentEvents.forEach(evt => {
          const item = document.createElement('div');
          item.className = 'event-feed-item';

          let iconClass = 'price-drop';
          let iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>`;

          if (evt.type === 'SUPPLIER_DISCOUNT') {
            iconClass = 'supplier-discount';
            iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>`;
          } else if (evt.type === 'REVIEW_WEAKNESS') {
            iconClass = 'review-weakness';
            iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`;
          } else if (evt.type === 'PRICE_SPIKE') {
            iconClass = 'price-spike';
            iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>`;
          }

          item.innerHTML = `
            <div class="event-badge-icon ${iconClass}">${iconSvg}</div>
            <div class="event-body">
              <div class="event-topline">
                <span class="event-entity">${evt.competitor || evt.supplier}</span>
                <span class="event-time">${evt.timestamp}</span>
              </div>
              <div class="event-detail">${evt.detail}</div>
              <div class="event-action-hint">⚡ Action: ${evt.actionRecommended}</div>
            </div>
          `;
          feedContainer.appendChild(item);
        });
      }
    } catch (err) {
      console.error('Error loading pulse data:', err);
    }
  }

  // 2. Load Competitor Pricing Data
  async function loadPricingData() {
    try {
      const res = await fetch('/api/competitors/pricing');
      const data = await res.json();
      if (!data.success) return;

      state.pricingData = data.products;
      renderProductChips();
      renderActiveProductPricing();
    } catch (err) {
      console.error('Error loading pricing data:', err);
    }
  }

  function renderProductChips() {
    const container = document.getElementById('product-chips-container');
    if (!container) return;

    container.innerHTML = '';
    state.pricingData.forEach((item, index) => {
      const chip = document.createElement('div');
      chip.className = `product-chip ${index === state.selectedProductIndex ? 'active' : ''}`;
      const changeClass = item.competitor.priceChangePercent < 0 ? 'drop' : 'spike';
      const changeSign = item.competitor.priceChangePercent > 0 ? '+' : '';

      chip.innerHTML = `
        <div class="chip-category">${item.category}</div>
        <div class="chip-name" title="${item.name}">${item.name}</div>
        <div class="chip-price-row">
          <span class="chip-price">$${item.competitor.currentPrice.toFixed(2)}</span>
          <span class="chip-change ${changeClass}">${changeSign}${item.competitor.priceChangePercent}%</span>
        </div>
      `;

      chip.addEventListener('click', () => {
        state.selectedProductIndex = index;
        renderProductChips();
        renderActiveProductPricing();
      });

      container.appendChild(chip);
    });
  }

  function renderActiveProductPricing() {
    const product = state.pricingData[state.selectedProductIndex];
    if (!product) return;

    // Header labels
    const chartTitle = document.getElementById('active-product-chart-title');
    const chartSub = document.getElementById('active-product-chart-sub');
    if (chartTitle) chartTitle.textContent = `${product.name} (Competitor: ${product.competitor.brand})`;
    if (chartSub) chartSub.textContent = `Historical 30-Day TimescaleDB Series • Last Checked: ${product.competitor.lastChecked}`;

    // SVG Line Chart
    if (window.MarketCharts) {
      window.MarketCharts.renderPriceChart(
        'price-svg-chart',
        'chart-tooltip',
        product.history,
        product.myProduct.currentPrice
      );
    }

    // Chart Footer Stats
    const statsContainer = document.getElementById('chart-summary-stats');
    if (statsContainer) {
      const dropDollar = (product.competitor.previousPrice - product.competitor.currentPrice).toFixed(2);
      statsContainer.innerHTML = `
        <div class="stat-box">
          <span class="stat-label">Competitor Current Price</span>
          <span class="stat-num text-red">$${product.competitor.currentPrice.toFixed(2)}</span>
        </div>
        <div class="stat-box">
          <span class="stat-label">Previous 30-Day High</span>
          <span class="stat-num">$${product.competitor.previousPrice.toFixed(2)} (-$${dropDollar})</span>
        </div>
        <div class="stat-box">
          <span class="stat-label">Your AuraSound Price / Margin</span>
          <span class="stat-num text-cyan">$${product.myProduct.currentPrice.toFixed(2)} (${product.myProduct.currentMargin})</span>
        </div>
      `;
    }

    // Diff & Strategy Panel
    const diffBody = document.getElementById('active-product-diff-body');
    if (diffBody) {
      const diff = product.diffAnalysis;
      const isCritical = diff && diff.severity === 'critical';

      diffBody.innerHTML = `
        <div class="diff-alert-box" style="border-color: ${isCritical ? '#f43f5e' : '#f59e0b'};">
          <div class="diff-alert-title" style="color: ${isCritical ? '#f43f5e' : '#f59e0b'};">
            ${isCritical ? '🚨 CRITICAL PRICE CUT TRIGGERED' : '⚠️ PRICE MOVEMENT DETECTED'}
          </div>
          <div class="diff-alert-body">
            <strong>${product.competitor.brand}</strong> dropped from $${product.competitor.previousPrice.toFixed(2)} to $${product.competitor.currentPrice.toFixed(2)} (${product.competitor.priceChangePercent}% shift).
            <br><br>
            <strong>Recommended Playbook:</strong><br>
            ${diff ? diff.recommendedAction : 'Launch targeted counter-campaign.'}
          </div>
        </div>

        <table class="margin-comparison-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Competitor</th>
              <th>Your Brand</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Retail Price</td>
              <td style="color: #f43f5e; font-weight: 700;">$${product.competitor.currentPrice.toFixed(2)}</td>
              <td style="color: #00f0ff; font-weight: 700;">$${product.myProduct.currentPrice.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Stock Status</td>
              <td>${product.competitor.stockStatus}</td>
              <td style="color: #10b981;">Ready to Ship</td>
            </tr>
            <tr>
              <td>Gross Margin</td>
              <td>Estimated ~42%</td>
              <td style="color: #10b981; font-weight: 700;">${product.myProduct.currentMargin}</td>
            </tr>
          </tbody>
        </table>

        <button class="btn btn-primary btn-block" id="btn-chart-counter-campaign">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          Counter This Product Now
        </button>
      `;

      const counterBtn = document.getElementById('btn-chart-counter-campaign');
      if (counterBtn) {
        counterBtn.addEventListener('click', () => {
          populateAiFormWithProduct(product);
          switchTab('tab-ai-generator');
        });
      }
    }
  }

  // 3. Load Competitor Reviews Data
  async function loadReviewsData() {
    try {
      const res = await fetch('/api/reviews/tracker');
      const data = await res.json();
      if (!data.success) return;

      state.reviewsData = data;

      // Stats
      const ratingEl = document.getElementById('rev-stat-rating');
      const totalEl = document.getElementById('rev-stat-total');
      const critEl = document.getElementById('rev-stat-critical');

      if (ratingEl) ratingEl.textContent = `${data.stats.averageCompetitorRating} / 5.0 ★`;
      if (totalEl) totalEl.textContent = `${data.stats.totalReviewsAnalyzed} Reviews`;
      if (critEl) critEl.textContent = `${data.stats.criticalNegativeComplaints} Critical Complaints`;

      // Pain points tags
      const tagsContainer = document.getElementById('pain-points-tag-list');
      if (tagsContainer && data.topPainPoints) {
        tagsContainer.innerHTML = '';
        data.topPainPoints.forEach(pt => {
          const tag = document.createElement('div');
          tag.className = 'pain-tag';
          tag.innerHTML = `
            <span>${pt.point}</span>
            <span class="pain-tag-count">${pt.count}</span>
          `;
          tag.addEventListener('click', () => {
            const complaintInput = document.getElementById('ai-top-complaint');
            if (complaintInput) complaintInput.value = `Customer complaint: "${pt.point}"`;
            switchTab('tab-ai-generator');
            showToast(`Loaded pain point "${pt.point}" into AI generator`, 'success');
          });
          tagsContainer.appendChild(tag);
        });
      }

      // Reviews List
      const reviewsContainer = document.getElementById('reviews-list-wrapper');
      if (reviewsContainer && data.reviews) {
        reviewsContainer.innerHTML = '';
        data.reviews.forEach(r => {
          const card = document.createElement('div');
          card.className = 'review-item-card';

          const starString = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);

          card.innerHTML = `
            <div class="review-header-line">
              <div>
                <span class="review-stars">${starString}</span>
                <span style="font-weight: 700; margin-left: 8px;">${r.competitor}</span>
                <span style="font-size: 11px; color: #64748b; margin-left: 6px;">(${r.product})</span>
              </div>
              <span class="review-author">${r.author} • ${r.date}</span>
            </div>
            <div class="review-text">"${r.reviewText}"</div>
            <div class="review-counter-box">
              <span class="counter-text">⚡ <strong>Actionable Hook:</strong> "${r.actionableHook}"</span>
              <button class="btn btn-sm btn-outline btn-counter-this" data-comp="${r.competitor}" data-prod="${r.product}" data-hook="${r.actionableHook}">
                Use Hook
              </button>
            </div>
          `;

          const useHookBtn = card.querySelector('.btn-counter-this');
          if (useHookBtn) {
            useHookBtn.addEventListener('click', () => {
              const compSelect = document.getElementById('ai-competitor-select');
              const compInput = document.getElementById('ai-top-complaint');
              if (compSelect) compSelect.value = r.competitor;
              if (compInput) compInput.value = r.actionableHook;
              switchTab('tab-ai-generator');
              showToast(`Applied hook from ${r.competitor} review`, 'success');
            });
          }

          reviewsContainer.appendChild(card);
        });
      }
    } catch (err) {
      console.error('Error loading reviews data:', err);
    }
  }

  // 4. Load Supplier Discounts
  async function loadSuppliersData() {
    try {
      const res = await fetch('/api/suppliers/discounts');
      const data = await res.json();
      if (!data.success) return;

      state.suppliersData = data.discounts;
      const container = document.getElementById('suppliers-card-container');
      if (!container) return;

      container.innerHTML = '';
      data.discounts.forEach(s => {
        const card = document.createElement('div');
        card.className = 'glass-panel supplier-card';

        card.innerHTML = `
          <div class="supplier-top">
            <div>
              <div class="supplier-cat">${s.category}</div>
              <h3 class="supplier-name">${s.supplierName}</h3>
            </div>
            <div class="discount-circle">-${s.discountPercent}%</div>
          </div>
          <div class="supplier-component-name">${s.component}</div>
          <div class="supplier-price-matrix">
            <div class="price-col">
              <span class="price-col-label">Discounted Unit</span>
              <span class="price-col-val text-green">$${s.unitPrice.toFixed(2)}</span>
            </div>
            <div class="price-col">
              <span class="price-col-label">Regular Rate</span>
              <span class="price-col-val" style="text-decoration: line-through; color: #64748b;">$${s.regularPrice.toFixed(2)}</span>
            </div>
            <div class="price-col">
              <span class="price-col-label">Margin Expansion</span>
              <span class="price-col-val text-cyan">${s.marginImpact}</span>
            </div>
          </div>
          <div class="supplier-card-footer">
            <span class="validity-timer">⏳ Minimum MOQ: ${s.moq} units • Valid ${s.validUntil}</span>
            <button class="btn btn-sm btn-primary btn-claim-deal">Lock In Wholesale Rate</button>
          </div>
        `;

        const claimBtn = card.querySelector('.btn-claim-deal');
        if (claimBtn) {
          claimBtn.addEventListener('click', () => {
            showToast(`Wholesale batch for ${s.component} locked with ${s.supplierName}! (+${s.discountPercent}% COGS advantage saved)`, 'success');
          });
        }

        container.appendChild(card);
      });
    } catch (err) {
      console.error('Error loading suppliers data:', err);
    }
  }

  // 5. Load SaaS Tiers
  async function loadTiersData() {
    try {
      const res = await fetch('/api/subscriptions/tiers');
      const data = await res.json();
      if (!data.success) return;

      state.tiersData = data.tiers;
      const container = document.getElementById('tiers-cards-wrapper');
      if (!container) return;

      container.innerHTML = '';
      data.tiers.forEach(tier => {
        const card = document.createElement('div');
        card.className = `glass-panel tier-card ${tier.popular ? 'popular' : ''}`;

        const featuresHtml = tier.features.map(f => `
          <li><span class="check-icon">✓</span> ${f}</li>
        `).join('');

        card.innerHTML = `
          ${tier.popular ? '<div class="popular-badge">Most Popular for Scaling Brands</div>' : ''}
          <h3 class="tier-name">${tier.name}</h3>
          <p style="font-size: 12px; color: #94a3b8;">${tier.targetAudience}</p>
          <div class="tier-price-row">
            <span class="tier-price">${tier.price}</span>
            <span class="tier-interval">${tier.interval}</span>
          </div>
          <ul class="tier-features-list">
            ${featuresHtml}
          </ul>
          <button class="btn ${tier.popular ? 'btn-primary' : 'btn-secondary'} btn-block btn-select-tier" data-tier="${tier.name}">
            Select ${tier.name}
          </button>
        `;

        const btn = card.querySelector('.btn-select-tier');
        if (btn) {
          btn.addEventListener('click', () => {
            showToast(`Selected ${tier.name} (${tier.price}${tier.interval}). Ready for Stripe Checkout session.`, 'success');
          });
        }

        container.appendChild(card);
      });
    } catch (err) {
      console.error('Error loading tiers data:', err);
    }
  }

  // AI Form & Generation Handler
  function setupAiForm() {
    const form = document.getElementById('ai-prompt-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await triggerAiGeneration();
    });

    const copyAllBtn = document.getElementById('btn-copy-all-ad');
    if (copyAllBtn) {
      copyAllBtn.addEventListener('click', () => {
        if (!state.lastGeneratedAd) {
          showToast('Generate a campaign first before copying', 'alert');
          return;
        }
        const fullText = JSON.stringify(state.lastGeneratedAd, null, 2);
        navigator.clipboard.writeText(fullText);
        showToast('All campaign assets copied to clipboard!', 'success');
      });
    }

    const exportBtn = document.getElementById('btn-export-ad-json');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        if (!state.lastGeneratedAd) return;
        const blob = new Blob([JSON.stringify(state.lastGeneratedAd, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `marketpulse-counter-ad-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
      });
    }

    // Trigger initial generation demo
    setTimeout(() => {
      triggerAiGeneration();
    }, 400);
  }

  async function triggerAiGeneration() {
    const competitor = document.getElementById('ai-competitor-select')?.value || 'SoundWave Global';
    const dropPercent = parseFloat(document.getElementById('ai-drop-percent')?.value || '17.5');
    const complaint = document.getElementById('ai-top-complaint')?.value || 'Broken ear cup foam; unhelpful support';
    const targetPlatform = document.getElementById('ai-target-platform')?.value || 'Meta Ads';

    const btnText = document.querySelector('.ai-btn-text');
    const btnLoader = document.querySelector('.ai-btn-loader');
    const runBtn = document.getElementById('btn-run-ai');

    if (btnText && btnLoader && runBtn) {
      btnText.style.display = 'none';
      btnLoader.style.display = 'inline-flex';
      runBtn.disabled = true;
    }

    try {
      const res = await fetch('/api/ai/generate-ad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          competitorName: competitor,
          product: 'ApexPro ANC Headphones',
          priceDropPercent: dropPercent,
          topComplaint: complaint,
          targetPlatform: targetPlatform
        })
      });

      const data = await res.json();
      if (data.status === 'success' && data.counterCampaign) {
        state.lastGeneratedAd = data.counterCampaign;
        renderGeneratedCampaign(data.counterCampaign, data.mode);
        showToast(`AI Counter-Campaign generated successfully!`, 'success');
      }
    } catch (err) {
      console.error('Error generating AI ad:', err);
      showToast('Error generating ad campaign: ' + err.message, 'alert');
    } finally {
      if (btnText && btnLoader && runBtn) {
        btnText.style.display = 'inline-flex';
        btnLoader.style.display = 'none';
        runBtn.disabled = false;
      }
    }
  }

  function renderGeneratedCampaign(camp, mode) {
    const container = document.getElementById('ai-output-container');
    const modePill = document.getElementById('ai-result-mode-pill');
    if (!container) return;

    if (modePill) {
      modePill.textContent = mode === 'live_gemini' ? 'Gemini 1.5 Live' : 'Smart Pitch Engine';
      modePill.style.color = mode === 'live_gemini' ? '#00f0ff' : '#10b981';
    }

    const hooksHtml = (camp.adHooks || []).map((h, i) => `
      <div class="ad-hook-item">
        <span><strong>Hook ${i + 1}:</strong> "${h}"</span>
        <button class="btn btn-sm btn-ghost btn-copy-snippet" data-copy="${escapeHtml(h)}">Copy</button>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="campaign-header-card">
        <h4 class="camp-title">${camp.campaignName}</h4>
        <div class="camp-angle">🎯 <strong>Strategy Angle:</strong> ${camp.strategyAngle}</div>
        <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">
          <strong>Target Platform:</strong> ${camp.targetPlatform} • <strong>Audience:</strong> ${camp.targetAudience}
        </div>
      </div>

      <div>
        <div class="copy-label">High-Converting Ad Hooks</div>
        <div class="ad-hook-list">${hooksHtml}</div>
      </div>

      <div class="copy-ad-card">
        <div class="copy-label">Primary Ad Body Copy</div>
        <div class="copy-text-body">${camp.primaryAdCopy}</div>
        <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
          <button class="btn btn-sm btn-secondary btn-copy-snippet" data-copy="${escapeHtml(camp.primaryAdCopy)}">Copy Primary Copy</button>
        </div>
      </div>

      <div class="form-row-2">
        <div class="copy-ad-card">
          <div class="copy-label">Headline</div>
          <div style="font-weight: 700; font-size: 14px; color: #fff;">${camp.headline}</div>
        </div>
        <div class="copy-ad-card">
          <div class="copy-label">Call To Action (CTA)</div>
          <div style="font-weight: 700; font-size: 14px; color: #00f0ff;">${camp.callToAction}</div>
        </div>
      </div>

      <div class="copy-ad-card">
        <div class="copy-label">Flux / Midjourney Creative Generation Prompt</div>
        <div class="image-prompt-box">${camp.creativePrompt}</div>
        <div style="display: flex; justify-content: flex-end; margin-top: 8px;">
          <button class="btn btn-sm btn-ghost btn-copy-snippet" data-copy="${escapeHtml(camp.creativePrompt)}">Copy Prompt</button>
        </div>
      </div>
    `;

    // Attach copy button events
    container.querySelectorAll('.btn-copy-snippet').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-copy');
        navigator.clipboard.writeText(text);
        showToast('Copied to clipboard!', 'success');
      });
    });
  }

  function populateAiFormWithProduct(product) {
    const compSelect = document.getElementById('ai-competitor-select');
    const dropInput = document.getElementById('ai-drop-percent');
    const complaintInput = document.getElementById('ai-top-complaint');

    if (compSelect) compSelect.value = product.competitor.brand;
    if (dropInput) dropInput.value = Math.abs(product.competitor.priceChangePercent);
    if (complaintInput) complaintInput.value = product.topComplaint;
  }

  function setupQuickActions() {
    // Quick Counter on dashboard
    const quickCounterBtn = document.getElementById('btn-quick-counter');
    if (quickCounterBtn) {
      quickCounterBtn.addEventListener('click', () => {
        switchTab('tab-ai-generator');
      });
    }

    const viewChartJump = document.getElementById('btn-view-chart-jump');
    if (viewChartJump) {
      viewChartJump.addEventListener('click', () => {
        switchTab('tab-pricing');
      });
    }

    const supplierQuickBtn = document.getElementById('btn-supplier-quick-view');
    if (supplierQuickBtn) {
      supplierQuickBtn.addEventListener('click', () => {
        switchTab('tab-suppliers');
      });
    }

    const refreshPulseBtn = document.getElementById('btn-refresh-pulse');
    if (refreshPulseBtn) {
      refreshPulseBtn.addEventListener('click', async () => {
        await loadPulseData();
        showToast('Market shifts radar updated with latest scrapings!', 'success');
      });
    }
  }

  // Alert Dispatch Modal Simulator
  function setupAlertModal() {
    const openBtn = document.getElementById('btn-dispatch-test');
    const modal = document.getElementById('alert-modal');
    const closeBtn = document.getElementById('alert-modal-close');
    const cancelBtn = document.getElementById('alert-modal-cancel');
    const executeBtn = document.getElementById('btn-execute-dispatch');
    const resultsLog = document.getElementById('dispatch-results-log');

    if (openBtn && modal) {
      openBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        if (resultsLog) resultsLog.style.display = 'none';
      });
    }

    const closeModal = () => {
      if (modal) modal.style.display = 'none';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    if (executeBtn) {
      executeBtn.addEventListener('click', async () => {
        executeBtn.disabled = true;
        executeBtn.textContent = 'Dispatching...';

        const product = document.getElementById('sim-alert-product')?.value;
        const sendEmail = document.getElementById('sim-chk-email')?.checked;
        const sendSms = document.getElementById('sim-chk-sms')?.checked;
        const sendWebhook = document.getElementById('sim-chk-webhook')?.checked;

        const channels = [];
        if (sendEmail) channels.push('email');
        if (sendSms) channels.push('sms');
        if (sendWebhook) channels.push('webhook');

        try {
          const res = await fetch('/api/alerts/dispatch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              targetProduct: product,
              channels
            })
          });

          const data = await res.json();
          if (data.success && resultsLog) {
            resultsLog.style.display = 'block';
            resultsLog.innerHTML = `
              [${new Date().toLocaleTimeString()}] ALERT EVENT CREATED: ${product}<br>
              ${sendEmail ? '✓ SendGrid Email: Delivered to founder@sellerbrand.com (142ms)<br>' : ''}
              ${sendSms ? '✓ Twilio SMS: Delivered to +1 (555) 019-2834 (310ms)<br>' : ''}
              ${sendWebhook ? '✓ Store Webhook: 200 OK -> api.sellerbrand.com (88ms)<br>' : ''}
              [DISPATCH COMPLETE: All recipients notified within 0.54s]
            `;
            showToast('Instant alerts dispatched to all active channels!', 'success');
          }
        } catch (err) {
          showToast('Failed to dispatch alert: ' + err.message, 'alert');
        } finally {
          executeBtn.disabled = false;
          executeBtn.textContent = 'Dispatch Alert Now';
        }
      });
    }
  }

  function escapeHtml(string) {
    if (!string) return '';
    return String(string)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
