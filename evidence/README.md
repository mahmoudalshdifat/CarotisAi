# Evidence Repository

## Zweck

Dieses Verzeichnis ist die vorgesehene Ablage fuer nachvollziehbare Nachweise aus Build, Test, Security, Compliance und Releases.

## Struktur

- tests: Coverage, Testreports, Screenshots, Regression-Nachweise
- security: Scan-Ergebnisse, Threat-Model-Notizen, Review-Artefakte
- compliance: Signoffs, Kontrollnachweise, DPIA- oder Audit-Bezuege
- releases: Build-Notizen, Release-Checklisten, Rollback-Hinweise

## Regeln

1. Keine PHI oder Rohdaten in diese Struktur ablegen.
2. Jeder Nachweis muss Datum, Owner und zugehoerige Requirement- oder Risk-Referenz tragen.
3. Release-Artefakte duerfen nur aus erfolgreich validierten Laeufen kommen.