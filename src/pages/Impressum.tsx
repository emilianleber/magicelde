import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/landing/PageLayout";

const Impressum = () => (
  <>
    <Helmet>
      <title>Impressum – Emilian Leber | Zauberer aus Regensburg</title>
      <meta name="description" content="Impressum und Kontaktdaten von Emilian Leber, Zauberer und Showkünstler aus Regensburg. Angaben gemäß § 5 TMG für die Website magicel.de." />
      <link rel="canonical" href="https://www.magicel.de/impressum" />
      <meta property="og:title" content="Impressum – Emilian Leber" />
      <meta property="og:description" content="Impressum von Emilian Leber, Zauberer und Showkünstler aus Regensburg. Angaben gemäß § 5 TMG." />
      <meta property="og:url" content="https://www.magicel.de/impressum" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Impressum – Emilian Leber" />
      <meta name="twitter:description" content="Impressum von Emilian Leber, Zauberer und Showkünstler aus Regensburg. Angaben gemäß § 5 TMG." />
        <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />
    </Helmet>
    <PageLayout>
    <section className="min-h-screen">
      <div className="container px-6 pt-32 pb-24 md:pt-40">
        <div className="max-w-3xl mx-auto">
          <span className="badge-accent mb-8 inline-flex">Rechtliches</span>
          <h1 className="headline-hero text-foreground mb-12">Impressum.</h1>

          <div className="prose prose-lg max-w-none space-y-8 text-detail">
            
            <h2 className="headline-sub text-foreground">Angaben gemäß § 5 TMG</h2>
            <p>
              Emilian Leber<br />
              Zauberer Emilian Leber<br />
              Reichsstiftstraße 18<br />
              93055 Regensburg<br />
              Deutschland
            </p>

            <h2 className="headline-sub text-foreground !mt-12">Kontakt</h2>
            <p>
              Telefon: +49 155 63744696<br />
              E-Mail: el@magicel.de<br />
              Website: www.magicel.de
            </p>

            <h2 className="headline-sub text-foreground !mt-12">
              Umsatzsteuer
            </h2>
            <p>
              Gemäß § 19 UStG wird keine Umsatzsteuer berechnet
              (Kleinunternehmerregelung).
            </p>

            <h2 className="headline-sub text-foreground !mt-12">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p>
              Emilian Leber<br />
              Reichsstiftstraße 18<br />
              93055 Regensburg
            </p>

            <h2 className="headline-sub text-foreground !mt-12">
              Haftung für Inhalte
            </h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
              auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
              Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
              verpflichtet, übermittelte oder gespeicherte fremde Informationen
              zu überwachen oder nach Umständen zu forschen, die auf eine
              rechtswidrige Tätigkeit hinweisen.
            </p>
            <p>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
              Informationen nach den allgemeinen Gesetzen bleiben hiervon
              unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
              Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
              Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir
              diese Inhalte umgehend entfernen.
            </p>

            <h2 className="headline-sub text-foreground !mt-12">
              Haftung für Links
            </h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren
              Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
              fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
              der Seiten verantwortlich.
            </p>

            <h2 className="headline-sub text-foreground !mt-12">
              Urheberrecht
            </h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
            <p>
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht
              kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser
              Seite nicht vom Betreiber erstellt wurden, werden die
              Urheberrechte Dritter beachtet.
            </p>

          </div>
        </div>
      </div>
    </section>
  </PageLayout>
  </>
);

export default Impressum;
