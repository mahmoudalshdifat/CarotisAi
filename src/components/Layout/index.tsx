// ──────────────────────────────────────────────────────────────────────────────
// CarotisAi – Layout (Sidebar + TopBar + Content wrapper)
// ──────────────────────────────────────────────────────────────────────────────

import { useState, type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Microscope,
  History,
  Settings,
  Info,
  Menu,
  X,
  Globe,
  Activity,
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import type { Language } from '../../types';

// ─── Nav items ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { to: '/',         icon: LayoutDashboard, labelKey: 'nav_dashboard' },
  { to: '/analyze',  icon: Microscope,      labelKey: 'nav_analyze'   },
  { to: '/history',  icon: History,         labelKey: 'nav_history'   },
  { to: '/about',    icon: Info,            labelKey: 'nav_about'     },
  { to: '/settings', icon: Settings,        labelKey: 'nav_settings'  },
];

const LANG_OPTIONS: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English',  flag: '🇺🇸' },
  { code: 'de', label: 'Deutsch',  flag: '🇩🇪' },
  { code: 'ar', label: 'العربية', flag: '🇯🇴' },
];

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, language, setLanguage } = useApp();

  return (
    <>
      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 z-50 flex flex-col
          bg-slate-900 border-r border-slate-800
          transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm text-white leading-tight">{t('appName')}</div>
              <div className="text-[10px] text-sky-400 leading-tight">AI Radiology</div>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-500 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ to, icon: Icon, labelKey }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-sky-600/20 text-sky-400 border border-sky-700/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              {t(labelKey)}
            </NavLink>
          ))}
        </nav>

        {/* Language Switcher */}
        <div className="px-3 py-4 border-t border-slate-800">
          <div className="flex items-center gap-2 px-3 mb-2">
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-500 uppercase tracking-wider">Language</span>
          </div>
          <div className="flex gap-1">
            {LANG_OPTIONS.map(({ code, label, flag }) => (
              <button
                key={code}
                onClick={() => setLanguage(code)}
                title={label}
                className={`flex-1 text-xs py-1.5 rounded-lg transition-colors ${
                  language === code
                    ? 'bg-sky-700 text-white'
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                {flag}
              </button>
            ))}
          </div>
        </div>

        {/* Research badge */}
        <div className="px-4 py-3 m-3 rounded-xl bg-amber-950/30 border border-amber-900/50">
          <p className="text-[10px] text-amber-400 leading-relaxed">
            ⚠️ Research tool only – not for clinical diagnosis
          </p>
        </div>
      </aside>
    </>
  );
}

// ─── Top Bar ─────────────────────────────────────────────────────────────────
function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const { t } = useApp();
  return (
    <header className="sticky top-0 z-30 h-14 bg-slate-950/90 backdrop-blur border-b border-slate-800 flex items-center gap-4 px-4">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800"
      >
        <Menu className="w-5 h-5" />
      </button>
      <h1 className="text-sm font-semibold text-slate-300">
        {t('appTagline')}
      </h1>
    </header>
  );
}

// ─── Layout Shell ─────────────────────────────────────────────────────────────
export default function Layout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-auto">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
