export const DASH_KATALOG = [
  { id: "marktwert", label: "Marktwert Gesamtportfolio", value: "5.335.000 €", note: "3 Objekte, Bewertung 2026" },
  { id: "restschuld", label: "Restschuld", value: "2.737.400 €", note: "Stand 31.07.2026" },
  { id: "cfm", label: "Cashflow / Monat", value: "6.548 €", note: "nach Kapitaldienst" },
  { id: "jnkm", label: "Jahresnettokaltmiete", value: "259.380 €", note: "über alle Objekte" },
  { id: "leerstand", label: "Leerstand", value: "5,0 %", note: "100 m² von 2.000 m²" },
  { id: "massnahmen", label: "Anstehende Maßnahmen", value: "6", note: "davon 2 mit Frist in 2026" },
  { id: "objekte", label: "Objekte", value: "3", note: "Aschaffenburg, Hösbach, Offenbach" },
  { id: "ek", label: "Eigenkapitaleinsatz", value: "2.095.000 €", note: "inkl. spätere Zuführungen" },
  { id: "ltv", label: "LTV Portfolio", value: "51,3 %", note: "bezogen auf den Marktwert" },
  { id: "brutto", label: "Ø Bruttomietrendite", value: "4,87 %", note: "gewichtet nach Ankaufskosten" },
  { id: "cfj", label: "Cashflow / Jahr", value: "78.580 €", note: "nach Kapitaldienst" },
  { id: "wault", label: "WAULT Portfolio", value: "4,3 Jahre", note: "gewichtet nach Mietfläche" },
];
export const DASH_DEFAULT = ["marktwert", "restschuld", "cfm", "jnkm", "leerstand", "massnahmen"];

export const FIN_KATALOG = [
  { id: "marktwert", label: "Marktwert" },
  { id: "ankaufskosten", label: "Ankaufskosten" },
  { id: "eigenkapital", label: "Eigenkapitaleinsatz", klick: true },
  { id: "restschuld", label: "Restschuld", klick: true },
  { id: "ltv", label: "LTV", klick: true },
  { id: "cfm", label: "Cashflow / Monat" },
  { id: "cfj", label: "Cashflow / Jahr" },
  { id: "ekrendite", label: "EK-Rendite" },
  { id: "dscr", label: "DSCR" },
  { id: "brutto", label: "Bruttomietrendite" },
  { id: "netto", label: "Nettomietrendite" },
  { id: "ihr", label: "Instandhaltungsrücklage", klick: true },
  { id: "nichtumlage", label: "Nicht umlagefähige Bewirtschaftungskosten" },
  { id: "zins", label: "Effektiver Zinssatz" },
  { id: "zinsbindung", label: "Zinsbindung" },
  { id: "afa", label: "AfA-Satz" },
];
export const FIN_DEFAULT = ["marktwert", "restschuld", "ltv", "cfm", "ekrendite", "dscr"];

export const MIET_KATALOG = [
  { id: "jnkm", label: "Jahresnettokaltmiete" },
  { id: "monatlich", label: "Monatliche Mieteinnahmen" },
  { id: "nkvz", label: "NK-Vorauszahlungen / Monat" },
  { id: "wault", label: "WAULT" },
  { id: "leerstand", label: "Leerstand", klick: true },
  { id: "mieteqm", label: "Ø Miete / m²" },
  { id: "flaeche", label: "Mietfläche" },
  { id: "potenzial", label: "Mietpotenzial" },
  { id: "einheiten", label: "Vermietete Einheiten" },
];
export const MIET_DEFAULT = ["jnkm", "monatlich", "nkvz", "wault", "leerstand", "einheiten"];

export const TECH_KATALOG = [
  { id: "baujahr", label: "Baujahr" },
  { id: "wohnflaeche", label: "Wohn- und Nutzfläche" },
  { id: "grundstueck", label: "Grundstücksfläche" },
  { id: "sanierung", label: "Letzte Sanierung" },
  { id: "heizung", label: "Heizungsart" },
  { id: "energie", label: "Energieausweis", klick: true },
  { id: "rnd", label: "Restnutzungsdauer" },
  { id: "naechste", label: "Nächste notwendige Maßnahme" },
  { id: "capex", label: "Geschätzte CapEx" },
];
export const TECH_DEFAULT = ["baujahr", "wohnflaeche", "rnd", "energie", "naechste", "capex"];

export const SEKTIONEN = [
  { id: "finanzen", label: "Finanzen" },
  { id: "mieter", label: "Mieter" },
  { id: "technik", label: "Technik" },
  { id: "organisatorisches", label: "Organisatorisches" },
];

// Vermögensentwicklung Portfolio (Marktwert abzüglich Restschuld), letzte 3 Jahre.
// Aktueller Wert (2026) ergibt sich exakt aus den Objektdaten: 5.335.000 € − 2.737.400 € = 2.597.600 €.
export const VERMOEGEN_VERLAUF = [
  { label: "2023", wert: 2180000 },
  { label: "2024", wert: 2340000 },
  { label: "2025", wert: 2480000 },
  { label: "2026", wert: 2597600 },
];

export const STEUERSATZ_DEFAULT = 42;
