# Architecture Blueprint

Status: initial blueprint
Date: 2026-05-04
Owner: Orchestrator

## Zielzustand

CarotisAi besteht aus einer vertrauenszentrierten Web-Oberflaeche, einem abgesicherten Service-Layer, einer KI-Orchestrierung mit Guardrails, einem Audit- und Traceability-Backbone sowie einer Wissens- und Dokumentationsschicht.

## Systemschichten

### 1. Experience Layer
- Web-App fuer Recherche, Analyse, Ergebnisdarstellung und Dokumentation.
- Progressive Disclosure fuer komplexe medizinische Inhalte.
- Explainability-Komponenten mit Konfidenz, Evidenz und Grenzen.

### 2. Access and Session Layer
- Authentifizierung, Autorisierung, Session-Isolation.
- Edge-/API-Schutz fuer Rate Limits, Request Validation und Audit-Anstoss.

### 3. Application Layer
- Recherche- und Dokumentationslogik.
- Workflow-Orchestrierung fuer Agenten, Review und Ergebnisgenerierung.
- Exportpfade fuer Berichte, Forschungsdossiers und Compliance-Artefakte.

### 4. AI Orchestration Layer
- Gemini/Google AI als primarer KI-Dienst.
- Prompt-Router, Guardrails, Output-Validation, Confidence Handling.
- Evaluations- und Drift-Kontrollen fuer spaetere produktive Nutzung.

### 5. Audit and Evidence Layer
- Append-only Audit-Trail fuer kritische Aktionen.
- Requirement-to-test-to-risk-to-evidence Verknuepfung.
- Signoff-Artefakte fuer QA, Compliance und fachliche Freigabe.

### 6. Knowledge Layer
- Repo-Dokumentation als Source of Truth.
- Obsidian-Struktur fuer Forschung, Entscheidungen, Risiken und Lessons Learned.
- Run-Logs pro Session und Handoffs fuer andere Modelle/Agenten.

## Vertrauens- und Sicherheitsgrenzen

### Grenze A: Public UI zu geschuetzten Diensten
- Niemals direkte sensible Verarbeitung im oeffentlichen Web-Layer.
- Eingaben werden validiert, protokolliert und minimal weitergereicht.

### Grenze B: Applikationslogik zu KI-Diensten
- Prompts muessen standardisiert, versioniert und geprueft sein.
- Antworten duerfen erst nach Regelpruefung in den Nutzerfluss gelangen.

### Grenze C: Anwendungsdaten zu Dokumentation und Audit
- Auditdaten sind unveraenderlich oder revisionssicher.
- Forschungs- und Betriebsdokumentation bleibt nachvollziehbar versioniert.

## Ziel-Deploymentbild

### Frontend
- Netlify fuer statische Auslieferung und spaetere Edge-Funktionen.

### Sichere Services
- Externe gesicherte API-/DB-/Secret-Komponenten fuer sensible Verarbeitung.
- Keine Annahme, dass Netlify allein MedTech-Compliance abdeckt.

### Observability
- Fehler, Security-Ereignisse, Performance und Drift muessen zentral messbar sein.

## Erste technische Build-Reihenfolge

1. Dokumentierte Anforderungen und Traceability.
2. Teststrategie und Freigabegates.
3. Team-Prompts und Orchestrierungsrunbooks.
4. App-Skeleton fuer Frontend, API und gemeinsame Typen.
5. KI-Integrationspfad mit Guardrails.
6. Audit-/Dokumentationspfad.
7. Deployment-Pipeline mit Rollback und Monitoring.

## Nicht verhandelbare Architekturregeln

1. Keine Black-Box-Antworten in kritischen medizinischen Kontexten.
2. Keine Funktion ohne Testpfad.
3. Keine Datenverarbeitung ohne Datenschutz- und Audit-Perspektive.
4. Keine Scope-Ueberlappung zwischen Agenten-Teams.
