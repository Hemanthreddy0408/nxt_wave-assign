# 🚀 NxtWave Growth Challenge (Round 1) — MERN Stack Growth Engine

> **Mission:** Get 500 final-year engineering students to register for NxtWave's free online workshop: **"Build Your First AI Project in 60 Minutes"**  
> **Constraints:** ₹2,000 Budget | 7 Days Campaign Duration | Unrestricted AI Tools

---

## 🏗️ Architecture & Technology Stack

This project is built from scratch as a full-fledged, production-ready **MERN Stack** application:

| Layer | Technology | Key Responsibility |
|---|---|---|
| **M** — MongoDB | `Mongoose` / MongoDB Atlas | Collections for `Registration`, `Analytics` events, referral trees, and campus leaderboards. Includes automatic local in-memory persistence fallback if MongoDB daemon isn't running locally! |
| **E** — Express.js | `Node.js` + `Express` | REST API on port `5001` handling registrations, referral loops, funnel event tracking, and growth admin metrics. |
| **R** — React.js | `React 18` + `Vite` + `TailwindCSS` | High-converting interactive SPA with 60-Second AI Readiness Quiz, animated radial score gauge, 1-click WhatsApp viral referral hub, confetti celebration, and an Executive Growth Lead Admin Dashboard. |
| **N** — Node.js | `Node 20+` | Asynchronous runtime powering the server and concurrent development environment. |

---

## 🎯 Strategic Growth Mechanisms Implemented

1. **60-Second AI Placement Diagnostic Quiz (Lead Magnet):**
   - Instead of a generic *"Register for a webinar"* CTA, the app uses an interactive diagnostic evaluating student AI readiness against 2025 placement benchmarks.
   - Triggers **curiosity, social benchmarking, and loss aversion** (students see their gap before registering).

2. **Personalized Diagnostic Scorecard:**
   - Animated SVG radial gauge showcasing percentile (e.g. *Top 24% of Applicants*).
   - Bridges the gap directly to the workshop: *"Build & Deploy Your First AI Project in 60 Minutes with GitHub proof."*

3. **Viral Referral Loop & Incentive Ladder (K = 0.42):**
   - Every registered student receives a unique referral code (`NXT-NAME-XXXX`) and link.
   - Pre-formatted **1-Click WhatsApp Share** button crafted specifically for college class groups.
   - **Tiered Milestone Rewards:**
     - 👥 **1 Friend:** Unlocks *50+ Production AI Prompts & GitHub Starter Templates*
     - 👥 **3 Friends:** Unlocks *VIP Post-Workshop Doubt-Clearing Room*
     - 👥 **5 Friends:** Unlocks *1-on-1 AI Resume & Portfolio Placement Review*

4. **₹2,000 Capital Allocation & Blended CAC Tracker:**
   - Real-time simulation showing ₹1,450 spent across 5 micro-campus ambassadors (₹200 each) and community seeding.
   - **Blended CAC of ₹4.24 per student**, well below the standard edtech benchmark of ₹40–₹80.

5. **Growth Lead Admin Dashboard:**
   - Real-time progress bar toward the 500-student goal.
   - Acquisition funnel breakdown (Page Visits → Quiz Starts → Completions → Registrations).
   - Channel attribution breakdown (Campus Tech Leads WhatsApp 48%, Peer Referrals 28%, LinkedIn 15%, Developer Discords 9%).
   - Live searchable registrations database with **1-Click CSV Export** for Google Meet & WhatsApp reminders.

---

## ⚡ Quick Start & Running Locally

### 1. Start Both Backend & Frontend (Single Command)

From the project root directory:

```bash
npm run dev
```

This starts:
- 🖥️ **React Frontend:** [http://localhost:5173](http://localhost:5173)
- ⚙️ **Express Server:** [http://localhost:5001](http://localhost:5001)
- 📡 **Health Check:** [http://localhost:5001/health](http://localhost:5001/health)

### 2. Running Individual Services (Optional)

To run the backend server only:
```bash
npm run server
```

To run the Vite React client only:
```bash
npm run client
```

---

## 🗄️ MongoDB Configuration

The application includes an auto-sensing database connection in [`server/config/db.js`](file:///Users/hemanthreddy/Desktop/nxt_wave/server/config/db.js):

- **Default (Zero-Config Mode):** If no MongoDB service is running locally, the server instantly engages an in-memory persistence fallback pre-seeded with realistic student records. All registrations, referral links, and growth metrics work immediately!
- **MongoDB Atlas or Local MongoDB:**
  To connect to a live MongoDB instance, update [`server/.env`](file:///Users/hemanthreddy/Desktop/nxt_wave/server/.env):
  ```env
  PORT=5001
  MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/nxtwave_workshop?retryWrites=true&w=majority
  NODE_ENV=development
  ```

---

## 📁 Repository Directory Structure

```
nxt_wave/
├── package.json                 # Root script runner (concurrently)
├── README.md                    # Project documentation & strategy overview
├── server/                      # Node.js + Express + Mongoose Backend
│   ├── package.json
│   ├── server.js                # Express entry point
│   ├── .env                     # Server environment configuration
│   ├── config/
│   │   └── db.js                # MongoDB connection with graceful memory fallback
│   ├── models/
│   │   ├── Registration.js      # Student Schema, referral code generator
│   │   └── Analytics.js         # Funnel event tracking schema
│   ├── controllers/
│   │   ├── registrationController.js # Registration logic & leaderboard
│   │   └── analyticsController.js    # Growth KPIs, CAC, K-factor calculation
│   └── routes/
│       └── api.js               # REST API endpoints (/api/register, /api/growth/metrics)
└── client/                      # React 18 + Vite + TailwindCSS Frontend
    ├── package.json
    ├── vite.config.js           # Vite config with API proxy
    ├── tailwind.config.js       # Tailwind CSS configuration
    ├── index.html               # Main HTML entry with Inter typography
    └── src/
        ├── App.jsx              # State coordinator (Student flow vs Admin view)
        ├── index.css            # Dark mode glassmorphism design system
        ├── services/
        │   └── api.js           # Frontend API client
        └── components/
            ├── Navbar.jsx           # Top navigation & Growth Lead view toggle
            ├── Hero.jsx             # Hero section with urgency countdown timer
            ├── Quiz.jsx             # 3-question AI Placement Readiness diagnostic
            ├── ScoreCalculation.jsx # Micro-animated anticipation loader
            ├── ResultReport.jsx     # Radial gauge & personalized gap analysis
            ├── RegistrationForm.jsx # College autocomplete & seat confirmation
            ├── ReferralHub.jsx      # Post-registration viral loop & WhatsApp invite
            └── AdminDashboard.jsx   # Real-time KPIs, CAC, and CSV export
```
