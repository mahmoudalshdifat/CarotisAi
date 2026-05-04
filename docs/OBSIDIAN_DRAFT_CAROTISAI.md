# Obsidian Draft: CarotisAi Knowledge Base

## Vault-Struktur
- 00_Inbox
- 01_Project_Charter
- 02_Architecture
- 03_Compliance
- 04_Research
- 05_Testing_QA
- 06_Operations
- 07_Handoffs
- 08_Decisions
- 09_Risk_Register

## Kernnoten (Startpaket)

### 1) Project Charter
- Mission: KI-gestuetzte, wissenschaftlich robuste Assistenz fuer die Doktorarbeit.
- North Star: Min-Arbeit fuer Dr. Aroob, Max-Qualitaet und Reproduzierbarkeit.
- Erfolgsmetriken: Zeitersparnis, Fehlerreduktion, Evidenzabdeckung, Trust Score.

### 2) Architecture Blueprint
- Frontend: Trust-first UI mit Explainability.
- Backend: Agent-Orchestrierung + Audit + Dokumentationspipelines.
- AI: Gemini/Google AI plus Guardrails und Eval-Loops.
- Deployment: Netlify + externe gesicherte Dienste.

### 3) Compliance Map
- DSGVO (Art. 5/6/9/25/28/33/34)
- MDR (Klassifizierung, Technical File, PMCF)
- ISO/IEC 27001, ISO 13485, ISO 14971, IEC 62304, ISO 62366-1
- Traceability Matrix Pflicht.

### 4) Research Compass
- Trust Calibration
- Progressive Disclosure
- Explainability on demand
- Human-in-the-loop
- Fehlervorbeugung

### 5) Agent Operating Model
- Team A-F mit exklusiven Scopes.
- Max Parallelitaet, null Interferenz.
- Gate nach jedem Subagent-Run (Quelle, Risiko, Reproduzierbarkeit).

### 6) Testing & QA
- Unit, Integration, E2E, Security, Performance, Model-Drift.
- Freigabegates als harte Blocker.

### 7) Decision Log Template
- Entscheidung:
- Kontext:
- Optionen:
- Risiko:
- Entscheidungskriterium:
- Revisionsdatum:

### 8) Risk Register Template
- Risiko-ID
- Beschreibung
- Eintrittswahrscheinlichkeit
- Auswirkung
- Kontrolle
- Rest-Risiko
- Owner

## Obsidian Arbeitsregeln
1. Jede Notiz mit Datum, Owner, Status.
2. Jede Behauptung mit Quelle oder als Annahme markieren.
3. Jede neue Funktion mit Verlinkung auf Test- und Compliance-Notiz.
4. Keine isolierten Notizen ohne Rueckverweise.

## Naechste Obsidian-Schritte
1. Masterplan importieren und in Einzelnoden splitten.
2. Compliance-Knoten mit Rechtsquellen verlinken.
3. Team-Board als Kanban-Notiz strukturieren.
4. Automatisches Run-Log-Embedding pro Session etablieren.
