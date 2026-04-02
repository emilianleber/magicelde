-- ── Effekte ─────────────────────────────────────────────────────────
CREATE TABLE public.effekte (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  typ TEXT NOT NULL DEFAULT 'closeup' CHECK (typ IN ('closeup', 'buehne', 'beides')),
  dauer INTEGER NOT NULL DEFAULT 5,
  reset_zeit INTEGER NOT NULL DEFAULT 2,
  schwierigkeit INTEGER NOT NULL DEFAULT 1 CHECK (schwierigkeit IN (1, 2, 3)),
  anlaesse TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'aktiv' CHECK (status IN ('aktiv', 'entwicklung', 'pausiert')),
  props TEXT[] DEFAULT '{}',
  interne_notizen TEXT DEFAULT '',
  wiederholbar BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.effekte ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access effekte" ON public.effekte FOR ALL
  USING (auth.jwt() ->> 'email' = 'el@magicel.de')
  WITH CHECK (auth.jwt() ->> 'email' = 'el@magicel.de');

-- ── Pakete ──────────────────────────────────────────────────────────
CREATE TABLE public.pakete (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  beschreibung_intern TEXT DEFAULT '',
  beschreibung_kunde TEXT DEFAULT '',
  effekt_ids UUID[] DEFAULT '{}',
  zieldauer INTEGER DEFAULT 60,
  preis DECIMAL(10,2) DEFAULT 0,
  anlaesse TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.pakete ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access pakete" ON public.pakete FOR ALL
  USING (auth.jwt() ->> 'email' = 'el@magicel.de')
  WITH CHECK (auth.jwt() ->> 'email' = 'el@magicel.de');

-- ── Locations ───────────────────────────────────────────────────────
CREATE TABLE public.locations_intern (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  typ TEXT NOT NULL DEFAULT 'sonstiges' CHECK (typ IN ('theater', 'restaurant', 'hotel', 'outdoor', 'sonstiges')),
  kapazitaet INTEGER DEFAULT 0,
  buehnen_breite DECIMAL(5,2),
  buehnen_tiefe DECIMAL(5,2),
  vorhandene_technik TEXT DEFAULT '',
  kontakt_name TEXT,
  kontakt_email TEXT,
  kontakt_tel TEXT,
  notizen TEXT DEFAULT '',
  adresse TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.locations_intern ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access locations_intern" ON public.locations_intern FOR ALL
  USING (auth.jwt() ->> 'email' = 'el@magicel.de')
  WITH CHECK (auth.jwt() ->> 'email' = 'el@magicel.de');

-- ── Partner ─────────────────────────────────────────────────────────
CREATE TABLE public.partner_intern (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  rolle TEXT NOT NULL DEFAULT 'sonstiges' CHECK (rolle IN ('location', 'technik', 'restaurant', 'fotograf', 'sonstiges')),
  kontakt_email TEXT,
  kontakt_tel TEXT,
  notizen TEXT DEFAULT '',
  produktion_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.partner_intern ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access partner_intern" ON public.partner_intern FOR ALL
  USING (auth.jwt() ->> 'email' = 'el@magicel.de')
  WITH CHECK (auth.jwt() ->> 'email' = 'el@magicel.de');

-- ── Produktionen ─────────────────────────────────────────────────────
CREATE TABLE public.produktionen (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  format TEXT NOT NULL DEFAULT 'abendshow' CHECK (format IN ('abendshow', 'magic-dinner', 'tourshow')),
  titel TEXT NOT NULL,
  untertitel TEXT,
  status TEXT NOT NULL DEFAULT 'idee' CHECK (status IN ('idee', 'konzept', 'produktion', 'bewerbung', 'aktiv', 'abgeschlossen')),
  show_id UUID,
  location_id UUID REFERENCES public.locations_intern(id) ON DELETE SET NULL,
  notizen TEXT DEFAULT '',
  ideen_sammlung TEXT[] DEFAULT '{}',
  pressetext TEXT DEFAULT '',
  kurzbeschreibung TEXT DEFAULT '',
  kalkulation_ticketpreis DECIMAL(10,2) DEFAULT 0,
  kalkulation_kapazitaet INTEGER DEFAULT 0,
  marketing_kanaele JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.produktionen ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access produktionen" ON public.produktionen FOR ALL
  USING (auth.jwt() ->> 'email' = 'el@magicel.de')
  WITH CHECK (auth.jwt() ->> 'email' = 'el@magicel.de');

-- ── Produktions-Termine ──────────────────────────────────────────────
CREATE TABLE public.produktions_termine (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  produktion_id UUID NOT NULL REFERENCES public.produktionen(id) ON DELETE CASCADE,
  datum DATE NOT NULL,
  uhrzeit TIME,
  location_id UUID REFERENCES public.locations_intern(id) ON DELETE SET NULL,
  ticket_link TEXT,
  status TEXT NOT NULL DEFAULT 'geplant' CHECK (status IN ('geplant', 'beworben', 'ausverkauft', 'abgeschlossen')),
  auslastung_ist INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.produktions_termine ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access produktions_termine" ON public.produktions_termine FOR ALL
  USING (auth.jwt() ->> 'email' = 'el@magicel.de')
  WITH CHECK (auth.jwt() ->> 'email' = 'el@magicel.de');

-- ── Produktions-Ausgaben ─────────────────────────────────────────────
CREATE TABLE public.produktions_ausgaben (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  produktion_id UUID NOT NULL REFERENCES public.produktionen(id) ON DELETE CASCADE,
  kategorie TEXT NOT NULL,
  betrag DECIMAL(10,2) NOT NULL DEFAULT 0,
  notiz TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.produktions_ausgaben ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access produktions_ausgaben" ON public.produktions_ausgaben FOR ALL
  USING (auth.jwt() ->> 'email' = 'el@magicel.de')
  WITH CHECK (auth.jwt() ->> 'email' = 'el@magicel.de');

-- ── Shows (intern) ───────────────────────────────────────────────────
CREATE TABLE public.shows_intern (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  anlass TEXT DEFAULT '',
  format TEXT NOT NULL DEFAULT 'abendshow' CHECK (format IN ('kundenbuchung', 'abendshow', 'magic-dinner', 'tourshow')),
  event_id UUID REFERENCES public.portal_events(id) ON DELETE SET NULL,
  produktion_id UUID REFERENCES public.produktionen(id) ON DELETE SET NULL,
  basis_paket_id UUID REFERENCES public.pakete(id) ON DELETE SET NULL,
  phasen JSONB DEFAULT '[]'::jsonb,
  zieldauer INTEGER DEFAULT 60,
  konzept_kundentext TEXT DEFAULT '',
  technische_anforderungen TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'entwurf' CHECK (status IN ('entwurf', 'gesendet', 'akzeptiert')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.shows_intern ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access shows_intern" ON public.shows_intern FOR ALL
  USING (auth.jwt() ->> 'email' = 'el@magicel.de')
  WITH CHECK (auth.jwt() ->> 'email' = 'el@magicel.de');
