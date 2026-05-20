import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/landing/PageLayout";

const Impressum = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>Impressum | Emilian Leber Zauberkünstler</title>
      <meta
        name="description"
        content="Impressum von magicel.de — Emilian Leber, Zauberkünstler aus Bayern. Kontakt, Verantwortliche Stelle, Pflichtangaben nach § 5 TMG."
      />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href="https://www.magicel.de/impressum" />
    </Helmet>
    <PageLayout>
      <main className="container px-6 pt-32 md:pt-40 pb-20">
        <article className="max-w-2xl mx-auto">
          <h1 className="font-display font-black text-3xl md:text-4xl text-foreground mb-10">
            Impressum
          </h1>

          <section className="space-y-6 text-base text-foreground/80 leading-[1.7]">
            <div>
              <h2 className="font-semibold text-foreground mb-2">
                Angaben gemäß § 5 TMG
              </h2>
              <p>
                Emilian Leber
                <br />
                MagicEL Entertainment
                <br />
                93047 Regensburg, Bayern
                <br />
                Deutschland
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">Kontakt</h2>
              <p>
                E-Mail:{" "}
                <a
                  href="mailto:el@magicel.de"
                  className="underline decoration-foreground/40 hover:decoration-foreground transition-colors"
                >
                  el@magicel.de
                </a>
                <br />
                Telefon: +49 15563744696
                <br />
                Web:{" "}
                <a
                  href="https://www.magicel.de"
                  className="underline decoration-foreground/40 hover:decoration-foreground transition-colors"
                >
                  www.magicel.de
                </a>
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                Umsatzsteuer-ID
              </h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: auf Anfrage.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
              </h2>
              <p>
                Emilian Leber
                <br />
                Anschrift wie oben
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                Streitschlichtung
              </h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-foreground/40 hover:decoration-foreground transition-colors"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
                . Wir sind nicht bereit oder verpflichtet, an
                Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                Haftung für Inhalte
              </h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene
                Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                gespeicherte fremde Informationen zu überwachen oder nach
                Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                hinweisen. Bei Bekanntwerden entsprechender Rechtsverletzungen
                werden wir diese Inhalte umgehend entfernen.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                Haftung für Links
              </h2>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf
                deren Inhalte wir keinen Einfluss haben. Für die Inhalte der
                verlinkten Seiten ist stets der jeweilige Anbieter oder
                Betreiber der Seiten verantwortlich.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                Urheberrecht
              </h2>
              <p>
                Die durch den Seitenbetreiber erstellten Inhalte und Werke auf
                diesen Seiten unterliegen dem deutschen Urheberrecht.
                Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                Verwertung außerhalb der Grenzen des Urheberrechts bedürfen
                der schriftlichen Zustimmung.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground mb-2">
                Bildnachweis
              </h2>
              <p>
                Alle Fotos: © Emilian Leber / MagicEL Entertainment, sofern
                nicht anders angegeben.
              </p>
            </div>
          </section>

          <p className="text-sm text-foreground/55 mt-12">Stand: Mai 2026</p>
        </article>
      </main>
    </PageLayout>
  </>
);

export default Impressum;
