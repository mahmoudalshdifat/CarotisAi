# Auth Boundaries

Status: baseline draft
Date: 2026-05-04
Owner: Security and Architecture

## Ziel

Dieses Dokument definiert die kuenftigen Zugriffszonen, Rollen und Schutzgrenzen fuer CarotisAi. Es ist bewusst vor der eigentlichen Auth-Implementierung angelegt, damit UI, API und Auditpfade dieselbe Sicherheitslogik teilen.

## Rollenmodell

| Rolle | Zweck | Darf sehen | Darf aendern |
|---|---|---|---|
| Guest | oeffentliche Produkt- und Informationsansicht | Landing, allgemeine Doku | nichts |
| Research User | wissenschaftliche Recherche und Arbeitsflaechen | eigene Arbeitsbereiche, nichtkritische Projektdaten | eigene Entwuerfe und Notizen |
| Clinical Reviewer | fachliche Review sensitiver Ergebnisse | review-faehige Analysen, Begruendungen, Freigabemasken | Review-Status und Kommentare |
| Compliance Owner | Governance und Auditpruefung | Kontrollmatrizen, Auditpfade, Nachweisartefakte | Status, Signoffs, Policies |
| System Admin | technische Verwaltung | technische Konfigurationen und Betriebsdaten | Infrastruktur- und Zugriffsparameter |

## Schutzgrenzen

### Boundary A: Public -> Authenticated Workspace
- Nur oeffentliche Inhalte sind ohne Login erreichbar.
- Jede Workspace-Ansicht setzt spaeter eine authentifizierte Session voraus.

### Boundary B: Research Workspace -> Review Workspace
- Recherche- und Entwurfsdaten sind nicht automatisch Review-freigegeben.
- Ein expliziter Statuswechsel trennt "working draft" von "reviewable output".

### Boundary C: Review Workspace -> Compliance and Audit
- Reviewrechte geben keine pauschalen Einsichten in Audit- oder Policy-Daten.
- Compliance-sensible Artefakte benoetigen eigene Rollenzuordnung.

### Boundary D: Application -> Sensitive External Services
- Tokens und Secrets bleiben ausserhalb des Client-Bundles.
- Externe Services werden spaeter nur ueber kontrollierte Serverpfade angesprochen.

## Nicht verhandelbare Auth-Regeln

1. Kein direkter Zugriff auf fremde Arbeitsbereiche.
2. Kein Export sensibler Ergebnisse ohne nachweisbaren Rollen- und Zweckkontext.
3. Jeder kritische Statuswechsel erzeugt spaeter ein Audit-Ereignis.
4. Rollenerweiterungen muessen Traceability- und Risk-Updates ausloesen.