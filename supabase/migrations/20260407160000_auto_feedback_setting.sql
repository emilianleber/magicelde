-- Auto-Feedback Einstellung: Nach wie vielen Tagen nach Event Feedback senden
ALTER TABLE public.admin_settings ADD COLUMN IF NOT EXISTS auto_feedback_days INTEGER DEFAULT 30;
