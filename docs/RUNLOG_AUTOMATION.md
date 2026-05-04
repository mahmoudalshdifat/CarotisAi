# Run-Log Automation

Status: baseline draft
Date: 2026-05-04
Owner: Docs Knowledge Ops

## Ziel

Die verpflichtende 5-Zeilen-Run-Log-Disziplin soll mit einem einfachen Skript reproduzierbar und weniger fehleranfaellig werden.

## CLI

```bash
npm run runlog:append -- \
  --file memory/runs/2026-04-28_GPT-5.3-Codex-01.md \
  --line "1) Prompt-Ziel: ..." \
  --line "2) Gemacht: ..." \
  --line "3) Ergebnis: ..." \
  --line "4) Qualitaetsgewinn: ..." \
  --line "5) Naechster Schritt: ..."
```

## Regeln

1. Es muessen genau 5 Zeilen uebergeben werden.
2. Das Ziel ist immer eine Run-Log-Datei im Repo.
3. Bestehende Inhalte bleiben erhalten; der neue Block wird angehaengt.

## Einsatz

- nach jedem groesseren Prompt
- vor Handoff oder Modellwechsel
- wenn mehrere Artefakte in einem Lauf entstanden sind