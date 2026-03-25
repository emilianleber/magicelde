import { useState } from "react";
import PageLayout from "@/components/landing/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Mail, ArrowRight } from "lucide-react";

const KundenportalLogin = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin + "/kundenportal",
        },
      });

      if (error) throw error;

      setSuccess(
        "Dein Zugangslink wurde per E-Mail verschickt. Bitte prüfe dein Postfach."
      );
      setEmail("");
    } catch (err: any) {
      setError(err.message || "Ein Fehler ist aufgetreten.");
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
              <h1 className="headline-sub text-foreground mb-3">
                Kundenportal
              </h1>
              <p className="text-detail">
                Geben Sie Ihre E-Mail-Adresse ein. Sie erhalten einen sicheren
                Login-Link für Ihr Kundenportal.
              </p>
            </div>

            <form onSubmit={handleMagicLink} className="space-y-5">
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
                    placeholder="ihre@email.de"
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-muted/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/30 transition-all"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-destructive bg-destructive/10 px-4 py-2.5 rounded-xl">
                  {error}
                </p>
              )}

              {success && (
                <p className="text-sm text-green-700 bg-green-100 px-4 py-2.5 rounded-xl">
                  {success}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary justify-center group disabled:opacity-50"
              >
                {loading ? "Wird gesendet…" : "Login-Link senden"}
                {!loading && (
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </form>

            <div className="mt-8 p-5 rounded-2xl bg-muted/30 border border-border/30">
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Hinweis:</strong> Über den
                Zugangslink gelangen Sie direkt in Ihr Kundenportal, um Anfragen,
                Events und Dokumente zentral einzusehen.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default KundenportalLogin;
