-- Artikel-Beschreibungen überarbeiten: mehr Inhalt, damit Kunden wissen was sie erwartet

-- ── Bühnenshow ───────────────────────────────────────────────────────────────
UPDATE public.artikel_stamm
SET beschreibung = 'Interaktive Bühnenshow „Magic meets Entertainment" (ca. 20–45 Minuten) – eine moderne, mitreißende Zaubershow für alle Gäste gemeinsam. Humorvolle Unterhaltung trifft auf verblüffende Illusionen und emotionale Momente. Ihre Gäste werden aktiv eingebunden und Teil der Show. Inklusive professionellem Auf- und Abbau, eigenem Equipment sowie Abstimmung des Programms auf Ihren Anlass.'
WHERE bezeichnung = 'Bühnenshow';

-- ── Close-Up Magie ───────────────────────────────────────────────────────────
UPDATE public.artikel_stamm
SET beschreibung = 'Close-Up-Magie „Magie hautnah erleben" – Zauberkunst direkt vor den Augen Ihrer Gäste, an den Tischen, beim Empfang oder mitten im Publikum. Kleine Gruppen erleben persönliche, intime Wunder mit Karten, Münzen und Alltagsgegenständen. Besonders charmant, interaktiv und ideal als Eisbrecher oder Highlight zwischen den Gängen. Ihre Gäste werden staunen, lachen und noch lange darüber sprechen.'
WHERE bezeichnung = 'Close-Up Magie';

-- ── Magic Dinner ─────────────────────────────────────────────────────────────
UPDATE public.artikel_stamm
SET beschreibung = 'Magic Dinner – das perfekte Zusammenspiel aus kulinarischem Genuss und verblüffender Magie. Zwischen den Gängen erleben Ihre Gäste an jedem Tisch persönliche Zaubermomente hautnah. Eine elegante, unterhaltsame Begleitung für Ihr Dinner-Event, die für Gesprächsstoff sorgt und den Abend zu etwas ganz Besonderem macht. Individuell abgestimmt auf Ihren Ablauf und Ihre Tischordnung.'
WHERE bezeichnung = 'Magic Dinner';

-- ── Walking Act ──────────────────────────────────────────────────────────────
UPDATE public.artikel_stamm
SET beschreibung = 'Walking Act – mobile Zauberkunst, die sich frei durch Ihre Veranstaltung bewegt. Ideal für Empfänge, Networking-Events, Messen oder Firmenfeiern. Ich mische mich ungezwungen unter Ihre Gäste und sorge mit spontanen Zaubermomenten für Überraschung und Begeisterung. Flexibel einsetzbar und perfekt als Unterhaltung während Wartezeiten, Sektempfängen oder Stehpartys.'
WHERE bezeichnung = 'Walking Act';

-- ── Kombination Bühne + Close-Up (neuer Artikel) ─────────────────────────────
INSERT INTO public.artikel_stamm (bezeichnung, beschreibung, einheit, preis, mwst_satz, kategorie) VALUES
('Kombination Bühnenshow & Close-Up',
 'Das Rundum-Paket für Ihre Veranstaltung: Zunächst erleben Ihre Gäste beim Empfang oder zwischen den Gängen intime Close-Up-Magie hautnah an den Tischen. Im Anschluss folgt eine gemeinsame Bühnenshow als krönender Höhepunkt des Abends. Die perfekte Kombination aus persönlichen Zaubermomenten und großer Show – für ein Event, das Ihre Gäste so schnell nicht vergessen werden.',
 'pauschal', 1800, 0, 'Show'),

-- ── Moderationsbegleitung (neuer Artikel) ────────────────────────────────────
('Moderationsbegleitung',
 'Charmante Moderation durch den Abend mit magischen Übergängen zwischen Programmpunkten. Ich führe Ihre Gäste unterhaltsam durch das Programm und sorge mit kurzen Zaubermomenten für fließende Übergänge. Ideal, wenn Sie einen roten Faden für Ihre Veranstaltung wünschen.',
 'pauschal', 500, 0, 'Show')

ON CONFLICT DO NOTHING;

-- ── Bestehende Nebenartikel etwas aufwerten ──────────────────────────────────
UPDATE public.artikel_stamm
SET beschreibung = 'Anfahrt und Rückreise zum Veranstaltungsort. Berechnung ab Regensburg (Kilometerangabe einfache Strecke).'
WHERE bezeichnung = 'Anfahrtspauschale';

UPDATE public.artikel_stamm
SET beschreibung = 'Professionelle Licht- und Tontechnik für die Bühnenshow: portable PA-Anlage, Funkmikrofon, Showbeleuchtung und Musikeinspielung. Alles inklusive Auf- und Abbau.'
WHERE bezeichnung = 'Technikpauschale';

UPDATE public.artikel_stamm
SET beschreibung = 'Persönliche Vorbesprechung vor Ort oder per Videocall zur Abstimmung von Ablauf, Programm und besonderen Wünschen für Ihre Veranstaltung.'
WHERE bezeichnung = 'Probe / Vorbesprechung';

UPDATE public.artikel_stamm
SET beschreibung = 'Hotelübernachtung bei mehrtägigen Events oder weiter Anreise. Ermöglicht entspannte Ankunft und flexible Zeitplanung am Veranstaltungstag.'
WHERE bezeichnung = 'Übernachtungspauschale';
