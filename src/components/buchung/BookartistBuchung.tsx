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

  useEffect(() => {
    const hoeren = (e: MessageEvent) => {
      if (e.origin !== HERKUNFT || e.source !== ref.current?.contentWindow) return;
      const d = e.data as { typ?: string; h?: number } | null;
      if (d?.typ === "bookartist-hoehe" && typeof d.h === "number" && d.h > 200 && d.h < 6000) setHoehe(d.h);
      if (d?.typ === "bookartist-schritt" && ref.current && ref.current.getBoundingClientRect().top < 80) {
        window.scrollTo({ top: ref.current.getBoundingClientRect().top + window.scrollY - 96, behavior: "smooth" });
      }
    };
    window.addEventListener("message", hoeren);
    return () => window.removeEventListener("message", hoeren);
  }, []);

  return (
    <iframe
      ref={ref}
      src={ADRESSE}
      title="Anfrage senden"
      allow="clipboard-write"
      className="block w-full border-0 -mx-1"
      style={{ height: hoehe, background: "transparent", colorScheme: "light" }}
    />
  );
}
