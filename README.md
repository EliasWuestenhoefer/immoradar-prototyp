# Immoradar – Prototyp

Klickbarer Frontend-Prototyp mit Dummy-Daten (keine echte Berechnungslogik, kein Backend).

## Lokal starten (Entwicklung mit Live-Reload)

```
npm install
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
```

## Deployment auf GitHub Pages

1. Dieses Projekt auf GitHub pushen (siehe Chat-Anleitung).
2. In `vite.config.js` prüfen, dass `base: "/<dein-repo-name>/"` zum tatsächlichen Repo-Namen passt.
3. Einmalig: `npm install` (installiert dabei auch `gh-pages`).
4. Danach bei jeder Veröffentlichung einfach: `npm run deploy`
   Das baut das Projekt und veröffentlicht den `dist`-Ordner auf dem `gh-pages`-Branch.
5. In den Repo-Settings → Pages → Source: Branch `gh-pages`, Ordner `/ (root)` auswählen.
