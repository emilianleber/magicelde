-- Schlussrechnung als erlaubten Typ hinzufügen
ALTER TABLE public.portal_documents DROP CONSTRAINT IF EXISTS portal_documents_type_check;
ALTER TABLE public.portal_documents ADD CONSTRAINT portal_documents_type_check
  CHECK (type IN ('Angebot', 'Rechnung', 'Abschlagsrechnung', 'Schlussrechnung', 'Auftragsbestätigung', 'Mahnung', 'Gutschrift', 'Stornorechnung', 'Vertrag'));
