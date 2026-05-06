// ──────────────────────────────────────────────────────────────────────────────
// CarotisAi – History Page
// ──────────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Microscope, Trash2, FileDown, Search } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import { Badge, Button, Card } from '../components/UI';
import { generatePDF } from '../components/Report/pdfGenerator';
import type { RiskCategory } from '../types';

function riskVariant(risk: RiskCategory): 'success' | 'info' | 'warning' | 'danger' {
  switch (risk) {
    case 'low':      return 'success';
    case 'moderate': return 'info';
    case 'high':     return 'warning';
    case 'very-high':return 'danger';
  }
}

export default function HistoryPage() {
  const { t, sessions, deleteSession, clearSessions } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = sessions.filter(s => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (s.uploadedImage.file?.name ?? '').toLowerCase().includes(q) ||
      (s.result?.clinicalSummary ?? '').toLowerCase().includes(q) ||
      (s.result?.riskCategory ?? '').toLowerCase().includes(q)
    );
  });

  const completed = filtered.filter(s => s.status === 'complete' && s.result);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-100">{t('nav_history')}</h1>
          <p className="text-sm text-slate-400">{sessions.length} total analyses</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/analyze')}>
            New Analysis
          </Button>
          {sessions.length > 0 && (
            <Button variant="danger" size="sm" onClick={clearSessions}>
              Clear all
            </Button>
          )}
        </div>
      </div>

      {/* Search */}
      {sessions.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="search"
            placeholder="Search by filename or findings…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-xl pl-9 pr-4 py-2.5 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
          />
        </div>
      )}

      {/* Empty state */}
      {sessions.length === 0 && (
        <Card className="py-16 text-center">
          <Microscope className="w-12 h-12 text-slate-700 mx-auto mb-4" />
          <p className="text-slate-500">{t('dash_empty')}</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => navigate('/analyze')}>
            Start your first analysis
          </Button>
        </Card>
      )}

      {/* List */}
      <div className="space-y-3">
        {completed.map(session => {
          const result = session.result!;
          return (
            <Card key={session.id} noPadding className="hover:border-slate-700 transition-colors">
              <div className="flex items-start gap-4 p-4">
                {/* Thumb */}
                <div className="w-14 h-14 rounded-lg bg-slate-800 border border-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
                  {session.uploadedImage.previewUrl ? (
                    <img src={session.uploadedImage.previewUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <Microscope className="w-6 h-6 text-slate-600" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-sm font-medium text-slate-200 truncate">
                      {session.uploadedImage.file?.name ?? 'Analysis'}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <Badge variant={riskVariant(result.riskCategory)}>
                        {result.riskCategory}
                      </Badge>
                      <Badge variant="muted">
                        {result.stenosisAnalysis.grade}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mt-0.5">
                    {new Date(session.uploadedImage.uploadedAt).toLocaleString()}
                  </p>

                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                    {result.clinicalSummary}
                  </p>
                </div>
              </div>

              {/* Action row */}
              <div className="border-t border-slate-800/60 px-4 py-2.5 flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => generatePDF(result)}
                  title="Download PDF report"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  PDF
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteSession(session.id)}
                  className="text-slate-500 hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && sessions.length > 0 && (
        <p className="text-center text-slate-500 text-sm">No results match your search.</p>
      )}
    </div>
  );
}
