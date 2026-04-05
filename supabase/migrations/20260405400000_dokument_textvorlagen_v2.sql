-- Textvorlagen für Dokumente: persönlich, siezend, mit Zauberei-Bezug
-- Aktualisiert bestehende Standard-Vorlagen und fügt neue Varianten hinzu

-- Typ-Check erweitern um abschlagsrechnung, schlussrechnung, gutschrift, stornorechnung
ALTER TABLE public.dokument_textvorlagen
  DROP CONSTRAINT IF EXISTS dokument_textvorlagen_typ_check;

ALTER TABLE public.dokument_textvorlagen
  ADD CONSTRAINT dokument_textvorlagen_typ_check
  CHECK (typ IN ('angebot', 'rechnung', 'abschlagsrechnung', 'schlussrechnung', 'auftragsbestaetigung', 'mahnung', 'gutschrift', 'stornorechnung', 'alle'));

-- ══════════════════════════════════════════════════════════════════════════════
-- BESTEHENDE VORLAGEN AKTUALISIEREN
-- ══════════════════════════════════════════════════════════════════════════════

-- ── Angebot Kopf ─────────────────────────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Sehr geehrte Damen und Herren,

herzlichen Dank für Ihr Interesse an meiner Zaubershow! Ich freue mich, dass Sie an mich gedacht haben, und habe Ihnen gerne ein individuelles Angebot zusammengestellt.

Im Folgenden finden Sie alle Details zu meinem Leistungsangebot für Ihre Veranstaltung:'
WHERE typ = 'angebot' AND bereich = 'kopf' AND name = 'Standard';

-- ── Angebot Fuß ──────────────────────────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Ich freue mich sehr auf Ihre Rückmeldung und stehe Ihnen für Fragen jederzeit persönlich zur Verfügung – per Telefon, E-Mail oder WhatsApp.

Dieses Angebot ist freibleibend und gültig bis zum oben angegebenen Datum. Mit Ihrer Buchungsbestätigung wird der genannte Termin verbindlich für Sie reserviert. Es gelten meine Allgemeinen Geschäftsbedingungen (AGB), die Sie unter www.magicel.de/agb einsehen können.

Ich würde mich freuen, Ihre Veranstaltung mit einem Hauch Magie zu bereichern!

Mit magischen Grüßen
Emilian Leber'
WHERE typ = 'angebot' AND bereich = 'fuss' AND name = 'Standard';

-- ── Rechnung Kopf ────────────────────────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Sehr geehrte Damen und Herren,

vielen Dank für Ihr Vertrauen und die wunderbare Zusammenarbeit! Für die erbrachten Leistungen erlaube ich mir, Ihnen folgende Rechnung zu stellen:'
WHERE typ = 'rechnung' AND bereich = 'kopf' AND name = 'Standard';

-- ── Rechnung Fuß ─────────────────────────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Bitte überweisen Sie den Rechnungsbetrag innerhalb des angegebenen Zahlungsziels auf das untenstehende Konto. Bei Fragen zur Rechnung stehe ich Ihnen selbstverständlich jederzeit zur Verfügung.

Vielen Dank nochmals für Ihr Vertrauen – es war mir eine große Freude, Ihre Veranstaltung mit etwas Magie zu bereichern! Ich hoffe, Ihre Gäste hatten genauso viel Spaß wie ich.

Es gelten meine Allgemeinen Geschäftsbedingungen (AGB), einsehbar unter www.magicel.de/agb.

Mit magischen Grüßen
Emilian Leber'
WHERE typ = 'rechnung' AND bereich = 'fuss' AND name = 'Standard';

-- ── Auftragsbestätigung Kopf ─────────────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Sehr geehrte Damen und Herren,

herzlichen Dank für Ihre Buchung – ich freue mich sehr auf Ihre Veranstaltung! Hiermit bestätige ich Ihnen gerne die Beauftragung folgender Leistungen:'
WHERE typ = 'auftragsbestaetigung' AND bereich = 'kopf' AND name = 'Standard';

-- ── Auftragsbestätigung Fuß ──────────────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Mit dieser Bestätigung ist Ihr Wunschtermin verbindlich für Sie reserviert. Ich werde mich rechtzeitig vor der Veranstaltung bei Ihnen melden, um die letzten Details abzustimmen.

Sollten sich in der Zwischenzeit Änderungen ergeben oder Sie Fragen haben, erreichen Sie mich jederzeit per Telefon, E-Mail oder WhatsApp.

Es gelten meine Allgemeinen Geschäftsbedingungen (AGB), einsehbar unter www.magicel.de/agb.

Ich freue mich auf einen zauberhaften Abend mit Ihnen und Ihren Gästen!

Mit magischen Grüßen
Emilian Leber'
WHERE typ = 'auftragsbestaetigung' AND bereich = 'fuss' AND name = 'Standard';

-- ── Mahnung Kopf ─────────────────────────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Sehr geehrte Damen und Herren,

ich hoffe, Sie denken gerne an unsere gemeinsame Veranstaltung zurück! Bei der Durchsicht meiner Unterlagen ist mir aufgefallen, dass folgende Rechnung noch offen ist:'
WHERE typ = 'mahnung' AND bereich = 'kopf' AND name = 'Standard';

-- ── Mahnung Fuß ──────────────────────────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Ich bitte Sie, den ausstehenden Betrag innerhalb von 7 Tagen auf das unten angegebene Konto zu überweisen. Sollte sich Ihre Zahlung mit diesem Schreiben überschneiden, betrachten Sie es bitte als gegenstandslos.

Falls Sie Fragen zur Rechnung haben oder eine Ratenzahlung vereinbaren möchten, melden Sie sich gerne bei mir – wir finden sicher eine Lösung.

Es gelten meine Allgemeinen Geschäftsbedingungen (AGB), einsehbar unter www.magicel.de/agb.

Mit freundlichen Grüßen
Emilian Leber'
WHERE typ = 'mahnung' AND bereich = 'fuss' AND name = 'Standard';


-- ══════════════════════════════════════════════════════════════════════════════
-- NEUE VORLAGEN FÜR ZUSÄTZLICHE DOKUMENTTYPEN
-- ══════════════════════════════════════════════════════════════════════════════

-- ── Abschlagsrechnung ────────────────────────────────────────────────────────
INSERT INTO public.dokument_textvorlagen (name, typ, bereich, inhalt, is_default, sort_order) VALUES
('Standard', 'abschlagsrechnung', 'kopf',
 'Sehr geehrte Damen und Herren,

herzlichen Dank für Ihre Buchung! Wie vereinbart erlaube ich mir, Ihnen vorab eine Abschlagsrechnung für die gebuchten Leistungen zu stellen:',
 true, 1),

('Standard', 'abschlagsrechnung', 'fuss',
 'Bitte überweisen Sie den Abschlagsbetrag innerhalb des angegebenen Zahlungsziels auf das untenstehende Konto. Der Restbetrag wird Ihnen nach der Veranstaltung mit der Schlussrechnung in Rechnung gestellt.

Mit der Zahlung dieser Abschlagsrechnung ist Ihr Wunschtermin verbindlich reserviert. Es gelten meine Allgemeinen Geschäftsbedingungen (AGB), einsehbar unter www.magicel.de/agb.

Ich freue mich schon sehr auf Ihre Veranstaltung!

Mit magischen Grüßen
Emilian Leber',
 true, 1),

-- ── Schlussrechnung ──────────────────────────────────────────────────────────
('Standard', 'schlussrechnung', 'kopf',
 'Sehr geehrte Damen und Herren,

nochmals herzlichen Dank für die wunderbare Veranstaltung – es war mir eine große Freude, Ihre Gäste zu begeistern! Für die erbrachten Leistungen erlaube ich mir, Ihnen folgende Schlussrechnung zu stellen:',
 true, 1),

('Standard', 'schlussrechnung', 'fuss',
 'Bereits gezahlte Abschlagsbeträge wurden selbstverständlich verrechnet. Bitte überweisen Sie den verbleibenden Betrag innerhalb des angegebenen Zahlungsziels auf das untenstehende Konto.

Vielen Dank nochmals für Ihr Vertrauen und die tolle Zusammenarbeit! Ich hoffe, die Magie hat bei Ihren Gästen für unvergessliche Momente gesorgt. Falls Sie zukünftig wieder einen Anlass haben – ich bin gerne wieder für Sie da.

Es gelten meine Allgemeinen Geschäftsbedingungen (AGB), einsehbar unter www.magicel.de/agb.

Mit magischen Grüßen
Emilian Leber',
 true, 1),

-- ── Gutschrift ───────────────────────────────────────────────────────────────
('Standard', 'gutschrift', 'kopf',
 'Sehr geehrte Damen und Herren,

hiermit erhalten Sie eine Gutschrift zu der unten aufgeführten Leistung:',
 true, 1),

('Standard', 'gutschrift', 'fuss',
 'Der Gutschriftbetrag wird Ihnen auf das bei mir hinterlegte Konto überwiesen bzw. mit offenen Forderungen verrechnet.

Bei Fragen stehe ich Ihnen selbstverständlich jederzeit zur Verfügung.

Mit magischen Grüßen
Emilian Leber',
 true, 1),

-- ── Stornorechnung ───────────────────────────────────────────────────────────
('Standard', 'stornorechnung', 'kopf',
 'Sehr geehrte Damen und Herren,

hiermit storniere ich die nachfolgend aufgeführte Rechnung. Es wird folgender Betrag gutgeschrieben:',
 true, 1),

('Standard', 'stornorechnung', 'fuss',
 'Die Stornierung bezieht sich auf die oben genannte Originalrechnung. Der Betrag wird Ihnen auf dem vereinbarten Weg erstattet bzw. verrechnet.

Es gelten meine Allgemeinen Geschäftsbedingungen (AGB), einsehbar unter www.magicel.de/agb.

Mit magischen Grüßen
Emilian Leber',
 true, 1),

-- ══════════════════════════════════════════════════════════════════════════════
-- ALTERNATIVE VARIANTEN (persönlicher / kürzer)
-- ══════════════════════════════════════════════════════════════════════════════

-- ── Angebot: Persönlich ──────────────────────────────────────────────────────
('Persönlich', 'angebot', 'kopf',
 'Sehr geehrte Damen und Herren,

wie schön, dass Sie über eine Zaubershow für Ihre Veranstaltung nachdenken! Nach unserem Gespräch habe ich mir ein individuelles Konzept für Sie überlegt und freue mich, Ihnen folgendes Angebot zu unterbreiten:',
 false, 2),

('Persönlich', 'angebot', 'fuss',
 'Gerne erkläre ich Ihnen die einzelnen Leistungen noch ausführlicher oder passe das Angebot an Ihre Wünsche an – rufen Sie mich einfach an oder schreiben Sie mir.

Dieses Angebot ist freibleibend und gültig bis zum oben angegebenen Datum. Mit Ihrer Zusage wird der Termin exklusiv für Sie reserviert. Es gelten meine AGB (www.magicel.de/agb).

Ich freue mich darauf, Ihren Gästen unvergessliche Momente zu schenken!

Mit magischen Grüßen
Emilian Leber',
 false, 2),

-- ── Rechnung: Nach tollem Event ──────────────────────────────────────────────
('Nach tollem Event', 'rechnung', 'kopf',
 'Sehr geehrte Damen und Herren,

was für ein wunderbarer Abend – vielen Dank, dass ich Teil Ihrer Veranstaltung sein durfte! Die Begeisterung Ihrer Gäste hat mich sehr gefreut. Für meinen Auftritt erlaube ich mir, Ihnen folgende Rechnung zu stellen:',
 false, 2),

('Nach tollem Event', 'rechnung', 'fuss',
 'Bitte überweisen Sie den Betrag innerhalb des angegebenen Zahlungsziels. Bei Fragen stehe ich Ihnen natürlich gerne zur Verfügung.

Es war mir eine echte Freude – sollten Sie zukünftig wieder eine Veranstaltung planen, bei der ein wenig Magie den Abend abrunden soll, freue ich mich auf Ihre Nachricht!

Es gelten meine AGB (www.magicel.de/agb).

Mit magischen Grüßen
Emilian Leber',
 false, 2)

ON CONFLICT DO NOTHING;
