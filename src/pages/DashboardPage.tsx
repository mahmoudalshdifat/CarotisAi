// ──────────────────────────────────────────────────────────────────────────────
// CarotisAi – Dashboard Page
// ──────────────────────────────────────────────────────────────────────────────

import { useNavigate } from 'react-router-dom';
import {
  Plus, Microscope, TrendingUp, AlertTriangle, Calendar,
  ChevronRight, Trash2, BarChart3, FlaskConical,
} from 'lucide-react';
import { useApp } from '../hooks/useApp';
import { Card, Badge, Button } from '../components/UI';
import type { AnalysisSession, RiskCategory } from '../types';

function riskBadgeVariant(risk: RiskCategory): 'success' | 'info' | 'warning' | 'danger' {
  switch (risk) {
    case 'low':      return 'success';
    case 'moderate': return 'info';
    case 'high':     return 'warning';
    case 'very-high':return 'danger';
  }
}

function StatCard({ icon: Icon, label, value, color }: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <Card>
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-100">{value}</p>
          <p className="text-xs text-slate-500">{label}</p>
        </div>
      </div>
    </Card>
  );
}

function SessionRow({ session, onDelete }: { session: AnalysisSession; onDelete: () => void }) {
  const navigate = useNavigate();
  const result = session.result;

  const handleClick = () => {
    navigate('/analyze', { state: { sessionId: session.id } });
  };

  return (
    <div className="flex items-center gap-3 p-4 hover:bg-slate-800/50 rounded-xl transition-colors cursor-pointer group" onClick={handleClick}>
      {/* Thumb */}
      <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
        {session.uploadedImage.previewUrl ? (
          <img src={session.uploadedImage.previewUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <Microscope className="w-5 h-5 text-slate-600" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-200 truncate">
          {session.uploadedImage.file?.name ?? 'Image analysis'}
        </p>
        <p className="text-xs text-slate-500">
          {new Date(session.uploadedImage.uploadedAt).toLocaleString()}
        </p>
        {result && (
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={riskBadgeVariant(result.riskCategory)}>
              {result.riskCategory}
            </Badge>
            <Badge variant="muted">
              {result.stenosisAnalysis.grade}
            </Badge>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={e => { e.stopPropagation(); onDelete(); }}
          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-900/20 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
        <ChevronRight className="w-4 h-4 text-slate-600" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { t, sessions, deleteSession } = useApp();
  const navigate = useNavigate();

  const completedSessions = sessions.filter(s => s.status === 'complete' && s.result);
  const todaySessions     = completedSessions.filter(
    s => new Date(s.uploadedImage.uploadedAt).toDateString() === new Date().toDateString(),
  );
  const highRiskSessions  = completedSessions.filter(
    s => s.result?.riskCategory === 'high' || s.result?.riskCategory === 'very-high',
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-slate-900 via-sky-950/20 to-slate-900 border border-slate-800 rounded-2xl p-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-600/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-sky-900/30 text-sky-400 text-xs px-3 py-1 rounded-full border border-sky-800/50 mb-3">
            <BarChart3 className="w-3 h-3" />
            AI Radiology Research Tool
          </div>
          <h1 className="text-2xl font-bold text-slate-100 mb-1">{t('dash_welcome')}</h1>
          <p className="text-slate-400 text-sm mb-6">{t('dash_subtitle')}</p>
          <div className="flex items-center gap-3 flex-wrap">
            <Button size="lg" onClick={() => navigate('/analyze')}>
              <Plus className="w-5 h-5" />
              {t('dash_new_analysis')}
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/analyze?demo=1')}>
              <FlaskConical className="w-4 h-4" />
              View Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={TrendingUp} label={t('dash_stats_total')} value={completedSessions.length} color="bg-sky-700" />
        <StatCard icon={Calendar}   label={t('dash_stats_today')} value={todaySessions.length}     color="bg-emerald-700" />
        <StatCard icon={AlertTriangle} label={t('dash_stats_high_risk')} value={highRiskSessions.length} color="bg-amber-700" />
      </div>

      {/* Recent sessions */}
      <Card noPadding>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <h2 className="font-semibold text-slate-200">{t('dash_recent')}</h2>
          {sessions.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => navigate('/history')}>
              View all
            </Button>
          )}
        </div>

        {sessions.length === 0 ? (
          <div className="py-12 text-center">
            <Microscope className="w-10 h-10 text-slate-700 mx-auto mb-3" />
            <p className="text-sm text-slate-500">{t('dash_empty')}</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => navigate('/analyze')}>
              <Plus className="w-4 h-4" />
              {t('dash_new_analysis')}
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/50">
            {sessions.slice(0, 8).map(session => (
              <SessionRow
                key={session.id}
                session={session}
                onDelete={() => deleteSession(session.id)}
              />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
