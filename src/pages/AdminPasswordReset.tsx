import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/landing/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";

const AdminPasswordReset = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Supabase setzt die Session automatisch aus dem URL-Hash
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Passwort muss mindestens 8 Zeichen lang sein.");
      return;
    }
    if (password !== passwordRepeat) {
      setError("Passwörter stimmen nicht überein.");
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError("Fehler beim Speichern: " + updateError.message);
      setLoading(false);
      return;
    }

    setDone(true);
    setTimeout(() => navigate("/admin/login"), 3000);
  };

  return (
    <PageLayout>
      <section className="min-h-screen flex items-center justify-center pt-24 pb-16">
        <div className="container px-6">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-accent/10">
                <Lock className="w-8 h-8 text-accent" />
              </div>
              <h1 className="headline-sub text-foreground mb-3">Passwort festlegen</h1>
              <p className="text-detail">Wähle ein sicheres Passwort für deinen Admin-Zugang.</p>
            </div>

            {done ? (
              <div className="p-6 rounded-2xl bg-green-50 border border-green-200 text-center">
                <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <p className="font-sans text-sm font-semibold text-green-800">Passwort gespeichert!</p>
                <p className="font-sans text-xs text-green-700 mt-1">Du wirst zum Login weitergeleitet…</p>
              </div>
            ) : !ready ? (
              <div className="p-6 rounded-2xl bg-muted/30 border border-border/30 text-center">
                <p className="font-sans text-sm text-muted-foreground">
                  Kein gültiger Reset-Link erkannt.<br />
                  Bitte nutze den Link aus der E-Mail von Supabase.
                </p>
                <a href="/admin/login" className="inline-block mt-4 font-sans text-sm text-accent hover:underline">
                  Zum Login
                </a>
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-5">
                <div>
                  <label className="block font-sans text-sm font-medium text-foreground mb-2">Neues Passwort</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mindestens 8 Zeichen"
                      required
                      className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-muted/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-sm font-medium text-foreground mb-2">Passwort wiederholen</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type={showPw ? "text" : "password"}
                      value={passwordRepeat}
                      onChange={(e) => setPasswordRepeat(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-muted/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                    />
                  </div>
                </div>

                {error && (
                  <p className="font-sans text-sm text-destructive bg-destructive/10 px-4 py-2.5 rounded-xl">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary justify-center disabled:opacity-50"
                >
                  {loading ? "Wird gespeichert…" : "Passwort speichern"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AdminPasswordReset;
