import { useEffect, useState } from "react";
import { Sparkles, X, Wand2 } from "lucide-react";
import ShowPlanerModal from "./ShowPlanerModal";
import { hasDraft, isCompleted, loadDraft } from "@/lib/showPlaner";

const SERIF_ITALIC =
  "font-['Instrument_Serif',ui-serif,Georgia,serif] italic font-normal";
const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";

/**
 * Show-Planer-Trigger
 *
 * Rendert:
 * - Floating Action Button unten rechts auf jeder Page (außer Admin)
 * - Resume-Banner unten links wenn Draft vorhanden
 * - Exit-Intent-Toast oben mitte wenn Maus aus Viewport → "Show fertig planen?"
 *   (nur auf Desktop, max 1× pro Session)
 *
 * Triggert ShowPlanerModal-Open auf Klick.
 */

const SHOWPLANER_HASH = "#planer";
const EXIT_INTENT_SHOWN_KEY = "magicel_exit_intent_session";

const ShowPlanerTrigger = () => {
  const [open, setOpen] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [draftStep, setDraftStep] = useState(0);

  // Resume-Banner: zeigen wenn Draft existiert und nicht completed
  useEffect(() => {
    const draft = loadDraft();
    if (draft && !isCompleted() && draft.step > 0) {
      setDraftStep(draft.step);
      // verzögert zeigen, damit Page erst rendert
      const t = window.setTimeout(() => setShowResume(true), 1200);
      return () => window.clearTimeout(t);
    }
  }, []);

  // Hash-Trigger: wenn URL Hash #planer hat, Modal öffnen
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === SHOWPLANER_HASH) {
        setOpen(true);
        setShowResume(false);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  // Exit-Intent: Maus verlässt Viewport oben → Toast einblenden
  useEffect(() => {
    if (sessionStorage.getItem(EXIT_INTENT_SHOWN_KEY) === "true") return;
    if (isCompleted()) return;
    // Nur auf Pointer-Geräten (Desktop) — mobile macht "mouseleave" wenig Sinn
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isDesktop) return;

    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, 15000); // erst nach 15s armen — kein Sofort-Pop

    const handler = (e: MouseEvent) => {
      if (!armed) return;
      if (e.clientY <= 5 && !open) {
        setShowExitIntent(true);
        sessionStorage.setItem(EXIT_INTENT_SHOWN_KEY, "true");
        document.removeEventListener("mouseleave", handler);
      }
    };
    document.addEventListener("mouseleave", handler);
    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseleave", handler);
    };
  }, [open]);

  const openPlaner = () => {
    setOpen(true);
    setShowResume(false);
    setShowExitIntent(false);
  };

  return (
    <>
      {/* Floating Action Button — unten rechts */}
      <button
        type="button"
        onClick={openPlaner}
        aria-label="Show-Planer öffnen"
        className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-40 group inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full text-white text-[12px] tracking-[0.08em] font-semibold uppercase shadow-2xl transition-transform hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
          boxShadow:
            "0 20px 50px -10px rgba(154,38,64,0.55), 0 8px 20px -6px rgba(154,38,64,0.4)",
        }}
      >
        <Wand2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
        Show planen
      </button>

      {/* Resume-Banner — unten links */}
      {showResume && !open && (
        <div
          className="fixed bottom-5 left-5 md:bottom-7 md:left-7 z-40 max-w-sm rounded-2xl p-5 text-white animate-fade-up"
          style={{
            background: `linear-gradient(155deg, ${ACCENT_DEEP}, #08060c)`,
            boxShadow: "0 30px 60px -20px rgba(40,20,40,0.55)",
            animation: "fadeUpResume 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        >
          <style>{`
            @keyframes fadeUpResume { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          `}</style>
          <div className="flex items-start gap-3">
            <span
              className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full"
              style={{
                background: "rgba(243,217,168,0.15)",
                border: "1px solid rgba(243,217,168,0.3)",
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: "#f3d9a8" }} />
            </span>
            <div className="flex-1 min-w-0">
              <p
                className="text-[10px] tracking-[0.18em] uppercase font-bold mb-1"
                style={{ color: "#f3d9a8" }}
              >
                Show-Planer · {draftStep}/9
              </p>
              <p className={`${SERIF_ITALIC} text-base leading-snug mb-3`}>
                Du hast eine Show begonnen — magst weitermachen?
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={openPlaner}
                  className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.16em] uppercase font-bold text-white"
                  style={{
                    background: "rgba(243,217,168,0.95)",
                    color: "#08060c",
                    borderRadius: "999px",
                    padding: "8px 14px",
                  }}
                >
                  Weitermachen
                </button>
                <button
                  type="button"
                  onClick={() => setShowResume(false)}
                  className="text-[10px] tracking-[0.16em] uppercase font-bold text-white/55 hover:text-white/85 transition-colors"
                >
                  Später
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowResume(false)}
              aria-label="Banner schließen"
              className="shrink-0 w-7 h-7 rounded-full bg-white/[0.08] hover:bg-white/[0.18] inline-flex items-center justify-center transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Exit-Intent Toast — oben mitte */}
      {showExitIntent && !open && (
        <div
          className="fixed top-5 left-1/2 -translate-x-1/2 z-40 max-w-md rounded-2xl p-5 bg-white"
          style={{
            boxShadow:
              "0 30px 60px -15px rgba(40,20,40,0.35), 0 12px 25px -10px rgba(40,20,40,0.2)",
            border: "1px solid rgba(154,38,64,0.15)",
            animation: "fadeUpResume 0.45s cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        >
          <div className="flex items-start gap-3">
            <span
              className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
              }}
            >
              <Wand2 className="w-4 h-4 text-white" />
            </span>
            <div className="flex-1 min-w-0">
              <p
                className="text-[10px] tracking-[0.18em] uppercase font-bold mb-1"
                style={{ color: ACCENT }}
              >
                Vorher noch eines.
              </p>
              <p
                className={`${SERIF_ITALIC} text-base leading-snug mb-3 text-foreground`}
              >
                Lust deine Show in 90 Sekunden zu planen?
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={openPlaner}
                  className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.16em] uppercase font-bold text-white rounded-full px-3.5 py-2"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                  }}
                >
                  Show-Planer starten
                </button>
                <button
                  type="button"
                  onClick={() => setShowExitIntent(false)}
                  className="text-[10px] tracking-[0.16em] uppercase font-bold text-foreground/45 hover:text-foreground/70 transition-colors"
                >
                  Nein danke
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowExitIntent(false)}
              aria-label="Toast schließen"
              className="shrink-0 w-7 h-7 rounded-full bg-foreground/[0.05] hover:bg-foreground/[0.1] inline-flex items-center justify-center transition-colors"
            >
              <X className="w-3.5 h-3.5 text-foreground/55" />
            </button>
          </div>
        </div>
      )}

      <ShowPlanerModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default ShowPlanerTrigger;
