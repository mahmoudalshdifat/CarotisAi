# CarotisAi 🫀

**AI-Assisted Carotid Artery Ultrasound Analysis**  
Research & Education Tool – *Not for clinical diagnosis*

---

## Overview

CarotisAi is a web-based research tool that uses **Google Gemini AI** to analyse carotid artery ultrasound images. It supports radiology research and doctoral education by providing structured AI-generated assessments of:

- **Stenosis grading** (NASCET criteria, normal / mild / moderate / severe / occlusion)
- **Plaque characterisation** (location, echogenicity, texture, ulceration, calcification)
- **Intima-Media Thickness (IMT)** assessment
- **Flow analysis** (turbulence, reduced PSV)
- **Cardiovascular risk stratification** (low / moderate / high / very-high)
- **PDF report generation**

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
| ☁️ Netlify-Ready | One-click deploy to Netlify |

## Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **TailwindCSS v4** (via `@tailwindcss/vite`)
- **Google Gemini AI** (`@google/generative-ai`)
- **React Router v7**
- **jsPDF** (PDF report generation)
- **react-dropzone** (file upload)
- **lucide-react** (icons)

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/mahmoudalshdifat/CarotisAi
cd CarotisAi
npm install
```

### 2. Get a Gemini API Key

1. Visit [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click **Create API Key**
4. Copy the key

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173), go to **Settings**, and paste your API key.

### 4. Build for Production

```bash
npm run build
```

Output is in the `dist/` folder.

## Deploy to Netlify

The repo includes `netlify.toml` for automatic Netlify deployment:

1. Push to GitHub
2. Connect repo to [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

> **Note:** Set your Gemini API key in the app's Settings page (stored in `localStorage`, never sent to Netlify servers).

## Project Structure

```
src/
├── components/
│   ├── Analysis/      # Results display (stenosis, plaque, IMT, flow)
│   ├── Layout/        # Sidebar + top navigation
│   ├── Report/        # PDF report generator
│   ├── UI/            # Reusable primitives (Button, Card, Badge…)
│   └── Upload/        # Image drop zone + patient context form
├── hooks/
│   └── useApp.tsx     # Global state context (settings, sessions, i18n)
├── i18n/
│   └── index.ts       # EN / DE / AR translations
├── pages/
│   ├── AnalyzePage.tsx    # Upload → Analyse → Results workflow
│   ├── DashboardPage.tsx  # Stats + recent analyses
│   ├── HistoryPage.tsx    # All past analyses with search
│   ├── SettingsPage.tsx   # API key + language settings
│   └── AboutPage.tsx      # About + disclaimer
├── services/
│   └── gemini.ts      # Gemini API integration + response parser
└── types/
    └── index.ts       # All TypeScript types
```

## Medical Disclaimer

> ⚠️ **This is a research and educational tool only.**  
> It does NOT provide medical diagnoses.  
> All AI-generated findings **must** be reviewed and validated by a qualified radiologist.  
> Do not use this output for clinical decision-making.  
> Developed to support radiology research and doctoral thesis work.

## License

MIT

---

*CarotisAi · AI Radiology Research Tool · v1.0.0*
