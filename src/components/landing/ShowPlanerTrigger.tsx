import { useEffect, useState } from "react";
import { Sparkles, X, Wand2, MessageCircle } from "lucide-react";
import ShowPlanerModal from "./ShowPlanerModal";
import { hasDraft, isCompleted, loadDraft } from "@/lib/showPlaner";

const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";

/**
 * Unified FAB-Menu unten rechts:
 * - Wand2 = Show planen (öffnet ShowPlanerModal)
 * - MessageCircle = Chat (dispatcht open-chatbot)
 * - WhatsApp = öffnet wa.me Link
 *
 * Resume-Banner + Exit-Intent bleibt.
 */

const SHOWPLANER_HASH = "#planer";
const EXIT_INTENT_SHOWN_KEY = "magicel_exit_intent_session";
const WHATSAPP_URL =
  "https://wa.me/4915563744696?text=" +
  encodeURIComponent(
    "Hallo Emilian! Ich interessiere mich für eine Buchung als Zauberer für mein Event.",
  );

const ShowPlanerTrigger = () => {
  const [open, setOpen] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [draftStep, setDraftStep] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const draft = loadDraft();
    if (draft && !isCompleted() && draft.step > 0) {
      setDraftStep(draft.step);
      const t = window.setTimeout(() => setShowResume(true), 1200);
      const t2 = window.setTimeout(() => setShowResume(false), 16000);
      return () => {
        window.clearTimeout(t);
        window.clearTimeout(t2);
      };
    }
  }, []);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === SHOWPLANER_HASH) {
        setOpen(true);
        setShowResume(false);
        setMenuOpen(false);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(EXIT_INTENT_SHOWN_KEY) === "true") return;
    if (isCompleted()) return;
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isDesktop) return;

    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, 15000);

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
    setMenuOpen(false);
  };

  const openChat = () => {
    document.dispatchEvent(new CustomEvent("open-chatbot"));
    setMenuOpen(false);
  };

  return (
    <>
      {/* Backdrop bei offenem Menü, schließt bei Klick außerhalb */}
      {menuOpen && (
        <button
          type="button"
          aria-label="Menü schließen"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-30 bg-transparent"
        />
      )}

      {/* Mini-Buttons über dem Haupt-FAB — nur gerendert wenn menu open */}
      {menuOpen && (
        <div
          className="fixed bottom-[5.5rem] right-5 md:bottom-[6rem] md:right-7 z-40 flex flex-col items-end gap-2.5 animate-fade-up"
          style={{ animationDuration: "0.2s" }}
        >
          <MiniAction
            label="Show planen"
            icon={<Wand2 className="w-4 h-4" aria-hidden="true" />}
            onClick={openPlaner}
          />
          <MiniAction
            label="Chat starten"
            icon={<MessageCircle className="w-4 h-4" aria-hidden="true" />}
            onClick={openChat}
          />
          <MiniAction
            label="WhatsApp"
            icon={
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982 .998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            }
            onClick={() => {
              window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
              setMenuOpen(false);
            }}
            bg="#25D366"
          />
        </div>
      )}

      {/* Haupt-FAB */}
      <button
        type="button"
        onClick={() => {
          if (menuOpen) setMenuOpen(false);
          else setMenuOpen(true);
        }}
        aria-label={menuOpen ? "Menü schließen" : "Kontakt-Menü öffnen"}
        aria-expanded={menuOpen}
        className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-40 inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full text-white transition-transform hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
          boxShadow: "0 8px 18px -8px rgba(0,0,0,0.25)",
        }}
      >
        {menuOpen ? (
          <X className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
        ) : (
          <Wand2 className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
        )}
      </button>

      {/* Resume-Banner — nur Desktop */}
      {showResume && !open && !menuOpen && (
        <div
          className="hidden md:block fixed bottom-[calc(5rem+1.25rem)] right-7 z-40 w-[min(92vw,320px)] rounded-2xl p-4 text-white animate-fade-up"
          style={{
            background: `linear-gradient(155deg, ${ACCENT_DEEP}, #08060c)`,
            boxShadow: "0 18px 36px -16px rgba(0,0,0,0.35)",
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
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] tracking-[0.18em] uppercase font-bold mb-1 text-white/65">
                Show-Planer · {draftStep}/9
              </p>
              <p className="text-sm leading-snug mb-3">
                Du hast eine Show begonnen — magst weitermachen?
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={openPlaner}
                  className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.16em] uppercase font-bold rounded-full px-3.5 py-2"
                  style={{ background: "#fff", color: "#08060c" }}
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

      {/* Exit-Intent Toast — nur Desktop */}
      {showExitIntent && !open && (
        <div
          className="hidden md:block fixed top-5 left-1/2 -translate-x-1/2 z-40 max-w-md rounded-2xl p-5 bg-white"
          style={{
            boxShadow: "0 18px 36px -16px rgba(0,0,0,0.25)",
            border: "1px solid rgba(0,0,0,0.08)",
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
              <p className="text-base leading-snug mb-3 text-foreground">
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

interface MiniActionProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  bg?: string;
}

const MiniAction = ({ label, icon, onClick, bg }: MiniActionProps) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center gap-2 pl-3 pr-3.5 h-10 rounded-full bg-white text-foreground text-[12px] font-semibold tracking-tight hover:scale-[1.03] transition-transform"
    style={{
      boxShadow: "0 6px 14px -6px rgba(0,0,0,0.18)",
      border: "1px solid rgba(0,0,0,0.06)",
    }}
  >
    <span
      className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white"
      style={{ background: bg ?? ACCENT_DEEP }}
    >
      {icon}
    </span>
    <span>{label}</span>
  </button>
);

export default ShowPlanerTrigger;
