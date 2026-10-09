/*
 * Buchungs-Widget von bookartist (09.10.2026).
 *
 * Die Anfrage geht direkt und strukturiert in bookartist (Auswahl, Termin mit
 * freien Tagen, Angaben) — statt wie bisher als Mail über api/anfrage.ts, die
 * der Posteingangs-Abgleich erst wieder auslesen musste. Möglich, weil die
 * bookartist-Buchungsseite seit 09.10. ohne Kundenkonto annimmt (mit eigenem
 * Spam-Schutz). Inhalt, Programme und Preise pflegt Emilian in bookartist
 * (Einstellungen → Buchungsseite) — hier ändert sich dafür nichts.
 *
 * Im magicel-Design: magicel-Blau, ohne Name/Bild (stehen auf der Seite schon),
 * ohne eigenen Rahmen. Das Fenster wächst mit dem Inhalt — die Buchung meldet
 * ihre Höhe (postMessage), beim Schrittwechsel scrollt die Seite zum Anfang.
 */
import { useEffect, useRef, useState } from "react";

const HERKUNFT = "https://app.bookartist.de";
const ADRESSE = `${HERKUNFT}/buchen/emilian-leber?eingebettet=1&farbe=1D3FFF&kopf=0&rahmen=0`;

export default function BookartistBuchung() {
  const ref = useRef<HTMLIFrameElement>(null);
  const [hoehe, setHoehe] = useState(620);
  // Bis die Buchung ihre erste Höhe meldet, stehen graue Platzhalter da — kein Ladebalken,
  // kein weißes Loch (Gründer 09.10.: „erstmal lang weiß … graue Kästen zum Sehen“)
  const [bereit, setBereit] = useState(false);

  // Falls die Höhenmeldung ausbleibt (Browser blockt Nachrichten, langsames Netz): nach dem Laden
  // des Fensters bzw. spätestens nach 4 s trotzdem zeigen — nie „lädt ewig“ (Gründer 09.10.)
  useEffect(() => {
    const t = window.setTimeout(() => setBereit(true), 4000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const hoeren = (e: MessageEvent) => {
      if (e.origin !== HERKUNFT || e.source !== ref.current?.contentWindow) return;
      const d = e.data as { typ?: string; h?: number } | null;
      if (d?.typ === "bookartist-hoehe" && typeof d.h === "number" && d.h > 200 && d.h < 6000) { setHoehe(d.h); setBereit(true); }
      if (d?.typ === "bookartist-schritt" && ref.current && ref.current.getBoundingClientRect().top < 80) {
        window.scrollTo({ top: ref.current.getBoundingClientRect().top + window.scrollY - 96, behavior: "smooth" });
      }
    };
    window.addEventListener("message", hoeren);
    return () => window.removeEventListener("message", hoeren);
  }, []);

  return (
    <div className="relative -mx-1" style={{ minHeight: bereit ? undefined : 620 }}>
      {!bereit && (
        <div className="absolute inset-0 animate-pulse" aria-hidden>
          <div className="flex gap-3 mb-6">
            {[1, 2, 3].map((n) => <div key={n} className="h-6 w-24 rounded-full bg-foreground/[0.06]" />)}
          </div>
          <div className="h-7 w-48 rounded-md bg-foreground/[0.08] mb-5" />
          <div className="grid gap-3 lg:grid-cols-[1fr_360px] lg:gap-14">
            <div className="grid gap-3 sm:grid-cols-2 content-start">
              {[1, 2, 3].map((n) => <div key={n} className="h-[70px] rounded-2xl bg-foreground/[0.05]" />)}
            </div>
            <div className="hidden lg:block h-[220px] rounded-2xl bg-foreground/[0.05]" />
          </div>
        </div>
      )}
      <iframe
        ref={ref}
        src={ADRESSE}
        title="Anfrage senden"
        onLoad={() => window.setTimeout(() => setBereit(true), 600)}
        allow="clipboard-write"
        className="block w-full border-0 transition-opacity duration-300"
        style={{ height: hoehe, background: "transparent", colorScheme: "light", opacity: bereit ? 1 : 0 }}
      />
    </div>
  );
}
