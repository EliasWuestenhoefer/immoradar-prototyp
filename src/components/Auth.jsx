import { useState } from "react";

export const DEMO_ACCOUNT = { email: "alex@immoradar.app", password: "demo1234" };

function RadarMark() {
  return (
    <div className="auth-logo">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#F6F5F2" strokeWidth="1.3" opacity="0.35" />
        <circle cx="12" cy="12" r="5.5" stroke="#F6F5F2" strokeWidth="1.3" opacity="0.65" />
        <circle cx="12" cy="12" r="2" fill="#F6F5F2" />
      </svg>
    </div>
  );
}

const AuthIco = {
  mail: (p) => (<svg width="17" height="17" viewBox="0 0 24 24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></svg>),
  lock: (p) => (<svg width="17" height="17" viewBox="0 0 24 24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="5" y="11" width="14" height="9" rx="2.5" /><path d="M8 11V7.5a4 4 0 0 1 8 0V11" /></svg>),
  eye: (p) => (<svg width="17" height="17" viewBox="0 0 24 24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3" /></svg>),
  eyeOff: (p) => (<svg width="17" height="17" viewBox="0 0 24 24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3.5 3.5l17 17" /><path d="M10.6 5.7A10.6 10.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a13.6 13.6 0 0 1-3 3.6M6.6 6.6C4 8.3 2.5 12 2.5 12S6 18.5 12 18.5a9.6 9.6 0 0 0 3.9-.8" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></svg>),
  user: (p) => (<svg width="17" height="17" viewBox="0 0 24 24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="3.3" /><path d="M5 19.5c1-3.6 3.6-5.5 7-5.5s6 1.9 7 5.5" /></svg>),
  building: (p) => (<svg width="17" height="17" viewBox="0 0 24 24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 10.5 12 4l8 6.5" /><path d="M6 9.6V19h12V9.6" /><path d="M10 19v-4.5h4V19" /></svg>),
  arrowRight: (p) => (<svg width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>),
  alert: (p) => (<svg width="15" height="15" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9" /><path d="M12 8v5" /><circle cx="12" cy="15.8" r="0.9" fill="currentColor" stroke="none" /></svg>),
  check: (p) => (<svg width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m5 12.5 4.5 4.5L19 7" /></svg>),
};

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92a8.78 8.78 0 0 0 2.68-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.85.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.19.29-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.05z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#15181D">
      <path d="M16.7 12.7c0-2.7 2.2-4 2.3-4.1-1.3-1.9-3.3-2.1-4-2.2-1.7-.2-3.3 1-4.2 1-.9 0-2.2-1-3.7-1-1.9 0-3.7 1.1-4.6 2.8-2 3.4-.5 8.5 1.4 11.3.9 1.4 2 2.9 3.5 2.9 1.4-.1 1.9-.9 3.6-.9s2.1.9 3.6.9c1.5 0 2.5-1.4 3.4-2.8 1.1-1.6 1.5-3.1 1.5-3.2-.1 0-2.8-1.1-2.8-4.4z" />
      <path d="M13.8 4.9c.8-.9 1.3-2.2 1.1-3.5-1.1 0-2.4.7-3.2 1.6-.7.8-1.3 2.1-1.1 3.4 1.3.1 2.5-.6 3.2-1.5z" />
    </svg>
  );
}

function BrandPanel({ tag, title, body }) {
  return (
    <div className="auth-right">
      <div className="auth-tag">{tag}</div>

      <svg className="auth-skyline" width="100%" height="300" viewBox="0 0 600 360" preserveAspectRatio="xMidYMax slice">
        <g stroke="#FFFFFF" strokeWidth="1" opacity="0.06">
          {[60, 120, 180, 240, 300, 360, 420, 480, 540].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="360" />)}
        </g>
        <rect x="40" y="180" width="80" height="180" fill="#2C4363" opacity="0.85" />
        <rect x="140" y="110" width="100" height="250" fill="#12203380" opacity="0.9" />
        <g fill="#F6F5F2" opacity="0.5">
          {[126, 158, 190, 222].map((y) => [154, 180, 206].map((x) => <rect key={x + "-" + y} x={x} y={y} width="14" height="18" />))}
        </g>
        <rect x="260" y="220" width="70" height="140" fill="#2C4363" opacity="0.75" />
        <rect x="350" y="140" width="90" height="220" fill="#0F1B2ACC" opacity="0.95" />
        <g fill="#F6F5F2" opacity="0.45">
          {[156, 188, 220].map((y) => [364, 392].map((x) => <rect key={x + "-" + y} x={x} y={y} width="14" height="18" />))}
        </g>
        <rect x="460" y="200" width="60" height="160" fill="#2C4363" opacity="0.85" />
        <circle cx="395" cy="128" r="4" fill="#B79561" />
      </svg>

      {tag === "Portfolio-Cockpit für Kapitalanleger" && (
        <div className="auth-kpi-float">
          <p className="l">Portfolio-Wert</p>
          <p className="v">4.826.000 €</p>
          <span className="d">+3,4% ggü. Vorjahr</span>
        </div>
      )}

      <div className="auth-tagline">
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
    </div>
  );
}

export function LoginScreen({ onLogin, onRequestAccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState(null); // null | "no-account" | "wrong-password"

  const submit = (e) => {
    e.preventDefault();
    const mail = email.trim().toLowerCase();
    if (mail !== DEMO_ACCOUNT.email) {
      setError("no-account");
    } else if (password !== DEMO_ACCOUNT.password) {
      setError("wrong-password");
    } else {
      setError(null);
      onLogin();
    }
  };

  return (
    <div className="ir-root">
      <div className="auth-shell">
        <div className="auth-left">
          <div className="auth-brand">
            <RadarMark />
            <span className="auth-brand-name">Immoradar</span>
          </div>

          <div className="auth-center">
            <form className="auth-box" onSubmit={submit} noValidate>
              <p className="auth-eyebrow">Willkommen zurück</p>
              <h1 className="auth-title">Anmelden</h1>
              <p className="auth-sub">Melden Sie sich an, um Ihr Immobilien-Portfolio zu verwalten.</p>

              <div className={"auth-field" + (error === "no-account" ? " tight" : "")}>
                <label className="auth-label">E-Mail-Adresse</label>
                <div className="auth-input-wrap">
                  <AuthIco.mail className={"auth-ic" + (error === "no-account" ? " err" : "")} />
                  <input
                    className={"auth-input" + (error === "no-account" ? " err" : "")}
                    type="email"
                    placeholder="name@firma.de"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(null); }}
                  />
                </div>
              </div>

              {error === "no-account" && (
                <div className="auth-error">
                  <AuthIco.alert />
                  <p>Kein Konto mit dieser E-Mail-Adresse gefunden. <button type="button" onClick={onRequestAccess}>Zugang anfragen</button></p>
                </div>
              )}

              <div className={"auth-field" + (error === "wrong-password" ? " tight" : "")}>
                <label className="auth-label">Passwort</label>
                <div className="auth-input-wrap">
                  <AuthIco.lock className={"auth-ic" + (error === "wrong-password" ? " err" : "")} />
                  <input
                    className={"auth-input pw" + (error === "wrong-password" ? " err" : "")}
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(null); }}
                  />
                  {showPw
                    ? <AuthIco.eyeOff className="auth-ic right" onClick={() => setShowPw(false)} />
                    : <AuthIco.eye className="auth-ic right" onClick={() => setShowPw(true)} />}
                </div>
              </div>

              {error === "wrong-password" && (
                <div className="auth-error">
                  <AuthIco.alert />
                  <p>Falsches Passwort. Bitte erneut versuchen.</p>
                </div>
              )}

              <div className="auth-row-end">
                <button type="button" className="auth-link">Passwort vergessen?</button>
              </div>

              <button className="auth-primary" type="submit">
                Anmelden
                <AuthIco.arrowRight />
              </button>

              <div className="auth-divider">
                <div className="auth-divider-line" />
                <span>oder</span>
                <div className="auth-divider-line" />
              </div>

              <div className="auth-sso-row">
                <button type="button" className="auth-ghost" onClick={onLogin}><GoogleIcon />Google</button>
                <button type="button" className="auth-ghost" onClick={onLogin}><AppleIcon />Apple</button>
              </div>

              <p className="auth-foot">
                Neu hier? <button type="button" className="auth-goldlink" onClick={onRequestAccess}>Zugang anfragen</button>
              </p>

              <p className="auth-demo-hint">Demo-Zugang: {DEMO_ACCOUNT.email} · {DEMO_ACCOUNT.password}</p>
            </form>
          </div>
        </div>

        <BrandPanel
          tag="Portfolio-Cockpit für Kapitalanleger"
          title={<>Ihr Immobilien-Portfolio.<br />Ein Blick genügt.</>}
          body="Finanzen, Mieter und Technik für alle Ihre Objekte – gebündelt an einem Ort."
        />
      </div>
    </div>
  );
}

export function RequestAccessScreen({ onBack }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", portfolio: "", message: "" });

  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="ir-root">
      <div className="auth-shell">
        <div className="auth-left">
          <div className="auth-brand">
            <RadarMark />
            <span className="auth-brand-name">Immoradar</span>
          </div>

          <div className="auth-center">
            {sent ? (
              <div className="auth-box auth-success">
                <div className="auth-success-icon"><AuthIco.check /></div>
                <h1 className="auth-title" style={{ marginBottom: 4 }}>Anfrage gesendet</h1>
                <p className="auth-sub" style={{ marginBottom: 8 }}>Danke, {form.name.split(" ")[0] || "willkommen"}! Wir prüfen Ihre Anfrage und melden uns innerhalb von 2 Werktagen per E-Mail.</p>
                <button className="auth-link" onClick={onBack}>Zurück zur Anmeldung</button>
              </div>
            ) : (
              <form className="auth-box" onSubmit={submit} noValidate>
                <p className="auth-eyebrow">Neu bei Immoradar</p>
                <h1 className="auth-title">Zugang anfragen</h1>
                <p className="auth-sub">Immoradar ist aktuell auf Einladung. Erzählen Sie uns kurz von Ihrem Portfolio – wir melden uns innerhalb von 2 Werktagen.</p>

                <div className="auth-field">
                  <label className="auth-label">Name</label>
                  <div className="auth-input-wrap">
                    <AuthIco.user className="auth-ic" />
                    <input className="auth-input" type="text" placeholder="Vor- und Nachname" value={form.name} onChange={upd("name")} required />
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-label">E-Mail-Adresse</label>
                  <div className="auth-input-wrap">
                    <AuthIco.mail className="auth-ic" />
                    <input className="auth-input" type="email" placeholder="name@firma.de" value={form.email} onChange={upd("email")} required />
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-label">Anzahl Objekte im Portfolio</label>
                  <div className="auth-input-wrap">
                    <AuthIco.building className="auth-ic" />
                    <input className="auth-input" type="text" placeholder="z. B. 3–5 Objekte" value={form.portfolio} onChange={upd("portfolio")} />
                  </div>
                </div>

                <div className="auth-field" style={{ marginBottom: 24 }}>
                  <label className="auth-label">Nachricht (optional)</label>
                  <textarea className="auth-textarea" placeholder="Kurz zu Ihrem Portfolio oder Ihren Erwartungen …" value={form.message} onChange={upd("message")} />
                </div>

                <button className="auth-primary" type="submit">
                  Anfrage senden
                  <AuthIco.arrowRight />
                </button>

                <p className="auth-foot">
                  Bereits ein Konto? <button type="button" className="auth-link" onClick={onBack}>Anmelden</button>
                </p>
              </form>
            )}
          </div>
        </div>

        <BrandPanel
          tag="Zugang auf Einladung"
          title="Exklusiver Zugang für ausgewählte Kapitalanleger."
          body="Wir prüfen jede Anfrage persönlich, um die Qualität für alle Nutzer:innen hoch zu halten."
        />
      </div>
    </div>
  );
}
