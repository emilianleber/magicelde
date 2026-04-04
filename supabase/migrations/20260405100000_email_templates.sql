-- E-Mail-Vorlagen für 1-Klick Versand
CREATE TABLE IF NOT EXISTS public.email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,           -- z.B. 'erstanfrage', '7_tage_vorher', 'angebot_nachfrage'
  name TEXT NOT NULL,                  -- Anzeigename
  beschreibung TEXT DEFAULT '',        -- Wann wird diese Vorlage verwendet?
  betreff TEXT NOT NULL,               -- E-Mail Betreff (mit Platzhaltern)
  inhalt TEXT NOT NULL,                -- E-Mail Inhalt (mit Platzhaltern)
  kategorie TEXT DEFAULT 'allgemein',  -- anfrage, event, rechnung, allgemein
  sortierung INTEGER DEFAULT 0,
  aktiv BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin: Templates verwalten"
  ON public.email_templates FOR ALL
  USING (EXISTS (SELECT 1 FROM public.portal_admins WHERE email = auth.jwt()->>'email'));

CREATE POLICY "Service: voller Zugriff"
  ON public.email_templates FOR ALL
  USING (true) WITH CHECK (true);

-- Event-Planungsfelder
ALTER TABLE public.portal_events
  ADD COLUMN IF NOT EXISTS ansprechpartner_name TEXT,
  ADD COLUMN IF NOT EXISTS ansprechpartner_tel TEXT,
  ADD COLUMN IF NOT EXISTS parkmoeglichkeit TEXT,
  ADD COLUMN IF NOT EXISTS technik_vorhanden TEXT,
  ADD COLUMN IF NOT EXISTS ablauf_notizen TEXT,
  ADD COLUMN IF NOT EXISTS ankuendigung TEXT DEFAULT 'selbst',
  ADD COLUMN IF NOT EXISTS aufbau_zeit TEXT,
  ADD COLUMN IF NOT EXISTS besonderheiten TEXT,
  ADD COLUMN IF NOT EXISTS budget_rahmen TEXT,
  ADD COLUMN IF NOT EXISTS planung_status TEXT DEFAULT 'offen';

-- Standard-Vorlagen einfügen
INSERT INTO public.email_templates (slug, name, beschreibung, betreff, inhalt, kategorie, sortierung) VALUES

('erstanfrage', 'Erstanfrage – Details erfragen', 'Nach neuer Anfrage: Details zum Event erfragen + Show-Konzepte vorstellen',
'Ihre Anfrage bei Emilian Leber – nächste Schritte',
'Hallo {{begruessung}},

vielen Dank für Ihre Anfrage und Ihr Interesse an meiner Zaubershow – ich freue mich sehr darüber!

Damit ich Ihnen ein individuelles und passgenaues Angebot erstellen kann, benötige ich noch einige Informationen:

• Um welche Art von Veranstaltung handelt es sich (z. B. Firmenfeier, Hochzeit, Geburtstag …)?
• Wie viele Gäste werden voraussichtlich anwesend sein?
• Gibt es bereits eine Location oder einen geplanten Ablauf?
• Zu welcher Uhrzeit ist mein Auftritt ungefähr vorgesehen?
• Haben Sie ein ungefähres Budget oder einen Preisrahmen, an dem ich mich orientieren darf?
• An wen soll das Angebot bzw. die Rechnung adressiert werden (Name, Firma und Anschrift)?

Gerne stelle ich Ihnen im Folgenden meine Show-Konzepte kurz vor:

🎩 Bühnenshow – „Magic meets Entertainment"
Eine moderne, interaktive Zaubershow für alle Gäste gemeinsam – humorvoll, unterhaltsam und mit einem Hauch Emotion. Ideal als Highlight für den Abend. Dauer: ca. 20–45 Minuten.

✨ Close-up-Magie – „Magie hautnah erleben"
Magie direkt vor den Augen Ihrer Gäste – an den Tischen, beim Empfang oder mitten im Publikum. Besonders persönlich und charmant.

💫 Kombination aus Bühnenshow & Close-up
Zunächst Magie hautnah beim Empfang, anschließend eine gemeinsame Bühnenshow als Höhepunkt des Abends.

Sobald ich Ihre Rückmeldung habe, erstelle ich Ihnen gerne ein unverbindliches Angebot mit allen Details.

Ich freue mich auf Ihre Antwort und darauf, Ihre Veranstaltung mit etwas Magie zu bereichern!',
'anfrage', 1),

('7_tage_vorher', '7 Tage vor Event – Letzte Details', 'Eine Woche vor dem Event: Letzte Details klären',
'Ihr Event in einer Woche – letzte Details',
'Hallo {{begruessung}},

in Kürze ist es soweit – ich freue mich schon sehr auf Ihre Veranstaltung!

Damit am Veranstaltungstag alles reibungslos abläuft, würde ich gerne noch ein paar letzte Details mit Ihnen abstimmen:

• Uhrzeit & Ablauf: Gibt es bereits einen genauen Zeitpunkt, zu dem mein Auftritt stattfinden soll?
• Ansprechpartner vor Ort: Wer ist am Veranstaltungstag mein Kontakt, falls kurzfristig etwas abgestimmt werden muss?
• Parkmöglichkeit & Zugang: Wo kann ich am besten parken und mein Equipment ausladen?
• Anzahl der Gäste: Hat sich an der Gästezahl oder dem geplanten Ablauf noch etwas geändert?
• Ankündigung: Soll mich jemand kurz ankündigen oder wünschen Sie, dass ich selbst direkt ins Programm starte?

Wenn Sie möchten, können wir auch gerne kurz telefonieren – manchmal ist das einfacher als per E-Mail.

Ich freue mich auf einen gelungenen, magischen Abend!',
'event', 2),

('angebot_nachfrage', 'Angebots-Nachfrage', 'Freundlich nach Status des Angebots fragen',
'Kurze Rückfrage zu meinem Angebot',
'Hallo {{begruessung}},

ich hoffe, es geht Ihnen gut.

Ich wollte mich kurz melden, um nach dem aktuellen Stand meines Angebotes zu fragen. Da ich meine weiteren Schritte gerne darauf abstimmen möchte, würde ich mich sehr über eine kurze Rückmeldung freuen, sobald es bei Ihnen zeitlich passt.

Falls Sie noch etwas von mir benötigen oder weitere Informationen hilfreich wären, lasse ich Ihnen diese selbstverständlich gerne zukommen.

Vielen Dank für Ihre Zeit und Ihre Rückmeldung.',
'anfrage', 3),

('nach_buchung', 'Nach Buchung – Nächste Schritte', 'Nach Buchungsbestätigung: Freude + nächste Schritte erklären',
'Großartig – Ihr Event ist gebucht! ✨',
'Hallo {{begruessung}},

ich freue mich sehr, dass wir zusammenarbeiten werden! Ihr Event ist jetzt offiziell gebucht.

So geht es weiter:
1. Sie erhalten in Kürze Ihre Auftragsbestätigung
2. Ca. 2-3 Wochen vor dem Event melde ich mich nochmal für die letzten Details
3. Am Veranstaltungstag bin ich rechtzeitig vor Ort

Falls Sie in der Zwischenzeit Fragen haben oder sich Änderungen ergeben, können Sie mich jederzeit erreichen – per Mail, Telefon oder WhatsApp.

Ich freue mich auf einen wunderbaren Abend!',
'event', 4),

('rechnung_erinnerung', 'Zahlungserinnerung', 'Freundliche Erinnerung an offene Rechnung',
'Freundliche Erinnerung: Offene Rechnung',
'Hallo {{begruessung}},

ich hoffe, Sie denken gerne an unser gemeinsames Event zurück!

Ich wollte mich kurz und freundlich melden, da die Rechnung für Ihre Veranstaltung noch offen ist. Möglicherweise ist sie untergegangen – das passiert im Alltag schnell.

Sie finden die Rechnung jederzeit in Ihrem Kundenportal zum Download. Falls es Fragen zur Rechnung gibt oder Sie einen anderen Zahlungsweg bevorzugen, melden Sie sich gerne.

Vielen Dank!',
'rechnung', 5)

ON CONFLICT (slug) DO NOTHING;
