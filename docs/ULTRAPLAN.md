# Ultraplan

Status: completed current 20-point slice
Date: 2026-05-04
Owner: Orchestrator

## Ziel

Der Ultraplan ist die sichtbare 20-Punkte-Arbeitsliste fuer die naechsten systematischen Projekt-Slices. Er verbindet Umsetzung, Dokumentation und Governance.

## Fortschritt

- completed: 20
- in-progress: 0
- not-started: 0

## Todo-Liste

| # | Titel | Status | Ziel | Deliverable |
|---|---|---|---|---|
| 1 | Domänenmodell extrahieren | completed | Gemeinsame Typen fuer Status, Teams, Phasen und Arbeitspakete schaffen | Shared type layer in src/domain |
| 2 | Ultraplan-Datenquelle anlegen | completed | Die 20-Punkte-Arbeitsliste als zentrale Quelle modellieren | Typed backlog in src/domain/ultraplan.ts |
| 3 | Roadmap-Dashboard rendern | completed | Die App an die neue Datenquelle binden und Fortschritt sichtbar machen | Ultraplan-Sektion in der UI |
| 4 | Backlog-Tests ergänzen | completed | Die neue 20er-Liste mit einem Frontend-Test absichern | Vitest-Absicherung fuer 20 Aufgaben |
| 5 | Ultraplan-Dokument erstellen | completed | Die 20 Aufgaben auch als Repo-Dokument mit Reihenfolge, Outcome und Status ablegen | docs/ULTRAPLAN.md |
| 6 | Requirement-Matrix erweitern | completed | Die naechsten echten Features in die Traceability-Matrix einziehen | Neue Requirement-Eintraege |
| 7 | Risk-Links ergänzen | completed | Die neuen Aufgaben mit Risiken und Residualrisiken verbinden | Erweiterte Risk-Verweise |
| 8 | Decision-Log fortschreiben | completed | Die neue Architektur- und Backlog-Entscheidung dokumentieren | Neue Decision-Log-Eintraege |
| 9 | Shared Type Layer | completed | Domain-Typen fuer Requirements, Risks und Audits vorbereiten | Weitere shared types |
| 10 | Workflow-Sektionen strukturieren | completed | Die App entlang echter Arbeitsphasen statt nur Statuskarten gliedern | Neue Workflow-Bereiche in der UI |
| 11 | Auth-Grenzen modellieren | completed | Trust- und Security-Grenzen fuer spaetere Zugriffssteuerung beschreiben | Auth boundary notes |
| 12 | Audit-Event-Schema definieren | completed | Ein minimales Ereignisschema fuer kritische Aktionen vorbereiten | Audit event contract |
| 13 | Evidence-Ordner scaffolden | completed | Eine klare Ablage fuer spaetere Nachweise und Reports anlegen | Artefaktstruktur im Repo |
| 14 | CI-Checks erweitern | completed | Weitere Gates fuer Typisierung, Doku oder Artefakte vorbereiten | CI-Erweiterungen |
| 15 | Responsive UI schärfen | completed | Die neuen Boards und Listen fuer kleinere Viewports verfeinern | Responsive polish |
| 16 | Accessibility-Smoke-Tests | completed | Semantik, Labels und Fokuspfade basisnah pruefen | A11y smoke tests |
| 17 | Observability-Blueprint erweitern | completed | Monitoring-, Alerting- und Drift-Sicht fuer die App schaerfen | Observability section |
| 18 | Netlify-Runbook ergänzen | completed | Deployment-, Rollback- und Runtime-Hinweise konkretisieren | Erweitertes Netlify-Runbook |
| 19 | Run-Log automatisieren | completed | Die Session-Disziplin spaeter mit festen Vorlagen oder Skripten vorbereiten | Run-log workflow |
| 20 | Ersten Workflow bauen | completed | Den ersten echten Arbeitsfluss Recherche -> Analyse -> Begruendung vorbereiten | Naechster vertikaler Slice |

## Abarbeitungsregeln

1. Immer genau ein aktiv markiertes Hauptarbeitspaket.
2. Jeder erledigte Punkt muss auf Test, Doku oder Governance einzahlen.
3. Kein Wechsel zu spaeteren Punkten, wenn ein frueherer Punkt ohne guten Grund offen bleibt.
4. Jede neue Funktion muss spaeter gegen Requirement-, Risk- und Decision-Artefakte rueckverknuepft werden.

## Abschluss dieses Slices

Der aktuelle 20-Punkte-Slice ist abgeschlossen. Die interaktive Workflow-Ausfuehrung hat als erster Nachfolge-Slice begonnen. Der naechste Ausbau verschiebt sich jetzt auf Workflow-Persistenz, Auth/Audit und Clinical Readiness.