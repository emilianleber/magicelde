-- Tabelle für Kopf-/Fußzeilen-Textvorlagen bei Angeboten, Rechnungen etc.
CREATE TABLE IF NOT EXISTS public.dokument_textvorlagen (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  typ TEXT NOT NULL CHECK (typ IN ('angebot', 'rechnung', 'auftragsbestaetigung', 'mahnung', 'alle')),
  bereich TEXT NOT NULL CHECK (bereich IN ('kopf', 'fuss')),
  inhalt TEXT NOT NULL DEFAULT '',
  is_default BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.dokument_textvorlagen ENABLE ROW LEVEL SECURITY;

-- Admins haben vollen Zugriff
CREATE POLICY "admin_full_access_textvorlagen"
  ON public.dokument_textvorlagen
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Standardvorlagen
INSERT INTO public.dokument_textvorlagen (name, typ, bereich, inhalt, is_default, sort_order) VALUES
  -- Angebot Kopf
  ('Standard', 'angebot', 'kopf',
   'Sehr geehrte Damen und Herren,

vielen Dank für Ihr Interesse. Gerne unterbreiten wir Ihnen folgendes Angebot:',
   true, 1),

  -- Angebot Fuss
  ('Standard', 'angebot', 'fuss',
   'Dieses Angebot ist freibleibend und gilt bis zum oben angegebenen Datum.

Wir freuen uns auf Ihre Rückmeldung und stehen für Rückfragen jederzeit gerne zur Verfügung.

Mit freundlichen Grüßen',
   true, 1),

  -- Rechnung Kopf
  ('Standard', 'rechnung', 'kopf',
   'Sehr geehrte Damen und Herren,

für die erbrachten Leistungen erlauben wir uns, folgende Rechnung zu stellen:',
   true, 1),

  -- Rechnung Fuss
  ('Standard', 'rechnung', 'fuss',
   'Bitte überweisen Sie den Rechnungsbetrag innerhalb des angegebenen Zahlungsziels auf das untenstehende Konto.

Vielen Dank für Ihr Vertrauen.

Mit freundlichen Grüßen',
   true, 1),

  -- Auftragsbestätigung Kopf
  ('Standard', 'auftragsbestaetigung', 'kopf',
   'Sehr geehrte Damen und Herren,

vielen Dank für Ihren Auftrag. Wir bestätigen hiermit gerne die Beauftragung folgender Leistungen:',
   true, 1),

  -- Auftragsbestätigung Fuss
  ('Standard', 'auftragsbestaetigung', 'fuss',
   'Wir freuen uns auf die Zusammenarbeit und werden alles daran setzen, Ihre Erwartungen zu erfüllen.

Mit freundlichen Grüßen',
   true, 1),

  -- Mahnung Kopf
  ('Standard', 'mahnung', 'kopf',
   'Sehr geehrte Damen und Herren,

bei der Überprüfung unserer Buchhaltung haben wir festgestellt, dass folgende Rechnung noch offen ist. Wir bitten Sie, den ausstehenden Betrag zu begleichen:',
   true, 1),

  -- Mahnung Fuss
  ('Standard', 'mahnung', 'fuss',
   'Bitte überweisen Sie den ausstehenden Betrag innerhalb von 7 Tagen auf das unten angegebene Konto. Sollten Sie die Zahlung bereits veranlasst haben, betrachten Sie dieses Schreiben als gegenstandslos.

Mit freundlichen Grüßen',
   true, 1);
