# Compliance Control Matrix

Status: working baseline
Date: 2026-05-04
Owner: Team D Compliance Ops

## Statuslegende

- active: bereits fachlich verankert
- planned: konzipiert, aber noch nicht umgesetzt
- in-progress: in Bearbeitung
- blocked: externe Abhaengigkeit offen

## Kontrollmatrix

| Control ID | Framework | Control Area | Control Summary | Evidence Needed | Owner Type | Status |
|---|---|---|---|---|---|---|
| DA-01 | DSGVO | Verarbeitungsverzeichnis | Datenarten, Zwecke, Speicherorte und Rollen dokumentieren | Verzeichnis, Datenflussdiagramm | DPO/Legal | planned |
| DA-02 | DSGVO | Einwilligung | Forschungs- und KI-bezogene Einwilligung klar und granular definieren | Consent-Texte, SOP, UI-Flow | Legal/Ops | planned |
| DA-03 | DSGVO | Betroffenenrechte | Export-, Berichtigungs- und Loeschprozesse definieren | SOP, API-Design, Auditnachweis | Ops | planned |
| DA-04 | DSGVO | Datensicherheit | Minimierung, Transportschutz und Zugriffskontrolle sicherstellen | Architekturdiagramm, Security Controls | Security | planned |
| MD-01 | MDR | Klassifizierung | Produktpositionierung und regulatorische Klasse festlegen | Klassifizierungsnotiz, externe Bewertung | Regulatory | blocked |
| MD-02 | MDR | Clinical Value | Klinischen Nutzen und Grenzen des Systems beschreiben | Literaturreview, klinischer Bewertungsplan | Regulatory/Medical | planned |
| MD-03 | MDR | Labeling and Warnings | Warnungen, Grenzen und sichere Nutzung definieren | IFU-Entwurf, UI-Warnhinweise | Regulatory/UX | planned |
| QM-01 | ISO 13485 | Requirements Control | Anforderungen versioniert, freigegeben und rueckverfolgbar fuehren | Requirement-Liste, Review-Protokolle | PM/QA | in-progress |
| QM-02 | ISO 13485 | Design Control | Designentscheidungen und Reviewpunkte formal dokumentieren | Architekturartefakte, Decision Logs | PM/QA | planned |
| RM-01 | ISO 14971 | Hazard Identification | Risiken systematisch erfassen und bewerten | Risk Register, Matrix | Regulatory/Risk | planned |
| RM-02 | ISO 14971 | Mitigation | Gegenmassnahmen und Residualrisiken dokumentieren | Mitigation Plan, Verifikationsnachweise | Regulatory/Risk | planned |
| IS-01 | ISO 27001 | Access Control | Rollen, Berechtigungen und Least Privilege definieren | Rollenmatrix, Zugriffspolicy | Security | planned |
| IS-02 | ISO 27001 | Incident Response | Sicherheitsvorfaelle mit klaren Runbooks behandeln | Incident SOP, Eskalationsmatrix | Ops/Security | planned |
| SW-01 | IEC 62304 | Lifecycle Plan | Software-Lebenszyklus und Freigabeschritte dokumentieren | SDLC-Dokument, Freigabegates | PM/Engineering | planned |
| SW-02 | IEC 62304 | Requirements Spec | Funktionale und nichtfunktionale Softwareanforderungen pflegen | SRS, Traceability Matrix | Engineering | in-progress |
| SW-03 | IEC 62304 | Verification | Unit-, Integrations- und Systemtests definieren | Teststrategie, Testberichte | QA/Engineering | in-progress |
| UX-01 | ISO 62366-1 | Use Cases | Kritische Nutzungsszenarien und Nutzerrollen definieren | Personas, Task-Flows | UX/Product | planned |
| UX-02 | ISO 62366-1 | Usability Validation | Fehlerrisiken in Oberflaechen pruefen und absichern | Testplan, Findings, Design-Korrekturen | UX/QA | planned |

## Owner-Typen

- DPO/Legal: Datenschutz, Vertrage, Betroffenenrechte
- Regulatory: MDR, klinische Bewertung, Produktklassifizierung
- PM/QA: Prozess- und Freigabedisziplin
- Security: Zugriff, Geheimnisse, Vorfaelle, Systemschutz
- Engineering: Softwareanforderungen, Implementierung, Verifikation
- UX/Product: Nutzerfluesse, Fehlervorbeugung, IFU-Naehe

## Nächste Repo-Artefakte, die diese Matrix speisen

1. Requirements Traceability Matrix
2. Test Strategy
3. Risk Register
4. Decision Log
5. Incident Runbook
