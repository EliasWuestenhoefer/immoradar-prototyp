import { Ico, SECTION_ICON } from "./Icons.jsx";
import { SEKTIONEN } from "../data/kataloge.js";

export function KpiCard({ label, value, note, onClick, badge, control }) {
  const inner = (
    <>
      <div className="kpi-top">
        <span className="kpi-label">{label}</span>
        {badge && <span className="kpi-badge">{badge}</span>}
        {control}
      </div>
      <div className="kpi-value">{value}</div>
      {note && <div className="kpi-note">{note}</div>}
      {onClick && <Ico.chevron className="kpi-chev" />}
    </>
  );
  return onClick ? (
    <button className="kpi klick" onClick={onClick}>{inner}</button>
  ) : (
    <div className="kpi">{inner}</div>
  );
}

export function DataRows({ rows }) {
  return (
    <div className="rows">
      {rows.map(([k, v]) => (
        <div className="row" key={k}>
          <span className="row-k">{k}</span>
          <span className="row-v">{v}</span>
        </div>
      ))}
    </div>
  );
}

export function Panel({ title, sub, children, action }) {
  return (
    <section className="panel">
      {(title || action) && (
        <header className="panel-head">
          <div><h3>{title}</h3>{sub && <p>{sub}</p>}</div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

export function ListRow({ title, meta, right, badge, tone, onClick, ampel, icon }) {
  return (
    <button className="listrow" onClick={onClick}>
      {ampel && <span className={"ampel " + ampel} aria-hidden="true" />}
      {icon && <span className="listrow-icon">{icon}</span>}
      <span className="listrow-main">
        <span className="listrow-title">{title}</span>
        {meta && <span className="listrow-meta">{meta}</span>}
      </span>
      {badge && <span className={"badge " + (tone || "ok")}>{badge}</span>}
      {right && <span className="listrow-right">{right}</span>}
      <Ico.chevron className="listrow-chev" />
    </button>
  );
}

export function Segmented({ items, value, onChange, small }) {
  const i = Math.max(0, items.findIndex((x) => x.id === value));
  return (
    <div className={"seg" + (small ? " tiny" : "")} style={{ "--i": i, "--n": items.length }}>
      <span className="seg-ind" />
      {items.map((it) => (
        <button key={it.id} className={"seg-btn" + (it.id === value ? " on" : "")} onClick={() => onChange(it.id)}>{it.label}</button>
      ))}
    </div>
  );
}

/* Variante A – Segmented Center Tabs (verbindlich) */
export function ObjektTabs({ value, onChange }) {
  const i = SEKTIONEN.findIndex((s) => s.id === value);
  return (
    <nav className="tabsA" style={{ "--i": i }} aria-label="Objektbereiche">
      <span className="tabsA-ind" />
      {SEKTIONEN.map((s) => {
        const Icon = SECTION_ICON[s.id];
        return (
          <button key={s.id} className={"tabsA-btn" + (s.id === value ? " on" : "")} onClick={() => onChange(s.id)} aria-current={s.id === value}>
            <Icon className="tabsA-ico" />
            <span>{s.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export function AnpassenButton({ label = "Ansicht anpassen", onClick }) {
  return (
    <button className="ghost sm anpassen" onClick={onClick}>
      <Ico.sliders /> {label}
    </button>
  );
}

/* Auswahl- und Sortier-Dialog für KPI-Karten */
export function AnpassenSheet({ titel, hinweis, katalog, auswahl, setAuswahl, standard, onClose }) {
  const gewaehlt = auswahl.map((id) => katalog.find((k) => k.id === id)).filter(Boolean);
  const rest = katalog.filter((k) => !auswahl.includes(k.id));
  const toggle = (id) => setAuswahl(auswahl.includes(id) ? auswahl.filter((x) => x !== id) : [...auswahl, id]);
  const move = (idx, dir) => {
    const next = [...auswahl];
    const ziel = idx + dir;
    if (ziel < 0 || ziel >= next.length) return;
    [next[idx], next[ziel]] = [next[ziel], next[idx]];
    setAuswahl(next);
  };
  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet wide" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-head">
          <div>
            <h3>{titel}</h3>
            <p className="sheet-sub">{hinweis}</p>
          </div>
          <button className="iconbtn sm" onClick={onClose} aria-label="Schließen"><Ico.close /></button>
        </div>

        <div className="anp-block">
          <div className="anp-label">Angezeigt · {gewaehlt.length} Karten</div>
          <div className="anp-list">
            {gewaehlt.map((k, idx) => (
              <div className="anp-item on" key={k.id}>
                <span className="anp-order">{idx + 1}</span>
                <span className="anp-name">{k.label}</span>
                <span className="anp-moves">
                  <button className="movebtn" onClick={() => move(idx, -1)} disabled={idx === 0} aria-label="Nach oben"><Ico.up /></button>
                  <button className="movebtn" onClick={() => move(idx, 1)} disabled={idx === gewaehlt.length - 1} aria-label="Nach unten"><Ico.down /></button>
                </span>
                <button className={"switch on"} onClick={() => toggle(k.id)} aria-label="Ausblenden"><span /></button>
              </div>
            ))}
            {gewaehlt.length === 0 && <div className="empty sm">Keine Karten ausgewählt. Aktivieren Sie unten mindestens eine Kennzahl.</div>}
          </div>
        </div>

        {rest.length > 0 && (
          <div className="anp-block">
            <div className="anp-label">Verfügbar</div>
            <div className="anp-list">
              {rest.map((k) => (
                <div className="anp-item" key={k.id}>
                  <span className="anp-name">{k.label}</span>
                  <button className="switch" onClick={() => toggle(k.id)} aria-label="Einblenden"><span /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="form-actions">
          <button className="primary" onClick={onClose}>Übernehmen</button>
          <button className="ghost" onClick={() => setAuswahl(standard)}>Auf Standard zurücksetzen</button>
        </div>
      </div>
    </div>
  );
}

/* Ist-Miete gegenüber Marktmiete */
export function MietVergleich({ v }) {
  const max = Math.max(v.ist, v.markt) * 1.12;
  return (
    <div className="verg">
      <div className="verg-row">
        <span className="verg-key">Ist-Miete</span>
        <div className="verg-track"><div className="verg-bar ist" style={{ width: (v.ist / max) * 100 + "%" }} /></div>
        <span className="verg-val">{v.ist.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €/m²</span>
      </div>
      <div className="verg-row">
        <span className="verg-key">Marktmiete</span>
        <div className="verg-track"><div className="verg-bar markt" style={{ width: (v.markt / max) * 100 + "%" }} /></div>
        <span className="verg-val">{v.markt.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €/m²</span>
      </div>
      <div className="verg-foot">
        <span className="verg-delta">Potenzial {v.delta}</span>
        <span className="verg-note">Vergleichswert aus 14 Angeboten im Umkreis von 2 km</span>
      </div>
    </div>
  );
}

/* Simulierte Dokumentenansicht */
export function DokumentAnsicht({ name, kontext }) {
  const zeilen = [96, 88, 92, 70, 84, 90, 62, 88, 78, 94, 66, 82];
  return (
    <div className="docview">
      <div className="docview-bar">
        <span className="docview-name"><Ico.doc /> {name}</span>
        <span className="docview-meta">Seite 1 von 3 · 248 kB</span>
      </div>
      <div className="docpage">
        <div className="docpage-head">
          <div className="docpage-title">{name.replace(/_/g, " ").replace(/\.(pdf|xlsx)$/, "")}</div>
          <div className="docpage-sub">{kontext}</div>
        </div>
        <div className="docpage-lines">
          {zeilen.map((w, i) => <span key={i} style={{ width: w + "%" }} />)}
        </div>
        <div className="docpage-foot">Simulierte Dokumentenansicht · im Prototyp ohne echte Datei</div>
      </div>
    </div>
  );
}

/* Energieausweis mit Skala */
export function EnergieAusweis({ a }) {
  const klassen = ["A+", "A", "B", "C", "D", "E", "F", "G", "H"];
  return (
    <>
      <div className="ea">
        <div className="ea-head">
          <div>
            <div className="ea-value">{a.wert} <span>kWh/(m²·a)</span></div>
            <div className="ea-sub">Endenergiebedarf</div>
          </div>
          <div className="ea-klasse">{a.klasse}</div>
        </div>
        <div className="ea-scale">
          {klassen.map((k, i) => (
            <div key={k} className={"ea-step" + (k === a.klasse ? " on" : "")} style={{ "--w": 40 + i * 7 }}>
              <span>{k}</span>
            </div>
          ))}
        </div>
      </div>
      <DokumentAnsicht name="Energieausweis.pdf" kontext="Hinterlegtes Dokument, simulierte Ansicht" />
    </>
  );
}
