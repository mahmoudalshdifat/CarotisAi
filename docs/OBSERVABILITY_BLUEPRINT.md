# Observability Blueprint

Status: baseline draft
Date: 2026-05-04
Owner: Ops, Security, Build/Test

## Ziel

CarotisAi soll Fehler, Releases, kritische Ereignisse und spaetere Audit-Signale frueh strukturiert erfassen. Diese Observability ist kein nachgelagerter Luxus, sondern ein Sicherheits- und Compliance-Baustein.

## Kernsignale

| Signal | Zweck | Minimaler Nachweis | Owner |
|---|---|---|---|
| CI Gate | verhindert defekte Builds vor Merge/Release | npm run ci, GitHub Actions Lauf | Build/Test |
| Frontend Runtime Errors | erkennt Laufzeitfehler und UI-Brueche | Error reports, session correlation | Ops |
| Audit-nahe Events | macht kritische Statuswechsel nachvollziehbar | Event schema, ingest route | Security/Ops |
| Release Evidence | verknuepft Build, Test und Rollback mit Artefakten | evidence/releases, test reports | Docs/Ops |

## Minimalarchitektur

1. Frontend erzeugt spaeter sessionId und traceId.
2. Kritische Ereignisse werden gegen das Audit Event Schema abgebildet.
3. Release-Laeufe referenzieren Test- und Build-Artefakte.
4. Incident-Antwort greift auf dieselben IDs und Artefakte zu.

## Naechste technische Schritte

1. Error Boundary fuer das Frontend.
2. Session- und Trace-Korrelation im Browser.
3. Audit-Ingest-Endpunkt fuer kritische Ereignisse.
4. Health- und Release-Sicht fuer Runtime und Rollback.

## Nicht verhandelbare Regeln

1. Keine PHI in Frontend-Fehlerreports.
2. Jede kritische Aktion braucht spaeter Korrelationsfaehigkeit.
3. Release-Nachweise muessen im Evidence-Pfad ablegbar sein.