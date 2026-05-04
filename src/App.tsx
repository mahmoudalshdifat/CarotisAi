import { useEffect, useRef, useState } from 'react';
import type { AuditEvent } from './domain/types';
import {
  checkpoints,
  phases,
  principles,
  teams,
  ultraPlanTodoList,
} from './domain/ultraplan';
import { ultraPlan2TodoList } from './domain/ultraplan2';
import { observabilitySignals } from './domain/observability';
import { releaseSteps } from './domain/release';
import { firstWorkflowSteps } from './domain/researchWorkflow';
import { workflowSections } from './domain/workspace';
import { promptContracts } from './domain/promptContract';
import { guardrailRules } from './domain/guardrails';
import { criChecks, calcCRIScore } from './domain/cri';
import { openGates } from './domain/openGates';
import { loadUser, saveUser, ROLES } from './domain/auth';
import type { AppUser } from './domain/auth';
import type { TodoStatus } from './domain/types';

const STEP_KEY = 'carotisai-workflow-step';
const DARK_KEY = 'carotisai-dark-mode';
const EVIDENCE_PREVIEW_KEY = 'carotisai-last-evidence';
const STEP_STATES_KEY = 'carotisai-step-states';

function readStorage(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
function writeStorage(key: string, value: string): void {
  try { localStorage.setItem(key, value); } catch { /* ignore */ }
}

function loadStepIndex(): number {
  const raw = readStorage(STEP_KEY);
  if (raw !== null) {
    const n = parseInt(raw, 10);
    if (!isNaN(n) && n >= 0 && n < firstWorkflowSteps.length) return n;
  }
  return Math.max(firstWorkflowSteps.findIndex((s) => s.state === 'active'), 0);
}

function loadCompletedSteps(): Set<number> {
  try {
    const raw = readStorage(STEP_STATES_KEY);
    if (raw) return new Set(JSON.parse(raw) as number[]);
  } catch { /* ignore */ }
  return new Set(
    firstWorkflowSteps.reduce<number[]>((acc, s, i) => {
      if (s.state === 'completed') acc.push(i);
      return acc;
    }, []),
  );
}

function loadDarkMode(): boolean {
  return readStorage(DARK_KEY) === 'true';
}

function buildAuditEvent(id: number, action: string, stepName: string, actor: string): AuditEvent {
  return { id, timestamp: new Date().toISOString(), action, stepName, actor };
}

function downloadEvidenceBundle(
  auditLog: AuditEvent[],
  activeStepIndex: number,
  completedSteps: Set<number>,
  user: AppUser,
): void {
  const bundle = {
    exportedAt: new Date().toISOString(),
    schemaVersion: '1.1.0',
    exportedBy: { id: user.id, displayName: user.displayName, role: user.role },
    workflowSnapshot: firstWorkflowSteps.map((step, i) => ({
      index: i,
      name: step.name,
      state: completedSteps.has(i) ? 'completed' : i === activeStepIndex ? 'active' : step.state,
      owner: step.owner,
      outputs: step.outputs,
    })),
    criScore: calcCRIScore(criChecks),
    guardrailsActive: guardrailRules.filter((r) => r.active).length,
    auditLog,
  };
  const json = JSON.stringify(bundle, null, 2);
  writeStorage(EVIDENCE_PREVIEW_KEY, json.slice(0, 4000));
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `carotisai-evidence-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

const phaseStatusMeta = {
  active:    { label: 'aktiv',         icon: '●' },
  pending:   { label: 'ausstehend',    icon: '⏳' },
  completed: { label: 'abgeschlossen', icon: '✓' },
} as const;

const todoStatusMeta = {
  'not-started': { label: 'nicht gestartet', icon: '○' },
  'in-progress': { label: 'in Arbeit',        icon: '●' },
  completed:     { label: 'abgeschlossen',    icon: '✓' },
} as const;

const criStatusMeta = {
  passed:  { label: 'bestanden', color: 'var(--ok)' },
  partial: { label: 'teilweise', color: 'var(--warn)' },
  open:    { label: 'offen',     color: 'var(--muted)' },
} as const;

const severityMeta = {
  blocking: { label: 'Blockierend', color: 'var(--danger)' },
  warning:  { label: 'Warnung',     color: 'var(--warn)' },
  advisory: { label: 'Hinweis',     color: 'var(--muted)' },
} as const;

const explainabilityItems = [
  'Ausgabe enthält eine klare Begruendung',
  'Quellen sind zitiert und zugaenglich',
  'Grenzen des Systems sind benannt',
  'Human-Review-Pfad ist dokumentiert',
  'Keine PHI in der Ausgabe enthalten',
];

export default function App() {
  const [user, setUser] = useState<AppUser>(loadUser);
  const [editingUser, setEditingUser] = useState(false);
  const [draftName, setDraftName] = useState(user.displayName);
  const [draftRole, setDraftRole] = useState(user.role);

  const [darkMode, setDarkMode] = useState(loadDarkMode);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    writeStorage(DARK_KEY, String(darkMode));
  }, [darkMode]);

  const [selectedIndex, setSelectedIndex] = useState(loadStepIndex);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(loadCompletedSteps);

  const actorLabel = `${user.displayName} (${user.role})`;
  const [auditLog, setAuditLog] = useState<AuditEvent[]>(() => [
    buildAuditEvent(1, 'session-start', firstWorkflowSteps[loadStepIndex()].name, 'system'),
  ]);

  const [todoFilter, setTodoFilter] = useState<TodoStatus | 'all'>('all');
  const [todo2Filter, setTodo2Filter] = useState<TodoStatus | 'all'>('all');
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [evidencePreview, setEvidencePreview] = useState<string | null>(() => readStorage(EVIDENCE_PREVIEW_KEY));

  const workflowRef = useRef<HTMLElement>(null);

  const selectedStep = firstWorkflowSteps[selectedIndex];
  const nextStep = firstWorkflowSteps[selectedIndex + 1] ?? null;
  const isLastStep = selectedIndex === firstWorkflowSteps.length - 1;
  const completedCount = completedSteps.size;
  const progressPct = Math.round((completedCount / firstWorkflowSteps.length) * 100);
  const contract = promptContracts.find((c) => c.workflowStepName === selectedStep.name) ?? null;
  const stepGuardrails = guardrailRules.filter((r) => r.active && r.appliesTo.includes(selectedStep.name));
  const criScore = calcCRIScore(criChecks);
  const filteredTodos = ultraPlanTodoList.filter((t) => todoFilter === 'all' || t.status === todoFilter);
  const filteredTodos2 = ultraPlan2TodoList.filter((t) => todo2Filter === 'all' || t.status === todo2Filter);

  function appendAudit(action: string, stepName: string) {
    setAuditLog((prev) => [...prev, buildAuditEvent(prev.length + 1, action, stepName, actorLabel)]);
  }

  function selectStep(index: number) {
    writeStorage(STEP_KEY, String(index));
    appendAudit('step-selected', firstWorkflowSteps[index].name);
    setSelectedIndex(index);
  }

  function advanceStep() {
    if (!nextStep) return;
    const nextIndex = selectedIndex + 1;
    const newCompleted = new Set(completedSteps).add(selectedIndex);
    setCompletedSteps(newCompleted);
    writeStorage(STEP_STATES_KEY, JSON.stringify([...newCompleted]));
    writeStorage(STEP_KEY, String(nextIndex));
    appendAudit('step-advanced', nextStep.name);
    setSelectedIndex(nextIndex);
  }

  function markCurrentComplete() {
    const newCompleted = new Set(completedSteps).add(selectedIndex);
    setCompletedSteps(newCompleted);
    writeStorage(STEP_STATES_KEY, JSON.stringify([...newCompleted]));
    appendAudit('step-completed', selectedStep.name);
  }

  function handleDownloadEvidence() {
    downloadEvidenceBundle(auditLog, selectedIndex, completedSteps, user);
    const preview = readStorage(EVIDENCE_PREVIEW_KEY);
    setEvidencePreview(preview);
    appendAudit('evidence-exported', selectedStep.name);
  }

  function saveUserEdit() {
    const updated: AppUser = { ...user, displayName: draftName.trim() || user.displayName, role: draftRole };
    setUser(updated);
    saveUser(updated);
    appendAudit('user-updated', selectedStep.name);
    setEditingUser(false);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!workflowRef.current) return;
      const active = document.activeElement;
      if (!workflowRef.current.contains(active) && active !== workflowRef.current) return;
      if (e.key === 'ArrowRight' && selectedIndex < firstWorkflowSteps.length - 1) {
        e.preventDefault();
        selectStep(selectedIndex + 1);
      }
      if (e.key === 'ArrowLeft' && selectedIndex > 0) {
        e.preventDefault();
        selectStep(selectedIndex - 1);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div className={`app-shell${darkMode ? ' dark' : ''}`}>
      <a className="skip-link" href="#main-content">Zum Inhalt springen</a>
      <div className="ambient ambient-left" aria-hidden="true" />
      <div className="ambient ambient-right" aria-hidden="true" />

      <header className="topbar">
        <div>
          <p className="eyebrow">CarotisAi</p>
          <h1>Trust-first research cockpit fuer medizinische KI-Arbeit.</h1>
        </div>
        <section className="status-panel" aria-labelledby="status-heading">
          <h2 className="visually-hidden" id="status-heading">Projektstatus</h2>
          <dl className="status-list">
            <div><dt>CRI-Score</dt><dd>{criScore}%</dd></div>
            <div><dt>Ultraplan 1</dt><dd>{ultraPlanTodoList.filter(t => t.status === 'completed').length}/20</dd></div>
            <div><dt>Ultraplan 2</dt><dd>{ultraPlan2TodoList.filter(t => t.status === 'completed').length}/20</dd></div>
            <div><dt>Nutzer</dt><dd>{user.displayName}</dd></div>
          </dl>
          <div className="topbar-actions">
            <button
              type="button"
              className="action-btn action-btn-outline"
              onClick={() => { setDraftName(user.displayName); setDraftRole(user.role); setEditingUser(true); }}
              aria-label="Nutzerprofil bearbeiten"
            >
              ✏ Profil
            </button>
            <button
              type="button"
              className="action-btn action-btn-outline"
              onClick={() => setDarkMode((d) => !d)}
              aria-label={darkMode ? 'Hellmodus aktivieren' : 'Dunkelmodus aktivieren'}
            >
              {darkMode ? '☀ Hell' : '☾ Dunkel'}
            </button>
          </div>
        </section>
      </header>

      {editingUser && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-heading">
          <div className="modal-card">
            <h2 id="modal-heading" className="section-label">Profil bearbeiten</h2>
            <label className="form-label" htmlFor="user-name">Name</label>
            <input
              id="user-name"
              className="form-input"
              type="text"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
            />
            <label className="form-label" htmlFor="user-role">Rolle</label>
            <select
              id="user-role"
              className="form-input"
              value={draftRole}
              onChange={(e) => setDraftRole(e.target.value as AppUser['role'])}
            >
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
            <div className="modal-actions">
              <button type="button" className="action-btn action-btn-advance" onClick={saveUserEdit}>Speichern</button>
              <button type="button" className="action-btn action-btn-outline" onClick={() => setEditingUser(false)}>Abbrechen</button>
            </div>
          </div>
        </div>
      )}

      <main className="layout-grid" id="main-content">

        <section aria-labelledby="north-star-heading" className="hero-card feature-card">
          <h2 className="section-label" id="north-star-heading">North Star</h2>
          <p className="hero-copy">
            Eine ruhige, nachvollziehbare Arbeitsoberflaeche, in der Recherche, KI-Assistenz,
            Begruendung, Tests und Dokumentation nicht auseinanderlaufen.
          </p>
          <div className="signal-row">
            {principles.map((p) => <div key={p} className="signal-chip">{p}</div>)}
          </div>
        </section>

        <aside aria-labelledby="open-gates-heading" className="hero-card note-card">
          <h2 className="section-label" id="open-gates-heading">Open Gates</h2>
          <ul>
            {openGates.map((g) => (
              <li key={g.id}>
                {g.description}
                {g.blocksRelease && (
                  <span className="badge badge-active" style={{ marginLeft: 8 }}>Release-Blocker</span>
                )}
              </li>
            ))}
          </ul>
        </aside>

        <section aria-labelledby="cri-heading" className="feature-card span-two">
          <div className="section-header">
            <h2 className="section-label" id="cri-heading">Clinical Readiness Index</h2>
            <span className="metric-pill" aria-label={`CRI Score ${criScore} Prozent`}>Score: {criScore}%</span>
          </div>
          <div className="cri-progress-bar" role="progressbar" aria-valuenow={criScore} aria-valuemin={0} aria-valuemax={100}>
            <div className="cri-progress-fill" style={{ width: `${criScore}%` }} />
          </div>
          <ul aria-label="CRI Pruefpunkte" className="cri-check-list">
            {criChecks.map((c) => (
              <li key={c.id} className="cri-check-item">
                <span
                  className="cri-status-dot"
                  style={{ background: criStatusMeta[c.status].color }}
                  aria-label={criStatusMeta[c.status].label}
                />
                <div>
                  <strong>{c.category}</strong>: {c.criterion}
                  <small className="cri-note"> — {c.note}</small>
                </div>
                <span className="cri-owner">{c.owner}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="readiness-heading" className="feature-card span-two">
          <div className="section-header">
            <h2 className="section-label" id="readiness-heading">Readiness Ladder</h2>
            <span className="metric-pill">CRI {criScore}% aktuell</span>
          </div>
          <ol aria-label="Readiness Ladder Phasen" className="phase-grid">
            {phases.map((phase) => (
              <li key={phase.name} className="phase-card">
                <div className="phase-topline">
                  <h3>{phase.name}</h3>
                  <span aria-label={`Status ${phaseStatusMeta[phase.status].label}`} className={`badge badge-${phase.status}`}>
                    {phaseStatusMeta[phase.status].icon} {phaseStatusMeta[phase.status].label}
                  </span>
                </div>
                <p>{phase.summary}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="ultraplan-heading" className="feature-card span-two">
          <div className="section-header">
            <h2 className="section-label" id="ultraplan-heading">Ultraplan 1</h2>
            <div className="filter-group" role="group" aria-label="Ultraplan 1 Filter">
              {(['all', 'not-started', 'in-progress', 'completed'] as const).map((f) => (
                <button key={f} type="button" className={`filter-btn${todoFilter === f ? ' is-active' : ''}`} onClick={() => setTodoFilter(f)}>
                  {f === 'all' ? 'Alle' : todoStatusMeta[f].label}
                </button>
              ))}
            </div>
          </div>
          <ol className="todo-grid" aria-label="Ultraplan 1 Aufgaben">
            {filteredTodos.map((item) => (
              <li key={item.id} className="todo-card">
                <div className="phase-topline">
                  <h3 className="card-title">{item.id}. {item.title}</h3>
                  <span aria-label={`Status ${todoStatusMeta[item.status].label}`} className={`badge badge-${item.status}`}>
                    {todoStatusMeta[item.status].icon} {todoStatusMeta[item.status].label}
                  </span>
                </div>
                <p>{item.objective}</p>
                <small>{item.deliverable}</small>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="ultraplan2-heading" className="feature-card span-two">
          <div className="section-header">
            <h2 className="section-label" id="ultraplan2-heading">Ultraplan 2</h2>
            <div className="filter-group" role="group" aria-label="Ultraplan 2 Filter">
              {(['all', 'not-started', 'in-progress', 'completed'] as const).map((f) => (
                <button key={f} type="button" className={`filter-btn${todo2Filter === f ? ' is-active' : ''}`} onClick={() => setTodo2Filter(f)}>
                  {f === 'all' ? 'Alle' : todoStatusMeta[f].label}
                </button>
              ))}
            </div>
          </div>
          <ol className="todo-grid" aria-label="Ultraplan 2 Aufgaben">
            {filteredTodos2.map((item) => (
              <li key={item.id} className="todo-card">
                <div className="phase-topline">
                  <h3 className="card-title">{item.id}. {item.title}</h3>
                  <span aria-label={`Status ${todoStatusMeta[item.status].label}`} className={`badge badge-${item.status}`}>
                    {todoStatusMeta[item.status].icon} {todoStatusMeta[item.status].label}
                  </span>
                </div>
                <p>{item.objective}</p>
                <small>{item.deliverable}</small>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="flow-heading" className="feature-card span-two">
          <div className="section-header">
            <h2 className="section-label" id="flow-heading">Systematic Flow</h2>
            <span className="metric-pill">vom Eingang bis zum Handoff</span>
          </div>
          <ol aria-label="Systematic Flow Schritte" className="workflow-grid">
            {workflowSections.map((section) => (
              <li key={section.name} className="workflow-card">
                <h3>{section.name}</h3>
                <p>{section.purpose}</p>
                <small>{section.primaryTeam}</small>
                <small>{section.exitCriterion}</small>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="teams-heading" className="feature-card span-two">
          <div className="section-header">
            <h2 className="section-label" id="teams-heading">Agent Teams</h2>
            <span className="metric-pill">maximale Parallelitaet, keine Interferenz</span>
          </div>
          <ul aria-label="Agent Teams Liste" className="team-grid">
            {teams.map((team) => (
              <li key={team.name} className="team-card">
                <h3>{team.name}</h3>
                <p>{team.mission}</p>
                <small>{team.output}</small>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="first-workflow-heading"
          className="feature-card span-two"
          ref={workflowRef}
          tabIndex={-1}
        >
          <div className="section-header">
            <h2 className="section-label" id="first-workflow-heading">First Workflow Slice</h2>
            <span className="metric-pill" aria-label={`Fortschritt ${progressPct} Prozent`}>
              {completedCount}/{firstWorkflowSteps.length} steps · {progressPct}%
            </span>
          </div>
          <div className="workflow-progress-bar" role="progressbar" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100}>
            <div className="workflow-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <p className="progress-hint">Tipp: Pfeiltasten ← → wechseln den Schritt (Fokus in Sektion)</p>

          <div className="workflow-interactive">
            <ol aria-label="Erster Workflow" className="workflow-grid workflow-selector-grid">
              {firstWorkflowSteps.map((step, index) => {
                const isSelected = selectedIndex === index;
                const isDone = completedSteps.has(index);
                return (
                  <li key={step.name} className={`workflow-card workflow-card-selectable${isSelected ? ' is-selected' : ''}`}>
                    <button type="button" className="workflow-trigger" onClick={() => selectStep(index)} aria-pressed={isSelected}>
                      <div className="phase-topline">
                        <h3>{step.name}{isDone ? ' ✓' : ''}</h3>
                        <span
                          aria-label={`Status ${isDone ? 'abgeschlossen' : phaseStatusMeta[step.state].label}`}
                          className={`badge badge-${isDone ? 'completed' : step.state}`}
                        >
                          {isDone ? '✓ erledigt' : `${phaseStatusMeta[step.state].icon} ${phaseStatusMeta[step.state].label}`}
                        </span>
                      </div>
                      <p>{step.goal}</p>
                      <small>{step.owner}</small>
                    </button>
                  </li>
                );
              })}
            </ol>

            <aside aria-live="polite" aria-labelledby="workflow-focus-heading" className="workflow-detail">
              <p className="detail-kicker">Aktiver Workflow-Fokus</p>
              <h3 id="workflow-focus-heading">Aktiver Fokus: {selectedStep.name}</h3>
              <p>{selectedStep.goal}</p>

              <dl className="workflow-meta">
                <div>
                  <dt>Status</dt>
                  <dd>{completedSteps.has(selectedIndex) ? 'abgeschlossen' : phaseStatusMeta[selectedStep.state].label}</dd>
                </div>
                <div>
                  <dt>Owner</dt>
                  <dd>{selectedStep.owner}</dd>
                </div>
                <div>
                  <dt>Naechster Uebergabepunkt</dt>
                  <dd>{nextStep ? `${nextStep.name} mit ${nextStep.owner}` : 'Evidence bundle und Release-Signoff abschliessen'}</dd>
                </div>
              </dl>

              {contract && (
                <details className="contract-block">
                  <summary className="detail-kicker">Prompt-Vertrag ansehen</summary>
                  <p><strong>Aufgabe:</strong> {contract.taskDescription}</p>
                  <p><strong>Erlaubte Formate:</strong> {contract.allowedOutputFormats.join(', ')}</p>
                  <p><strong>Verbotene Inhalte:</strong> {contract.prohibitedContent.join(', ')}</p>
                  <p><strong>Human-Review:</strong> {contract.humanReviewRequired ? 'Pflicht' : 'Optional'}</p>
                  <p><strong>Version:</strong> {contract.version}</p>
                </details>
              )}

              {stepGuardrails.length > 0 && (
                <>
                  <p className="detail-kicker" style={{ marginTop: 14 }}>Aktive Guardrails</p>
                  <ul className="guardrail-list">
                    {stepGuardrails.map((g) => (
                      <li key={g.id} className="guardrail-item">
                        <span className="guardrail-badge" style={{ background: severityMeta[g.severity].color }} aria-label={severityMeta[g.severity].label}>
                          {severityMeta[g.severity].label}
                        </span>
                        <span>{g.name}: {g.description}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {selectedStep.name === 'Explainability Review' && (
                <>
                  <p className="detail-kicker" style={{ marginTop: 14 }}>Explainability-Checkliste</p>
                  <ul className="checklist" aria-label="Explainability Pruefpunkte">
                    {explainabilityItems.map((item, i) => (
                      <li key={i} className="checklist-item">
                        <label className="checklist-label">
                          <input
                            type="checkbox"
                            checked={checkedItems.has(i)}
                            onChange={() => {
                              const next = new Set(checkedItems);
                              if (next.has(i)) next.delete(i); else next.add(i);
                              setCheckedItems(next);
                              if (next.size === explainabilityItems.length) {
                                appendAudit('explainability-checklist-complete', selectedStep.name);
                              }
                            }}
                          />
                          {item}
                        </label>
                      </li>
                    ))}
                  </ul>
                  {checkedItems.size === explainabilityItems.length && (
                    <p className="checklist-done">Alle Punkte bestaetigt ✓</p>
                  )}
                </>
              )}

              <p className="detail-kicker" style={{ marginTop: 14 }}>Outputs fuer diesen Schritt</p>
              <ul className="artifact-list" aria-label={`${selectedStep.name} Outputs`}>
                {selectedStep.outputs.map((output) => <li key={output}>{output}</li>)}
              </ul>

              <div className="workflow-actions">
                {!completedSteps.has(selectedIndex) && (
                  <button type="button" className="action-btn action-btn-outline" onClick={markCurrentComplete}>
                    Als erledigt markieren ✓
                  </button>
                )}
                {nextStep && (
                  <button
                    type="button"
                    className="action-btn action-btn-advance"
                    aria-label="Weiter zum naechsten Workflow-Schritt"
                    onClick={advanceStep}
                  >
                    Weiter: <span aria-hidden="true">{nextStep.name}</span> →
                  </button>
                )}
                {isLastStep && (
                  <button type="button" className="action-btn action-btn-export" onClick={handleDownloadEvidence}>
                    Evidence Bundle exportieren
                  </button>
                )}
              </div>
            </aside>
          </div>
        </section>

        {evidencePreview && (
          <section aria-labelledby="evidence-preview-heading" className="feature-card span-two">
            <div className="section-header">
              <h2 className="section-label" id="evidence-preview-heading">Letzter Evidence-Export</h2>
              <span className="metric-pill">Session-Cache</span>
            </div>
            <pre className="evidence-preview">{evidencePreview.slice(0, 800)}{evidencePreview.length > 800 ? '\n…' : ''}</pre>
          </section>
        )}

        <section aria-labelledby="observability-heading" className="feature-card span-two">
          <div className="section-header">
            <h2 className="section-label" id="observability-heading">Observability Signals</h2>
            <span className="metric-pill">runtime, audit, releases</span>
          </div>
          <ul aria-label="Observability Signale" className="team-grid">
            {observabilitySignals.map((signal) => (
              <li key={signal.name} className="team-card">
                <div className="phase-topline">
                  <h3>{signal.name}</h3>
                  <span aria-label={`Status ${phaseStatusMeta[signal.state].label}`} className={`badge badge-${signal.state}`}>
                    {phaseStatusMeta[signal.state].icon} {phaseStatusMeta[signal.state].label}
                  </span>
                </div>
                <p>{signal.description}</p>
                <small>{signal.owner}</small>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="release-heading" className="feature-card span-two">
          <div className="section-header">
            <h2 className="section-label" id="release-heading">Netlify Release Path</h2>
            <span className="metric-pill">preview, evidence, rollback</span>
          </div>
          <ol aria-label="Netlify Release Schritte" className="workflow-grid">
            {releaseSteps.map((step) => (
              <li key={step.name} className="workflow-card">
                <div className="phase-topline">
                  <h3>{step.name}</h3>
                  <span aria-label={`Status ${phaseStatusMeta[step.state].label}`} className={`badge badge-${step.state}`}>
                    {phaseStatusMeta[step.state].icon} {phaseStatusMeta[step.state].label}
                  </span>
                </div>
                <p>{step.purpose}</p>
                <small>{step.owner}</small>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="audit-log-heading" className="feature-card span-two">
          <div className="section-header">
            <h2 className="section-label" id="audit-log-heading">Audit Log</h2>
            <span className="metric-pill">{auditLog.length} Eintraege (Session)</span>
          </div>
          <ol aria-label="Audit-Ereignisse" className="audit-log-list" reversed>
            {[...auditLog].reverse().map((event) => (
              <li key={event.id} className="audit-log-entry">
                <span className="audit-ts">{event.timestamp.replace('T', ' ').slice(0, 19)}</span>
                <span className="audit-action">{event.action}</span>
                <span className="audit-step">{event.stepName}</span>
                <span className="audit-actor">{event.actor}</span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="controls-heading" className="feature-card">
          <h2 className="section-label" id="controls-heading">Critical Controls</h2>
          <ul className="checkpoint-list">
            {checkpoints.map((checkpoint) => <li key={checkpoint}>{checkpoint}</li>)}
          </ul>
        </section>

        <section aria-labelledby="guardrails-heading" className="feature-card">
          <h2 className="section-label" id="guardrails-heading">Guardrail-Regeln</h2>
          <ul className="guardrail-list" aria-label="Alle Guardrails">
            {guardrailRules.map((g) => (
              <li key={g.id} className="guardrail-item">
                <span className="guardrail-badge" style={{ background: severityMeta[g.severity].color }} aria-label={severityMeta[g.severity].label}>
                  {severityMeta[g.severity].label}
                </span>
                <span><strong>{g.name}</strong>: {g.description}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="proof-heading" className="feature-card span-two">
          <h2 className="section-label" id="proof-heading">What this shell proves</h2>
          <div className="proof-stack">
            <div>
              <strong>Architecture can become executable.</strong>
              <p>Der Plan ist jetzt nicht nur textuell, sondern in einem realen Projektgeruest verankert.</p>
            </div>
            <div>
              <strong>Testing starts on day one.</strong>
              <p>Das Frontend-Skeleton ist fuer unmittelbare Build- und Testvalidierung vorbereitet.</p>
            </div>
            <div>
              <strong>Design direction is intentional.</strong>
              <p>Die visuelle Sprache setzt auf Ruhe, Lesbarkeit und Vertrauen statt generischer SaaS-Optik.</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
