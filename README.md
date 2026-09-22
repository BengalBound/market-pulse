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

## 🔄 End-to-End System Workflow

```mermaid
flowchart TD
    subgraph S1["1. Continuous Ingestion Layer"]
        A1["Competitor Product URLs<br>(Amazon, Shopify, Walmart)"] --> C1["Headless Crawlers<br>& Scrapers"]
        A2["Google Places & Reviews API<br>(Competitor Business Listings)"] --> C2["Review Sentiment<br>Ingestor"]
        A3["Supplier Portals & Catalogs<br>(Wholesale Feeds & RSS)"] --> C3["Discount & Rebate<br>Collector"]
    end

    subgraph S2["2. Analytical & Time-Series Engine"]
        C1 --> DB[("TimescaleDB / PostgreSQL<br>Historical Price & Review Logs")]
        C2 --> DB
        C3 --> DB
        DB --> DIFF{"Event-Driven<br>Diffing Engine"}
    end

    subgraph S3["3. Trigger & Intelligence Layer"]
        DIFF -->|Price Shift > 10%| T1["⚡ Price Drop/Spike Alert"]
        DIFF -->|Negative Review Surge| T2["🚨 Competitor Weakness Flag"]
        DIFF -->|Wholesale Rebate > 20%| T3["💰 Margin Arbitrage Opportunity"]
    end

    subgraph S4["4. Generative AI Synthesis (Gemini 1.5)"]
        T1 --> LLM["Google Gemini API<br>(Structured JSON Prompts)"]
        T2 --> LLM
        T3 --> LLM
        LLM --> AD["Ready-to-Use Ad Package:<br>• Direct-Response Hooks<br>• Primary Ad Body Copy<br>• Midjourney/Flux Prompts<br>• Target Audience Angles"]
    end

    subgraph S5["5. Multi-Channel Alert & Dispatch"]
        T1 --> DISPATCH["Queue Dispatcher<br>(BullMQ / Redis)"]
        T2 --> DISPATCH
        T3 --> DISPATCH
        AD --> DISPATCH
        DISPATCH --> OUT1["📩 Email (SendGrid)"]
        DISPATCH --> OUT2["📱 SMS (Twilio)"]
        DISPATCH --> OUT3["🔗 Store Webhook / Slack"]
        DISPATCH --> OUT4["💻 Live Web Dashboard"]
    end

    subgraph S6["6. Seller Revenue Impact"]
        OUT4 --> SELL["Seller Launches Counter-Ad<br>& Adjusts Pricing / Sourcing"]
        SELL --> WIN["🏆 Protected Margins + Stolen Market Share"]
    end

    style S1 fill:#0d1322,stroke:#00f0ff,stroke-width:1px,color:#fff
    style S2 fill:#0d1322,stroke:#8b5cf6,stroke-width:1px,color:#fff
    style S3 fill:#0d1322,stroke:#f43f5e,stroke-width:1px,color:#fff
    style S4 fill:#0d1322,stroke:#10b981,stroke-width:1px,color:#fff
    style S5 fill:#0d1322,stroke:#00f0ff,stroke-width:1px,color:#fff
    style S6 fill:#131b30,stroke:#f59e0b,stroke-width:2px,color:#fff
```

### 📋 Detailed Operational Lifecycle

1. **Ingest**: Distributed scrapers extract competitor prices, customer review texts, and supplier catalog pricing on a configured schedule (Hourly/Daily).
2. **Diff & Detect**: Incoming price logs are compared with historical baselines in TimescaleDB. If a price drops by more than the user threshold (e.g. `>15%`) or reviews report recurring product defects (e.g. *"broken switches"*, *"ghost support"*), an anomaly trigger fires.
3. **Synthesize (AI Counter-Campaign)**: The anomaly trigger, competitor name, and customer complaints are passed into Google Gemini 1.5 Flash with structured prompt templates.
4. **Generate**: The engine outputs direct-response ad copy, high-converting hooks, headlines, CTAs, and Midjourney image prompts designed to win over frustrated competitor buyers.
5. **Dispatch**: Alert payloads with generated counter-campaigns are immediately delivered across Email (SendGrid), SMS (Twilio), and Webhooks.
6. **Action**: The seller reviews the notification, clicks *"Copy Campaign"* or connects directly to Meta/Google Ads, turning competitor disruptions into profitable customer acquisition.

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
| `/api/admin/clients` | `GET` | Super Admin KPI metrics (MRR, ARR, active workspaces, crawler health) & client directory |
| `/api/admin/clients` | `POST` | Onboard new client workspace, configure tier & SKU allocation, generate magic invite link |

---

## 👥 Multi-Tenant Client Management & Super Admin Console

MarketPulse AI includes a dedicated **Super Admin Console** (`#admin`) designed for platform operators to provision, monitor, and manage client brand workspaces.

### 🔑 How to Add New Clients & Manage Workspaces:
1. **Navigate to the Admin Console**:
   - In the navigation bar, click the **"Admin Console"** tab, or navigate directly to `http://localhost:3000/#admin`.
2. **Review Real-Time Platform KPIs**:
   - **Active Client Brands**: Total isolated client workspaces currently active.
   - **Platform MRR / ARR**: Live monthly and annual recurring revenue run-rate across all subscriber accounts.
   - **Total Monitored SKUs**: Combined scraping queue size across all tenant stores.
   - **Distributed Scraper Cluster Health**: Real-time operational status of the proxy crawler fleet.
3. **Provision a New Client Workspace**:
   - Click the **"+ Onboard New Client Workspace"** button in the top right.
   - Enter the client's **Brand / Company Name** (e.g. *ApexGrip Gaming Gear*, *Veloce Cycling Labs*).
   - Enter the **Owner Email** (where credentials and alert summaries will be sent).
   - Select the client's **Subscription Tier**:
     - **Starter Seller**: $49/mo (10 SKU limit, daily scans)
     - **Growth Merchant**: $199/mo (100 SKU limit, hourly scans, SMS dispatch)
     - **Enterprise Brand**: $499/mo (Custom / 500+ SKU limit, 15-min scans, priority proxies)
   - Set the **Initial Tracked SKU Allocation**.
   - Click **"Provision Workspace & Generate Magic Link"**.
4. **Immediate Activation**:
   - The system creates an isolated tenant record, assigns a unique workspace ID, connects a Stripe customer reference, and outputs a one-time setup link.
   - Platform MRR, ARR, and active workspace metrics dynamically update across the dashboard.


## 💼 Business Model & Unit Economics

- **Starter Seller**: $49/mo (Up to 10 products, daily scans, 30 AI prompts)
- **Growth Merchant (Core)**: $199/mo (Up to 100 products, hourly scans, unlimited AI counter-campaigns, SMS alerts)
- **Enterprise Brand**: $499/mo (Unlimited tracking, residential proxy crawlers, API access, multi-brand workspaces)

---

## 📄 License
MIT License. Built for scaling e-commerce brands.
