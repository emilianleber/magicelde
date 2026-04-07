-- Kunden dürfen Pakete lesen (für Anzeige im Portal)
CREATE POLICY "Authenticated users can read pakete" ON public.pakete
  FOR SELECT USING (auth.role() = 'authenticated');
