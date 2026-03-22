
-- Create customer portal tables

CREATE TABLE public.portal_customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  kundennummer TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.portal_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.portal_customers(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  event_date DATE,
  location TEXT,
  status TEXT NOT NULL DEFAULT 'planning' CHECK (status IN ('planning', 'confirmed', 'completed', 'cancelled')),
  format TEXT,
  guests INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.portal_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.portal_customers(id) ON DELETE CASCADE NOT NULL,
  event_id UUID REFERENCES public.portal_events(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Angebot', 'Vertrag', 'Rechnung', 'Sonstiges')),
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.portal_timeline (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.portal_events(id) ON DELETE CASCADE NOT NULL,
  step TEXT NOT NULL,
  done BOOLEAN NOT NULL DEFAULT false,
  step_date DATE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.portal_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portal_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portal_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portal_timeline ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own customer profile" ON public.portal_customers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own customer profile" ON public.portal_customers FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own events" ON public.portal_events FOR SELECT USING (customer_id IN (SELECT id FROM public.portal_customers WHERE user_id = auth.uid()));

CREATE POLICY "Users can view own documents" ON public.portal_documents FOR SELECT USING (customer_id IN (SELECT id FROM public.portal_customers WHERE user_id = auth.uid()));

CREATE POLICY "Users can view own timeline" ON public.portal_timeline FOR SELECT USING (event_id IN (SELECT e.id FROM public.portal_events e JOIN public.portal_customers c ON e.customer_id = c.id WHERE c.user_id = auth.uid()));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_portal_customers_updated_at BEFORE UPDATE ON public.portal_customers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_portal_events_updated_at BEFORE UPDATE ON public.portal_events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
