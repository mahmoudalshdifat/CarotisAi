export type GuardrailSeverity = 'blocking' | 'warning' | 'advisory';

export type GuardrailRule = {
  id: string;
  name: string;
  description: string;
  severity: GuardrailSeverity;
  appliesTo: string[];
  active: boolean;
};

export const guardrailRules: GuardrailRule[] = [
  {
    id: 'gr-phi-01',
    name: 'Kein PHI in Ausgaben',
    description: 'Patientenidentifizierende Informationen dürfen in keiner KI-Ausgabe erscheinen.',
    severity: 'blocking',
    appliesTo: ['Analysevertrag', 'Explainability Review', 'Evidence Export'],
    active: true,
  },
  {
    id: 'gr-cite-01',
    name: 'Quellenbeleg erforderlich',
    description: 'Jede faktische Aussage in der Ausgabe muss einer aufgeführten Quelle zuzuordnen sein.',
    severity: 'blocking',
    appliesTo: ['Analysevertrag'],
    active: true,
  },
  {
    id: 'gr-scope-01',
    name: 'Scope-Begrenzung',
    description: 'Ausgaben dürfen nicht über den definierten Research-Scope hinausgehen.',
    severity: 'warning',
    appliesTo: ['Analysevertrag', 'Explainability Review'],
    active: true,
  },
  {
    id: 'gr-human-01',
    name: 'Human-Review-Gate',
    description: 'Kein Ergebnis darf ohne dokumentierten Human-Review-Schritt in den Evidence-Export fließen.',
    severity: 'blocking',
    appliesTo: ['Evidence Export'],
    active: true,
  },
  {
    id: 'gr-log-01',
    name: 'Audit-Pflicht',
    description: 'Jede Nutzerinteraktion mit einem KI-Output muss als Audit-Event protokolliert werden.',
    severity: 'advisory',
    appliesTo: ['Analysevertrag', 'Explainability Review', 'Evidence Export'],
    active: true,
  },
];
