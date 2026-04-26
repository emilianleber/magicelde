import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, X, Sparkles, Check } from "lucide-react";

/**
 * Engagement popup — triggers on ANY of:
 *   1. Exit intent (cursor leaves top of viewport)
 *   2. 2.5 minutes on site
 *   3. 3 or more pages viewed (tracked via sessionStorage)
 *
 * Stock-photo background (crowd / celebration) + dark overlay for legibility.
 * 2-step form, submits to the same CRM endpoint as /buchung.
 */

const SESSION_KEY_SHOWN = "magicel:popup:shown";
const SESSION_KEY_PAGES = "magicel:popup:pagecount";
const TIME_TO_TRIGGER_MS = 120_000; // 2 minutes
const PAGES_TO_TRIGGER = 3;
// Debug logs visible in browser console (helps verify which trigger fired)
const DEBUG =
  typeof window !== "undefined" &&
  (window.location.search.includes("popupdebug=1") ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

const SUPPRESS_PATHS = [
  "/buchung",
  "/danke",
  "/kundenportal",
  "/admin",
  "/kontakt",
];

const ANLAESSE = [
  "Hochzeit",
  "Firmenfeier",
  "Geburtstag",
  "Gala",
  "Private Feier",
  "Sonstiges",
];

// Stock photo: celebration / crowd with confetti & lights — fits "magic, event, unforgettable moment"
const BG_IMAGE =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80";

const EngagementPopup = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [anlass, setAnlass] = useState("");
  const [datum, setDatum] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const triggered = useRef(false);

  const isSuppressed = SUPPRESS_PATHS.some((p) =>
    location.pathname.startsWith(p)
  );

  const alreadyShown =
    typeof window !== "undefined" &&
    sessionStorage.getItem(SESSION_KEY_SHOWN) === "1";

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Debug helpers — only mounted in DEBUG mode
    if (DEBUG) {
      // Reset via URL: ?popupreset=1
      if (window.location.search.includes("popupreset=1")) {
        sessionStorage.removeItem(SESSION_KEY_SHOWN);
        sessionStorage.removeItem(SESSION_KEY_PAGES);
        triggered.current = false;
        console.log("[Popup] reset via ?popupreset=1");
      }
      // Manual trigger via window.__popup()
      (window as any).__popup = () => {
        sessionStorage.removeItem(SESSION_KEY_SHOWN);
        triggered.current = false;
        trigger();
      };
    }

    const count =
      parseInt(sessionStorage.getItem(SESSION_KEY_PAGES) || "0", 10) + 1;
    sessionStorage.setItem(SESSION_KEY_PAGES, String(count));

    const isShown = sessionStorage.getItem(SESSION_KEY_SHOWN) === "1";
    if (DEBUG)
      console.log(
        "[Popup] pageview",
        location.pathname,
        "count=",
        count,
        "shown=",
        isShown,
        "suppressed=",
        isSuppressed
      );

    if (
      !triggered.current &&
      !isShown &&
      !isSuppressed &&
      count >= PAGES_TO_TRIGGER
    ) {
      if (DEBUG) console.log("[Popup] page-count trigger");
      trigger();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (isSuppressed) {
      if (DEBUG) console.log("[Popup] suppressed on", location.pathname);
      return;
    }
    // Re-read each time — sessionStorage state shouldn't be captured stale
    const checkAlreadyShown = () =>
      typeof window !== "undefined" &&
      sessionStorage.getItem(SESSION_KEY_SHOWN) === "1";

    if (checkAlreadyShown()) {
      if (DEBUG) console.log("[Popup] already shown this session");
      return;
    }

    if (DEBUG)
      console.log("[Popup] arming triggers · timer=", TIME_TO_TRIGGER_MS / 1000, "s");

    // 2 min inactivity timer
    const timer = setTimeout(() => {
      if (DEBUG) console.log("[Popup] timer fired");
      if (!triggered.current && !checkAlreadyShown()) trigger();
    }, TIME_TO_TRIGGER_MS);

    // 1) Robust exit-intent: mouse leaves through TOP of viewport
    //    Bind on <html> so we catch the actual viewport exit (not iframe/widget)
    const handleHtmlMouseLeave = (e: MouseEvent) => {
      if (triggered.current) return;
      // Browsers fire mouseleave on <html> when cursor exits the window.
      // clientY <= 0 means exit through top edge (toolbar / tab close target).
      if (e.clientY <= 0) {
        if (DEBUG) console.log("[Popup] html mouseleave top exit", e.clientY);
        trigger();
      }
    };

    // 2) Mouseout-fallback: relatedTarget = null means cursor left the page entirely
    const handleDocMouseOut = (e: MouseEvent) => {
      if (triggered.current) return;
      const to = (e as any).relatedTarget;
      if (!to && (e.clientY < 30 || e.clientY > window.innerHeight - 10)) {
        if (DEBUG)
          console.log("[Popup] mouseout no-related-target", e.clientY);
        trigger();
      }
    };

    // 3) Top-zone dwell: mouse stays in top 10px for >100ms (toolbar hover)
    let topZoneEnter: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (triggered.current) return;
      if (e.clientY <= 10) {
        if (topZoneEnter === null) topZoneEnter = Date.now();
        if (Date.now() - topZoneEnter > 100) {
          if (DEBUG) console.log("[Popup] top-zone dwell trigger");
          trigger();
        }
      } else {
        topZoneEnter = null;
      }
    };

    // 3) Visibility-change (tab switch / mobile background)
    let visibilityArmed = false;
    const armVisibility = setTimeout(() => {
      visibilityArmed = true;
    }, 5000);
    const handleVisibility = () => {
      if (triggered.current || !visibilityArmed) return;
      if (document.visibilityState === "hidden") {
        if (DEBUG) console.log("[Popup] visibility hidden");
        trigger();
      }
    };

    // 4) Window blur — losing focus to other window
    let blurArmed = false;
    const armBlur = setTimeout(() => {
      blurArmed = true;
    }, 5000);
    const handleBlur = () => {
      if (triggered.current || !blurArmed) return;
      if (DEBUG) console.log("[Popup] window blur");
      trigger();
    };

    // 5) beforeunload as fallback (some browsers cancel the popup but it covers some)
    const handleBeforeUnload = () => {
      // We can't actually show the popup here, but mark intent so on next page-show it shows
      if (DEBUG) console.log("[Popup] beforeunload");
    };

    const html = document.documentElement;
    html.addEventListener("mouseleave", handleHtmlMouseLeave);
    document.addEventListener("mouseout", handleDocMouseOut);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearTimeout(timer);
      clearTimeout(armVisibility);
      clearTimeout(armBlur);
      html.removeEventListener("mouseleave", handleHtmlMouseLeave);
      document.removeEventListener("mouseout", handleDocMouseOut);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuppressed]);

  const trigger = () => {
    if (triggered.current) return;
    triggered.current = true;
    setOpen(true);
    sessionStorage.setItem(SESSION_KEY_SHOWN, "1");
  };

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open]);

  const submit = async () => {
    if (!name.trim() || !email.trim()) {
      setError("Bitte Name und E-Mail ausfüllen.");
      return;
    }
    setSending(true);
    setError("");

    const payload = {
      anrede: null,
      vorname: name.trim().split(" ")[0] || name.trim(),
      nachname: name.trim().split(" ").slice(1).join(" ") || "",
      name: name.trim(),
      firma: null,
      email: email.trim(),
      phone: "",
      anlass: anlass || "",
      datum: datum || "",
      ort: "",
      gaeste: null,
      format: "",
      nachricht: `[Popup-Schnellanfrage] Anlass: ${anlass || "—"} · Datum: ${
        datum || "—"
      }`,
    };

    try {
      const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const res = await fetch(
        "https://rjhvqctjtgfpxzhnrozt.supabase.co/functions/v1/create-portal-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: publishableKey,
            Authorization: `Bearer ${publishableKey}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || `HTTP ${res.status}`);
      }
      setSuccess(true);
      setTimeout(() => {
        setOpen(false);
        navigate("/danke");
      }, 1800);
    } catch (e: any) {
      console.error("Popup submit error:", e);
      setError("Da ist etwas schiefgelaufen. Bitte nochmal versuchen.");
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;

  const canAdvance = anlass.length > 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0f0a19]/70 backdrop-blur-sm"
        style={{ animation: "fadeIn 0.25s ease forwards" }}
        onClick={close}
      />

      {/* Dialog */}
      <div
        className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)]"
        style={{ animation: "popupIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
      >
        {/* Background image + overlay */}
        <div className="absolute inset-0">
          <img
            src={BG_IMAGE}
            alt=""
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(15,10,25,0.88) 0%, rgba(30,15,45,0.85) 50%, rgba(50,20,55,0.82) 100%)",
            }}
          />
          {/* Subtle gradient accent blob for magic feel */}
          <div
            aria-hidden
            className="absolute top-[-80px] right-[-80px] w-[280px] h-[280px] rounded-full opacity-45"
            style={{
              background:
                "radial-gradient(circle, hsl(340 85% 60% / 0.8) 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />
          <div
            aria-hidden
            className="absolute bottom-[-60px] left-[-60px] w-[240px] h-[240px] rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle, hsl(225 85% 60% / 0.75) 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />
        </div>

        {/* Gradient top accent line */}
        <div
          aria-hidden
          className="relative h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, hsl(225 85% 60%), hsl(275 75% 60%), hsl(345 85% 60%))",
          }}
        />

        {/* Close */}
        <button
          onClick={close}
          aria-label="Schließen"
          className="absolute top-5 right-5 z-20 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white backdrop-blur-sm transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative px-7 md:px-9 pt-9 pb-8 text-white">
          {success ? (
            <div className="text-center py-8">
              <div
                className="mx-auto mb-5 inline-flex items-center justify-center w-16 h-16 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(225 85% 55%), hsl(275 75% 55%), hsl(345 85% 55%))",
                  boxShadow: "0 10px 40px hsl(275 75% 55% / 0.4)",
                }}
              >
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-black mb-3">
                Danke!
              </h3>
              <p className="text-white/75 text-[15px]">
                Ich melde mich innerhalb von 24 Stunden persönlich bei dir.
              </p>
            </div>
          ) : (
            <>
              {/* Eyebrow */}
              <div className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-white/70 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Magie erleben</span>
              </div>

              <h3
                id="popup-title"
                className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[1.75rem] md:text-[2.1rem]"
              >
                Bevor du gehst —{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(100deg, hsl(225 95% 75%) 0%, hsl(285 85% 75%) 50%, hsl(340 95% 75%) 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  30 Sekunden
                </span>{" "}
                für deine Anfrage?
              </h3>

              <p className="mt-3 text-[14px] md:text-[15px] leading-[1.55] text-white/70">
                Erzähl mir kurz von deinem Event. Ich melde mich innerhalb 24h
                mit einem Vorschlag — kostenlos und unverbindlich.
              </p>

              {/* Step indicator */}
              <div className="flex items-center gap-2 mt-6">
                <div className="flex items-center gap-1.5">
                  <div
                    className={`rounded-full transition-all ${
                      step === 1 ? "w-8 h-1.5" : "w-1.5 h-1.5"
                    }`}
                    style={{
                      background:
                        step >= 1
                          ? "linear-gradient(90deg, hsl(225 90% 70%), hsl(285 85% 70%))"
                          : "rgba(255,255,255,0.15)",
                    }}
                  />
                  <div
                    className={`rounded-full transition-all ${
                      step === 2 ? "w-8 h-1.5" : "w-1.5 h-1.5"
                    }`}
                    style={{
                      background:
                        step === 2
                          ? "linear-gradient(90deg, hsl(285 85% 70%), hsl(345 95% 72%))"
                          : "rgba(255,255,255,0.15)",
                    }}
                  />
                </div>
                <span className="text-[11px] text-white/50 ml-2">
                  Schritt {step} von 2
                </span>
              </div>

              {step === 1 && (
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/55 mb-2">
                      Was ist dein Event?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {ANLAESSE.map((a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => setAnlass(a)}
                          className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            anlass === a
                              ? "bg-white text-[#0f0a19] shadow-lg"
                              : "bg-white/10 text-white/90 hover:bg-white/15 backdrop-blur-sm border border-white/10"
                          }`}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/55 mb-2">
                      Datum (optional)
                    </label>
                    <input
                      type="date"
                      value={datum}
                      onChange={(e) => setDatum(e.target.value)}
                      className="w-full rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30 [color-scheme:dark]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!canAdvance}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[15px] font-semibold text-white transition-all hover:scale-[1.01] disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(225 85% 55%) 0%, hsl(275 75% 55%) 50%, hsl(345 85% 55%) 100%)",
                      boxShadow:
                        "0 10px 30px hsl(275 75% 55% / 0.4), 0 0 40px hsl(345 85% 55% / 0.15)",
                    }}
                  >
                    Weiter
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/55 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dein Name"
                      required
                      className="w-full rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/55 mb-2">
                      E-Mail
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@email.de"
                      required
                      className="w-full rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-300">{error}</p>
                  )}

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      disabled={sending}
                      className="inline-flex items-center gap-1.5 text-sm text-white/65 hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Zurück
                    </button>
                    <button
                      type="button"
                      onClick={submit}
                      disabled={sending || !name || !email}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[15px] font-semibold text-white transition-all hover:scale-[1.01] disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(225 85% 55%) 0%, hsl(275 75% 55%) 50%, hsl(345 85% 55%) 100%)",
                        boxShadow:
                          "0 10px 30px hsl(275 75% 55% / 0.4), 0 0 40px hsl(345 85% 55% / 0.15)",
                      }}
                    >
                      {sending ? "Sende..." : "Anfrage senden"}
                      {!sending && <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>

                  <p className="text-[11px] text-white/45 text-center">
                    Kostenlos · Unverbindlich · Antwort innerhalb 24h
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popupIn {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default EngagementPopup;
