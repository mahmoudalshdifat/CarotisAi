export type CRICheckStatus = 'passed' | 'partial' | 'open';

export type CRICheck = {
  id: string;
  category: string;
  criterion: string;
  status: CRICheckStatus;
  owner: string;
  note: string;
};

export const criChecks: CRICheck[] = [
  {
    id: 'cri-01',
    category: 'Trust',
    criterion: 'Explainability fuer alle KI-Outputs sichergestellt',
    status: 'partial',
    owner: 'B Product UX Trust',
    note: 'UI-Checkliste vorhanden, klinische Validierung steht aus.',
  },
  {
    id: 'cri-02',
    category: 'Compliance',
    criterion: 'DSGVO-Pruefprotokoll abgeschlossen',
    status: 'open',
    owner: 'D Compliance Ops',
    note: 'Ethikrahmen und Datenfreigaben extern noch nicht bestaetigt.',
  },
  {
    id: 'cri-03',
    category: 'Compliance',
    criterion: 'MDR-Einordnung dokumentiert',
    status: 'open',
    owner: 'D Compliance Ops',
    note: 'Produktkategorie (assistiv vs. diagnostisch) noch nicht final entschieden.',
  },
  {
    id: 'cri-04',
    category: 'Security',
    criterion: 'PHI-Schutz in allen Pfaden verifiziert',
    status: 'passed',
    owner: 'E Build Test Ops',
    note: 'Guardrail gr-phi-01 aktiv; kein PHI in Logs oder Fixtures.',
  },
  {
    id: 'cri-05',
    category: 'Auditability',
    criterion: 'Audit-Log fuer alle Nutzerinteraktionen aktiv',
    status: 'passed',
    owner: 'E Build Test Ops',
    note: 'Session-Audit-Log implementiert und im Evidence-Bundle enthalten.',
  },
  {
    id: 'cri-06',
    category: 'Workflow',
    criterion: 'Erster Workflow-Slice komplett und klickbar',
    status: 'passed',
    owner: 'A Research Ops',
    note: 'Vier Schritte implementiert; Step-Persistenz und Evidence-Export aktiv.',
  },
  {
    id: 'cri-07',
    category: 'Trust',
    criterion: 'Human-Review-Gate vor Evidence-Export dokumentiert',
    status: 'partial',
    owner: 'B Product UX Trust',
    note: 'Guardrail vorhanden; Signoff-Flow noch nicht vollstaendig verdrahtet.',
  },
  {
    id: 'cri-08',
    category: 'Ops',
    criterion: 'CI/CD-Gate mit Build und Tests gruen',
    status: 'passed',
    owner: 'E Build Test Ops',
    note: 'Netlify-Build und Vitest-CI konsistent gruen.',
  },
];

export function calcCRIScore(checks: CRICheck[]): number {
  const passed = checks.filter((c) => c.status === 'passed').length;
  const partial = checks.filter((c) => c.status === 'partial').length;
  return Math.round(((passed + partial * 0.5) / checks.length) * 100);
}
