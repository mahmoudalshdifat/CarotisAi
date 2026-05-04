export type OpenGate = {
  id: string;
  description: string;
  owner: string;
  blocksRelease: boolean;
};

export const openGates: OpenGate[] = [
  {
    id: 'og-01',
    description: 'Assistive vs. autonome Produktpositionierung ist noch offen.',
    owner: 'B Product UX Trust',
    blocksRelease: true,
  },
  {
    id: 'og-02',
    description: 'Datenfreigaben und Ethikrahmen muessen extern bestaetigt werden.',
    owner: 'D Compliance Ops',
    blocksRelease: true,
  },
  {
    id: 'og-03',
    description: 'Bilinguale oder rein deutschsprachige Oberflaeche ist noch nicht final entschieden.',
    owner: 'B Product UX Trust',
    blocksRelease: false,
  },
];
