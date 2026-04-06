-- Seed: 12 Standard-Pakete anlegen
INSERT INTO public.pakete (name, beschreibung_intern, beschreibung_kunde, zieldauer, preis, anlaesse, effekt_ids) VALUES
  -- Close-Up
  ('Close-Up S', 'Close-Up 20-30 Min', 'Close-Up Zaubershow – 20 bis 30 Minuten hautnah zwischen Ihren Gästen. Verblüffende Magie direkt vor Ihren Augen mit Karten, Münzen und Alltagsgegenständen.', 25, 495, '{"hochzeit","firma","familie","geburtstag","gala"}', '{}'),
  ('Close-Up M', 'Close-Up 30-45 Min', 'Close-Up Zaubershow – 30 bis 45 Minuten hautnah zwischen Ihren Gästen. Verblüffende Magie direkt vor Ihren Augen mit Karten, Münzen und Alltagsgegenständen.', 37, 749, '{"hochzeit","firma","familie","geburtstag","gala"}', '{}'),
  ('Close-Up L', 'Close-Up 45-60 Min', 'Close-Up Zaubershow – 45 bis 60 Minuten hautnah zwischen Ihren Gästen. Verblüffende Magie direkt vor Ihren Augen mit Karten, Münzen und Alltagsgegenständen.', 52, 945, '{"hochzeit","firma","familie","geburtstag","gala"}', '{}'),

  -- Hochzeit Close-Up (mit Braut-Effekt)
  ('Hochzeit Close-Up S', 'Hochzeit Close-Up 20-30 Min + Braut-Effekt', 'Close-Up Zaubershow für Ihre Hochzeit – 20 bis 30 Minuten. Inklusive besonderem Effekt speziell für die Braut.', 25, 495, '{"hochzeit"}', '{}'),
  ('Hochzeit Close-Up M', 'Hochzeit Close-Up 30-45 Min + Braut-Effekt', 'Close-Up Zaubershow für Ihre Hochzeit – 30 bis 45 Minuten. Inklusive besonderem Effekt speziell für die Braut.', 37, 749, '{"hochzeit"}', '{}'),
  ('Hochzeit Close-Up L', 'Hochzeit Close-Up 45-60 Min + Braut-Effekt', 'Close-Up Zaubershow für Ihre Hochzeit – 45 bis 60 Minuten. Inklusive besonderem Effekt speziell für die Braut.', 52, 945, '{"hochzeit"}', '{}'),

  -- Bühnenshow
  ('Bühnenshow S', 'Bühnenshow 15-20 Min', 'Bühnenshow – 15 bis 20 Minuten. Professionelle Zaubershow auf der Bühne mit Licht und Musik.', 17, 395, '{"hochzeit","firma","familie","geburtstag","gala"}', '{}'),
  ('Bühnenshow M', 'Bühnenshow 20-30 Min', 'Bühnenshow – 20 bis 30 Minuten. Professionelle Zaubershow auf der Bühne mit Licht und Musik.', 25, 495, '{"hochzeit","firma","familie","geburtstag","gala"}', '{}'),
  ('Bühnenshow L', 'Bühnenshow 30-45 Min', 'Bühnenshow – 30 bis 45 Minuten. Professionelle Zaubershow auf der Bühne mit Licht und Musik.', 37, 749, '{"hochzeit","firma","familie","geburtstag","gala"}', '{}'),

  -- Kombination (Close-Up + Bühne)
  ('Kombination S', '20-30 Min Close-Up + 15-20 Min Bühne', 'Das Beste aus zwei Welten: 20–30 Minuten Close-Up hautnah zwischen Ihren Gästen, gefolgt von einer 15–20-minütigen Bühnenshow.', 42, 579, '{"hochzeit","firma","familie","geburtstag","gala"}', '{}'),
  ('Kombination M', '20-30 Min Close-Up + 20-30 Min Bühne', 'Das Beste aus zwei Welten: 20–30 Minuten Close-Up hautnah zwischen Ihren Gästen, gefolgt von einer 20–30-minütigen Bühnenshow.', 50, 849, '{"hochzeit","firma","familie","geburtstag","gala"}', '{}'),
  ('Kombination L', '30-45 Min Close-Up + 20-30 Min Bühne', 'Das Beste aus zwei Welten: 30–45 Minuten Close-Up hautnah zwischen Ihren Gästen, gefolgt von einer 20–30-minütigen Bühnenshow.', 62, 999, '{"hochzeit","firma","familie","geburtstag","gala"}', '{}')

ON CONFLICT DO NOTHING;
