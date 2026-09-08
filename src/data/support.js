export const FAQ = [
  { id: "f1", title: "Objekt anlegen", teaser: "Stammdaten, Objekttyp und erste Kennzahlen erfassen", body: "Legen Sie ein Objekt über „Neues Objekt“ im Dashboard an. Pflichtangaben sind Objektname, Adresse und Objekttyp. Alle weiteren Kennzahlen ergänzen Sie später in den Bereichen Finanzen, Mieter und Technik." },
  { id: "f2", title: "Ansicht anpassen", teaser: "Kennzahlen ein- und ausblenden, Reihenfolge ändern", body: "Über „Ansicht anpassen“ wählen Sie je Bereich aus, welche Kennzahlen als Karten erscheinen. Die Reihenfolge lässt sich in der Auswahl verschieben. Die Einstellung gilt für Ihr Benutzerkonto und wirkt sich nicht auf andere Personen aus." },
  { id: "f3", title: "Bankdaten verbinden", teaser: "Zahlungseingänge automatisch zuordnen", body: "Unter Einstellungen › Verknüpfungen verbinden Sie Ihr Konto. Eingehende Zahlungen werden anhand von Betrag und Verwendungszweck den Mietverhältnissen vorgeschlagen und setzen den Zahlungsstatus." },
  { id: "f4", title: "Kennzahlen verstehen", teaser: "Berechnungsgrundlagen von LTV, DSCR und EK-Rendite", body: "Der LTV setzt die Restschuld ins Verhältnis zum aktuellen Marktwert. Der DSCR bezieht sich auf den Kapitaldienst der letzten zwölf Monate. Die EK-Rendite berechnet sich aus dem Cashflow nach Kapitaldienst geteilt durch den Eigenkapitaleinsatz." },
  { id: "f5", title: "Dokumente ablegen", teaser: "Revisionsunterlagen nach Gewerken sortieren", body: "Dokumente werden einer Kategorie im Bereich Technik zugeordnet, etwa Heizung oder Elektrik. Zulässig sind PDF, JPG und PNG bis 25 MB je Datei." },
  { id: "f6", title: "Marktmiete ermitteln", teaser: "Premium-Funktion für den Mietvergleich", body: "Die halbautomatische Ermittlung der Marktmiete auf Basis von Vergleichsangeboten ist Teil des Premium-Tarifs. Im Prototyp sind Vergleichswerte hinterlegt und als Premium gekennzeichnet." },
];

export const EINSTELLUNGEN = [
  {
    gruppe: "Konto",
    items: [
      { id: "s-profil", title: "Profil", meta: "Alex Weippert · alex@immoradar.app", body: "Name, Kontaktdaten und Zugriffsrechte für eingeladene Personen.", rows: [["Name", "Alex Weippert"], ["E-Mail", "alex@immoradar.app"], ["Rolle", "Eigentümer"], ["Eingeladene Personen", "2 (Steuerberatung, Hausverwaltung)"], ["Zwei-Faktor-Anmeldung", "aktiv"]] },
      { id: "s-abo", title: "Abonnement und Zahlungen", meta: "Pro · jährlich", body: "Tarif, Zahlungsmittel und Rechnungen der letzten zwölf Monate.", rows: [["Tarif", "Pro"], ["Objekte im Tarif", "bis zu 15"], ["Preis", "348 € pro Jahr"], ["Nächste Abbuchung", "01.03.2027"], ["Zahlungsmittel", "SEPA-Lastschrift · DE•• •••• 4412"]] },
    ],
  },
  {
    gruppe: "Erweiterungen",
    items: [
      { id: "s-addins", title: "Add-ins", meta: "3 aktiv von 7 verfügbar", body: "Zusatzmodule erweitern Immoradar um Auswertungen und Exportformate.", rows: [["Cashflow-Prognose", "aktiv"], ["Marktmiete halbautomatisch", "Premium, nicht gebucht"], ["DATEV-Export", "aktiv"], ["Nebenkostenabrechnung", "nicht aktiv"], ["Portfolio-Reporting", "aktiv"]] },
      { id: "s-verkn", title: "Verknüpfungen", meta: "Bank, Kalender, Cloud", body: "Verbundene Dienste und deren letzte Synchronisierung.", rows: [["Sparkasse Aschaffenburg", "verbunden · Sync 23.08.2026, 06:10 Uhr"], ["Volksbank Aschaffenburg", "verbunden · Sync 23.08.2026, 06:10 Uhr"], ["Microsoft 365 Kalender", "verbunden"], ["OneDrive Dokumente", "verbunden · 1,4 GB belegt"], ["Steuerkanzlei-Zugang", "nicht verbunden"]] },
    ],
  },
  {
    gruppe: "Allgemein",
    items: [
      { id: "s-benach", title: "Benachrichtigungen", meta: "Fristen, Zahlungseingänge, Berichte", body: "Steuern Sie, worüber Immoradar Sie informiert.", toggles: [["Fristen und Prüftermine", true], ["Zahlungseingang je Mietverhältnis", true], ["Ausstehende Mietzahlung", true], ["Monatlicher Portfolio-Bericht", false], ["Produktneuigkeiten", false]] },
      { id: "s-allg", title: "Allgemeine Einstellungen", meta: "Sprache, Währung, Darstellung", body: "Grundeinstellungen für Anzeige und Formate.", rows: [["Sprache", "Deutsch"], ["Währung", "Euro (€)"], ["Zahlenformat", "1.234,56"], ["Startansicht", "Dashboard"], ["Erscheinungsbild", "Hell"]] },
      { id: "s-daten", title: "Datenschutz und Export", meta: "Datenexport, Löschung", body: "Export aller Objektdaten sowie Löschung des Kontos.", rows: [["Datenexport", "CSV, XLSX, PDF"], ["Letzter Export", "04.08.2026"], ["Speicherort", "Frankfurt am Main, Deutschland"], ["Aufbewahrung nach Kündigung", "30 Tage"]] },
    ],
  },
];

export const SUCHERGEBNISSE = [
  { kind: "Objekt", title: "Beethovenstraße 4", meta: "Mehrfamilienhaus · Aschaffenburg", obj: "beethoven", section: "finanzen" },
  { kind: "Mieter", title: "Ivana Petrović", meta: "Beethovenstraße 4 · WE 4", obj: "beethoven", section: "mieter", node: { type: "mieter", id: "m2" } },
  { kind: "Mieter", title: "Nordwind Logistik UG", meta: "Industriehof 7 · Halle B · Zahlung überfällig", obj: "industriehof", section: "mieter", node: { type: "mieter", id: "m2" } },
  { kind: "Technik", title: "Sanitär – Strangsanierung", meta: "Beethovenstraße 4 · kurzfristiger Handlungsbedarf", obj: "beethoven", section: "technik", node: { type: "zustand", id: "z-sanitaer" } },
  { kind: "Unterlagen", title: "Heizung", meta: "Industriehof 7 · Revisionsunterlagen", obj: "industriehof", section: "technik", node: { type: "revision", id: "r-heizung" } },
  { kind: "Objekt", title: "Gartenweg 12", meta: "Einfamilienhaus · Hösbach", obj: "gartenweg", section: "finanzen" },
];
