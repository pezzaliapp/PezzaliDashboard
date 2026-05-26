# PezzaliDashboard

> GitHub analytics personale. Per chi ha tanti repository e vuole capire cosa sta funzionando.

[![PWA](https://img.shields.io/badge/PWA-installabile-00b894)](https://www.alessandropezzali.it/PezzaliDashboard/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

🔗 **[Apri PezzaliDashboard →](https://www.alessandropezzali.it/PezzaliDashboard/)**

---

## Cosa fa

Una dashboard PWA che aggrega in tempo reale i dati del tuo profilo GitHub tramite la REST API ufficiale.

- 📊 **KPI aggregati** — Stelle, fork, repo totali, linguaggi
- 📈 **Trend nel tempo** — Snapshot salvati ad ogni accesso (storico fino a 60 punti)
- 🏆 **Top 10 per stelle e per fork**
- 🗂️ **Aree tematiche** — Categorizzazione automatica per parola chiave
- 🚨 **Alert** — Repo che prendono stelle, repo fermi, repo senza description o topic
- 📋 **Tabella completa** con ricerca e ordinamento
- 📱 **PWA installabile** su iOS, Android, desktop

## Come si usa

### 1. Genera un Personal Access Token

Vai su [github.com/settings/personal-access-tokens/new](https://github.com/settings/personal-access-tokens/new) e crea un Fine-grained token con:

- **Repository access:** Public repositories (read-only)
- **Expiration:** 90 giorni

### 2. Apri PezzaliDashboard

Vai su [alessandropezzali.it/PezzaliDashboard](https://www.alessandropezzali.it/PezzaliDashboard/), incolla il token, accedi.

### 3. (Opzionale) Installa come PWA

- **iOS/Safari:** Condividi → Aggiungi a Home
- **Android/Chrome:** menu → Installa app
- **Desktop:** icona "Installa" nella barra indirizzi

## Tech stack

- JavaScript vanilla, niente build step
- Chart.js 4 per i grafici
- GitHub REST API v2022-11-28
- Service Worker per installabilità PWA
- Font: Space Grotesk + JetBrains Mono

Single-file HTML, nessuna dipendenza npm.

## Categorie

La categorizzazione automatica usa parole chiave nei nomi e nelle description dei repo. Modificabile nella costante `CATEGORIES` di `index.html`.

## Ecosistema PezzaliAPP

- 🏠 [pezzaliapp.com](https://www.pezzaliapp.com)
- 📱 [pezzalihub.app](https://pezzalihub.app)
- 🚀 [alessandropezzali.it](https://www.alessandropezzali.it)
- 🐙 [github.com/pezzaliapp](https://github.com/pezzaliapp)

## Autore

[Alessandro Pezzali](https://www.pezzaliapp.com) — Sviluppatore · Musicista · Fotografo · AI Builder · 25 anni in automotive.

## Licenza

[MIT](LICENSE) © 2026 Alessandro Pezzali
