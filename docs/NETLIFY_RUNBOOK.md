# Netlify Runbook

Status: baseline draft
Date: 2026-05-04
Owner: Ops

## Ziel

Dieses Runbook beschreibt den geplanten Release- und Rollback-Pfad fuer CarotisAi auf Netlify. Es verbindet Build-Disziplin, Security-Header, Artefaktablage und spaetere Incident-Reaktion.

## Pre-Release Checklist

1. npm run ci erfolgreich.
2. Security Header in netlify.toml geprueft.
3. Preview-Deploy fachlich und technisch gesichtet.
4. Evidence-Artefakte fuer Test und Release vorbereitet.

## Release Steps

1. Merge auf main nur nach gruenem CI-Gate.
2. Preview Deploy pruefen.
3. Produktionsdeploy in Netlify ausrollen.
4. Build-Version, Datum und Artefaktpfade dokumentieren.
5. Post-Deploy Smoke Check ausfuehren.

## Rollback Prinzip

1. Letzten stabilen Build identifizieren.
2. Fehlerbild und Incident-ID dokumentieren.
3. Rollback auf vorherigen stabilen Stand.
4. Evidence und Incident-Protokoll nachziehen.

## Mindestartefakte pro Release

- CI-Ergebnis
- Build-Zeitpunkt
- Version oder Build-Referenz
- Link auf Evidence-Ablage
- Rollback-Hinweis

## Nicht verhandelbare Regeln

1. Kein Release ohne gruenes CI.
2. Kein Release ohne klaren Rollback-Pfad.
3. Keine sensiblen Secrets im Frontend-Bundle.