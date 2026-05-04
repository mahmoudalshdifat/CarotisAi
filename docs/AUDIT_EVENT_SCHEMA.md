# Audit Event Schema

Status: baseline draft
Date: 2026-05-04
Owner: Security, Ops, Compliance

## Ziel

Das Schema definiert den Mindestumfang fuer spaetere Audit-Ereignisse. Es soll sicherstellen, dass kritische Aktionen nachvollziehbar, filterbar und regulatorisch anschlussfaehig sind.

## Event-Felder

| Feld | Typ | Pflicht | Zweck |
|---|---|---|---|
| eventId | string | ja | eindeutige Ereignis-ID |
| occurredAt | string | ja | ISO-Zeitstempel |
| actorId | string | ja | handelnde Instanz |
| actorRole | string | ja | Rolle des Akteurs |
| action | string | ja | Aktion, z. B. create, review, export |
| resourceType | string | ja | z. B. analysis, note, signoff |
| resourceId | string | ja | referenzierte Ressource |
| outcome | string | ja | success, denied, failed |
| reason | string | nein | Begruendung fuer denied oder unusual flow |
| sessionId | string | nein | Session-Korrelation |
| traceId | string | nein | technische Request-Korrelation |
| piiClass | string | ja | none, low, sensitive |
| beforeStateHash | string | nein | Hash vor Statuswechsel |
| afterStateHash | string | nein | Hash nach Statuswechsel |

## Ereignisse, die spaeter zwingend geloggt werden muessen

1. Login und Logout.
2. Rollenrelevante Zugriffsversuche.
3. Review- oder Signoff-Statuswechsel.
4. Export oder Loeschanfrage.
5. Aenderungen an Prompt-, Policy- oder Kontrollartefakten.

## Designregeln

1. Keine Rohdaten mit PHI im Audit-Ereignis.
2. Kritische Statuswechsel sollen vor und nach Zustand referenzieren koennen.
3. Denied-Events sind genauso wichtig wie erfolgreiche Events.
4. Das Schema bleibt versionsfaehig und erweiterbar.