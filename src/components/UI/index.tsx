// ──────────────────────────────────────────────────────────────────────────────
// CarotisAi – Reusable UI primitives
// ──────────────────────────────────────────────────────────────────────────────

import { type ReactNode, type ButtonHTMLAttributes } from 'react';

// ─── Badge ────────────────────────────────────────────────────────────────────
type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'muted';

const badgeClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-700 text-slate-200',
  success: 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50',
  warning: 'bg-amber-900/60  text-amber-300  border border-amber-700/50',
  danger:  'bg-red-900/60    text-red-300    border border-red-700/50',
  info:    'bg-sky-900/60    text-sky-300    border border-sky-700/50',
  muted:   'bg-slate-800     text-slate-400',
};

export function Badge({
  children,
  variant = 'default',
  className = '',
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
export function Card({
  children,
  className = '',
  noPadding = false,
}: {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}) {
  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-2xl ${noPadding ? '' : 'p-6'} ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`border-b border-slate-800 px-6 py-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

// ─── Button ───────────────────────────────────────────────────────────────────
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
type ButtonSize    = 'sm' | 'md' | 'lg';

const btnBase = 'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500';

const btnVariants: Record<ButtonVariant, string> = {
  primary:   'bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-900/30',
  secondary: 'bg-slate-700 hover:bg-slate-600 text-slate-100',
  danger:    'bg-red-700 hover:bg-red-600 text-white',
  ghost:     'text-slate-300 hover:bg-slate-800 hover:text-white',
  outline:   'border border-slate-700 text-slate-300 hover:border-sky-600 hover:text-sky-400',
};

const btnSizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}) {
  return (
    <button
      className={`${btnBase} ${btnVariants[variant]} ${btnSizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
export function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string }) {
  const { label, hint, className = '', ...rest } = props;
  return (
    <label className="block space-y-1.5">
      {label && <span className="text-sm font-medium text-slate-300">{label}</span>}
      <input
        className={`w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-xl px-4 py-2.5 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent transition ${className}`}
        {...rest}
      />
      {hint && <span className="text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────
export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  const { label, className = '', children, ...rest } = props;
  return (
    <label className="block space-y-1.5">
      {label && <span className="text-sm font-medium text-slate-300">{label}</span>}
      <select
        className={`w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent transition ${className}`}
        {...rest}
      >
        {children}
      </select>
    </label>
  );
}

// ─── Spinner ─────────────────────────────────────────────────────────────────
export function Spinner({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className={`${sizes[size]} border-2 border-sky-600 border-t-transparent rounded-full animate-spin ${className}`} />
  );
}

// ─── Alert ───────────────────────────────────────────────────────────────────
type AlertVariant = 'info' | 'warning' | 'danger' | 'success';

const alertClasses: Record<AlertVariant, string> = {
  info:    'bg-sky-950/50 border-sky-800 text-sky-200',
  warning: 'bg-amber-950/50 border-amber-800 text-amber-200',
  danger:  'bg-red-950/50 border-red-800 text-red-200',
  success: 'bg-emerald-950/50 border-emerald-800 text-emerald-200',
};

export function Alert({ children, variant = 'info', className = '' }: { children: ReactNode; variant?: AlertVariant; className?: string }) {
  return (
    <div className={`border rounded-xl p-4 text-sm ${alertClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────
export function Divider({ label }: { label?: string }) {
  if (!label) return <hr className="border-slate-800 my-4" />;
  return (
    <div className="flex items-center gap-3 my-4">
      <hr className="flex-1 border-slate-800" />
      <span className="text-xs text-slate-500">{label}</span>
      <hr className="flex-1 border-slate-800" />
    </div>
  );
}

// ─── SectionTitle ─────────────────────────────────────────────────────────────
export function SectionTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`text-lg font-semibold text-slate-100 ${className}`}>{children}</h2>
  );
}

// ─── ProgressBar ─────────────────────────────────────────────────────────────
export function ProgressBar({
  value,
  max = 100,
  color = 'sky',
}: {
  value: number;
  max?: number;
  color?: 'sky' | 'emerald' | 'amber' | 'red';
}) {
  const pct   = Math.min(100, Math.max(0, (value / max) * 100));
  const colors = { sky: 'bg-sky-500', emerald: 'bg-emerald-500', amber: 'bg-amber-500', red: 'bg-red-500' };
  return (
    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-700 ${colors[color]}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
