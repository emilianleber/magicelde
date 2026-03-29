import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/landing/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Mail, ArrowRight } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    setSuccess("");
    setLoading(true);

    // Erst prüfen ob E-Mail in portal_admins ist
    const { data: admin } = await supabase
      .from("portal_admins")
      .select("id")
      .eq("email", email.trim().toLowerCase())
      .maybeSingle();

    if (!admin) {
      setError("Diese E-Mail ist nicht als Admin hinterlegt.");
      setLoading(false);
      return;
    }

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: "https://magicel.de/admin",
      },
    });

    if (otpError) {
      setError("Fehler beim Senden des Login-Links.");
      setLoading(false);
      return;
    }

    setSuccess("Login-Link gesendet. Bitte prüfe dein Postfach.");
    setLoading(false);
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
                <label className="block font-sans text-sm font-medium text-foreground mb-2">
                  E-Mail-Adresse
                </label>
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

              {error && (
                <p className="font-sans text-sm text-destructive bg-destructive/10 px-4 py-2.5 rounded-xl">{error}</p>
              )}
              {success && (
                <p className="font-sans text-sm text-green-700 bg-green-100 px-4 py-2.5 rounded-xl">{success}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary justify-center group disabled:opacity-50"
              >
                {loading ? "Wird geprüft…" : "Login-Link senden"}
                {!loading && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
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
