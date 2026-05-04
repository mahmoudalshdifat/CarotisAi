import type { Phase, Team, TodoItem } from './types';

export const phases: Phase[] = [
  {
    name: 'Foundation',
    status: 'completed',
    summary: 'Charter, Architektur, Traceability, Tests und Compliance sind als belastbare Repo-Artefakte angelegt.',
  },
  {
    name: 'Workspace Build',
    status: 'completed',
    summary: 'Frontend-Shell, Netlify-Pfad, Observability, Run-Log-Disziplin und der erste Workflow-Slice sind ausfuehrbar und sichtbar.',
  },
  {
    name: 'Clinical Readiness',
    status: 'active',
    summary: 'Regulatorische Einordnung, echte Datennutzung und klinische Validierung bleiben die naechsten externen Gates.',
  },
];

export const teams: Team[] = [
  {
    name: 'A Research Ops',
    mission: 'Sammelt belastbare Evidenz, Benchmarks und Quellenqualitaet.',
    output: 'Findings, Evidenzstufen, Risiken, Empfehlungen',
  },
  {
    name: 'B Product UX Trust',
    mission: 'Entwirft sichere, erklaerbare und ruhige Nutzerfluesse.',
    output: 'Journeys, Informationshierarchie, Safety Copy',
  },
  {
    name: 'C AI LLM Ops',
    mission: 'Definiert Promptpfade, Guardrails und spaetere Evaluationslogik.',
    output: 'Prompt-Vertraege, Fehlermodi, Drift-Hinweise',
  },
  {
    name: 'D Compliance Ops',
    mission: 'Mappt jedes Feature gegen DSGVO, MDR und ISO-Anforderungen.',
    output: 'Kontrollen, Evidenzbedarf, Blocker',
  },
  {
    name: 'E Build Test Ops',
    mission: 'Verankert Testbarkeit, Negativfaelle und Freigabegates.',
    output: 'Testfaelle, Gates, Artefakte',
  },
  {
    name: 'F Docs Knowledge Ops',
    mission: 'Sichert Handoffs, Decision Logs, Risikoregister und Wissensfluss.',
    output: 'Handoffs, Logs, Wissensartefakte',
  },
];

export const principles = [
  'Trust Calibration statt Black Box',
  'Progressive Disclosure fuer kritische Information',
  'Human-in-the-loop bei sensiblen Entscheidungen',
  'Compliance-by-design und Auditierbarkeit',
];

export const checkpoints = [
  'Netlify als Delivery-Layer, sensible Dienste extern gesichert',
  'Keine Funktion ohne Testpfad und Traceability',
  'Keine PHI in Logs, Fixtures oder Standard-Exports',
  'Open questions bleiben sichtbar statt versteckt',
];

export const ultraPlanTodoList: TodoItem[] = [
  {
    id: 1,
    title: 'Domänenmodell extrahieren',
    status: 'completed',
    objective: 'Gemeinsame Typen fuer Status, Teams, Phasen und Arbeitspakete schaffen.',
    deliverable: 'Shared type layer in src/domain',
  },
  {
    id: 2,
    title: 'Ultraplan-Datenquelle anlegen',
    status: 'completed',
    objective: 'Die 20-Punkte-Arbeitsliste als zentrale Quelle modellieren.',
    deliverable: 'Typed backlog in src/domain/ultraplan.ts',
  },
  {
    id: 3,
    title: 'Roadmap-Dashboard rendern',
    status: 'completed',
    objective: 'Die App an die neue Datenquelle binden und Fortschritt sichtbar machen.',
    deliverable: 'Ultraplan-Sektion in der UI',
  },
  {
    id: 4,
    title: 'Backlog-Tests ergänzen',
    status: 'completed',
    objective: 'Die neue 20er-Liste mit einem Frontend-Test absichern.',
    deliverable: 'Vitest-Absicherung fuer 20 Aufgaben',
  },
  {
    id: 5,
    title: 'Ultraplan-Dokument erstellen',
    status: 'completed',
    objective: 'Die 20 Aufgaben auch als Repo-Dokument mit Reihenfolge, Outcome und Status ablegen.',
    deliverable: 'docs/ULTRAPLAN.md',
  },
  {
    id: 6,
    title: 'Requirement-Matrix erweitern',
    status: 'completed',
    objective: 'Die naechsten echten Features in die Traceability-Matrix einziehen.',
    deliverable: 'Neue Requirement-Eintraege',
  },
  {
    id: 7,
    title: 'Risk-Links ergänzen',
    status: 'completed',
    objective: 'Die neuen Aufgaben mit Risiken und Residualrisiken verbinden.',
    deliverable: 'Erweiterte Risk-Verweise',
  },
  {
    id: 8,
    title: 'Decision-Log fortschreiben',
    status: 'completed',
    objective: 'Die neue Architektur- und Backlog-Entscheidung dokumentieren.',
    deliverable: 'Neue Decision-Log-Eintraege',
  },
  {
    id: 9,
    title: 'Shared Type Layer',
    status: 'completed',
    objective: 'Domain-Typen fuer Requirements, Risks und Audits vorbereiten.',
    deliverable: 'Weitere shared types',
  },
  {
    id: 10,
    title: 'Workflow-Sektionen strukturieren',
    status: 'completed',
    objective: 'Die App entlang echter Arbeitsphasen statt nur Statuskarten gliedern.',
    deliverable: 'Neue Workflow-Bereiche in der UI',
  },
  {
    id: 11,
    title: 'Auth-Grenzen modellieren',
    status: 'completed',
    objective: 'Trust- und Security-Grenzen fuer spaetere Zugriffssteuerung beschreiben.',
    deliverable: 'Auth boundary notes',
  },
  {
    id: 12,
    title: 'Audit-Event-Schema definieren',
    status: 'completed',
    objective: 'Ein minimales Ereignisschema fuer kritische Aktionen vorbereiten.',
    deliverable: 'Audit event contract',
  },
  {
    id: 13,
    title: 'Evidence-Ordner scaffolden',
    status: 'completed',
    objective: 'Eine klare Ablage fuer spaetere Nachweise und Reports anlegen.',
    deliverable: 'Artefaktstruktur im Repo',
  },
  {
    id: 14,
    title: 'CI-Checks erweitern',
    status: 'completed',
    objective: 'Weitere Gates fuer Typisierung, Doku oder Artefakte vorbereiten.',
    deliverable: 'CI-Erweiterungen',
  },
  {
    id: 15,
    title: 'Responsive UI schärfen',
    status: 'completed',
    objective: 'Die neuen Boards und Listen fuer kleinere Viewports verfeinern.',
    deliverable: 'Responsive polish',
  },
  {
    id: 16,
    title: 'Accessibility-Smoke-Tests',
    status: 'completed',
    objective: 'Semantik, Labels und Fokuspfade basisnah pruefen.',
    deliverable: 'A11y smoke tests',
  },
  {
    id: 17,
    title: 'Observability-Blueprint erweitern',
    status: 'completed',
    objective: 'Monitoring-, Alerting- und Drift-Sicht fuer die App schaerfen.',
    deliverable: 'Observability section',
  },
  {
    id: 18,
    title: 'Netlify-Runbook ergänzen',
    status: 'completed',
    objective: 'Deployment-, Rollback- und Runtime-Hinweise konkretisieren.',
    deliverable: 'Erweitertes Netlify-Runbook',
  },
  {
    id: 19,
    title: 'Run-Log automatisieren',
    status: 'completed',
    objective: 'Die Session-Disziplin spaeter mit festen Vorlagen oder Skripten vorbereiten.',
    deliverable: 'Run-log workflow',
  },
  {
    id: 20,
    title: 'Ersten Workflow bauen',
    status: 'completed',
    objective: 'Den ersten echten Arbeitsfluss Recherche -> Analyse -> Begruendung vorbereiten.',
    deliverable: 'Naechster vertikaler Slice',
  },
];