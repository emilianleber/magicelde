import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/landing/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session?.user?.email) return;
      const { data: admin } = await supabase
        .from("portal_admins")
        .select("id")
        .eq("email", session.user.email)
        .maybeSingle();
      if (admin) navigate("/admin");
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (signInError || !data.user?.email) {
      setError("E-Mail oder Passwort falsch.");
      setLoading(false);
      return;
    }

    const { data: admin } = await supabase
      .from("portal_admins")
      .select("id")
      .eq("email", data.user.email)
      .maybeSingle();

    if (!admin) {
      await supabase.auth.signOut();
      setError("Kein Admin-Zugriff für dieses Konto.");
      setLoading(false);
      return;
    }

    navigate("/admin");
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
              <h1 className="headline-sub text-foreground mb-3">Admin-Login</h1>
              <p className="text-detail">Zugang nur für autorisierte Administratoren.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block font-sans text-sm font-medium text-foreground mb-2">E-Mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="deine@email.de"
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-muted/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-foreground mb-2">Passwort</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
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

              {error && (
                <p className="font-sans text-sm text-destructive bg-destructive/10 px-4 py-2.5 rounded-xl">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary justify-center disabled:opacity-50"
              >
                {loading ? "Wird geprüft…" : "Anmelden"}
              </button>
            </form>

            <p className="mt-8 font-sans text-xs text-muted-foreground text-center">
              Kunden-Login:{" "}
              <a href="/kundenportal/login" className="text-accent hover:underline">
                /kundenportal/login
              </a>
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AdminLogin;
