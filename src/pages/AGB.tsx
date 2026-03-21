import PageLayout from "@/components/landing/PageLayout";

const AGB = () => (
  <PageLayout>
    <section className="min-h-screen">
      <div className="container px-6 pt-32 pb-24 md:pt-40">
        <div className="max-w-3xl mx-auto">
          <span className="badge-accent mb-8 inline-flex">Rechtliches</span>
          <h1 className="headline-hero text-foreground mb-12">Allgemeine Geschäftsbedingungen.</h1>

          <div className="prose prose-lg max-w-none space-y-8 text-detail">
            <h2 className="headline-sub text-foreground">§ 1 Geltungsbereich</h2>
            <p>Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen Emilian Leber (im Folgenden „Künstler") und dem Auftraggeber (im Folgenden „Kunde") über die Erbringung von künstlerischen Dienstleistungen (Auftritte, Shows, Performances).</p>

            <h2 className="headline-sub text-foreground !mt-12">§ 2 Vertragsschluss</h2>
            <p>Ein Vertrag kommt zustande durch die schriftliche Bestätigung (auch per E-Mail) einer Buchung durch den Künstler nach vorheriger Anfrage des Kunden. Die Anfrage des Kunden stellt ein unverbindliches Angebot dar. Erst die Buchungsbestätigung des Künstlers begründet einen verbindlichen Vertrag.</p>

            <h2 className="headline-sub text-foreground !mt-12">§ 3 Leistungsumfang</h2>
            <p>Der genaue Leistungsumfang (Art der Show, Dauer, Format) wird individuell vereinbart und in der Buchungsbestätigung festgehalten. Änderungen des vereinbarten Leistungsumfangs bedürfen der schriftlichen Zustimmung beider Parteien.</p>

            <h2 className="headline-sub text-foreground !mt-12">§ 4 Vergütung und Zahlungsbedingungen</h2>
            <p>Die Vergütung wird individuell vereinbart und in der Buchungsbestätigung festgehalten. Zur Sicherung des Termins wird eine Anzahlung fällig. Die Restzahlung ist spätestens am Tag der Veranstaltung zu leisten, sofern nicht anders vereinbart. Alle Preise verstehen sich als Bruttopreise inklusive gesetzlicher Mehrwertsteuer.</p>

            <h2 className="headline-sub text-foreground !mt-12">§ 5 Stornierung und Rücktritt</h2>
            <p>Eine Stornierung durch den Kunden ist jederzeit möglich. Bei Stornierung fallen folgende Kosten an: Bis 60 Tage vor dem Event: keine Kosten. 30–60 Tage vor dem Event: 50% der vereinbarten Vergütung. Weniger als 30 Tage vor dem Event: 100% der vereinbarten Vergütung. Der Künstler behält sich das Recht vor, bei höherer Gewalt oder Krankheit den Auftritt abzusagen. In diesem Fall wird die geleistete Anzahlung vollständig erstattet.</p>

            <h2 className="headline-sub text-foreground !mt-12">§ 6 Mitwirkungspflichten des Kunden</h2>
            <p>Der Kunde stellt sicher, dass am Veranstaltungsort geeignete Bedingungen für den Auftritt vorhanden sind (ausreichend Platz, Stromversorgung bei Bedarf, angemessene Beleuchtung). Der Kunde informiert den Künstler rechtzeitig über Änderungen im Ablauf oder besondere Umstände.</p>

            <h2 className="headline-sub text-foreground !mt-12">§ 7 Haftung</h2>
            <p>Der Künstler haftet nur für Schäden, die auf vorsätzlichem oder grob fahrlässigem Verhalten beruhen. Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen, soweit keine wesentlichen Vertragspflichten verletzt werden.</p>

            <h2 className="headline-sub text-foreground !mt-12">§ 8 Bild- und Tonaufnahmen</h2>
            <p>Der Künstler behält sich vor, während der Veranstaltung Foto- und Videoaufnahmen für eigene Werbezwecke anzufertigen oder anfertigen zu lassen. Sollte der Kunde dies nicht wünschen, ist dies vorab schriftlich mitzuteilen.</p>

            <h2 className="headline-sub text-foreground !mt-12">§ 9 Schlussbestimmungen</h2>
            <p>Es gilt das Recht der Bundesrepublik Deutschland. Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. Gerichtsstand ist Regensburg, soweit gesetzlich zulässig.</p>

            <p className="text-muted-foreground/60 mt-16">Stand: März 2026</p>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default AGB;
