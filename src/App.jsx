import { useState } from "react";
import { eur, parseEur } from "./utils/format.js";
import { OBJEKTE, OBJEKTTYPEN } from "./data/objekte.js";
import {
  DASH_KATALOG, DASH_DEFAULT, FIN_KATALOG, FIN_DEFAULT,
  MIET_KATALOG, MIET_DEFAULT, TECH_KATALOG, TECH_DEFAULT,
  VERMOEGEN_VERLAUF, STEUERSATZ_DEFAULT,
} from "./data/kataloge.js";
import { FAQ, EINSTELLUNGEN, SUCHERGEBNISSE } from "./data/support.js";
import { Ico } from "./components/Icons.jsx";
import { ObjektBild } from "./components/ObjektBild.jsx";
import {
  KpiCard, DataRows, Panel, ListRow, Segmented, ObjektTabs,
  AnpassenButton, AnpassenSheet, MietVergleich, DokumentAnsicht, EnergieAusweis, VermoegenChart, BeteiligtePanel,
} from "./components/Bausteine.jsx";

export default function ImmoradarPrototype({ onLogout, userEmail }) {
  const [tab, setTab] = useState("dashboard");
  const [objektId, setObjektId] = useState(null);
  const [sektion, setSektion] = useState("finanzen");
  const [pfad, setPfad] = useState([]); // Detailebenen innerhalb eines Objekts
  const [supportView, setSupportView] = useState("support");
  const [faqId, setFaqId] = useState(null);
  const [anfrage, setAnfrage] = useState(false);
  const [settingsId, setSettingsId] = useState(null);
  const [suche, setSuche] = useState("");
  const [neuesObjekt, setNeuesObjekt] = useState(false);
  const [neuTyp, setNeuTyp] = useState("Mehrfamilienhaus");
  const [objekteListe, setObjekteListe] = useState(OBJEKTE);
  const [steuersatz, setSteuersatz] = useState({}); // je Objekt-ID, Fallback STEUERSATZ_DEFAULT
  const [loeschenBestaetigen, setLoeschenBestaetigen] = useState(false);
  const [beteiligte, setBeteiligte] = useState({}); // je Objekt-ID: Array von Beteiligten

  // Personalisierung
  const [dashKpis, setDashKpis] = useState(DASH_DEFAULT);
  const [finKpis, setFinKpis] = useState(FIN_DEFAULT);
  const [mietKpis, setMietKpis] = useState(MIET_DEFAULT);
  const [techKpis, setTechKpis] = useState(TECH_DEFAULT);
  const [anpassen, setAnpassen] = useState(null);

  // weitere Steuerungen
  const [nuModus, setNuModus] = useState("monat");
  const [ihr, setIhr] = useState({ modus: "qm", qm: 15, fest: 9180, pct: 10 });

  const objekt = objekteListe.find((o) => o.id === objektId) || null;
  const knoten = pfad.length ? pfad[pfad.length - 1] : null;
  const faq = faqId ? FAQ.find((f) => f.id === faqId) : null;
  const setting = settingsId ? EINSTELLUNGEN.flatMap((g) => g.items).find((s) => s.id === settingsId) : null;

  const push = (n) => setPfad([...pfad, n]);
  const openObjekt = (id, sec = "finanzen", node = null) => {
    setTab("dashboard");
    setObjektId(id);
    setSektion(sec);
    setPfad(node ? [node] : []);
  };
  const wechsleTab = (t) => {
    setTab(t); setObjektId(null); setPfad([]); setFaqId(null); setSettingsId(null); setAnfrage(false);
  };
  const wechsleSektion = (s) => { setSektion(s); setPfad([]); };

  const steuersatzFuer = (id) => steuersatz[id] ?? STEUERSATZ_DEFAULT;
  const setSteuersatzFuer = (id, wert) => setSteuersatz({ ...steuersatz, [id]: wert });

  const objektLoeschen = (id) => {
    setObjekteListe(objekteListe.filter((o) => o.id !== id));
    setLoeschenBestaetigen(false);
    setObjektId(null);
  };

  const beteiligteFuer = (id) => beteiligte[id] || [];
  const beteiligtenHinzufuegen = (objektIdFuer, neuer) => {
    const bisherige = beteiligteFuer(objektIdFuer).map((b) =>
      neuer.hauptansprechpartner && b.rolle === neuer.rolle ? { ...b, hauptansprechpartner: false } : b
    );
    setBeteiligte({ ...beteiligte, [objektIdFuer]: [...bisherige, neuer] });
  };
  const beteiligtenEntfernen = (objektIdFuer, beteiligterId) => {
    setBeteiligte({ ...beteiligte, [objektIdFuer]: beteiligteFuer(objektIdFuer).filter((b) => b.id !== beteiligterId) });
  };

  const cfVorSteuernNum = objekteListe.reduce((sum, o) => sum + parseEur(o.fin.cfm.value), 0);
  const cfNachSteuernNum = objekteListe.reduce(
    (sum, o) => sum + parseEur(o.fin.cfm.value) * (1 - steuersatzFuer(o.id) / 100),
    0
  );

  const kannZurueck = !!(pfad.length || objekt || faq || setting || anfrage);
  const zurueck = () => {
    if (pfad.length) return setPfad(pfad.slice(0, -1));
    if (objekt) return setObjektId(null);
    if (anfrage) return setAnfrage(false);
    if (faq) return setFaqId(null);
    if (setting) return setSettingsId(null);
  };

  // Instandhaltungsrücklage aus Konfiguration
  const ihrWert = (o) => {
    if (!o) return "–";
    if (ihr.modus === "qm") return eur(ihr.qm * o.flaecheNum);
    if (ihr.modus === "pct") return eur(Math.round((ihr.pct / 100) * o.jnkmNum));
    return eur(ihr.fest);
  };
  const ihrNote =
    ihr.modus === "qm" ? ihr.qm.toLocaleString("de-DE") + ",00 €/m² p. a." :
    ihr.modus === "pct" ? ihr.pct + " % der Jahresnettokaltmiete" : "Pauschalbetrag p. a.";

  /* KPI-Auflösung */
  const finKarte = (id) => {
    const f = objekt.fin;
    switch (id) {
      case "ihr": return { label: "Instandhaltungsrücklage", value: ihrWert(objekt), note: ihrNote, onClick: () => push({ type: "ihr" }) };
      case "nichtumlage": return {
        label: "Nicht umlagefähige Kosten",
        value: nuModus === "monat" ? f.nichtumlage.monat : f.nichtumlage.jahr,
        note: f.nichtumlage.note,
        control: (
          <span className="kpi-toggle" onClick={(e) => e.stopPropagation()}>
            <Segmented small items={[{ id: "monat", label: "Monat" }, { id: "jahr", label: "Jahr" }]} value={nuModus} onChange={setNuModus} />
          </span>
        ),
      };
      case "restschuld": return { label: "Restschuld", ...f.restschuld, onClick: () => push({ type: "restschuld" }) };
      case "ltv": return { label: "LTV", ...f.ltv, onClick: () => push({ type: "ltv" }) };
      case "eigenkapital": return { label: "Eigenkapitaleinsatz", ...f.eigenkapital, onClick: () => push({ type: "ek" }) };
      default: {
        const meta = FIN_KATALOG.find((k) => k.id === id);
        return { label: meta ? meta.label : id, ...(f[id] || { value: "–" }) };
      }
    }
  };

  const mietKarte = (id) => {
    const m = objekt.miet;
    const meta = MIET_KATALOG.find((k) => k.id === id);
    if (id === "leerstand") return { label: "Leerstand", ...m.leerstand, onClick: () => push({ type: "leerstand" }) };
    if (id === "potenzial") return { label: "Mietpotenzial", ...m.potenzial, badge: "Premium" };
    return { label: meta ? meta.label : id, ...(m[id] || { value: "–" }) };
  };

  const techKarte = (id) => {
    const t = objekt.tech;
    const meta = TECH_KATALOG.find((k) => k.id === id);
    if (id === "energie") return { label: "Energieausweis", ...t.energie, onClick: () => push({ type: "energie" }) };
    return { label: meta ? meta.label : id, ...(t[id] || { value: "–" }) };
  };

  /* Kopfzeile */
  const knotenTitel = () => {
    if (!knoten) return null;
    if (knoten.type === "mieter") return objekt.miet.mieter.find((x) => x.id === knoten.id).name;
    if (knoten.type === "zustand") return objekt.tech.zustand.find((x) => x.id === knoten.id).title;
    if (knoten.type === "revision") return objekt.tech.revision.find((x) => x.id === knoten.id).title;
    if (knoten.type === "doc") return knoten.name;
    if (knoten.type === "restschuld") return "Restschuld";
    if (knoten.type === "ltv") return "Beleihungsauslauf";
    if (knoten.type === "leerstand") return "Leerstand";
    if (knoten.type === "energie") return "Energieausweis";
    if (knoten.type === "ek") return "Eigenkapitaleinsatz";
    if (knoten.type === "ihr") return "Instandhaltungsrücklage";
    return "";
  };

  const titel = knoten ? knotenTitel()
    : objekt ? objekt.name
    : setting ? setting.title
    : anfrage ? "Anfrage starten"
    : faq ? faq.title
    : tab === "dashboard" ? "Dashboard"
    : tab === "support" ? "Support und Suche"
    : "Einstellungen";

  const untertitel = knoten ? objekt.name
    : objekt ? objekt.street
    : tab === "dashboard" ? (userEmail ? "Angemeldet als " + userEmail : "Hallo Alex") : null;

  const viewKey = [tab, objektId, sektion, pfad.map((p) => p.type + (p.id || p.name || "")).join(">"), faqId, settingsId, anfrage, supportView].join("|");

  const treffer = SUCHERGEBNISSE.filter((r) =>
    suche.trim() ? (r.title + " " + r.meta + " " + r.kind).toLowerCase().includes(suche.trim().toLowerCase()) : true
  );

  return (
    <div className="ir-root">

      <div className="app">
        <header className="topbar">
          <div className="topbar-left">
            {kannZurueck && (
              <button className="iconbtn" onClick={zurueck} aria-label="Zurück"><Ico.back /></button>
            )}
            <div className="topbar-titles">
              {untertitel && <div className="eyebrow">{untertitel}</div>}
              <h1>{titel}</h1>
            </div>
          </div>
          <div className="topbar-right">
            <button className="iconbtn" onClick={onLogout} aria-label="Abmelden" title="Abmelden"><Ico.logout /></button>
            {tab === "dashboard" && !objekt && (
              <>
                <AnpassenButton label="Dashboard anpassen" onClick={() => setAnpassen("dash")} />
                <button className="primary" onClick={() => setNeuesObjekt(true)}><Ico.plus /> Neues Objekt</button>
              </>
            )}
            {objekt && !knoten && <div className="pill-type">{objekt.type}</div>}
          </div>
        </header>

        <main className="screen" key={viewKey}>
          {/* ================= Dashboard ================= */}
          {tab === "dashboard" && !objekt && (
            <>
              <div className="kpi-grid">
                {dashKpis.map((id) => {
                  const k = DASH_KATALOG.find((x) => x.id === id);
                  return k ? <KpiCard key={id} label={k.label} value={k.value} note={k.note} /> : null;
                })}
              </div>

              <Panel title="Vermögensentwicklung" sub="Marktwert abzüglich Restschuld · letzte 3 Jahre">
                <div className="cf-row">
                  <div>
                    <span className="cf-label">Monatlicher Cashflow vor Steuern</span>
                    <strong className="cf-value">{eur(Math.round(cfVorSteuernNum))}</strong>
                  </div>
                  <div>
                    <span className="cf-label">Monatlicher Cashflow nach Steuern</span>
                    <strong className="cf-value">{eur(Math.round(cfNachSteuernNum))}</strong>
                  </div>
                </div>
                <VermoegenChart data={VERMOEGEN_VERLAUF} />
                <p className="hint">Steuersätze werden je Objekt unter „Organisatorisches“ hinterlegt. Vereinfachte Annahme, ersetzt keine steuerliche Beratung.</p>
              </Panel>

              <div className="section-title">
                <h2>Objekte</h2>
                <span>{objekteListe.length} Immobilien</span>
              </div>
              <div className="obj-grid">
                {objekteListe.map((o) => (
                  <button className="obj-card" key={o.id} onClick={() => openObjekt(o.id)}>
                    <ObjektBild type={o.type} />
                    <div className="obj-body">
                      <div className="obj-type">{o.type}</div>
                      <div className="obj-name">{o.name}</div>
                      <div className="obj-street">{o.street}</div>
                      <div className="obj-sub">{o.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ================= Objekt: Reiter ================= */}
          {objekt && !knoten && (
            <>
              <div className="obj-hero">
                <ObjektBild type={objekt.type} tall />
                <div className="obj-hero-meta">
                  <div className="obj-hero-title">{objekt.name}</div>
                  <div className="obj-hero-sub">{objekt.sub}</div>
                </div>
              </div>

              <ObjektTabs value={sektion} onChange={wechsleSektion} />

              {/* -------- Finanzen -------- */}
              {sektion === "finanzen" && (
                <>
                  <div className="bereich-kopf">
                    <div>
                      <h2>Finanzen</h2>
                      <p>{finKpis.length} von {FIN_KATALOG.length} Kennzahlen angezeigt</p>
                    </div>
                    <AnpassenButton onClick={() => setAnpassen("fin")} />
                  </div>
                  <div className="kpi-grid">
                    {finKpis.map((id) => <KpiCard key={id} {...finKarte(id)} />)}
                  </div>
                  <Panel title="Finanzierung" sub="Darlehen und Konditionen">
                    <DataRows rows={objekt.fin.darlehen} />
                  </Panel>
                </>
              )}

              {/* -------- Mieter -------- */}
              {sektion === "mieter" && (
                <>
                  <div className="bereich-kopf">
                    <div>
                      <h2>Mietübersicht</h2>
                      <p>{mietKpis.length} von {MIET_KATALOG.length} Kennzahlen angezeigt</p>
                    </div>
                    <AnpassenButton onClick={() => setAnpassen("miet")} />
                  </div>
                  <div className="kpi-grid">
                    {mietKpis.map((id) => <KpiCard key={id} {...mietKarte(id)} />)}
                  </div>
                  <Panel title="Ist-Miete gegenüber Marktmiete" sub="Vergleichswert für das gesamte Objekt" action={<span className="premium">Premium</span>}>
                    <MietVergleich v={objekt.miet.vergleich} />
                    <p className="hint">Im Premium-Tarif wird die Marktmiete halbautomatisch aus Vergleichsangeboten ermittelt und monatlich aktualisiert.</p>
                  </Panel>
                  <Panel title="Mieter" sub={objekt.miet.mieter.length + " Mietverhältnisse"}>
                    <div className="list">
                      {objekt.miet.mieter.map((m) => (
                        <ListRow
                          key={m.id}
                          title={m.name}
                          meta={m.unit + " · " + m.kaltmiete + " netto kalt"}
                          badge={m.status}
                          tone={m.statusTone}
                          onClick={() => push({ type: "mieter", id: m.id })}
                        />
                      ))}
                    </div>
                  </Panel>
                </>
              )}

              {/* -------- Technik -------- */}
              {sektion === "technik" && (
                <>
                  <div className="bereich-kopf">
                    <div>
                      <h2>Technikübersicht</h2>
                      <p>{techKpis.length} von {TECH_KATALOG.length} Angaben angezeigt</p>
                    </div>
                    <AnpassenButton onClick={() => setAnpassen("tech")} />
                  </div>
                  <div className="kpi-grid">
                    {techKpis.map((id) => <KpiCard key={id} {...techKarte(id)} />)}
                  </div>
                  <Panel title="Zustand und Maßnahmen" sub="Nach Gewerk, mit Handlungsbedarf">
                    <div className="list">
                      {objekt.tech.zustand.map((z) => (
                        <ListRow
                          key={z.id}
                          ampel={z.ampel}
                          title={z.title}
                          meta={z.zustand + " · " + z.bedarf}
                          right={z.kosten}
                          onClick={() => push({ type: "zustand", id: z.id })}
                        />
                      ))}
                    </div>
                    <div className="ampel-legende">
                      <span><i className="ampel gruen" /> kein Handlungsbedarf</span>
                      <span><i className="ampel gelb" /> mittelfristig</span>
                      <span><i className="ampel rot" /> kurzfristig</span>
                    </div>
                  </Panel>
                  <Panel title="Revisionsunterlagen" sub="Dokumente nach Gewerk sortiert">
                    <div className="list">
                      {objekt.tech.revision.map((r) => (
                        <ListRow
                          key={r.id}
                          icon={<Ico.folder />}
                          title={r.title}
                          meta={r.meta}
                          right={r.docs.length + " Dokumente"}
                          onClick={() => push({ type: "revision", id: r.id })}
                        />
                      ))}
                    </div>
                  </Panel>
                </>
              )}

              {/* -------- Organisatorisches -------- */}
              {sektion === "organisatorisches" && (
                <>
                  <div className="bereich-kopf">
                    <div>
                      <h2>Organisatorisches</h2>
                      <p>Beteiligte, Steuersatz und Objektverwaltung</p>
                    </div>
                  </div>
                  <BeteiligtePanel
                    liste={beteiligteFuer(objekt.id)}
                    mieter={objekt.miet.mieter}
                    onAdd={(b) => beteiligtenHinzufuegen(objekt.id, b)}
                    onRemove={(id) => beteiligtenEntfernen(objekt.id, id)}
                  />
                  <Panel title="Steuersatz" sub="Wird für den Cashflow nach Steuern im Dashboard verwendet">
                    <label className="field inline">
                      <span>Persönlicher Steuersatz für dieses Objekt</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        value={steuersatzFuer(objekt.id)}
                        onChange={(e) => setSteuersatzFuer(objekt.id, Number(e.target.value) || 0)}
                      />
                    </label>
                    <p className="hint">Vereinfachte Annahme: pauschaler Satz auf den Cashflow nach Kapitaldienst dieses Objekts. Ersetzt keine steuerliche Beratung.</p>
                  </Panel>
                  <Panel title="Objekt verwalten">
                    <p className="prose">Objektstammdaten wie Name, Adresse und Objekttyp können im Prototyp aktuell nicht bearbeitet werden.</p>
                    <button className="ghost danger" onClick={() => setLoeschenBestaetigen(true)}>
                      <Ico.trash /> Objekt löschen
                    </button>
                  </Panel>
                </>
              )}
            </>
          )}

          {/* ================= Detailebenen im Objekt ================= */}
          {knoten && knoten.type === "mieter" && (() => {
            const m = objekt.miet.mieter.find((x) => x.id === knoten.id);
            return (
              <>
                <div className={"status-band " + m.statusTone}>
                  <span className="status-dot" />
                  <div>
                    <div className="status-title">Zahlungsstatus: {m.status}</div>
                    <div className="status-note">{m.statusNote}</div>
                  </div>
                  <span className="status-push"><Ico.bell /> Push aktiv</span>
                </div>
                <div className="kpi-grid">
                  <KpiCard label="Kaltmiete / Monat" value={m.kaltmiete} note="netto kalt" />
                  <KpiCard label="Kaltmiete / m²" value={m.qm} note="netto kalt je Monat" />
                  <KpiCard label="NK-Vorauszahlungen / Monat" value={m.nk} note="Abrechnung jährlich" />
                </div>
                <div className="two-col">
                  <Panel title="Mietvertrag">
                    <DataRows rows={m.vertrag} />
                  </Panel>
                  <Panel title="Kontaktdaten">
                    <DataRows rows={[["Telefon", m.contact.tel], ["E-Mail", m.contact.mail], ["Postanschrift", m.contact.post]]} />
                  </Panel>
                </div>
                <Panel title="Ist-Miete gegenüber Marktmiete" action={<span className="premium">Premium</span>}>
                  <div className="mini-verg">
                    <div><span>Ist-Miete</span><strong>{m.qm}</strong></div>
                    <div><span>Marktmiete</span><strong>{m.markt}</strong></div>
                    <div className="mini-delta"><span>Potenzial</span><strong>{m.potenzial}</strong></div>
                  </div>
                </Panel>
                <Panel title="Dokumente und Anhänge" sub={m.docs.length + " Dateien"}>
                  <div className="list">
                    {m.docs.map((d) => (
                      <ListRow key={d} icon={<Ico.doc />} title={d} meta="PDF · zuletzt geöffnet 08/2026" onClick={() => push({ type: "doc", name: d, kontext: m.name + " · " + objekt.name })} />
                    ))}
                  </div>
                </Panel>
              </>
            );
          })()}

          {knoten && knoten.type === "zustand" && (() => {
            const z = objekt.tech.zustand.find((x) => x.id === knoten.id);
            const text = { gruen: "Kein Handlungsbedarf", gelb: "Mittelfristiger Handlungsbedarf", rot: "Kurzfristiger Handlungsbedarf" }[z.ampel];
            return (
              <>
                <div className={"status-band " + z.ampel}>
                  <span className="status-dot" />
                  <div>
                    <div className="status-title">{text}</div>
                    <div className="status-note">{z.zustand} · Zeithorizont {z.horizont}</div>
                  </div>
                </div>
                <div className="kpi-grid">
                  <KpiCard label="Zustand" value={z.zustand} note={"Baujahr " + z.baujahr} />
                  <KpiCard label="Geschätzte Kosten" value={z.kosten} note="Schätzung, ohne Angebot" />
                  <KpiCard label="Zeithorizont" value={z.horizont} note={z.bedarf} />
                </div>
                <Panel title="Empfohlene Maßnahme">
                  <p className="prose">{z.massnahme}</p>
                  <DataRows rows={[["Gewerk", z.title], ["Zustand", z.zustand], ["Baujahr", z.baujahr], ["Handlungsbedarf", z.bedarf], ["Geschätzte Kosten", z.kosten], ["Zeithorizont", z.horizont]]} />
                </Panel>
              </>
            );
          })()}

          {knoten && knoten.type === "revision" && (() => {
            const r = objekt.tech.revision.find((x) => x.id === knoten.id);
            return (
              <>
                <Panel title={r.title} sub={r.meta}>
                  <DataRows rows={r.rows} />
                </Panel>
                <Panel title="Dokumente" sub={r.docs.length + " Dateien in dieser Kategorie"}>
                  <div className="list">
                    {r.docs.map((d) => (
                      <ListRow key={d} icon={<Ico.doc />} title={d} meta="Revisionsunterlage" onClick={() => push({ type: "doc", name: d, kontext: r.title + " · " + objekt.name })} />
                    ))}
                  </div>
                </Panel>
              </>
            );
          })()}

          {knoten && knoten.type === "doc" && (
            <DokumentAnsicht name={knoten.name} kontext={knoten.kontext} />
          )}

          {knoten && knoten.type === "energie" && (
            <>
              <EnergieAusweis a={objekt.tech.ausweis} />
              <Panel title="Angaben zum Ausweis">
                <DataRows rows={objekt.tech.ausweis.rows} />
              </Panel>
            </>
          )}

          {knoten && knoten.type === "restschuld" && (
            <>
              <div className="kpi-grid">
                <KpiCard label="Restschuld" value={objekt.fin.restschuld.value} note={objekt.fin.restschuld.note} />
                <KpiCard label="Effektiver Zinssatz" value={objekt.fin.zins.value} note={objekt.fin.zins.note} />
                <KpiCard label="Zinsbindung" value={objekt.fin.zinsbindung.value} note={objekt.fin.zinsbindung.note} />
              </div>
              <Panel title="Tilgungsverlauf" sub="Stichtage und Prognose">
                <DataRows rows={objekt.fin.tilgung} />
              </Panel>
              <Panel title="Darlehensdaten">
                <DataRows rows={objekt.fin.darlehen} />
              </Panel>
            </>
          )}

          {knoten && knoten.type === "ltv" && (
            <>
              <Panel title="Beleihungsauslauf" sub={"Restschuld " + objekt.fin.restschuld.value + " gegenüber Marktwert " + objekt.fin.marktwert.value}>
                <div className="meter">
                  <div className="meter-track">
                    <div className="meter-fill" style={{ width: objekt.fin.ltvNum + "%" }} />
                    <div className="meter-mark" style={{ left: "80%" }} />
                  </div>
                  <div className="meter-legend">
                    <span className="meter-value">{objekt.fin.ltv.value}</span>
                    <span>Interne Obergrenze 80 %</span>
                  </div>
                </div>
              </Panel>
              <Panel title="Berechnung">
                <DataRows rows={[
                  ["Restschuld", objekt.fin.restschuld.value],
                  ["Marktwert", objekt.fin.marktwert.value],
                  ["LTV auf Marktwert", objekt.fin.ltv.value],
                  ["Ankaufskosten", objekt.fin.ankaufskosten.value],
                  ["Spielraum bis 80 %", "vorhanden"],
                ]} />
              </Panel>
            </>
          )}

          {knoten && knoten.type === "leerstand" && (
            <>
              <div className="kpi-grid">
                <KpiCard label="Leerstandsquote" value={objekt.miet.leerstand.value} note={objekt.miet.leerstand.note} />
                <KpiCard label="Vermietete Einheiten" value={objekt.miet.einheiten.value} note="vermietet / gesamt" />
                <KpiCard label="Mietfläche" value={objekt.miet.flaeche.value} note="Gesamtfläche" />
              </div>
              <Panel title="Flächen und Mietausfall">
                <DataRows rows={objekt.miet.leerstandDetail.rows} />
              </Panel>
              <Panel title="Einschätzung">
                <p className="prose">{objekt.miet.leerstandDetail.note}</p>
              </Panel>
            </>
          )}

          {knoten && knoten.type === "ek" && (
            <>
              <div className="kpi-grid">
                <KpiCard label="Eigenkapitaleinsatz" value={objekt.fin.eigenkapital.value} note={objekt.fin.eigenkapital.note} />
                <KpiCard label="EK-Rendite" value={objekt.fin.ekrendite.value} note="auf Basis des gesamten Einsatzes" />
                <KpiCard label="Cashflow / Jahr" value={objekt.fin.cfj.value} note="nach Kapitaldienst" />
              </div>
              <Panel title="Statischer und dynamischer Einsatz" sub="Ankauf und spätere Zuführungen">
                <DataRows rows={objekt.fin.ekVerlauf} />
                <p className="hint">Der Eigenkapitaleinsatz kann statisch zum Ankauf bewertet oder dynamisch um spätere Zuführungen fortgeschrieben werden. Die EK-Rendite oben bezieht sich auf die dynamische Betrachtung.</p>
              </Panel>
            </>
          )}

          {knoten && knoten.type === "ihr" && (
            <>
              <div className="kpi-grid">
                <KpiCard label="Instandhaltungsrücklage p. a." value={ihrWert(objekt)} note={ihrNote} />
                <KpiCard label="Fläche" value={objekt.miet.flaeche.value} note="Berechnungsgrundlage" />
                <KpiCard label="Jahresnettokaltmiete" value={objekt.miet.jnkm.value} note="Berechnungsgrundlage" />
              </div>
              <Panel title="Berechnung festlegen" sub="Die Auswahl wirkt sich auf die Kennzahl im Bereich Finanzen aus">
                <Segmented
                  items={[{ id: "qm", label: "je m²" }, { id: "pct", label: "% der Miete" }, { id: "fest", label: "Pauschal" }]}
                  value={ihr.modus}
                  onChange={(m) => setIhr({ ...ihr, modus: m })}
                />
                <div className="ihr-input">
                  {ihr.modus === "qm" && (
                    <label className="field inline">
                      <span>Betrag je m² und Jahr</span>
                      <input type="number" min="0" step="0.5" value={ihr.qm} onChange={(e) => setIhr({ ...ihr, qm: Number(e.target.value) || 0 })} />
                    </label>
                  )}
                  {ihr.modus === "pct" && (
                    <label className="field inline">
                      <span>Anteil der Jahresnettokaltmiete in Prozent</span>
                      <input type="number" min="0" step="1" value={ihr.pct} onChange={(e) => setIhr({ ...ihr, pct: Number(e.target.value) || 0 })} />
                    </label>
                  )}
                  {ihr.modus === "fest" && (
                    <label className="field inline">
                      <span>Pauschalbetrag pro Jahr in Euro</span>
                      <input type="number" min="0" step="100" value={ihr.fest} onChange={(e) => setIhr({ ...ihr, fest: Number(e.target.value) || 0 })} />
                    </label>
                  )}
                </div>
                <p className="hint">Im Prototyp wirkt die Einstellung sofort und nur lokal. Sie gilt für alle Objekte gleichermaßen.</p>
              </Panel>
            </>
          )}

          {/* ================= Support und Suche ================= */}
          {tab === "support" && !faq && !anfrage && (
            <>
              <div className="center-seg">
                <Segmented items={[{ id: "support", label: "Support" }, { id: "suche", label: "Suche" }]} value={supportView} onChange={setSupportView} />
              </div>

              {supportView === "support" && (
                <>
                  <div className="hero-support">
                    <h2>Wie können wir helfen?</h2>
                    <p>Antwort in der Regel innerhalb von vier Stunden an Werktagen.</p>
                    <button className="primary lg" onClick={() => setAnfrage(true)}>Anfrage starten</button>
                  </div>
                  <Panel title="Häufige Fragen" sub="Kurzanleitungen zu den wichtigsten Abläufen">
                    <div className="faq-grid">
                      {FAQ.map((f) => (
                        <button className="faq-card" key={f.id} onClick={() => setFaqId(f.id)}>
                          <span className="faq-title">{f.title}</span>
                          <span className="faq-teaser">{f.teaser}</span>
                          <Ico.chevron className="faq-chev" />
                        </button>
                      ))}
                    </div>
                  </Panel>
                </>
              )}

              {supportView === "suche" && (
                <>
                  <div className="searchbar">
                    <Ico.search />
                    <input value={suche} onChange={(e) => setSuche(e.target.value)} placeholder="Objekte, Mieter und Unterlagen durchsuchen" />
                    {suche && <button className="iconbtn sm" onClick={() => setSuche("")} aria-label="Suche leeren"><Ico.close /></button>}
                  </div>
                  <Panel title={treffer.length + " Ergebnisse"} sub="Objektübergreifend, inklusive Dokumenten">
                    <div className="list">
                      {treffer.map((r) => (
                        <ListRow key={r.title} title={r.title} meta={r.meta} badge={r.kind} tone="muted" onClick={() => openObjekt(r.obj, r.section, r.node || null)} />
                      ))}
                      {treffer.length === 0 && (
                        <div className="empty">Keine Treffer für „{suche}“. Suchen Sie nach einem Objektnamen, einer Mietpartei oder einem Gewerk.</div>
                      )}
                    </div>
                  </Panel>
                </>
              )}
            </>
          )}

          {tab === "support" && faq && !anfrage && (
            <Panel title={faq.title} sub={faq.teaser}>
              <p className="prose">{faq.body}</p>
              <button className="ghost" onClick={() => setAnfrage(true)}>Frage nicht beantwortet? Anfrage starten</button>
            </Panel>
          )}

          {tab === "support" && anfrage && (
            <Panel title="Anfrage starten" sub="Wir melden uns per E-Mail an alex@immoradar.app">
              <label className="field"><span>Betreff</span><input placeholder="Kurz zusammengefasst" /></label>
              <label className="field">
                <span>Objekt</span>
                <select defaultValue="">
                  <option value="">Kein Objektbezug</option>
                  {objekteListe.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
                </select>
              </label>
              <label className="field"><span>Beschreibung</span><textarea rows={5} placeholder="Was funktioniert nicht wie erwartet?" /></label>
              <div className="form-actions">
                <button className="primary" onClick={() => setAnfrage(false)}>Anfrage senden</button>
                <button className="ghost" onClick={() => setAnfrage(false)}>Abbrechen</button>
              </div>
            </Panel>
          )}

          {/* ================= Einstellungen ================= */}
          {tab === "settings" && !setting && (
            <>
              <div className="profile-card">
                <div className="avatar">AW</div>
                <div>
                  <div className="profile-name">Alex Weippert</div>
                  <div className="profile-meta">Tarif Pro · 3 von 15 Objekten belegt</div>
                </div>
                <button className="ghost" onClick={() => setSettingsId("s-abo")}>Tarif verwalten</button>
              </div>
              {EINSTELLUNGEN.map((g) => (
                <Panel key={g.gruppe} title={g.gruppe}>
                  <div className="list">
                    {g.items.map((s) => <ListRow key={s.id} title={s.title} meta={s.meta} onClick={() => setSettingsId(s.id)} />)}
                  </div>
                </Panel>
              ))}
            </>
          )}

          {tab === "settings" && setting && (
            <>
              <Panel title={setting.title} sub={setting.meta}><p className="prose">{setting.body}</p></Panel>
              <Panel title="Übersicht">
                {setting.rows && <DataRows rows={setting.rows} />}
                {setting.toggles && (
                  <div className="rows">
                    {setting.toggles.map(([k, on]) => (
                      <div className="row" key={k}>
                        <span className="row-k">{k}</span>
                        <span className={"switch static" + (on ? " on" : "")} aria-hidden="true"><span /></span>
                      </div>
                    ))}
                  </div>
                )}
              </Panel>
            </>
          )}
        </main>

        <nav className="bottomnav" aria-label="Hauptnavigation">
          {[
            { id: "dashboard", label: "Dashboard", Icon: Ico.home },
            { id: "support", label: "Support / Suche", Icon: Ico.support },
            { id: "settings", label: "Einstellungen", Icon: Ico.gear },
          ].map(({ id, label, Icon }) => (
            <button key={id} className={"bn-btn" + (tab === id ? " on" : "")} onClick={() => wechsleTab(id)}>
              <Icon /><span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* ================= Dialoge ================= */}
      {anpassen === "dash" && (
        <AnpassenSheet titel="Dashboard anpassen" hinweis="Wählen Sie die Kennzahlen für Ihr Portfolio-Dashboard und bringen Sie sie in die gewünschte Reihenfolge."
          katalog={DASH_KATALOG} auswahl={dashKpis} setAuswahl={setDashKpis} standard={DASH_DEFAULT} onClose={() => setAnpassen(null)} />
      )}
      {anpassen === "fin" && (
        <AnpassenSheet titel="Finanzen anpassen" hinweis="Wählen Sie die Finanzkennzahlen, die als Karten erscheinen sollen."
          katalog={FIN_KATALOG} auswahl={finKpis} setAuswahl={setFinKpis} standard={FIN_DEFAULT} onClose={() => setAnpassen(null)} />
      )}
      {anpassen === "miet" && (
        <AnpassenSheet titel="Mietübersicht anpassen" hinweis="Wählen Sie die Kennzahlen der Objekt-Mietübersicht."
          katalog={MIET_KATALOG} auswahl={mietKpis} setAuswahl={setMietKpis} standard={MIET_DEFAULT} onClose={() => setAnpassen(null)} />
      )}
      {anpassen === "tech" && (
        <AnpassenSheet titel="Technik anpassen" hinweis="Wählen Sie die technischen Angaben, die prominent angezeigt werden."
          katalog={TECH_KATALOG} auswahl={techKpis} setAuswahl={setTechKpis} standard={TECH_DEFAULT} onClose={() => setAnpassen(null)} />
      )}

      {neuesObjekt && (
        <div className="overlay" onClick={() => setNeuesObjekt(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-head">
              <h3>Neues Objekt</h3>
              <button className="iconbtn sm" onClick={() => setNeuesObjekt(false)} aria-label="Schließen"><Ico.close /></button>
            </div>
            <label className="field"><span>Objektname</span><input placeholder="z. B. Beethovenstraße 4" /></label>
            <label className="field"><span>Adresse</span><input placeholder="Straße, PLZ, Ort" /></label>
            <div className="field">
              <span>Objekttyp</span>
              <div className="type-chips">
                {OBJEKTTYPEN.map((t) => (
                  <button key={t} className={"type-chip" + (neuTyp === t ? " on" : "")} onClick={() => setNeuTyp(t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className="form-actions">
              <button className="primary" onClick={() => setNeuesObjekt(false)}>Objekt anlegen</button>
              <button className="ghost" onClick={() => setNeuesObjekt(false)}>Abbrechen</button>
            </div>
          </div>
        </div>
      )}

      {loeschenBestaetigen && objekt && (
        <div className="overlay" onClick={() => setLoeschenBestaetigen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-head">
              <h3>Objekt löschen</h3>
              <button className="iconbtn sm" onClick={() => setLoeschenBestaetigen(false)} aria-label="Schließen"><Ico.close /></button>
            </div>
            <p className="sheet-sub">Möchten Sie „{objekt.name}“ wirklich löschen? Diese Aktion kann im Prototyp nicht rückgängig gemacht werden.</p>
            <div className="form-actions">
              <button className="primary danger" onClick={() => objektLoeschen(objekt.id)}><Ico.trash /> Endgültig löschen</button>
              <button className="ghost" onClick={() => setLoeschenBestaetigen(false)}>Abbrechen</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
