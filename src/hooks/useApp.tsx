// ──────────────────────────────────────────────────────────────────────────────
// CarotisAi – App-wide React Context (settings, sessions, language)
// ──────────────────────────────────────────────────────────────────────────────

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { Language, AnalysisSession } from '../types';
import { t as translate } from '../i18n';

// ─── Storage Keys ─────────────────────────────────────────────────────────────
const STORAGE_KEY_APIKEY   = 'carotisai_gemini_key';
const STORAGE_KEY_LANGUAGE = 'carotisai_language';
const STORAGE_KEY_SESSIONS = 'carotisai_sessions';

// ─── Context Shape ────────────────────────────────────────────────────────────
interface AppContextValue {
  apiKey:    string;
  setApiKey: (key: string) => void;

  language:    Language;
  setLanguage: (lang: Language) => void;

  t: (key: string) => string;

  sessions:       AnalysisSession[];
  addSession:     (session: AnalysisSession) => void;
  updateSession:  (id: string, updates: Partial<AnalysisSession>) => void;
  deleteSession:  (id: string) => void;
  clearSessions:  () => void;

  currentSession:    AnalysisSession | null;
  setCurrentSession: (session: AnalysisSession | null) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AppProvider({ children }: { children: ReactNode }) {
  const [apiKey,   setApiKeyState]   = useState<string>(() =>
    localStorage.getItem(STORAGE_KEY_APIKEY) ?? '',
  );
  const [language, setLanguageState] = useState<Language>(() =>
    (localStorage.getItem(STORAGE_KEY_LANGUAGE) as Language | null) ?? 'en',
  );
  const [sessions, setSessions] = useState<AnalysisSession[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SESSIONS);
      if (raw) return JSON.parse(raw) as AnalysisSession[];
    } catch { /* ignore */ }
    return [];
  });
  const [currentSession, setCurrentSession] = useState<AnalysisSession | null>(null);

  // ── Persist settings ────────────────────────────────────────────────────────
  const setApiKey = useCallback((key: string) => {
    setApiKeyState(key);
    localStorage.setItem(STORAGE_KEY_APIKEY, key);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY_LANGUAGE, lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, []);

  // Apply direction on mount
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // ── Session management ───────────────────────────────────────────────────────
  const persistSessions = useCallback((next: AnalysisSession[]) => {
    setSessions(next);
    // Store only completed sessions (no raw images to keep localStorage small)
    const toStore = next.map(s => ({ ...s, uploadedImage: { ...s.uploadedImage, previewUrl: '' } }));
    try { localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(toStore)); } catch { /* quota */ }
  }, []);

  const addSession = useCallback((session: AnalysisSession) => {
    persistSessions([session, ...sessions.slice(0, 49)]); // max 50 sessions
  }, [sessions, persistSessions]);

  const updateSession = useCallback((id: string, updates: Partial<AnalysisSession>) => {
    persistSessions(sessions.map(s => s.id === id ? { ...s, ...updates } : s));
  }, [sessions, persistSessions]);

  const deleteSession = useCallback((id: string) => {
    persistSessions(sessions.filter(s => s.id !== id));
  }, [sessions, persistSessions]);

  const clearSessions = useCallback(() => {
    persistSessions([]);
  }, [persistSessions]);

  const tFn = useCallback((key: string) => translate(language, key), [language]);

  return (
    <AppContext.Provider value={{
      apiKey,    setApiKey,
      language,  setLanguage,
      t:         tFn,
      sessions,  addSession, updateSession, deleteSession, clearSessions,
      currentSession, setCurrentSession,
    }}>
      {children}
    </AppContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
