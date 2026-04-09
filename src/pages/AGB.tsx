import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/landing/PageLayout";

const AGB = () => (
  <>
    <Helmet>
      <title>AGB – Emilian Leber</title>
      <meta name="description" content="Allgemeine Geschäftsbedingungen von Zauberer Emilian Leber. Informationen zu Buchung, Stornierung und Leistungsumfang." />
      <link rel="canonical" href="https://www.magicel.de/agb" />
      <meta property="og:title" content="AGB – Emilian Leber" />
      <meta property="og:description" content="Allgemeine Geschäftsbedingungen von Zauberer Emilian Leber. Informationen zu Buchung, Stornierung und Leistungsumfang." />
      <meta property="og:url" content="https://www.magicel.de/agb" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="AGB – Emilian Leber" />
      <meta name="twitter:description" content="Allgemeine Geschäftsbedingungen von Zauberer Emilian Leber. Informationen zu Buchung, Stornierung und Leistungsumfang." />
    </Helmet>
    <PageLayout>
    <section className="min-h-screen">
      <div className="container px-6 pt-32 pb-24 md:pt-40">
        <div className="max-w-3xl mx-auto">
          <span className="badge-accent mb-8 inline-flex">Rechtliches</span>
          <h1 className="headline-section text-foreground mb-12">Allgemeine Geschäftsbedingungen.</h1>

          <div className="prose prose-lg max-w-none space-y-8 text-detail">
            <h2 className="headline-sub text-foreground">§ 1 Geltungsbereich</h2>
            <p>Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen Emilian Leber (im Folgenden „Künstler") und dem Auftraggeber (im Folgenden „Kunde") über die Erbringung von künstlerischen Dienstleistungen (Auftritte, Shows, Performances). Mit Erteilung des Auftrags erkennt der Kunde diese AGB an.</p>

            <h2 className="headline-sub text-foreground !mt-12">§ 2 Vertragsschluss</h2>
            <p>Ein Vertrag kommt zustande durch die schriftliche Bestätigung (auch per E-Mail) einer Buchung durch den Künstler nach vorheriger Anfrage des Kunden. Die Anfrage des Kunden stellt ein unverbindliches Angebot dar. Erst die Buchungsbestätigung des Künstlers begründet einen verbindlichen Vertrag. Der Auftrag gilt als bestätigt, sobald eine schriftliche Bestätigungsmail durch den Künstler gesendet wurde.</p>

            <h2 className="headline-sub text-foreground !mt-12">§ 3 Leistungsumfang</h2>
            <p>Der genaue Leistungsumfang (Art der Show, Dauer, Format) wird individuell vereinbart und in der Buchungsbestätigung festgehalten. Änderungen des vereinbarten Leistungsumfangs bedürfen der schriftlichen Zustimmung beider Parteien.</p>

            <h2 className="headline-sub text-foreground !mt-12">§ 4 Vergütung und Zahlungsbedingungen</h2>
            <p>Die Vergütung wird individuell vereinbart und in der Buchungsbestätigung festgehalten. Zur Sicherung des Termins wird eine Anzahlung fällig. Die Restzahlung ist spätestens am Tag der Veranstaltung zu leisten, sofern nicht anders vereinbart. Alle Preise verstehen sich als Bruttopreise inklusive gesetzlicher Mehrwertsteuer.</p>

            <h2 className="headline-sub text-foreground !mt-12">§ 5 Stornierung und Rücktritt</h2>
            <p>Eine Stornierung durch den Kunden ist jederzeit schriftlich möglich. Bei Stornierung fallen folgende Kosten an:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Bis 30 Tage vor der Veranstaltung: 55 % der vereinbarten Gage</li>
              <li>Bis 20 Tage vor der Veranstaltung: 75 % der vereinbarten Gage</li>
              <li>Bis 14 Tage vor der Veranstaltung: 100 % der vereinbarten Gage</li>
            </ul>
            <p>Der Auftrag gilt als bestätigt, sobald eine schriftliche Bestätigungsmail durch den Künstler gesendet wurde. Maßgeblich für die Berechnung der Stornierungskosten ist das Datum des Eingangs der schriftlichen Stornierung.</p>

            <h2 className="headline-sub text-foreground !mt-12">§ 6 Höhere Gewalt (Force Majeure)</h2>
            <p>Wird die Durchführung des Auftritts durch höhere Gewalt (z. B. Naturkatastrophen, Pandemie, behördliche Anordnungen, Krieg, Streik) unmöglich, sind beide Parteien von ihren Leistungspflichten befreit. In diesem Fall wird die geleistete Anzahlung vollständig erstattet. Ein weitergehender Schadensersatzanspruch besteht nicht. Gleiches gilt bei Erkrankung oder Verletzung des Künstlers, die eine Durchführung des Auftritts unmöglich macht. Der Künstler wird den Kunden unverzüglich über den Eintritt eines solchen Ereignisses informieren.</p>

            <h2 className="headline-sub text-foreground !mt-12">§ 7 Mitwirkungspflichten des Kunden</h2>
            <p>Der Kunde stellt sicher, dass am Veranstaltungsort geeignete Bedingungen für den Auftritt vorhanden sind (ausreichend Platz, Stromversorgung bei Bedarf, angemessene Beleuchtung). Der Kunde informiert den Künstler rechtzeitig über Änderungen im Ablauf oder besondere Umstände.</p>

            <h2 className="headline-sub text-foreground !mt-12">§ 8 Haftungsbeschränkung</h2>
            <p>Der Künstler haftet nur für Schäden, die auf vorsätzlichem oder grob fahrlässigem Verhalten beruhen. Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen, soweit keine wesentlichen Vertragspflichten (Kardinalpflichten) verletzt werden. Im Falle einer Verletzung wesentlicher Vertragspflichten ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt. Die Haftung für Schäden an Gegenständen des Kunden oder Dritter am Veranstaltungsort ist ausgeschlossen, es sei denn, der Schaden wurde vorsätzlich oder grob fahrlässig verursacht.</p>

            <h2 className="headline-sub text-foreground !mt-12">§ 9 Bild- und Tonaufnahmen</h2>
            <p>Der Künstler behält sich vor, während der Veranstaltung Foto- und Videoaufnahmen für eigene Werbezwecke anzufertigen oder anfertigen zu lassen. Sollte der Kunde dies nicht wünschen, ist dies vorab schriftlich mitzuteilen.</p>

            <h2 className="headline-sub text-foreground !mt-12">§ 10 Urheberrecht an Programm und Konzepten</h2>
            <p>Sämtliche vom Künstler entwickelten Programme, Konzepte, Showabläufe und kreativen Inhalte unterliegen dem Urheberrecht und verbleiben im geistigen Eigentum des Künstlers. Eine Weitergabe, Vervielfältigung oder anderweitige Nutzung durch den Kunden oder Dritte bedarf der ausdrücklichen schriftlichen Zustimmung des Künstlers.</p>

            <h2 className="headline-sub text-foreground !mt-12">§ 11 GEMA-Hinweis</h2>
            <p>Sofern im Rahmen des Auftritts GEMA-pflichtige Musik verwendet wird, ist die Anmeldung und Abführung der GEMA-Gebühren Sache des Veranstalters bzw. des Kunden, es sei denn, es wird ausdrücklich etwas anderes vereinbart. Der Künstler weist den Kunden auf diese Pflicht hin.</p>

            <h2 className="headline-sub text-foreground !mt-12">§ 12 Gerichtsstand</h2>
            <p>Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit diesem Vertrag ist Regensburg, soweit gesetzlich zulässig. Es gilt das Recht der Bundesrepublik Deutschland.</p>

            <h2 className="headline-sub text-foreground !mt-12">§ 13 Salvatorische Klausel</h2>
            <p>Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein oder werden, so wird die Wirksamkeit der übrigen Bestimmungen hiervon nicht berührt. Anstelle der unwirksamen Bestimmung tritt eine Regelung, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten kommt.</p>

            <p className="text-muted-foreground/60 mt-16">Stand: April 2026</p>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
  </>
);

export default AGB;
