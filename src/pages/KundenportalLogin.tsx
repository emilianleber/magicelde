import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/landing/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Mail, ArrowRight, Shield, Eye, EyeOff } from "lucide-react";

const KundenportalLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/kundenportal" },
        });
        if (error) throw error;
      }
      navigate("/kundenportal");
    } catch (err: any) {
      setError(err.message === "Invalid login credentials"
        ? "E-Mail oder Passwort ist falsch."
        : err.message || "Ein Fehler ist aufgetreten.");
    } finally {
      setLoading(false);
    }
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
              <h1 className="headline-sub text-foreground mb-3">Kundenportal</h1>
              <p className="text-detail">
                {mode === "login"
                  ? "Melden Sie sich mit Ihrer E-Mail und Ihrem Passwort an."
                  : "Erstellen Sie Ihr Konto für das Kundenportal."}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block font-sans text-sm font-medium text-foreground mb-2">E-Mail-Adresse</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ihre@email.de"
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-muted/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-foreground mb-2">Passwort</label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-muted/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/30 transition-all"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-destructive bg-destructive/10 px-4 py-2.5 rounded-xl">{error}</p>
              )}

              <button type="submit" disabled={loading} className="w-full btn-primary justify-center group disabled:opacity-50">
                {loading ? "Wird geladen…" : mode === "login" ? "Anmelden" : "Registrieren"}
                {!loading && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
                className="font-sans text-sm text-accent hover:text-accent/80 transition-colors"
              >
                {mode === "login" ? "Noch kein Konto? Jetzt registrieren" : "Bereits ein Konto? Anmelden"}
              </button>
            </div>

            <div className="mt-8 p-5 rounded-2xl bg-muted/30 border border-border/30">
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Zugang benötigt?</strong> Ihr Kundenportal-Zugang wird nach der Buchung eingerichtet. Bei Fragen kontaktieren Sie mich gerne direkt.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default KundenportalLogin;
