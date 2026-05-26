# CHANGES — Hardening v3 → v4 (Opzione A)

Modifiche applicate dopo l'analisi di sicurezza (vedi `ANALISI.md`).
Scelta di modello: **Opzione A** — dashboard personale onesta. Rimosso il controllo
d'accesso client-side (era teatro, aggirabile e tarato al contrario rispetto al rischio),
tenuta la cifratura del token a riposo, allineato il testo alla realtà, sistemati i difetti
di codice reali.

---

## File modificati
- `index.html`
- `sw.js`
- `README.md`
- (nuovi) `ANALISI.md`, `CHANGES.md`

---

## Sicurezza / hardening

### 1. Rimosso il controllo d'accesso client-side (Patch 7)
- Eliminata la costante `ACCESS_CONFIG` (username/canary/min-repos).
- Eliminata la funzione `validateAccess()` e le sue 2 chiamate (sblocco + primo accesso).
- **Resta** l'unico controllo sensato: il token deve essere valido (`fetchUser()` fallisce con 401 → niente accesso).
- **Perché:** i 3 check giravano nel browser dell'utente → aggirabili in DevTools / salvando il file / con un `curl`. Non proteggevano dati (l'app mostra solo ciò che il token può già leggere dall'API). Inoltre bloccavano i token innocui e lasciavano passare il classic PAT ad ampio raggio (il caso davvero pericoloso).

### 2. HTML-escaping dei dati GitHub — anti-XSS (Patch 3)
- Aggiunta funzione `esc()` (escape di `& < > " '`).
- Applicata a nome/URL/description/linguaggio repo in `renderTopLists` e `renderTable`.
- **Esteso anche** a `renderAlerts` (nome repo) e all'header (`state.user.login`): stessa classe di bug, era incoerente lasciarli fuori.
- **Perché:** prima un repo con nome/description tipo `<img src=x onerror=...>` avrebbe eseguito codice nello stesso origin del token. Exploitabilità bassa (dati dai propri repo) ma difesa in profondità su un'app che maneggia un token.

### 3. Subresource Integrity su Chart.js (Patch 4)
- `index.html` riga 19: aggiunti `integrity="sha384-9nhcz…urn4"` + `crossorigin="anonymous"` allo `<script>` di Chart.js 4.4.1.
- Hash calcolato dal file reale servito da jsDelivr e verificato stabile su 3 run.
- **Perché:** se jsDelivr o il pacchetto venissero compromessi, lo script malevolo girerebbe accanto al token. Con SRI il browser rifiuta lo script se l'hash non combacia.

### 4. Passphrase minimo 12 caratteri (Patch 5)
- Soglia portata da `< 6` a `< 12`, messaggio aggiornato.
- **Perché:** una passphrase di 6 caratteri è brute-forzabile offline anche con PBKDF2 250k. La cifratura at-rest vale quanto la passphrase.

### 5. `rel="noopener noreferrer"` su tutti i `target="_blank"` (Patch 6)
- 9 link (4 statici + 5 in template JS): help token, repo, pezzaliapp.com, pezzalihub.app, header utente, header repo, top-stars, top-forks, tabella repo.
- **Perché:** evita reverse-tabnabbing e leak di referrer verso le pagine aperte.

---

## Testo / onestà dell'UI (Patch 1)

### `index.html`
- Rimosso il banner rosso "⚠️ Istanza riservata a @pezzaliapp / token respinti automaticamente".
- Hint passphrase riscritto: ora dice la verità (cifra il token **a riposo su questo dispositivo**), non più "anche con il tuo token, senza passphrase non entra".
- Box "Doppia protezione" → "Token cifrato sul dispositivo", senza promesse esagerate.

### `README.md`
- Sezione "Privacy by design" → **"Privacy & modello di sicurezza"**: spiega onestamente che il vero controllo d'accesso è la GitHub API, che gran parte dei dati è già pubblica, e che la cifratura protegge il token solo a riposo sul dispositivo.
- Tolte le frasi "controllo accesso a 3 livelli" e "anche con token valido non entra".
- Aggiunta nota: per la certezza "solo io", tieni l'app in locale o su Pages privato + token fine-grained.
- Sezione "Come configurare l'istanza" → "Come usarla per te": rimosso il riferimento a `ACCESS_CONFIG` (non esiste più).
- Passphrase "minimo 6, idealmente 12+" → "minimo 12 caratteri".

---

## Service worker (richiesto)
- `sw.js`: `CACHE_NAME` da `pezzali-dashboard-v3-access-control` → **`pezzali-dashboard-v4`**.
- **Perché:** forza l'invalidazione della cache all'`activate`, così online gli utenti prendono la nuova versione invece della v3 cachata. (Tolto anche il suffisso "access-control", non più pertinente.)

---

## NON fatto (per scelta)
- **Patch 2 (audit/revoca Classic PAT):** la fai tu a mano su github.com/settings/tokens. È la mossa a più alto impatto reale.
- **Patch 8 (CSP):** saltata su tua richiesta (richiede spostare gli handler inline, non vale la complessità ora).

---

## Verifiche eseguite
- ✅ Nessun residuo di `ACCESS_CONFIG` / `validateAccess` in `index.html`.
- ✅ Tutti i `target="_blank"` hanno `rel="noopener noreferrer"`.
- ✅ JS inline estratto e validato con `node --check` → sintassi OK.
- ✅ Hash SRI ricalcolato 3 volte, stabile.
- ✅ Nessun claim stale ("canary", "3 livelli", "non entra") residuo in README/index.

## Da verificare TU prima del deploy
- Apri `index.html` in locale, fai login col token + passphrase (≥12 char), controlla che dashboard, grafico trend (Chart.js via SRI) e tabella si vedano.
- Dopo il deploy, hard-refresh per far aggiornare il service worker alla v4.
