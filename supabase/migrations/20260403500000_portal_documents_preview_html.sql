-- Speichert das gerenderte Preview-HTML für PDF-Downloads
ALTER TABLE public.portal_documents
  ADD COLUMN IF NOT EXISTS preview_html TEXT DEFAULT '';
