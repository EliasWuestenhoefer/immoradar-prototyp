import { useState } from "react";
import { Ico, SECTION_ICON } from "./Icons.jsx";
import { SEKTIONEN, BETEILIGTE_ROLLEN, KONTAKT_TYPEN } from "../data/kataloge.js";
import { eur } from "../utils/format.js";

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
    <nav className="tabsA" style={{ "--i": i, "--n": SEKTIONEN.length }} aria-label="Objektbereiche">
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
  const [dragIdx, setDragIdx] = useState(null);
  const [overIdx, setOverIdx] = useState(null);
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
  const dropAuf = (idx) => {
    if (dragIdx === null || dragIdx === idx) return;
    const next = [...auswahl];
    const [verschoben] = next.splice(dragIdx, 1);
    next.splice(idx, 0, verschoben);
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
          <div className="anp-label">Angezeigt · {gewaehlt.length} Karten · zum Sortieren ziehen</div>
          <div className="anp-list">
            {gewaehlt.map((k, idx) => (
              <div
                className={"anp-item on" + (dragIdx === idx ? " dragging" : "") + (overIdx === idx && dragIdx !== idx ? " drag-over" : "")}
                key={k.id}
                draggable
                onDragStart={() => setDragIdx(idx)}
                onDragOver={(e) => { e.preventDefault(); setOverIdx(idx); }}
                onDragLeave={() => setOverIdx((o) => (o === idx ? null : o))}
                onDrop={(e) => { e.preventDefault(); dropAuf(idx); setDragIdx(null); setOverIdx(null); }}
                onDragEnd={() => { setDragIdx(null); setOverIdx(null); }}
              >
                <span className="anp-grip" aria-hidden="true"><Ico.grip /></span>
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

/* Vermögensentwicklung – Marktwert abzüglich Restschuld über mehrere Jahre */
export function VermoegenChart({ data }) {
  const werte = data.map((d) => d.wert);
  const max = Math.max(...werte);
  const min = Math.min(...werte);
  const spanTop = max + (max - min || max) * 0.2;
  const spanBottom = Math.max(0, min - (max - min || max) * 0.2);

  const W = 760, H = 200, PAD_L = 74, PAD_R = 26, PAD_T = 16, PAD_B = 28;
  const plotW = W - PAD_L - PAD_R;
  const plotH = H - PAD_T - PAD_B;
  const x = (i) => PAD_L + (data.length === 1 ? plotW / 2 : (i / (data.length - 1)) * plotW);
  const y = (v) => PAD_T + (1 - (v - spanBottom) / (spanTop - spanBottom || 1)) * plotH;

  const linePoints = data.map((d, i) => `${x(i)},${y(d.wert)}`).join(" ");
  const areaPoints = `${x(0)},${y(spanBottom)} ${linePoints} ${x(data.length - 1)},${y(spanBottom)}`;
  const gridVals = [spanTop, spanBottom + (spanTop - spanBottom) / 2, spanBottom];

  return (
    <svg className="vermoegen-chart" viewBox={`0 0 ${W} ${H}`} width="100%" height="220" preserveAspectRatio="none">
      <defs>
        <linearGradient id="vermoegenFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E2E45" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1E2E45" stopOpacity="0" />
        </linearGradient>
      </defs>
      {gridVals.map((v, i) => (
        <g key={i}>
          <line x1={PAD_L} y1={y(v)} x2={W - PAD_R} y2={y(v)} stroke="#E3E2DC" strokeWidth="1" />
          <text x={PAD_L - 10} y={y(v) + 4} textAnchor="end" fontSize="11" fill="#6C7178">{eur(Math.round(v))}</text>
        </g>
      ))}
      <polygon points={areaPoints} fill="url(#vermoegenFill)" />
      <polyline points={linePoints} fill="none" stroke="#1E2E45" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {data.map((d, i) => (
        <circle key={d.label} cx={x(i)} cy={y(d.wert)} r={i === data.length - 1 ? 5 : 3.5} fill={i === data.length - 1 ? "#B79561" : "#1E2E45"} />
      ))}
      {data.map((d, i) => (
        <text key={d.label} x={x(i)} y={H - 6} textAnchor="middle" fontSize="12" fill="#6C7178">{d.label}</text>
      ))}
    </svg>
  );
}

/* Beteiligte je Objekt */
export function BeteiligtePanel({ liste, mieter, onAdd, onRemove }) {
  const [sheetOffen, setSheetOffen] = useState(false);

  return (
    <Panel
      title="Beteiligte"
      sub="Wer ist bei diesem Objekt wofür zuständig – Hausverwaltung, Makler, Notar, Handwerker."
      action={<button className="primary" onClick={() => setSheetOffen(true)}><Ico.plus /> Beteiligten hinzufügen</button>}
    >
      {liste.length === 0 ? (
        <div className="beteiligte-empty">
          <Ico.people />
          <h4>Noch keine Beteiligten</h4>
          <p>Verknüpfen Sie Hausverwaltung, Makler, Notar oder andere Kontakte mit diesem Objekt.</p>
        </div>
      ) : (
        <div className="list">
          {liste.map((b) => (
            <div className="beteiligter-row" key={b.id}>
              <div className="beteiligter-main">
                <span className="beteiligter-name">
                  {b.name}
                  {b.hauptansprechpartner && <span className="premium" style={{ marginLeft: 8 }}>Hauptansprechpartner</span>}
                </span>
                <span className="beteiligter-meta">
                  {b.rolle} · {b.kontaktTyp}
                  {(b.gueltigAb || b.gueltigBis) ? ` · gültig ${b.gueltigAb || "…"} – ${b.gueltigBis || "…"}` : ""}
                  {b.hinweis ? ` · ${b.hinweis}` : ""}
                </span>
              </div>
              <button className="iconbtn sm" onClick={() => onRemove(b.id)} aria-label="Beteiligten entfernen"><Ico.trash /></button>
            </div>
          ))}
        </div>
      )}

      {sheetOffen && (
        <BeteiligtenSheet mieter={mieter} onClose={() => setSheetOffen(false)} onSave={(b) => { onAdd(b); setSheetOffen(false); }} />
      )}
    </Panel>
  );
}

function BeteiligtenSheet({ mieter, onClose, onSave }) {
  const [kontaktTyp, setKontaktTyp] = useState(KONTAKT_TYPEN[0]);
  const [mieterId, setMieterId] = useState("");
  const [name, setName] = useState("");
  const [rolle, setRolle] = useState(BETEILIGTE_ROLLEN[0]);
  const [hinweis, setHinweis] = useState("");
  const [gueltigAb, setGueltigAb] = useState("");
  const [gueltigBis, setGueltigBis] = useState("");
  const [hauptansprechpartner, setHauptansprechpartner] = useState(false);

  const istMieterTyp = kontaktTyp === "Mieter";
  const nameGueltig = istMieterTyp ? !!mieterId : name.trim().length > 0;

  const wechsleKontaktTyp = (t) => { setKontaktTyp(t); setMieterId(""); setName(""); };

  const speichern = () => {
    if (!nameGueltig) return;
    const finalName = istMieterTyp ? (mieter.find((m) => m.id === mieterId)?.name || "") : name.trim();
    onSave({
      id: Date.now().toString(36),
      kontaktTyp,
      name: finalName,
      rolle,
      hinweis: hinweis.trim(),
      gueltigAb,
      gueltigBis,
      hauptansprechpartner,
    });
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-head">
          <h3>Beteiligten hinzufügen</h3>
          <button className="iconbtn sm" onClick={onClose} aria-label="Schließen"><Ico.close /></button>
        </div>

        <label className="field">
          <span>Kontaktart *</span>
          <select value={kontaktTyp} onChange={(e) => wechsleKontaktTyp(e.target.value)}>
            {KONTAKT_TYPEN.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>

        {istMieterTyp ? (
          <label className="field">
            <span>Mieter *</span>
            <select value={mieterId} onChange={(e) => setMieterId(e.target.value)}>
              <option value="">Bitte wählen</option>
              {mieter.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </label>
        ) : (
          <label className="field">
            <span>Name *</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name oder Firma" />
          </label>
        )}

        <label className="field">
          <span>Rolle *</span>
          <select value={rolle} onChange={(e) => setRolle(e.target.value)}>
            {BETEILIGTE_ROLLEN.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </label>

        <label className="field">
          <span>Hinweis zur Rolle (optional)</span>
          <input value={hinweis} onChange={(e) => setHinweis(e.target.value)} placeholder="z. B. Versammlungsleitung ETV 2026" />
        </label>

        <div className="two-col">
          <label className="field">
            <span>Gültig ab</span>
            <input type="date" value={gueltigAb} onChange={(e) => setGueltigAb(e.target.value)} />
          </label>
          <label className="field">
            <span>Gültig bis</span>
            <input type="date" value={gueltigBis} onChange={(e) => setGueltigBis(e.target.value)} />
          </label>
        </div>

        <div className="hauptansprech-row">
          <div>
            <div className="hauptansprech-title">Hauptansprechpartner</div>
            <div className="hauptansprech-note">Nur einer je Rolle und Objekt</div>
          </div>
          <button
            className={"switch" + (hauptansprechpartner ? " on" : "")}
            onClick={() => setHauptansprechpartner(!hauptansprechpartner)}
            aria-label="Hauptansprechpartner umschalten"
          ><span /></button>
        </div>

        <div className="form-actions">
          <button className="primary" onClick={speichern} disabled={!nameGueltig}>Speichern</button>
          <button className="ghost" onClick={onClose}>Abbrechen</button>
        </div>
      </div>
    </div>
  );
}
