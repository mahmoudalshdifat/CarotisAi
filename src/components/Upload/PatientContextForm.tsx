// ──────────────────────────────────────────────────────────────────────────────
// CarotisAi – Patient Context Form
// ──────────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { UserRound, ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { Select, Input, Card } from '../UI';
import type { PatientContext } from '../../types';

const RISK_FACTOR_OPTIONS = [
  'hypertension', 'diabetes', 'hyperlipidaemia', 'smoking',
  'obesity', 'atrial fibrillation', 'coronary artery disease',
  'previous stroke/TIA', 'peripheral artery disease', 'renal disease',
];

interface Props {
  context: PatientContext | null;
  onChange: (ctx: PatientContext | null) => void;
}

export default function PatientContextForm({ context, onChange }: Props) {
  const { t } = useApp();
  const [open, setOpen] = useState(false);

  const update = (partial: Partial<PatientContext>) => {
    const base: PatientContext = context ?? {
      ageGroup: 'middle',
      sex: 'unknown',
      riskFactors: [],
      clinicalQuestion: '',
    };
    onChange({ ...base, ...partial });
  };

  const toggleRiskFactor = (factor: string) => {
    const current = context?.riskFactors ?? [];
    const next = current.includes(factor)
      ? current.filter(f => f !== factor)
      : [...current, factor];
    update({ riskFactors: next });
  };

  return (
    <Card noPadding>
      {/* Header / toggle */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-800/50 transition-colors rounded-2xl"
      >
        <div className="flex items-center gap-3">
          <UserRound className="w-4 h-4 text-sky-400" />
          <span className="text-sm font-medium text-slate-200">{t('context_title')}</span>
          {context && (
            <span className="text-xs bg-sky-900/40 text-sky-400 border border-sky-800/50 px-2 py-0.5 rounded-full">
              Configured
            </span>
          )}
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-slate-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-500" />
        )}
      </button>

      {/* Body */}
      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-slate-800 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label={t('context_ageGroup')}
              value={context?.ageGroup ?? 'middle'}
              onChange={e => update({ ageGroup: e.target.value as PatientContext['ageGroup'] })}
            >
              <option value="young">{t('context_young')}</option>
              <option value="middle">{t('context_middle')}</option>
              <option value="elderly">{t('context_elderly')}</option>
            </Select>

            <Select
              label={t('context_sex')}
              value={context?.sex ?? 'unknown'}
              onChange={e => update({ sex: e.target.value as PatientContext['sex'] })}
            >
              <option value="unknown">{t('context_unknown')}</option>
              <option value="male">{t('context_male')}</option>
              <option value="female">{t('context_female')}</option>
            </Select>
          </div>

          <Input
            label={t('context_question')}
            placeholder="e.g. Assessment of carotid stenosis prior to CEA"
            value={context?.clinicalQuestion ?? ''}
            onChange={e => update({ clinicalQuestion: e.target.value })}
          />

          <div>
            <p className="text-sm font-medium text-slate-300 mb-2">{t('context_riskFactors')}</p>
            <div className="flex flex-wrap gap-2">
              {RISK_FACTOR_OPTIONS.map(factor => {
                const active = context?.riskFactors.includes(factor) ?? false;
                return (
                  <button
                    key={factor}
                    type="button"
                    onClick={() => toggleRiskFactor(factor)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      active
                        ? 'bg-sky-700 border-sky-600 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-sky-700 hover:text-sky-400'
                    }`}
                  >
                    {factor}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => { onChange(null); setOpen(false); }}
            className="text-xs text-slate-500 hover:text-red-400 underline underline-offset-2 transition-colors"
          >
            {t('context_skip')}
          </button>
        </div>
      )}
    </Card>
  );
}
