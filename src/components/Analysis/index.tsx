// ──────────────────────────────────────────────────────────────────────────────
// CarotisAi – Analysis Results Display
// ──────────────────────────────────────────────────────────────────────────────

import {
  Activity, Heart, Layers, Droplets, ShieldAlert,
  CheckCircle2, AlertTriangle, XCircle, Info, ChevronRight,
} from 'lucide-react';
import type { CarotidAnalysisResult, StenosisGrade, RiskCategory } from '../../types';
import { useApp } from '../../hooks/useApp';
import { Badge, Card, CardHeader, CardBody, Alert, ProgressBar } from '../UI';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function stenosisColor(grade: StenosisGrade): 'success' | 'info' | 'warning' | 'danger' {
  switch (grade) {
    case 'normal':   return 'success';
    case 'mild':     return 'info';
    case 'moderate': return 'warning';
    case 'severe':
    case 'occlusion':return 'danger';
  }
}

function stenosisPercent(grade: StenosisGrade): number {
  switch (grade) {
    case 'normal':   return 0;
    case 'mild':     return 30;
    case 'moderate': return 60;
    case 'severe':   return 85;
    case 'occlusion':return 100;
  }
}

function riskColor(risk: RiskCategory): 'success' | 'info' | 'warning' | 'danger' {
  switch (risk) {
    case 'low':      return 'success';
    case 'moderate': return 'info';
    case 'high':     return 'warning';
    case 'very-high':return 'danger';
  }
}

function riskProgressColor(risk: RiskCategory): 'emerald' | 'sky' | 'amber' | 'red' {
  switch (risk) {
    case 'low':      return 'emerald';
    case 'moderate': return 'sky';
    case 'high':     return 'amber';
    case 'very-high':return 'red';
  }
}

function riskPercent(risk: RiskCategory): number {
  switch (risk) {
    case 'low':      return 20;
    case 'moderate': return 50;
    case 'high':     return 75;
    case 'very-high':return 95;
  }
}

function confidenceIcon(level: 'low' | 'medium' | 'high') {
  switch (level) {
    case 'low':    return <XCircle     className="w-4 h-4 text-red-400"     />;
    case 'medium': return <AlertTriangle className="w-4 h-4 text-amber-400" />;
    case 'high':   return <CheckCircle2 className="w-4 h-4 text-emerald-400"/>;
  }
}

// ─── Sub-sections ─────────────────────────────────────────────────────────────

function StenosisSection({ result }: { result: CarotidAnalysisResult }) {
  const { t } = useApp();
  const s = result.stenosisAnalysis;
  const color = stenosisColor(s.grade);
  return (
    <Card noPadding>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-sky-400" />
          <span className="font-medium text-slate-200">{t('results_stenosis')}</span>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant={color}>{t(`stenosis_${s.grade}`)}</Badge>
            <span className="text-sm text-slate-400">{s.side !== 'unknown' ? `${s.side} side` : ''}</span>
          </div>
          <ProgressBar
            value={stenosisPercent(s.grade)}
            color={color === 'success' ? 'emerald' : color === 'info' ? 'sky' : color === 'warning' ? 'amber' : 'red'}
          />
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-400">
            <div>
              <span className="text-slate-500">Estimate</span>
              <p className="text-slate-200 font-medium">{s.percentageEstimate}</p>
            </div>
            <div>
              <span className="text-slate-500">Method</span>
              <p className="text-slate-200 font-medium">{s.method}</p>
            </div>
          </div>
          {s.hemodynamicallySignificant && (
            <Alert variant="warning">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                Haemodynamically significant stenosis detected
              </div>
            </Alert>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

function PlaqueSection({ result }: { result: CarotidAnalysisResult }) {
  const { t } = useApp();
  const p = result.plaqueAnalysis;
  return (
    <Card noPadding>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-400" />
          <span className="font-medium text-slate-200">{t('results_plaque')}</span>
        </div>
      </CardHeader>
      <CardBody>
        {!p.present ? (
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm">No plaque detected</span>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                { label: 'Location',     value: p.location     },
                { label: 'Side',         value: p.side         },
                { label: 'Echogenicity', value: p.echogenicity },
                { label: 'Texture',      value: p.texture      },
                { label: 'Shape',        value: p.shape        },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span className="text-slate-500">{label}</span>
                  <p className="text-slate-200 font-medium capitalize">{value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              {p.ulcerated  && <Badge variant="danger">Ulcerated</Badge>}
              {p.calcified  && <Badge variant="muted">Calcified</Badge>}
            </div>
            {p.description && (
              <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
            )}
          </div>
        )}
      </CardBody>
    </Card>
  );
}

function IMTSection({ result }: { result: CarotidAnalysisResult }) {
  const { t } = useApp();
  const i = result.imtAnalysis;
  return (
    <Card noPadding>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span className="font-medium text-slate-200">{t('results_imt')}</span>
        </div>
      </CardHeader>
      <CardBody>
        {!i.measured ? (
          <p className="text-sm text-slate-400">IMT not measurable from this image</p>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-slate-100">{i.value ?? '—'}</span>
              <Badge variant={i.increased ? 'warning' : 'success'}>
                {i.increased ? 'Increased' : 'Normal'}
              </Badge>
            </div>
            {i.comment && <p className="text-xs text-slate-400">{i.comment}</p>}
          </div>
        )}
      </CardBody>
    </Card>
  );
}

function FlowSection({ result }: { result: CarotidAnalysisResult }) {
  const { t } = useApp();
  const f = result.flowAnalysis;
  return (
    <Card noPadding>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-blue-400" />
          <span className="font-medium text-slate-200">{t('results_flow')}</span>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-2">
          <div className="flex gap-2 flex-wrap">
            <Badge variant={f.present ? 'success' : 'danger'}>
              Flow: {f.present ? 'Present' : 'Absent'}
            </Badge>
            {f.turbulent  && <Badge variant="warning">Turbulent</Badge>}
            {f.reducedPSV && <Badge variant="warning">Reduced PSV</Badge>}
          </div>
          {f.comment && <p className="text-xs text-slate-400">{f.comment}</p>}
        </div>
      </CardBody>
    </Card>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function AnalysisResults({ result }: { result: CarotidAnalysisResult }) {
  const { t } = useApp();

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-100">{t('results_title')}</h2>
          <p className="text-xs text-slate-500">
            {new Date(result.timestamp).toLocaleString()} · {result.imageFileName}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {confidenceIcon(result.confidenceLevel)}
          <span className="text-xs text-slate-400">
            AI {t('results_confidence')}: {result.confidenceLevel}
          </span>
        </div>
      </div>

      {/* Risk Overview */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            result.riskCategory === 'low' ? 'bg-emerald-900/50' :
            result.riskCategory === 'moderate' ? 'bg-sky-900/50' :
            result.riskCategory === 'high' ? 'bg-amber-900/50' : 'bg-red-900/50'
          }`}>
            <ShieldAlert className="w-5 h-5 text-current" />
          </div>
          <div>
            <p className="text-xs text-slate-500">{t('results_risk')}</p>
            <p className="font-semibold text-slate-100">{t(`risk_${result.riskCategory.replace('-', '_')}`)}</p>
          </div>
          <Badge variant={riskColor(result.riskCategory)} className="ml-auto">
            {result.riskCategory.toUpperCase()}
          </Badge>
        </div>
        <ProgressBar value={riskPercent(result.riskCategory)} color={riskProgressColor(result.riskCategory)} />
      </Card>

      {/* Grid findings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StenosisSection result={result} />
        <PlaqueSection   result={result} />
        <IMTSection      result={result} />
        <FlowSection     result={result} />
      </div>

      {/* Clinical Summary */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-4 h-4 text-rose-400" />
          <span className="font-medium text-slate-200">{t('results_summary')}</span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">{result.clinicalSummary}</p>
      </Card>

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-sky-400" />
            <span className="font-medium text-slate-200">{t('results_recommendations')}</span>
          </div>
          <ul className="space-y-2">
            {result.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <ChevronRight className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                {rec}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Limitations */}
      {result.limitations && (
        <Alert variant="warning">
          <p className="font-medium mb-1">{t('results_limitations')}</p>
          <p className="text-xs opacity-80">{result.limitations}</p>
        </Alert>
      )}

      {/* Disclaimer */}
      <Alert variant="danger">
        <p className="text-xs leading-relaxed">{result.disclaimer}</p>
      </Alert>
    </div>
  );
}
