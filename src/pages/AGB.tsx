import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/landing/PageLayout";

const AGB = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>AGB | Emilian Leber Zauberer</title>
      <meta
        name="description"
        content="Allgemeine Geschäftsbedingungen — Emilian Leber Zauberkünstler, MagicEL Entertainment. Gilt für alle Verträge über künstlerische Dienstleistungen."
      />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href="https://www.magicel.de/agb" />
    </Helmet>
    <PageLayout>
      <main className="container px-6 pt-32 md:pt-40 pb-20">
        <article className="max-w-2xl mx-auto">
          <h1 className="font-display font-black text-3xl md:text-4xl text-foreground mb-10">
            Allgemeine Geschäftsbedingungen
          </h1>

          <section className="space-y-6 text-base text-foreground/80 leading-[1.7]">
            <div>
              <h2 className="font-semibold text-foreground mb-2">
                § 1 Geltungsbereich
              </h2>
              <p>
                Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle
                Verträge zwischen Emilian Leber (im Folgenden „Künstler") und
                dem Auftraggeber (im Folgenden „Kunde") über die Erbringung
                von künstlerischen Dienstleistungen (Auftritte, Shows,
                Performances). Mit Erteilung des Auftrags erkennt der Kunde
                diese AGB an.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                § 2 Vertragsschluss
              </h2>
              <p>
                Der Vertrag kommt durch schriftliche Auftragsbestätigung des
                Künstlers per E-Mail oder unterzeichnetem Auftragsformular
                zustande. Mündliche Absprachen oder Angebote stellen kein
                bindendes Angebot dar. Der Vertrag enthält die genauen
                Konditionen (Termin, Ort, Format, Dauer, Honorar, Anfahrt,
                Technik).
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                § 3 Leistungen
              </h2>
              <p>
                Der Künstler erbringt die im Vertrag vereinbarten
                künstlerischen Leistungen (z. B. Close-Up-Magie, Bühnenshow,
                Magic Dinner, Moderation). Programm-Inhalte, Dauer und
                Tonalität werden vorab in einem Briefing-Call abgestimmt.
                Künstlerische Ausgestaltung erfolgt nach professionellem
                Ermessen des Künstlers.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                § 4 Honorar und Zahlung
              </h2>
              <p>
                Das vereinbarte Honorar versteht sich zzgl. der gesetzlichen
                Umsatzsteuer (sofern anwendbar). Anfahrt innerhalb Bayerns
                ist im Honorar enthalten, soweit nicht anders vereinbart;
                Anfahrt und Übernachtung außerhalb werden gesondert
                ausgewiesen. Die Rechnung ist innerhalb von 14 Tagen nach
                Auftritt ohne Abzug fällig.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                § 5 Stornierung
              </h2>
              <p>
                Sollte der Kunde den Auftrag stornieren, fallen folgende
                Stornogebühren an, sofern keine abweichende vertragliche
                Regelung getroffen wurde:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 marker:text-foreground/40">
                <li>Bis 6 Wochen vor Termin: kostenlos</li>
                <li>6–4 Wochen vor Termin: 25 % des Honorars</li>
                <li>4–2 Wochen vor Termin: 50 % des Honorars</li>
                <li>Weniger als 2 Wochen vor Termin: 80 % des Honorars</li>
                <li>Am Tag des Auftritts: 100 % des Honorars</li>
              </ul>
              <p className="mt-3">
                Bei Stornierung durch den Künstler aus von ihm zu
                vertretenden Gründen wird ein bereits gezahltes Honorar
                vollständig zurückerstattet.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                § 6 Höhere Gewalt
              </h2>
              <p>
                Bei Verhinderung des Auftritts durch höhere Gewalt
                (Krankheit, Unfall, behördliche Anordnungen, Naturereignisse
                etc.) entfallen beidseitige Leistungspflichten. Bereits
                gezahlte Anzahlungen werden zurückerstattet, sofern nicht
                ein Ersatztermin vereinbart werden kann. Bei kurzfristiger
                Erkrankung des Künstlers wird nach Möglichkeit ein
                qualifizierter Ersatz organisiert.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                § 7 Technische Voraussetzungen
              </h2>
              <p>
                Der Kunde stellt die im Tech-Rider beschriebenen Voraussetzungen
                (Bühne, Strom, Sound, Licht, Garderobe etc.) bereit. Der
                Tech-Rider wird vor Vertragsschluss übermittelt. Abweichungen
                bedürfen schriftlicher Vereinbarung.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                § 8 Aufzeichnung und Veröffentlichung
              </h2>
              <p>
                Bild- und Tonaufzeichnungen des Auftritts durch den Kunden
                oder Dritte bedürfen der vorherigen schriftlichen Zustimmung
                des Künstlers. Der Künstler darf während des Auftritts
                entstandene Fotos und Videos im Rahmen seiner eigenen
                Marketing-Aktivitäten verwenden, soweit dem keine berechtigten
                Interessen des Kunden entgegenstehen. Auf Wunsch wird Diskretion
                gewahrt.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                § 9 Versicherung
              </h2>
              <p>
                Der Künstler verfügt über eine Berufshaftpflichtversicherung
                für Künstler. Ein Versicherungsnachweis kann auf Anfrage
                vorgelegt werden.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                § 10 Urheberrecht
              </h2>
              <p>
                Alle vom Künstler entwickelten Routinen, Programme,
                Konzeptbeschreibungen, Skripte und sonstige urheberrechtlich
                geschützte Werke verbleiben Eigentum des Künstlers. Eine
                Weitergabe an Dritte oder Nachahmung ist ohne schriftliche
                Zustimmung untersagt.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                § 11 Datenschutz
              </h2>
              <p>
                Der Künstler verarbeitet personenbezogene Daten des Kunden
                ausschließlich im Rahmen der Auftragsabwicklung und gemäß den
                Bestimmungen der Datenschutzerklärung von magicel.de.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                § 12 Schlussbestimmungen
              </h2>
              <p>
                Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise
                unwirksam sein, berührt dies die Wirksamkeit der übrigen
                Bestimmungen nicht. Anstelle der unwirksamen Bestimmung gilt
                eine wirksame Bestimmung, die dem wirtschaftlichen Zweck am
                nächsten kommt. Es gilt das Recht der Bundesrepublik
                Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig,
                Regensburg.
              </p>
            </div>
          </section>

          <p className="text-sm text-foreground/55 mt-12">Stand: Mai 2026</p>
        </article>
      </main>
    </PageLayout>
  </>
);

export default AGB;
