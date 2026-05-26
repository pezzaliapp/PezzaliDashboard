# PezzaliDashboard

> GitHub analytics privato. Token locale, dati che non escono dal browser. Per chi ha tanti repo e vuole capire cosa sta funzionando.

[![PWA](https://img.shields.io/badge/PWA-installabile-00b894)](https://www.alessandropezzali.it/PezzaliDashboard/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Privacy](https://img.shields.io/badge/Privacy-localStorage_only-58a6ff)]()

🔗 **[Apri PezzaliDashboard →](https://www.alessandropezzali.it/PezzaliDashboard/)**

---

## Perché esiste

GitHub mostra le statistiche **repo per repo**, solo per le ultime 2 settimane, e senza uno storico aggregato. Se hai 50, 100, 300 repository (come succede a chi costruisce molto), capire **cosa tira e cosa no** diventa impossibile.

PezzaliDashboard risolve questo: una vista unica, in tempo reale, con storico, categorie e segnali utili.

## Cosa fa

- 📊 **KPI aggregati** — Stelle, fork, repo totali, linguaggi: tutto in un colpo d'occhio
- 📈 **Trend nel tempo** — Snapshot automatici a ogni accesso (storico fino a 60 punti, fino a un anno)
- 🏆 **Top 10 performers** — Per stelle e per fork
- 🗂️ **Aree tematiche** — Categorizzazione automatica per parola chiave (commerciali, AI, audio, spazio, security, giochi…)
- 🚨 **Alert** — Repo che prendono stelle, repo fermi da archiviare, repo senza description/topic
- 📋 **Tabella completa** — Tutti i tuoi repo, filtrabili e ordinabili
- 📱 **PWA installabile** — Aggiungi a Home su iPhone/Android, oppure installa come app desktop

## Privacy & modello di sicurezza

PezzaliDashboard è una **dashboard personale**: gira col **tuo** token GitHub, nel **tuo** browser, sul **tuo** dispositivo. Detto onestamente, ecco cosa protegge e cosa no:

- 🔑 **Il vero controllo d'accesso è la GitHub API.** L'app mostra solo i dati che il tuo token può già leggere. Senza un tuo token nessuno vede i tuoi dati; con un tuo token quei dati sono leggibili anche senza questa app (è solo una vista più comoda degli stessi dati).
- 📂 **Gran parte di ciò che vedi (repo pubblici, stelle, fork) è già pubblica** sul tuo profilo GitHub. La dashboard li aggrega, non li rende segreti.
- 🔐 **Token cifrato a riposo:** il token viene cifrato con la tua passphrase (AES-GCM 256-bit + PBKDF2, 250.000 iterazioni) prima di essere salvato nel browser. Serve a proteggerlo **su questo dispositivo**: se qualcuno accede al tuo computer, non trova il token in chiaro.
- 🔑 La **passphrase non viene mai salvata**: la conosci solo tu, la reinserisci a ogni accesso.
- 🚫 **Nessun server intermedio**: l'app parla direttamente con `api.github.com`.
- 🚫 **Nessun account, nessun tracking, nessuna analytics.**
- ♻️ Lo storico snapshot (solo **numeri aggregati**) resta sul tuo dispositivo. I nomi dei repo non vengono mai salvati su disco.
- 🗑️ Puoi cancellare tutto in qualunque momento (logout + clear storage).

> **Vuoi la certezza che sia accessibile solo a te?** Il modo più solido non è un controllo nel browser (sarebbe aggirabile): è **non esporre un URL pubblico**. Aprila in locale (da disco o `localhost`), oppure mettila su un GitHub Pages **privato** (richiede GitHub Pro, mette la pagina dietro il login GitHub). E soprattutto: usa **token fine-grained** con scope minimo e scadenza breve, mai Classic PAT ad ampio raggio.

Coerente con la filosofia di tutto l'ecosistema [PezzaliAPP](https://www.pezzaliapp.com): i tuoi dati restano tuoi.

### Come usarla per te (se fai fork)

Non c'è niente da configurare per l'accesso: l'app gira con qualunque token GitHub valido tu inserisca e mostra i dati di quel token. Se vuoi, personalizza colori, logo e le categorie (costante `CATEGORIES` in `index.html`).

Per renderla davvero "solo tua", vedi la nota sopra (**Privacy & modello di sicurezza**): tienila in locale o su GitHub Pages privato, e usa un token fine-grained con scope minimo.

### Come funziona la passphrase

**Primo accesso:**
1. Inserisci il token GitHub
2. Scegli una passphrase robusta (minimo 12 caratteri)
3. L'app cifra il token con la passphrase e lo salva cifrato
4. La passphrase NON viene salvata da nessuna parte

**Accessi successivi:**
1. L'app mostra solo il campo passphrase
2. La inserisci → l'app decifra il token salvato → entri
3. Se la passphrase è sbagliata → errore, non entri

**Se dimentichi la passphrase:**
- Clicca "Reimposta con un nuovo token" e ricominci da capo
- Lo storico snapshot resta salvato

## Come si usa

### 1. Genera un Personal Access Token su GitHub

1. Vai su [github.com/settings/tokens](https://github.com/settings/tokens)
2. **Generate new token** → **Classic**
3. Note: `PezzaliDashboard` · Scadenza a tua scelta (consigliato: 90 giorni rinnovabili)
4. Scope minimi:
   - `public_repo` (per leggere i repo pubblici)
   - `read:user` (per i dati base utente)
   - `read:org` (opzionale, se hai organizzazioni)
5. **Generate token** e copia (inizia con `ghp_…`)

### 2. Apri PezzaliDashboard

Vai su [alessandropezzali.it/PezzaliDashboard](https://www.alessandropezzali.it/PezzaliDashboard/), incolla il token, accedi.

### 3. (Opzionale) Installa come PWA

- **iOS/Safari:** Condividi → Aggiungi a Home
- **Android/Chrome:** menu → Installa app
- **Desktop:** icona "Installa" nella barra indirizzi

## Vuoi la tua istanza?

PezzaliDashboard è **open source** e progettata per essere **forkata**. Se sei uno sviluppatore con tanti repo e vuoi la tua dashboard privata sul tuo dominio:

1. Forka questo repository
2. Attiva GitHub Pages dalle Settings (Branch: `main`, Folder: `/ (root)`)
3. (Opzionale) Personalizza colori, logo, categorie modificando `index.html`
4. Apri il tuo fork all'URL di GitHub Pages o configura un dominio custom
5. Inserisci il tuo token: nessuno vede i tuoi dati tranne te

Nessuna royalty. Nessun vendor lock-in. È la tua copia.

## Tech stack

- **JavaScript vanilla** — niente framework, niente build step
- **Chart.js 4** — grafici trend
- **GitHub REST API v2022-11-28** — fonte dati
- **localStorage** — persistenza token e snapshot
- **Service Worker** — installabilità PWA, caching asset statici (le API restano sempre live)
- **Font:** Space Grotesk + JetBrains Mono

Single-file, ~30 KB di codice + Chart.js da CDN. Nessuna dipendenza npm, nessun bundler.

## Categorie (modificabili)

La categorizzazione automatica usa parole chiave nei nomi e nelle description. Le categorie predefinite sono pensate per l'ecosistema PezzaliAPP, ma sono modificabili nella costante `CATEGORIES` di `index.html`:

| Categoria | Keyword |
|-----------|---------|
| 💼 Commerciali | listo, csv, xpress, sales, preventiv, crm… |
| 🤖 AI & Assistenti | ai, agent, claude, assistant, triage… |
| 🛰️ Spazio & Scienza | satellite, cubesat, meteor, earth, orbit, nasa… |
| 🎵 Audio & Musica | drum, dj, synth, audio, music… |
| 🔐 Security & Privacy | pentest, security, password, awareness… |
| 🎮 Giochi | game, pacman, frogger, arcade… |
| 🛠️ Utilities & Tool | check, find, match, tool, util… |

## Limitazioni note

- **Rate limit GitHub:** 5.000 chiamate/ora con token autenticato. PezzaliDashboard ne usa al massimo ~10 per refresh (paginazione 100 repo per chiamata), quindi nessun problema pratico.
- **Traffic stats individuali:** la GitHub API espone solo gli ultimi 14 giorni di traffic per repo, e solo per gli owner. PezzaliDashboard al momento non scarica questi dati granulari (sarebbe una chiamata per repo, lento). Sarà nella v2.
- **Snapshot:** salvato uno per accesso (max uno ogni 6 ore). Per uno storico ricco, apri l'app regolarmente.

## Roadmap

- [ ] Traffic stats granulari per repo (referrer, popular content)
- [ ] Export PDF/CSV del dashboard
- [ ] Dark/light theme toggle
- [ ] Categorie personalizzabili da UI (no editing del codice)
- [ ] Notifiche desktop su eventi significativi

## Ecosistema PezzaliAPP

- 🏠 [pezzaliapp.com](https://www.pezzaliapp.com) — Chi sono, manifesto, pubblicazioni
- 📱 [pezzalihub.app](https://pezzalihub.app) — Catalogo navigabile delle 77 app
- 🚀 [alessandropezzali.it](https://www.alessandropezzali.it) — Dove girano live le app
- 🐙 [github.com/pezzaliapp](https://github.com/pezzaliapp) — 295 repo open source

## Autore

[Alessandro Pezzali](https://www.pezzaliapp.com) — Sviluppatore · Musicista · Fotografo · AI Builder · 25 anni in automotive.

📧 [pezzalialessandro@gmail.com](mailto:pezzalialessandro@gmail.com)

## Licenza

[MIT](LICENSE) © 2026 Alessandro Pezzali

Puoi usarlo, modificarlo, forkarlo, redistribuirlo. Mantieni la nota di copyright.

---

<p align="center">
  <i>"GitHub ti dà i dati, ma non te li racconta. PezzaliDashboard sì."</i>
</p>
