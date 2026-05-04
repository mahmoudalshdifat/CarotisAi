# Requirements Traceability Matrix

Status: seed version
Date: 2026-05-04
Owner: Shared across Product, Engineering, QA, Compliance

## Nutzung

Jede Anforderung muss auf Design, Tests, Risiken und Evidenz abgebildet werden. Ohne diese Verknuepfung gilt eine Anforderung nicht als freigabereif.

## Matrix

| Req ID | Domain | Requirement | Rationale | Source | Design Ref | Test Ref | Risk Ref | Evidence Ref | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| PRD-001 | Product | Ergebnisse muessen fuer Nutzer verstaendlich zusammengefasst werden | Vertrauen und Nutzbarkeit | Masterplan | Architecture Blueprint | Test Strategy | RM-TBD | TBD | Product/UX | planned |
| PRD-002 | Product | Kritische KI-Ausgaben muessen Begruendung und Grenzen anzeigen | Trust Calibration | Masterplan, Research | Architecture Blueprint | Test Strategy | RM-TBD | TBD | Product/UX | planned |
| PRD-003 | Product | Der Umsetzungsstand muss als priorisierte 20-Punkte-Liste sichtbar sein | systematische Abarbeitung | Ultraplan | src/App.tsx | src/App.test.tsx | R-005 | UI screenshot or test report | Product/UX | completed |
| PRD-004 | Product | Der erste Workflow-Slice muss interaktiv fokussierbar und schrittweise navigierbar sein | Arbeitsklarheit und sichere Handoffs | First Workflow Slice | src/App.tsx | src/App.test.tsx | R-011 | test report | Product/UX | completed |
| AI-001 | AI | KI-Ausgaben duerfen nur ueber versionierte Prompt- und Guardrail-Pfade laufen | Reproduzierbarkeit und Sicherheit | Masterplan | Architecture Blueprint | Test Strategy | RM-TBD | TBD | AI Ops | planned |
| AI-002 | AI | Kritische Workflows muessen Human-in-the-loop vorsehen | Fehlervorbeugung | Masterplan, First Workflow Slice | src/domain/researchWorkflow.ts | src/App.test.tsx | R-010 | test report | AI Ops/Product | completed |
| SEC-001 | Security | Zugriff muss rollenbasiert und nachvollziehbar sein | Least Privilege | Compliance Matrix | Architecture Blueprint | Test Strategy | RM-TBD | TBD | Security | planned |
| SEC-002 | Security | Kritische Aktionen muessen Audit-Ereignisse erzeugen | Accountability | Compliance Matrix | Architecture Blueprint | Test Strategy | RM-TBD | TBD | Security/Ops | planned |
| SEC-003 | Security | Zugriffszonen und Rollen muessen vor Auth-Implementierung dokumentiert sein | Boundary clarity | Auth Boundaries | docs/AUTH_BOUNDARIES.md | manual review | R-003 | document revision | Security/Architecture | completed |
| SEC-004 | Security | Audit-Ereignisse brauchen ein Mindestvertragsschema | auditability | Audit Event Schema | docs/AUDIT_EVENT_SCHEMA.md | manual review | R-009 | document revision | Security/Ops | completed |
| DPA-001 | Privacy | Neue Datenfluesse duerfen nur mit dokumentiertem Zweck eingefuehrt werden | DSGVO Zweckbindung | Compliance Matrix | Project Charter | Test Strategy | RM-TBD | TBD | DPO/Legal | planned |
| DPA-002 | Privacy | Rechte auf Export und Loeschung muessen prozessual und technisch abbildbar sein | Betroffenenrechte | Compliance Matrix | Architecture Blueprint | Test Strategy | RM-TBD | TBD | DPO/Ops | planned |
| QA-001 | Quality | Keine Funktion ohne definierten Testpfad | Qualitaet und Nachweis | Masterplan | Test Strategy | Test Strategy | RM-TBD | TBD | QA/Engineering | in-progress |
| QA-002 | Quality | Zentrale Backlog-Daten muessen in UI und Test synchron bleiben | Konsistenz und Wartbarkeit | Ultraplan | src/domain/ultraplan.ts | src/App.test.tsx | R-005 | test report | QA/Engineering | completed |
| DOC-001 | Documentation | Wichtige Entscheidungen muessen als Decision Log dokumentiert werden | Wissenssicherung | Masterplan | docs/DECISION_LOG.md | manual review | R-008 | document revision | Docs Ops | completed |
| DOC-002 | Documentation | Der Ultraplan muss als Repo-Artefakt gepflegt werden | sichtbarer Arbeitsvertrag | Ultraplan | docs/ULTRAPLAN.md | manual review | R-008 | document revision | Docs Ops | completed |
| DOC-003 | Documentation | Run-Logs muessen in einem festen 5-Zeilen-Format appendbar sein | Wissensfluss und reproduzierbare Handoffs | Runlog Automation | scripts/runlog.mjs | manual CLI validation | R-008 | CLI output | Docs Ops | completed |
| OPS-001 | Operations | Deployment muss Rollback und Monitoring vorsehen | Betriebssicherheit | Masterplan, Observability, Netlify Runbook | docs/NETLIFY_RUNBOOK.md | manual review | R-006 | document revision | Ops | in-progress |
| OPS-002 | Operations | Wichtige Betriebs-Signale muessen vor echtem Rollout sichtbar sein | readiness statt Blindflug | Observability Blueprint | src/domain/observability.ts | src/App.test.tsx | R-006 | test report | Ops/Engineering | completed |
| OPS-003 | Operations | Der Release-Pfad muss Preview, Evidenz und Rollback explizit zeigen | kontrollierte Auslieferung | Netlify Runbook | src/domain/release.ts | src/App.test.tsx | R-006 | test report | Ops/Engineering | completed |

## Ausbauregeln

1. Jede neue Funktion erhaelt eine neue Req ID.
2. Design Ref verweist auf das entscheidende Architektur- oder UX-Artefakt.
3. Test Ref verweist auf den konkreten Testfall oder die Testgruppe.
4. Risk Ref verweist spaeter auf das Risk Register.
5. Evidence Ref verweist auf Review, Report, Screenshot oder automatisierten Nachweis.
