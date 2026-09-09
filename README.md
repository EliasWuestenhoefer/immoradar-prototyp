# Immoradar – Prototyp

Klickbarer Frontend-Prototyp mit Dummy-Daten für Objekte (keine echte
Berechnungslogik). Anmeldung/Registrierung laufen über Supabase Auth.

## Lokal starten (Entwicklung mit Live-Reload)

```
npm install
cp .env.example .env   # Supabase-URL und anon key eintragen
npm run dev
```

Öffnet eine lokale Adresse (meist http://localhost:5173), die sich bei jeder Änderung automatisch aktualisiert.

## Produktions-Build erzeugen

```
npm run build
```

Erzeugt einen `dist/`-Ordner mit den fertigen, optimierten Dateien — das ist das, was am Ende gehostet wird (z. B. auf GitHub Pages).

## Projektstruktur

```
src/
  main.jsx              Einstiegspunkt, bindet App + Styles ein
  App.jsx                Haupt-Komponente (Navigation, Screens, Zustand)
  styles.css              Gesamtes Styling
  data/
    objekte.js            Dummy-Objektdaten (Immobilien)
    kataloge.js            KPI-Kataloge je Bereich (Dashboard/Finanzen/Mieter/Technik)
    support.js              FAQ, Einstellungen, Suchergebnisse
  components/
    Icons.jsx               Alle SVG-Icons
    ObjektBild.jsx           Illustrierte Objekt-Vorschaubilder
    Bausteine.jsx            Wiederverwendbare UI-Bausteine (KpiCard, Panel, ListRow, ...)
  utils/
    format.js                Formatierungshilfen (eur, pct)
    supabaseClient.js        Supabase-Client (liest VITE_SUPABASE_URL/ANON_KEY)
  components/
    Auth.jsx                 Login, Registrierung, Passwort-Fenster
supabase/
  profiles.sql               Schema + Trigger für die profiles-Tabelle (im Supabase SQL-Editor ausführen)
```

## Supabase-Authentifizierung

Login, Registrierung und Passwort-zurücksetzen laufen über Supabase Auth
(`src/utils/supabaseClient.js`). Nötige Env-Variablen (lokal in `.env`,
für den Deploy als GitHub-Actions-Secrets `VITE_SUPABASE_URL` und
`VITE_SUPABASE_ANON_KEY` unter Repo-Settings → Secrets and variables →
Actions):

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

`supabase/profiles.sql` einmalig im Supabase SQL-Editor ausführen, legt
die `profiles`-Tabelle inkl. Trigger an, der bei jeder Registrierung
automatisch eine Zeile anlegt.

## Deployment auf GitHub Pages

Jeder Push auf `main` veröffentlicht die Seite automatisch (siehe
`.github/workflows/deploy.yml`): GitHub Actions baut das Projekt und
pusht den `dist`-Ordner auf den `gh-pages`-Branch. Kein manueller
Schritt mehr nötig.

Live-Seite: https://eliaswuestenhoefer.github.io/immoradar-prototyp/

Einmalige Voraussetzung in den Repo-Settings → Pages → Source: Branch
`gh-pages`, Ordner `/ (root)`.

Manuell auslösen geht weiterhin über `npm run deploy` (baut und
veröffentlicht lokal) oder über den "Run workflow"-Button im
Actions-Tab.
