import type { WorkflowSection } from './types';

export const workflowSections: WorkflowSection[] = [
  {
    name: 'Research Intake',
    purpose: 'Fragestellung, Quellenlage und Evidenzniveau fuer einen neuen Arbeitslauf klarziehen.',
    primaryTeam: 'A Research Ops',
    exitCriterion: 'Frage, Quellenlage und Unsicherheiten sind dokumentiert.',
  },
  {
    name: 'Trust Design',
    purpose: 'Die Nutzeransicht so strukturieren, dass Sicherheit, Begruendung und Grenzen sichtbar bleiben.',
    primaryTeam: 'B Product UX Trust',
    exitCriterion: 'Informationshierarchie, Safety Copy und Explainability stehen.',
  },
  {
    name: 'Governed Build',
    purpose: 'Implementierung, Tests, Guardrails und Compliance gleichzeitig verankern.',
    primaryTeam: 'C AI LLM Ops + E Build Test Ops + D Compliance Ops',
    exitCriterion: 'Code, Tests, Traceability und Kontrollbedarf sind konsistent.',
  },
  {
    name: 'Evidence Handoff',
    purpose: 'Ergebnisse, Risiken, Signoff und Doku fuer den naechsten Lauf sichern.',
    primaryTeam: 'F Docs Knowledge Ops',
    exitCriterion: 'Run-Log, Decision-Log und Evidenzpfade sind aktualisiert.',
  },
];