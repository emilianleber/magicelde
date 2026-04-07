-- Format-Feld auf Pakete: definiert den Showtyp für Portal-Links
ALTER TABLE public.pakete ADD COLUMN IF NOT EXISTS format TEXT;

-- Bestehende Pakete mit Format füllen
UPDATE public.pakete SET format = 'closeup' WHERE name ILIKE '%close-up%' AND name NOT ILIKE '%hochzeit%' AND name NOT ILIKE '%kombi%';
UPDATE public.pakete SET format = 'closeup' WHERE name ILIKE '%hochzeit%';
UPDATE public.pakete SET format = 'buehnenshow' WHERE name ILIKE '%bühnenshow%' AND name NOT ILIKE '%kombi%';
UPDATE public.pakete SET format = 'kombination' WHERE name ILIKE '%kombination%';
