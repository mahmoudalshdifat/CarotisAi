// ──────────────────────────────────────────────────────────────────────────────
// CarotisAi – Core Types
// ──────────────────────────────────────────────────────────────────────────────

export type Language = 'en' | 'de' | 'ar';

export type StenosisGrade =
  | 'normal'
  | 'mild'      // < 50 %
  | 'moderate'  // 50–69 %
  | 'severe'    // 70–99 %
  | 'occlusion' // 100 %;

export type PlaqueEchogenicity =
  | 'anechoic'
  | 'hypoechoic'
  | 'isoechoic'
  | 'hyperechoic'
  | 'mixed'
  | 'unknown';

export type PlaqueTexture = 'homogeneous' | 'heterogeneous' | 'unknown';
export type PlaqueShape   = 'regular'     | 'irregular'     | 'unknown';
export type PlaqueLocation =
  | 'ICA'   // Internal Carotid Artery
  | 'ECA'   // External Carotid Artery
  | 'CCA'   // Common Carotid Artery
  | 'bifurcation'
  | 'unknown';

export type Side = 'left' | 'right' | 'bilateral' | 'unknown';

export type RiskCategory = 'low' | 'moderate' | 'high' | 'very-high';

// ─── Analysis Result ──────────────────────────────────────────────────────────
export interface PlaqueAnalysis {
  present: boolean;
  location: PlaqueLocation;
  side: Side;
  echogenicity: PlaqueEchogenicity;
  texture: PlaqueTexture;
  shape: PlaqueShape;
  ulcerated: boolean;
  calcified: boolean;
  description: string;
}

export interface StenosisAnalysis {
  grade: StenosisGrade;
  percentageEstimate: string;   // e.g. "60–70 %"
  method: string;               // e.g. "NASCET criteria"
  side: Side;
  hemodynamicallySignificant: boolean;
}

export interface IMTAnalysis {
  measured: boolean;
  value?: string;               // e.g. "0.9 mm"
  side: Side;
  increased: boolean;
  comment: string;
}

export interface FlowAnalysis {
  present: boolean;
  turbulent: boolean;
  reducedPSV: boolean;          // Peak Systolic Velocity
  comment: string;
}

export interface CarotidAnalysisResult {
  id: string;
  timestamp: string;
  imageFileName: string;

  // Core findings
  stenosisAnalysis: StenosisAnalysis;
  plaqueAnalysis: PlaqueAnalysis;
  imtAnalysis: IMTAnalysis;
  flowAnalysis: FlowAnalysis;

  // Overall assessment
  riskCategory: RiskCategory;
  clinicalSummary: string;
  recommendations: string[];
  limitations: string;
  disclaimer: string;

  // Raw AI response for audit trail
  rawAiResponse: string;

  // Confidence metadata
  confidenceLevel: 'low' | 'medium' | 'high';
  analysisQuality: 'poor' | 'adequate' | 'good' | 'excellent';
}

// ─── Patient Context (optional, pseudonymised) ───────────────────────────────
export interface PatientContext {
  ageGroup: 'young' | 'middle' | 'elderly';  // intentionally vague for privacy
  sex: 'male' | 'female' | 'unknown';
  riskFactors: string[];                      // e.g. ['hypertension', 'diabetes']
  clinicalQuestion: string;
}

// ─── App State ────────────────────────────────────────────────────────────────
export interface UploadedImage {
  file: File;
  previewUrl: string;
  uploadedAt: string;
}

export interface AnalysisSession {
  id: string;
  uploadedImage: UploadedImage;
  patientContext?: PatientContext;
  result?: CarotidAnalysisResult;
  status: 'idle' | 'analyzing' | 'complete' | 'error';
  errorMessage?: string;
}
