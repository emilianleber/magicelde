import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useRef, useState } from "react";
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, Stats, FactsGrid, Statement, ReviewsBlock, LogoMarquee, FinalCTA, SectionHeader } from "@/components/voltage/sections";
import { SplitFeature } from "@/components/voltage/creative";
import { COBALT, MAGENTA, INK, WHITE, L_LINE, L_DIM, PAPER } from "@/components/voltage/theme";
import { captureEmail, markEmailSubmitted } from "@/lib/emailCapture";
import {
  Search,
  Send,
  CheckCircle2,
  Calendar,
  Sparkles,
  Wrench,
  Coins,
  Info,
  ChevronDown,
} from "lucide-react";
import heroImg from "@/assets/emilian-portrait-cards.jpg";
import splitImg from "@/assets/audience-reactions.jpg";

const ACCENT = "#1D3FFF";
const ACCENT_DEEP = "#1233CC";

/* ════════════════════════════════════════════════════════
   FAQ-DATEN — 25+ Fragen über 5 Kategorien
   ════════════════════════════════════════════════════════ */
type TabKey =
  | "allgemein"
  | "buchung"
  | "formate"
  | "technik"
  | "preise";

type FAQItemT = {
  id: string;
  category: TabKey;
  q: string;
  a: string;
};

const FAQ_ITEMS: FAQItemT[] = [
  /* ───────── Allgemein ───────── */
  {
    id: "wer-ist-emilian",
    category: "allgemein",
    q: "Wer ist Emilian Leber?",
    a: "Geboren 2008, Magier seit dem 8. Lebensjahr, erster bezahlter Gig mit 12. Heute hauptberuflich als Bühnen-, Close-Up- und Magic-Dinner-Künstler — Schwerpunkt Bayern, deutschlandweit buchbar. 5,0 Sterne bei 30+ verifizierten Bewertungen, über 200 gespielte Events seit 2015.",
  },
  {
    id: "wo-trete-ich-auf",
    category: "allgemein",
    q: "Wo trete ich auf?",
    a: "Schwerpunkt Bayern — Regensburg, München, Nürnberg, Augsburg, Ingolstadt, Passau, Landshut. Deutschlandweit gerne mit transparent kalkulierter Anfahrt. Österreich und Schweiz auf Anfrage, ggf. mit Übernachtung.",
  },
  {
    id: "sprachen",
    category: "allgemein",
    q: "In welcher Sprache trete ich auf?",
    a: "Standard ist Deutsch. Englische Shows sind auf Anfrage möglich — z. B. internationale Firmen-Events, B2B-Galas mit ausländischen Gästen oder Hochzeiten mit englischsprachigen Partnern.",
  },
  {
    id: "tonalitaet",
    category: "allgemein",
    q: "Wie ist meine Tonalität?",
    a: "Vom feinen Premium-Auftritt für Vorstands-Galas bis zur Comedy-lastigen Show für Geburtstage und Hochzeiten — alles innerhalb derselben Künstlerpersönlichkeit, dosiert nach Anlass. Wir besprechen Erwartung und No-Gos vorab.",
  },
  {
    id: "auszeichnungen",
    category: "allgemein",
    q: "Welche Auszeichnungen habe ich?",
    a: "Greatest Talent 2023 — Finalist (TV-Show, SAT.1). Talents of Magic 2024 — Finalist + Kreativpreis. Deutsche Jugendmeisterschaft der Magie — Top 30. TVA-TV-Interview 2025. 5,0 Sterne auf ProvenExpert und Google.",
  },
  {
    id: "seit-wann",
    category: "allgemein",
    q: "Seit wann mache ich Zauberei?",
    a: "Erster Trick mit 8 Jahren — Münzen verschwinden lassen am Esstisch. Mit 12 erster bezahlter Auftritt (Kindergeburtstag), mit 16 das erste TVA-Interview. Heute hauptberuflich, mit eigener abendfüllender Show seit 2023.",
  },

  /* ───────── Buchung & Ablauf ───────── */
  {
    id: "wie-buchen",
    category: "buchung",
    q: "Wie buche ich?",
    a: "Drei Wege: (1) Anfrage über das Buchungsformular auf /buchung, (2) Show-Planer-Modal (am unteren Bildschirmrand, oder mit Anker #planer), (3) direkt per Email an el@magicel.de oder Telefon. Antwort kommt persönlich innerhalb von 24 Stunden.",
  },
  {
    id: "vorlauf",
    category: "buchung",
    q: "Wie lange im Voraus sollte gebucht werden?",
    a: "Wochenenden in der Hochsaison (Mai–September, Dezember) brauchen 8–12 Wochen Vorlauf, normale Termine 4–6 Wochen. Kurzfristige Anfragen prüfe ich gern — manchmal geht auch noch was in 2 Wochen.",
  },
  {
    id: "vertrag",
    category: "buchung",
    q: "Bekomme ich einen schriftlichen Vertrag?",
    a: "Ja — schriftlicher Vertrag (Email oder PDF mit Unterschrift) mit allen relevanten Details: Datum, Uhrzeit, Format, Dauer, Honorar inkl. ausgewiesener Umsatzsteuer, Anfahrt, Übernachtung (falls nötig), Tech-Anforderungen, Tabu-Themen, Stornierungsbedingungen.",
  },
  {
    id: "stornierung",
    category: "buchung",
    q: "Wie ist die Stornierungsregel?",
    a: "Die Staffel ist in den AGB festgehalten: bis 30 Tage vorher 55 % Gage, bis 20 Tage 75 %, bis 14 Tage 100 %. Bei höherer Gewalt (Pandemie, behördliche Anordnung) wird die Anzahlung vollständig erstattet. Details unter /agb § 5.",
  },
  {
    id: "vorgespraech",
    category: "buchung",
    q: "Gibt es ein Vorgespräch?",
    a: "Ja — kostenloses 30-Minuten-Vorgespräch per Telefon oder Video. Wir besprechen Anlass, Gästezahl, Location, gewünschte Tonalität und Tabus. Das Briefing ist Grundlage für ein präzises Angebot.",
  },
  {
    id: "antwortzeit",
    category: "buchung",
    q: "Wie schnell antworte ich auf Anfragen?",
    a: "Innerhalb von 24 Stunden, an Werktagen meist deutlich schneller (oft am selben Vormittag). Persönlich, nicht über ein Office-Team — wer schreibt, bekommt Antwort von mir direkt.",
  },

  /* ───────── Formate & Show ───────── */
  {
    id: "close-up",
    category: "formate",
    q: "Was ist Close-Up-Magie?",
    a: "Magie direkt an den Gästetischen — Karten, Münzen, Mentalmagie und Borrowed-Object-Effekte. Ich gehe von Tisch zu Tisch, 5–7 Minuten pro Tafel, 50–80 Gäste in 90 Minuten. Ideal für Stehempfänge, Hochzeitsempfänge und Dinner-Pausen.",
  },
  {
    id: "buehnenshow-dauer",
    category: "formate",
    q: "Wie lange ist eine Bühnenshow?",
    a: "Klassische Slots: 15 Minuten Show-Act, 30 Minuten Highlight-Show, 45–60 Minuten abendfüllend. Alle Längen sind durchkomponiert mit Drama-Kurve, Comedy-Pointen und Finale. Längere Slots haben dramaturgische Bögen, keine Aneinanderreihung von Tricks.",
  },
  {
    id: "magic-dinner",
    category: "formate",
    q: "Was ist ein Magic Dinner?",
    a: "Mehrgänge-Abend (3–5 Gänge), zwischen den Gängen kommt die Magie zu jedem Tisch. Wir kooperieren mit dem Restaurant Wald & Wiese in Sinzing bei Regensburg, aber auch in Eurer Location umsetzbar. Format zwischen 2,5 und 4 Stunden, mit Bühnen-Finale optional.",
  },
  {
    id: "moderation-magie",
    category: "formate",
    q: "Was ist Moderation mit Magie?",
    a: "Ich moderiere euren Programmablauf und baue zwischen den Punkten kleine Zauber-Bridges ein — als roten Faden für die ganze Show. Comedy-Anteil dosierbar von zurückhaltend-elegant bis stark. Funktioniert für Galas, Award-Shows, Firmen-Events und Hochzeiten gleich gut.",
  },
  {
    id: "mentalmagie",
    category: "formate",
    q: "Was ist Mentalmagie?",
    a: "Vorhersagen, scheinbares Gedankenlesen, Persönlichkeits-Effekte. Mehr Theater als Trick — und genau deshalb so wirksam. Drei Sekunden Stille im Saal, dann Applaus. Mentalmagie passt besonders gut zu B2B-Events und Premium-Hochzeiten.",
  },
  {
    id: "comedy-anteil",
    category: "formate",
    q: "Kann der Comedy-Anteil dosiert werden?",
    a: "Ja, vollständig. Wir stimmen vorab ab: von [elegant-zurückhaltend, ein paar feine Pointen] bis [Comedy-lastig, das Publikum lacht durchgehend]. Beides funktioniert — die Magie bleibt gleich stark, nur das Stilkleid wechselt.",
  },
  {
    id: "tabus",
    category: "formate",
    q: "Welche Themen sind tabu?",
    a: "Standardmäßig tabu: religiöse Witze, Politik, expliziter Sex-Humor, alles auf Kosten einzelner Gäste. Eure individuellen Tabus (z. B. Krankheit eines Anwesenden, Trennung im Familienkreis) sprechen wir im Briefing ab.",
  },
  {
    id: "kombination",
    category: "formate",
    q: "Kann ich Formate kombinieren?",
    a: "Sehr gerne — z. B. Close-Up beim Empfang + Bühnenshow nach dem Hauptgang. Oder Magic Dinner + Moderation des Abendprogramms. Das Honorar verteilt sich dann auf einen längeren Slot, ist aber nicht die Summe zweier Einzel-Honorare.",
  },

  /* ───────── Technik & Logistik ───────── */
  {
    id: "mikrofon",
    category: "technik",
    q: "Brauche ich ein Mikrofon?",
    a: "Ab ca. 80 Gästen ja — sonst gehen Pointen verloren. Ich bringe ein professionelles Sennheiser EW-Headset selbst mit, falls vor Ort nichts passt. Für Close-Up kein Mikro nötig.",
  },
  {
    id: "sound",
    category: "technik",
    q: "Wie ist die Sound-Anforderung?",
    a: "Eure Anlage mit XLR- oder Klinken-Eingang reicht — ich komme mit Backing-Tracks auf USB-Stick. Falls keine Anlage vor Ort: Mini-PA-System (für bis 60 Gäste) bringe ich auf Wunsch mit. Bei größeren Sälen läuft der Sound über euren Tontechniker.",
  },
  {
    id: "licht",
    category: "technik",
    q: "Wie ist die Licht-Anforderung?",
    a: "Frontspot reicht — keine spezielle Programmierung nötig. Für Highlight-Momente ist Black-out + zentraler Spot ideal. Bei TV-Bedingungen oder Gala-Setups planen wir die Lichtfolge gemeinsam mit eurem Lichttechniker durch.",
  },
  {
    id: "buehnenmasse",
    category: "technik",
    q: "Welche Bühnenmaße brauche ich?",
    a: "Minimum 2 × 1,5 Meter mit klarer Sicht aufs Publikum. Mehr Fläche ist immer besser, aber selten nötig. Bei [keine Bühne vorhanden] reicht eine markierte Auftrittsfläche im Saal — Bühne ist kein zwingendes Setting.",
  },
  {
    id: "setup-zeit",
    category: "technik",
    q: "Wie viel Setup- und Soundcheck-Zeit?",
    a: "30 Minuten Setup + 30 Minuten Soundcheck — also ungefähr 1 Stunde vor Showbeginn am Eventort. Bei reiner Close-Up-Buchung ohne Bühne reicht 15 Minuten Aufbauzeit.",
  },
  {
    id: "anfahrt",
    category: "technik",
    q: "Wie wird die Anfahrt berechnet?",
    a: "In Bayern transparent kalkuliert nach Entfernung (km-Pauschale), deutschlandweit inkl. Fahrzeit-Aufschlag falls über 3 Stunden. Bei Übernachtungs-Pflicht (späte Show / weite Anreise) kommt Hotel + Spesen — wird im Angebot ausgewiesen, keine Überraschungen.",
  },
  {
    id: "versicherung",
    category: "technik",
    q: "Bin ich versichert?",
    a: "Berufshaftpflicht-Versicherung mit ausreichender Deckungssumme für gewerbliche Bühnen-Tätigkeit. Versicherungsnachweis liefere ich auf Anfrage gerne mit — wird bei B2B-Events teils vom Veranstalter angefordert.",
  },

  /* ───────── Preise & Honorar ───────── */
  {
    id: "wovon-haengt",
    category: "preise",
    q: "Wovon hängt das Honorar ab?",
    a: "Format (Close-Up / Bühne / Magic Dinner / Moderation), Dauer (15 Min bis 4 Stunden), Anfahrt, ggf. Übernachtung, Saison (Hochsaison Mai–September + Dezember teurer als Nebensaison). Außerdem: Sonderwünsche wie Englisch-Sprache, vorab Konzept-Workshop, eingebaute Firmen-Inhalte.",
  },
  {
    id: "ab-welcher-preisklasse",
    category: "preise",
    q: "Ab welcher Preisklasse bewegt sich eine Buchung?",
    a: "Keine Listenpreise auf der Webseite — jede Anfrage bekommt ein individuelles, transparentes Angebot. Grund: ein 15-Minuten-Close-Up im Nachbarort hat einen anderen Aufwand als eine 60-Minuten-Show mit Anreise und Übernachtung. Eine kurze Anfrage genügt, dann ist Klartext da.",
  },
  {
    id: "anfahrt-inkl",
    category: "preise",
    q: "Ist Anfahrt im Honorar enthalten?",
    a: "In der Region Regensburg / Oberpfalz oft pauschal inklusive. Über Bayern hinaus wird die Anfahrt transparent als separate Position im Angebot kalkuliert — ihr seht genau, was wofür anfällt.",
  },
  {
    id: "reisekosten",
    category: "preise",
    q: "Wie hoch sind Reisekosten bei Übernachtungen?",
    a: "Hotel-Standard 3–4 Sterne (kein Luxus, aber ausgeruht für die Show), Buchung durch euch oder durch mich. Spesen-Pauschale für Verpflegung. Beides wird im Angebot ausgewiesen — nichts läuft versteckt.",
  },
  {
    id: "rechnung-ust",
    category: "preise",
    q: "Bekomme ich eine Rechnung mit ausgewiesener Umsatzsteuer?",
    a: "Ja — GoBD-konforme Geschäftsrechnung mit ausgewiesener gesetzlicher Umsatzsteuer, Zahlungsziel standardmäßig 14 Tage nach Veranstaltung. Anzahlung 30 % zur Terminreservierung üblich, der Rest zur oder nach der Show.",
  },
  {
    id: "anzahlung",
    category: "preise",
    q: "Muss ich eine Anzahlung leisten?",
    a: "Ja — eine Anzahlung sichert den Termin. Höhe meist 30 % der Gesamt-Gage, fällig nach Vertragsschluss. Erst dann blockiere ich das Datum komplett. Restzahlung 14 Tage nach Veranstaltung gegen Rechnung.",
  },

  /* ───────── Allgemein · Erweitert ───────── */
  {
    id: "deutschlandweit",
    category: "allgemein",
    q: "Trete ich auch außerhalb Bayerns auf?",
    a: "Ja, deutschlandweit. Schwerpunkt Bayern (Regensburg, München, Nürnberg, Augsburg, Ingolstadt), aber Hamburg bis Stuttgart, Berlin bis Köln sind alles regelmäßige Anfragen. Bei längerer Anreise plane ich Übernachtung ein — alles transparent im Angebot.",
  },
  {
    id: "alter-erfahrung",
    category: "allgemein",
    q: "Bin ich nicht zu jung für professionelle Magie?",
    a: "Berechtigte Frage. Antwort: 17 Jahre Bühnen-Erfahrung mit 18. Erster Trick mit 8, erster bezahlter Gig mit 12. Heute über 200 gespielte Events. Alter ist Erfahrung minus Anfangsjahre — bei mir 10+ Jahre Profi-Übung.",
  },
  {
    id: "kindergeburtstag",
    category: "allgemein",
    q: "Mache ich auch Kindergeburtstage?",
    a: "Im Moment Fokus auf Erwachsenen-Entertainment — Hochzeiten, Firmenfeiern, private Feiern ab 12 Jahren. Bei Familienfeiern beziehe ich jüngere Gäste gerne ein, aber reine Kindergeburtstage (3-12 Jahre) vermittle ich an Kollegen weiter.",
  },
  {
    id: "tv-auftritte",
    category: "allgemein",
    q: "War ich im Fernsehen?",
    a: "Ja — TVA-Interview 2025 (Bayerisches Regional-TV) mit 16 Jahren, Live-Studio mit Karten-Routine. Davor 2023 Greatest Talent auf SAT.1 als Finalist. Mitschnitte auf YouTube und im Presse-Bereich verfügbar.",
  },
  {
    id: "ausbildung",
    category: "allgemein",
    q: "Habe ich eine Ausbildung als Magier?",
    a: "Magie ist kein klassisches Lehr-Beruf — keine staatliche Prüfung. Aber: Mitglied im Magischen Zirkel von Deutschland, Mentoren-Kontakte zu deutschen Top-Profis, jährliche Wettbewerbe und Workshops. Mehr Wert als jeder Schein: 200+ echte Auftritte.",
  },

  /* ───────── Buchung · Erweitert ───────── */
  {
    id: "online-buchung",
    category: "buchung",
    q: "Kann ich direkt online buchen?",
    a: "Nein, eine direkte Online-Buchung ohne Briefing gibt es bewusst nicht. Magie funktioniert nur wenn ich euren Anlass kenne — daher immer kurzes Telefonat oder Anfrage zuerst. Antwort kommt innerhalb 24h.",
  },
  {
    id: "datum-fest",
    category: "buchung",
    q: "Wann wird das Datum verbindlich?",
    a: "Mit Unterschrift unter den Vertrag und Eingang der Anzahlung (30%) ist das Datum verbindlich geblockt. Vorher ist es nur reserviert — wer schneller bucht, bekommt den Slot.",
  },
  {
    id: "mehrere-anbieter",
    category: "buchung",
    q: "Holt ihr mehrere Angebote ein?",
    a: "Klar, völlig legitim. Wenn du parallel andere Künstler anfragst, sag es mir einfach — ich passe das Angebot dann gegebenenfalls nach.",
  },
  {
    id: "buchungs-zeitpunkt",
    category: "buchung",
    q: "Wann ist der beste Zeitpunkt für die Buchung?",
    a: "Für Hochsaison-Wochenenden (Mai-September, Dezember): 3-6 Monate vorab. Werktage oder Nebensaison: 4-8 Wochen reichen meist. Last-Minute (1-2 Wochen) möglich wenn Glück + freier Slot — einfach anrufen.",
  },
  {
    id: "verfuegbarkeit-pruefen",
    category: "buchung",
    q: "Wie kann ich die Verfügbarkeit prüfen?",
    a: "Anfrage über Formular oder Mail mit Datum, Ort und ungefährer Gästezahl — ich antworte mit Verfügbarkeits-Status + ersten Konzept-Vorschlag innerhalb 24h.",
  },
  {
    id: "umbuchung",
    category: "buchung",
    q: "Kann ich den Termin verschieben?",
    a: "Bei höherer Gewalt (Krankheit, Behörden-Anordnung) unkompliziert möglich. Bei freier Wahl: je früher angekündigt, desto eher klappt's. Anzahlung wird auf den neuen Termin übertragen.",
  },
  {
    id: "anrede-form",
    category: "buchung",
    q: "Welche Anrede soll ich beim Briefing verwenden?",
    a: "Du oder Sie — beides ok. Bei B2B-Vorstands-Events schreibe ich automatisch Sie, bei Hochzeiten/privaten Anfragen Du. Du kannst es jederzeit umstellen — keine Eitelkeit von meiner Seite.",
  },

  /* ───────── Formate · Erweitert ───────── */
  {
    id: "format-empfehlung",
    category: "formate",
    q: "Welches Format passt zu welchem Anlass?",
    a: "Hochzeit: Close-Up beim Sektempfang + Bühnen-Highlight vor Tanz. Firmenfeier: Close-Up beim Empfang + 25-Min-Bühnenshow zum Höhepunkt. Geburtstag/Privat: Tisch-zu-Tisch + kleine Show. Magic Dinner: nur im Restaurant-Setting mit Mehrgängen.",
  },
  {
    id: "anzahl-gaeste",
    category: "formate",
    q: "Funktioniert die Show ab welcher Gästezahl?",
    a: "Close-Up funktioniert ab 5 Gästen, Bühnenshow ab ca. 30. Magic Dinner ab 20. Maximum: 500+ bei Bühnenshow (mit guter Tontechnik), 150 bei Close-Up über 90 Min.",
  },
  {
    id: "interaktiv",
    category: "formate",
    q: "Müssen Gäste mitmachen?",
    a: "Nicht müssen — können. Eingebunden werden 5-10 Gäste pro Show, immer freiwillig, nie blamierend. Wer nicht möchte, sieht trotzdem die Magie. Wer mitmacht, wird zum Hauptdarsteller seines Moments.",
  },
  {
    id: "draussen-auftritt",
    category: "formate",
    q: "Funktioniert Magie draußen?",
    a: "Close-Up ja, problemlos. Bühnenshow nur bei trockenem Wetter und geschützter Lage (Wind macht Karten-Effekte schwierig). Magic Dinner ginge in Biergarten oder Restaurant-Terrasse mit Bedacht.",
  },
  {
    id: "wiederholung-show",
    category: "formate",
    q: "Wiederhole ich Routinen bei Stamm-Kunden?",
    a: "Nie. Wer mich zum zweiten Mal bucht, bekommt komplett anderes Programm. Mein Repertoire ist groß genug — Stamm-Kunden bekommen sogar bewusst neue Stücke vor Premieren-Publikum.",
  },
  {
    id: "stillere-magie",
    category: "formate",
    q: "Gibt es leise Magie für intime Anlässe?",
    a: "Ja — Close-Up am Tisch ohne Mikrofon, ohne Bühne, ohne Show-Lautstärke. Beerdigungs-Gedenkfeiern (auf besonderen Wunsch), kleine private Geburtstage, intime Hochzeiten. Wirkung kommt aus Nähe statt Effekt.",
  },
  {
    id: "show-aufbau",
    category: "formate",
    q: "Wie ist eine 30-Min-Show aufgebaut?",
    a: "Erste 3 Min: Hook + Aufmerksamkeit fangen. Min 4-8: Mentalstück mit Publikumsbeteiligung. Min 9-18: Karten-Sequenz mit Comedy-Pointen. Min 19-25: Mentalmagie mit Saal-Beteiligung. Min 26-30: Finale + Standing-Ovation-Moment.",
  },
  {
    id: "magic-dinner-buchbar",
    category: "formate",
    q: "Kann ich ein Magic Dinner privat buchen?",
    a: "Ja, auf zwei Wegen: (1) Tafel beim öffentlichen Magic-Dinner-Abend im Wald & Wiese reservieren, (2) komplett privater Magic-Dinner-Abend für deine geschlossene Gesellschaft in eurem Restaurant oder Wald & Wiese. Beides über Kontaktformular anfragen.",
  },

  /* ───────── Technik · Erweitert ───────── */
  {
    id: "ohne-strom",
    category: "technik",
    q: "Kann die Show ohne Strom funktionieren?",
    a: "Close-Up komplett ja — keine Technik. Bühnenshow mit Akku-Lautsprecher + Karten-Magie ohne elektronische Effekte ginge auch. Klassische Magie braucht kein Strom — Modern-Stage-Magie schon eher.",
  },
  {
    id: "platz-close-up",
    category: "technik",
    q: "Wieviel Platz braucht Close-Up?",
    a: "Ein halber Quadratmeter Tisch zum Auflegen genügt. Steh-Empfang ohne Tisch geht auch — Magie funktioniert in der Hand. Wichtig: Gäste können in Halbkreis um mich stehen, gute Sicht auf 30 cm Distanz.",
  },
  {
    id: "umkleide",
    category: "technik",
    q: "Brauche ich eine Umkleide?",
    a: "Ein abschließbarer Raum für Garderobe + Vorbereitung ist hilfreich, gerne mit Spiegel. Bei kleineren Locations reicht ein Personal-WC + Stuhl. Bei Wohnungs-Auftritten ein freies Schlafzimmer.",
  },
  {
    id: "video-foto",
    category: "technik",
    q: "Dürft ihr Fotos und Videos machen?",
    a: "Vom Publikum aus: gerne, schickt mir die schönsten Fotos zu. Eigenes Filmen meiner Show zur Verbreitung: bitte vorab abklären (Effekte sind teilweise nicht für Detailaufnahmen gedacht).",
  },
  {
    id: "spielort-anforderung",
    category: "technik",
    q: "Welche Anforderungen an die Location?",
    a: "Für Close-Up: keine. Für Bühne: Mindestens 2x1,5 m freie Fläche, Stromanschluss, gute Sicht für alle Gäste. Tagsüber draußen: Sonnenschutz für meine Hände + Karten. Akustik nicht kritisch — Mikrofon kompensiert.",
  },
  {
    id: "barrierefrei",
    category: "technik",
    q: "Ist die Show barrierefrei?",
    a: "Für Gäste im Rollstuhl: kein Problem, ich komme zum Tisch. Hörgeschädigte Gäste: Close-Up funktioniert ohne Worte, Bühnenshow mit Gebärden-Dolmetscher auf Anfrage. Sehbeeinträchtigte: Mentalmagie statt visueller Effekte.",
  },
  {
    id: "online-show",
    category: "technik",
    q: "Mache ich auch Online-Shows?",
    a: "Aktuell Fokus auf Live-Auftritte. Magic Dinner im Online-Format funktioniert nicht — Magie braucht physische Nähe. Für Online-Firmen-Events vermittle ich an Kollegen die darauf spezialisiert sind.",
  },

  /* ───────── Preise · Erweitert ───────── */
  {
    id: "richtwert-close-up",
    category: "preise",
    q: "Was kostet Close-Up ungefähr?",
    a: "60 Minuten Close-Up bei lokalem Event (Regensburg + Umkreis): mittlerer dreistelliger Bereich. Plus Anfahrt bei größerer Entfernung. Konkretes Angebot kommt nach kurzem Briefing über Anlass + Location.",
  },
  {
    id: "richtwert-buehne",
    category: "preise",
    q: "Was kostet eine 30-Min-Bühnenshow?",
    a: "Eintags-Auftritt in Bayern, 30 Min Bühnenshow: oberer dreistelliger Bereich plus Anfahrt. Premium-Slots (Vorstandsdinner, Galas) entsprechend höher wegen Briefing-Aufwand + Personalisierung.",
  },
  {
    id: "richtwert-magic-dinner",
    category: "preise",
    q: "Was kostet ein privates Magic Dinner?",
    a: "Privater Magic-Dinner-Abend mit 20-50 Gästen: vierstelliger Bereich gesamt — beinhaltet 3-4 Stunden Performance + Briefing + Anfahrt. Restaurant + Menü laufen separat über das Restaurant.",
  },
  {
    id: "verhandelbar",
    category: "preise",
    q: "Sind die Preise verhandelbar?",
    a: "Bei mehrtägigen Engagements, Wiederholungs-Kunden oder Charity-Anlässen: ja. Bei Standard-Buchungen sind die Preise transparent kalkuliert und entsprechen dem Aufwand — Spielraum eher klein.",
  },
  {
    id: "ratenzahlung",
    category: "preise",
    q: "Kann ich in Raten zahlen?",
    a: "Standard ist 30% Anzahlung bei Vertragsschluss, Rest 14 Tage nach Veranstaltung. Bei größeren Buchungen sind 3 Raten (Anzahlung / vor Termin / nach Termin) möglich — auf Anfrage.",
  },
  {
    id: "stornogebuehren-recht",
    category: "preise",
    q: "Warum gibt es Stornogebühren?",
    a: "Weil ein geblocktes Datum andere Buchungen ausschließt. Bei Storno 4 Wochen vorher ist es schwer, einen Ersatz-Auftrag zu finden. Staffel gilt für beide Seiten — bei Verschiebung wird Anzahlung übertragen.",
  },
  {
    id: "rechnung-firma",
    category: "preise",
    q: "Kann ich auf Firmen-Rechnung buchen?",
    a: "Ja, alle Rechnungen sind GoBD-konform mit ausgewiesener USt und allen Pflichtangaben. Wenn deine Firma USt-IdNr hat, bitte vorab schicken — kommt auf die Rechnung.",
  },
  {
    id: "trinkgeld",
    category: "preise",
    q: "Erwarte ich Trinkgeld?",
    a: "Nein, das Honorar deckt alles ab. Wer freiwillig was geben möchte: schöne Geste, aber niemals erwartet oder eingefordert.",
  },
];

const TABS: { key: TabKey; label: string; icon: typeof Info }[] = [
  { key: "allgemein", label: "Allgemein", icon: Info },
  { key: "buchung", label: "Buchung & Ablauf", icon: Calendar },
  { key: "formate", label: "Formate & Show", icon: Sparkles },
  { key: "technik", label: "Technik & Logistik", icon: Wrench },
  { key: "preise", label: "Preise & Honorar", icon: Coins },
];

/* ════════════════════════════════════════════════════════
   FAQ-CORE — Search + Tabs + Akkordion (Voltage-Look)
   ════════════════════════════════════════════════════════ */
const FAQCore = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("allgemein");

  const normalizedSearch = search.trim().toLowerCase();
  const isSearching = normalizedSearch.length > 1;

  const filteredAll = useMemo(() => {
    if (!isSearching) return FAQ_ITEMS;
    return FAQ_ITEMS.filter(
      (item) =>
        item.q.toLowerCase().includes(normalizedSearch) ||
        item.a.toLowerCase().includes(normalizedSearch),
    );
  }, [isSearching, normalizedSearch]);

  const visibleItems = useMemo(() => {
    if (isSearching) return filteredAll;
    return FAQ_ITEMS.filter((item) => item.category === activeTab);
  }, [isSearching, filteredAll, activeTab]);

  const counts: Record<TabKey, number> = useMemo(() => {
    const map = { allgemein: 0, buchung: 0, formate: 0, technik: 0, preise: 0 } as Record<TabKey, number>;
    const pool = isSearching ? filteredAll : FAQ_ITEMS;
    pool.forEach((item) => {
      map[item.category]++;
    });
    return map;
  }, [isSearching, filteredAll]);

  return (
    <section className="px-5 md:px-10 py-16 md:py-24" style={{ background: WHITE }}>
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          eyebrow="Such, klick, finde"
          title={<>Antworten nach <span style={{ color: COBALT }}>Thema</span>.</>}
          sub="Stichwort eingeben oder Kategorie wählen — alle Antworten persönlich, klar und ohne Marketing-Sprech."
        />

        {/* SEARCH-FIELD */}
        <div className="mt-10 mb-8">
          <label htmlFor="faq-search" className="sr-only">
            FAQs durchsuchen
          </label>
          <div className="relative">
            <Search
              aria-hidden
              className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: L_DIM }}
            />
            <input
              id="faq-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Stichwort eingeben — z. B. Honorar, Anfahrt, Close-Up..."
              className="w-full pl-14 pr-6 py-4 md:py-5 rounded-[18px] focus:outline-none text-base md:text-lg transition-colors"
              style={{
                background: WHITE,
                border: `1px solid ${L_LINE}`,
                color: INK,
              }}
              autoComplete="off"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] tracking-[0.1em] uppercase font-semibold px-3 py-1.5 rounded-full transition-colors"
                style={{ background: PAPER, color: L_DIM }}
              >
                Zurücksetzen
              </button>
            )}
          </div>
          {isSearching && (
            <p className="mt-3 text-sm" style={{ color: L_DIM }}>
              {filteredAll.length === 0 ? (
                <>Keine Treffer für [{search}]. Frag unten direkt nach.</>
              ) : (
                <>
                  <span className="font-bold tabular-nums" style={{ color: INK }}>
                    {filteredAll.length}
                  </span>{" "}
                  Antwort{filteredAll.length === 1 ? "" : "en"} gefunden.
                </>
              )}
            </p>
          )}
        </div>

        {/* TABS — nur sichtbar wenn nicht gesucht wird */}
        {!isSearching && (
          <div className="mb-10">
            <div className="flex flex-wrap gap-2 md:gap-3">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.key;
                const count = counts[tab.key];
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    aria-pressed={active}
                    className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full text-[13.5px] font-semibold transition-colors"
                    style={
                      active
                        ? { background: COBALT, color: WHITE }
                        : { background: WHITE, color: INK, border: `1px solid ${L_LINE}` }
                    }
                  >
                    <Icon className="w-4 h-4" style={{ color: active ? WHITE : COBALT }} />
                    <span>{tab.label}</span>
                    <span
                      className="text-[11px] tabular-nums px-2 py-0.5 rounded-full"
                      style={
                        active
                          ? { background: "rgba(255,255,255,0.22)", color: WHITE }
                          : { background: PAPER, color: L_DIM }
                      }
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* AKKORDION */}
        <div className="space-y-3">
          {visibleItems.length === 0 && (
            <div className="py-10 text-center" style={{ color: L_DIM }}>
              <p className="text-xl font-semibold mb-2" style={{ color: INK }}>Nichts gefunden.</p>
              <p className="text-sm">
                Frag unten direkt nach — Antwort innerhalb 24 Stunden.
              </p>
            </div>
          )}
          {visibleItems.map((item) => (
            <details
              key={item.id}
              className="group rounded-[18px] px-6 py-5"
              style={{ background: WHITE, border: `1px solid ${L_LINE}` }}
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                <span className="text-[16px] font-semibold" style={{ color: INK }}>
                  {item.q}
                </span>
                <ChevronDown
                  className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180"
                  style={{ color: COBALT }}
                />
              </summary>
              <p className="mt-3 text-[15px] leading-[1.6]" style={{ color: L_DIM }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   FRAGE NICHT BEANTWORTET — Mini-Form (Logik 1:1 erhalten)
   ════════════════════════════════════════════════════════ */
const FrageNichtBeantwortet = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [frage, setFrage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    if (!email || !email.includes("@")) return;
    timerRef.current = window.setTimeout(() => {
      captureEmail(email, "faq-frage", { name, frage });
    }, 600);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [email, name, frage]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !frage.trim()) return;
    markEmailSubmitted();
    setSubmitted(true);
    // Persist a small "ping" so we don't lose the question — uses localStorage
    try {
      const key = "magicel_faq_questions";
      const raw = localStorage.getItem(key);
      const list = raw ? (JSON.parse(raw) as unknown[]) : [];
      list.push({
        name,
        email,
        frage,
        at: Date.now(),
      });
      localStorage.setItem(key, JSON.stringify(list));
    } catch {
      // ignore quota / private mode
    }
  };

  const inputCls =
    "w-full rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 transition-colors";
  const inputStyle = {
    background: WHITE,
    border: `1px solid ${L_LINE}`,
    color: INK,
    ["--tw-ring-color" as never]: `${ACCENT}26`,
  } as React.CSSProperties;

  return (
    <section className="px-5 md:px-10 py-16 md:py-24" style={{ background: PAPER, borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}>
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          eyebrow="Deine Frage fehlt?"
          title={<>Stell sie <span style={{ color: COBALT }}>direkt mir</span>.</>}
          sub="Drei Felder, 30 Sekunden — und du bekommst eine persönliche Antwort per Email innerhalb von 24 Stunden. Kein Office-Team, kein Bot. Ich schreibe direkt."
        />

        <div className="mt-10">
          {!submitted ? (
            <form
              onSubmit={onSubmit}
              className="rounded-[24px] p-6 md:p-9"
              style={{ background: WHITE, border: `1px solid ${L_LINE}`, boxShadow: "0 24px 60px -28px rgba(10,11,15,0.25)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="faq-name"
                    className="block text-[11px] tracking-[0.12em] uppercase font-semibold mb-2"
                    style={{ color: L_DIM }}
                  >
                    Dein Name
                  </label>
                  <input
                    id="faq-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Vor- und Nachname"
                    className={inputCls}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label
                    htmlFor="faq-email"
                    className="block text-[11px] tracking-[0.12em] uppercase font-semibold mb-2"
                    style={{ color: L_DIM }}
                  >
                    Deine Email
                  </label>
                  <input
                    id="faq-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@firma.de"
                    className={inputCls}
                    style={inputStyle}
                  />
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="faq-frage"
                  className="block text-[11px] tracking-[0.12em] uppercase font-semibold mb-2"
                  style={{ color: L_DIM }}
                >
                  Deine Frage
                </label>
                <textarea
                  id="faq-frage"
                  value={frage}
                  onChange={(e) => setFrage(e.target.value)}
                  required
                  rows={5}
                  placeholder="Worum geht es? Datum, Anlass, Gästezahl helfen mir, präzise zu antworten."
                  className={`${inputCls} resize-none`}
                  style={inputStyle}
                />
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[13px] tracking-[0.04em] font-semibold uppercase text-white transition-transform hover:scale-[1.02]"
                  style={{ background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})` }}
                >
                  <Send className="w-4 h-4" />
                  Frage absenden
                </button>
                <p className="text-[12px] leading-[1.5]" style={{ color: L_DIM }}>
                  Mit dem Absenden bestätigst du, dass deine Email zur Beantwortung
                  gespeichert wird. Mehr unter{" "}
                  <a
                    href="/datenschutz"
                    className="underline decoration-foreground/30 hover:decoration-foreground"
                  >
                    Datenschutz
                  </a>
                  .
                </p>
              </div>
            </form>
          ) : (
            <div
              className="rounded-[24px] p-10 md:p-14 text-center"
              style={{ background: WHITE, border: `1px solid ${L_LINE}`, boxShadow: "0 24px 60px -28px rgba(10,11,15,0.25)" }}
            >
              <div
                className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})` }}
              >
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <p className="text-lg md:text-xl mb-3" style={{ color: L_DIM }}>
                Angekommen.
              </p>
              <h3 className="font-extrabold text-2xl md:text-3xl mb-4" style={{ color: INK }}>
                Danke, {name || "du"}.
              </h3>
              <p className="text-base md:text-lg leading-[1.6] max-w-md mx-auto" style={{ color: L_DIM }}>
                Ich antworte innerhalb von 24 Stunden persönlich an{" "}
                <span className="font-bold" style={{ color: INK }}>{email}</span>.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════ */
const SITE_URL = "https://www.magicel.de/faq";

const FAQPage = () => (
  <VoltageShell
    title="FAQ — Häufige Fragen zum Zauberer | Emilian Leber Bayern"
    description="Häufige Fragen zur Buchung eines Zauberers in Bayern — Ablauf, Pakete, Technik, Anfahrt, Honorar. 5,0 Sterne, 200+ Events seit 2015, persönliche Antwort innerhalb 24 Stunden."
    path="/faq"
    noindex={false}
  >
    <Helmet>
      <meta
        name="keywords"
        content="Zauberer FAQ, Magier Fragen, Zauberer buchen Bayern, Magier Hochzeit Fragen, Firmenfeier Zauberer Honorar, Magier Tech-Rider, Close-Up Magie FAQ, Magic Dinner FAQ, Zauberer Stornierung, Magier Vorlauf Buchung"
      />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="FAQ — Häufige Fragen zum Zauberer | Emilian Leber"
      />
      <meta
        name="twitter:description"
        content="30+ Antworten zu Buchung, Formaten, Technik und Honorar — persönlich beantwortet."
      />
      <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Start",
              item: "https://www.magicel.de/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "FAQ",
              item: SITE_URL,
            },
          ],
        })}
      </script>
    </Helmet>

    <SubHero
      eyebrow="FAQ · Häufige Fragen"
      title={<>Vorher <span style={{ color: COBALT }}>gefragt</span><span style={{ color: MAGENTA }}>.</span></>}
      sub={`Hier sind die Antworten auf alles, was Brautpaare, Event-Manager und Privatkund:innen vorher wissen wollen — Buchung, Formate, Technik, Honorar. ${FAQ_ITEMS.length} Antworten über 5 Kategorien. Falls eine Frage fehlt: Mini-Formular weiter unten, ich antworte persönlich innerhalb von 24 Stunden.`}
      image={heroImg}
      imageAlt="Zauberer Emilian Leber mit Spielkarten"
      imgPos="top"
      primary={{ label: "Anfrage senden", href: "/buchung" }}
      secondary={{ label: "Show-Planer öffnen", href: "/#planer" }}
      badge="200+ Events · persönliche Antwort in 24 Stunden."
    />

    <Stats
      items={[
        { v: `${FAQ_ITEMS.length}`, l: "Antworten" },
        { v: "5", l: "Kategorien" },
        { v: "24h", l: "persönliche Antwort" },
        { v: "5,0★", l: "30+ Bewertungen" },
      ]}
    />

    <FactsGrid
      items={[
        { Icon: Info, k: "Allgemein", v: "Wer ist Emilian, Sprachen, Auszeichnungen, TV" },
        { Icon: Calendar, k: "Buchung & Ablauf", v: "Vorlauf, Vertrag, Storno, Vorgespräch" },
        { Icon: Sparkles, k: "Formate & Show", v: "Close-Up, Bühne, Magic Dinner, Moderation" },
        { Icon: Coins, k: "Preise & Honorar", v: "Wovon es abhängt, Anzahlung, Rechnung" },
      ]}
    />

    <FAQCore />

    <Statement eyebrow="Kurz und ehrlich">
      Über dreißig Fragen — eine Antwort:{" "}
      <span style={{ color: COBALT }}>ja, das geht.</span> Hochzeit ohne Bühne,
      Vorstandsdinner mit Englisch, Magie für den 70. Geburtstag der
      Schwiegermutter — alles besprochen, alles im Repertoire.
    </Statement>

    <SplitFeature
      eyebrow="So unkompliziert"
      title={<>Erst <span style={{ color: COBALT }}>verstehen</span>, dann ein präzises Angebot.</>}
      sub="Magie funktioniert nur, wenn ich euren Anlass kenne. Darum immer ein kurzes Briefing zuerst — persönlich, nicht über ein Office-Team. Antwort innerhalb von 24 Stunden, an Werktagen oft am selben Vormittag."
      points={[
        "Kostenloses 30-Minuten-Vorgespräch per Telefon oder Video",
        "Schriftlicher Vertrag mit allen Details und ausgewiesener Umsatzsteuer",
        "Transparente Anfahrt und Reisekosten — keine versteckten Posten",
      ]}
      image={splitImg}
      imageAlt="Reaktionen des Publikums auf eine Zaubershow"
      imgPos="top"
      reverse
      stat={{ v: "24h", l: "Antwortzeit" }}
    />

    <LogoMarquee />

    <FrageNichtBeantwortet />

    <ReviewsBlock paper={false} />

    <FinalCTA
      title={<>Genug gelesen — jetzt reden<span style={{ color: MAGENTA }}>.</span></>}
      sub="Show planen, direkt anrufen oder kurze Mail — wähle den Weg, der dir am nächsten ist. Antwort innerhalb von 24 Stunden persönlich von mir."
    />
  </VoltageShell>
);

export default FAQPage;
