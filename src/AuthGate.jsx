import { useEffect, useState } from "react";
import App from "./App.jsx";
import { supabase } from "./utils/supabaseClient.js";
import { LoginScreen, RequestAccessScreen, NewPasswordScreen } from "./components/Auth.jsx";

export default function AuthGate() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState("login"); // login | request | recovery

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (event === "PASSWORD_RECOVERY") setScreen("recovery");
      setSession(newSession);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setScreen("login");
  };

  if (loading) return null;

  if (screen === "recovery") {
    return <NewPasswordScreen onDone={() => setScreen("login")} />;
  }

  if (session) {
    return <App onLogout={logout} userEmail={session.user.email} />;
  }

  return screen === "login"
    ? <LoginScreen onRequestAccess={() => setScreen("request")} />
    : <RequestAccessScreen onBack={() => setScreen("login")} />;
}
