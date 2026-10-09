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
 * Feste Höhe statt Mitwachsen: Die Seite im Fenster hat am Handy eine Leiste
 * unten (Weiter/Anfragen), die muss im sichtbaren Bereich bleiben.
 */
const ADRESSE = "https://app.bookartist.de/buchen/emilian-leber?eingebettet=1";

export default function BookartistBuchung() {
  return (
    <div className="rounded-2xl overflow-hidden border border-foreground/10 bg-white shadow-sm">
      <iframe
        src={ADRESSE}
        title="Anfrage senden"
        loading="lazy"
        allow="clipboard-write"
        className="block w-full border-0 h-[min(880px,calc(100dvh-96px))] min-h-[620px]"
      />
    </div>
  );
}
