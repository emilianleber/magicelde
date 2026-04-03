-- Fix portal_documents: Status-Constraint entfernen + alle fehlenden Spalten sicherstellen
-- Damit der Kunde im Portal Angebote mit Status "gesendet" sehen kann

-- 1. Status-Constraint entfernen (alter Wert war 'planning' etc., jetzt 'entwurf','gesendet' etc.)
ALTER TABLE public.portal_documents DROP CONSTRAINT IF EXISTS portal_documents_status_check;

-- 2. Status-Spalte: Default auf 'entwurf' setzen (kein einschränkender CHECK)
ALTER TABLE public.portal_documents
  ALTER COLUMN status SET DEFAULT 'entwurf';

-- 3. Sicherstellen dass alle für das Admin-System benötigten Spalten existieren
ALTER TABLE public.portal_documents
  ADD COLUMN IF NOT EXISTS nummer TEXT,
  ADD COLUMN IF NOT EXISTS datum DATE DEFAULT CURRENT_DATE,
  ADD COLUMN IF NOT EXISTS kopftext TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS fusstext TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS info_text TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS empfaenger JSONB DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS absender JSONB DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS netto DECIMAL(12,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS mwst_betrag DECIMAL(12,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS brutto DECIMAL(12,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS mwst_gruppen JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS rabatt_prozent DECIMAL(5,2),
  ADD COLUMN IF NOT EXISTS rabatt_betrag DECIMAL(12,2),
  ADD COLUMN IF NOT EXISTS bezahlt_betrag DECIMAL(12,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS offener_betrag DECIMAL(12,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS zahlungsziel_tage INTEGER DEFAULT 14,
  ADD COLUMN IF NOT EXISTS faellig_am DATE,
  ADD COLUMN IF NOT EXISTS gueltig_bis DATE,
  ADD COLUMN IF NOT EXISTS lieferdatum DATE,
  ADD COLUMN IF NOT EXISTS mwst_satz DECIMAL(5,2) DEFAULT 19,
  ADD COLUMN IF NOT EXISTS kleinunternehmer BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS notizen TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS show_id UUID,
  ADD COLUMN IF NOT EXISTS produktion_id UUID,
  ADD COLUMN IF NOT EXISTS quelldokument_id UUID,
  ADD COLUMN IF NOT EXISTS quelldokument_nummer TEXT,
  ADD COLUMN IF NOT EXISTS folgedokument_id UUID,
  ADD COLUMN IF NOT EXISTS folgedokument_typ TEXT,
  ADD COLUMN IF NOT EXISTS preview_html TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS event_id UUID REFERENCES public.portal_events(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS request_id UUID REFERENCES public.portal_requests(id) ON DELETE SET NULL;

-- 4. Kunden-Lese-Policy sicherstellen (falls nicht vorhanden)
DROP POLICY IF EXISTS "Users can view own documents by email" ON public.portal_documents;
CREATE POLICY "Users can view own documents by email" ON public.portal_documents
  FOR SELECT
  USING (
    customer_id IN (
      SELECT id FROM public.portal_customers
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- 5. Service Role Zugriff (für Edge Functions)
DROP POLICY IF EXISTS "Service role full access portal_documents" ON public.portal_documents;
CREATE POLICY "Service role full access portal_documents" ON public.portal_documents
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);
