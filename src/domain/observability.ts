import type { OperationalSignal } from './types';

export const observabilitySignals: OperationalSignal[] = [
  {
    name: 'CI Gate',
    state: 'completed',
    description: 'Typecheck, Test und Build laufen ueber einen zentralen npm run ci Pfad.',
    owner: 'Build Test Ops',
  },
  {
    name: 'Frontend Runtime',
    state: 'active',
    description: 'Fehlergrenzen, Session-Korrelation und strukturierte Frontend-Signale sind als naechster Betriebsslice vorbereitet.',
    owner: 'AI LLM Ops + Ops',
  },
  {
    name: 'Audit Capture',
    state: 'active',
    description: 'Ein Event-Schema existiert; die spaetere Ingest-Strecke wird daran ausgerichtet.',
    owner: 'Security Ops',
  },
  {
    name: 'Release Evidence',
    state: 'completed',
    description: 'Evidence-Ordner und Release-Ablage sind als Nachweispfad vorhanden.',
    owner: 'Docs Knowledge Ops',
  },
];