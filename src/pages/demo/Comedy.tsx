/** /demo/comedy — Comedy-Zauberei (kreativ, abwechslungsreich). */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { SplitFeature, Bento, InteractiveTabs, NotificationFlow } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Smile, Mail, Clock, CalendarCheck } from "lucide-react";
import heroImg from "@/assets/emotionen.jpg";
import splitImg from "@/assets/audience-reactions.jpg";
import bentoImg from "@/assets/zuschauer-blau.jpg";
import tab1 from "@/assets/buehne-dpsg.jpg";
import tab2 from "@/assets/audience-reactions.jpg";
import tab3 from "@/assets/stage-show.jpg";

export default function DemoComedy() {
  return (
    <VoltageShell
      title="DEMO · Comedy-Zauberei — staunen und lachen | Emilian Leber"
      description="Comedy-Zauberei in Bayern & deutschlandweit — Stand-Up trifft Mentalmagie. Staunen und lachen gleichzeitig, 15–45 Min, 30–500 Gäste, kein Fremdscham-Humor."
      path="/demo/comedy"
    >
      <SubHero
        eyebrow="Konzept · Comedy-Zauberei"
        title={<>Staunen <span style={{ color: COBALT }}>und</span> lachen<span style={{ color: MAGENTA }}>.</span></>}
        sub="Comedy-Zauberei, die hängenbleibt: Stand-Up trifft Mentalmagie. Die Magie ist das Setup für die Lacher — euer Saal staunt und lacht im selben Moment. 15–45 Min, 30–500 Gäste."
        image={heroImg}
        imageAlt="Lachendes Publikum bei einer Comedy-Zaubershow"
        badge="Stand-Up trifft Mentalmagie — staunen UND lachen gleichzeitig."
        secondary={{ label: "Show ansehen", href: "/demo#show" }}
      />

      <SplitFeature
        eyebrow="Pointen die sitzen"
        title={<>Comedy, über die <span style={{ color: COBALT }}>mitgelacht</span> wird.</>}
        sub="Kein Trick-Marathon und kein Brüllen ins Mikro. Die Mentalmagie baut den Moment auf, die Pointe löst ihn — und gelacht wird mit den Gästen, nie über jemanden."
        points={["Pointen die sitzen — getaktet wie ein guter Stand-Up-Set", "Gelacht wird mit, nie über jemanden — kein Fremdscham-Humor", "Magie als Setup für die Lacher: erst der Wow-Moment, dann die Pointe"]}
        image={splitImg}
        imageAlt="Begeisterte Reaktionen im Publikum"
        stat={{ v: "200+", l: "Events seit 2016" }}
      />

      <Bento
        eyebrow="Was hängenbleibt"
        title="Comedy mit Substanz."
        sub="Routine, eine Comedy-Dosis nach Anlass und echte Reaktionen — modular auf eure Eventlänge und euren Abend abgestimmt."
        items={[
          { kind: "photo", span: "col-span-2 row-span-2", image: bentoImg, chip: "Echte Reaktionen", title: "Der Moment, in dem der ganze Saal gleichzeitig lacht." },
          { kind: "cobalt", span: "col-span-1", v: "200+", l: "Events Routine" },
          { kind: "glass", span: "col-span-1", Icon: Smile, t: "Comedy-Dosis nach Anlass", d: "Von pointiert bis durchgängig lustig — passend zu euren Gästen." },
          { kind: "quote", span: "col-span-2", text: "Alle haben gestaunt und Tränen gelacht — genau die Mischung, die wir wollten.", name: "Martina Senftl · Eventkundin" },
        ]}
      />

      <InteractiveTabs
        eyebrow="Der Bogen"
        title="Aufwärmen, mitnehmen, Pointen-Finale."
        tabs={[
          { t: "Aufwärmen", d: "Der lockere Einstieg, der sofort Lacher holt und alle aus der Reserve lockt — ohne jemanden vorzuführen.", img: tab1 },
          { t: "Mitnehmen", d: "Mentalmagie und Comedy im Wechsel: erst der Wow-Moment, dann die Pointe, die ihn aufs Korn nimmt.", img: tab2 },
          { t: "Pointen-Finale", d: "Der Höhepunkt, bei dem Staunen und Lachen zusammenfallen — der Moment, über den danach noch geredet wird.", img: tab3 },
        ]}
      />

      <NotificationFlow
        eyebrow="So einfach geht's"
        title={<>In drei Schritten zur <span style={{ color: COBALT }}>Show</span>.</>}
        sub="Kurz das Event schildern, schnelle Antwort, Termin bestätigt — den Rest übernehme ich. Kein Fremdscham, keine Überraschungen."
        steps={[
          { Icon: Mail, t: "Anfrage", d: "Erzähl mir kurz von Anlass, Datum und Gästezahl." },
          { Icon: Clock, t: "Antwort < 24h", d: "Ich melde mich innerhalb von 24 Stunden persönlich zurück." },
          { Icon: CalendarCheck, t: "Termin bestätigt", d: "Briefing, Vertrag, Tech — alles aus einer Hand geliefert." },
        ]}
      />

      <PullQuote
        text="Alle haben gestaunt und Tränen gelacht. Comedy ohne Fremdscham — genau die Mischung, die wir uns gewünscht haben."
        name="Martina Senftl"
        role="Eventkundin"
      />

      <ReviewsBlock paper={false} />

      <FinalCTA
        title={<>Bereit für staunen und lachen<span style={{ color: MAGENTA }}>?</span></>}
        sub="Erzähl mir kurz von eurem Event — ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
