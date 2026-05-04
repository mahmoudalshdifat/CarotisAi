# OPUS 4.7 Handoff (Minimal Tokens, Max Wirkung)

Ziel: Nahtlose Übernahme ohne Kontextverlust. Fokus: Plan-first, Trust-first, Compliance-first, Test-first.

## 1) Projektkontext in 10 Zeilen
1. Projekt: CarotisAi, wissenschaftliche/medizinische KI-Assistenz für Doktorarbeits-Workflow.
2. Primärziel: minimale manuelle Arbeit für Dr. Aroob bei maximaler wissenschaftlicher Qualität.
3. Arbeitsmodus: Orchestrator + Agent-Teams mit maximaler Parallelität ohne Interferenz.
4. Heute geliefert: vollständiger Masterplan (keine Code-Implementierung).
5. Architekturziel: Frontend + AI-Orchestrierung + Compliance + Testautomatisierung + Doku.
6. Trust/Simplicity sind Kernprinzipien, evidenzbasiert.
7. Compliance-Zielraum: DSGVO, MDR, ISO/IEC 27001, ISO 13485, ISO 14971, IEC 62304, ISO 62366-1.
8. Deploymentziel: Netlify (mit externen gesicherten Diensten für sensible Verarbeitung).
9. Betriebsziel: reproduzierbare, auditierbare, dokumentierte End-to-End-Pipeline.
10. Done bedeutet: Tests + Doku + Compliance + deployment-ready.

## 2) Harte Session-Regeln (nicht verhandelbar)
1. Plan vor Code, wenn Plan angefordert.
2. Max Subagenten, max Parallelität, null Interferenz.
3. Jeder Subagent hat exklusiven Scope/Artefakte.
4. Wissenschaftliche Belege > Vermutungen.
5. Keine Workarounds, wenn Realfix möglich.
6. Test before ship. Doku before handover.
7. Jede Entscheidung mit Risiko/Annahme markieren.

## 3) Agent-Routing (Team-Map)
- Team A Research Ops: Evidenz, Quellen, Benchmarks.
- Team B Product/UX Trust: Simplicity, IA, Explainability.
- Team C AI/LLM Ops: Prompting, Memory, Evaluations.
- Team D Compliance Ops: DSGVO/MDR/ISO-Traceability.
- Team E Build/Test Ops: Testpyramide, Gates, CI/CD.
- Team F Docs/Knowledge Ops: Obsidian, SOPs, Handoffs.

## 4) Studienbasierte Trust/Simplicity Leitlinien (kompakt)
1. Trust Calibration: Unsicherheit explizit anzeigen.
2. Progressive Disclosure: 5-7 Kerndaten pro kritischer Ansicht.
3. Explainability: "Warum"-Button für jede AI-Empfehlung.
4. Human Oversight: klinische Eskalation sichtbar.
5. Fehlerprävention: kritische Aktionen doppelt absichern.
6. Konsistenz: Terminologie und Muster strikt vereinheitlichen.
7. Privacy-Transparenz: Datenfluss und Zweck klar offenlegen.
8. Performance: Kerninteraktionen <2s.

## 5) Was bereits gut war
1. Parallelisierte Recherche über Kern-Repos und Compliance.
2. Frühzeitige Strukturierung in Agent-Teams.
3. Klare Trennung zwischen heute realistisch und extern abhängigen Schritten.
4. Plan bis Deployment und Auditierbarkeit ausgelegt.

## 6) Was falsch/gefährlich wäre
1. Zu frühe Implementierung ohne MDR/DSGVO-Rahmen.
2. Vermischung von Subagent-Scopes (Interferenz, Inkonsistenz).
3. UI ohne Explainability und Human-Override.
4. Deployment ohne Security-/Compliance-Gates.

## 7) Never do again
1. Keine ungeprüften Annahmen zu medizinischer Klassifizierung.
2. Keine fehlende Traceability zwischen Requirement/Test/Risk.
3. Keine Black-Box-Antworten in klinisch relevanten Flows.
4. Keine Speicherdisziplin-Verluste in Multi-Agent-Sessions.

## 8) Was überraschend/kritisch war
1. Netlify ist gut für Web-Layer, aber allein nicht ausreichend für vollständige MedTech-Compliance.
2. Vertrauen hängt stärker von Transparenz + Workflow-Sicherheit ab als nur von Modellgenauigkeit.
3. Token-Effizienz-Tools helfen stark, aber ersetzen keine Governance.

## 9) Sofortiger Arbeitsmodus für Opus
1. Lies zuerst den Masterplan in docs/MASTERPLAN_CAROTISAI_HEUTE.md.
2. Starte nur mit Plan-zu-Artefakt-Ableitung, kein unaufgeforderter Implementierungscode.
3. Erzeuge je Team ein klar abgegrenztes Arbeits-Paket.
4. Führe Qualitätsgates nach jedem Paketlauf aus.
5. Halte jeden Run kurz, messbar, auditierbar.

## 10) Minimal-Token Execution Prompt für Opus
Du bist Orchestrator. Nutze 6 Teams (A-F) mit exklusiven Scopes. Arbeite parallel ohne Interferenz. Priorität: Trust/Simplicity, Compliance-by-Design, Test-by-Default, Doku-by-Default. Implementiere erst nach bestätigter Planphase. Erzwinge Traceability Requirement->Test->Risk->Evidence. Stoppe bei fehlender externer Freigabe und fordere nur minimale Entscheidungsinputs an.

## 11) Pflichtsatz am Ende jedes Opus-Laufs
Aktualisiere jetzt den Projektstatus und deine Memory-Einträge. Gib anschließend den nächsten optimalen Prompt bzw. die nächste Strukturführung aus.
