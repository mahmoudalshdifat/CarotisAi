# Incident Response Runbook

Status: baseline draft
Date: 2026-05-04
Owner: Ops and Security

## Ziel

Sicherheits-, Datenschutz-, Betriebs- und Qualitaetsvorfaelle muessen schnell erkannt, eingegrenzt, dokumentiert und nachbearbeitet werden.

## Incident-Klassen

### P1
- moeglicher Datenschutzvorfall
- unautorisierter Zugriff
- kritische falsche Systemausgabe in sensiblem Workflow
- produktiver Ausfall ohne Workaround

### P2
- degradierte Leistung oder partieller Funktionsausfall
- Audit- oder Logging-Luecke
- Test- oder Freigabeverstoss kurz vor Release

### P3
- nichtkritische Fehler mit vorhandenem Workaround
- Dokumentations- oder Monitoringluecke ohne akute Nutzerauswirkung

## Sofortablauf

1. Incident klassifizieren.
2. Owner und Incident Commander benennen.
3. Systemzustand sichern und relevante Logs/Evidenz einfrieren.
4. Auswirkungen, betroffene Nutzer und Datenfluesse bewerten.
5. Eindaemmung priorisieren.
6. Kommunikations- und Meldepflichten pruefen.

## Datenschutz- und Compliance-Perspektive

- DSGVO-Vorfallpruefung sofort starten, wenn personenbezogene Daten betroffen sein koennen.
- Audit-Spuren duerfen nicht ueberschrieben werden.
- Fachlich kritische KI-Ausgaben muessen auf Rueckruf, Korrektur oder Warnhinweis geprueft werden.

## Post-Incident Pflichtartefakte

- Kurzbericht
- Root-Cause-Analyse
- Korrekturmassnahme
- Praeventivmassnahme
- Entscheidung, ob Risk Register oder Compliance Matrix aktualisiert werden muessen

## Minimales Incident-Protokoll

| Incident ID | Date | Severity | Summary | Impact | Containment | Notifications | Owner | Status |
|---|---|---|---|---|---|---|---|---|
