# Risk Register

Status: seed version
Date: 2026-05-04
Owner: Team D Compliance Ops

## Nutzung

Jedes relevante Produkt-, Daten-, Sicherheits-, KI- oder Betriebsrisiko wird mit Wahrscheinlichkeit, Auswirkung, Kontrolle und Rest-Risiko erfasst. Jede neue kritische Funktion muss vor Freigabe mindestens einmal gegen dieses Register geprueft werden.

## Skalen

### Probability
- low
- medium
- high

### Impact
- low
- medium
- high
- critical

### Status
- open
- mitigated
- accepted
- monitoring
- blocked

## Register

| Risk ID | Domain | Scenario | Probability | Impact | Current Controls | Residual Risk | Owner | Status | Linked Req |
|---|---|---|---|---|---|---|---|---|---|
| R-001 | AI | KI-Ausgabe wirkt sicher, obwohl Unsicherheit hoch ist | medium | high | Explainability, Confidence-Anzeige, Human Review | medium | AI Ops/Product | open | PRD-002 |
| R-002 | Privacy | Sensible Daten erscheinen in Logs oder Export-Artefakten | medium | critical | Logging-Regeln, Review, Teststrategie | medium | Security/Ops | open | DPA-001 |
| R-003 | Security | Rollen oder Sessions isolieren Nutzerzugriffe unzureichend | medium | critical | Rollenmatrix, Auth-Tests, Zugriffskontrolle | medium | Security | open | SEC-001 |
| R-004 | Compliance | Produkt wird regulatorisch falsch eingeordnet | medium | critical | Regulatory Review, Dokumentation | high | Regulatory | blocked | MD-01 |
| R-005 | Quality | Funktion wird ohne ausreichende Tests freigegeben | medium | high | Testgates, Signoff, Traceability | medium | QA/Engineering | open | QA-001 |
| R-006 | Operations | Deployment ohne Rollback oder Monitoring fuehrt zu langen Ausfaellen | low | high | Release-Gates, Netlify-Runbook, Observability Blueprint, sichtbarer Release-Pfad | low | Ops | monitoring | OPS-001 |
| R-007 | Product | Backlog und sichtbare App-Roadmap laufen auseinander | medium | medium | Zentrale Datenquelle, UI-Test, Ultraplan-Dokument | low | Product/Engineering | monitoring | PRD-003 |
| R-008 | Documentation | Neue Arbeitspakete werden implementiert, aber nicht dokumentarisch nachgezogen | medium | high | Decision Log, Ultraplan, Run-Log-Automation | low | Docs Ops | monitoring | DOC-002 |
| R-009 | Audit | Kritische Aktionen bleiben spaeter ohne auswertbares Event-Schema | medium | high | Audit Event Schema, Traceability, Evidence-Export-Pfad | medium | Security/Ops | monitoring | SEC-004 |
| R-010 | Workflow | Forschungs- und Analyseergebnisse werden ohne reproduzierbaren Handoff uebergeben | medium | high | First Workflow Slice, klare Owner, definierte Outputs, Evidence Export | low | Product/AI/Docs | monitoring | AI-002 |
| R-011 | Workflow UX | Nutzer verlieren den aktiven Schritt oder den naechsten Handoff im Workflow aus dem Blick | medium | medium | interaktive Schrittwahl, aktiver Fokus, sichtbarer naechster Uebergabepunkt | low | Product/UX | monitoring | PRD-004 |

## Pflege-Regeln

1. Jede neue kritische Funktion prueft bestehende Risiken und erzeugt ggf. neue Eintraege.
2. Risiken ohne Owner sind ungueltig.
3. Rest-Risiko muss explizit bewertet werden.
4. Blockierte Risiken muessen den externen Gate-Grund nennen.
