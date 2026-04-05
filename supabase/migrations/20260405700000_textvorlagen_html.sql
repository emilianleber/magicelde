-- Textvorlagen mit HTML-Formatierung: Links anklickbar, wichtiges fett, dezent kursiv

-- ── Angebot Kopf ─────────────────────────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Sehr geehrte Damen und Herren,<br><br>herzlichen Dank für Ihr Interesse an meiner Zaubershow! Ich freue mich, dass Sie an mich gedacht haben, und habe Ihnen gerne ein <b>individuelles Angebot</b> zusammengestellt.<br><br>Im Folgenden finden Sie alle Details zu meinem Leistungsangebot für Ihre Veranstaltung:'
WHERE typ = 'angebot' AND bereich = 'kopf' AND name = 'Standard';

-- ── Angebot Fuß ──────────────────────────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Ich freue mich sehr auf Ihre Rückmeldung und stehe Ihnen für Fragen <b>jederzeit persönlich</b> zur Verfügung – per Telefon, E-Mail oder WhatsApp.<br><br>Dieses Angebot ist <i>freibleibend</i> und gültig bis zum oben angegebenen Datum. Mit Ihrer Buchungsbestätigung wird der genannte Termin <b>verbindlich für Sie reserviert</b>. Es gelten meine Allgemeinen Geschäftsbedingungen (AGB), die Sie unter <a href="https://www.magicel.de/agb" style="color:#2563eb;">www.magicel.de/agb</a> einsehen können.<br><br>Ich würde mich freuen, Ihre Veranstaltung mit einem Hauch Magie zu bereichern!<br><br>Mit magischen Grüßen<br>Emilian Leber'
WHERE typ = 'angebot' AND bereich = 'fuss' AND name = 'Standard';

-- ── Rechnung Kopf ────────────────────────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Sehr geehrte Damen und Herren,<br><br>vielen Dank für Ihr Vertrauen und die wunderbare Zusammenarbeit! Für die erbrachten Leistungen erlaube ich mir, Ihnen folgende Rechnung zu stellen:'
WHERE typ = 'rechnung' AND bereich = 'kopf' AND name = 'Standard';

-- ── Rechnung Fuß ─────────────────────────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Bitte überweisen Sie den Rechnungsbetrag <b>innerhalb des angegebenen Zahlungsziels</b> auf das untenstehende Konto. Bei Fragen zur Rechnung stehe ich Ihnen selbstverständlich jederzeit zur Verfügung.<br><br>Vielen Dank nochmals für Ihr Vertrauen – es war mir eine große Freude, Ihre Veranstaltung mit etwas Magie zu bereichern! Ich hoffe, Ihre Gäste hatten genauso viel Spaß wie ich.<br><br>Es gelten meine Allgemeinen Geschäftsbedingungen (AGB), einsehbar unter <a href="https://www.magicel.de/agb" style="color:#2563eb;">www.magicel.de/agb</a>.<br><br>Mit magischen Grüßen<br>Emilian Leber'
WHERE typ = 'rechnung' AND bereich = 'fuss' AND name = 'Standard';

-- ── Auftragsbestätigung Kopf ─────────────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Sehr geehrte Damen und Herren,<br><br>herzlichen Dank für Ihre Buchung – ich freue mich sehr auf Ihre Veranstaltung! Hiermit bestätige ich Ihnen gerne die Beauftragung folgender Leistungen:'
WHERE typ = 'auftragsbestaetigung' AND bereich = 'kopf' AND name = 'Standard';

-- ── Auftragsbestätigung Fuß ──────────────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Mit dieser Bestätigung ist <b>Ihr Wunschtermin verbindlich für Sie reserviert</b>. Ich werde mich rechtzeitig vor der Veranstaltung bei Ihnen melden, um die letzten Details abzustimmen.<br><br>Sollten sich in der Zwischenzeit Änderungen ergeben oder Sie Fragen haben, erreichen Sie mich jederzeit per Telefon, E-Mail oder WhatsApp.<br><br>Es gelten meine Allgemeinen Geschäftsbedingungen (AGB), einsehbar unter <a href="https://www.magicel.de/agb" style="color:#2563eb;">www.magicel.de/agb</a>.<br><br>Ich freue mich auf einen zauberhaften Abend mit Ihnen und Ihren Gästen!<br><br>Mit magischen Grüßen<br>Emilian Leber'
WHERE typ = 'auftragsbestaetigung' AND bereich = 'fuss' AND name = 'Standard';

-- ── Mahnung Kopf ─────────────────────────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Sehr geehrte Damen und Herren,<br><br>ich hoffe, Sie denken gerne an unsere gemeinsame Veranstaltung zurück! Bei der Durchsicht meiner Unterlagen ist mir aufgefallen, dass folgende Rechnung <b>noch offen</b> ist:'
WHERE typ = 'mahnung' AND bereich = 'kopf' AND name = 'Standard';

-- ── Mahnung Fuß ──────────────────────────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Ich bitte Sie, den ausstehenden Betrag <b>innerhalb von 7 Tagen</b> auf das unten angegebene Konto zu überweisen. Sollte sich Ihre Zahlung mit diesem Schreiben überschneiden, betrachten Sie es bitte als gegenstandslos.<br><br>Falls Sie Fragen zur Rechnung haben oder eine Ratenzahlung vereinbaren möchten, melden Sie sich gerne bei mir – wir finden sicher eine Lösung.<br><br>Es gelten meine Allgemeinen Geschäftsbedingungen (AGB), einsehbar unter <a href="https://www.magicel.de/agb" style="color:#2563eb;">www.magicel.de/agb</a>.<br><br>Mit freundlichen Grüßen<br>Emilian Leber'
WHERE typ = 'mahnung' AND bereich = 'fuss' AND name = 'Standard';

-- ── Abschlagsrechnung Kopf ───────────────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Sehr geehrte Damen und Herren,<br><br>herzlichen Dank für Ihre Buchung! Wie vereinbart erlaube ich mir, Ihnen vorab eine <b>Abschlagsrechnung</b> für die gebuchten Leistungen zu stellen:'
WHERE typ = 'abschlagsrechnung' AND bereich = 'kopf' AND name = 'Standard';

-- ── Abschlagsrechnung Fuß ────────────────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Bitte überweisen Sie den Abschlagsbetrag <b>innerhalb des angegebenen Zahlungsziels</b> auf das untenstehende Konto. Der Restbetrag wird Ihnen nach der Veranstaltung mit der Schlussrechnung in Rechnung gestellt.<br><br>Mit der Zahlung dieser Abschlagsrechnung ist <b>Ihr Wunschtermin verbindlich reserviert</b>. Es gelten meine Allgemeinen Geschäftsbedingungen (AGB), einsehbar unter <a href="https://www.magicel.de/agb" style="color:#2563eb;">www.magicel.de/agb</a>.<br><br>Ich freue mich schon sehr auf Ihre Veranstaltung!<br><br>Mit magischen Grüßen<br>Emilian Leber'
WHERE typ = 'abschlagsrechnung' AND bereich = 'fuss' AND name = 'Standard';

-- ── Schlussrechnung Kopf ─────────────────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Sehr geehrte Damen und Herren,<br><br>nochmals herzlichen Dank für die wunderbare Veranstaltung – es war mir eine große Freude, Ihre Gäste zu begeistern! Für die erbrachten Leistungen erlaube ich mir, Ihnen folgende <b>Schlussrechnung</b> zu stellen:'
WHERE typ = 'schlussrechnung' AND bereich = 'kopf' AND name = 'Standard';

-- ── Schlussrechnung Fuß ──────────────────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Bereits gezahlte Abschlagsbeträge wurden selbstverständlich verrechnet. Bitte überweisen Sie den verbleibenden Betrag <b>innerhalb des angegebenen Zahlungsziels</b> auf das untenstehende Konto.<br><br>Vielen Dank nochmals für Ihr Vertrauen und die tolle Zusammenarbeit! Ich hoffe, die Magie hat bei Ihren Gästen für <i>unvergessliche Momente</i> gesorgt. Falls Sie zukünftig wieder einen Anlass haben – ich bin gerne wieder für Sie da.<br><br>Es gelten meine Allgemeinen Geschäftsbedingungen (AGB), einsehbar unter <a href="https://www.magicel.de/agb" style="color:#2563eb;">www.magicel.de/agb</a>.<br><br>Mit magischen Grüßen<br>Emilian Leber'
WHERE typ = 'schlussrechnung' AND bereich = 'fuss' AND name = 'Standard';

-- ── Gutschrift Fuß ───────────────────────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Der Gutschriftbetrag wird Ihnen auf das bei mir hinterlegte Konto überwiesen bzw. mit offenen Forderungen verrechnet.<br><br>Bei Fragen stehe ich Ihnen selbstverständlich jederzeit zur Verfügung.<br><br>Mit magischen Grüßen<br>Emilian Leber'
WHERE typ = 'gutschrift' AND bereich = 'fuss' AND name = 'Standard';

-- ── Stornorechnung Fuß ───────────────────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Die Stornierung bezieht sich auf die oben genannte Originalrechnung. Der Betrag wird Ihnen auf dem vereinbarten Weg erstattet bzw. verrechnet.<br><br>Es gelten meine Allgemeinen Geschäftsbedingungen (AGB), einsehbar unter <a href="https://www.magicel.de/agb" style="color:#2563eb;">www.magicel.de/agb</a>.<br><br>Mit magischen Grüßen<br>Emilian Leber'
WHERE typ = 'stornorechnung' AND bereich = 'fuss' AND name = 'Standard';

-- ── Persönlich Angebot Kopf ──────────────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Sehr geehrte Damen und Herren,<br><br>wie schön, dass Sie über eine Zaubershow für Ihre Veranstaltung nachdenken! Nach unserem Gespräch habe ich mir ein <b>individuelles Konzept</b> für Sie überlegt und freue mich, Ihnen folgendes Angebot zu unterbreiten:'
WHERE typ = 'angebot' AND bereich = 'kopf' AND name = 'Persönlich';

-- ── Persönlich Angebot Fuß ───────────────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Gerne erkläre ich Ihnen die einzelnen Leistungen noch ausführlicher oder passe das Angebot an Ihre Wünsche an – rufen Sie mich einfach an oder schreiben Sie mir.<br><br>Dieses Angebot ist <i>freibleibend</i> und gültig bis zum oben angegebenen Datum. Mit Ihrer Zusage wird der Termin <b>exklusiv für Sie reserviert</b>. Es gelten meine AGB (<a href="https://www.magicel.de/agb" style="color:#2563eb;">www.magicel.de/agb</a>).<br><br>Ich freue mich darauf, Ihren Gästen <i>unvergessliche Momente</i> zu schenken!<br><br>Mit magischen Grüßen<br>Emilian Leber'
WHERE typ = 'angebot' AND bereich = 'fuss' AND name = 'Persönlich';

-- ── Nach tollem Event Rechnung Kopf ──────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Sehr geehrte Damen und Herren,<br><br>was für ein wunderbarer Abend – vielen Dank, dass ich Teil Ihrer Veranstaltung sein durfte! Die Begeisterung Ihrer Gäste hat mich sehr gefreut. Für meinen Auftritt erlaube ich mir, Ihnen folgende Rechnung zu stellen:'
WHERE typ = 'rechnung' AND bereich = 'kopf' AND name = 'Nach tollem Event';

-- ── Nach tollem Event Rechnung Fuß ───────────────────────────────────────────
UPDATE public.dokument_textvorlagen
SET inhalt = 'Bitte überweisen Sie den Betrag <b>innerhalb des angegebenen Zahlungsziels</b>. Bei Fragen stehe ich Ihnen natürlich gerne zur Verfügung.<br><br>Es war mir eine echte Freude – sollten Sie zukünftig wieder eine Veranstaltung planen, bei der ein wenig Magie den Abend abrunden soll, freue ich mich auf Ihre Nachricht!<br><br>Es gelten meine AGB (<a href="https://www.magicel.de/agb" style="color:#2563eb;">www.magicel.de/agb</a>).<br><br>Mit magischen Grüßen<br>Emilian Leber'
WHERE typ = 'rechnung' AND bereich = 'fuss' AND name = 'Nach tollem Event';
