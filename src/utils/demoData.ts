// ──────────────────────────────────────────────────────────────────────────────
// CarotisAi – Demo sample result for UI preview without an API key
// ──────────────────────────────────────────────────────────────────────────────

import type { CarotidAnalysisResult } from '../types';

export const DEMO_RESULT: CarotidAnalysisResult = {
  id: 'demo-0000-0000-0000',
  timestamp: new Date().toISOString(),
  imageFileName: 'demo_carotid_ultrasound.jpg',

  stenosisAnalysis: {
    grade: 'moderate',
    percentageEstimate: '55–65%',
    method: 'NASCET criteria (visual estimate)',
    side: 'left',
    hemodynamicallySignificant: false,
  },

  plaqueAnalysis: {
    present: true,
    location: 'bifurcation',
    side: 'left',
    echogenicity: 'mixed',
    texture: 'heterogeneous',
    shape: 'irregular',
    ulcerated: false,
    calcified: true,
    description:
      'Mixed echogenicity plaque with areas of calcification and soft components present at the carotid bifurcation extending into the proximal ICA. Irregular surface contour.',
  },

  imtAnalysis: {
    measured: true,
    value: '1.1 mm',
    side: 'left',
    increased: true,
    comment:
      'IMT measures 1.1 mm, exceeding the age-adjusted normal threshold of 0.9 mm, consistent with early atherosclerotic change.',
  },

  flowAnalysis: {
    present: true,
    turbulent: true,
    reducedPSV: false,
    comment:
      'Flow signal is present. Mild turbulence noted at the level of the plaque. Peak systolic velocity is within normal limits at this stage.',
  },

  riskCategory: 'high',

  clinicalSummary:
    'Moderate stenosis (55–65% by NASCET) of the left internal carotid artery at the level of a mixed, calcified, heterogeneous plaque at the bifurcation. ' +
    'Increased IMT (1.1 mm) suggests progressive atherosclerosis. ' +
    'Haemodynamically not yet significant; however, the heterogeneous plaque morphology and irregular surface warrant close clinical follow-up. ' +
    'Cardiovascular risk stratification: HIGH.',

  recommendations: [
    'Correlate with clinical symptoms (TIA, amaurosis fugax, focal neurological deficit).',
    'Optimise medical therapy: statin, antiplatelet (if indicated), blood pressure control.',
    'Repeat duplex ultrasound in 6 months to assess plaque progression.',
    'Consider CT/MR angiography for further evaluation if symptoms develop or stenosis progresses beyond 70%.',
    'Cardiology / Neurovascular multidisciplinary discussion recommended.',
  ],

  limitations:
    'This is a DEMO result generated from sample data — no real image was analysed. ' +
    'In clinical practice, image quality, patient habitus, and operator skill all influence measurement accuracy.',

  disclaimer:
    'DISCLAIMER: This AI analysis is a research/educational tool only. ' +
    'It does NOT constitute a clinical diagnosis. ' +
    'All findings must be verified by a qualified radiologist.',

  rawAiResponse: '{ "demo": true }',
  confidenceLevel: 'high',
  analysisQuality: 'excellent',
};
