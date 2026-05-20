import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import PageLayout from "@/components/landing/PageLayout";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

const SUPABASE_URL = "https://rjhvqctjtgfpxzhnrozt.supabase.co";
const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [email, setEmail] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMsg("Kein Token in der URL gefunden. Bitte den Link aus der E-Mail erneut anklicken.");
      return;
    }
    (async () => {
      try {
        const publishableKey = (import.meta as { env: Record<string, string> }).env
          .VITE_SUPABASE_PUBLISHABLE_KEY;
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/newsletter-unsubscribe?token=${encodeURIComponent(token)}`,
          {
            method: "GET",
            headers: {
              apikey: publishableKey,
              Authorization: `Bearer ${publishableKey}`,
            },
          },
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Unbekannter Fehler");
        setEmail(data.email);
        setStatus("success");
      } catch (err) {
        setStatus("error");
        setErrorMsg(err instanceof Error ? err.message : "Abmeldung fehlgeschlagen.");
      }
    })();
  }, [token]);

  return (
    <>
      <Helmet>
        <title>Newsletter abmelden — Emilian Leber</title>
        <meta name="robots" content="noindex,follow" />
      </Helmet>
      <PageLayout>
        <main className="min-h-[60vh] flex items-center justify-center px-6 py-32">
          <div className="max-w-lg w-full bg-white rounded-2xl border border-foreground/10 p-8 md:p-10 shadow-sm">
            {status === "loading" && (
              <p className="text-center text-foreground/70">Abmeldung wird verarbeitet…</p>
            )}
            {status === "success" && (
              <>
                <div className="flex justify-center mb-5">
                  <span
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full"
                    style={{ background: `${ACCENT}14` }}
                  >
                    <CheckCircle2 className="w-6 h-6" style={{ color: ACCENT }} />
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-display font-black text-foreground text-center mb-3">
                  Abgemeldet.
                </h1>
                <p className="text-center text-foreground/70 leading-[1.65] mb-2">
                  {email ?? "Du"} wurde aus dem Newsletter-Verteiler entfernt. Du bekommst
                  keine weiteren Mails von mir.
                </p>
                <p className="text-center text-sm text-foreground/55 mb-7">
                  Falls das ein Versehen war — schreib mir kurz an{" "}
                  <a href="mailto:el@magicel.de" className="underline">el@magicel.de</a>.
                </p>
                <Link
                  to="/"
                  className="block w-full text-center rounded-full px-6 py-3 text-[12px] tracking-[0.08em] font-semibold uppercase text-white"
                  style={{ background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})` }}
                >
                  Zurück zur Startseite
                  <ArrowRight className="inline w-4 h-4 ml-2 align-middle" />
                </Link>
              </>
            )}
            {status === "error" && (
              <>
                <div className="flex justify-center mb-5">
                  <span
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full"
                    style={{ background: "#fee2e2" }}
                  >
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-display font-black text-foreground text-center mb-3">
                  Abmeldung fehlgeschlagen.
                </h1>
                <p className="text-center text-foreground/70 leading-[1.65] mb-7">
                  {errorMsg ?? "Der Token ist ungültig oder die Adresse wurde bereits abgemeldet."}
                </p>
                <Link
                  to="/kontakt"
                  className="block w-full text-center rounded-full px-6 py-3 text-[12px] tracking-[0.08em] font-semibold uppercase text-white"
                  style={{ background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})` }}
                >
                  Direkt kontaktieren
                </Link>
              </>
            )}
          </div>
        </main>
      </PageLayout>
    </>
  );
};

export default Unsubscribe;
