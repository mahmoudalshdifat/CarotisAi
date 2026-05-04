# CarotisAi 🫀

**AI-Assisted Carotid Artery Ultrasound Analysis**  
Research & Education Tool – *Not for clinical diagnosis*

[![CI – Build & Lint](https://github.com/mahmoudalshdifat/CarotisAi/actions/workflows/ci.yml/badge.svg)](https://github.com/mahmoudalshdifat/CarotisAi/actions/workflows/ci.yml)

---

## Overview

CarotisAi is a web-based research tool that uses **Google Gemini AI** to analyze carotid artery ultrasound images. It supports radiology research and doctoral education by providing structured AI-generated assessments.

### Analyze in 3 steps

1. **Upload** a carotid ultrasound image (JPEG / PNG / WebP / BMP)
2. **Optionally** add patient context (age group, sex, risk factors)
3. **Review** structured AI findings and download a PDF report

---

## Screenshots

### Dashboard
![Dashboard](https://github.com/user-attachments/assets/bd1ce0d6-1724-496b-98c6-56b6615ba2e0)

### Analyze – Upload
![Analyze](https://github.com/user-attachments/assets/994fe73c-33e6-407d-b096-1822946dd456)

### Demo Analysis Results
![Demo Results](https://github.com/user-attachments/assets/97fa2c0a-bc2f-453b-ad33-0ba4d45efce2)

---

## Features

| Feature | Details |
|---|---|
| 🖼️ Image Upload | Drag & drop JPEG, PNG, WebP, BMP (max 20 MB) |
| 🤖 AI Analysis | Google Gemini 1.5 Flash multimodal model |
| 📋 Structured Reports | Downloadable PDF with full findings |
| 👤 Patient Context | Optional anonymised patient metadata |
| 🌍 Multi-language | English, German (Deutsch), Arabic (العربية) |
| 🔒 Privacy First | API key + data stays in your browser only |
| 📱 Responsive | Mobile-first layout with sidebar navigation |
| 🧪 Demo Mode | Try the full UI instantly — no API key needed |
| ☁️ Netlify-Ready | One-click deploy below |

### Analysis output

- **Stenosis** grading (NASCET: normal / mild / moderate / severe / occlusion)
- **Plaque** characterisation (location, echogenicity, texture, ulceration, calcification)
- **IMT** (intima-media thickness) measurement & interpretation
- **Flow** assessment (turbulence, reduced PSV)
- **Cardiovascular risk** stratification (low / moderate / high / very-high)
- **PDF report** with all findings, recommendations and mandatory disclaimer

---

## Deploy to Netlify (2 minutes)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/mahmoudalshdifat/CarotisAi)

1. Click the button above → Netlify will clone your repo and build it automatically
2. Go to **Settings** in the live app and paste your Gemini API key
3. Done — share the URL with anyone

> **No API key yet?** The app includes a **Demo Mode** (click "View Demo" on the dashboard) so you can explore all features instantly with a realistic sample carotid analysis result.

---

## Run Locally

```bash
# 1. Clone
git clone https://github.com/mahmoudalshdifat/CarotisAi
cd CarotisAi

# 2. Install
npm install

# 3. Start dev server
npm run dev
# → Open http://localhost:5173

# Build for production
npm run build
```

---

## Getting a Gemini API Key (free)

1. Visit [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Sign in with your Google account → **Create API Key** → copy
3. In the app: **Settings** → paste key → **Save**

> Your key is stored only in your browser (`localStorage`). It is never sent to any server other than Google's API.

---

## Automatic GitHub → Netlify Deployment

The repo includes `.github/workflows/deploy.yml`. To activate it:

1. Create a Netlify site at [netlify.com](https://app.netlify.com)
2. **GitHub repo → Settings → Secrets → Actions → New secret** (add both):

| Secret | Where to find |
|---|---|
| `NETLIFY_AUTH_TOKEN` | Netlify → User Settings → Personal access tokens |
| `NETLIFY_SITE_ID` | Netlify → Site → Site configuration → Site ID |

Every push to `main` will now auto-deploy.

---

## Project Structure

```
src/
├── components/
│   ├── Analysis/      # Results display (stenosis, plaque, IMT, flow)
│   ├── Layout/        # Sidebar + top navigation
│   ├── Report/        # PDF report generator (jsPDF)
│   ├── UI/            # Reusable primitives (Button, Card, Badge…)
│   └── Upload/        # Image drop zone + patient context form
├── hooks/
│   └── useApp.tsx     # Global state (settings, sessions, i18n)
├── i18n/
│   └── index.ts       # EN / DE / AR translations
├── pages/
│   ├── AnalyzePage.tsx    # Upload → Analyze → Results (+ demo mode)
│   ├── DashboardPage.tsx  # Stats + recent analyses
│   ├── HistoryPage.tsx    # All past analyses with search
│   ├── SettingsPage.tsx   # API key + language
│   └── AboutPage.tsx      # About + medical disclaimer
├── services/
│   └── gemini.ts      # Gemini API + structured prompt + JSON parser
├── types/
│   └── index.ts       # All TypeScript domain types
└── utils/
    └── demoData.ts    # Sample analysis result for demo mode
```

## Tech Stack

- **React 19** + **TypeScript** + **Vite 8**
- **TailwindCSS v4** (`@tailwindcss/vite`)
- **Google Gemini AI** (`gemini-1.5-flash`)
- **React Router v7**
- **jsPDF** (PDF report)
- **react-dropzone** (file upload)
- **lucide-react** (icons)
- **Netlify** (hosting)

---

## Medical Disclaimer

> ⚠️ **This is a research and educational tool only.**  
> It does NOT provide medical diagnoses.  
> All AI-generated findings **must** be reviewed and validated by a qualified radiologist.  
> Do not use this output for clinical decision-making.

---

*CarotisAi · v1.0.0 · AI Radiology Research Tool*
