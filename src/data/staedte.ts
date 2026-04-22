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
  einwohner?: string;
  bekannteLocations?: string[];
  faq?: StadtFAQ[];
  seoText?: string;
  langText?: string;
  kollegenEmpfehlung?: KollegenEmpfehlung;
}

export const staedte: Stadt[] = [
  {
    slug: "regensburg",
    name: "Regensburg",
    region: "Bayern",
    intro: "Als Zauberer aus Regensburg kenne ich die besten Locations der UNESCO-Welterbestadt — von historischen Gewölben im Herzen der Altstadt bis zu modernen Eventspaces an der Donau. Ob Firmenevent, Hochzeit oder Geburtstagsfeier: Ich bringe Close-Up Magie, Bühnenshow und Magic Dinner direkt zu dir nach Regensburg.",
    highlight: "Regensburg ist meine Heimatstadt — das bedeutet maximale Flexibilität, kurze Wege und volle Verfügbarkeit für dein Event. Als lokaler Zauberkünstler kenne ich die Regensburger Eventszene wie meine Westentasche.",
    einwohner: "155.000",
    bekannteLocations: ["Salzstadel", "Alte Mälzerei", "Marinaforum", "Kolpinghaus", "Leerer Beutel", "GoHotel by Schneider Weisse"],
    faq: [
      { q: "Was kostet ein Zauberer in Regensburg?", a: "Die Kosten hängen vom Format und der Dauer ab. Close-Up Magie für 1-2 Stunden startet ab einem mittleren dreistelligen Betrag. Kontaktiere mich für ein individuelles Angebot — die Beratung ist kostenlos und unverbindlich." },
      { q: "Welche Events in Regensburg eignen sich für einen Zauberer?", a: "Firmenfeiern, Hochzeiten, Geburtstage, Weihnachtsfeiern, Messeauftritte, Gala-Abende — praktisch jeder Anlass wird durch professionelle Zauberkunst aufgewertet." },
      { q: "Wie weit im Voraus sollte ich einen Zauberer in Regensburg buchen?", a: "Je früher, desto besser — besonders für Wochenendtermine empfehle ich 4-8 Wochen Vorlauf. Kurzfristige Anfragen sind aber auch möglich." },
    ],
    seoText: "Du suchst einen Zauberer in Regensburg? Emilian Leber ist der Zauberkünstler für dein Event in der Domstadt. Mit interaktiver Close-Up Magie, einer mitreißenden Bühnenshow oder einem exklusiven Magic Dinner wird deine Veranstaltung in Regensburg unvergesslich. Als Regensburger Zauberer bin ich in wenigen Minuten bei dir — ob Altstadt, Stadtamhof oder Prüfening.",
    langText: `Als Zauberer aus Regensburg bin ich in meiner Heimatstadt zuhause — das bedeutet maximale Flexibilität, kurze Wege und volle Verfügbarkeit für dein Event. Ob Firmenfeier im Salzstadel, Hochzeit in der Alten Mälzerei oder Geburtstagsparty im historischen Gewölbekeller — ich kenne Regensburg wie meine Westentasche.

Regensburg ist eine UNESCO-Welterbestadt mit einer lebendigen Eventszene. Die Kombination aus historischen Locations und modernem Eventflair macht jede Veranstaltung besonders — und professionelle Zauberkunst setzt das perfekte Highlight.

Kosten für einen Zauberer in Regensburg: Meine Pakete beginnen ab 395 €. Als Regensburger Zauberer entfällt die Anfahrtspauschale vollständig — du profitierst von maximaler Verfügbarkeit und kurzen Reaktionszeiten.

Von der Altstadt bis Stadtamhof, von Prüfening bis Lappersdorf — ich komme zu dir, egal wo in Regensburg dein Event stattfindet. Neben dem eigentlichen Auftritt bekommst du auch eine kostenlose persönliche Beratung, bei der wir gemeinsam das optimale Showkonzept für deinen Anlass entwickeln.

Ruf mich an oder schreib mir — als lokaler Zauberer in Regensburg bin ich schnell erreichbar und freue mich auf deine Anfrage.`,
  },
  {
    slug: "muenchen",
    name: "München",
    region: "Bayern",
    intro: "München ist eine der aufregendsten Event-Städte Europas. Von exklusiven Firmenfeiern im BMW-Umfeld über Hochzeiten in oberbayerischen Schlössern bis zu Galas in der Münchner Residenz — als Zauberer für München liefere ich Premium-Entertainment, das zum Anspruch der bayerischen Landeshauptstadt passt.",
    highlight: "Regelmäßig auf Münchner Events unterwegs — vom Firmenabend in Schwabing bis zur Gala im Hotel Bayerischer Hof. München ist mein zweites Zuhause.",
    einwohner: "1.500.000",
    bekannteLocations: ["Hotel Bayerischer Hof", "BMW Welt", "Residenz München", "Alte Kongresshalle", "Zenith", "Paulaner am Nockherberg", "Lenbach Palais"],
    faq: [
      { q: "Was kostet ein Zauberer in München?", a: "Die Kosten variieren je nach Format — Close-Up Magie, Bühnenshow oder Magic Dinner. Kontaktiere mich für ein individuelles Angebot, die Beratung ist kostenlos." },
      { q: "Tritt der Zauberer auch auf Münchner Firmenfeiern auf?", a: "Ja, Firmenfeiern und Corporate Events in München sind einer meiner Schwerpunkte. Von DAX-Konzernen bis Mittelstand — ich passe das Programm an eure Unternehmenskultur an." },
      { q: "Kann ich den Zauberer für eine Hochzeit in München buchen?", a: "Absolut! Hochzeiten in München und Umgebung sind ein großer Teil meiner Auftritte. Ich sorge beim Sektempfang, Dinner oder der Party für magische Momente." },
      { q: "Wie lange dauert die Anfahrt nach München?", a: "Von Regensburg nach München sind es nur ca. 1,5 Stunden. Die Anfahrt ist im Preis inbegriffen." },
    ],
    seoText: "Zauberer München gesucht? Emilian Leber ist dein Zauberkünstler für Events in München und ganz Oberbayern. Als professioneller Entertainer begeistere ich auf Firmenfeiern, Hochzeiten, Geburtstagen und Galas in München mit moderner Close-Up Magie und Comedy-Zaubershow. Von Bogenhausen bis Sendling, von der Isar bis zum Englischen Garten — ich komme zu dir.",
    langText: `Als Zauberer für München kenne ich die Erwartungen des anspruchsvollsten Eventpublikums Bayerns genau. Von der Weihnachtsfeier im Paulaner am Nockherberg über die Gala in der BMW Welt bis zur Hochzeit am Starnberger See — ich bringe professionelle Close-Up Magie und Comedy-Bühnenshow direkt zu dir.

München ist eine Weltklasse-Eventstadt, und das spürt man bei jedem Auftritt: Das Publikum ist anspruchsvoll, die Locations sind außergewöhnlich und die Erwartungen hoch. Genau deshalb liefere ich in München Entertainment auf Premium-Niveau — interaktiv, überraschend und unvergesslich.

Einen Zauberer in München zu buchen bedeutet: Meine Pakete beginnen ab 395 €. Die Anfahrt von Regensburg nach München ist immer inklusive — du bezahlst für Qualität und bekommst sie.

Als Hochzeitszauberer in München sorge ich beim Sektempfang für Staunen, während des Dinners für magische Tischmomente und in der Partyphase für eine Bühnenshow, die deine Gäste noch Wochen danach beschäftigt. Besonders beliebt in München: die Kombination aus 45 Minuten Close-Up beim Empfang und einer 30-minütigen Bühnenshow nach dem Essen.

Für Firmenfeiern in München — ob DAX-Konzern oder aufstrebendes Startup — ist modernes Zauberkünstler-Entertainment das perfekte Programm für Mitarbeiterveranstaltungen. Weihnachtsfeier in der Alten Kongresshalle, Sommerfest in Schwabing oder Jubiläum auf Schloss Nymphenburg — ich passe mein Showkonzept immer dem Anlass und dem Publikum an.

Kontaktiere mich jetzt für ein unverbindliches Beratungsgespräch. Ich antworte innerhalb von 24 Stunden und entwickle gemeinsam mit dir das optimale Showkonzept für dein Event in München.`,
  },
  {
    slug: "nuernberg",
    name: "Nürnberg",
    region: "Bayern",
    intro: "Nürnberg — Frankens pulsierende Metropole — bietet mit ihrer einzigartigen Mischung aus Tradition und Moderne den perfekten Rahmen für magische Events. Als Zauberer für Nürnberg bringe ich Close-Up Magie, Bühnenshow und Magic Dinner in die zweitgrößte Stadt Bayerns.",
    highlight: "Nürnberg ist nur eine Stunde von Regensburg entfernt. Fränkisches Flair trifft moderne Zauberkunst — perfekt für dein Event in der Noris.",
    einwohner: "520.000",
    bekannteLocations: ["Meistersingerhalle", "NürnbergMesse", "Historischer Rathaussaal", "CVJM", "Ofenwerk", "Loftwerk Nürnberg"],
    faq: [
      { q: "Was kostet ein Zauberer in Nürnberg?", a: "Die Kosten richten sich nach Art und Dauer des Auftritts. Ich erstelle dir gerne ein individuelles Angebot — kostenlos und unverbindlich." },
      { q: "Eignet sich ein Zauberer für eine Firmenfeier in Nürnberg?", a: "Auf jeden Fall! Nürnberg ist eine starke Wirtschaftsstadt — ich habe bereits auf zahlreichen Corporate Events in der Region aufgetreten." },
      { q: "Kann der Zauberer auch auf der NürnbergMesse auftreten?", a: "Ja, Messeauftritte gehören zu meinem Repertoire. Ich ziehe Besucher an euren Stand und sorge für bleibende Eindrücke." },
    ],
    seoText: "Zauberer Nürnberg: Emilian Leber ist dein Entertainer für Events in Nürnberg und der Metropolregion. Ob Firmenfeier, Hochzeit, Weihnachtsfeier oder Messeauftritt — mit professioneller Zauberkunst wird dein Event in Nürnberg zum Highlight.",
    langText: `Als Zauberer für Nürnberg bin ich in Frankens pulsierender Metropole regelmäßig unterwegs — von Firmenevents auf der NürnbergMesse bis zur Hochzeit im historischen Rathaussaal. Nürnberg ist eine Stadt mit starker Wirtschaft, tiefer Geschichte und einer wachsenden Eventkultur.

Ob du einen Zauberer für eine Firmenfeier in Nürnberg suchst — Weihnachtsfeier, Jubiläum oder Teambuilding-Event — oder für eine Hochzeit oder einen Geburtstag: Ich liefere das passende Programm. Interaktiv, modern und immer auf hohem Niveau.

Preise Zauberer Nürnberg: Meine Pakete beginnen ab 395 €. Anfahrt nach Nürnberg ist inklusive — keine Überraschungen bei der Abrechnung.

Neben Nürnberg bediene ich die gesamte Metropolregion — Fürth, Erlangen, Schwabach und Umgebung. Als Zauberkünstler für Nürnberg kenne ich die Locations, das Publikum und was einen Abend wirklich unvergesslich macht. Kontaktiere mich jetzt für dein Event.`,
  },
  {
    slug: "augsburg",
    name: "Augsburg",
    region: "Bayern",
    intro: "In der Fuggerstadt Augsburg sorge ich als Zauberer für Events, die in Erinnerung bleiben — modern, interaktiv und professionell. Ob Firmenfeier in der Augsburger Innenstadt, Hochzeit im Schwäbischen oder Gala im Kongress am Park.",
    highlight: "Augsburg liegt perfekt zwischen München und Regensburg — ideal erreichbar und als drittgrößte Stadt Bayerns ein starker Eventstandort.",
    einwohner: "300.000",
    bekannteLocations: ["Kongress am Park", "Goldener Saal", "Textilmuseum", "WWK Arena Logen", "Hotel Maximilian's"],
    faq: [
      { q: "Was kostet ein Zauberer in Augsburg?", a: "Je nach Format und Dauer erstelle ich dir ein individuelles Angebot. Die Beratung ist kostenlos und unverbindlich." },
      { q: "Für welche Anlässe kann ich einen Zauberer in Augsburg buchen?", a: "Firmenfeiern, Hochzeiten, Geburtstage, Weihnachtsfeiern, Jubiläen, Messen — ich passe mein Programm an jeden Anlass an." },
    ],
    seoText: "Zauberer Augsburg: Emilian Leber begeistert als Zauberkünstler und Entertainer auf Events in Augsburg. Close-Up Magie, Bühnenshow und Magic Dinner für Firmenfeiern, Hochzeiten und private Feiern in der Fuggerstadt.",
    langText: `Augsburg — Fuggerstadt, drittgrößte Stadt Bayerns und aufstrebender Eventstandort zwischen München und Stuttgart. Als Zauberer für Augsburg bringe ich modernes Entertainment zu Firmenfeiern im Kongress am Park, Hochzeiten im Goldenen Saal und Events in der lebendigsten Stadt Schwabens.

Das Augsburger Publikum schätzt Entertainment, das unterhaltsam und professionell zugleich ist — kein Lametta, keine Klischees, sondern echte Magie mit echtem Humor. Genau das ist mein Stil.

Kosten für einen Zauberer in Augsburg: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."wuerzburg",
    name: "Würzburg",
    region: "Bayern",
    intro: "Würzburg — die Stadt der Residenz, des Weins und unvergesslicher Events. Als Zauberer für Würzburg bringe ich moderne Magie in die Mainmetropole Unterfrankens. Von der Weinfest-Gala bis zur Firmenfeier im Residenzschloss.",
    highlight: "Fränkischer Charme trifft moderne Performance — Würzburg bietet traumhafte Locations für magische Events.",
    einwohner: "130.000",
    bekannteLocations: ["Residenz Würzburg", "Congress Centrum", "Bürgerspital Weinstube", "VCC Vogel Convention Center", "Schloss Steinburg"],
    faq: [
      { q: "Was kostet ein Zauberer in Würzburg?", a: "Die Kosten variieren je nach Format. Kontaktiere mich für ein kostenloses, individuelles Angebot." },
      { q: "Kommt der Zauberer auch nach Unterfranken?", a: "Ja, ich trete in ganz Unterfranken auf — Würzburg, Aschaffenburg, Schweinfurt und Umgebung." },
    ],
    seoText: "Zauberer Würzburg gesucht? Emilian Leber ist dein Zauberkünstler für Events in Würzburg und Unterfranken. Professionelle Zaubershow, Close-Up Magie und Magic Dinner für Firmenfeiern, Hochzeiten und Geburtstage.",
    langText: `Würzburg — die Mainmetropole Unterfrankens mit Residenz, Weinkultur und einer einzigartigen Eventatmosphäre. Als Zauberer für Würzburg liefere ich Entertainment, das zu diesem besonderen Flair passt — elegant, interaktiv und unvergesslich.

Ob Weinprobe-Gala im Bürgerspital, Firmenfeier im Congress Centrum oder Hochzeit in der Residenz — Würzburg bietet traumhafte Locations. Mein Programm passt sich dem stilvollen Ambiente der Barockstadt an.

Preise Zauberer Würzburg: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."ingolstadt",
    name: "Ingolstadt",
    region: "Bayern",
    intro: "In der Audi-Stadt Ingolstadt bringe ich Innovation und Magie zusammen. Als Zauberer für Ingolstadt liefere ich modernes Entertainment für Corporate Events, Firmenfeiern und private Feiern — perfekt für eine Stadt, die Innovation lebt.",
    highlight: "Ingolstadt liegt zentral zwischen München und Nürnberg — die Automotive-Hochburg verdient Entertainment auf Premium-Niveau.",
    einwohner: "140.000",
    bekannteLocations: ["Audi Forum", "Stadttheater Ingolstadt", "Klenzepark", "Saturn Arena Logen", "Schloss Ingolstadt"],
    faq: [
      { q: "Tritt der Zauberer auch bei Audi-Events auf?", a: "Ja, Corporate Events für Automobilunternehmen und deren Zulieferer gehören zu meinen Spezialitäten. Ich passe das Programm an eure Unternehmenskultur an." },
      { q: "Was kostet ein Zauberer in Ingolstadt?", a: "Die Kosten richten sich nach Format und Dauer. Ich berate dich gerne kostenlos und unverbindlich." },
    ],
    seoText: "Zauberer Ingolstadt: Emilian Leber begeistert als professioneller Zauberkünstler auf Events in Ingolstadt. Moderne Zauberkunst für Firmenfeiern, Audi-Events, Hochzeiten und Geburtstage in der Donaustadt.",
    langText: `Als Zauberer für Ingolstadt verbinde ich Innovation und Magie — passend zur Stadt, die als Heimat von Audi für Spitzenleistung steht. Mein Entertainment ist genauso präzise und beeindruckend wie die Ingenieurskunst aus der Donaustadt.

Firmenfeiern im Audi Forum, Weihnachtsfeiern für Automobilzulieferer oder Galas im Stadttheater — Ingolstadt bietet großartige Eventlocations. Als Zauberer für Ingolstadt entwickle ich für jede Veranstaltung das passende Showprogramm.

Zauberer Ingolstadt Kosten: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."passau",
    name: "Passau",
    region: "Bayern",
    intro: "Die Dreiflüssestadt Passau bietet einzigartige Locations für Events, die mit moderner Magie gekrönt werden. Als Zauberer für Passau bringe ich Close-Up Magie und Bühnenshow an den Zusammenfluss von Donau, Inn und Ilz.",
    highlight: "Passau liegt nur eine Stunde von Regensburg entfernt — perfekte Erreichbarkeit für dein Event in Niederbayern.",
    einwohner: "53.000",
    bekannteLocations: ["Redoute Passau", "Dreiländerhalle", "Veste Oberhaus", "Hotel Wilder Mann", "Universität Passau"],
    faq: [
      { q: "Was kostet ein Zauberer in Passau?", a: "Ich erstelle dir gerne ein individuelles Angebot — kostenlos und unverbindlich. Die Anfahrt nach Passau ist im Preis inbegriffen." },
      { q: "Tritt der Zauberer auch in Österreich auf?", a: "Ja! Von Passau aus bin ich schnell in Linz, Salzburg und Wien — ich trete regelmäßig auch in Österreich auf." },
    ],
    seoText: "Zauberer Passau: Emilian Leber ist dein Entertainer für Events in Passau und Niederbayern. Professionelle Zaubershow und Close-Up Magie für Firmenfeiern, Hochzeiten und besondere Anlässe in der Dreiflüssestadt.",
    langText: `Passau — die malerische Dreiflüssestadt an Donau, Inn und Ilz. Als Zauberer für Passau bringe ich moderne Magie in eine der schönsten Städte Deutschlands. Von Firmenfeiern in der Dreiländerhalle bis zu Hochzeiten auf der Veste Oberhaus.

Passaus einzigartiges Flair aus Geschichte, Wasser und Kultur macht jedes Event besonders. Als Zauberkünstler für Passau schaffe ich Momente, die zu dieser einzigartigen Kulisse passen — überraschend, interaktiv und stimmungsvoll.

Kosten Zauberer Passau: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."landshut",
    name: "Landshut",
    region: "Bayern",
    intro: "Landshut — die Stadt der Landshuter Hochzeit — verdient Magie, die begeistert. Als Zauberer für Landshut bringe ich modernes Entertainment zu Firmenfeiern, Hochzeiten und Geburtstagen in der niederbayerischen Hauptstadt.",
    highlight: "Landshut ist nur 45 Minuten von Regensburg entfernt. Die historische Altstadt bietet traumhafte Kulissen für magische Events.",
    einwohner: "75.000",
    bekannteLocations: ["Bernlochner", "Burg Trausnitz", "Rathaus Landshut", "Sparkassen Arena", "Gasthaus zum Erdinger Weißbräu"],
    faq: [
      { q: "Was kostet ein Zauberer in Landshut?", a: "Die Kosten variieren je nach Format und Eventgröße. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Tritt der Zauberer auch auf der Landshuter Hochzeit auf?", a: "Mittelalterliche Feste und historische Events sind ein besonderes Highlight — ich passe mein Programm gerne an den Rahmen an." },
    ],
    seoText: "Zauberer Landshut: Emilian Leber begeistert als Zauberkünstler auf Events in Landshut. Close-Up Magie, Bühnenshow und Comedy-Zaubershow für Firmenfeiern, Hochzeiten und Geburtstage in Niederbayern.",
    langText: `Landshut — die historische Hauptstadt Niederbayerns mit Burg Trausnitz und dem prachtvollen Rathaussaal. Als Zauberer für Landshut bringe ich moderne Magie in die Herzogstadt — für Firmenfeiern, Hochzeiten und besondere Anlässe.

Die historischen Locations in Landshut bieten eine traumhafte Kulisse für Events, die in Erinnerung bleiben. Mein Programm passt sich dem besonderen Ambiente an — ob elegante Gala auf der Burg oder lebhafte Firmenfeier im Bernlochner.

Preise Zauberer Landshut: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."bamberg",
    name: "Bamberg",
    region: "Bayern",
    intro: "Bamberg — UNESCO-Welterbestadt und Bierhauptstadt Frankens — bietet den perfekten Rahmen für magische Events. Als Zauberer für Bamberg bringe ich moderne Zauberkunst in historische Gewölbe, Brauereien und elegante Eventlocations.",
    highlight: "Bambergs einzigartiges Flair aus Geschichte, Kultur und fränkischer Lebensfreude macht jedes Event besonders — Magie verstärkt das noch.",
    einwohner: "78.000",
    bekannteLocations: ["Konzert- und Kongresshalle", "Alte Mälzerei Bamberg", "Böttingerhaus", "Welcome Hotel Residenzschloss", "Brose Arena"],
    faq: [
      { q: "Was kostet ein Zauberer in Bamberg?", a: "Ich erstelle dir ein individuelles Angebot basierend auf Format und Dauer — die Beratung ist kostenlos." },
      { q: "Eignet sich ein Zauberer für eine Brauereiführung oder ein Bierfest?", a: "Absolut! Close-Up Magie passt perfekt zu geselligen Anlässen — ich sorge für Staunen zwischen den Bierkrügen." },
    ],
    seoText: "Zauberer Bamberg: Emilian Leber ist dein Zauberkünstler für Events in Bamberg und Oberfranken. Professionelle Zaubershow und Close-Up Magie für Firmenfeiern, Hochzeiten und besondere Anlässe in der Welterbestadt.",
    langText: `Bamberg — UNESCO-Welterbestadt, Bierhauptstadt Frankens und eine der schönsten Städte Deutschlands. Als Zauberer für Bamberg bringe ich moderne Magie in historische Gewölbe und elegante Eventlocations der oberfränkischen Kaiserstadt.

Von Brauereiführungen mit Zauberei-Einlagen über Firmenfeiern in der Konzert- und Kongresshalle bis zu Hochzeiten im Böttingerhaus — Bamberg bietet einzigartige Locations, die durch professionelle Zauberkunst noch unvergesslicher werden.

Kosten Zauberer Bamberg: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."bayreuth",
    name: "Bayreuth",
    region: "Bayern",
    intro: "Bayreuth — die Stadt Richard Wagners — steht für Kultur auf höchstem Niveau. Als Zauberer für Bayreuth liefere ich Entertainment, das diesem Anspruch gerecht wird. Von der Firmenfeier bis zur Gala im Festspielhaus-Umfeld.",
    highlight: "Bayreuth verbindet Kultur und Wirtschaft — die perfekte Bühne für professionelle Zauberkunst, die begeistert und verbindet.",
    einwohner: "75.000",
    bekannteLocations: ["Stadthalle Bayreuth", "Eremitage", "Festspielhaus (Umfeld)", "Maisel's Bier-Erlebnis-Welt", "Schloss Fantasie"],
    faq: [
      { q: "Was kostet ein Zauberer in Bayreuth?", a: "Die Kosten richten sich nach Art des Events. Kontaktiere mich für eine kostenlose Beratung und ein individuelles Angebot." },
      { q: "Kann der Zauberer auch im Rahmen der Festspiele auftreten?", a: "Side-Events und Rahmenprogramme rund um die Festspiele sind eine großartige Gelegenheit — ich passe mein Programm gerne an." },
    ],
    seoText: "Zauberer Bayreuth: Emilian Leber begeistert als professioneller Entertainer auf Events in Bayreuth und Oberfranken. Moderne Zauberkunst für Firmenfeiern, Galas, Hochzeiten und kulturelle Events.",
    langText: `Bayreuth — die Weltkulturhauptstadt des Wagnererbes und eine Stadt, die Kultur auf höchstem Niveau lebt. Als Zauberer für Bayreuth liefere ich Entertainment, das diesem kulturellen Anspruch gerecht wird — professionell, stilsicher und unvergesslich.

Firmenfeiern in der Stadthalle Bayreuth, Side-Events rund um die Festspiele oder elegante Galas in der Eremitage — das anspruchsvolle Bayreuther Publikum verdient Entertainment auf Top-Niveau.

Preise Zauberer Bayreuth: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."erlangen",
    name: "Erlangen",
    region: "Bayern",
    intro: "Erlangen — Siemens-Stadt, Universitätsstadt und Innovationsstandort. Als Zauberer für Erlangen bringe ich moderne Magie zu Corporate Events, Firmenfeiern und privaten Feiern in der Wissenschaftsstadt Mittelfrankens.",
    highlight: "Erlangen ist geprägt von Innovation und Forschung — moderne Zauberkunst passt perfekt zu diesem Spirit.",
    einwohner: "115.000",
    bekannteLocations: ["Heinrich-Lades-Halle", "E-Werk Erlangen", "Siemens Campus", "Orangerie Erlangen", "Redoutensaal"],
    faq: [
      { q: "Tritt der Zauberer auch bei Siemens-Events auf?", a: "Ja, Corporate Events für Technologieunternehmen sind einer meiner Schwerpunkte. Ich habe Erfahrung mit Events in professionellem B2B-Umfeld." },
      { q: "Was kostet ein Zauberer in Erlangen?", a: "Die Kosten hängen vom Format ab. Ich berate dich gerne kostenlos und erstelle ein individuelles Angebot." },
    ],
    seoText: "Zauberer Erlangen: Emilian Leber ist dein Zauberkünstler für Events in Erlangen. Professionelle Close-Up Magie und Bühnenshow für Firmenfeiern, Siemens-Events, Hochzeiten und Geburtstage in der Wissenschaftsstadt.",
    langText: `Erlangen — Siemens-Heimat, Universitätsstadt und Innovationszentrum Mittelfrankens. Als Zauberer für Erlangen verbinde ich technologische Präzision mit kreativer Magie — passend zu einer Stadt, die Innovation in der DNA trägt.

Corporate Events im Siemens Campus, Weihnachtsfeiern für Technologieunternehmen oder Hochzeiten in der historischen Orangerie — ich entwickle für jede Veranstaltung das optimale Showkonzept.

Kosten Zauberer Erlangen: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."fuerth",
    name: "Fürth",
    region: "Bayern",
    intro: "Fürth — die Kleeblattstadt direkt neben Nürnberg — bietet mit ihren historischen Locations und modernen Eventspaces den perfekten Rahmen für magische Unterhaltung. Als Zauberer für Fürth bin ich schnell vor Ort.",
    highlight: "Fürth und Nürnberg bilden zusammen einen der stärksten Eventstandorte Bayerns — ich bediene beide Städte regelmäßig.",
    einwohner: "130.000",
    bekannteLocations: ["Stadthalle Fürth", "Kulturforum", "Grüner Brauhaus", "Schloss Burgfarrnbach", "Rundfunkmuseum"],
    faq: [
      { q: "Was kostet ein Zauberer in Fürth?", a: "Ich erstelle dir gerne ein individuelles Angebot — die Beratung ist kostenlos und unverbindlich." },
      { q: "Kann der Zauberer auch in der Metropolregion Nürnberg auftreten?", a: "Selbstverständlich! Ich trete in Fürth, Nürnberg, Erlangen und der gesamten Metropolregion auf." },
    ],
    seoText: "Zauberer Fürth: Emilian Leber begeistert als Entertainer auf Events in Fürth und der Metropolregion Nürnberg. Zaubershow, Close-Up Magie und Comedy für Firmenfeiern, Hochzeiten und Geburtstage.",
    langText: `Fürth — die Kleeblattstadt direkt neben Nürnberg, mit eigenem Charakter und einer lebendigen Eventszene. Als Zauberer für Fürth bin ich schnell vor Ort und kenne die lokalen Locations bestens — von der Stadthalle über das Kulturforum bis zu historischen Locations im Stadtpark.

Firmenfeiern in Fürth, Hochzeiten in Schloss Burgfarrnbach oder Geburtstage im Grünen Brauhaus — ich passe mein Programm immer dem Ort und dem Publikum an. Moderner Zauberkünstler-Stil, der begeistert und unterhält.

Preise Zauberer Fürth: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."rosenheim",
    name: "Rosenheim",
    region: "Bayern",
    intro: "Rosenheim — das Tor zum Chiemgau — verbindet oberbayerische Gemütlichkeit mit modernem Eventflair. Als Zauberer für Rosenheim bringe ich professionelle Magie zu Firmenfeiern, Hochzeiten und besonderen Anlässen zwischen Inn und Alpen.",
    highlight: "Rosenheim und das Chiemgau bieten traumhafte Event-Locations — von der Almhütte bis zum modernen Kongresszentrum.",
    einwohner: "65.000",
    bekannteLocations: ["Kultur + Kongress Zentrum", "Inntalhalle", "AuerBräu", "Gasthof Höhenberg", "Schloss Maxlrain"],
    faq: [
      { q: "Was kostet ein Zauberer in Rosenheim?", a: "Die Kosten variieren je nach Format. Kontaktiere mich für ein kostenloses Angebot — Anfahrt nach Rosenheim ist inklusive." },
      { q: "Tritt der Zauberer auch am Chiemsee auf?", a: "Ja! Events am Chiemsee, in Prien, auf der Herreninsel oder im gesamten Chiemgau gehören zu meinem Einzugsgebiet." },
    ],
    seoText: "Zauberer Rosenheim: Emilian Leber ist dein Zauberkünstler für Events in Rosenheim und dem Chiemgau. Close-Up Magie, Bühnenshow und Magic Dinner für Firmenfeiern, Hochzeiten und Geburtstage in Oberbayern.",
    langText: `Rosenheim — das Tor zum Chiemgau, eingebettet zwischen Inn und Alpen. Als Zauberer für Rosenheim bringe ich modernes Entertainment in eine Stadt, die oberbayerische Gemütlichkeit mit starker Wirtschaft verbindet.

Von der Inntalhalle über das Kultur + Kongress Zentrum bis zu rustikalen Almhütten im Chiemgau — die Region bietet außergewöhnliche Event-Locations, die durch professionelle Zauberkunst noch unvergesslicher werden.

Kosten Zauberer Rosenheim: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."kempten",
    name: "Kempten",
    region: "Bayern",
    intro: "Kempten — die Hauptstadt des Allgäus — ist einer der ältesten Städte Deutschlands und ein starker Eventstandort. Als Zauberer für Kempten bringe ich moderne Magie ins Allgäu — von der Firmenfeier bis zur Hochzeit mit Bergpanorama.",
    highlight: "Das Allgäu steht für Genuss, Natur und Gastfreundschaft — meine Magie ergänzt dieses Erlebnis perfekt.",
    einwohner: "70.000",
    bekannteLocations: ["bigBOX Allgäu", "Kornhaus Kempten", "Residenz Kempten", "Allgäuhalle", "Schloss zu Hopferau"],
    faq: [
      { q: "Was kostet ein Zauberer in Kempten?", a: "Ich berate dich gerne kostenlos und erstelle ein individuelles Angebot für dein Event im Allgäu." },
      { q: "Tritt der Zauberer auch in Oberstdorf oder Füssen auf?", a: "Ja, ich trete im gesamten Allgäu auf — von Kempten über Oberstdorf bis Füssen und Umgebung." },
    ],
    seoText: "Zauberer Kempten: Emilian Leber begeistert als Zauberkünstler im Allgäu. Professionelle Zaubershow und Close-Up Magie für Firmenfeiern, Hochzeiten und Events in Kempten und dem gesamten Allgäu.",
    langText: `Kempten — die älteste Stadt Deutschlands und Hauptstadt des Allgäus. Als Zauberer für Kempten bringe ich moderne Magie ins Allgäu — von Firmenfeiern in der bigBOX über Hochzeiten auf Schloss Hopferau bis zu Galas im Kornhaus.

Das Allgäu steht für Genuss, Natur und Gastfreundschaft — meine Zauberkunst ergänzt dieses besondere Lebensgefühl perfekt. Ob traditionelles Allgäuer Event oder moderner Corporate Abend — ich passe mein Programm dem Charakter des Anlasses an.

Preise Zauberer Kempten: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."aschaffenburg",
    name: "Aschaffenburg",
    region: "Bayern",
    intro: "Aschaffenburg — das bayerische Nizza am Main — bietet mit Schloss Johannisburg und zahlreichen Eventlocations den perfekten Rahmen für magische Events. Als Zauberer für Aschaffenburg bringe ich modernes Entertainment nach Unterfranken.",
    highlight: "Aschaffenburg liegt am Tor zum Spessart und nahe dem Rhein-Main-Gebiet — perfekt für Events zwischen Frankfurt und Würzburg.",
    einwohner: "72.000",
    bekannteLocations: ["Stadthalle am Schloss", "Schloss Johannisburg", "Colos-Saal", "Hotel Wilder Mann", "Martinushaus"],
    faq: [
      { q: "Was kostet ein Zauberer in Aschaffenburg?", a: "Die Kosten richten sich nach Format und Dauer. Kontaktiere mich für eine kostenlose Beratung." },
      { q: "Tritt der Zauberer auch im Rhein-Main-Gebiet auf?", a: "Ja! Von Aschaffenburg aus bediene ich auch Frankfurt, Darmstadt, Hanau und das gesamte Rhein-Main-Gebiet." },
    ],
    seoText: "Zauberer Aschaffenburg: Emilian Leber ist dein Entertainer für Events in Aschaffenburg und Unterfranken. Zaubershow, Close-Up Magie und Magic Dinner für Firmenfeiern, Hochzeiten und besondere Anlässe.",
    langText: `Aschaffenburg — das bayerische Nizza am Main, nahe dem Rhein-Main-Gebiet. Als Zauberer für Aschaffenburg bringe ich modernes Entertainment in die Schlossstadt Unterfrankens — für Firmenfeiern, Hochzeiten und Galas.

Von Firmenevents in der Stadthalle am Schloss über Hochzeiten im Hotel Wilder Mann bis zu privaten Feiern im Schloss Johannisburg-Umfeld — Aschaffenburg bietet tolle Locations, und ich liefere das passende Showkonzept.

Kosten Zauberer Aschaffenburg: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."straubing",
    name: "Straubing",
    region: "Bayern",
    intro: "Straubing — die Gäuboden-Metropole — ist bekannt für das Gäubodenvolksfest und eine lebendige Eventszene. Als Zauberer für Straubing bringe ich moderne Magie in die niederbayerische Stadt an der Donau.",
    highlight: "Straubing liegt nur 40 Minuten von Regensburg entfernt — kurze Wege und schnelle Verfügbarkeit für dein Event.",
    einwohner: "48.000",
    bekannteLocations: ["Joseph-von-Fraunhofer-Halle", "Rathaussaal Straubing", "Herzogschloss", "Hotel Asam", "TUM Campus Straubing"],
    faq: [
      { q: "Was kostet ein Zauberer in Straubing?", a: "Ich erstelle dir gerne ein individuelles Angebot — die Beratung ist kostenlos und die Anfahrt nach Straubing ist inklusive." },
      { q: "Tritt der Zauberer auch beim Gäubodenvolksfest auf?", a: "Side-Events und VIP-Zelte auf dem Volksfest sind eine großartige Gelegenheit — ich bin gerne dabei!" },
    ],
    seoText: "Zauberer Straubing: Emilian Leber begeistert als Zauberkünstler auf Events in Straubing und dem Gäuboden. Close-Up Magie und Bühnenshow für Firmenfeiern, Hochzeiten und Feste in Niederbayern.",
    langText: `Straubing — Gäuboden-Metropole und Heimat des berühmten Gäubodenvolksfestes. Als Zauberer für Straubing bringe ich moderne Magie in die niederbayerische Donaustadt — nur 40 Minuten von Regensburg, mit kurzen Wegen und voller Verfügbarkeit.

Von Firmenevents in der Fraunhofer-Halle über Hochzeiten im Hotel Asam bis zu Side-Events beim Volksfest — Straubing bietet vielfältige Eventmöglichkeiten, für die ich das passende Programm entwickle.

Preise Zauberer Straubing: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."freising",
    name: "Freising",
    region: "Bayern",
    intro: "Freising — die älteste Stadt an der Isar und direkt am Münchner Flughafen gelegen — ist ein idealer Standort für Events mit internationalem Flair. Als Zauberer für Freising bringe ich professionelle Magie zu Firmenfeiern, Hochzeiten und Galas.",
    highlight: "Direkt am Flughafen München gelegen, ist Freising perfekt für internationale Events und Konferenzen — Magie überwindet jede Sprachbarriere.",
    einwohner: "50.000",
    bekannteLocations: ["Luitpoldhalle", "Domberg Freising", "Weihenstephan Bräustüberl", "Novotel München Airport", "Hilton Munich Airport"],
    faq: [
      { q: "Was kostet ein Zauberer in Freising?", a: "Die Kosten richten sich nach Art des Events. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Tritt der Zauberer auch bei Flughafen-Events auf?", a: "Ja! Events am Münchner Flughafen, Konferenzen und internationale Galas gehören zu meinem Repertoire." },
    ],
    seoText: "Zauberer Freising: Emilian Leber ist dein Zauberkünstler für Events in Freising und am Münchner Flughafen. Professionelle Zaubershow für Firmenfeiern, Konferenzen und Hochzeiten.",
    langText: `Freising — die älteste Stadt an der Isar, direkt am Münchner Flughafen und mit dem weltbekannten Weihenstephan. Als Zauberer für Freising bringe ich professionelles Entertainment zu Firmenfeiern, Konferenzen und Galas in unmittelbarer Flughafennähe.

Events am Münchner Flughafen, internationale Konferenzen in den Flughafenhotels oder Hochzeiten am historischen Domberg — Freising bietet eine einzigartige Mischung aus internationaler Erreichbarkeit und bayerischem Charme.

Kosten Zauberer Freising: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."berlin",
    name: "Berlin",
    region: "Berlin",
    intro: "Berlin ist die Stadt der Events und der großen Bühnen. Als Zauberer für Berlin bringe ich moderne Zauberkunst in die Hauptstadt — von Corporate Events in Mitte über Hochzeiten in Charlottenburg bis zu Galas am Potsdamer Platz.",
    highlight: "Hauptstadt-Events verdienen Hauptstadt-Entertainment — professionell, modern, unvergesslich.",
    einwohner: "3.700.000",
    bekannteLocations: ["Hotel Adlon Kempinski", "Estrel Berlin", "Friedrichstadt-Palast (Umfeld)", "Spindler & Klatt", "Soho House Berlin"],
    faq: [
      { q: "Was kostet ein Zauberer in Berlin?", a: "Die Kosten variieren je nach Format. Kontaktiere mich für ein individuelles Angebot — Anfahrt und Übernachtung sind bei Berlin-Events inklusive." },
      { q: "Tritt der Zauberer regelmäßig in Berlin auf?", a: "Ja, ich bin mehrmals im Jahr für Events in Berlin — von Firmenfeiern bis zu privaten Feiern." },
    ],
    seoText: "Zauberer Berlin: Emilian Leber begeistert als professioneller Zauberkünstler auf Events in Berlin. Close-Up Magie, Bühnenshow und Magic Dinner für Firmenfeiern, Hochzeiten und Galas in der Hauptstadt.",
    langText: `Berlin ist die Hauptstadt der Kreativität, der großen Shows und der unvergesslichen Events. Als Zauberer für Berlin begeistere ich auf Firmenfeiern in Mitte, Hochzeiten in Charlottenburg und Galas am Potsdamer Platz — mit moderner Magie, die zur Energie dieser Stadt passt.

Close-Up Magie direkt bei deinen Gästen, eine durchkomponierte Bühnenshow oder ein exklusives Magic Dinner — in Berlin setze ich alle drei Formate regelmäßig um. Das Berliner Publikum liebt Unterhaltung, die überrascht und gleichzeitig intelligent ist. Genau das liefere ich.

Einen Zauberer für Berlin buchen: Meine Pakete beginnen ab 395 €. Anfahrt und ggf. Übernachtung sind inklusive — keine versteckten Kosten.

Ob Startup-Party in Kreuzberg, Gala im Adlon oder Mittelstand-Weihnachtsfeier in Prenzlauer Berg: Ich kenne das Berliner Eventpublikum und passe mein Programm entsprechend an. Von Techunternehmen in Mitte bis zu Kulturfirmen in Friedrichshain — moderner Zauberkünstler-Stil, der zum urbanen Berliner Lebensgefühl passt.

Für Hochzeiten in Berlin — ob klassisch in Charlottenburg oder industrial-chic in Treptow — sorge ich beim Sektempfang und während des Dinners für magische Momente, die deine Gäste nie vergessen werden. Als Hochzeitszauberer für Berlin bin ich ein erfahrener Partner.

Jetzt unverbindlich anfragen: Ich antworte innerhalb von 24 Stunden und entwickle gemeinsam mit dir das perfekte Showkonzept für dein Event in Berlin.`,
  },
  {
    slug: "hamburg",
    name: "Hamburg",
    region: "Hamburg",
    intro: "Von der Elbphilharmonie bis zur Speicherstadt — in Hamburg liefere ich Magie, die zur Hansestadt passt. Als Zauberer für Hamburg begeistere ich auf Firmenfeiern, Hochzeiten und exklusiven Events mit Close-Up Magie und Bühnenshow.",
    highlight: "Hanseatisch elegant, modern inszeniert — professionelles Entertainment für die schönste Stadt im Norden.",
    einwohner: "1.900.000",
    bekannteLocations: ["Hotel Atlantic Kempinski", "Speicherstadt Eventlocations", "Cruise Center HafenCity", "Alsterhaus", "East Hotel"],
    faq: [
      { q: "Was kostet ein Zauberer in Hamburg?", a: "Die Kosten richten sich nach Format und Dauer. Anfahrt und Übernachtung sind bei Hamburg-Events inklusive." },
      { q: "Wie buche ich einen Zauberer für eine Firmenfeier in Hamburg?", a: "Einfach über mein Kontaktformular anfragen — ich melde mich innerhalb von 24 Stunden mit einem individuellen Angebot." },
    ],
    seoText: "Zauberer Hamburg: Emilian Leber ist dein Entertainer für Events in Hamburg. Professionelle Zaubershow, Close-Up Magie und Comedy für Firmenfeiern, Hochzeiten und Galas in der Hansestadt.",
    langText: `Hamburg — die Hansestadt an der Elbe, Deutschlands Tor zur Welt und eine der schönsten Städte des Landes. Als Zauberer für Hamburg verbinde ich hanseatische Eleganz mit moderner Zauberkunst, die überrascht und begeistert.

Firmenfeiern in der Speicherstadt, Galas in der Elbphilharmonie-Umgebung, Hochzeiten in der HafenCity — Hamburg bietet Weltklasse-Locations für Weltklasse-Entertainment. Ich liefere genau das: professionell, charmant und unvergesslich.

Kosten Zauberer Hamburg: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."frankfurt",
    name: "Frankfurt",
    region: "Hessen",
    intro: "Frankfurt — die Finanz- und Messestadt am Main — braucht Entertainment auf höchstem Niveau. Als Zauberer für Frankfurt liefere ich genau das: Premium Close-Up Magie, Bühnenshow und Magic Dinner für Corporate Events, Messen und private Feiern.",
    highlight: "Ideal für Corporate Events und Messeauftritte — Frankfurt ist einer der wichtigsten Eventstandorte Deutschlands.",
    einwohner: "760.000",
    bekannteLocations: ["Messe Frankfurt", "Alte Oper", "Palmengarten", "Villa Kennedy", "Frankfurter Societät"],
    faq: [
      { q: "Was kostet ein Zauberer in Frankfurt?", a: "Die Kosten variieren je nach Format. Kontaktiere mich für eine kostenlose Beratung und ein individuelles Angebot." },
      { q: "Tritt der Zauberer auch auf Messen in Frankfurt auf?", a: "Ja! Messeauftritte gehören zu meinem Kerngeschäft — ich ziehe Besucher an euren Stand und mache eure Marke unvergesslich." },
    ],
    seoText: "Zauberer Frankfurt: Emilian Leber begeistert als Zauberkünstler auf Events in Frankfurt am Main. Close-Up Magie und Bühnenshow für Firmenfeiern, Messen, Hochzeiten und Galas in der Mainmetropole.",
    langText: `Frankfurt am Main — das wirtschaftliche Herz Deutschlands, Finanzmetropole und internationale Messestadt. Als Zauberer für Frankfurt liefere ich Entertainment auf dem Niveau, das diese Stadt und ihre anspruchsvollen Events verlangen.

Von Messeauftritten auf der Frankfurter Messe über Bankenjubiläen in der Alten Oper bis zu exklusiven Galas in der Palmengarten-Orangerie — Frankfurt bietet die wichtigsten Event-Locations Deutschlands, und ich bin dort regelmäßig präsent.

Preise Zauberer Frankfurt: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."stuttgart",
    name: "Stuttgart",
    region: "Baden-Württemberg",
    intro: "Stuttgart — die Stadt der Ingenieure und Innovationen — verdient Entertainment, das genauso präzise und beeindruckend ist. Als Zauberer für Stuttgart bringe ich moderne Magie zu Firmenfeiern, Hochzeiten und Events im Schwabenland.",
    highlight: "Technik trifft Kreativität — moderne Magie für die innovativste Stadt Süddeutschlands.",
    einwohner: "630.000",
    bekannteLocations: ["Porsche Museum", "Mercedes-Benz Museum", "Liederhalle", "Wizemann", "Hotel am Schlossgarten"],
    faq: [
      { q: "Was kostet ein Zauberer in Stuttgart?", a: "Ich erstelle dir ein individuelles Angebot — die Beratung ist kostenlos und unverbindlich." },
      { q: "Tritt der Zauberer auch bei Automotive-Events auf?", a: "Ja, Corporate Events für Automobilunternehmen sind einer meiner Schwerpunkte — professionell und auf hohem Niveau." },
    ],
    seoText: "Zauberer Stuttgart: Emilian Leber ist dein Entertainer für Events in Stuttgart und Baden-Württemberg. Professionelle Zaubershow für Firmenfeiern, Hochzeiten und Corporate Events in der Schwabenmetropole.",
    langText: `Stuttgart — die schwäbische Metropole, Stadt der Automobil-Ikonen und des kreativen Unternehmertums. Als Zauberer für Stuttgart verbinde ich technische Präzision mit kreativer Magie — für Firmenfeiern, Hochzeiten und Galas in der Schwabenmetropole.

Automotive-Events bei Porsche oder Mercedes, Weihnachtsfeiern im Wizemann, Hochzeiten im Schlosspark oder Galas in der Liederhalle — Stuttgart bietet erstklassige Eventlocations. Mein Programm passt sich dem jeweiligen Stil perfekt an.

Kosten Zauberer Stuttgart: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."koeln",
    name: "Köln",
    region: "Nordrhein-Westfalen",
    intro: "Kölner lieben gute Unterhaltung — und genau die bringe ich mit. Als Zauberer für Köln begeistere ich mit moderner Close-Up Magie und Comedy-Zaubershow auf Firmenfeiern, Hochzeiten und Events am Rhein.",
    highlight: "Rheinische Lebensfreude trifft moderne Zauberkunst — perfekt für Events in der Domstadt.",
    einwohner: "1.080.000",
    bekannteLocations: ["Flora Köln", "Gürzenich", "Wolkenburg", "Hyatt Regency", "Dock.One"],
    faq: [
      { q: "Was kostet ein Zauberer in Köln?", a: "Die Kosten richten sich nach Format und Dauer. Anfahrt ist bei Köln-Events inklusive." },
      { q: "Eignet sich ein Zauberer für Karneval-Events?", a: "Absolut! Ob Karnevalssitzung, After-Party oder Firmen-Karneval — Magie passt perfekt zum Kölner Karneval." },
    ],
    seoText: "Zauberer Köln: Emilian Leber begeistert als Zauberkünstler auf Events in Köln. Close-Up Magie, Bühnenshow und Comedy für Firmenfeiern, Hochzeiten und Galas am Rhein.",
    langText: `Köln — Dom, Rhein und das herzlichste Publikum Deutschlands. Als Zauberer für Köln passe ich mich der besonderen Energie dieser rheinischen Metropole an — direkt, herzlich, humorvoll und auf Augenhöhe mit dem kölschen Lebensgefühl.

Vom Karneval-Event über die Weihnachtsfeier im Gürzenich bis zur Hochzeit in der Wolkenburg — Köln bietet wunderbare Locations für Events, die in Erinnerung bleiben. Als Zauberer für Köln bringe ich Close-Up Magie und Bühnenshow, die perfekt zum rheinischen Spirit passen.

Preise Zauberer Köln: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."duesseldorf",
    name: "Düsseldorf",
    region: "Nordrhein-Westfalen",
    intro: "Düsseldorf als Mode- und Messestadt verlangt nach hochwertigem Entertainment. Als Zauberer für Düsseldorf liefere ich professionelle Magie für Corporate Events, Galas und exklusive Feiern in der Landeshauptstadt.",
    highlight: "Premium-Entertainment für die Landeshauptstadt — stilvoll, modern, beeindruckend.",
    einwohner: "620.000",
    bekannteLocations: ["Messe Düsseldorf", "Rheinterrasse", "Hotel Nikko", "Schloss Benrath", "Van der Valk Airporthotel"],
    faq: [
      { q: "Was kostet ein Zauberer in Düsseldorf?", a: "Die Kosten variieren nach Format. Kontaktiere mich für ein kostenloses Angebot — Anfahrt ist inklusive." },
      { q: "Tritt der Zauberer auch auf der Düsseldorfer Messe auf?", a: "Ja, Messeauftritte und Standprogramme gehören zu meinem Kerngeschäft." },
    ],
    seoText: "Zauberer Düsseldorf: Emilian Leber ist dein Entertainer für Events in Düsseldorf. Professionelle Zaubershow für Firmenfeiern, Messen, Hochzeiten und Galas in der Landeshauptstadt.",
    langText: `Düsseldorf — Mode-Metropole am Rhein und internationaler Messestandort. Als Zauberer für Düsseldorf liefere ich Premium-Entertainment für exklusive Events, die dem gehobenen Anspruch dieser Stadt entsprechen.

Von Messeauftritten auf dem Düsseldorfer Messegelände über Fashion-Events in der Altstadt bis zu Hochzeiten in Schloss Benrath — Düsseldorf bietet erstklassige Locations. Als Zauberer für Düsseldorf bringe ich das passende Showkonzept dazu.

Kosten Zauberer Düsseldorf: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."dresden",
    name: "Dresden",
    region: "Sachsen",
    intro: "Dresden vereint Eleganz und Kultur wie kaum eine andere deutsche Stadt. Als Zauberer für Dresden bringe ich moderne Magie, die sich nahtlos in dieses besondere Ambiente einfügt — von der Semperoper bis zur Frauenkirche.",
    highlight: "Elegante Magie für die Kulturstadt an der Elbe — stilvolle Events verdienen stilvolles Entertainment.",
    einwohner: "560.000",
    bekannteLocations: ["Taschenbergpalais Kempinski", "Albertinum", "Residenzschloss", "Messe Dresden", "Bülow Palais"],
    faq: [
      { q: "Was kostet ein Zauberer in Dresden?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein individuelles Angebot." },
      { q: "Eignet sich ein Zauberer für Galas und Kulturevents in Dresden?", a: "Absolut! Dresden ist eine Kulturstadt — elegante Magie, die sich nahtlos in das stilvolle Ambiente der Elbestadt einfügt. Galas, Charity-Events und Firmenfeiern sind meine Spezialität." },
      { q: "Tritt der Zauberer auch in Meißen und ganz Sachsen auf?", a: "Ja, ich trete in ganz Sachsen auf — Dresden, Meißen, Pirna und die gesamte Region sind mein Einzugsgebiet." },
    ],
    seoText: "Zauberer Dresden: Emilian Leber begeistert als Zauberkünstler auf Events in Dresden. Close-Up Magie und Bühnenshow für Firmenfeiern, Hochzeiten und kulturelle Events in Elbflorenz.",
    langText: `Dresden — die Elbflorenz, eine der kulturreichsten Städte Deutschlands. Als Zauberer für Dresden liefere ich elegante Magie, die sich nahtlos in das stilvolle Ambiente einfügt — für Galas, Firmenfeiern und Hochzeiten.

Von Galas im Taschenbergpalais über Firmenfeiern im Albertinum bis zu Hochzeiten im Residenzschloss-Umfeld — Dresden bietet grandiose Locations. Mein Programm passt sich dem kulturellen Anspruch der Elbestadt an.

Preise Zauberer Dresden: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."leipzig",
    name: "Leipzig",
    region: "Sachsen",
    intro: "Leipzig ist jung, kreativ und voller Energie — perfekt für moderne Zauberkunst, die überrascht und begeistert. Als Zauberer für Leipzig bringe ich Entertainment zu Events in Sachsens aufstrebender Metropole.",
    highlight: "Kreative Stadt, kreative Magie — Leipzig ist die perfekte Bühne für modernes Entertainment.",
    einwohner: "600.000",
    bekannteLocations: ["Gewandhaus", "Kongresshalle am Zoo", "Spinnerei", "Eventpalast", "Westin Leipzig"],
    faq: [
      { q: "Was kostet ein Zauberer in Leipzig?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein individuelles Angebot." },
      { q: "Eignet sich ein Zauberer für Firmenfeiern in Leipzig?", a: "Ja! Leipzig ist eine aufstrebende Wirtschaftsmetropole — Corporate Events, Weihnachtsfeiern und Firmenjubiläen sind einer meiner Schwerpunkte." },
      { q: "Tritt der Zauberer auch in Halle und ganz Sachsen auf?", a: "Ja, ich trete in Leipzig, Halle (Saale) und der gesamten Region Sachsen auf." },
    ],
    seoText: "Zauberer Leipzig: Emilian Leber ist dein Entertainer für Events in Leipzig. Professionelle Zaubershow und Close-Up Magie für Firmenfeiern, Hochzeiten und Galas in der sächsischen Metropole.",
    langText: `Leipzig — kreativ, jung, aufstrebend. Als Zauberer für Leipzig passe ich mich dem besonderen Spirit dieser sächsischen Metropole an — überraschend, interaktiv und auf dem Puls der Zeit.

Firmenfeiern im Tapetenwerk, Hochzeiten in der Spinnerei oder Galas im Gewandhaus — Leipzig bietet außergewöhnliche Eventlocations mit Charakter. Das Leipziger Publikum liebt Entertainment, das bewegt.

Kosten Zauberer Leipzig: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."hannover",
    name: "Hannover",
    region: "Niedersachsen",
    intro: "Als Messestadt Nummer eins bietet Hannover zahlreiche Gelegenheiten für professionelles Event-Entertainment. Als Zauberer für Hannover liefere ich Close-Up Magie, Bühnenshow und Magic Dinner auf höchstem Niveau.",
    highlight: "Messestadt trifft Magie — perfekt für B2B-Events, Kongresse und Corporate Entertainment.",
    einwohner: "535.000",
    bekannteLocations: ["Hannover Messe", "HCC Hannover Congress Centrum", "Herrenhäuser Gärten", "GOP Varieté-Theater", "Schloss Marienburg"],
    faq: [
      { q: "Was kostet ein Zauberer in Hannover?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein individuelles Angebot." },
      { q: "Tritt der Zauberer auch auf Messen in Hannover auf?", a: "Ja! Die Hannover Messe ist eine der wichtigsten Messen der Welt — Messeauftritte und Standprogramme gehören zu meinen Kernleistungen." },
      { q: "Eignet sich ein Zauberer für Kongresse in Hannover?", a: "Absolut. B2B-Events, Kongresse und Gala-Abende im HCC Hannover Congress Centrum sind ideale Formate für professionelle Zauberkunst." },
    ],
    seoText: "Zauberer Hannover: Emilian Leber begeistert als Zauberkünstler auf Events in Hannover. Close-Up Magie und Bühnenshow für Firmenfeiern, Messen und Hochzeiten in der Messestadt.",
    langText: `Hannover — die Messestadt schlechthin und Tor zum Norden. Als Zauberer für Hannover bringe ich professionelles Entertainment für B2B-Events, Kongresse und Firmenfeiern in Niedersachsens Landeshauptstadt.

Messeauftritte auf der Hannover Messe, Kongress-Entertainment im HCC oder Galas in den Herrenhäuser Gärten — Hannover ist ein Top-Eventstandort, und ich liefere das passende Showkonzept. Professionell, interaktiv und unvergesslich.

Preise Zauberer Hannover: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."Für Veranstaltungen im Raum Hannover empfehle ich meinen Kollegen ",
      linkText: "Zauberer Simabu aus Hannover",
      linkHref: "https://www.simabu.com",
      suffix: " – ein Zauberkünstler aus Hannover mit über 1.500 Auftritten auf Hochzeiten, Firmenfeiern etc. in Hannover und ganz Niedersachsen.",
    },
  },
  {
    slug: "dortmund",
    name: "Dortmund",
    region: "Nordrhein-Westfalen",
    intro: "Im Ruhrgebiet sorge ich als Zauberer für Events, die genauso kraftvoll und ehrlich sind wie die Region selbst. Von Firmenfeiern bis Hochzeiten — moderne Magie für Dortmund und das Ruhrgebiet.",
    highlight: "Echte Magie für echte Menschen — das Ruhrgebiet verdient Entertainment, das von Herzen kommt.",
    einwohner: "590.000",
    bekannteLocations: ["Westfalenhallen", "Signal Iduna Park Logen", "DASA", "View Skylounge", "Steigenberger Dortmund"],
    faq: [
      { q: "Was kostet ein Zauberer in Dortmund?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein individuelles Angebot." },
      { q: "Eignet sich ein Zauberer für Betriebsfeiern im Ruhrgebiet?", a: "Absolut! Betriebsfeiern, Weihnachtsfeiern und Firmenjubiläen im Ruhrgebiet sind einer meiner Schwerpunkte — professionell und modern." },
      { q: "Tritt der Zauberer auch in Essen, Bochum und dem Ruhrgebiet auf?", a: "Ja, ich trete im gesamten Ruhrgebiet auf — Dortmund, Essen, Bochum, Gelsenkirchen und Umgebung." },
    ],
    seoText: "Zauberer Dortmund: Emilian Leber ist dein Entertainer für Events in Dortmund und dem Ruhrgebiet. Zaubershow und Close-Up Magie für Firmenfeiern, Hochzeiten und Galas.",
    langText: `Dortmund — Herz des Ruhrgebiets, Fußball-Hochburg und aufstrebender Wirtschaftsstandort. Als Zauberer für Dortmund bringe ich moderne Magie, die genauso direkt und kraftvoll ist wie die Stadt selbst.

Von Firmenfeiern in den Westfalenhallen über Betriebsevents in der DASA bis zu Hochzeiten in der View Skylounge — Dortmund bietet starke Eventlocations, und ich liefere Entertainment, das das Ruhrgebiets-Publikum begeistert.

Kosten Zauberer Dortmund: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."bremen",
    name: "Bremen",
    region: "Bremen",
    intro: "Von der Schlachte bis zum Ratskeller — in Bremen liefere ich Magie, die zur Hansestadt passt. Als Zauberer für Bremen begeistere ich auf Firmenfeiern, Hochzeiten und Events im hohen Norden.",
    highlight: "Norddeutsch charmant, magisch inszeniert — professionelles Entertainment für Bremen und Umgebung.",
    einwohner: "570.000",
    bekannteLocations: ["Atlantic Grand Hotel", "Übersee-Museum", "Schlachte", "Weser-Stadion Logen", "BLG-Forum"],
    faq: [
      { q: "Was kostet ein Zauberer in Bremen?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein individuelles Angebot." },
      { q: "Eignet sich ein Zauberer für Firmenfeiern in Bremen?", a: "Ja! Bremen ist ein starker Wirtschaftsstandort — Firmenfeiern, Weihnachtsfeiern und Corporate Events gehören zu meinen Spezialitäten." },
      { q: "Tritt der Zauberer auch in Bremerhaven und Niedersachsen auf?", a: "Ja, von Bremen aus bin ich in Bremerhaven, Oldenburg und der gesamten Region schnell erreichbar." },
    ],
    seoText: "Zauberer Bremen: Emilian Leber begeistert als Zauberkünstler auf Events in Bremen. Close-Up Magie und Bühnenshow für Firmenfeiern, Hochzeiten und besondere Anlässe in der Hansestadt.",
    langText: `Bremen — die alte Hansestadt an der Weser, mit Stadtmusikanten-Charme und norddeutscher Herzlichkeit. Als Zauberer für Bremen bringe ich modernes Entertainment zu Firmenfeiern, Hochzeiten und Events in der kleinsten deutschen Großstadt.

Von Events im Übersee-Museum über Firmenfeiern im BLG-Forum bis zu Hochzeiten am Schlachte-Ufer — Bremen bietet einzigartige Locations mit hanseatischem Flair. Mein Programm passt sich dieser besonderen Atmosphäre an.

Preise Zauberer Bremen: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."salzburg",
    name: "Salzburg",
    region: "Österreich",
    intro: "Auch international buchbar — in der Mozartstadt Salzburg bringe ich moderne Magie auf die Bühne. Als Zauberer für Salzburg liefere ich Entertainment für Events zwischen Festung und Mirabell.",
    highlight: "International buchbar — Salzburg ist von Regensburg aus in unter 2 Stunden erreichbar.",
    einwohner: "155.000",
    bekannteLocations: ["Schloss Mirabell", "Salzburg Congress", "Hotel Sacher Salzburg", "Stiftskeller St. Peter", "Hangar-7"],
    faq: [
      { q: "Was kostet ein Zauberer in Salzburg?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein individuelles Angebot." },
      { q: "Eignet sich ein Zauberer für Events im Rahmen der Salzburger Festspiele?", a: "Perfekt! Side-Events und Rahmenprogramme rund um die Festspiele sind eine großartige Gelegenheit — ich passe mein Programm dem kulturellen Rahmen an." },
      { q: "Tritt der Zauberer auch in Linz und Österreich auf?", a: "Ja, ich bin österreichweit buchbar — Salzburg, Linz, Wien und weitere Städte gehören zu meinem Einzugsgebiet." },
    ],
    seoText: "Zauberer Salzburg: Emilian Leber begeistert als Zauberkünstler auf Events in Salzburg. Close-Up Magie und Bühnenshow für Firmenfeiern, Hochzeiten und Galas in der Mozartstadt.",
    langText: `Salzburg — Mozarts Geburtsstadt, Festspielmetropole und eine der schönsten Städte Europas. Als Zauberer für Salzburg liefere ich Entertainment, das dem kulturellen Anspruch dieser besonderen österreichischen Stadt entspricht — elegant, professionell und unvergesslich.

Side-Events zu den Festspielen, Firmenfeiern in Schloss Mirabell oder Hochzeiten im Hotel Sacher — Salzburg bietet Weltklasse-Locations, und ich bringe das passende Showkonzept. Das Salzburger Publikum ist kulturaffin und anspruchsvoll — das schätze ich.

Kosten Zauberer Salzburg: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."wien",
    name: "Wien",
    region: "Österreich",
    intro: "Wien als Kulturhauptstadt verdient Entertainment auf Weltklasse-Niveau. Als Zauberer für Wien bringe ich moderne Magie, die zum Wiener Charme passt — von der Hofburg bis zum Palais Liechtenstein.",
    highlight: "Kaiserliche Stadt, moderne Magie — Wien bietet die Bühne für unvergessliche Events.",
    einwohner: "1.900.000",
    bekannteLocations: ["Hofburg Wien", "Palais Liechtenstein", "Hotel Sacher Wien", "Museumsquartier", "Kursalon Wien"],
    faq: [
      { q: "Was kostet ein Zauberer in Wien?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein individuelles Angebot." },
      { q: "Eignet sich ein Zauberer für Wiener Bälle und Galas?", a: "Absolut! Wien ist die Stadt der Bälle — elegante Magie, die zum kaiserlichen Ambiente passt. Ob Opernball-Umfeld, Charity-Gala oder Firmenball." },
      { q: "Kann ich den Zauberer für eine Hochzeit in Wien buchen?", a: "Ja! Hochzeiten in Wien, ob Schloss Schönbrunn, Palais Liechtenstein oder Kursalon — ich sorge für unvergessliche magische Momente." },
    ],
    seoText: "Zauberer Wien: Emilian Leber begeistert als Zauberkünstler auf Events in Wien. Professionelle Zaubershow und Close-Up Magie für Firmenfeiern, Bälle, Hochzeiten und Galas in der Kaiserstadt.",
    langText: `Wien — kaiserliche Weltstadt, Kulturzentrum Europas und eine der lebenswertesten Städte der Welt. Als Zauberer für Wien bringe ich moderne Magie, die dem einzigartigen Wiener Charme gerecht wird — für Galas, Bälle, Firmenfeiern und Hochzeiten.

Von Bällen in der Hofburg über Charity-Galas im Palais Liechtenstein bis zu Firmenfeiern im Museumsquartier — Wien bietet grandioseste Locations, und mein Programm hebt jedes Event auf ein neues Niveau.

Preise Zauberer Wien: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."muenster",
    name: "Münster",
    region: "Nordrhein-Westfalen",
    intro: "Münster — Universitätsstadt, Fahrradhauptstadt und kulturelles Zentrum Westfalens. Als Zauberer für Münster bringe ich moderne Magie zu Firmenfeiern, Hochzeiten und Events in der lebenswertesten Stadt Deutschlands. Von der historischen Innenstadt bis ins Münsterland.",
    highlight: "Münster verbindet studentisches Flair, Wirtschaftsstärke und westfälische Gastfreundschaft — die perfekte Bühne für unvergessliche Events mit professioneller Zauberkunst.",
    einwohner: "315.000",
    bekannteLocations: ["Halle Münsterland", "Schloss Münster", "Rathaus Münster", "Jovel Music Hall", "Steigenberger Hotel Münster"],
    faq: [
      { q: "Was kostet ein Zauberer in Münster?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein individuelles Angebot." },
      { q: "Für welche Events in Münster eignet sich ein Zauberer?", a: "Firmenfeiern, Hochzeiten, Geburtstage, Universitätsfeste, Weihnachtsfeiern, Galas — ich passe mein Programm individuell an deinen Anlass in Münster an." },
      { q: "Tritt der Zauberer auch im Münsterland auf?", a: "Ja! Ich trete in Münster und dem gesamten Münsterland auf — von Warendorf über Coesfeld bis Steinfurt." },
    ],
    seoText: "Zauberer Münster gesucht? Emilian Leber ist dein professioneller Zauberkünstler für Events in Münster und Westfalen. Mit interaktiver Close-Up Magie, einer begeisternden Bühnenshow oder einem exklusiven Magic Dinner wird deine Veranstaltung in Münster unvergesslich.",
    langText: `Münster — Universitätsstadt, Fahrradhauptstadt und eine der lebenswertesten Städte Deutschlands. Als Zauberer für Münster bringe ich modernes Entertainment zu Firmenfeiern, Hochzeiten und Events in der westfälischen Metropole.

Von Firmenevents in der Halle Münsterland über Hochzeiten im Schloss Münster bis zu Galas im historischen Rathaus — Münster bietet tolle Locations für Events, die begeistern. Das Münsteraner Publikum ist weltoffen und entertainment-begeistert.

Kosten Zauberer Münster: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."bochum",
    name: "Bochum",
    region: "Nordrhein-Westfalen",
    intro: "Bochum — Kulturstadt im Herzen des Ruhrgebiets. Von der Jahrhunderthalle bis zum RuhrCongress: Als Zauberer für Bochum bringe ich moderne Magie, die genauso überraschend und kraftvoll ist wie die Ruhrgebietskultur selbst.",
    highlight: "Das Ruhrgebiet hat Feuer — und Bochum ist eines seiner hellsten Lichter. Modernes Entertainment für eine Stadt, die sich neu erfindet.",
    einwohner: "365.000",
    bekannteLocations: ["RuhrCongress Bochum", "Jahrhunderthalle", "Bermuda3Eck", "Zeiss Planetarium Bochum", "BO-Sporthalle"],
    faq: [
      { q: "Was kostet ein Zauberer in Bochum?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Eignet sich ein Zauberer für Betriebsfeiern im Ruhrgebiet?", a: "Absolut! Betriebsfeiern, Firmenjubiläen und Corporate Events sind eine meiner Spezialitäten. Erfahrung mit Events aller Branchen im Ruhrgebiet." },
      { q: "Tritt der Zauberer auch in Essen und Herne auf?", a: "Ja, ich trete im gesamten Ruhrgebiet auf — Bochum, Essen, Herne, Gelsenkirchen, Witten und Umgebung." },
    ],
    seoText: "Zauberer Bochum: Emilian Leber begeistert als Zauberkünstler auf Events in Bochum und dem Ruhrgebiet. Close-Up Magie, Bühnenshow und Comedy für Firmenfeiern, Hochzeiten und Galas in der Kulturstadt.",
    langText: `Bochum — Kulturstadt im Herzen des Ruhrgebiets, Heimat von Musiklegenden und aufstrebendem Unternehmertum. Als Zauberer für Bochum bringe ich modernes Entertainment, das zum kreativen und kraftvollen Spirit dieser Stadt passt.

Von Firmenfeiern im RuhrCongress über Events in der Jahrhunderthalle bis zu Hochzeiten in stylischen Bochumer Locations — ich kenne das Ruhrgebiets-Publikum und liefere Shows, die begeistern und verbinden.

Preise Zauberer Bochum: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."bielefeld",
    name: "Bielefeld",
    region: "Nordrhein-Westfalen",
    intro: "Bielefeld — Wirtschaftsstandort in Ostwestfalen-Lippe und Heimat namhafter Unternehmen. Als Zauberer für Bielefeld bringe ich professionelles Entertainment zu Firmenfeiern, Hochzeiten und Events — für eine Stadt, die definitiv existiert.",
    highlight: "Bielefeld ist mehr als ein Mythos — starke Wirtschaft, lebhafte Eventszene und moderne Locations machen die Stadt zu einem Top-Standort für unvergessliche Events.",
    einwohner: "340.000",
    bekannteLocations: ["Stadthalle Bielefeld", "Rudolf-Oetker-Halle", "Sparrenburg", "Bauenhagen Bielefeld", "Wyndham Bielefeld Loom"],
    faq: [
      { q: "Was kostet ein Zauberer in Bielefeld?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein individuelles Angebot." },
      { q: "Tritt der Zauberer auch bei Firmenfeiern in Bielefeld auf?", a: "Ja! Bielefeld ist ein starker Wirtschaftsstandort — ich habe Erfahrung mit Corporate Events für mittelständische und große Unternehmen in OWL." },
      { q: "Für welche Anlässe kann ich einen Zauberer in Bielefeld buchen?", a: "Firmenfeiern, Weihnachtsfeiern, Hochzeiten, Geburtstage, Jubiläen, Messen — für jeden Anlass das passende Showformat." },
    ],
    seoText: "Zauberer Bielefeld: Emilian Leber ist dein Zauberkünstler für Events in Bielefeld und Ostwestfalen-Lippe. Professionelle Zaubershow, Close-Up Magie und Comedy für Firmenfeiern, Hochzeiten und Geburtstage.",
    langText: `Bielefeld — die Stadt, die definitiv existiert, mit einer lebhaften Eventszene in Ostwestfalen. Als Zauberer für Bielefeld bringe ich professionelles Entertainment zu Firmenfeiern, Hochzeiten und Events in der OWL-Region.

Von Firmenfeiern in der Stadthalle Bielefeld über Hochzeiten in der Rudolf-Oetker-Halle bis zu Events auf der Sparrenburg — Bielefeld bietet starke Locations, und ich entwickle das passende Showkonzept für jede Veranstaltung.

Kosten Zauberer Bielefeld: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."bonn",
    name: "Bonn",
    region: "Nordrhein-Westfalen",
    intro: "Bonn — Beethovens Geburtsstadt und einstige Bundeshauptstadt am Rhein. Als Zauberer für Bonn liefere ich Entertainment, das dem kulturellen Anspruch dieser besonderen Stadt entspricht — für Firmenfeiern, Hochzeiten und Galas.",
    highlight: "Beethoven, einstiger Bundestag und Rheinromantik — Bonn verbindet Geschichte, Kultur und internationales Flair. Der perfekte Rahmen für magische Events.",
    einwohner: "330.000",
    bekannteLocations: ["World Conference Center Bonn", "Beethovenhalle", "Poppelsdorfer Schloss", "Hotel Kameha Grand Bonn", "Altes Rathaus Bonn"],
    faq: [
      { q: "Was kostet ein Zauberer in Bonn?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Tritt der Zauberer auch auf internationalen Events in Bonn auf?", a: "Ja! Bonn ist ein internationaler Standort — ich habe Erfahrung mit multilingualen Events. Magie überwindet Sprachgrenzen." },
      { q: "Kann ich einen Zauberer für eine Hochzeit in Bonn buchen?", a: "Absolut! Hochzeiten in Bonn und dem Rheinland gehören zu meinen beliebtesten Formaten. Beim Sektempfang, Dinner oder der Party — magische Momente garantiert." },
    ],
    seoText: "Zauberer Bonn: Emilian Leber begeistert als Zauberkünstler auf Events in Bonn und der Rheinregion. Close-Up Magie, Bühnenshow und Comedy für Firmenfeiern, Hochzeiten und Galas in der Beethovenstadt.",
    langText: `Bonn — Beethovens Geburtsstadt, einstige Bundeshauptstadt und internationale Stadt am Rhein. Als Zauberer für Bonn liefere ich Entertainment, das dem kulturellen und internationalen Anspruch dieser besonderen Stadt entspricht.

Von internationalen Konferenzen im World Conference Center über Galas in der Beethovenhalle bis zu Hochzeiten am Rhein — Bonn bietet besondere Eventlocations, für die ich das passende Showprogramm entwickle.

Preise Zauberer Bonn: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."wuppertal",
    name: "Wuppertal",
    region: "Nordrhein-Westfalen",
    intro: "Wuppertal — Stadt der Schwebebahn, der Kunst und der überraschenden Momente. Als Zauberer für Wuppertal bringe ich Entertainment, das genauso verblüffend ist wie die berühmte Schwebebahn selbst. Firmenfeiern, Hochzeiten und Events im Bergischen Land.",
    highlight: "Wuppertal steht für Außergewöhnliches — die Schwebebahn, das Tanztheater Pina Bausch, der Skulpturenpark. Meine Magie fügt sich perfekt in diesen Spirit ein.",
    einwohner: "355.000",
    bekannteLocations: ["Historische Stadthalle Wuppertal", "Skulpturenpark Waldfrieden", "Kunstmuseum Wuppertal", "Opernhaus Wuppertal", "Hotel zur Post Wuppertal"],
    faq: [
      { q: "Was kostet ein Zauberer in Wuppertal?", a: "Kosten je nach Format: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Eignet sich ein Zauberer für kreative Events in Wuppertal?", a: "Perfekt! Wuppertal ist eine Kulturstadt — moderne, interaktive Zauberkunst passt ideal zu kreativen, anspruchsvollen Events." },
      { q: "Tritt der Zauberer auch in Solingen und Remscheid auf?", a: "Ja! Von Wuppertal aus bediene ich das gesamte Bergische Land — Solingen, Remscheid und Umgebung." },
    ],
    seoText: "Zauberer Wuppertal: Emilian Leber begeistert als Zauberkünstler auf Events in Wuppertal und dem Bergischen Land. Professionelle Zaubershow und Close-Up Magie für Firmenfeiern, Hochzeiten und kulturelle Events.",
    langText: `Wuppertal — Stadt der Schwebebahn, des Tanztheaters Pina Bausch und der überraschenden Momente. Als Zauberer für Wuppertal bringe ich Entertainment, das genauso außergewöhnlich ist wie die Stadt selbst — überraschend, kreativ und unvergesslich.

Von Firmenfeiern in der historischen Stadthalle über Kulturevents im Skulpturenpark Waldfrieden bis zu Hochzeiten in stylischen Locations — ich kenne die besondere Atmosphäre Wuppertals und passe mein Programm entsprechend an.

Kosten Zauberer Wuppertal: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."mannheim",
    name: "Mannheim",
    region: "Baden-Württemberg",
    intro: "Mannheim — die Quadratestadt an Rhein und Neckar. Als Zauberer für Mannheim bringe ich modernes Entertainment zu Firmenfeiern, Galas und Hochzeiten in einer der dynamischsten Städte Baden-Württembergs. Von der SAP Arena bis zum Rosengarten.",
    highlight: "Mannheim ist Wirtschaftsstandort, Kulturzentrum und Musikstadt in einem — ideale Bühne für professionelle Zauberkunst auf höchstem Niveau.",
    einwohner: "315.000",
    bekannteLocations: ["SAP Arena Mannheim", "Rosengarten Mannheim", "Altes Rathaus Mannheim", "Technoseum", "Maritim Parkhotel Mannheim"],
    faq: [
      { q: "Was kostet ein Zauberer in Mannheim?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein individuelles Angebot." },
      { q: "Tritt der Zauberer auch in Heidelberg und Ludwigshafen auf?", a: "Ja! Die Rhein-Neckar-Region ist mein Einzugsgebiet — Mannheim, Heidelberg, Ludwigshafen und die gesamte Metropolregion." },
      { q: "Eignet sich ein Zauberer für Firmenfeiern in Mannheim?", a: "Absolut — Mannheim ist ein starker Unternehmensstandort. Ich habe Erfahrung mit Corporate Events für Unternehmen aller Größen." },
    ],
    seoText: "Zauberer Mannheim: Emilian Leber ist dein Entertainer für Events in Mannheim und der Rhein-Neckar-Region. Professionelle Zaubershow für Firmenfeiern, Hochzeiten und Galas in der Quadratestadt.",
    langText: `Mannheim — die Quadratestadt an Rhein und Neckar, Wirtschaftszentrum und Musikstadt. Als Zauberer für Mannheim bringe ich modernes Entertainment für Firmenfeiern, Galas und Hochzeiten in der dynamischen Metropolregion Rhein-Neckar.

Von Firmenfeiern in der SAP Arena über Galas im Rosengarten bis zu Hochzeiten in stylischen Mannheimer Locations — ich entwickle für jede Veranstaltung das optimale Showkonzept. Modern, interaktiv und auf hohem Niveau.

Preise Zauberer Mannheim: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."karlsruhe",
    name: "Karlsruhe",
    region: "Baden-Württemberg",
    intro: "Karlsruhe — die Fächerstadt, Sitz des Bundesverfassungsgerichts und Technologiestandort am Rhein. Als Zauberer für Karlsruhe verbinde ich technische Präzision mit kreativer Magie — für Firmenfeiern, Konferenzen und Events.",
    highlight: "Karlsruhe steht für Innovation, Technologie und kreatives Denken — moderne Zauberkunst trifft genau diesen Geist.",
    einwohner: "310.000",
    bekannteLocations: ["Schwarzwaldhalle Karlsruhe", "Konzerthaus Karlsruhe", "Schloss Karlsruhe", "ZKM Karlsruhe", "Messe Karlsruhe"],
    faq: [
      { q: "Was kostet ein Zauberer in Karlsruhe?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Tritt der Zauberer auch auf IT- und Technologie-Events in Karlsruhe auf?", a: "Ja! Karlsruhe ist ein wichtiger Technologiestandort — Corporate Events und Tech-Konferenzen gehören zu meinem Repertoire." },
      { q: "Eignet sich ein Zauberer für Events am KIT oder der Dualen Hochschule?", a: "Auf jeden Fall — Hochschul-Events, Absolventenfeiern und Campus-Events sind ideale Formate für interaktive Zauberkunst." },
    ],
    seoText: "Zauberer Karlsruhe: Emilian Leber begeistert als Zauberkünstler auf Events in Karlsruhe und der Technologieregion. Close-Up Magie, Bühnenshow und Comedy für Firmenfeiern, Hochzeiten und Kongresse in der Fächerstadt.",
    langText: `Karlsruhe — die Fächerstadt, IT-Hochburg und Sitz des Bundesverfassungsgerichts. Als Zauberer für Karlsruhe verbinde ich technologische Präzision mit kreativer Magie — für Firmenfeiern, Kongresse und Events in der Technologieregion am Rhein.

Von IT-Events im ZKM über Firmenfeiern in der Schwarzwaldhalle bis zu Hochzeiten im Schlosspark — Karlsruhe bietet moderne Eventlocations, für die ich passende Showkonzepte entwickle.

Kosten Zauberer Karlsruhe: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."wiesbaden",
    name: "Wiesbaden",
    region: "Hessen",
    intro: "Wiesbaden — elegante Kurstadt, hessische Landeshauptstadt und Stadt der Villen. Als Zauberer für Wiesbaden bringe ich Entertainment, das dem exklusiven Ambiente dieser besonderen Stadt entspricht — für Galas, Firmenfeiern und Hochzeiten.",
    highlight: "Wiesbaden steht für Eleganz, Stil und besondere Anlässe — professionelle Zauberkunst, die genau diesem Anspruch gerecht wird.",
    einwohner: "280.000",
    bekannteLocations: ["Kurhaus Wiesbaden", "Hessisches Staatstheater Wiesbaden", "Bowling Green Wiesbaden", "Hotel Nassauer Hof", "Casinogesellschaft Wiesbaden"],
    faq: [
      { q: "Was kostet ein Zauberer in Wiesbaden?", a: "Kosten je nach Format: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Tritt der Zauberer auch auf Galas und exklusiven Events in Wiesbaden auf?", a: "Ja! Galas, Charity-Events und exklusive Dinner in Wiesbaden sind ideale Formate für professionelle Zauberkunst auf hohem Niveau." },
      { q: "Kann ich einen Zauberer für eine Hochzeit in Wiesbaden buchen?", a: "Absolut! Hochzeiten in Wiesbaden und dem Rhein-Main-Gebiet gehören zu meinen beliebtesten Formaten — elegant, interaktiv und unvergesslich." },
    ],
    seoText: "Zauberer Wiesbaden: Emilian Leber ist dein Entertainer für Events in Wiesbaden. Professionelle Zaubershow für Galas, Firmenfeiern und Hochzeiten in der hessischen Landeshauptstadt.",
    langText: `Wiesbaden — elegante Kurstadt, hessische Landeshauptstadt und Stadt der Villen. Als Zauberer für Wiesbaden liefere ich Entertainment, das dem exklusiven Ambiente dieser besonderen Stadt entspricht — stilsicher, professionell und unvergesslich.

Von Galas im Kurhaus über Charity-Events in eleganten Wiesbadener Villen bis zu Hochzeiten im Hotel Nassauer Hof — Wiesbaden bietet die vornehmsten Eventlocations Hessens, und mein Programm passt sich dem Niveau entsprechend an.

Preise Zauberer Wiesbaden: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."mainz",
    name: "Mainz",
    region: "Rheinland-Pfalz",
    intro: "Mainz — Karnevalshauptstadt, Medienstadt und Weinstadt am Rhein. Als Zauberer für Mainz bringe ich moderne Magie zu Firmenfeiern, Hochzeiten und Events in der rheinland-pfälzischen Landeshauptstadt.",
    highlight: "Mainz verbindet Feierlaune, Weinkultur und Medienstandort — die perfekte Stadt für Events, die in Erinnerung bleiben.",
    einwohner: "220.000",
    bekannteLocations: ["Rheingoldhalle Mainz", "Kurfürstliches Schloss Mainz", "Staatstheater Mainz", "Gutenberg-Museum Mainz", "Hilton Mainz City"],
    faq: [
      { q: "Was kostet ein Zauberer in Mainz?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Eignet sich ein Zauberer für Karneval-Events in Mainz?", a: "Perfekt! Mainz ist eine der größten Karnevalsstädte Deutschlands — ob Sitzung, Firmen-Karneval oder Rosenmontagsfeier, ich passe mein Programm an." },
      { q: "Tritt der Zauberer auch in Wiesbaden und dem Rhein-Main-Gebiet auf?", a: "Ja! Von Mainz aus bediene ich das gesamte Rhein-Main-Gebiet — Wiesbaden, Frankfurt, Darmstadt und Umgebung." },
    ],
    seoText: "Zauberer Mainz: Emilian Leber begeistert als Zauberkünstler auf Events in Mainz. Close-Up Magie, Bühnenshow und Comedy für Firmenfeiern, Hochzeiten und Galas in der Landeshauptstadt Rheinland-Pfalz.",
    langText: `Mainz — Karnevalshauptstadt, Medienstandort und Weinstadt am Rhein. Als Zauberer für Mainz bringe ich moderne Magie zu Firmenfeiern, Hochzeiten und Events in der rheinland-pfälzischen Landeshauptstadt.

Von Karneval-Events in der Rheingoldhalle über Medienfirmen-Feiern bis zu Hochzeiten im Kurfürstlichen Schloss — Mainz verbindet Feierlaune und Stil. Als Zauberer für Mainz passe ich mein Programm genau diesem Spirit an.

Kosten Zauberer Mainz: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."magdeburg",
    name: "Magdeburg",
    region: "Sachsen-Anhalt",
    intro: "Magdeburg — Elbe-Metropole, Landeshauptstadt Sachsen-Anhalts und Stadt Otto des Großen. Als Zauberer für Magdeburg bringe ich modernes Entertainment zu Firmenfeiern, Hochzeiten und Events an der Elbe.",
    highlight: "Magdeburg wächst und entwickelt sich — eine aufstrebende Stadt mit vielen Eventmöglichkeiten und einem Publikum, das echtes Entertainment zu schätzen weiß.",
    einwohner: "240.000",
    bekannteLocations: ["Festung Mark Magdeburg", "GETEC Arena Magdeburg", "Kulturforum Magdeburg", "Maritim Hotel Magdeburg", "Kloster Unser Lieben Frauen"],
    faq: [
      { q: "Was kostet ein Zauberer in Magdeburg?", a: "Kosten je nach Format: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Tritt der Zauberer auch in Halle (Saale) und der Region auf?", a: "Ja! Von Magdeburg aus bediene ich ganz Sachsen-Anhalt — Halle (Saale), Dessau, Stendal und Umgebung." },
      { q: "Eignet sich ein Zauberer für Firmenfeiern in Magdeburg?", a: "Absolut! Firmenfeiern, Weihnachtsfeiern und Corporate Events in Magdeburg — modernes Entertainment, das in Erinnerung bleibt." },
    ],
    seoText: "Zauberer Magdeburg: Emilian Leber ist dein Entertainer für Events in Magdeburg und Sachsen-Anhalt. Professionelle Zaubershow und Close-Up Magie für Firmenfeiern, Hochzeiten und Galas in der Elbestadt.",
    langText: `Magdeburg — Elbe-Metropole, Landeshauptstadt Sachsen-Anhalts und aufstrebender Wirtschaftsstandort. Als Zauberer für Magdeburg bringe ich modernes Entertainment zu Firmenfeiern, Hochzeiten und Events in der Stadt Otto des Großen.

Von Firmenfeiern in der Festung Mark über Galas in der GETEC Arena bis zu Hochzeiten im Kloster Unser Lieben Frauen — Magdeburg bietet eindrucksvolle Locations für Events mit Charakter.

Preise Zauberer Magdeburg: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."erfurt",
    name: "Erfurt",
    region: "Thüringen",
    intro: "Erfurt — Thüringens Landeshauptstadt mit Domberg, Krämerbrücke und einer lebendigen Eventszene. Als Zauberer für Erfurt bringe ich moderne Magie zu Firmenfeiern, Hochzeiten und besonderen Anlässen in der grünen Mitte Deutschlands.",
    highlight: "Erfurt liegt geografisch im Herzen Deutschlands — ideale Bühne für Events, die von überall gut erreichbar sind. Historisch, gastfreundlich und magisch.",
    einwohner: "215.000",
    bekannteLocations: ["Messe Erfurt", "Kaisersaal Erfurt", "Krämerbrücke Erfurt", "Erfurter Dom", "Radisson Blu Hotel Erfurt"],
    faq: [
      { q: "Was kostet ein Zauberer in Erfurt?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Tritt der Zauberer auch in Weimar und Jena auf?", a: "Ja! Ich trete in ganz Thüringen auf — Erfurt, Weimar, Jena, Gotha und Umgebung. Die kurzen Wege in Thüringen machen das möglich." },
      { q: "Eignet sich ein Zauberer für die Messe Erfurt?", a: "Perfekt! Messeauftritte, Standprogramme und Kongress-Entertainment auf der Messe Erfurt gehören zu meinem Repertoire." },
    ],
    seoText: "Zauberer Erfurt: Emilian Leber begeistert als Zauberkünstler auf Events in Erfurt und Thüringen. Close-Up Magie, Bühnenshow und Comedy für Firmenfeiern, Hochzeiten und Messen in der Landeshauptstadt.",
    langText: `Erfurt — die grüne Mitte Deutschlands, Thüringens Landeshauptstadt und eine der ältesten Städte Deutschlands. Als Zauberer für Erfurt bringe ich moderne Magie zu Firmenfeiern, Hochzeiten und Events in der blumenreichen Domstadt.

Von Messeauftritten auf der Messe Erfurt über Galas im Kaisersaal bis zu Hochzeiten an der historischen Krämerbrücke — Erfurt bietet eindrucksvolle Locations im Herzen Deutschlands.

Kosten Zauberer Erfurt: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."freiburg",
    name: "Freiburg",
    region: "Baden-Württemberg",
    intro: "Freiburg im Breisgau — Schwarzwaldtor, Solarstadt und eine der lebenswertesten Städte Deutschlands. Als Zauberer für Freiburg bringe ich moderne Magie zu Firmenfeiern, Hochzeiten und Events in der südlichsten Großstadt Deutschlands.",
    highlight: "Freiburg verbindet Lebensqualität, studentisches Flair und Nähe zur Natur — ideale Kulisse für Events mit magischer Unterhaltung.",
    einwohner: "230.000",
    bekannteLocations: ["Konzerthaus Freiburg", "Messe Freiburg", "Historisches Kaufhaus Freiburg", "Hotel Colombi Freiburg", "Münsterforum Freiburg"],
    faq: [
      { q: "Was kostet ein Zauberer in Freiburg?", a: "Kosten je nach Format: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Tritt der Zauberer auch in Basel und dem Elsass auf?", a: "Ja! Von Freiburg aus bin ich schnell in der Schweiz (Basel) und in Frankreich (Straßburg, Elsass) — Magie kennt keine Grenzen." },
      { q: "Eignet sich ein Zauberer für Hochzeiten im Schwarzwald?", a: "Absolut! Hochzeiten im Schwarzwald und der Region Freiburg sind traumhaft schön — ich sorge für magische Momente, die zur einzigartigen Kulisse passen." },
    ],
    seoText: "Zauberer Freiburg: Emilian Leber ist dein Entertainer für Events in Freiburg im Breisgau. Professionelle Zaubershow für Firmenfeiern, Hochzeiten und Galas in der Schwarzwaldmetropole.",
    langText: `Freiburg im Breisgau — die solarste Stadt Deutschlands, Tor zum Schwarzwald und studentisches Kulturzentrum. Als Zauberer für Freiburg bringe ich modernes Entertainment in die südlichste Großstadt Deutschlands.

Von Firmenfeiern im Konzerthaus über Hochzeiten im Historischen Kaufhaus bis zu Events in der Messe Freiburg — Freiburg verbindet Lebensqualität und Gastfreundschaft. Als Zauberer für Freiburg passe ich mein Programm dem lebensfrohen Spirit der Stadt an.

Preise Zauberer Freiburg: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."luebeck",
    name: "Lübeck",
    region: "Schleswig-Holstein",
    intro: "Lübeck — die Königin der Hanse, Marzipanstadt und UNESCO-Weltkulturerbe. Als Zauberer für Lübeck bringe ich moderne Magie zu Events in einer der schönsten Altstädte Deutschlands. Vom Holstentor bis zur Musik- und Kongresshalle.",
    highlight: "Lübeck verbindet hanseatische Eleganz, reiche Geschichte und norddeutsche Herzlichkeit — der perfekte Rahmen für Events mit professioneller Zauberkunst.",
    einwohner: "217.000",
    bekannteLocations: ["Musik- und Kongresshalle Lübeck", "Buddenbrookhaus", "Atlantic Hotel Lübeck", "Strandhalle Travemünde", "Radisson Blu Senator Hotel Lübeck"],
    faq: [
      { q: "Was kostet ein Zauberer in Lübeck?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Tritt der Zauberer auch in Travemünde und Ostholstein auf?", a: "Ja! Von Lübeck aus bin ich in Travemünde, Bad Schwartau und ganz Ostholstein schnell vor Ort." },
      { q: "Eignet sich ein Zauberer für Events in der Lübecker Altstadt?", a: "Perfekt! Die historische Altstadt mit ihren einzigartigen Locations bietet eine traumhafte Kulisse für magische Events." },
    ],
    seoText: "Zauberer Lübeck: Emilian Leber begeistert als Zauberkünstler auf Events in Lübeck. Close-Up Magie, Bühnenshow und Comedy für Firmenfeiern, Hochzeiten und besondere Anlässe in der Hansestadt.",
    langText: `Lübeck — Königin der Hanse, Marzipanstadt und UNESCO-Weltkulturerbe. Als Zauberer für Lübeck bringe ich moderne Magie in eine der schönsten Altstädte Deutschlands — für Firmenfeiern, Hochzeiten und besondere Events.

Von Firmenevents in der Musik- und Kongresshalle über Galas im Buddenbrookhaus bis zu Hochzeiten im Atlantic Hotel — Lübeck bietet einzigartige Locations mit hanseatischem Flair und historischem Charme.

Kosten Zauberer Lübeck: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."kiel",
    name: "Kiel",
    region: "Schleswig-Holstein",
    intro: "Kiel — Landeshauptstadt Schleswig-Holsteins, Marinestadt und Gastgeber der weltbekannten Kieler Woche. Als Zauberer für Kiel bringe ich professionelles Entertainment zu Firmenfeiern, Hochzeiten und Events an der Förde.",
    highlight: "Kiel verbindet maritimes Flair, Wirtschaftsstärke und norddeutsche Offenheit — die ideale Bühne für Events, die in Erinnerung bleiben.",
    einwohner: "246.000",
    bekannteLocations: ["Sparkassen Arena Kiel", "Kieler Schloss", "Ostseekai Kiel", "Hotel Kieler Kaufmann", "Kieler Woche Gelände"],
    faq: [
      { q: "Was kostet ein Zauberer in Kiel?", a: "Kosten je nach Format: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Tritt der Zauberer auch während der Kieler Woche auf?", a: "Ja! Die Kieler Woche bietet großartige Möglichkeiten für Side-Events, VIP-Formate und Firmen-Hospitality — ich bin dabei." },
      { q: "Eignet sich ein Zauberer für maritime Events und Schiffs-Partys?", a: "Absolut! Events auf Schiffen oder in Hafenlocations sind besonders stimmungsvoll — Close-Up Magie passt perfekt dazu." },
    ],
    seoText: "Zauberer Kiel: Emilian Leber ist dein Entertainer für Events in Kiel. Professionelle Zaubershow und Close-Up Magie für Firmenfeiern, Hochzeiten und Galas in der schleswig-holsteinischen Landeshauptstadt.",
    langText: `Kiel — Landeshauptstadt Schleswig-Holsteins, Marinestadt und Gastgeber der weltbekannten Kieler Woche. Als Zauberer für Kiel bringe ich professionelles Entertainment an die Förde — für Firmenfeiern, Hochzeiten und maritime Events.

Von Kieler Woche-Events über Firmenfeiern in der Sparkassen Arena bis zu Hochzeiten im Kieler Schloss — Kiel bietet maritime Locations mit norddeutschem Charme. Das offene und herzliche Kieler Publikum liebt Entertainment mit echtem Wow-Faktor.

Preise Zauberer Kiel: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot."braunschweig",
    name: "Braunschweig",
    region: "Niedersachsen",
    intro: "Braunschweig — die Löwenstadt Niedersachsens im Herzen Deutschlands. Als Zauberer für Braunschweig bringe ich moderne Magie zu Firmenfeiern, Hochzeiten und Events in der traditionsreichen Stadt zwischen Harz und Heide.",
    highlight: "Braunschweig ist Wirtschaftsstandort, Universitätsstadt und Kulturzentrum — ideal für Events, die professionelles Entertainment verdienen.",
    einwohner: "250.000",
    bekannteLocations: ["Stadthalle Braunschweig", "Volkswagen Halle Braunschweig", "Schloss Braunschweig", "Haus der Kulturen Braunschweig", "Steigenberger Hotel Braunschweig"],
    faq: [
      { q: "Was kostet ein Zauberer in Braunschweig?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Tritt der Zauberer auch auf VW-Events und Automotive-Firmenfeiern auf?", a: "Ja! Braunschweig ist eng mit dem Volkswagen-Konzern verbunden — Corporate Events in diesem Umfeld gehören zu meinen Spezialitäten." },
      { q: "Tritt der Zauberer auch in Wolfsburg und Göttingen auf?", a: "Ja, ich trete in ganz Niedersachsen auf — von Braunschweig über Wolfsburg bis Göttingen und Hildesheim." },
    ],
    seoText: "Zauberer Braunschweig: Emilian Leber begeistert als Zauberkünstler auf Events in Braunschweig. Close-Up Magie, Bühnenshow und Comedy für Firmenfeiern, Hochzeiten und Galas in der Löwenstadt.",
    langText: `Braunschweig — die Löwenstadt Niedersachsens, VW-Standort und Universitätsstadt. Als Zauberer für Braunschweig bringe ich professionelles Entertainment zu Firmenfeiern, Hochzeiten und Events in der traditionsreichen Stadt zwischen Harz und Heide.

Von Corporate Events im Volkswagen Halle-Umfeld über Firmenfeiern in der Stadthalle bis zu Hochzeiten in historischen Braunschweiger Locations — ich entwickle für jede Veranstaltung das optimale Showkonzept.

Kosten Zauberer Braunschweig: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein individuelles Angebot.

Von Braunschweig aus trete ich in ganz Niedersachsen auf — Wolfsburg, Salzgitter, Göttingen, Hildesheim und Umgebung. Als Zauberkünstler für Braunschweig und die Region bin ich ein verlässlicher Partner für Events aller Größenordnungen.`,
  },
];
