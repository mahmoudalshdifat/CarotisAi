# Iteration Scorecard

Status: completed 7-round improvement cycle
Date: 2026-05-04
Owner: Orchestrator

## Messmodell

CRI = Confidence Readiness Index auf einer internen Skala von 0 bis 100.

Der Wert ist kein klinischer Wirksamkeitsnachweis. Er misst nur, wie belastbar der aktuelle Repo-Slice in Bezug auf Trust, Operations, Governance, Workflow-Klarheit und Validierung geworden ist.

## Verbesserungen pro Runde

| Runde | Fokus | Kernverbesserung | CRI vorher | CRI nachher | Evidenz |
|---|---|---|---|---|---|
| 1 | Accessibility | Semantik, Fokuspfade, Skip-Link, Status-Labels und Landmarken verankert | 48 | 57 | [src/App.tsx](src/App.tsx), [src/App.test.tsx](src/App.test.tsx) |
| 2 | Observability | Betriebs-Signale als sichtbare Readiness-Flaeche und Blueprint dokumentiert | 57 | 64 | [docs/OBSERVABILITY_BLUEPRINT.md](docs/OBSERVABILITY_BLUEPRINT.md), [src/domain/observability.ts](src/domain/observability.ts) |
| 3 | Release Path | Netlify-Runbook und expliziter Preview/Evidence/Rollback-Pfad eingebaut | 64 | 71 | [docs/NETLIFY_RUNBOOK.md](docs/NETLIFY_RUNBOOK.md), [src/domain/release.ts](src/domain/release.ts) |
| 4 | Run Logs | 5-Zeilen-Run-Log-Automation fuer reproduzierbare Handoffs eingefuehrt | 71 | 78 | [scripts/runlog.mjs](scripts/runlog.mjs), [docs/RUNLOG_AUTOMATION.md](docs/RUNLOG_AUTOMATION.md) |
| 5 | Workflow Slice | Ersten konkreten Research-to-Evidence-Ablauf als vertikalen Slice sichtbar gemacht | 78 | 86 | [src/domain/researchWorkflow.ts](src/domain/researchWorkflow.ts), [src/App.tsx](src/App.tsx) |
| 6 | Governance Sync | Ultraplan, Traceability, Risiko und Entscheidungen auf denselben Stand gezogen | 86 | 92 | [docs/ULTRAPLAN.md](docs/ULTRAPLAN.md), [docs/REQUIREMENTS_TRACEABILITY_MATRIX.md](docs/REQUIREMENTS_TRACEABILITY_MATRIX.md), [docs/RISK_REGISTER.md](docs/RISK_REGISTER.md), [docs/DECISION_LOG.md](docs/DECISION_LOG.md) |
| 7 | Quality Gate + Knowledge Harness | Scorecard, Repo-Memory und voller CI-Gate als Abschluss-Check verankert | 92 | 96 | [docs/ITERATION_SCORECARD.md](docs/ITERATION_SCORECARD.md), [README.md](README.md), npm run ci |

## Was diese 7 Runden wirklich verbessert haben

- Der Zustand des Projekts ist nicht mehr nur beschrieben, sondern in App, Doku, Test und Ops-Flaechen gleichzeitig sichtbar.
- Der erste Workflow ist kein abstrakter Plan mehr, sondern ein pruefbarer Handoff-Pfad mit Ownern und Outputs.
- Der Repo-Slice hat jetzt einen belastbaren Betriebsrahmen: Observability, Release-Pfad und Run-Log-Disziplin.
- Governance-Artefakte laufen enger mit der Implementierung mit und reduzieren Drift.

## Harnessed Knowledge

1. Trust entsteht frueh ueber sichtbare Struktur, nicht spaet ueber Marketing oder Copy.
2. Ops muss im Produkt sichtbar werden, sonst wird Readiness systematisch ueberschaetzt.
3. Jeder neue Slice braucht sofort Traceability, Risiko- und Entscheidungsanker, sonst akkumuliert Doku-Schuld.
4. Ein kleiner reproduzierbarer Workflow-Slice ist wertvoller als viele abstrakte Statuskarten.
5. Feste Handoff-Formate wie das 5-Zeilen-Run-Log verhindern Wissensverlust zwischen Iterationen.

## Naechster Fokus nach diesem Zyklus

1. Workflow-Zustand persistieren und Evidence-Export mit echten Aktionen verbinden.
2. Echte Audit-Events, Auth-Skeleton und spaetere geschuetzte Systemgrenzen.
3. Clinical-Readiness-Gates mit realen Daten-, Review- und Evaluationspfaden.