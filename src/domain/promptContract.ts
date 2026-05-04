export type PromptContract = {
  id: string;
  workflowStepName: string;
  taskDescription: string;
  allowedOutputFormats: string[];
  prohibitedContent: string[];
  humanReviewRequired: boolean;
  version: string;
};

export const promptContracts: PromptContract[] = [
  {
    id: 'pc-analyse-01',
    workflowStepName: 'Analysevertrag',
    taskDescription:
      'Zusammenfassung und kritische Bewertung einer medizinischen Forschungsfrage anhand bereitgestellter Quellen. Keine eigenstaendige Diagnose.',
    allowedOutputFormats: ['strukturierte Zusammenfassung', 'Bullet-Liste', 'Risiko-Tabelle'],
    prohibitedContent: [
      'Patientenidentifizierende Informationen',
      'Prognosen ohne Quellenbeleg',
      'Empfehlungen ausserhalb des definierten Scopes',
    ],
    humanReviewRequired: true,
    version: '1.0.0',
  },
  {
    id: 'pc-explain-01',
    workflowStepName: 'Explainability Review',
    taskDescription:
      'Pruefen, ob die Ausgabe des vorherigen Schritts erklaerbar, nachvollziehbar und durch Quellen gedeckt ist.',
    allowedOutputFormats: ['Review-Checkliste', 'Freitext-Kommentar'],
    prohibitedContent: ['Ueberschreiben von Quellenergebnissen ohne Begruendung'],
    humanReviewRequired: true,
    version: '1.0.0',
  },
];
