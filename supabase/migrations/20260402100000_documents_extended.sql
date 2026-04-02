-- Extend portal_documents with document creation fields
ALTER TABLE public.portal_documents
  ADD COLUMN IF NOT EXISTS request_id UUID REFERENCES public.portal_requests(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS document_number TEXT,
  ADD COLUMN IF NOT EXISTS document_date DATE DEFAULT CURRENT_DATE,
  ADD COLUMN IF NOT EXISTS intro_text TEXT,
  ADD COLUMN IF NOT EXISTS closing_text TEXT,
  ADD COLUMN IF NOT EXISTS tax_rate DECIMAL(5,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS subtotal DECIMAL(10,2),
  ADD COLUMN IF NOT EXISTS tax_amount DECIMAL(10,2),
  ADD COLUMN IF NOT EXISTS total DECIMAL(10,2);

-- Drop old type constraint and add new one covering all types
ALTER TABLE public.portal_documents DROP CONSTRAINT IF EXISTS portal_documents_type_check;
ALTER TABLE public.portal_documents ADD CONSTRAINT portal_documents_type_check
  CHECK (type IN ('Angebot', 'Rechnung', 'Auftragsbestätigung', 'Abschlagsrechnung', 'Vertrag', 'Info', 'Ablaufplan', 'Sonstiges'));

-- Create document_positions table for line items
CREATE TABLE IF NOT EXISTS public.document_positions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID NOT NULL REFERENCES public.portal_documents(id) ON DELETE CASCADE,
  position INTEGER NOT NULL DEFAULT 1,
  description TEXT NOT NULL DEFAULT '',
  quantity DECIMAL(10,3) NOT NULL DEFAULT 1,
  unit TEXT NOT NULL DEFAULT 'Pauschal',
  unit_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.document_positions ENABLE ROW LEVEL SECURITY;

-- Admin full access
CREATE POLICY "Admin full access document_positions" ON public.document_positions
  FOR ALL USING (auth.jwt() ->> 'email' = 'el@magicel.de')
  WITH CHECK (auth.jwt() ->> 'email' = 'el@magicel.de');

-- Service role full access
CREATE POLICY "Service role full access document_positions" ON public.document_positions
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Customers can read their own document positions
CREATE POLICY "Customers can read own document positions" ON public.document_positions
  FOR SELECT USING (
    document_id IN (
      SELECT pd.id FROM public.portal_documents pd
      JOIN public.portal_customers pc ON pc.id = pd.customer_id
      WHERE pc.email = auth.jwt() ->> 'email'
    )
  );
