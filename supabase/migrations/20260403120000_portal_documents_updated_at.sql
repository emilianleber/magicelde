-- Add missing updated_at column to portal_documents
ALTER TABLE public.portal_documents
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- Backfill existing rows
UPDATE public.portal_documents SET updated_at = created_at WHERE updated_at IS NULL;
