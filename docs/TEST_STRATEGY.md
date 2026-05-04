# Test Strategy

Status: working baseline
Date: 2026-05-04
Owner: Team E Build/Test Ops

## Ziel

Jede relevante Funktion, jeder sensible Datenfluss und jede kritische KI-Ausgabe muss vor Freigabe testbar, dokumentiert und rueckverfolgbar sein.

## Testpyramide

### 1. Unit Tests
- Kernlogik
- Eingabevalidierung
- Prompt- und Guardrail-Regeln
- Audit-Logger
- Hilfsfunktionen fuer Dokument- und Exportpfade

### 2. Integration Tests
- Auth -> Session -> Berechtigung
- Datenfluss zwischen UI, Service-Layer und KI-Router
- Audit-Erzeugung bei kritischen Aktionen
- Fehlerbehandlung und Graceful Degradation

### 3. End-to-End Tests
- Recherche -> Analyse -> Begruendung -> Export
- Dokumentation -> Review -> Signoff
- Datenschutzpfade wie Export oder Loeschanfrage

## KI-spezifische Tests

### Output Quality
- deterministisches Verhalten fuer definierte Konfigurationen
- Begruendung vorhanden, nicht leer, nicht widerspruechlich
- Grenzen und Unsicherheiten sichtbar

### Robustheit
- Prompt-Injection bleibt ohne Seiteneffekt
- ungueltige Eingaben erzeugen keinen stillen Fehler
- adversarial oder toxische Eingaben fuehren zu sicherem Verhalten

### Performance
- Ziel fuer Kerninteraktionen: p95 unter 2s
- UI-Feedback fuer schnelle Interaktion: unter 500ms

### Drift
- Basiswerte dokumentieren
- spaetere Abweichungen gegen Baseline pruefen

## Testdatenregeln

1. Standardfall: synthetische oder oeffentlich nutzbare Daten.
2. Reale sensible Daten nur mit explizitem Freigabe- und Ethikrahmen.
3. Keine PHI in Logs, Fixtures oder Snapshot-Dateien.

## Freigabegates

### Engineering Gates
- angemessene Abdeckung fuer Unit- und Integrationstests
- kein kritischer Lint-, Type- oder Dependency-Fehler
- reproduzierbare lokale und CI-Ausfuehrung

### Security Gates
- keine bekannten kritischen Schwachstellen in produktiven Abhaengigkeiten
- keine Secrets im Repo
- erfolgreiche Negativtests fuer Auth und Zugriff

### Compliance Gates
- Audit-Trail vorhanden fuer kritische Aktionen
- neue Datenfluesse dokumentiert
- betroffene Anforderungen mit Tests und Evidenz verknuepft

### Product Gates
- kritische Nutzerreise getestet
- fachliche Plausibilitaet fuer sensible Ergebnisse reviewt
- Runbook und Rollback-Pfad vorhanden

## Testartefakte pro Feature

- Testfallliste
- Coverage oder Ergebnisreport
- Security-Check
- Compliance-Notiz bei neuem Datenfluss
- Signoff mit Owner und Datum

## Ownership

- Team E definiert die Baseline.
- Engineering pflegt Unit- und Integrations-Tests.
- UX/Product prueft kritische Nutzerreisen.
- Compliance prueft Audit-, Datenschutz- und Nachweisaspekte.
