import type { ReleaseStep } from './types';

export const releaseSteps: ReleaseStep[] = [
  {
    name: 'CI Gate',
    state: 'completed',
    purpose: 'Typecheck, Test und Build muessen erfolgreich durchlaufen sein.',
    owner: 'Build Test Ops',
  },
  {
    name: 'Preview Deploy',
    state: 'active',
    purpose: 'Ein Netlify Preview Deploy dient spaeter als letzter Sichtcheck vor Release.',
    owner: 'Ops',
  },
  {
    name: 'Evidence Archive',
    state: 'completed',
    purpose: 'Test-, Release- und Compliance-Artefakte werden in evidence/ abgelegt.',
    owner: 'Docs Knowledge Ops',
  },
  {
    name: 'Rollback Ready',
    state: 'active',
    purpose: 'Jeder Release-Pfad benoetigt einen klaren Ruecksprung auf den letzten stabilen Build.',
    owner: 'Ops and Security',
  },
];