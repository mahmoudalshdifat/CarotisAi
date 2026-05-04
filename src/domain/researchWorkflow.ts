import type { WorkflowStep } from './types';

export const firstWorkflowSteps: WorkflowStep[] = [
  {
    name: 'Frage und Kontext',
    state: 'completed',
    goal: 'Die Forschungsfrage, den klinischen Kontext und die Evidenzbasis sauber einfrieren.',
    owner: 'A Research Ops',
    outputs: ['research brief', 'source list', 'risk notes'],
  },
  {
    name: 'Analysevertrag',
    state: 'active',
    goal: 'Definieren, welche KI-Aufgabe geloest wird, welche Guardrails gelten und welche Outputs erlaubt sind.',
    owner: 'C AI LLM Ops + D Compliance Ops',
    outputs: ['prompt contract', 'guardrail rules', 'traceability link'],
  },
  {
    name: 'Explainability Review',
    state: 'pending',
    goal: 'Pruefen, ob Ergebnis, Begruendung, Grenzen und Human-Review-Pfad sichtbar sind.',
    owner: 'B Product UX Trust + Clinical Reviewer',
    outputs: ['ui review', 'explanation checklist', 'signoff note'],
  },
  {
    name: 'Evidence Export',
    state: 'pending',
    goal: 'Die Artefakte fuer Test, Audit, Dokumentation und spaetere Publikation ablegen.',
    owner: 'E Build Test Ops + F Docs Knowledge Ops',
    outputs: ['test evidence', 'decision update', 'release/evidence bundle'],
  },
];