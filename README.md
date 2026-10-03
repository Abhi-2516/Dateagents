# DateAgents — Your Agent Dates For You 💖

> **Autonomous AI Agent Matching Platform Powered by Apify MCP & Multi-LLM Providers.**

DateAgents takes **REAL PEOPLE**'s public LinkedIn and Instagram profiles, constructs autonomous AI dating agents equipped ONLY with verified public facts, runs dynamic turn-by-turn LLM dates in a visual arena, evaluates mutual chemistry, and produces reproducible 25x25 compatibility rankings.

---

## 🌟 Key Features

1. **25 Pre-Seeded Real Public Figures**: Instant access to 25 seeded profiles (Sam Altman, Marques Brownlee, Satya Nadella, Alexis Ohanian, Sara Blakely, Andrej Karpathy, Yann LeCun, Lex Fridman, Melanie Perkins, Patrick Collison, Brian Chesky, Vitalik Buterin, Linus Torvalds, Serena Williams, Paul Graham, Andrew Ng, Jensen Huang, MrBeast, Palmer Luckey, Emily Weiss, Tim Cook, Elon Musk, Gwyneth Paltrow, Mark Zuckerberg).
2. **Apify MCP Ingestion**: Scrapes public profiles strictly via two actors:
   - **LinkedIn**: `harvestapi/linkedin-profile-search` (`profileScraperMode = "Full"`)
   - **Instagram**: `apify/instagram-profile-scraper`
3. **Source Evidence Provenance**: Every claim on a profile page explicitly links to quotes from LinkedIn or Instagram with exact source badges.
4. **Dynamic LLM Agent Dates**: Agents date each other in real-time turn-by-turn dialogue, displaying inner thinking steps, **✨ Shared interest discovered** badges, and **⚡ Potential difference** alerts.
5. **Deterministic 25x25 Ranking Matrix**:
   - `40%` Profile Jaccard Similarity
   - `30%` Shared Interests Match
   - `20%` Conversation Chemistry
   - `10%` Explicit Preference Alignment
6. **3-Minute Video Presentation Mode** (`/demo/video`): Interactive presenter mode with timeline tracking specifically formatted for video recording!
7. **Custom Profile URL Ingestion** (`/people/add`): Live form allowing users to paste any public LinkedIn + Instagram URLs to generate a custom agent.

---

## 🏗️ Architecture & Pipeline

```
            REAL PERSON PUBLIC PROFILE
                        │
       ┌────────────────┴────────────────┐
       ↓                                 ↓
  LinkedIn URL                     Instagram URL
(harvestapi/linkedin-profile-search) (apify/instagram-profile-scraper)
       │                                 │
       └────────────────┬────────────────┘
                        ↓
                SOURCE NORMALIZER
                        ↓
             AI PROFILE INTELLIGENCE (Claims & Evidence)
                        ↓
               AUTONOMOUS DATING AGENT
                        ↓
             AGENT ↔ AGENT DATING ARENA (Live Dialogue)
                        ↓
               POST-DATE EVALUATION (5-Axis Score)
                        ↓
             25x25 REPRODUCIBLE RANKING MATRIX
```

---

## 🛠️ Technical Scraping Architecture

The application retrieves public data using two Apify actors via `apify-client`:

1. **LinkedIn Profile Search Scraper** (`lib/apify/linkedin.ts`):
   - Actor: `harvestapi/linkedin-profile-search`
   - Config: `profileScraperMode = "Full"`
   - Output: Full name, headline, summary/about, skills, education, work experience, location.

2. **Instagram Profile Scraper** (`lib/apify/instagram.ts`):
   - Actor: `apify/instagram-profile-scraper`
   - Output: Username, full name, bio, followers, latest posts captions, lifestyle signals.

3. **Safety & Privacy Compliance**:
   - Only public endpoints are accessed. No CAPTCHA bypass, no private accounts.
   - Sensitive attributes (race, religion, politics, financial status, private relationship status) are strictly excluded from AI prompts and schemas.

---

## 💻 Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Glassmorphism, Lucide Icons, Framer Motion
- **Database**: Prisma ORM with SQLite (`dev.db`) / PostgreSQL (Neon/Supabase)
- **Validation**: Zod schema validation
- **AI Providers**: Gemini (`gemini-1.5-flash`), Groq, OpenRouter, and Fallback AI Provider
- **Scraping**: Apify Client SDK (`apify-client`)

---

## 🚀 Local Setup & Quickstart

### 1. Clone & Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create `.env` file based on `.env.example`:

```env
DATABASE_URL="file:./dev.db"
APIFY_API_TOKEN="your-apify-token"
GEMINI_API_KEY="your-gemini-key"
AI_PROVIDER="gemini"
```

### 3. Database Push & Generate

```bash
npx prisma db push
npx prisma generate
```

### 4. Seed the 25-Person Demo Dataset

```bash
npx tsx scripts/seed-demo.ts
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📸 Key Routes

- `/` — Premium Landing Page
- `/demo` — 25-Person Interactive Demo Launcher & Control Room
- `/demo/video` — 3-Minute Video Recording Mode (with auto-advancing slides & timeline ticker)
- `/people` — Directory of 25 Real People
- `/people/[id]` — Person Intelligence Dashboard with Evidence Provenance
- `/people/add` — Custom LinkedIn + Instagram URL Ingestion
- `/agents` — Autonomous Dating Agents Directory
- `/arena` — Live Agent Dating Arena with real-time dialogue stream
- `/rankings` — Global 25x25 Reproducible Rankings Matrix
- `/dashboard` — System Metrics & Technical Scraping Architecture Specs

---

## 🛡️ Disclaimer

Results generated by DateAgents are **AI-simulated compatibility scores** created for demonstration purposes only using publicly available web profile data. They do not represent real-world romantic relationships or claims.
