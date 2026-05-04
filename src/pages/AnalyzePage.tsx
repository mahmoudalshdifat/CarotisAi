// ──────────────────────────────────────────────────────────────────────────────
// CarotisAi – Analyze Page (Upload → Context → Analyse → Results)
// ──────────────────────────────────────────────────────────────────────────────

import { useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FileDown, RotateCcw, AlertCircle, Key, FlaskConical } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import ImageUpload from '../components/Upload';
import PatientContextForm from '../components/Upload/PatientContextForm';
import AnalysisResults from '../components/Analysis';
import { Button, Alert, Spinner, Card } from '../components/UI';
import { analyseCarotidImage } from '../services/gemini';
import { generatePDF } from '../components/Report/pdfGenerator';
import { DEMO_RESULT } from '../utils/demoData';
import type { PatientContext, AnalysisSession } from '../types';

type Step = 'upload' | 'analyzing' | 'results';

export default function AnalyzePage() {
  const { t, apiKey, addSession, updateSession } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isDemo = searchParams.get('demo') === '1';

  const [step,           setStep]           = useState<Step>(isDemo ? 'results' : 'upload');
  const [imageFile,      setImageFile]       = useState<File | null>(null);
  const [previewUrl,     setPreviewUrl]      = useState<string | null>(null);
  const [patientContext, setPatientContext]  = useState<PatientContext | null>(null);
  const [session,        setSession]         = useState<AnalysisSession | null>(
    isDemo
      ? {
          id: DEMO_RESULT.id,
          uploadedImage: {
            file: new File([], DEMO_RESULT.imageFileName),
            previewUrl: '',
            uploadedAt: DEMO_RESULT.timestamp,
          },
          status: 'complete',
          result: DEMO_RESULT,
        }
      : null,
  );
  const [error, setError] = useState<string | null>(null);

  // ── Image selection ─────────────────────────────────────────────────────────
  const handleImageSelected = useCallback((file: File, url: string) => {
    setImageFile(file);
    setPreviewUrl(url);
    setError(null);
  }, []);

  const handleClear = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setImageFile(null);
    setPreviewUrl(null);
    setError(null);
  }, [previewUrl]);

  // ── Analyse ─────────────────────────────────────────────────────────────────
  const handleAnalyse = useCallback(async () => {
    if (!imageFile) return;

    if (!apiKey) {
      setError('Please add your Google Gemini API key in Settings before analysing.');
      return;
    }

    setError(null);
    setStep('analyzing');

    const newSession: AnalysisSession = {
      id: crypto.randomUUID(),
      uploadedImage: {
        file: imageFile,
        previewUrl: previewUrl ?? '',
        uploadedAt: new Date().toISOString(),
      },
      patientContext: patientContext ?? undefined,
      status: 'analyzing',
    };
    setSession(newSession);
    addSession(newSession);

    try {
      const result = await analyseCarotidImage(apiKey, imageFile, patientContext ?? undefined);
      const updated: Partial<AnalysisSession> = { result, status: 'complete' };
      updateSession(newSession.id, updated);
      setSession(s => s ? { ...s, ...updated } : s);
      setStep('results');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      const updated: Partial<AnalysisSession> = { status: 'error', errorMessage: msg };
      updateSession(newSession.id, updated);
      setSession(s => s ? { ...s, ...updated } : s);
      setError(`Analysis failed: ${msg}`);
      setStep('upload');
    }
  }, [imageFile, previewUrl, apiKey, patientContext, addSession, updateSession]);

  // ── Reset ───────────────────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    handleClear();
    setStep('upload');
    setSession(null);
    setPatientContext(null);
    setError(null);
    // Remove demo param if present
    if (isDemo) navigate('/analyze', { replace: true });
  }, [handleClear, isDemo, navigate]);

  // ── PDF download ─────────────────────────────────────────────────────────────
  const handleDownloadPDF = useCallback(() => {
    if (session?.result) generatePDF(session.result);
  }, [session]);

  // ── Render ───────────────────────────────────────────────────────────────────

  // Analyzing spinner
  if (step === 'analyzing') {
    return (
      <div className="max-w-xl mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="relative">
          <Spinner size="lg" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sky-400 text-xs font-medium">AI</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-slate-200 font-medium">{t('upload_analyzing')}</p>
          <p className="text-slate-500 text-sm mt-1">This may take 10–30 seconds…</p>
        </div>
      </div>
    );
  }

  // Results
  if (step === 'results' && session?.result) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        {/* Demo banner */}
        {isDemo && (
          <Alert variant="info">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4 shrink-0" />
              <span>
                <strong>Demo mode</strong> — these are sample results. To analyse a real image,{' '}
                <button onClick={handleReset} className="underline hover:text-sky-100">
                  start a new analysis
                </button>{' '}
                after adding your{' '}
                <button onClick={() => navigate('/settings')} className="underline hover:text-sky-100">
                  Gemini API key
                </button>.
              </span>
            </div>
          </Alert>
        )}

        {/* Actions bar */}
        <div className="flex items-center gap-3 flex-wrap">
          <Button variant="secondary" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" />
            {t('results_new')}
          </Button>
          <Button onClick={handleDownloadPDF}>
            <FileDown className="w-4 h-4" />
            {t('results_download')}
          </Button>
        </div>

        <AnalysisResults result={session.result} />
      </div>
    );
  }

  // Upload form
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-slate-100">{t('upload_title')}</h1>
        <p className="text-sm text-slate-400 mt-1">
          Upload a carotid artery ultrasound image for AI-assisted analysis.
        </p>
      </div>

      {/* API key warning with demo shortcut */}
      {!apiKey && (
        <Alert variant="warning">
          <div className="flex items-start gap-2">
            <Key className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium">No API key configured</p>
              <p className="text-xs opacity-80 mt-0.5">
                Add your Google Gemini API key in{' '}
                <button
                  onClick={() => navigate('/settings')}
                  className="underline hover:text-amber-100"
                >
                  Settings
                </button>{' '}
                before analysing, or{' '}
                <button
                  onClick={() => navigate('/analyze?demo=1')}
                  className="underline hover:text-amber-100 font-medium"
                >
                  view a demo result
                </button>.
              </p>
            </div>
          </div>
        </Alert>
      )}

      {/* Upload */}
      <ImageUpload
        onImageSelected={handleImageSelected}
        selectedFile={imageFile}
        previewUrl={previewUrl}
        onClear={handleClear}
        disabled={false}
      />

      {/* Patient context */}
      {imageFile && (
        <PatientContextForm context={patientContext} onChange={setPatientContext} />
      )}

      {/* Error */}
      {error && (
        <Alert variant="danger">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        </Alert>
      )}

      {/* Submit */}
      {imageFile && (
        <Card className="bg-gradient-to-r from-sky-950/30 to-slate-900">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-sm font-medium text-slate-200">{imageFile.name}</p>
              <p className="text-xs text-slate-500">
                {(imageFile.size / 1024 / 1024).toFixed(2)} MB
                {patientContext ? ' · Patient context configured' : ''}
              </p>
            </div>
            <Button
              size="lg"
              onClick={handleAnalyse}
              disabled={!imageFile || !apiKey}
            >
              {t('upload_cta')}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
