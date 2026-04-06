-- Pakete: Dauer auf Maximum setzen + schönere Kundenbeschreibungen

-- Close-Up
UPDATE public.pakete SET zieldauer = 30, beschreibung_kunde = 'Staunen zum Greifen nah – bis zu 30 Minuten Close-Up-Zauberkunst direkt zwischen Ihren Gästen. Mit Karten, Münzen und Alltagsgegenständen entstehen kleine Wunder, die Ihre Gäste noch lange begeistern werden. Ideal als Eisbrecher beim Empfang oder zwischen den Gängen.' WHERE name = 'Close-Up S';

UPDATE public.pakete SET zieldauer = 45, beschreibung_kunde = 'Bis zu 45 Minuten Close-Up-Magie hautnah – ich bewege mich durch Ihre Veranstaltung und verzaubere Ihre Gäste in kleinen Gruppen. Jede Vorführung ist ein persönliches Erlebnis: interaktiv, charmant und unvergesslich. Perfekt für größere Gesellschaften oder längere Empfänge.' WHERE name = 'Close-Up M';

UPDATE public.pakete SET zieldauer = 60, beschreibung_kunde = 'Das volle Close-Up-Erlebnis: bis zu 60 Minuten Zauberkunst zum Anfassen. Ich begleite Ihre Veranstaltung über den gesamten Empfang oder Abend und sorge dafür, dass jeder Gast seinen magischen Moment erlebt. Für Events, bei denen Staunen zum Programm gehört.' WHERE name = 'Close-Up L';

-- Hochzeit Close-Up
UPDATE public.pakete SET zieldauer = 30, beschreibung_kunde = 'Magische Momente für Ihren besonderen Tag – bis zu 30 Minuten Close-Up-Zauberkunst zwischen Ihren Hochzeitsgästen. Inklusive einem exklusiven Effekt speziell für die Braut, der für Gänsehaut sorgt. Perfekt für den Sektempfang oder die Wartezeit beim Fotoshooting.' WHERE name = 'Hochzeit Close-Up S';

UPDATE public.pakete SET zieldauer = 45, beschreibung_kunde = 'Bis zu 45 Minuten zauberhafte Unterhaltung für Ihre Hochzeitsfeier. Ich verzaubere Ihre Gäste in kleinen Gruppen – und die Braut erwartet ein ganz besonderer, emotionaler Effekt als Highlight. Sorgt für Gesprächsstoff und unvergessliche Erinnerungen.' WHERE name = 'Hochzeit Close-Up M';

UPDATE public.pakete SET zieldauer = 60, beschreibung_kunde = 'Das Premium-Erlebnis für Ihre Hochzeit: bis zu 60 Minuten Close-Up-Magie, die sich nahtlos in Ihren Abend einfügt. Vom Empfang bis zum Dessert – jeder Tisch bekommt seine eigene Show. Mit exklusivem Braut-Effekt für den emotionalen Höhepunkt.' WHERE name = 'Hochzeit Close-Up L';

-- Bühnenshow
UPDATE public.pakete SET zieldauer = 20, beschreibung_kunde = 'Kompakt und wirkungsvoll: bis zu 20 Minuten Bühnenshow mit Musik, Licht und verblüffenden Illusionen. Perfekt als Highlight zwischen Programmpunkten oder als Überraschungseinlage. Alle Augen auf der Bühne – Staunen garantiert.' WHERE name = 'Bühnenshow S';

UPDATE public.pakete SET zieldauer = 30, beschreibung_kunde = 'Bis zu 30 Minuten Bühnenmagie auf höchstem Niveau. Eine durchkomponierte Show mit Humor, Spannung und Momenten, die Ihren Gästen den Atem rauben. Ideal als Abendprogramm-Highlight bei Firmenfeiern, Galas oder Geburtstagen.' WHERE name = 'Bühnenshow M';

UPDATE public.pakete SET zieldauer = 45, beschreibung_kunde = 'Die große Bühnenshow: bis zu 45 Minuten voller Illusionen, Mentalmagie und Comedy. Ein komplettes Showprogramm, das Ihre Gäste von der ersten bis zur letzten Minute fesselt. Für Veranstaltungen, die ein echtes Entertainment-Erlebnis verdienen.' WHERE name = 'Bühnenshow L';

-- Kombination
UPDATE public.pakete SET zieldauer = 40, beschreibung_kunde = 'Das Beste aus zwei Welten: erst bis zu 30 Minuten Close-Up-Magie hautnah zwischen Ihren Gästen, dann bis zu 20 Minuten Bühnenshow als krönender Abschluss. Eine perfekte Kombination, die jeden Gast erreicht – persönlich und auf der großen Bühne.' WHERE name = 'Kombination S';

UPDATE public.pakete SET zieldauer = 60, beschreibung_kunde = 'Zwei Shows in einer: bis zu 30 Minuten Close-Up beim Empfang, gefolgt von bis zu 30 Minuten Bühnenshow im Hauptprogramm. Ihre Gäste erleben Magie zum Anfassen und eine professionelle Bühnenperformance – das Rundum-Paket für einen unvergesslichen Abend.' WHERE name = 'Kombination M';

UPDATE public.pakete SET zieldauer = 75, beschreibung_kunde = 'Das Premium-Kombiprogramm: bis zu 45 Minuten Close-Up-Zauberkunst und bis zu 30 Minuten Bühnenshow. Ich begleite Ihren Abend von Anfang an – erst hautnah zwischen den Gästen, dann mit der großen Show auf der Bühne. Für Veranstaltungen, die keine Kompromisse machen.' WHERE name = 'Kombination L';
