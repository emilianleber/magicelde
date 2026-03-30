-- Add soft-delete support to portal_customers
ALTER TABLE portal_customers ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ DEFAULT NULL;
