import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/landing/PageLayout";

const Datenschutz = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>Datenschutzerklärung | magicel.de</title>
      <meta
        name="description"
        content="Datenschutzerklärung von magicel.de — Wie ich personenbezogene Daten verarbeite, DSGVO-konform, Server in der EU."
      />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href="https://www.magicel.de/datenschutz" />
    </Helmet>
    <PageLayout>
      <main className="container px-6 pt-32 md:pt-40 pb-20">
        <article className="max-w-2xl mx-auto">
          <h1 className="font-display font-black text-3xl md:text-4xl text-foreground mb-10">
            Datenschutzerklärung
          </h1>

          <section className="space-y-6 text-base text-foreground/80 leading-[1.7]">
            <p>
              Wir freuen uns über dein Interesse an magicel.de. Der Schutz
              deiner personenbezogenen Daten ist uns ein wichtiges Anliegen.
              Diese Datenschutzerklärung informiert dich darüber, welche
              Daten beim Besuch dieser Website erhoben werden und wie sie
              verarbeitet werden.
            </p>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                1. Datenschutz auf einen Blick
              </h2>
              <p>
                Beim Besuch dieser Website werden technisch notwendige Daten
                (z. B. IP-Adresse, Browsertyp, Zeitpunkt des Zugriffs) im
                Server-Log gespeichert. Diese Daten sind nicht bestimmten
                Personen zuordenbar und werden nach kurzer Zeit anonymisiert.
                Wenn du das Kontakt- oder Buchungsformular nutzt, werden die
                von dir angegebenen Daten ausschließlich zur Bearbeitung
                deiner Anfrage verwendet.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                2. Verantwortliche Stelle
              </h2>
              <p>
                Verantwortlich für die Datenverarbeitung auf dieser Website:
              </p>
              <p className="mt-3">
                Emilian Leber
                <br />
                MagicEL Entertainment
                <br />
                93047 Regensburg, Bayern
                <br />
                E-Mail:{" "}
                <a
                  href="mailto:el@magicel.de"
                  className="underline decoration-foreground/40 hover:decoration-foreground transition-colors"
                >
                  el@magicel.de
                </a>
                <br />
                Telefon: +49 15563744696
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                3. Hosting
              </h2>
              <p>
                Diese Website wird bei Vercel Inc. gehostet, mit Servern in
                der EU. Beim Aufruf der Website werden technisch notwendige
                Daten (IP-Adresse, Datum, Zeit, User-Agent) im Server-Log
                gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
                (berechtigtes Interesse an einer sicheren und stabilen
                Bereitstellung der Website).
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                4. Cookies und lokale Speicherung
              </h2>
              <p>
                Diese Website verwendet keine Tracking-Cookies. Im
                localStorage des Browsers werden ausschließlich technische
                Daten gespeichert, die für Funktionen der Website notwendig
                sind:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 marker:text-foreground/40">
                <li>
                  Show-Planer-Entwurf (deine Antworten im Planungs-Tool, damit
                  du später weitermachen kannst)
                </li>
                <li>
                  Email-Capture (eingegebene Email-Adresse für Resume-Hinweis,
                  falls Anfrage nicht abgeschickt wurde)
                </li>
                <li>
                  Tab-Visibility-Status (für UI-Verhalten beim Tab-Wechsel)
                </li>
              </ul>
              <p className="mt-3">
                Du kannst diese Daten jederzeit über die Einstellungen
                deines Browsers löschen.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                5. Kontakt- und Buchungsformular
              </h2>
              <p>
                Wenn du Anfragen über das Kontaktformular oder den
                Show-Planer an mich sendest, werden die übermittelten Daten
                (Name, E-Mail, Telefon, Eventdetails) ausschließlich zur
                Bearbeitung deiner Anfrage verwendet. Rechtsgrundlage ist
                Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. lit. f
                DSGVO (berechtigtes Interesse an der Beantwortung deiner
                Anfrage). Die Daten werden nicht ohne deine Einwilligung an
                Dritte weitergegeben.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                6. Externe Dienste (YouTube, Schriften)
              </h2>
              <p>
                Auf dieser Website werden YouTube-Videos eingebettet
                (erweiterte Datenschutzeinstellung). Erst beim Klick auf das
                Vorschaubild werden Daten an YouTube (Google Ireland Ltd.,
                Gordon House, Barrow Street, Dublin 4, Irland) übertragen.
                Mehr unter{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-foreground/40 hover:decoration-foreground transition-colors"
                >
                  policies.google.com/privacy
                </a>
                .
              </p>
              <p className="mt-3">
                Schriftarten werden von Google Fonts geladen. Beim ersten
                Laden der Seite wird eine Verbindung zu Google-Servern
                hergestellt.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                7. Speicherdauer
              </h2>
              <p>
                Server-Logs werden nach 14 Tagen automatisch gelöscht.
                Anfragen über das Kontaktformular werden so lange
                gespeichert, wie es für die Bearbeitung der Anfrage und
                etwaige Folgekommunikation erforderlich ist — bei
                vertraglicher Bindung gemäß den gesetzlichen
                Aufbewahrungspflichten (i. d. R. 6–10 Jahre nach HGB / AO).
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                8. Deine Rechte
              </h2>
              <p>
                Du hast jederzeit das Recht, unentgeltlich Auskunft über
                Herkunft, Empfänger und Zweck deiner gespeicherten
                personenbezogenen Daten zu erhalten. Außerdem hast du das
                Recht auf Berichtigung, Löschung oder Einschränkung der
                Verarbeitung, ein Widerspruchsrecht gegen die Verarbeitung
                sowie ein Recht auf Datenübertragbarkeit. Hierzu sowie zu
                weiteren Fragen zum Datenschutz kannst du dich jederzeit
                unter{" "}
                <a
                  href="mailto:el@magicel.de"
                  className="underline decoration-foreground/40 hover:decoration-foreground transition-colors"
                >
                  el@magicel.de
                </a>{" "}
                an mich wenden. Des Weiteren steht dir ein Beschwerderecht
                bei der zuständigen Aufsichtsbehörde zu (in Bayern: Bayerisches
                Landesamt für Datenschutzaufsicht).
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                9. Aktualität dieser Erklärung
              </h2>
              <p>
                Diese Datenschutzerklärung ist aktuell gültig. Durch die
                Weiterentwicklung der Website oder geänderte rechtliche bzw.
                behördliche Vorgaben kann es notwendig werden, diese
                Datenschutzerklärung zu ändern. Die jeweils aktuelle Version
                kann jederzeit auf dieser Seite eingesehen werden.
              </p>
            </div>
          </section>

          <p className="text-sm text-foreground/55 mt-12">Stand: Mai 2026</p>
        </article>
      </main>
    </PageLayout>
  </>
);

export default Datenschutz;
