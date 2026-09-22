/**
 * MarketPulse Custom SVG Price Chart Engine
 * Lightweight, interactive, zero-dependency time-series renderer
 */

window.MarketCharts = (function() {
  function renderPriceChart(svgElementId, tooltipElementId, historyData, baselinePrice) {
    const svg = document.getElementById(svgElementId);
    const tooltip = document.getElementById(tooltipElementId);
    if (!svg || !historyData || historyData.length === 0) return;

    const width = 760;
    const height = 300;
    const padding = { top: 24, right: 30, bottom: 40, left: 55 };

    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    // Calculate min and max price bounds
    const prices = historyData.map(d => d.price);
    if (baselinePrice) prices.push(baselinePrice);

    const minPrice = Math.floor(Math.min(...prices) * 0.92);
    const maxPrice = Math.ceil(Math.max(...prices) * 1.08);

    function getX(index) {
      return padding.left + (index / (historyData.length - 1)) * chartW;
    }

    function getY(price) {
      return padding.top + chartH - ((price - minPrice) / (maxPrice - minPrice)) * chartH;
    }

    // Clear existing SVG content
    svg.innerHTML = '';

    // Create Defs for gradients & filters
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <linearGradient id="competitorAreaGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#f43f5e" stop-opacity="0.0"/>
      </linearGradient>
      <linearGradient id="baselineAreaGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#00f0ff" stop-opacity="0.0"/>
      </linearGradient>
      <filter id="glowDrop" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#f43f5e" flood-opacity="0.6"/>
      </filter>
    `;
    svg.appendChild(defs);

    // Draw Grid Lines & Y-Axis Labels
    const ySteps = 5;
    for (let i = 0; i <= ySteps; i++) {
      const pVal = minPrice + ((maxPrice - minPrice) / ySteps) * i;
      const y = getY(pVal);

      // Horizontal dashed line
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', padding.left);
      line.setAttribute('y1', y);
      line.setAttribute('x2', width - padding.right);
      line.setAttribute('y2', y);
      line.setAttribute('stroke', 'rgba(255, 255, 255, 0.07)');
      line.setAttribute('stroke-dasharray', '3 3');
      svg.appendChild(line);

      // Y Label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', padding.left - 10);
      text.setAttribute('y', y + 4);
      text.setAttribute('fill', '#64748b');
      text.setAttribute('font-size', '11');
      text.setAttribute('font-family', 'JetBrains Mono, monospace');
      text.setAttribute('text-anchor', 'end');
      text.textContent = `$${pVal.toFixed(0)}`;
      svg.appendChild(text);
    }

    // Draw X-Axis Labels (Days)
    historyData.forEach((d, i) => {
      if (i % 2 === 0 || i === historyData.length - 1) {
        const x = getX(i);
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', height - 12);
        text.setAttribute('fill', '#64748b');
        text.setAttribute('font-size', '10');
        text.setAttribute('font-family', 'Inter, sans-serif');
        text.setAttribute('text-anchor', 'middle');
        text.textContent = d.day;
        svg.appendChild(text);
      }
    });

    // Draw Baseline Price Reference (User's price)
    if (baselinePrice) {
      const baseY = getY(baselinePrice);
      const baseLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      baseLine.setAttribute('x1', padding.left);
      baseLine.setAttribute('y1', baseY);
      baseLine.setAttribute('x2', width - padding.right);
      baseLine.setAttribute('y2', baseY);
      baseLine.setAttribute('stroke', '#00f0ff');
      baseLine.setAttribute('stroke-width', '1.8');
      baseLine.setAttribute('stroke-dasharray', '5 4');
      svg.appendChild(baseLine);

      // Label on the right
      const baseLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      baseLabel.setAttribute('x', width - padding.right + 6);
      baseLabel.setAttribute('y', baseY + 3);
      baseLabel.setAttribute('fill', '#00f0ff');
      baseLabel.setAttribute('font-size', '10');
      baseLabel.setAttribute('font-family', 'JetBrains Mono, monospace');
      baseLabel.textContent = `You: $${baselinePrice}`;
      svg.appendChild(baseLabel);
    }

    // Construct Competitor Path (Line & Area)
    let pathD = '';
    let areaD = `M ${getX(0)} ${getY(historyData[0].price)}`;

    historyData.forEach((d, i) => {
      const x = getX(i);
      const y = getY(d.price);
      if (i === 0) {
        pathD += `M ${x} ${y}`;
      } else {
        pathD += ` L ${x} ${y}`;
        areaD += ` L ${x} ${y}`;
      }
    });

    // Close area polygon
    const lastX = getX(historyData.length - 1);
    const bottomY = padding.top + chartH;
    areaD += ` L ${lastX} ${bottomY} L ${getX(0)} ${bottomY} Z`;

    // Render Gradient Area
    const areaPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    areaPath.setAttribute('d', areaD);
    areaPath.setAttribute('fill', 'url(#competitorAreaGradient)');
    svg.appendChild(areaPath);

    // Render Competitor Stroke Line
    const strokePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    strokePath.setAttribute('d', pathD);
    strokePath.setAttribute('fill', 'none');
    strokePath.setAttribute('stroke', '#f43f5e');
    strokePath.setAttribute('stroke-width', '2.5');
    strokePath.setAttribute('stroke-linecap', 'round');
    strokePath.setAttribute('stroke-linejoin', 'round');
    strokePath.setAttribute('filter', 'url(#glowDrop)');
    svg.appendChild(strokePath);

    // Render Interactive Hover Points
    historyData.forEach((d, i) => {
      const cx = getX(i);
      const cy = getY(d.price);

      // Data point dot
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', cx);
      circle.setAttribute('cy', cy);
      circle.setAttribute('r', '4.5');
      circle.setAttribute('fill', '#070913');
      circle.setAttribute('stroke', '#f43f5e');
      circle.setAttribute('stroke-width', '2');
      circle.setAttribute('style', 'cursor: pointer; transition: r 0.15s ease;');

      // Hover hit area (larger invisible target)
      const hitArea = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      hitArea.setAttribute('cx', cx);
      hitArea.setAttribute('cy', cy);
      hitArea.setAttribute('r', '16');
      hitArea.setAttribute('fill', 'transparent');
      hitArea.setAttribute('style', 'cursor: pointer;');

      function onEnter(e) {
        circle.setAttribute('r', '7');
        circle.setAttribute('fill', '#f43f5e');

        if (tooltip) {
          const rect = svg.getBoundingClientRect();
          const tooltipX = (cx / width) * rect.width;
          const tooltipY = (cy / height) * rect.height;

          const diffVsBaseline = baselinePrice ? (d.price - baselinePrice).toFixed(2) : null;
          let diffMarkup = '';
          if (diffVsBaseline) {
            const isCheaper = Number(diffVsBaseline) < 0;
            diffMarkup = `<div style="color: ${isCheaper ? '#f43f5e' : '#10b981'}; margin-top: 4px;">
              ${isCheaper ? '🔻 Competitor is $' + Math.abs(diffVsBaseline) + ' cheaper' : '🔺 Competitor is $' + diffVsBaseline + ' higher'}
            </div>`;
          }

          tooltip.innerHTML = `
            <strong>${d.day}</strong>
            <div style="font-family: JetBrains Mono; font-size: 13px; font-weight: 700; color: #f43f5e; margin-top: 2px;">
              Competitor: $${d.price.toFixed(2)}
            </div>
            ${diffMarkup}
          `;
          tooltip.style.opacity = '1';
          tooltip.style.left = `${tooltipX}px`;
          tooltip.style.top = `${tooltipY - 50}px`;
          tooltip.style.transform = 'translate(-50%, -100%)';
        }
      }

      function onLeave() {
        circle.setAttribute('r', '4.5');
        circle.setAttribute('fill', '#070913');
        if (tooltip) {
          tooltip.style.opacity = '0';
        }
      }

      hitArea.addEventListener('mouseenter', onEnter);
      hitArea.addEventListener('mouseleave', onLeave);

      svg.appendChild(circle);
      svg.appendChild(hitArea);
    });
  }

  return {
    renderPriceChart
  };
})();
