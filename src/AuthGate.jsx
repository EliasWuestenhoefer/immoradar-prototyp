import { useState } from "react";
import App from "./App.jsx";
import { LoginScreen, RequestAccessScreen } from "./components/Auth.jsx";

export default function AuthGate() {
  const [authed, setAuthed] = useState(false);
  const [screen, setScreen] = useState("login"); // login | request

  if (authed) return <App />;

  return screen === "login"
    ? <LoginScreen onLogin={() => setAuthed(true)} onRequestAccess={() => setScreen("request")} />
    : <RequestAccessScreen onBack={() => setScreen("login")} />;
}
