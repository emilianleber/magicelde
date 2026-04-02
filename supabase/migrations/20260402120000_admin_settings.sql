CREATE TABLE IF NOT EXISTS public.admin_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT DEFAULT 'Emilian Leber',
  company_owner TEXT DEFAULT 'Emilian Leber',
  company_address TEXT DEFAULT '',
  company_zip TEXT DEFAULT '',
  company_city TEXT DEFAULT 'Regensburg',
  company_country TEXT DEFAULT 'Deutschland',
  company_email TEXT DEFAULT 'el@magicel.de',
  company_phone TEXT DEFAULT '',
  company_website TEXT DEFAULT 'magicel.de',
  tax_number TEXT DEFAULT '',
  vat_id TEXT DEFAULT '',
  bank_name TEXT DEFAULT '',
  bank_iban TEXT DEFAULT '',
  bank_bic TEXT DEFAULT '',
  bank_account_holder TEXT DEFAULT 'Emilian Leber',
  default_payment_days INTEGER DEFAULT 14,
  default_tax_rate DECIMAL(5,2) DEFAULT 0,
  currency TEXT DEFAULT 'EUR',
  document_template INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access admin_settings" ON public.admin_settings
  FOR ALL USING (auth.jwt() ->> 'email' = 'el@magicel.de')
  WITH CHECK (auth.jwt() ->> 'email' = 'el@magicel.de');

INSERT INTO public.admin_settings (id) VALUES (gen_random_uuid());
