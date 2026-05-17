import { useEffect, useState } from "react";
import { Mail, X, ArrowRight } from "lucide-react";
import {
  dismissReminder,
  getCapturedEmail,
  shouldShowReminder,
} from "@/lib/emailCapture";

const SERIF_ITALIC =
  "font-['Instrument_Serif',ui-serif,Georgia,serif] italic font-normal";
const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";

/**
 * Email-Reminder-Banner
 *
 * Wird beim Page-Load gezeigt, wenn eine Email-Adresse mehr als 24h
 * zurück eingegeben aber nicht abgesendet wurde. Erlaubt Resume-CTA
 * zum Show-Planer (#planer) oder Buchung (/buchung mit prefill).
 *
 * In echtem Production-Setup würde nach 1 Tag eine Mail per Edge-
 * Function gesendet (Resend/Mailgun). Aktuell nur Frontend-Banner.
 */
const EmailReminderBanner = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<ReturnType<typeof getCapturedEmail>>(null);

  useEffect(() => {
    if (shouldShowReminder()) {
      const captured = getCapturedEmail();
      setData(captured);
      const t = window.setTimeout(() => setVisible(true), 2200);
      return () => window.clearTimeout(t);
    }
  }, []);

  if (!visible || !data) return null;

  const planerLink = data.context === "showplaner" ? "/#planer" : "/buchung";
  const resumeLabel =
    data.context === "showplaner"
      ? "Show-Planer weiter"
      : "Anfrage abschicken";

  return (
    <div
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 w-[min(94vw,480px)] rounded-2xl p-5 bg-white"
      style={{
        boxShadow:
          "0 30px 60px -15px rgba(40,20,40,0.35), 0 12px 25px -10px rgba(40,20,40,0.2)",
        border: "1px solid rgba(154,38,64,0.18)",
        animation: "remBannerIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
      }}
    >
      <style>{`
        @keyframes remBannerIn { from { opacity: 0; transform: translate(-50%, 20px); } to { opacity: 1; transform: translate(-50%, 0); } }
      `}</style>
      <div className="flex items-start gap-3">
        <span
          className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
          }}
        >
          <Mail className="w-4 h-4 text-white" />
        </span>
        <div className="flex-1 min-w-0">
          <p
            className="text-[10px] tracking-[0.18em] uppercase font-bold mb-1"
            style={{ color: ACCENT }}
          >
            Du hast da was vergessen.
          </p>
          <p className={`${SERIF_ITALIC} text-base text-foreground leading-snug mb-3`}>
            Deine Anfrage war fast fertig — magst sie jetzt abschicken?
          </p>
          <div className="flex items-center gap-3">
            <a
              href={planerLink}
              className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.16em] uppercase font-bold text-white rounded-full px-3.5 py-2"
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
              }}
            >
              {resumeLabel}
              <ArrowRight className="w-3 h-3" />
            </a>
            <button
              type="button"
              onClick={() => {
                dismissReminder();
                setVisible(false);
              }}
              className="text-[10px] tracking-[0.16em] uppercase font-bold text-foreground/45 hover:text-foreground/70 transition-colors"
            >
              Nicht mehr zeigen
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Schließen"
          className="shrink-0 w-7 h-7 rounded-full bg-foreground/[0.05] hover:bg-foreground/[0.1] inline-flex items-center justify-center transition-colors"
        >
          <X className="w-3.5 h-3.5 text-foreground/55" />
        </button>
      </div>
    </div>
  );
};

export default EmailReminderBanner;
