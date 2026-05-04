# Decision Log

Status: active log
Date: 2026-05-04
Owner: Team F Docs Knowledge Ops

## Nutzung

Wichtige Architektur-, Prozess-, Compliance- und Produktentscheidungen werden hier mit Kontext, Alternativen, Begruendung und Revisionspfad dokumentiert.

## Eintragsformat

| Decision ID | Date | Topic | Decision | Context | Alternatives Considered | Why Chosen | Impact | Review Trigger | Owner |
|---|---|---|---|---|---|---|---|---|---|

## Start-Eintraege

| Decision ID | Date | Topic | Decision | Context | Alternatives Considered | Why Chosen | Impact | Review Trigger | Owner |
|---|---|---|---|---|---|---|---|---|---|
| D-001 | 2026-05-04 | Arbeitsmodus | Plan-first vor Implementierung in diesem Projektstart | Repo war praktisch leer und brauchte zuerst belastbare Foundations | Sofortiger Code-Start, lose Ideensammlung | minimiert Architektur- und Compliance-Drift | saubere Grundlage fuer Folgearbeit | wenn erstes App-Skeleton entsteht | Orchestrator |
| D-002 | 2026-05-04 | Agentenstruktur | Sechs Teams plus Orchestrator mit exklusiven Scopes | Nutzer fordert maximale Parallelitaet ohne Interferenz | Ein einzelner Agent fuer alle Aufgaben | bessere Parallelisierung und sauberere Handoffs | bestimmt alle Folgeprozesse | wenn Scope-Zuschnitte unpraktisch werden | Orchestrator |
| D-003 | 2026-05-04 | Deploymentziel | Netlify bleibt Frontend-/Delivery-Layer, sensible Services extern abgesichert | Medical-AI-Kontext verlangt mehr als statisches Hosting | Komplett nur Netlify, komplett eigene Infra | balanciert Geschwindigkeit und Compliance-Realitaet | beeinflusst Architektur und Betrieb | wenn echte Produktionsarchitektur konkretisiert wird | Architecture/Ops |
| D-004 | 2026-05-04 | Arbeitssteuerung | Der naechste Ausbau wird ueber einen sichtbaren 20-Punkte-Ultraplan mit gemeinsamer Datenquelle gesteuert | Nutzer fordert eine 20er-Todo-Liste und systematisches Starten | lose Notizliste, nur Tool-Todos | haelt UI, Doku und Abarbeitung synchron | wenn Backlog-Granularitaet nicht mehr ausreicht | Orchestrator |
| D-005 | 2026-05-04 | Security Foundations | Auth-Grenzen und Audit-Schema werden vor der eigentlichen Security-Implementierung dokumentiert | spaetere Auth- und Audit-Features duerfen nicht ad hoc entstehen | nur technische Implementierung spaeter | reduziert Sicherheits- und Compliance-Drift | beeinflusst API, Rollenmodell und Logging | wenn echtes Auth-Skeleton beginnt | Security/Architecture |
| D-006 | 2026-05-04 | Operational Visibility | Observability, Release-Pfad und Run-Log-Disziplin werden frueh als sichtbare Produkt- und Repo-Oberflaechen verankert | Trust und Compliance duerfen nicht auf spaet unsichtbar eingefuehrte Ops-Schichten warten | nur interne Doku, erst spaetere Ops-Arbeit | macht Readiness pruefbar, testbar und reviewbar | beeinflusst UI, Runbooks und CI-Gates | wenn echter Telemetrie-Stack oder CD-Pipeline kommt | Ops/Docs |
| D-007 | 2026-05-04 | First Workflow Slice | Der erste konkrete Arbeitsfluss laeuft ueber Frage und Kontext, Analysevertrag, Explainability Review und Evidence Export | Die App brauchte vor Backend-Logik einen reproduzierbaren vertikalen Slice | nur Statuskarten, direkter Sprung in spaetere Feature-Entwicklung | erzwingt Human-in-the-loop, klare Outputs und Handoffs | steuert die naechste Workflow-Automation und Clinical-Readiness-Arbeit | wenn interaktive Workflow-Engine oder Backend startet | Product/AI/Docs |
| D-008 | 2026-05-04 | Interactive Workflow Execution | Der erste Workflow wird vor Persistenz oder Backend bereits lokal interaktiv und fokusgefuehrt im Frontend ausgefuehrt | Der statische Slice zeigte den Ablauf, erlaubte aber noch keine schrittweise Nutzung | direktes Backend, rein statischer Status quo | schafft echte Bedienbarkeit mit kleinem Risiko und testbarer Oberflaeche | beeinflusst spaetere Persistenz, Audit-Hooks und Exportpfade | wenn Workflow-Zustand serverseitig gespeichert wird | Product/Engineering |
