# Project Charter

Status: active foundation
Date: 2026-05-04
Owner: Orchestrator

## Mission

CarotisAi soll eine vertrauenswuerdige, wissenschaftlich robuste KI-Arbeitsumgebung fuer den klinisch-wissenschaftlichen Workflow von Dr. Aroob Alrawshdeh schaffen. Ziel ist maximale Automatisierung bei gleichzeitig maximaler Nachvollziehbarkeit, Testbarkeit und regulatorischer Disziplin.

## Problem Statement

Der aktuelle Forschungs- und Analyseprozess ist fragmentiert: Quellen, klinische Hinweise, KI-Ergebnisse, Dokumentation, Nachweise und Review-Schleifen liegen getrennt vor. Dadurch steigen manueller Aufwand, Inkonsistenzen, Risiko fuer Wissensverlust und die Belastung fuer die Doktorarbeit.

## Zielnutzer

1. Primaernutzerin: Dr. Aroob Alrawshdeh als Doktorandin und fachliche Reviewer.
2. Sekundaernutzer: Betreuer, klinische Reviewer, QA/Compliance, technische Maintainer.
3. Tertiaere Nutzer: spaetere wissenschaftliche Mitarbeitende und institutionelle Partner.

## North Star

Eine Arbeitsplattform, in der wissenschaftliche Recherche, KI-Assistenz, Ergebnisbegruendung, Dokumentation, Risiko- und Testnachweise in einem reproduzierbaren System zusammenlaufen.

## Erfolgskriterien

### Produktivitaet
- Reduktion manueller Routinearbeit um mindestens 50% gegenueber dem heutigen Workflow.
- Wiederverwendbare Artefakte fuer Forschung, Review und Dokumentation.

### Qualitaet
- Vollstaendige Rueckverfolgbarkeit von Anforderung bis Evidenz.
- Keine unerklaerten KI-Empfehlungen in kritischen Flows.
- Klare Trennung zwischen gesichertem Wissen, Annahmen und offenen Fragen.

### Vertrauen
- Jede relevante KI-Ausgabe zeigt Konfidenz, Begruendung und Grenzen.
- Human-in-the-loop fuer sensible Entscheidungen.
- Datenschutz- und Compliance-Anforderungen sind sichtbar in der Architektur verankert.

## Leitprinzipien

1. Trust-first statt growth-first.
2. Simplicity ohne Informationsverlust.
3. Compliance-by-design.
4. Test-by-default.
5. Doku-by-default.
6. Maximale Parallelitaet ohne Interferenz.

## In Scope fuer die naechste Umsetzungsphase

1. Repo-Fundament fuer Architektur, Anforderungen, Tests, Compliance und Team-Orchestrierung.
2. Arbeitsartefakte fuer Prompting, Runbooks, Traceability und Dokumentation.
3. Vorbereitete Strukturen fuer spaetere Frontend-, Backend- und KI-Implementierung.

## Out of Scope fuer diese Phase

1. Live-Verarbeitung echter Patientendaten.
2. Endgueltige MDR-Klassifizierung durch externe Stellen.
3. Produktive klinische Freigabe.

## Kritische Abhaengigkeiten

1. Regulatorische Einordnung assistiv vs. autonom.
2. Datenfreigaben und Ethikrahmen fuer reale Daten.
3. Zielsprachmodus der Oberflaeche.

## Entscheidungen, die spaeter zwingend fallen muessen

1. Produktpositionierung: Assistenzsystem oder Diagnoseinstanz.
2. Primarer Datenpfad: synthetisch, publiziert, institutionell.
3. Endgueltiger Frontend- und Backend-Stack fuer die erste lauffaehige Version.
