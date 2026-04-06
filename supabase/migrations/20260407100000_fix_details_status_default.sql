-- Fix: details_status war fälschlich "offen" statt null bei neuen Events
-- Setze alle "offen" zurück auf null (Admin hat es nicht explizit gesetzt)
UPDATE public.portal_events SET details_status = NULL WHERE details_status = 'offen';
UPDATE public.portal_events SET contract_status = NULL WHERE contract_status = 'offen';
UPDATE public.portal_events SET invoice_status = NULL WHERE invoice_status = 'offen';
