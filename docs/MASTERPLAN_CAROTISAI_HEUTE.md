# CarotisAi Masterplan (Heute)

Status: Plan-only, keine Code-Implementierung in diesem Schritt
Datum: 2026-05-04
Rolle: Orchestrator (Principal Architect + Senior Full-Stack)

## 0. Zielbild für heute (Agent-Zeit, nicht Human-Zeit)

Heute vollständig realistisch für den Agenten umsetzbar:
1. Vollständige Projektarchitektur und Agentenstruktur finalisieren.
2. Vollständige Prompt- und Runbook-Landschaft erstellen.
3. Vollständige Compliance- und Test-Blueprints bis Deployment-ready definieren.
4. Vollständige Handoff-Pakete für Opus 4.7 und Obsidian erstellen.
5. Vollständige Arbeitsregeln für maximale Parallelität ohne Interferenz festschreiben.

Nicht heute realistisch ohne externe Menschen/Institutionen:
1. Echte klinische Datennutzung (Ethikvotum, Partnerklinik, Rechtsfreigaben).
2. MDR-Klassifizierungsbescheid durch Notified Body.
3. Produktivfreigabe echter Patientendaten.

## 1. Wissenschaftliche Leitprinzipien (Trust + Simplicity)

Evidenzbasiert aus HCI/Health-UX/MedTech-Standards:
1. Trust Calibration statt blindes Vertrauen: Unsicherheit explizit anzeigen (Konfidenz, Evidenzbasis).
2. Progressive Disclosure: pro kritischem Screen 5-7 Kerndaten, Details auf Abruf.
3. Explainability on demand: klare "Warum"-Erklärungen pro AI-Ergebnis.
4. Human-in-the-loop: medizinische Freigabe- und Eskalationspfade sichtbar.
5. Fehlerprävention vor Fehlerheilung: kritische Aktionen doppelt absichern.
6. Konsistenz als Sicherheitsfaktor: gleiche UI-Muster, Terminologie, Interaktionsregeln.
7. Privacy-Transparenz als Vertrauensbasis: Datenfluss, Zweck, Aufbewahrung klar sichtbar.
8. Performance als Vertrauenssignal: Antwortzeiten unter 2s für Kerninteraktionen.

## 2. Zielarchitektur (vollständig planbar heute)

### 2.1 Systemarchitektur
- Frontend: wissenschaftliche Web-App (Trust-first UX, erklärbare Ergebnisse, Studienmodus).
- Backend: orchestrierte Services für Inferenz, Audit, Dokumentation, Agent-Tasks.
- AI Layer: Gemini API/Google AI + Agent-Router + Memory-System.
- Memory: Session-/Repo-Layer + Run-Logs + Entscheidungsprotokolle.
- Deployment: Netlify für Frontend/Edge-Funktionen, externe gesicherte Services für sensible Verarbeitung.

### 2.2 Agenten-Topologie
- Team A Research Ops: Literatur, Benchmarks, Quellenvalidierung.
- Team B Product/UX Trust: Informationsarchitektur, Simplicity-Regeln, UI-Sicherheitsmuster.
- Team C AI/LLM Ops: Prompting, Guardrails, Evaluations, Drift-Strategie.
- Team D Compliance Ops: DSGVO/MDR/ISO-Traceability, Audit-Artefakte.
- Team E Build/Test Ops: Teststrategie, Quality Gates, CI/CD-Freigaberegeln.
- Team F Docs/Knowledge Ops: SOPs, Study Pack, Obsidian-Wissensgraph.

## 3. Hauptregel (ab jetzt für alle Sessions)

Maximale Subagenten-Nutzung, maximale Parallelität, keine Interferenz.

### 3.1 Interferenzfreie Parallelität
- Jeder Subagent bekommt exklusive Artefakte (Dateien/Ordner/Tasks).
- Keine zwei Subagenten bearbeiten denselben Scope gleichzeitig.
- Merge nur über Orchestrator mit Qualitäts- und Konsistenzprüfung.

### 3.2 Routing-Matrix
- Recherchefragen -> Team A.
- UX/Vertrauen -> Team B.
- Prompt/AI-Ausführung -> Team C.
- Regulatorik/Datenschutz -> Team D.
- Test/CI/DoD -> Team E.
- Handoff/Memory/Obsidian -> Team F.

### 3.3 Qualitäts-Gates pro Subagent-Lauf
1. Zielklarheit (Input/Output/DoD).
2. Quellennachweise (wissenschaftlich/technisch).
3. Risiken/Annahmen explizit.
4. Reproduzierbarkeit (Schritte, Parameter, Artefakte).
5. Übergabeformat standardisiert.

## 4. Detaillierter Ausführungsplan (Phasenhierarchie)

## Phase 1: Grounding und Scope-Fixierung

### Schritt 1.1: Forschungs- und Produkt-Charter
- Unter-Schritt 1.1.1: Problemstatement für Dr. Aroob als Doktorarbeits-Workflow formal definieren.
- Unter-Schritt 1.1.2: Primäre Nutzerrollen definieren (Doktorandin, Betreuer, klinische Reviewer, Data/QA).
- Unter-Schritt 1.1.3: Zielmetriken definieren:
  - Unter-Unter-Schritt 1.1.3.a: wissenschaftliche Produktivität (Zeitersparnis in %).
  - Unter-Unter-Schritt 1.1.3.b: Ergebnisqualität (Fehlerquote, Reproduzierbarkeit, Evidenzabdeckung).
  - Unter-Unter-Schritt 1.1.3.c: Vertrauensmetriken (Erklärbarkeit, Nachvollziehbarkeit, Nutzerakzeptanz).

### Schritt 1.2: Wissens- und Quellenmodell
- Unter-Schritt 1.2.1: Quellenkanäle standardisieren (GitHub, Literatur, Klinik-Webseiten, interne Notizen).
- Unter-Schritt 1.2.2: Evidenzklassifikation (Systematic Review > Leitlinie > Fallbericht > Blog).
- Unter-Schritt 1.2.3: Zitationsregeln und Versionsnachverfolgung festlegen.

## Phase 2: Vertrauens- und Simplicity-Designsystem

### Schritt 2.1: Design-Manifest (trust-first)
- Unter-Schritt 2.1.1: Designfamilie wählen (editorial, klinisch-seriös, reduzierte Farbcodierung).
- Unter-Schritt 2.1.2: Anti-Slop-Regeln fest definieren (keine generische Container-Suppe, keine irrelevanten Animationen).
- Unter-Schritt 2.1.3: Komponentenregeln mit Sicherheitspriorität.

### Schritt 2.2: Informationsarchitektur
- Unter-Schritt 2.2.1: Progressive Disclosure für medizinische Entscheidungsansichten.
- Unter-Schritt 2.2.2: Explainability-Muster pro Ergebnis (Warum, Datenbasis, Konfidenz, Grenzen).
- Unter-Schritt 2.2.3: Human-Override und Eskalationspfade in jedem kritischen Flow.

## Phase 3: Agent-Orchestrierung und Tooling-Backbone

### Schritt 3.1: Team-Orchestrierung
- Unter-Schritt 3.1.1: Team-Kanban mit WIP-Limits je Team (keine Cross-Interference).
- Unter-Schritt 3.1.2: Delegationsprotokolle für Subagenten standardisieren.
- Unter-Schritt 3.1.3: Ergebnis-Schema je Team (Findings, Risiken, Nächster Lauf).

### Schritt 3.2: Integrationen (konzeptionell)
- Unter-Schritt 3.2.1: Caveman für Token-Effizienz in Ausgaben.
- Unter-Schritt 3.2.2: Hermes-Agent für Multi-Agent-Delegation.
- Unter-Schritt 3.2.3: Browser-Harness für robuste Browser-Automation.
- Unter-Schritt 3.2.4: Claude-mem für persistentes Arbeitsgedächtnis.
- Unter-Schritt 3.2.5: Remotion für wissenschaftliche Ergebnis-/Erklärvideos.

## Phase 4: Compliance-by-Design

### Schritt 4.1: Rechts- und Normenrahmen
- Unter-Schritt 4.1.1: DSGVO-Art. 5/6/9/25/28/33/34 als Muss-Katalog.
- Unter-Schritt 4.1.2: MDR-Kontext (Klassifizierung, Technical File, PMCF).
- Unter-Schritt 4.1.3: ISO/IEC 27001, ISO 13485, ISO 14971, IEC 62304, ISO 62366-1 verankern.

### Schritt 4.2: Traceability
- Unter-Schritt 4.2.1: Requirement -> Design -> Test -> Risiko -> Evidenz Matrix.
- Unter-Schritt 4.2.2: Audit-Logs, Zugriffsprotokolle, Änderungsnachweise definieren.
- Unter-Schritt 4.2.3: Löschung vs. Aufbewahrung (DSGVO/MDR-Konfliktlösung) verfahrensseitig planen.

## Phase 5: Testarchitektur (jede Funktion automatisiert testbar)

### Schritt 5.1: Testpyramide
- Unter-Schritt 5.1.1: Unit-Tests für Kernlogik.
- Unter-Schritt 5.1.2: Integrations-Tests für Datenflüsse.
- Unter-Schritt 5.1.3: E2E-Tests für kritische User Journeys.
- Unter-Schritt 5.1.4: Security-Tests (OWASP, Secret Leakage, AuthZ/AuthN).
- Unter-Schritt 5.1.5: Modelltests (Leistung, Drift, Robustheit, Fairness).

### Schritt 5.2: Freigabegates
- Unter-Schritt 5.2.1: Mindestabdeckung definieren.
- Unter-Schritt 5.2.2: Fehlerbudget und SLO/SLA pro Dienst.
- Unter-Schritt 5.2.3: Deployment-Blocker bei Compliance- oder Security-Verstößen.

## Phase 6: Dokumentation und Wissensbetrieb

### Schritt 6.1: Dokumentationspakete
- Unter-Schritt 6.1.1: Architektur-Dokumentation.
- Unter-Schritt 6.1.2: API-Dokumentation.
- Unter-Schritt 6.1.3: SOPs (Betrieb, Incident, Change, Risk).
- Unter-Schritt 6.1.4: Forschungslogbuch + Entscheidungen + Quellen.

### Schritt 6.2: Google Drive Sync (Plan)
- Unter-Schritt 6.2.1: Dokumentklassen und Zugriffsrollen definieren.
- Unter-Schritt 6.2.2: Sync-Intervall und Konfliktauflösung definieren.
- Unter-Schritt 6.2.3: Auditierbare Exportpipelines für Doktorarbeitsanhänge.

## Phase 7: Deployment auf Netlify (Plan bis Link-Generierung)

### Schritt 7.1: Build- und Release-Pipeline
- Unter-Schritt 7.1.1: Branching, Build, Test, Security Scan, Compliance Check.
- Unter-Schritt 7.1.2: Staging-Freigabe mit Review-Checklist.
- Unter-Schritt 7.1.3: Production-Release und Rollback-Szenario.

### Schritt 7.2: Link-Generierung und Abnahme
- Unter-Schritt 7.2.1: Produktions-URL und Versionstag dokumentieren.
- Unter-Schritt 7.2.2: Go-live Abnahmeprotokoll erstellen.
- Unter-Schritt 7.2.3: Post-Deployment Monitoring (Verfügbarkeit, Fehler, Nutzersicherheit).

## Phase 8: 7-Zyklen-Qualitätsmuster (gefordert)

Messvariable: Complete Readiness Index (CRI, 0-100%)

Formel:
CRI = 0.25 Testabdeckung + 0.20 Compliance-Abdeckung + 0.20 Traceability + 0.15 Security-Härtung + 0.10 UX-Trust Score + 0.10 Doku-Vollständigkeit

| Run | Fokus | CRI Ziel | Verbesserung ggü. vorher |
|---|---|---:|---:|
| 1 | Basisstruktur + Scope | 45% | - |
| 2 | Architektur + Teamrouting | 58% | +13% |
| 3 | Compliance-Mapping | 68% | +10% |
| 4 | Test-/Gate-Design | 77% | +9% |
| 5 | Doku-/Handoff-System | 84% | +7% |
| 6 | Deployment-/Ops-Feinschliff | 90% | +6% |
| 7 | Final Audit-Readiness | 95% | +5% |

Hinweis: 100% ist vor externen Freigaben unrealistisch; 95% ist der realistische "agent-only" Zustand.

## 5. Agent-Team-Plan für maximale Parallelität (ohne Überlappung)

## Team A Research Ops
- Paket A1: Trust/Simplicity Studienmatrix.
- Paket A2: Benchmark-Repos und Integrationsrisiken.
- Paket A3: Quellenvalidierung und Evidenzranking.

## Team B Product/UX Trust
- Paket B1: Designsystem-Regeln.
- Paket B2: Explainability- und Safety-Komponenten.
- Paket B3: Informationsarchitektur pro Nutzerrolle.

## Team C AI/LLM Ops
- Paket C1: Prompt-Layer und Routinglogik.
- Paket C2: Memory-Strategie und Kontexthygiene.
- Paket C3: Evaluationsdesign (Halluzination, Stabilität, Kosten).

## Team D Compliance Ops
- Paket D1: DSGVO/MDR/ISO-Mapping.
- Paket D2: Traceability-Template.
- Paket D3: Audit-/Incident-Prozesse.

## Team E Build/Test Ops
- Paket E1: Testpyramide + Coverage-Mandat.
- Paket E2: CI/CD Gates.
- Paket E3: Security/Performance-Tests.

## Team F Docs/Knowledge Ops
- Paket F1: Obsidian-Wissensgraph.
- Paket F2: Opus-Handoff.
- Paket F3: Run-Logs und Session-Memory-Disziplin.

## 6. Definition of Done (DoD)

Ein Planabschnitt gilt nur als "done", wenn:
1. Tests: automatisierte Tests je Funktion geplant und tracebar.
2. Dokumentation: Architektur, API, SOP, Entscheidungslog vollständig.
3. Compliance: betroffene Normen/Gesetze gemappt und pro Requirement hinterlegt.
4. Deployment-Ready: Pipeline bis Netlify-Link inkl. Rollback und Monitoring definiert.
5. Handoff-Ready: Opus kann mit minimalen Tokens verlustfrei übernehmen.

## 7. Offene Pflichtfragen (nur wirklich essenzielle Lücken)

Frage 1: Soll CarotisAi als assistives Entscheidungssystem oder als autonome Diagnoseinstanz positioniert werden? (bestimmt MDR-Tiefe massiv)
Frage 2: Welche Datenquellen sind bereits rechtlich freigegeben (retrospektive klinische Daten, öffentliche Datensätze, interne Notizen)?
Frage 3: Welche Sprache ist primär für die Endoberfläche der Doktorarbeits-App (Deutsch, Englisch, bilingual)?

## 8. Nächster Schritt nach Freigabe dieses Plans

Nach Ihrer Freigabe wird exakt in dieser Reihenfolge ausgeführt:
1. Team-Artefakte scaffolden.
2. Test-/Traceability-Grundlagen zuerst technisch verankern.
3. Compliance-/Dokumentationspipelines parallelisieren.
4. Erst dann produktive Feature-Implementierung.
