// ──────────────────────────────────────────────────────────────────────────────
// CarotisAi – Google Gemini AI Service
// ──────────────────────────────────────────────────────────────────────────────

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import type {
  CarotidAnalysisResult,
  PatientContext,
  StenosisGrade,
  PlaqueEchogenicity,
  PlaqueTexture,
  PlaqueShape,
  PlaqueLocation,
  Side,
  RiskCategory,
} from '../types';

const MODEL_NAME = 'gemini-1.5-flash';

// ─── Safety Settings ─────────────────────────────────────────────────────────
const SAFETY_SETTINGS = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT,       threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,      threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,threshold: HarmBlockThreshold.BLOCK_NONE },
];

// ─── Structured Prompt ───────────────────────────────────────────────────────
function buildAnalysisPrompt(context?: PatientContext): string {
  const contextSection = context
    ? `
## Patient Context (anonymised)
- Age group: ${context.ageGroup}
- Sex: ${context.sex}
- Risk factors: ${context.riskFactors.join(', ') || 'none specified'}
- Clinical question: ${context.clinicalQuestion}
`
    : '';

  return `You are an expert radiology AI assistant specialising in carotid artery ultrasound interpretation. 
You support a radiologist (not replace them). Your analysis is purely educational/research-grade.
${contextSection}

Analyse the provided carotid artery ultrasound image and return a JSON object with EXACTLY the following structure.
Do NOT include markdown fences – return raw JSON only.

{
  "stenosisAnalysis": {
    "grade": "<normal|mild|moderate|severe|occlusion>",
    "percentageEstimate": "<e.g. '60-70%' or 'not measurable'>",
    "method": "<e.g. 'NASCET criteria' or 'visual estimate'>",
    "side": "<left|right|bilateral|unknown>",
    "hemodynamicallySignificant": <true|false>
  },
  "plaqueAnalysis": {
    "present": <true|false>,
    "location": "<ICA|ECA|CCA|bifurcation|unknown>",
    "side": "<left|right|bilateral|unknown>",
    "echogenicity": "<anechoic|hypoechoic|isoechoic|hyperechoic|mixed|unknown>",
    "texture": "<homogeneous|heterogeneous|unknown>",
    "shape": "<regular|irregular|unknown>",
    "ulcerated": <true|false>,
    "calcified": <true|false>,
    "description": "<brief plain-language description>"
  },
  "imtAnalysis": {
    "measured": <true|false>,
    "value": "<e.g. '0.9 mm' or null>",
    "side": "<left|right|bilateral|unknown>",
    "increased": <true|false>,
    "comment": "<brief comment>"
  },
  "flowAnalysis": {
    "present": <true|false>,
    "turbulent": <true|false>,
    "reducedPSV": <true|false>,
    "comment": "<brief comment>"
  },
  "riskCategory": "<low|moderate|high|very-high>",
  "clinicalSummary": "<2-4 sentence plain-language summary of findings>",
  "recommendations": ["<recommendation 1>", "<recommendation 2>"],
  "limitations": "<1-2 sentences on image quality or analysis limitations>",
  "confidenceLevel": "<low|medium|high>",
  "analysisQuality": "<poor|adequate|good|excellent>"
}

If the image is NOT a carotid ultrasound, set all fields to their null/unknown defaults and set confidenceLevel to "low".
Always include a disclaimer that this is an AI research tool, not a clinical diagnosis.`;
}

// ─── Parse AI Response ────────────────────────────────────────────────────────
function parseAiResponse(
  raw: string,
  imageFileName: string,
): CarotidAnalysisResult {
  // Strip any accidental markdown fences
  const cleaned = raw
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    // Fallback: return a minimal result indicating parse failure
    return buildFallbackResult(imageFileName, raw, 'JSON parse error');
  }

  const s = (parsed.stenosisAnalysis as Record<string, unknown>) ?? {};
  const p = (parsed.plaqueAnalysis  as Record<string, unknown>) ?? {};
  const i = (parsed.imtAnalysis     as Record<string, unknown>) ?? {};
  const f = (parsed.flowAnalysis    as Record<string, unknown>) ?? {};

  return {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    imageFileName,

    stenosisAnalysis: {
      grade:                     (s.grade as StenosisGrade)   ?? 'normal',
      percentageEstimate:        (s.percentageEstimate as string) ?? 'unknown',
      method:                    (s.method as string)          ?? 'visual estimate',
      side:                      (s.side as Side)              ?? 'unknown',
      hemodynamicallySignificant:(s.hemodynamicallySignificant as boolean) ?? false,
    },
    plaqueAnalysis: {
      present:     (p.present as boolean)              ?? false,
      location:    (p.location as PlaqueLocation)      ?? 'unknown',
      side:        (p.side as Side)                    ?? 'unknown',
      echogenicity:(p.echogenicity as PlaqueEchogenicity) ?? 'unknown',
      texture:     (p.texture as PlaqueTexture)        ?? 'unknown',
      shape:       (p.shape as PlaqueShape)            ?? 'unknown',
      ulcerated:   (p.ulcerated as boolean)            ?? false,
      calcified:   (p.calcified as boolean)            ?? false,
      description: (p.description as string)           ?? '',
    },
    imtAnalysis: {
      measured:  (i.measured as boolean) ?? false,
      value:     (i.value as string | undefined),
      side:      (i.side as Side)        ?? 'unknown',
      increased: (i.increased as boolean) ?? false,
      comment:   (i.comment as string)   ?? '',
    },
    flowAnalysis: {
      present:    (f.present as boolean)    ?? false,
      turbulent:  (f.turbulent as boolean)  ?? false,
      reducedPSV: (f.reducedPSV as boolean) ?? false,
      comment:    (f.comment as string)     ?? '',
    },

    riskCategory:    (parsed.riskCategory    as RiskCategory) ?? 'low',
    clinicalSummary: (parsed.clinicalSummary as string)       ?? '',
    recommendations: (parsed.recommendations as string[])     ?? [],
    limitations:     (parsed.limitations     as string)       ?? '',
    disclaimer:
      'DISCLAIMER: This AI analysis is a research/educational tool only. ' +
      'It does NOT constitute a clinical diagnosis. ' +
      'All findings must be verified by a qualified radiologist.',

    rawAiResponse:   raw,
    confidenceLevel: (parsed.confidenceLevel as 'low' | 'medium' | 'high') ?? 'low',
    analysisQuality: (parsed.analysisQuality as 'poor' | 'adequate' | 'good' | 'excellent') ?? 'adequate',
  };
}

function buildFallbackResult(
  imageFileName: string,
  raw: string,
  reason: string,
): CarotidAnalysisResult {
  return {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    imageFileName,
    stenosisAnalysis: {
      grade: 'normal',
      percentageEstimate: 'unknown',
      method: 'unknown',
      side: 'unknown',
      hemodynamicallySignificant: false,
    },
    plaqueAnalysis: {
      present: false,
      location: 'unknown',
      side: 'unknown',
      echogenicity: 'unknown',
      texture: 'unknown',
      shape: 'unknown',
      ulcerated: false,
      calcified: false,
      description: `Analysis failed: ${reason}`,
    },
    imtAnalysis: {
      measured: false,
      side: 'unknown',
      increased: false,
      comment: 'Not available',
    },
    flowAnalysis: {
      present: false,
      turbulent: false,
      reducedPSV: false,
      comment: 'Not available',
    },
    riskCategory: 'low',
    clinicalSummary: `Analysis could not be completed. Reason: ${reason}`,
    recommendations: ['Please re-upload the image and try again.'],
    limitations: reason,
    disclaimer:
      'DISCLAIMER: This AI analysis is a research/educational tool only. ' +
      'It does NOT constitute a clinical diagnosis.',
    rawAiResponse: raw,
    confidenceLevel: 'low',
    analysisQuality: 'poor',
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Converts an image File to a base64 inline data part for Gemini.
 */
async function fileToGenerativePart(file: File) {
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  return { inlineData: { data: base64, mimeType: file.type } };
}

/**
 * Main analysis function – sends image + prompt to Gemini and returns
 * a structured CarotidAnalysisResult.
 */
export async function analyseCarotidImage(
  apiKey: string,
  imageFile: File,
  patientContext?: PatientContext,
): Promise<CarotidAnalysisResult> {
  if (!apiKey?.trim()) {
    throw new Error('A valid Google Gemini API key is required.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    safetySettings: SAFETY_SETTINGS,
  });

  const imagePart  = await fileToGenerativePart(imageFile);
  const textPrompt = buildAnalysisPrompt(patientContext);

  const result   = await model.generateContent([textPrompt, imagePart]);
  const response = await result.response;
  const rawText  = response.text();

  return parseAiResponse(rawText, imageFile.name);
}
