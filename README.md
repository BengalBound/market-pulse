# MarketPulse AI — Automated Market Intelligence & Counter-Campaign SaaS

[![Node.js](https://img.shields.io/badge/Node.js-22.x-green.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![AI Engine](https://img.shields.io/badge/AI-Gemini%201.5%20Flash-violet.svg)](https://ai.google.dev/)
[![Status](https://img.shields.io/badge/Status-Pitch%20Ready-cyan.svg)](#)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen.svg)](https://bengalbound.github.io/market-pulse/)

> 🌐 **Live Interactive Prototype & Pitch Deck**: [https://bengalbound.github.io/market-pulse/](https://bengalbound.github.io/market-pulse/)  
> *(Test the live pulse radar, interactive 30-day SVG charts, Gemini AI counter-campaign generator, and 10-slide investor deck directly in your browser without local setup!)*

MarketPulse AI is an automated market research, price monitoring, and counter-campaign generation platform built for modern e-commerce sellers (Shopify, Amazon FBA, DTC). 

It continuously monitors competitor price shifts, supplier wholesale discounts, and competitor customer reviews, and automatically translates those signals into actionable direct-response advertising campaigns (Meta, Google, TikTok) via LLMs.

---

## ⚡ Core Value Pillars

1. **Competitor Pricing Radar**: Time-series tracking of competitor price cuts and spikes with customizable alert thresholds (>10%, >15%, >20%).
2. **Supplier Discount & Wholesale Arbitrage**: Monitoring wholesale component catalogs to alert sellers to bulk discount opportunities that expand gross margins by 15%–35%.
3. **Competitor Review Sentiment & Weakness Radar**: Automated ingestion of Google and Amazon customer reviews to pinpoint recurring complaints (e.g. "slow shipping", "broken hinge", "robotic support").
4. **AI Counter-Campaign Generator**: Direct-response marketing engine powered by Google Gemini API that automatically drafts ad hooks, primary copy, and Midjourney/Flux creative prompts capitalizing on competitor flaws.
5. **Interactive 10-Slide Investor Pitch Deck**: Built-in full-screen presentation mode (`/ #pitch` or press `P`) with presenter talking-point notes (`N`) covering unit economics, 50/50 partnership alignment, and a 90-day GTM roadmap.

---

## 🏗️ Architecture & Tech Stack

```
                          ┌──────────────────────────────────────┐
                          │    Single-Page Web Application       │
                          │   (Vanilla JS, Custom SVG Charts)    │
                          └──────────────────┬───────────────────┘
                                             │
                                             ▼
                          ┌──────────────────────────────────────┐
                          │         Node.js Express REST API     │
                          └──────┬───────────┬───────────┬───────┘
                                 │           │           │
                                 ▼           ▼           ▼
                      ┌────────────────┐ ┌───────────┐ ┌───────────────┐
                      │ Diffing Engine │ │ AI Engine │ │ Alert Engine  │
                      │ Price/Margins  │ │ Gemini /  │ │ Email, SMS &  │
                      │ & Thresholds   │ │ Heuristic │ │ Webhook Push  │
                      └────────────────┘ └───────────┘ └───────────────┘
```

- **Backend**: Node.js, Express.js, CORS, Dotenv
- **AI Integration**: `@google/generative-ai` (Gemini 1.5 Flash) with zero-latency intelligent fallback
- **Frontend**: Responsive Single-Page Application, custom dark-mode cyber glassmorphism, zero-dependency interactive SVG time-series charts
- **Production Database Blueprint**: Prisma schema for PostgreSQL & TimescaleDB hypertables (`src/docs/schema.prisma`)

---

## 🚀 Quick Start

### 1. Installation
```bash
git clone https://github.com/BengalBound/market-pulse.git
cd market-pulse
npm install
```

### 2. Configure Environment (Optional)
```bash
cp .env.example .env
```
*(Optional: Add your `GEMINI_API_KEY` for live Google Gemini generation. If left empty, the built-in smart contextual heuristic engine generates high-converting assets instantly.)*

### 3. Launch Platform
```bash
npm start
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

- **Investor Pitch Mode**: Press `P` or visit `http://localhost:3000/#pitch`
- **Toggle Presenter Notes**: Press `N` during pitch mode

---

## 📡 REST API Reference

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/health` | `GET` | Health check & active AI mode indicator |
| `/api/pulse` | `GET` | Aggregated market shifts, active alert counts, ticker feed |
| `/api/competitors/pricing` | `GET` | 30-day historical price curves & threshold triggers |
| `/api/reviews/tracker` | `GET` | Google reviews, sentiment score, extracted pain points |
| `/api/suppliers/discounts` | `GET` | Wholesale discount catalog & margin expansion metrics |
| `/api/ai/generate-ad` | `POST` | Live / Contextual direct-response ad copy generation |
| `/api/alerts/dispatch` | `POST` | Multi-channel alert delivery test (Email, SMS, Webhook) |
| `/api/subscriptions/tiers` | `GET` | SaaS tier pricing ($49 Starter, $199 Pro, $499 Enterprise) |

---

## 💼 Business Model & Unit Economics

- **Starter Seller**: $49/mo (Up to 10 products, daily scans, 30 AI prompts)
- **Growth Merchant (Core)**: $199/mo (Up to 100 products, hourly scans, unlimited AI counter-campaigns, SMS alerts)
- **Enterprise Brand**: $499/mo (Unlimited tracking, residential proxy crawlers, API access, multi-brand workspaces)

---

## 📄 License
MIT License. Built for scaling e-commerce brands.
