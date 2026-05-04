# CarotisAi 🫀

**AI-Assisted Carotid Artery Ultrasound Analysis**  
Research & Education Tool – *Not for clinical diagnosis*

[![CI – Build & Lint](https://github.com/mahmoudalshdifat/CarotisAi/actions/workflows/ci.yml/badge.svg)](https://github.com/mahmoudalshdifat/CarotisAi/actions/workflows/ci.yml)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/mahmoudalshdifat/CarotisAi)

> [!WARNING]
> This is a **research and educational tool only**. It does NOT provide medical diagnoses.  
> All AI-generated findings **must** be reviewed and validated by a qualified radiologist.

---

## Overview

CarotisAi is a browser-based research tool that uses **Google Gemini 1.5 Flash** to analyze carotid artery ultrasound images. It supports radiology research and doctoral education by providing structured, AI-generated assessments — entirely client-side, no server required.

**Key highlights:**
- 🧪 **Try it instantly** — click **[Deploy to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/mahmoudalshdifat/CarotisAi)** and the app is live in ~2 minutes with a free Gemini API key
- 🔒 **Privacy first** — your API key and images never leave your browser
- 📥 **PDF reports** — download a complete A4 report with all findings, recommendations, and disclaimer
- 🌍 **Multilingual** — English, German (Deutsch), Arabic (العربية / RTL)

---

## How It Works

```
Upload image  →  (optional) Add patient context  →  Gemini AI analysis  →  Structured results  →  Download PDF
```

### Analysis output per image

| Section | Details |
|---|---|
| **Stenosis** | Grade (normal/mild/moderate/severe/occlusion) + NASCET % estimate + haemodynamic significance |
| **Plaque** | Location, echogenicity, texture (homogeneous/heterogeneous), shape, ulceration, calcification |
| **IMT** | Intima-media thickness value + increased flag + comment |
| **Flow** | Turbulence flag + reduced PSV flag + comment |
| **Risk** | Cardiovascular risk category: `low` / `moderate` / `high` / `very-high` |
| **Summary** | Clinical summary paragraph + ordered recommendations |

---

## Deploy to Netlify (2 minutes)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/mahmoudalshdifat/CarotisAi)

1. Click the button → Netlify forks the repo and builds automatically
2. Open the live URL → go to **Settings** → paste your Gemini API key
3. **Done** — share the URL with your team

> **No API key yet?** The app has a built-in **Demo Mode** (click "View Demo" on the dashboard) so you can explore all features immediately with a realistic sample carotid analysis.

---

## Run Locally

```bash
git clone https://github.com/mahmoudalshdifat/CarotisAi
cd CarotisAi
npm install
npm run dev      # → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview production build locally
npm run lint     # ESLint
```

---

## Getting a Gemini API Key (free)

1. Visit [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Sign in → **Create API Key** → copy
3. In the app: **Settings** → paste → **Save**

> Your key is stored only in your browser (`localStorage`). It is never sent to any server other than Google's API endpoint.

---

## Automatic GitHub → Netlify Deployment

The repo ships with `.github/workflows/deploy.yml`. To activate it:

1. Create a Netlify site at [netlify.com](https://app.netlify.com)
2. In your GitHub repo → **Settings → Secrets and variables → Actions → New secret**:

| Secret | Where to find |
|---|---|
| `NETLIFY_AUTH_TOKEN` | Netlify → User Settings → Personal access tokens |
| `NETLIFY_SITE_ID` | Netlify → Site → Site configuration → Site ID |

Every push to `main` will then auto-deploy and post a preview URL as a PR comment.

---

## Pages

| Route | Purpose |
|---|---|
| `/` | Dashboard — session stats (total / today / high-risk) + recent list |
| `/analyze` | Upload → patient context → Gemini analysis → result cards |
| `/analyze?demo=1` | **Demo mode** — full sample results, no API key needed |
| `/history` | Searchable log of all past analyses with PDF download per entry |
| `/settings` | API key + language picker (EN / DE / AR) |
| `/about` | Feature overview + medical disclaimer |

---

## Project Structure

```
src/
├── components/
│   ├── Analysis/      # Stenosis, plaque, IMT, flow result cards
│   ├── Layout/        # Sidebar + top nav
│   ├── Report/        # PDF generator (jsPDF, A4, no server)
│   ├── UI/            # Button, Card, Badge, Alert, ProgressBar …
│   └── Upload/        # Drag-and-drop zone + patient context form
├── hooks/
│   └── useApp.tsx     # Context: API key, language, session history (localStorage)
├── i18n/
│   └── index.ts       # EN / DE / AR translations
├── pages/             # DashboardPage, AnalyzePage, HistoryPage, SettingsPage, AboutPage
├── services/
│   └── gemini.ts      # Gemini API call, structured prompt, JSON parser, typed fallback
├── types/
│   └── index.ts       # StenosisGrade, PlaqueAnalysis, IMTAnalysis, … CarotidAnalysisResult
└── utils/
    └── demoData.ts    # Pre-built sample result for demo mode
```

## Tech Stack

| Layer | Library |
|---|---|
| UI framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | TailwindCSS v4 (`@tailwindcss/vite`) |
| Routing | React Router v7 |
| AI | Google Gemini 1.5 Flash (`@google/generative-ai`) |
| PDF | jsPDF |
| Upload | react-dropzone |
| Icons | lucide-react |
| Host | Netlify |
| CI | GitHub Actions |

---

## CI

The repo includes two GitHub Actions workflows:

- **`.github/workflows/ci.yml`** — runs `npm run lint` + `npm run build` on every push and pull request (both use `permissions: contents: read` for least-privilege `GITHUB_TOKEN`)
- **`.github/workflows/deploy.yml`** — auto-deploys to Netlify on push to `main`

---

*CarotisAi · v1.0.0 · AI Radiology Research Tool*
