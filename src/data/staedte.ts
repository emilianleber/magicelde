export interface StadtFAQ {
  q: string;
  a: string;
}

export interface KollegenEmpfehlung {
  prefix: string;
  linkText: string;
  linkHref: string;
  suffix?: string;
}

export interface Stadt {
  slug: string;
  name: string;
  region: string;
  intro: string;
  highlight: string;
  /**
   * Ungefaehre Fahrzeit mit dem Auto ab Regensburg, als Satzteil
   * ("rund 1,5 Stunden"). Leer = Regensburg selbst.
   */
  anfahrt?: string;
  einwohner?: string;
  /**
   * Bekannte Veranstaltungsorte der Stadt — NUR als Orientierung fuer
   * Kunden. Keine Aussage, dass Emilian dort aufgetreten ist.
   */
  bekannteLocations?: string[];
  faq?: StadtFAQ[];
  seoText?: string;
  langText?: string;
  kollegenEmpfehlung?: KollegenEmpfehlung;
}

/**
 * Einsatzgebiet: Regensburg und Staedte bis ca. zwei Stunden Anfahrt.
 *
 * Warum nur diese (22.09.2026): Vorher 109 Stadtseiten (bis Kiel und Wien)
 * plus 545 Format×Stadt-Kombis mit ~90 % gleichem Text. Google wertete das
 * als duennen Inhalt, die Bayern-Seiten verloren Klicks. Die entfernten
 * Staedte leiten per vercel.json auf die naechste Stadt hier weiter
 * (ausserhalb Bayerns auf Startseite bzw. Format-Seite).
 *
 * Texte (22.09.2026 ueberarbeitet): Nur was Emilian ANBIETET und was
 * seitenweit belegt ist (ab 395 €, Antwort in 24 h, Deutsch/Englisch,
 * 200+ Events seit 2016, 5,0 Sterne bei 30+ Bewertungen, Anfahrt nach
 * Entfernung transparent im Angebot, Q4-Vorlauf 8–12 Wochen). KEINE
 * erfundenen Auftritte, Kunden, Stueckzahlen pro Stadt oder
 * "Anfahrt inklusive" — die Anfahrt wird laut FAQ nach Entfernung berechnet.
 * Fahrzeiten sind grobe Richtwerte ohne Stau.
 *
 * Reihenfolge = Reihenfolge in Links und Sitemap.
 */
export const staedte: Stadt[] = [
  {
    slug: "regensburg",
    name: "Regensburg",
    region: "Bayern",
    intro: "Regensburg ist meine Heimatstadt und mein Standort. Für Firmenfeiern, Hochzeiten und Geburtstage in der Altstadt, in Stadtamhof oder in den Stadtteilen bringe ich Close-Up Magie, eine Bühnenshow oder ein Magic Dinner mit — ohne lange Anreise.",
    highlight: "Kurze Wege: Weil ich in Regensburg wohne, fällt die Anfahrt kaum ins Gewicht, und Absprachen zu Ablauf und Technik gehen schnell.",
    einwohner: "155.000",
    bekannteLocations: ["Marinaforum", "Kolpinghaus", "Leerer Beutel", "Restaurant Wald & Wiese, Sinzing (Partner-Location Magic Dinner)"],
    faq: [
      { q: "Was kostet ein Zauberer in Regensburg?", a: "Pakete starten ab 395 € (Close-Up, 20–30 Minuten). Bühnenshow und Magic Dinner liegen darüber, je nach Dauer und Gästezahl. Da ich in Regensburg wohne, ist die Anfahrt gering — sie steht wie alle Posten transparent im Angebot. Antwort auf deine Anfrage innerhalb von 24 Stunden." },
      { q: "Wo findet das Magic Dinner in Regensburg statt?", a: "Entweder im Restaurant Wald & Wiese in Sinzing, direkt vor den Toren Regensburgs — meiner Partner-Location für das Magic Dinner — oder in eurer eigenen Location. Der Abend dauert je nach Menü 2,5 bis 4 Stunden, mit Magie zwischen den Gängen." },
      { q: "Wie weit im Voraus sollte ich in Regensburg buchen?", a: "Für Weihnachtsfeiern im Dezember und Hochzeiten von Mai bis September am besten 8–12 Wochen vorher, sonst reichen meist 4–6 Wochen. Kurzfristige Anfragen prüfe ich trotzdem gern." },
    ],
    seoText: "Emilian Leber ist Zauberkünstler und Mentalist aus Regensburg. Seit 2016 über 200 Events, 5,0 Sterne bei mehr als 30 Bewertungen — auf Deutsch oder Englisch, für Firmenfeier, Hochzeit, Geburtstag oder ein Magic Dinner vor den Toren der Stadt.",
    langText: `Regensburg ist mein Ausgangspunkt für jedes Event. Für Feiern in der Stadt heißt das: kurze Anfahrt, entsprechend geringe Anfahrtskosten und schnelle Absprachen zu Ablauf und Technik.

Welche Formate in Regensburg gut funktionieren: Für Firmenfeiern und Weihnachtsfeiern — in Regensburg mit Universität, OTH und vielen Unternehmen eine große Saison — eignet sich die Kombination aus Close-Up beim Empfang und einer kurzen Bühnenshow. Bei Hochzeiten begleite ich Sektempfang, Dinner und den Moment vor dem Eröffnungstanz. Für kleinere Runden bis etwa 30 Gäste reicht oft reines Close-Up am Tisch.

Magic Dinner: Das Format mit Magie zwischen den Gängen findet im Restaurant Wald & Wiese in Sinzing statt, direkt neben Regensburg — oder in eurer eigenen Location. 3 bis 5 Gänge, 2,5 bis 4 Stunden.

Preise: Pakete ab 395 €. Das konkrete Angebot enthält Format, Dauer und Anfahrt — ohne versteckte Kosten. Anfragen beantworte ich innerhalb von 24 Stunden.`,
  },
  {
    slug: "muenchen",
    name: "München",
    region: "Bayern",
    anfahrt: "rund 1,5 Stunden",
    intro: "Für Firmenfeiern, Hochzeiten und private Feiern in München komme ich aus Regensburg — rund anderthalb Stunden mit dem Auto. Im Gepäck: Close-Up Magie für den Empfang, eine Bühnenshow für den ganzen Saal oder beides kombiniert, auf Deutsch oder Englisch.",
    highlight: "München hat viele international besetzte Teams und Gäste. Die Show gibt es deshalb auch komplett auf Englisch — sag im Briefing einfach, welche Sprache dein Publikum spricht.",
    einwohner: "1.500.000",
    bekannteLocations: [
      "Hotel Bayerischer Hof",
      "Hotel Vier Jahreszeiten Kempinski",
      "Mandarin Oriental",
      "BMW Welt",
      "Alte Kongresshalle",
      "Postpalast",
      "Zenith",
    ],
    faq: [
      {
        q: "Was kostet ein Zauberer in München?",
        a: "Pakete starten ab 395 € (Close-Up, 20–30 Minuten); eine Bühnenshow oder Kombination aus Empfang und Show liegt darüber. Dazu kommt die Anfahrt aus Regensburg (rund 1,5 Stunden), berechnet nach Entfernung und transparent im Angebot ausgewiesen.",
      },
      {
        q: "Tritt der Zauberer in München auch auf Englisch auf?",
        a: "Ja. Close-Up und Bühnenshow gibt es auf Deutsch und auf Englisch — praktisch bei internationalen Teams, Kundenabenden oder Konferenzen.",
      },
      {
        q: "Kommst du auch ins Münchner Umland?",
        a: "Ja, zum Beispiel nach Freising, Erding, Dachau oder an den Starnberger See. Die Anfahrt richtet sich nach der Entfernung und steht vorab im Angebot. Bei Orten, die deutlich über zwei Stunden entfernt liegen, sprechen wir vorher kurz über die Logistik.",
      },
      {
        q: "Wie früh sollte ich für eine Münchner Weihnachtsfeier anfragen?",
        a: "Für Weihnachtsfeiern am besten 8–12 Wochen vorher — die Freitage und Samstage im Dezember sind zuerst vergeben. Für den Rest des Jahres reichen meist 4–6 Wochen. Anfragen beantworte ich innerhalb von 24 Stunden.",
      },
    ],
    seoText: "Aus Regensburg nach München: Emilian Leber bringt Close-Up Magie, Bühnenshow und Mentalmagie zu Firmenfeiern, Hochzeiten und Geburtstagen in der Landeshauptstadt und im Umland — auf Deutsch oder Englisch.",
    langText: `Veranstaltungen in München sind oft größer und internationaler als im Rest Bayerns: Konzern-Weihnachtsfeiern, Kundenabende während Messen, Hochzeiten mit Gästen aus mehreren Ländern. Dafür gibt es das Programm auf Deutsch und Englisch, und im Briefing-Call vorab stimmen wir Tonalität und Ablauf ab — vom förmlichen Galadinner bis zur lockeren Teamfeier.

Welche Formate passen? Beim Empfang oder Stehempfang funktioniert Close-Up als Walk-Around: Ich gehe von Gruppe zu Gruppe, die Magie passiert direkt in den Händen der Gäste. Für Firmenfeiern mit festem Programmteil kommt eine Bühnenshow von 15 bis 60 Minuten dazu. Bei Hochzeiten verteile ich die Magie auf Sektempfang, Dinner und den Moment vor dem Tanz.

Anfahrt und Kosten: Von Regensburg nach München sind es rund 1,5 Stunden. Die Anfahrt wird nach Entfernung berechnet und steht transparent im Angebot. Endet das Event sehr spät, kann eine Übernachtung sinnvoll sein — das klären wir vorab, auch das steht dann im Angebot. Pakete beginnen ab 395 €.`,
  },
  {
    slug: "nuernberg",
    name: "Nürnberg",
    region: "Bayern",
    anfahrt: "gut eine Stunde über die A3",
    intro: "Nürnberg ist von Regensburg aus gut eine Stunde über die A3 entfernt. Ich biete hier Close-Up Magie, Bühnenshow und Magic Dinner für Firmenfeiern, Hochzeiten und Geburtstage an — und mit der NürnbergMesse vor der Tür auch Messe-Magie am Stand.",
    highlight: "Nürnberg ist Messestadt. Wer auf einer Fachmesse mehr Besucher an den Stand holen will, kann Close-Up als Publikumsmagnet buchen — auf Deutsch oder Englisch.",
    einwohner: "520.000",
    bekannteLocations: [
      "Meistersingerhalle",
      "Tafelhalle",
      "NürnbergMesse",
      "Le Méridien Grand Hotel",
      "Historischer Rathaussaal",
      "Kulturwerkstatt Auf AEG",
      "Z-Bau",
    ],
    faq: [
      {
        q: "Was kostet ein Zauberer in Nürnberg?",
        a: "Pakete beginnen ab 395 € (Close-Up, 20–30 Minuten). Eine Bühnenshow, Messe-Tage oder ein Magic Dinner kalkuliere ich nach Dauer und Rahmen. Die Anfahrt aus Regensburg (gut eine Stunde) wird nach Entfernung berechnet und steht transparent im Angebot.",
      },
      {
        q: "Kann ich den Zauberer für einen Messestand auf der NürnbergMesse buchen?",
        a: "Ja. Messe-Magie ist ein eigenes Format: Close-Up-Effekte, die Vorbeigehende stoppen, und danach eine Übergabe an euer Standteam. Buchbar für einen halben Tag, einen ganzen Tag oder mehrere Messetage, auf Deutsch oder Englisch. Details auf der Seite Messe-Magier.",
      },
      {
        q: "Kommst du auch nach Fürth, Erlangen oder Schwabach?",
        a: "Ja, die ganze Metropolregion liegt im Einsatzgebiet. Die Anfahrt richtet sich nach dem genauen Ort und steht vorab im Angebot.",
      },
    ],
    seoText: "Emilian Leber kommt aus Regensburg nach Nürnberg: Close-Up Magie und Bühnenshow für Firmenfeier, Hochzeit und Geburtstag, dazu Messe-Magie für Aussteller auf der NürnbergMesse.",
    langText: `In Nürnberg treffen zwei Arten von Veranstaltungen aufeinander: klassische Feiern — Firmen-Weihnachtsfeier, Hochzeit, runder Geburtstag — und Messen. Für beides gibt es passende Formate.

Für Feiern: Close-Up beim Empfang oder zwischen den Gängen, eine Bühnenshow von 15 bis 60 Minuten als Programmpunkt, oder beides kombiniert. Bei Hochzeiten verteile ich die Magie auf Sektempfang, Dinner und den Moment vor dem Tanz.

Für Messen: Auf Fachmessen in der NürnbergMesse geht es darum, Besucher am Stand zu halten. Messe-Magie arbeitet mit kurzen Close-Up-Effekten direkt am Gang, danach übernimmt euer Team das Gespräch. Das funktioniert auf Deutsch und Englisch — wichtig bei internationalem Fachpublikum.

Anfahrt und Kosten: Von Regensburg nach Nürnberg ist es gut eine Stunde über die A3. Die Anfahrt wird nach Entfernung berechnet und im Angebot ausgewiesen. Pakete ab 395 €, Antwort auf Anfragen innerhalb von 24 Stunden.`,
  },
  {
    slug: "augsburg",
    name: "Augsburg",
    region: "Bayern",
    anfahrt: "knapp zwei Stunden",
    intro: "Augsburg liegt am Rand meines Einsatzgebiets — von Regensburg aus knapp zwei Stunden mit dem Auto. Für Firmenfeiern, Hochzeiten und Geburtstage in der Fuggerstadt und in Bayerisch-Schwaben biete ich Close-Up Magie, Bühnenshow und Magic Dinner an.",
    highlight: "Bei knapp zwei Stunden Anfahrt lohnt sich eine gute Planung: Wir klären im Briefing Beginn, Ende und Aufbau — und ob bei einem späten Ende eine Übernachtung sinnvoll ist. Alles steht vorab im Angebot.",
    einwohner: "300.000",
    bekannteLocations: [
      "Kongress am Park",
      "Goldener Saal im Rathaus",
      "Kurhaus Göggingen",
      "Steigenberger Drei Mohren",
      "Hotel Maximilian's",
      "Schwabenhalle (Messe Augsburg)",
    ],
    faq: [
      {
        q: "Was kostet ein Zauberer in Augsburg?",
        a: "Pakete starten ab 395 € (Close-Up, 20–30 Minuten). Dazu kommt die Anfahrt aus Regensburg — knapp zwei Stunden —, die nach Entfernung berechnet wird. Falls das Event spät endet, kann eine Übernachtung dazukommen. Beides steht transparent im Angebot, bevor du zusagst.",
      },
      {
        q: "Lohnt sich bei der Anfahrt ein längeres Programm?",
        a: "Oft ja. Da die Anfahrt ohnehin anfällt, kann sich eine Kombination lohnen — etwa Close-Up beim Empfang und eine Bühnenshow später am Abend. Welche Länge zu deinem Ablauf passt, besprechen wir im Briefing-Call.",
      },
      {
        q: "Kommst du auch nach Friedberg, Gersthofen oder Königsbrunn?",
        a: "Ja, das Augsburger Umland liegt ebenfalls im Einsatzgebiet. Die Anfahrt wird für den konkreten Ort berechnet und im Angebot ausgewiesen.",
      },
    ],
    seoText: "Close-Up Magie, Bühnenshow und Magic Dinner in Augsburg und Bayerisch-Schwaben: Emilian Leber kommt aus Regensburg zu Firmenfeiern, Hochzeiten und Geburtstagen — Anfahrt transparent im Angebot.",
    langText: `Augsburg ist mit rund 300.000 Einwohnern die drittgrößte Stadt Bayerns — mit Universität, Hochschule und vielen Industrie- und Technologieunternehmen. Entsprechend breit sind die Anlässe: Weihnachtsfeiern und Jubiläen von Firmen, Hochzeiten in historischen Sälen, runde Geburtstage im kleinen Kreis.

Welche Formate passen? Für Firmenfeiern empfehle ich meist die Kombination aus Close-Up beim Empfang und einer Bühnenshow von 15 bis 60 Minuten. Bei Hochzeiten begleite ich Sektempfang, Dinner und den Moment vor dem Tanz. Für Feiern bis etwa 30 Gäste reicht Close-Up direkt am Tisch.

Anfahrt und Kosten: Von Regensburg nach Augsburg sind es knapp zwei Stunden. Die Anfahrt wird nach Entfernung berechnet; bei einem sehr späten Ende kann eine Übernachtung sinnvoll sein. Beides klären wir vorab und es steht im Angebot — keine Nachberechnung. Pakete ab 395 €.`,
  },
  {
    slug: "wuerzburg",
    name: "Würzburg",
    region: "Bayern",
    anfahrt: "rund zwei Stunden über die A3",
    intro: "Würzburg erreiche ich von Regensburg aus in rund zwei Stunden über die A3. Für Hochzeiten, Firmenfeiern und private Feiern in Würzburg und Unterfranken biete ich Close-Up Magie, Bühnenshow und Magic Dinner an.",
    highlight: "Würzburg ist Weinstadt — und Close-Up am Tisch passt gut zu einer Weinprobe oder einem Winzer-Dinner: kurze Effekte zwischen den Weinen, ohne die Verkostung zu stören.",
    einwohner: "130.000",
    bekannteLocations: [
      "Congress Centrum Würzburg",
      "Vogel Convention Center",
      "Posthalle",
      "Weingut Bürgerspital",
      "Weingut Juliusspital",
      "Hotel Rebstock",
    ],
    faq: [
      {
        q: "Was kostet ein Zauberer in Würzburg?",
        a: "Pakete beginnen ab 395 € (Close-Up, 20–30 Minuten). Würzburg liegt rund zwei Stunden von Regensburg entfernt — die Anfahrt wird nach Entfernung berechnet, bei spätem Ende kommt ggf. eine Übernachtung dazu. Beides steht vorab transparent im Angebot.",
      },
      {
        q: "Passt Zauberei zu einer Weinprobe?",
        a: "Ja, gut sogar. Close-Up am Tisch lässt sich in Pausen zwischen den Weinen einbauen — ein paar Minuten pro Tisch, dann geht die Verkostung weiter. Wie das zeitlich am besten zu eurem Ablauf passt, stimmen wir im Briefing mit dir und dem Gastgeber ab.",
      },
      {
        q: "Kommst du auch nach Kitzingen, Schweinfurt oder ins Umland?",
        a: "Nach Absprache ja. Würzburg liegt schon am Rand meines Einsatzgebiets, weiter entfernte Orte gehen je nach Termin — die Anfahrt steht in jedem Fall vorher im Angebot.",
      },
    ],
    seoText: "Zauberkunst für Würzburg und Unterfranken: Close-Up Magie, Bühnenshow und Magic Dinner für Hochzeiten, Firmenfeiern und Weinproben — mit Emilian Leber aus Regensburg.",
    langText: `Würzburg verbindet die barocke Residenz — UNESCO-Welterbe —, eine große Universität und den Frankenwein. Viele Feiern hier drehen sich um Wein: Weinproben, Winzer-Dinner, Hochzeiten auf Weingütern. Dazu passt Close-Up besonders gut, weil es sich in kleine Pausen einfügen lässt und niemand dafür aufstehen muss.

Für Firmenfeiern und größere Hochzeiten kommt eine Bühnenshow von 15 bis 60 Minuten dazu — als Programmpunkt zwischen Essen und Tanz. Bei kleineren Feiern bis etwa 30 Gäste reicht Close-Up am Tisch.

Anfahrt und Kosten: Würzburg liegt am Rand meines Einsatzgebiets, rund zwei Stunden über die A3. Die Anfahrt wird nach Entfernung berechnet; bei einem späten Ende kann eine Übernachtung sinnvoll sein. Beides klären wir vor der Buchung und es steht im Angebot. Pakete ab 395 €, Antwort innerhalb von 24 Stunden.`,
  },
  {
    slug: "ingolstadt",
    name: "Ingolstadt",
    region: "Bayern",
    anfahrt: "knapp eine Stunde",
    intro: "Ingolstadt liegt knapp eine Stunde von Regensburg entfernt — nah genug für kurze Absprachen und flexible Zeiten. Für Firmenfeiern, Hochzeiten und Geburtstage in Ingolstadt und der Region biete ich Close-Up Magie, Bühnenshow und Magic Dinner an.",
    highlight: "Für Firmenfeiern gibt es vorab einen Briefing-Call: Wir klären Ablauf, Tonalität und Themen, die tabu sind — Vertrauliches bleibt vertraulich.",
    einwohner: "140.000",
    bekannteLocations: [
      "Stadttheater Ingolstadt",
      "Kongresszentrum Ingolstadt",
      "Audi Forum Ingolstadt",
      "Saturn Arena",
      "Klenzepark",
    ],
    faq: [
      {
        q: "Was kostet ein Zauberer in Ingolstadt?",
        a: "Pakete starten ab 395 € (Close-Up, 20–30 Minuten). Bühnenshow und Kombi-Programme liegen darüber. Die Anfahrt aus Regensburg — knapp eine Stunde — wird nach Entfernung berechnet und steht transparent im Angebot.",
      },
      {
        q: "Kann die Show auf unser Unternehmen zugeschnitten werden?",
        a: "Ja. Im Briefing-Call vorab sprechen wir über euer Team, den Anlass und die gewünschte Tonalität. Daraus baue ich einzelne Effekte mit Bezug zu euch ein. Was vertraulich ist, bleibt vertraulich, und sensible Themen lassen wir bewusst weg.",
      },
      {
        q: "Kommst du auch nach Eichstätt, Neuburg oder Pfaffenhofen?",
        a: "Ja, die Region um Ingolstadt liegt im Einsatzgebiet. Die Anfahrt wird für den konkreten Ort berechnet und im Angebot ausgewiesen.",
      },
    ],
    seoText: "Emilian Leber bringt Close-Up Magie, Bühnenshow und Mentalmagie zu Firmenfeiern, Hochzeiten und Geburtstagen in Ingolstadt, Eichstätt, Neuburg und Pfaffenhofen — knapp eine Stunde von Regensburg.",
    langText: `Ingolstadt ist Sitz von Audi und MediaMarktSaturn und Hochschulstadt mit der Technischen Hochschule. Viele Feiern sind hier Firmenveranstaltungen — Sommerfeste, Jubiläen, Weihnachtsfeiern mit großem Publikum. Dafür eignet sich die Kombination aus Close-Up beim Empfang und einer Bühnenshow von 15 bis 60 Minuten als festem Programmpunkt.

Für Hochzeiten verteile ich die Magie auf Sektempfang, Dinner und den Moment vor dem Tanz. Für kleinere Feiern bis etwa 30 Gäste reicht Close-Up am Tisch.

Anfahrt und Kosten: Von Regensburg nach Ingolstadt ist es knapp eine Stunde. Die Anfahrt wird nach Entfernung berechnet und steht im Angebot. Für Weihnachtsfeiern empfehle ich 8–12 Wochen Vorlauf, sonst reichen meist 4–6 Wochen. Pakete ab 395 €.`,
  },
  {
    slug: "passau",
    name: "Passau",
    region: "Bayern",
    anfahrt: "gut eine Stunde über die A3",
    intro: "Passau erreiche ich von Regensburg in gut einer Stunde über die A3. Für Hochzeiten, Firmenfeiern und Geburtstage in der Dreiflüssestadt und im Passauer Land biete ich Close-Up Magie und Bühnenshow an.",
    highlight: "Viele Passauer Feiern finden in historischen Räumen oder direkt am Wasser statt. Close-Up braucht keine Bühne und keine Technik — es funktioniert auch dort, wo kein Platz für eine Show ist.",
    einwohner: "53.000",
    bekannteLocations: ["Redoute", "Dreiländerhalle", "Veste Oberhaus", "Hotel Wilder Mann"],
    faq: [
      { q: "Was kostet ein Zauberer in Passau?", a: "Pakete beginnen ab 395 € (Close-Up, 20–30 Minuten). Die Anfahrt aus Regensburg — gut eine Stunde — wird nach Entfernung berechnet und steht transparent im Angebot. Antwort auf deine Anfrage innerhalb von 24 Stunden." },
      { q: "Braucht der Zauberer eine Bühne?", a: "Für Close-Up nicht — ich gehe von Tisch zu Tisch oder von Gruppe zu Gruppe. Für eine Bühnenshow ab etwa 50 Gästen reicht eine freie Fläche, die alle sehen; Headset und Ton bringe ich mit." },
      { q: "Kommst du auch nach Vilshofen oder in den Bayerischen Wald?", a: "Ja, das Umland von Passau liegt im Einsatzgebiet. Die Anfahrt wird für den konkreten Ort berechnet und steht im Angebot." },
    ],
    seoText: "Close-Up Magie und Bühnenshow für Hochzeiten, Firmenfeiern und Geburtstage in Passau und Umgebung — mit Emilian Leber aus Regensburg, gut eine Stunde entfernt.",
    langText: `Passau mit Donau, Inn und Ilz, Universität und historischer Altstadt ist ein beliebter Ort für Hochzeiten und Feiern. Viele Räume sind klein, verwinkelt oder historisch — da passt Close-Up gut, weil es ohne Aufbau auskommt und direkt bei den Gästen stattfindet.

Für Firmenfeiern und größere Hochzeiten ab etwa 50 Gästen kann eine Bühnenshow von 15 bis 60 Minuten dazukommen. Headset und Ton bringe ich mit.

Anfahrt und Kosten: Von Regensburg nach Passau ist es gut eine Stunde über die A3. Die Anfahrt wird nach Entfernung berechnet und im Angebot ausgewiesen. Pakete ab 395 €.`,
  },
  {
    slug: "landshut",
    name: "Landshut",
    region: "Bayern",
    anfahrt: "rund 50 Minuten",
    intro: "Landshut liegt rund 50 Minuten südlich von Regensburg. Für Firmenfeiern, Hochzeiten und Geburtstage in der niederbayerischen Bezirkshauptstadt biete ich Close-Up Magie, Bühnenshow und Magic Dinner an.",
    highlight: "Kurze Anfahrt, schnelle Absprachen: Frag einfach mit Datum, Anlass und Gästezahl an — ich antworte innerhalb von 24 Stunden.",
    einwohner: "75.000",
    bekannteLocations: ["Bernlochner", "Rathaus-Prunksaal", "Sparkassen-Arena"],
    faq: [
      { q: "Was kostet ein Zauberer in Landshut?", a: "Pakete starten ab 395 € (Close-Up, 20–30 Minuten). Die Anfahrt aus Regensburg — rund 50 Minuten — wird nach Entfernung berechnet und steht transparent im Angebot." },
      { q: "Welches Format passt zu einer Hochzeit in Landshut?", a: "Bewährt hat sich die Aufteilung in drei Teile: Close-Up beim Sektempfang, Magie am Tisch während des Dinners und eine kurze Bühnenshow vor dem Eröffnungstanz. Bei kleineren Hochzeiten reicht auch Close-Up allein." },
      { q: "Kommst du auch in den Landkreis Landshut?", a: "Ja, zum Beispiel nach Ergolding, Vilsbiburg oder Rottenburg. Die Anfahrt wird für den Ort berechnet und steht im Angebot." },
    ],
    seoText: "Emilian Leber bringt Close-Up Magie und Bühnenshow zu Firmenfeiern, Hochzeiten und Geburtstagen in Landshut und im Landkreis — rund 50 Minuten von Regensburg.",
    langText: `Landshut ist Bezirkshauptstadt Niederbayerns, bekannt für Burg Trausnitz, die Martinskirche und die Landshuter Hochzeit. Neben der historischen Altstadt gibt es viele Unternehmen und eine Hochschule — entsprechend vielfältig sind die Anlässe: Weihnachtsfeiern, Jubiläen, Hochzeiten, runde Geburtstage.

Für Firmenfeiern empfehle ich Close-Up beim Empfang und eine Bühnenshow von 15 bis 60 Minuten als Programmpunkt. Bei Hochzeiten begleite ich Sektempfang, Dinner und den Moment vor dem Tanz.

Anfahrt und Kosten: Von Regensburg nach Landshut sind es rund 50 Minuten. Die Anfahrt wird nach Entfernung berechnet und steht im Angebot. Pakete ab 395 €, auf Deutsch oder Englisch.`,
  },
  {
    slug: "bamberg",
    name: "Bamberg",
    region: "Bayern",
    anfahrt: "rund 1,5 Stunden",
    intro: "Bamberg erreiche ich von Regensburg aus in rund anderthalb Stunden. Für Hochzeiten, Firmenfeiern und Geburtstage in der Welterbestadt und in Oberfranken biete ich Close-Up Magie, Bühnenshow und Magic Dinner an.",
    highlight: "In Bamberg wird gern in Brauereigaststätten und Kellern gefeiert. Close-Up funktioniert dort gut, weil es keinen Aufbau braucht und direkt am Tisch passiert.",
    einwohner: "78.000",
    bekannteLocations: ["Konzert- und Kongresshalle", "Welcome Hotel Residenzschloss", "Brose Arena"],
    faq: [
      { q: "Was kostet ein Zauberer in Bamberg?", a: "Pakete beginnen ab 395 € (Close-Up, 20–30 Minuten). Die Anfahrt aus Regensburg — rund 1,5 Stunden — wird nach Entfernung berechnet und steht transparent im Angebot." },
      { q: "Passt ein Zauberer zu einer Feier in der Brauerei oder im Bierkeller?", a: "Ja. Close-Up am Tisch passt gut zu geselligen Runden, auch wenn es etwas lauter ist. Für eine Bühnenshow braucht es dagegen einen Moment, in dem alle zuhören — das planen wir im Briefing gemeinsam ein." },
      { q: "Kommst du auch nach Forchheim oder ins Bamberger Land?", a: "Ja, nach Absprache. Die Anfahrt wird für den konkreten Ort berechnet und steht im Angebot." },
    ],
    seoText: "Close-Up Magie, Bühnenshow und Magic Dinner für Hochzeiten, Firmenfeiern und Geburtstage in Bamberg und Oberfranken — mit Emilian Leber aus Regensburg.",
    langText: `Bamberg ist UNESCO-Welterbestadt, Universitätsstadt und für seine Brauereien bekannt. Viele Feiern finden in Brauereigaststätten, Kellern oder historischen Sälen statt. Close-Up passt dazu, weil es ohne Bühne auskommt; für größere Runden ab etwa 50 Gästen kommt eine Bühnenshow von 15 bis 60 Minuten dazu.

Bei Hochzeiten verteile ich die Magie auf Sektempfang, Dinner und den Moment vor dem Tanz. Bei Firmenfeiern ist die Kombination aus Close-Up beim Empfang und einer kurzen Show als Programmpunkt am häufigsten gefragt.

Anfahrt und Kosten: Von Regensburg nach Bamberg sind es rund 1,5 Stunden. Die Anfahrt wird nach Entfernung berechnet und im Angebot ausgewiesen. Pakete ab 395 €.`,
  },
  {
    slug: "bayreuth",
    name: "Bayreuth",
    region: "Bayern",
    anfahrt: "gut 1,5 Stunden",
    intro: "Bayreuth liegt gut anderthalb Stunden von Regensburg entfernt. Für Firmenfeiern, Galas, Hochzeiten und Geburtstage in Bayreuth und Oberfranken biete ich Close-Up Magie, Bühnenshow und Magic Dinner an.",
    highlight: "Rund um die Festspiele im Sommer gibt es in Bayreuth viele Empfänge. Dafür eignet sich Close-Up als Walk-Around — ohne Bühne, direkt bei den Gästen.",
    einwohner: "75.000",
    bekannteLocations: ["Friedrichsforum (ehemals Stadthalle)", "Maisel's Bier-Erlebnis-Welt"],
    faq: [
      { q: "Was kostet ein Zauberer in Bayreuth?", a: "Pakete starten ab 395 € (Close-Up, 20–30 Minuten). Die Anfahrt aus Regensburg — gut 1,5 Stunden — wird nach Entfernung berechnet und steht transparent im Angebot." },
      { q: "Eignet sich Zauberei für einen Empfang oder ein Rahmenprogramm während der Festspielzeit?", a: "Ja. Für Empfänge passt Close-Up als Walk-Around: Ich gehe von Gruppe zu Gruppe, ohne dass jemand Platz nehmen muss. Die Tonalität stimmen wir auf den Rahmen ab — auch elegant und leise, wenn es der Anlass verlangt." },
      { q: "Wie früh sollte ich anfragen?", a: "Für Weihnachtsfeiern und Hochzeiten in der Hochsaison am besten 8–12 Wochen vorher, sonst reichen meist 4–6 Wochen. Anfragen beantworte ich innerhalb von 24 Stunden." },
    ],
    seoText: "Zauberkunst für Bayreuth: Close-Up Magie für Empfänge, Bühnenshow für Galas und Firmenfeiern, Magie für Hochzeiten und Geburtstage — mit Emilian Leber aus Regensburg.",
    langText: `Bayreuth ist durch die Richard-Wagner-Festspiele und das Markgräfliche Opernhaus bekannt, dazu Universitätsstadt. Neben Firmenfeiern und Hochzeiten gibt es hier viele Empfänge mit kulturellem Rahmen. Für solche Anlässe eignet sich Close-Up als Walk-Around, weil es die Gespräche der Gäste ergänzt statt sie zu unterbrechen.

Für Galas und Firmenfeiern mit festem Programmteil kommt eine Bühnenshow von 15 bis 60 Minuten dazu. Bei Hochzeiten begleite ich Sektempfang, Dinner und den Moment vor dem Tanz.

Anfahrt und Kosten: Von Regensburg nach Bayreuth sind es gut 1,5 Stunden. Die Anfahrt wird nach Entfernung berechnet; bei spätem Ende kann eine Übernachtung sinnvoll sein. Beides steht vorab im Angebot. Pakete ab 395 €.`,
  },
  {
    slug: "erlangen",
    name: "Erlangen",
    region: "Bayern",
    anfahrt: "rund 1,25 Stunden",
    intro: "Erlangen erreiche ich von Regensburg in rund einer Stunde und 15 Minuten. Für Firmenfeiern, Hochzeiten und Geburtstage in der Universitätsstadt biete ich Close-Up Magie, Bühnenshow und Mentalmagie an.",
    highlight: "Erlangen ist geprägt von Forschung, Medizintechnik und Universität. Viele Teams sind international — die Show gibt es deshalb auch auf Englisch.",
    einwohner: "115.000",
    bekannteLocations: ["Heinrich-Lades-Halle", "E-Werk", "Redoutensaal"],
    faq: [
      { q: "Was kostet ein Zauberer in Erlangen?", a: "Pakete beginnen ab 395 € (Close-Up, 20–30 Minuten). Die Anfahrt aus Regensburg — rund 1,25 Stunden — wird nach Entfernung berechnet und steht transparent im Angebot." },
      { q: "Funktioniert die Show auch für ein internationales Team?", a: "Ja. Close-Up und Bühnenshow gibt es auf Deutsch und Englisch. Welche Sprache besser passt, klären wir im Briefing-Call." },
      { q: "Kommst du auch nach Herzogenaurach oder Fürth?", a: "Ja, die Metropolregion Nürnberg liegt im Einsatzgebiet. Die Anfahrt wird für den konkreten Ort berechnet und steht im Angebot." },
    ],
    seoText: "Close-Up Magie, Mentalmagie und Bühnenshow für Firmenfeiern, Hochzeiten und Geburtstage in Erlangen — auf Deutsch oder Englisch, mit Emilian Leber aus Regensburg.",
    langText: `Erlangen ist Universitätsstadt und Standort großer Unternehmen aus Medizintechnik und Industrie, dazu Forschungseinrichtungen wie Fraunhofer. Für ein Publikum, das gern mitdenkt, ist Mentalmagie eine gute Wahl — Effekte, bei denen die Gäste selbst Teil des Experiments sind.

Für Firmenfeiern empfehle ich Close-Up beim Empfang und eine Bühnenshow von 15 bis 60 Minuten. Die Show gibt es auf Deutsch und Englisch. Bei Hochzeiten begleite ich Sektempfang, Dinner und den Moment vor dem Tanz.

Anfahrt und Kosten: Von Regensburg nach Erlangen sind es rund 1,25 Stunden. Die Anfahrt wird nach Entfernung berechnet und steht im Angebot. Pakete ab 395 €.`,
  },
  {
    slug: "fuerth",
    name: "Fürth",
    region: "Bayern",
    anfahrt: "gut eine Stunde",
    intro: "Fürth erreiche ich von Regensburg in gut einer Stunde. Für Firmenfeiern, Hochzeiten und Geburtstage in der Kleeblattstadt biete ich Close-Up Magie, Bühnenshow und Magic Dinner an.",
    highlight: "Fürth und Nürnberg liegen direkt nebeneinander — für Veranstaltungen in beiden Städten gelten die gleichen Formate, nur die Anfahrt wird für den genauen Ort berechnet.",
    einwohner: "130.000",
    bekannteLocations: ["Stadthalle Fürth", "Kulturforum Fürth"],
    faq: [
      { q: "Was kostet ein Zauberer in Fürth?", a: "Pakete starten ab 395 € (Close-Up, 20–30 Minuten). Die Anfahrt aus Regensburg — gut eine Stunde — wird nach Entfernung berechnet und steht transparent im Angebot." },
      { q: "Welches Format passt zu einem runden Geburtstag?", a: "Bei bis zu etwa 30 Gästen reicht meist Close-Up am Tisch — persönlich, ohne Aufbau. Bei größeren Feiern kann eine kurze Bühnenshow dazukommen, in die ich auf Wunsch Geschichten über das Geburtstagskind einbaue." },
      { q: "Kommst du auch nach Nürnberg, Erlangen oder Zirndorf?", a: "Ja, die ganze Metropolregion liegt im Einsatzgebiet. Die Anfahrt steht für jeden Ort vorab im Angebot." },
    ],
    seoText: "Emilian Leber bringt Close-Up Magie und Bühnenshow zu Firmenfeiern, Hochzeiten und Geburtstagen in Fürth und der Metropolregion Nürnberg — gut eine Stunde von Regensburg.",
    langText: `Fürth ist eigenständige Großstadt direkt neben Nürnberg, mit historischer Altstadt und vielen Gaststätten und Sälen für Feiern. Die Anlässe reichen vom runden Geburtstag im Familienkreis bis zur Firmenfeier mit mehreren hundert Gästen.

Für kleine Feiern bis etwa 30 Gäste eignet sich Close-Up am Tisch. Für Firmenfeiern und größere Hochzeiten kommt eine Bühnenshow von 15 bis 60 Minuten dazu, Headset und Ton bringe ich mit.

Anfahrt und Kosten: Von Regensburg nach Fürth ist es gut eine Stunde. Die Anfahrt wird nach Entfernung berechnet und steht im Angebot. Pakete ab 395 €, Antwort innerhalb von 24 Stunden.`,
  },
  {
    slug: "rosenheim",
    name: "Rosenheim",
    region: "Bayern",
    anfahrt: "rund zwei Stunden",
    intro: "Rosenheim liegt am Rand meines Einsatzgebiets, rund zwei Stunden von Regensburg. Für Firmenfeiern, Hochzeiten und Geburtstage in Rosenheim und im Inntal biete ich Close-Up Magie, Bühnenshow und Magic Dinner an.",
    highlight: "Bei rund zwei Stunden Anfahrt planen wir Zeiten und Aufbau genau — und klären vorab, ob bei spätem Ende eine Übernachtung sinnvoll ist. Alles steht im Angebot, bevor du zusagst.",
    einwohner: "65.000",
    bekannteLocations: ["Kultur + Kongress Zentrum (KU'KO)", "Schloss Maxlrain (Umgebung)"],
    faq: [
      { q: "Was kostet ein Zauberer in Rosenheim?", a: "Pakete beginnen ab 395 € (Close-Up, 20–30 Minuten). Die Anfahrt aus Regensburg — rund zwei Stunden — wird nach Entfernung berechnet; bei spätem Ende kann eine Übernachtung dazukommen. Beides steht vorab transparent im Angebot." },
      { q: "Kommst du auch an den Chiemsee?", a: "Nach Absprache ja. Orte am Chiemsee liegen etwas weiter als Rosenheim selbst — ob und wie es passt, klären wir anhand von Datum und Uhrzeit. Die Anfahrt steht vorher im Angebot." },
      { q: "Lohnt sich bei der Anfahrt ein längeres Programm?", a: "Häufig ja. Da die Anfahrt ohnehin anfällt, kann sich die Kombination aus Close-Up beim Empfang und einer Bühnenshow später am Abend lohnen. Welche Länge zu eurem Ablauf passt, besprechen wir im Briefing-Call." },
    ],
    seoText: "Close-Up Magie, Bühnenshow und Magic Dinner für Firmenfeiern, Hochzeiten und Geburtstage in Rosenheim und im Inntal — mit Emilian Leber aus Regensburg, Anfahrt transparent im Angebot.",
    langText: `Rosenheim liegt zwischen München und den Alpen am Inn, bekannt unter anderem für das Herbstfest und die Hochschule. Viele Hochzeiten in der Region finden in Gasthöfen, auf Schlössern oder in Locations mit Bergblick statt, dazu kommen Firmenfeiern von Mittelstand und Industrie.

Für Hochzeiten begleite ich Sektempfang, Dinner und den Moment vor dem Tanz. Für Firmenfeiern empfehle ich Close-Up beim Empfang und eine Bühnenshow von 15 bis 60 Minuten.

Anfahrt und Kosten: Rosenheim liegt rund zwei Stunden von Regensburg und damit am Rand meines Einsatzgebiets. Die Anfahrt wird nach Entfernung berechnet, eine Übernachtung bei spätem Ende klären wir vorab. Beides steht im Angebot. Pakete ab 395 €.`,
  },
  {
    slug: "straubing",
    name: "Straubing",
    region: "Bayern",
    anfahrt: "rund 40 Minuten über die A3",
    intro: "Straubing liegt rund 40 Minuten von Regensburg entfernt, direkt über die A3. Für Firmenfeiern, Hochzeiten und Geburtstage im Gäuboden biete ich Close-Up Magie, Bühnenshow und Magic Dinner an.",
    highlight: "Straubing liegt so nah, dass die Anfahrt kaum ins Gewicht fällt. Auch kurzfristige Anfragen prüfe ich gern — Antwort innerhalb von 24 Stunden.",
    einwohner: "48.000",
    bekannteLocations: ["Joseph-von-Fraunhofer-Halle", "Hotel Asam"],
    faq: [
      { q: "Was kostet ein Zauberer in Straubing?", a: "Pakete starten ab 395 € (Close-Up, 20–30 Minuten). Die Anfahrt aus Regensburg — rund 40 Minuten — wird nach Entfernung berechnet und steht transparent im Angebot." },
      { q: "Funktioniert Zauberei rund ums Gäubodenvolksfest?", a: "Für Empfänge, Firmenabende oder Feiern in ruhigeren Bereichen ja — Close-Up funktioniert, solange man sich am Tisch unterhalten kann. Mitten im lauten Festzelt ist eine Bühnenshow dagegen nicht sinnvoll. Wie dein Rahmen aussieht, klären wir im Briefing." },
      { q: "Kommst du auch in den Landkreis Straubing-Bogen?", a: "Ja, zum Beispiel nach Bogen oder Mallersdorf-Pfaffenberg. Die Anfahrt wird für den Ort berechnet und steht im Angebot." },
    ],
    seoText: "Emilian Leber bringt Close-Up Magie und Bühnenshow zu Firmenfeiern, Hochzeiten und Geburtstagen in Straubing und im Gäuboden — rund 40 Minuten von Regensburg.",
    langText: `Straubing ist bekannt für das Gäubodenvolksfest und als Standort des TUM Campus Straubing. Die Stadt ist von Regensburg aus schnell erreichbar, was Planung und Absprachen einfach macht.

Für Firmenfeiern empfehle ich Close-Up beim Empfang und eine Bühnenshow von 15 bis 60 Minuten. Bei Hochzeiten begleite ich Sektempfang, Dinner und den Moment vor dem Tanz; bei kleineren Feiern bis etwa 30 Gäste reicht Close-Up am Tisch.

Anfahrt und Kosten: Von Regensburg nach Straubing sind es rund 40 Minuten über die A3. Die Anfahrt wird nach Entfernung berechnet und steht im Angebot. Pakete ab 395 €.`,
  },
  {
    slug: "freising",
    name: "Freising",
    region: "Bayern",
    anfahrt: "gut eine Stunde",
    intro: "Freising erreiche ich von Regensburg in gut einer Stunde. Für Firmenfeiern, Konferenzen, Hochzeiten und Geburtstage in Freising und rund um den Münchner Flughafen biete ich Close-Up Magie und Bühnenshow an — auf Deutsch oder Englisch.",
    highlight: "Rund um den Flughafen finden viele Tagungen mit internationalen Gästen statt. Close-Up und Bühnenshow gibt es auch auf Englisch — zum Beispiel als Programmpunkt am Konferenzabend.",
    einwohner: "50.000",
    bekannteLocations: ["Luitpoldhalle", "Hotels am Flughafen München"],
    faq: [
      { q: "Was kostet ein Zauberer in Freising?", a: "Pakete beginnen ab 395 € (Close-Up, 20–30 Minuten). Die Anfahrt aus Regensburg — gut eine Stunde — wird nach Entfernung berechnet und steht transparent im Angebot." },
      { q: "Eignet sich Zauberei für einen Konferenz- oder Tagungsabend?", a: "Ja. Close-Up beim Get-together bringt Teilnehmende ins Gespräch, eine Bühnenshow von 15 bis 60 Minuten passt als Programmpunkt nach dem Abendessen. Beides auf Deutsch oder Englisch." },
      { q: "Kommst du auch nach Erding oder Moosburg?", a: "Ja, das Umland liegt im Einsatzgebiet. Die Anfahrt wird für den konkreten Ort berechnet und steht im Angebot." },
    ],
    seoText: "Close-Up Magie und Bühnenshow für Firmenfeiern, Tagungen und Hochzeiten in Freising und am Münchner Flughafen — auf Deutsch oder Englisch, mit Emilian Leber aus Regensburg.",
    langText: `Freising ist Domstadt, Hochschulstandort mit dem Campus Weihenstephan und direkter Nachbar des Münchner Flughafens. Viele Veranstaltungen hier sind Tagungen und Konferenzen mit Gästen aus aller Welt, dazu Hochzeiten und Firmenfeiern aus der Region.

Für Tagungsabende und Firmenfeiern empfehle ich Close-Up beim Get-together und eine Bühnenshow von 15 bis 60 Minuten — auf Deutsch oder Englisch. Bei Hochzeiten begleite ich Sektempfang, Dinner und den Moment vor dem Tanz.

Anfahrt und Kosten: Von Regensburg nach Freising ist es gut eine Stunde. Die Anfahrt wird nach Entfernung berechnet und steht im Angebot. Pakete ab 395 €.`,
  },
  {
    slug: "amberg",
    name: "Amberg",
    region: "Bayern",
    anfahrt: "knapp eine Stunde",
    intro: "Amberg liegt wie Regensburg in der Oberpfalz, knapp eine Stunde entfernt. Für Firmenfeiern, Hochzeiten und Geburtstage in Amberg und im Landkreis Amberg-Sulzbach biete ich Close-Up Magie, Bühnenshow und Magic Dinner an.",
    highlight: "Amberg und Regensburg liegen beide in der Oberpfalz — die Anfahrt ist überschaubar und steht transparent im Angebot.",
    einwohner: "42.000",
    bekannteLocations: ["Amberger Congress Centrum (ACC)", "Stadttheater Amberg"],
    faq: [
      { q: "Was kostet ein Zauberer in Amberg?", a: "Pakete starten ab 395 € (Close-Up, 20–30 Minuten). Die Anfahrt aus Regensburg — knapp eine Stunde — wird nach Entfernung berechnet und steht transparent im Angebot." },
      { q: "Was braucht es für eine Bühnenshow im Saal?", a: "Eine freie Fläche, die alle Gäste sehen können, und einen kurzen Moment Ruhe im Ablauf. Headset und Ton bringe ich mit; einen Tech-Rider gibt es auf Anfrage. Aufbau etwa 30 Minuten vor Beginn." },
      { q: "Kommst du auch nach Sulzbach-Rosenberg oder Schwandorf?", a: "Ja, die ganze Oberpfalz liegt im Einsatzgebiet. Die Anfahrt wird für den Ort berechnet und steht im Angebot." },
    ],
    seoText: "Emilian Leber bringt Close-Up Magie und Bühnenshow zu Firmenfeiern, Hochzeiten und Geburtstagen in Amberg und der Oberpfalz — knapp eine Stunde von Regensburg.",
    langText: `Amberg ist eine der alten Oberpfälzer Städte mit gut erhaltener Altstadt, dazu Hochschulstandort und Sitz mehrerer Industrieunternehmen. Typische Anlässe sind Weihnachtsfeiern und Jubiläen, Hochzeiten und runde Geburtstage.

Für Firmenfeiern empfehle ich Close-Up beim Empfang und eine Bühnenshow von 15 bis 60 Minuten. Bei Hochzeiten begleite ich Sektempfang, Dinner und den Moment vor dem Tanz; kleine Feiern bis etwa 30 Gäste funktionieren mit Close-Up am Tisch.

Anfahrt und Kosten: Von Regensburg nach Amberg ist es knapp eine Stunde. Die Anfahrt wird nach Entfernung berechnet und steht im Angebot. Pakete ab 395 €.`,
  },
  {
    slug: "weiden-in-der-oberpfalz",
    name: "Weiden in der Oberpfalz",
    region: "Bayern",
    anfahrt: "rund eine Stunde über die A93",
    intro: "Weiden erreiche ich von Regensburg in rund einer Stunde über die A93. Für Firmenfeiern, Hochzeiten und Geburtstage in Weiden und der nördlichen Oberpfalz biete ich Close-Up Magie, Bühnenshow und Magic Dinner an.",
    highlight: "Weiden ist das Zentrum der nördlichen Oberpfalz — auch Feiern in Neustadt an der Waldnaab, Tirschenreuth oder Vohenstrauß sind von hier gut erreichbar.",
    einwohner: "42.000",
    bekannteLocations: ["Max-Reger-Halle"],
    faq: [
      { q: "Was kostet ein Zauberer in Weiden?", a: "Pakete beginnen ab 395 € (Close-Up, 20–30 Minuten). Die Anfahrt aus Regensburg — rund eine Stunde — wird nach Entfernung berechnet und steht transparent im Angebot. Antwort auf deine Anfrage innerhalb von 24 Stunden." },
      { q: "Eignet sich ein Zauberer für eine Weihnachtsfeier in Weiden?", a: "Ja. Bewährt hat sich Close-Up beim Empfang und eine Bühnenshow von 15 bis 60 Minuten nach dem Essen. Die Tonalität stimmen wir im Briefing auf euer Team ab. Für Dezember-Termine am besten 8–12 Wochen vorher anfragen." },
      { q: "Kommst du auch nach Tirschenreuth oder Neustadt an der Waldnaab?", a: "Ja, die nördliche Oberpfalz liegt im Einsatzgebiet. Die Anfahrt wird für den Ort berechnet und steht im Angebot." },
    ],
    seoText: "Close-Up Magie, Bühnenshow und Magic Dinner für Firmenfeiern, Hochzeiten und Geburtstage in Weiden und der nördlichen Oberpfalz — mit Emilian Leber aus Regensburg.",
    langText: `Weiden ist Oberzentrum der nördlichen Oberpfalz und Standort der OTH Amberg-Weiden. Typische Anlässe sind Weihnachtsfeiern und Jubiläen von Unternehmen, Hochzeiten und runde Geburtstage.

Für Firmenfeiern empfehle ich Close-Up beim Empfang und eine Bühnenshow von 15 bis 60 Minuten. Bei Hochzeiten begleite ich Sektempfang, Dinner und den Moment vor dem Tanz.

Anfahrt und Kosten: Von Regensburg nach Weiden ist es rund eine Stunde über die A93. Die Anfahrt wird nach Entfernung berechnet und steht im Angebot. Pakete ab 395 €.`,
  },
  {
    slug: "deggendorf",
    name: "Deggendorf",
    region: "Bayern",
    anfahrt: "rund 50 Minuten über die A3",
    intro: "Deggendorf liegt rund 50 Minuten von Regensburg entfernt, über die A3. Für Hochzeiten, Firmenfeiern und Geburtstage in Deggendorf und am Rand des Bayerischen Waldes biete ich Close-Up Magie, Bühnenshow und Magic Dinner an.",
    highlight: "Viele Hochzeiten in der Region finden in Hotels und Gasthöfen im Bayerischen Wald statt. Close-Up braucht keinen Aufbau und passt in jeden Raum; für die Bühnenshow reicht eine freie Fläche.",
    einwohner: "33.000",
    bekannteLocations: ["Stadthalle Deggendorf", "Kapuzinerstadl"],
    faq: [
      { q: "Was kostet ein Zauberer in Deggendorf?", a: "Pakete starten ab 395 € (Close-Up, 20–30 Minuten). Die Anfahrt aus Regensburg — rund 50 Minuten — wird nach Entfernung berechnet und steht transparent im Angebot." },
      { q: "Kommst du auch zu Hochzeits-Locations im Bayerischen Wald?", a: "Ja. Die Anfahrt wird für die konkrete Location berechnet und steht vorab im Angebot. Bei abgelegenen Orten klären wir vorher kurz Zufahrt und Aufbau." },
      { q: "Welches Format passt zu einer Hochzeit?", a: "Meist Close-Up beim Sektempfang, Magie am Tisch während des Dinners und eine kurze Bühnenshow vor dem Eröffnungstanz. Bei kleineren Hochzeiten reicht Close-Up allein." },
    ],
    seoText: "Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Geburtstagen in Deggendorf und im Bayerischen Wald — rund 50 Minuten von Regensburg.",
    langText: `Deggendorf liegt an der Donau am Übergang zum Bayerischen Wald und ist Standort der Technischen Hochschule Deggendorf. Typische Anlässe in der Region sind Hochzeiten in Hotels und Gasthöfen sowie Firmenfeiern von Mittelstand und Industrie.

Für Hochzeiten begleite ich Sektempfang, Dinner und den Moment vor dem Tanz. Für Firmenfeiern empfehle ich Close-Up beim Empfang und eine Bühnenshow von 15 bis 60 Minuten.

Anfahrt und Kosten: Von Regensburg nach Deggendorf sind es rund 50 Minuten über die A3. Die Anfahrt wird nach Entfernung berechnet und steht im Angebot. Pakete ab 395 €.`,
  },
  {
    slug: "erding",
    name: "Erding",
    region: "Bayern",
    anfahrt: "gut eine Stunde",
    intro: "Erding erreiche ich von Regensburg in gut einer Stunde. Für Firmenfeiern, Hochzeiten und Geburtstage in Erding und im Landkreis biete ich Close-Up Magie, Bühnenshow und Magic Dinner an.",
    highlight: "Erding liegt nah am Münchner Flughafen — bei Veranstaltungen mit internationalen Gästen gibt es das Programm auch auf Englisch.",
    einwohner: "37.000",
    bekannteLocations: ["Stadthalle Erding"],
    faq: [
      { q: "Was kostet ein Zauberer in Erding?", a: "Pakete beginnen ab 395 € (Close-Up, 20–30 Minuten). Die Anfahrt aus Regensburg — gut eine Stunde — wird nach Entfernung berechnet und steht transparent im Angebot." },
      { q: "Passt Zauberei zu einem Sommerfest oder einer Feier im Biergarten?", a: "Close-Up ja — ich gehe von Tisch zu Tisch, auch draußen. Eine Bühnenshow braucht dagegen einen Moment, in dem alle zuhören, und bei Tageslicht eine gut sichtbare Fläche. Das planen wir im Briefing ein." },
      { q: "Kommst du auch nach Dorfen oder Freising?", a: "Ja, das Umland liegt im Einsatzgebiet. Die Anfahrt wird für den Ort berechnet und steht im Angebot." },
    ],
    seoText: "Close-Up Magie und Bühnenshow für Firmenfeiern, Sommerfeste, Hochzeiten und Geburtstage in Erding — mit Emilian Leber aus Regensburg, auf Deutsch oder Englisch.",
    langText: `Erding ist bekannt für die Therme, das Weißbier und das Herbstfest und liegt nah am Münchner Flughafen. Neben Firmenfeiern und Hochzeiten gibt es hier viele Sommerfeste und Feiern im Freien.

Für Feiern draußen und im Biergarten eignet sich Close-Up, weil es ohne Bühne und Technik auskommt. Für Firmenfeiern mit festem Programmteil kommt eine Bühnenshow von 15 bis 60 Minuten dazu. Bei Hochzeiten begleite ich Sektempfang, Dinner und den Moment vor dem Tanz.

Anfahrt und Kosten: Von Regensburg nach Erding ist es gut eine Stunde. Die Anfahrt wird nach Entfernung berechnet und steht im Angebot. Pakete ab 395 €.`,
  },
  {
    slug: "kelheim",
    name: "Kelheim",
    region: "Bayern",
    anfahrt: "rund 30 Minuten",
    intro: "Kelheim liegt nur rund 30 Minuten von Regensburg entfernt. Für Hochzeiten, Firmenfeiern und Geburtstage in Kelheim, rund um Weltenburg und im Altmühltal biete ich Close-Up Magie, Bühnenshow und Magic Dinner an.",
    highlight: "Kurze Anfahrt, geringe Anfahrtskosten: Kelheim, Weltenburg und das untere Altmühltal liegen direkt vor der Regensburger Haustür.",
    einwohner: "16.000",
    faq: [
      { q: "Was kostet ein Zauberer in Kelheim?", a: "Pakete starten ab 395 € (Close-Up, 20–30 Minuten). Die Anfahrt aus Regensburg — rund 30 Minuten — wird nach Entfernung berechnet und steht transparent im Angebot." },
      { q: "Kommst du auch zu Hochzeiten in Weltenburg oder im Altmühltal?", a: "Ja, die Region liegt direkt vor meiner Haustür. Die Anfahrt wird für die konkrete Location berechnet und steht im Angebot." },
      { q: "Gibt es das Magic Dinner auch in der Nähe von Kelheim?", a: "Ja. Das Magic Dinner findet im Restaurant Wald & Wiese in Sinzing bei Regensburg statt — von Kelheim aus schnell erreichbar — oder in eurer eigenen Location." },
    ],
    seoText: "Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Geburtstagen in Kelheim, Weltenburg und im Altmühltal — rund 30 Minuten von Regensburg.",
    langText: `Kelheim liegt an der Mündung der Altmühl in die Donau, mit der Befreiungshalle über der Stadt und dem Donaudurchbruch zum Kloster Weltenburg. Die Landschaft macht die Gegend beliebt für Hochzeiten und Feiern im kleineren Rahmen.

Für Hochzeiten begleite ich Sektempfang, Dinner und den Moment vor dem Tanz. Für Firmenfeiern empfehle ich Close-Up beim Empfang und eine Bühnenshow von 15 bis 60 Minuten. Das Magic Dinner findet im Restaurant Wald & Wiese in Sinzing oder in eurer Location statt.

Anfahrt und Kosten: Von Regensburg nach Kelheim sind es rund 30 Minuten. Die Anfahrt wird nach Entfernung berechnet und steht im Angebot. Pakete ab 395 €.`,
  },
  {
    slug: "neumarkt-in-der-oberpfalz",
    name: "Neumarkt in der Oberpfalz",
    region: "Bayern",
    anfahrt: "rund 45 Minuten über die A3",
    intro: "Neumarkt liegt zwischen Regensburg und Nürnberg, rund 45 Minuten über die A3. Für Firmenfeiern, Hochzeiten und Geburtstage in Neumarkt und im Oberpfälzer Jura biete ich Close-Up Magie, Bühnenshow und Magic Dinner an.",
    highlight: "Neumarkt liegt an der A3 Richtung Nürnberg — die Anfahrt ist kurz und steht transparent im Angebot. Antwort auf Anfragen innerhalb von 24 Stunden.",
    einwohner: "40.000",
    bekannteLocations: ["Historischer Reitstadel"],
    faq: [
      { q: "Was kostet ein Zauberer in Neumarkt in der Oberpfalz?", a: "Pakete beginnen ab 395 € (Close-Up, 20–30 Minuten). Die Anfahrt aus Regensburg — rund 45 Minuten — wird nach Entfernung berechnet und steht transparent im Angebot." },
      { q: "Welches Format passt zu einer Firmenfeier?", a: "Meist Close-Up beim Empfang und eine Bühnenshow von 15 bis 60 Minuten nach dem Essen. Im Briefing-Call klären wir Anlass, Publikum und Tonalität, damit die Show zu eurem Team passt." },
      { q: "Kommst du auch nach Berching, Parsberg oder Velburg?", a: "Ja, der Landkreis Neumarkt liegt im Einsatzgebiet. Die Anfahrt wird für den Ort berechnet und steht im Angebot." },
    ],
    seoText: "Close-Up Magie und Bühnenshow für Firmenfeiern, Hochzeiten und Geburtstage in Neumarkt in der Oberpfalz — mit Emilian Leber aus Regensburg, rund 45 Minuten entfernt.",
    langText: `Neumarkt in der Oberpfalz liegt verkehrsgünstig an der A3 zwischen Regensburg und Nürnberg, mit einem starken Mittelstand. Typische Anlässe sind Firmenfeiern, Hochzeiten und runde Geburtstage.

Für Firmenfeiern empfehle ich Close-Up beim Empfang und eine Bühnenshow von 15 bis 60 Minuten. Bei Hochzeiten begleite ich Sektempfang, Dinner und den Moment vor dem Tanz; kleine Feiern bis etwa 30 Gäste funktionieren mit Close-Up am Tisch.

Anfahrt und Kosten: Von Regensburg nach Neumarkt sind es rund 45 Minuten über die A3. Die Anfahrt wird nach Entfernung berechnet und steht im Angebot. Pakete ab 395 €.`,
  },
  {
    slug: "cham",
    name: "Cham",
    region: "Bayern",
    anfahrt: "knapp eine Stunde",
    intro: "Cham liegt knapp eine Stunde nordöstlich von Regensburg. Für Hochzeiten, Firmenfeiern und Geburtstage in Cham und im Landkreis biete ich Close-Up Magie, Bühnenshow und Magic Dinner an.",
    highlight: "Viele Feiern im Landkreis Cham finden in Gasthöfen und Hotels auf dem Land statt. Close-Up braucht keinen Aufbau, für die Bühnenshow reicht eine freie Fläche — Headset und Ton bringe ich mit.",
    einwohner: "17.000",
    faq: [
      { q: "Was kostet ein Zauberer in Cham?", a: "Pakete starten ab 395 € (Close-Up, 20–30 Minuten). Die Anfahrt aus Regensburg — knapp eine Stunde — wird nach Entfernung berechnet und steht transparent im Angebot." },
      { q: "Kommst du auch nach Roding, Furth im Wald oder Bad Kötzting?", a: "Ja, der Landkreis Cham liegt im Einsatzgebiet. Die Anfahrt wird für den Ort berechnet und steht im Angebot." },
      { q: "Wie früh sollte ich für eine Weihnachtsfeier anfragen?", a: "Für Dezember-Termine am besten 8–12 Wochen vorher, die Freitage und Samstage sind zuerst vergeben. Sonst reichen meist 4–6 Wochen. Anfragen beantworte ich innerhalb von 24 Stunden." },
    ],
    seoText: "Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Geburtstagen in Cham und im Landkreis — knapp eine Stunde von Regensburg.",
    langText: `Cham ist Kreisstadt im Osten der Oberpfalz, am Übergang zum Bayerischen Wald. Typische Anlässe im Landkreis sind Hochzeiten in Gasthöfen und Hotels, Weihnachtsfeiern von Unternehmen und runde Geburtstage.

Für Firmenfeiern empfehle ich Close-Up beim Empfang und eine Bühnenshow von 15 bis 60 Minuten. Bei Hochzeiten begleite ich Sektempfang, Dinner und den Moment vor dem Tanz.

Anfahrt und Kosten: Von Regensburg nach Cham ist es knapp eine Stunde. Die Anfahrt wird nach Entfernung berechnet und steht im Angebot. Pakete ab 395 €.`,
  },
];

/** Format×Stadt-Seiten (/zauberer-hochzeit/…, /magic-dinner-…) gibt es nur hier. */
export const SERVICE_STADT_SLUGS: readonly string[] = ["regensburg"];
