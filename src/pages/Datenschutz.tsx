import PageLayout from "@/components/landing/PageLayout";

const Datenschutz = () => (
  <PageLayout>
    <section className="min-h-screen">
      <div className="container px-6 pt-32 pb-24 md:pt-40">
        <div className="max-w-3xl mx-auto">
          <span className="badge-accent mb-8 inline-flex">Rechtliches</span>
          <h1 className="headline-hero text-foreground mb-12">Datenschutz­erklärung.</h1>

          <div className="prose prose-lg max-w-none space-y-8 text-detail">
            <h2 className="headline-sub text-foreground !mt-12">1. Datenschutz auf einen Blick</h2>
            <h3 className="font-display text-xl font-bold text-foreground">Allgemeine Hinweise</h3>
            <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>

            <h3 className="font-display text-xl font-bold text-foreground">Datenerfassung auf dieser Website</h3>
            <p><strong className="text-foreground">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong></p>
            <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.</p>

            <p><strong className="text-foreground">Wie erfassen wir Ihre Daten?</strong></p>
            <p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).</p>

            <p><strong className="text-foreground">Wofür nutzen wir Ihre Daten?</strong></p>
            <p>Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.</p>

            <p><strong className="text-foreground">Welche Rechte haben Sie bezüglich Ihrer Daten?</strong></p>
            <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</p>

            <h2 className="headline-sub text-foreground !mt-12">2. Hosting</h2>
            <p>Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</p>
            <p>Die Server des Hosters befinden sich in Deutschland bzw. der Europäischen Union. Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse besteht in einer zuverlässigen Darstellung unserer Website.</p>

            <h2 className="headline-sub text-foreground !mt-12">3. Allgemeine Hinweise und Pflichtinformationen</h2>
            <h3 className="font-display text-xl font-bold text-foreground">Datenschutz</h3>
            <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>

            <h3 className="font-display text-xl font-bold text-foreground">Hinweis zur verantwortlichen Stelle</h3>
            <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
            <p>Emilian Leber<br />MagicEL<br />Regensburg, Bayern<br />E-Mail: kontakt@magicel.de</p>

            <h3 className="font-display text-xl font-bold text-foreground">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
            <p>Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.</p>

            <h2 className="headline-sub text-foreground !mt-12">4. Datenerfassung auf dieser Website</h2>
            <h3 className="font-display text-xl font-bold text-foreground">Kontaktformular</h3>
            <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
            <p>Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).</p>

            <h3 className="font-display text-xl font-bold text-foreground">Server-Log-Dateien</h3>
            <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.</p>

            <h2 className="headline-sub text-foreground !mt-12">5. Ihre Rechte</h2>
            <p>Sie haben folgende Rechte: Recht auf Auskunft (Art. 15 DSGVO), Recht auf Berichtigung (Art. 16 DSGVO), Recht auf Löschung (Art. 17 DSGVO), Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO), Recht auf Datenübertragbarkeit (Art. 20 DSGVO), Widerspruchsrecht (Art. 21 DSGVO). Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.</p>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Datenschutz;
