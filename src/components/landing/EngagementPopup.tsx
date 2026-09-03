import { useEffect, useRef, useState } from "react";
import { ANFRAGE_ENDPUNKT } from "@/lib/bookartist";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, X, Sparkles, Check } from "lucide-react";

/**
 * Engagement popup — triggers on ANY of:
 *   1. Exit intent (cursor leaves top of viewport)
 *   2. 2.5 minutes on site
 *   3. 3 or more pages viewed (tracked via sessionStorage)
 *
 * Voltage design — clean light card, cobalt accents, no photo background.
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

// Voltage palette
const COBALT = "#1D3FFF";
const INK = "#0A0B0F";

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
      const res = await fetch(ANFRAGE_ENDPUNKT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
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
        className="absolute inset-0 backdrop-blur-sm"
        style={{
          background: "rgba(10,11,15,0.55)",
          animation: "fadeIn 0.25s ease forwards",
        }}
        onClick={close}
      />

      {/* Dialog */}
      <div
        className="relative w-full max-w-lg rounded-3xl overflow-hidden bg-white"
        style={{
          border: "1px solid rgba(10,11,15,0.10)",
          boxShadow: "0 40px 100px -20px rgba(10,11,15,0.30)",
          animation: "popupIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        {/* Subtle cool background wash */}
        <div className="absolute inset-0">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #FFFFFF 0%, #F4F6F9 100%)",
            }}
          />
        </div>

        {/* Cobalt top accent line */}
        <div
          aria-hidden
          className="relative h-1 w-full"
          style={{ background: COBALT }}
        />

        {/* Close */}
        <button
          onClick={close}
          aria-label="Schließen"
          className="absolute top-5 right-5 z-20 inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#EEF1F6] hover:bg-[#E2E7EF] text-[#0A0B0F]/60 hover:text-[#0A0B0F] transition-colors"
          style={{ border: "1px solid rgba(10,11,15,0.10)" }}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative px-7 md:px-9 pt-9 pb-8 text-[#0A0B0F]">
          {success ? (
            <div className="text-center py-8">
              <div
                className="mx-auto mb-5 inline-flex items-center justify-center w-16 h-16 rounded-full"
                style={{
                  background: COBALT,
                  boxShadow: "0 10px 40px rgba(29,63,255,0.30)",
                }}
              >
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-black mb-3 text-[#0A0B0F]">
                Danke!
              </h3>
              <p className="text-[#0A0B0F]/60 text-[15px]">
                Ich melde mich innerhalb von 24 Stunden persönlich bei dir.
              </p>
            </div>
          ) : (
            <>
              {/* Eyebrow */}
              <div
                className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase mb-3"
                style={{ color: COBALT }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Magie erleben</span>
              </div>

              <h3
                id="popup-title"
                className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[1.75rem] md:text-[2.1rem] text-[#0A0B0F]"
              >
                Bevor du gehst —{" "}
                <span style={{ color: COBALT }}>30 Sekunden</span> für deine
                Anfrage?
              </h3>

              <p className="mt-3 text-[14px] md:text-[15px] leading-[1.55] text-[#0A0B0F]/60">
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
                      background: step >= 1 ? COBALT : "rgba(10,11,15,0.12)",
                    }}
                  />
                  <div
                    className={`rounded-full transition-all ${
                      step === 2 ? "w-8 h-1.5" : "w-1.5 h-1.5"
                    }`}
                    style={{
                      background: step === 2 ? COBALT : "rgba(10,11,15,0.12)",
                    }}
                  />
                </div>
                <span className="text-[11px] text-[#0A0B0F]/45 ml-2">
                  Schritt {step} von 2
                </span>
              </div>

              {step === 1 && (
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#0A0B0F]/50 mb-2">
                      Was ist dein Event?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {ANLAESSE.map((a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => setAnlass(a)}
                          className="text-left px-4 py-3 rounded-xl text-sm font-medium transition-all"
                          style={
                            anlass === a
                              ? {
                                  background: "rgba(29,63,255,0.08)",
                                  color: COBALT,
                                  border: `1px solid ${COBALT}`,
                                }
                              : {
                                  background: "#FFFFFF",
                                  color: INK,
                                  border: "1px solid rgba(10,11,15,0.10)",
                                }
                          }
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#0A0B0F]/50 mb-2">
                      Datum (optional)
                    </label>
                    <input
                      type="date"
                      value={datum}
                      onChange={(e) => setDatum(e.target.value)}
                      className="w-full rounded-xl bg-white border border-[rgba(10,11,15,0.10)] px-4 py-3 text-sm text-[#0A0B0F] focus:outline-none focus:ring-2 focus:ring-[#1D3FFF]/30 focus:border-[#1D3FFF]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!canAdvance}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[15px] font-semibold text-white transition-all hover:scale-[1.01] disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background: COBALT,
                      boxShadow: "0 10px 30px rgba(29,63,255,0.25)",
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
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#0A0B0F]/50 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dein Name"
                      required
                      className="w-full rounded-xl bg-white border border-[rgba(10,11,15,0.10)] px-4 py-3 text-sm text-[#0A0B0F] placeholder:text-[#0A0B0F]/35 focus:outline-none focus:ring-2 focus:ring-[#1D3FFF]/30 focus:border-[#1D3FFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#0A0B0F]/50 mb-2">
                      E-Mail
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@email.de"
                      required
                      className="w-full rounded-xl bg-white border border-[rgba(10,11,15,0.10)] px-4 py-3 text-sm text-[#0A0B0F] placeholder:text-[#0A0B0F]/35 focus:outline-none focus:ring-2 focus:ring-[#1D3FFF]/30 focus:border-[#1D3FFF]"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-600">{error}</p>
                  )}

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      disabled={sending}
                      className="inline-flex items-center gap-1.5 text-sm text-[#0A0B0F]/55 hover:text-[#0A0B0F] transition-colors"
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
                        background: COBALT,
                        boxShadow: "0 10px 30px rgba(29,63,255,0.25)",
                      }}
                    >
                      {sending ? "Sende..." : "Anfrage senden"}
                      {!sending && <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>

                  <p className="text-[11px] text-[#0A0B0F]/45 text-center">
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
