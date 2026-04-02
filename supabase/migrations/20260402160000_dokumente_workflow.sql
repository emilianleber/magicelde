-- ── Erweiterung portal_documents für vollständigen SevDesk-Workflow ──────────

-- Workflow-Verknüpfungen
ALTER TABLE public.portal_documents
  ADD COLUMN IF NOT EXISTS quelldokument_id UUID REFERENCES public.portal_documents(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS quelldokument_nummer TEXT,
  ADD COLUMN IF NOT EXISTS folgedokument_id UUID REFERENCES public.portal_documents(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS folgedokument_typ TEXT,

  -- CRM-Verknüpfungen
  ADD COLUMN IF NOT EXISTS show_id UUID REFERENCES public.shows_intern(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS produktion_id UUID REFERENCES public.produktionen(id) ON DELETE SET NULL,

  -- Erweiterte Metadaten
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'entwurf',
  ADD COLUMN IF NOT EXISTS gueltig_bis DATE,
  ADD COLUMN IF NOT EXISTS lieferdatum DATE,
  ADD COLUMN IF NOT EXISTS faellig_am DATE,
  ADD COLUMN IF NOT EXISTS zahlungsziel_tage INTEGER DEFAULT 14,

  -- Empfänger (JSON-Snapshot, überschreibbar)
  ADD COLUMN IF NOT EXISTS empfaenger JSONB DEFAULT '{}'::jsonb,

  -- Absender (JSON-Snapshot aus Einstellungen)
  ADD COLUMN IF NOT EXISTS absender JSONB DEFAULT '{}'::jsonb,

  -- Texte
  ADD COLUMN IF NOT EXISTS kopftext TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS fusstext TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS info_text TEXT DEFAULT '',

  -- MwSt-Gruppen (berechnete Aufschlüsselung)
  ADD COLUMN IF NOT EXISTS mwst_gruppen JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS mwst_betrag DECIMAL(10,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS rabatt_prozent DECIMAL(5,2),
  ADD COLUMN IF NOT EXISTS rabatt_betrag DECIMAL(10,2),

  -- Zahlungsverfolgung
  ADD COLUMN IF NOT EXISTS bezahlt_betrag DECIMAL(10,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS offener_betrag DECIMAL(10,2) DEFAULT 0,

  -- Intern
  ADD COLUMN IF NOT EXISTS notizen TEXT DEFAULT '';

-- Positionen erweitern (Typen + MwSt + Rabatt pro Zeile)
ALTER TABLE public.document_positions
  ADD COLUMN IF NOT EXISTS zeilen_typ TEXT DEFAULT 'leistung'
    CHECK (zeilen_typ IN ('leistung', 'produkt', 'text', 'zwischensumme', 'seitenumbruch')),
  ADD COLUMN IF NOT EXISTS beschreibung TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS mwst_satz DECIMAL(5,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS rabatt_prozent DECIMAL(5,2),
  ADD COLUMN IF NOT EXISTS artikel_id UUID;

-- ── Zahlungen ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.dokument_zahlungen (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  dokument_id UUID NOT NULL REFERENCES public.portal_documents(id) ON DELETE CASCADE,
  datum DATE NOT NULL DEFAULT CURRENT_DATE,
  betrag DECIMAL(10,2) NOT NULL,
  zahlungsart TEXT NOT NULL DEFAULT 'ueberweisung'
    CHECK (zahlungsart IN ('ueberweisung', 'bar', 'paypal', 'karte', 'sonstiges')),
  notiz TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.dokument_zahlungen ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access dokument_zahlungen" ON public.dokument_zahlungen
  FOR ALL USING (auth.jwt() ->> 'email' = 'el@magicel.de')
  WITH CHECK (auth.jwt() ->> 'email' = 'el@magicel.de');
CREATE POLICY "Service role full access dokument_zahlungen" ON public.dokument_zahlungen
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ── Artikel-Stamm ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.artikel_stamm (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nummer TEXT,
  bezeichnung TEXT NOT NULL,
  beschreibung TEXT DEFAULT '',
  einheit TEXT NOT NULL DEFAULT 'pauschal',
  preis DECIMAL(10,2) NOT NULL DEFAULT 0,
  mwst_satz DECIMAL(5,2) NOT NULL DEFAULT 0,
  kategorie TEXT DEFAULT '',
  aktiv BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.artikel_stamm ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access artikel_stamm" ON public.artikel_stamm
  FOR ALL USING (auth.jwt() ->> 'email' = 'el@magicel.de')
  WITH CHECK (auth.jwt() ->> 'email' = 'el@magicel.de');

-- Standard-Artikel für Zauberer vorbefüllen
INSERT INTO public.artikel_stamm (bezeichnung, beschreibung, einheit, preis, mwst_satz, kategorie) VALUES
  ('Bühnenshow', 'Professionelle Bühnenshow inkl. Auf- und Abbau', 'pauschal', 1200, 0, 'Show'),
  ('Close-Up Magie', 'Tischmagie und Nahzauber für Ihre Gäste', 'pauschal', 800, 0, 'Show'),
  ('Magic Dinner', 'Interaktive Tischmagie für Ihr Dinner-Event', 'pauschal', 950, 0, 'Show'),
  ('Walking Act', 'Wandernde Magie durch Ihre Veranstaltung', 'Std.', 250, 0, 'Show'),
  ('Anfahrtspauschale', 'Anfahrt und Rückreise', 'km', 0.35, 0, 'Reise'),
  ('Technikpauschale', 'Licht- und Tontechnik', 'pauschal', 150, 0, 'Technik'),
  ('Probe / Vorbesprechung', 'Persönliche Absprache vor Ort', 'Std.', 80, 0, 'Vorbereitung'),
  ('Übernachtungspauschale', 'Hotel bei mehrtägigen Events', 'Nacht', 120, 0, 'Reise')
ON CONFLICT DO NOTHING;

-- ── Nummernkreise in admin_settings ergänzen ──────────────────────────────────
ALTER TABLE public.admin_settings
  ADD COLUMN IF NOT EXISTS nk_angebot_prefix TEXT DEFAULT 'AN',
  ADD COLUMN IF NOT EXISTS nk_angebot_naechste INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS nk_rechnung_prefix TEXT DEFAULT 'RE',
  ADD COLUMN IF NOT EXISTS nk_rechnung_naechste INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS nk_ab_prefix TEXT DEFAULT 'AB',
  ADD COLUMN IF NOT EXISTS nk_ab_naechste INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS nk_mahnung_prefix TEXT DEFAULT 'MA',
  ADD COLUMN IF NOT EXISTS nk_mahnung_naechste INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS kleinunternehmer BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS standard_mwst DECIMAL(5,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS kopftext_angebot TEXT DEFAULT 'vielen Dank für Ihr Interesse! Hiermit unterbreite ich Ihnen folgendes Angebot:',
  ADD COLUMN IF NOT EXISTS fusstext_angebot TEXT DEFAULT 'Dieses Angebot ist 30 Tage gültig. Bei Fragen stehe ich gerne zur Verfügung.',
  ADD COLUMN IF NOT EXISTS kopftext_rechnung TEXT DEFAULT 'vielen Dank für Ihren Auftrag. Hiermit berechne ich folgende Leistungen:',
  ADD COLUMN IF NOT EXISTS fusstext_rechnung TEXT DEFAULT 'Bitte überweisen Sie den Betrag innerhalb von {zahlungsziel} Tagen auf das unten angegebene Konto.',
  ADD COLUMN IF NOT EXISTS kopftext_ab TEXT DEFAULT 'vielen Dank für Ihren Auftrag. Ich bestätige hiermit folgende Leistungen:',
  ADD COLUMN IF NOT EXISTS fusstext_ab TEXT DEFAULT 'Ich freue mich auf die Zusammenarbeit und stehe bei Fragen jederzeit zur Verfügung.',
  ADD COLUMN IF NOT EXISTS kopftext_mahnung TEXT DEFAULT 'leider ist folgende Rechnung noch nicht beglichen worden. Ich bitte Sie, den offenen Betrag umgehend zu überweisen:',
  ADD COLUMN IF NOT EXISTS fusstext_mahnung TEXT DEFAULT 'Falls Sie die Zahlung bereits veranlasst haben, betrachten Sie dieses Schreiben als gegenstandslos.';
