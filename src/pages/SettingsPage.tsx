// ──────────────────────────────────────────────────────────────────────────────
// CarotisAi – Settings Page
// ──────────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, Key, Globe } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import { Card, Button, Alert } from '../components/UI';
import type { Language } from '../types';

const LANGUAGES: { code: Language; label: string; native: string; flag: string }[] = [
  { code: 'en', label: 'English',  native: 'English',  flag: '🇺🇸' },
  { code: 'de', label: 'German',   native: 'Deutsch',  flag: '🇩🇪' },
  { code: 'ar', label: 'Arabic',   native: 'العربية', flag: '🇯🇴' },
];

export default function SettingsPage() {
  const { t, apiKey, setApiKey, language, setLanguage } = useApp();

  const [draftKey,  setDraftKey]  = useState(apiKey);
  const [showKey,   setShowKey]   = useState(false);
  const [saved,     setSaved]     = useState(false);

  const handleSave = () => {
    setApiKey(draftKey.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-semibold text-slate-100">{t('settings_title')}</h1>

      {/* API Key */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Key className="w-4 h-4 text-sky-400" />
          <h2 className="font-medium text-slate-200">{t('settings_apiKey')}</h2>
        </div>

        <div className="relative">
          <input
            type={showKey ? 'text' : 'password'}
            value={draftKey}
            onChange={e => { setDraftKey(e.target.value); setSaved(false); }}
            placeholder={t('settings_apiKey_placeholder')}
            className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-xl px-4 py-2.5 pr-10 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent transition"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={() => setShowKey(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <p className="text-xs text-slate-500 mt-2 leading-relaxed">{t('settings_apiKey_hint')}</p>

        <div className="mt-4 flex items-center gap-3">
          <Button onClick={handleSave}>
            {t('settings_save')}
          </Button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              {t('settings_saved')}
            </span>
          )}
        </div>

        <Alert variant="info" className="mt-4">
          <p className="font-medium text-xs mb-1">How to get a Gemini API key</p>
          <ol className="text-xs space-y-1 list-decimal list-inside opacity-80">
            <li>Visit <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="underline">aistudio.google.com/apikey</a></li>
            <li>Sign in with your Google account</li>
            <li>Click "Create API Key"</li>
            <li>Copy and paste it above</li>
          </ol>
        </Alert>
      </Card>

      {/* Language */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-4 h-4 text-sky-400" />
          <h2 className="font-medium text-slate-200">{t('settings_language')}</h2>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {LANGUAGES.map(({ code, label, native, flag }) => (
            <button
              key={code}
              onClick={() => setLanguage(code)}
              className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-sm transition-all ${
                language === code
                  ? 'border-sky-600 bg-sky-900/30 text-sky-400'
                  : 'border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'
              }`}
            >
              <span className="text-2xl">{flag}</span>
              <span className="font-medium text-xs">{native}</span>
              <span className="text-[10px] opacity-60">{label}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Disclaimer */}
      <Card className="bg-amber-950/20 border-amber-900/50">
        <h2 className="font-medium text-amber-300 mb-2">{t('disclaimer_title')}</h2>
        <p className="text-xs text-amber-200/70 leading-relaxed">{t('disclaimer_body')}</p>
      </Card>
    </div>
  );
}
