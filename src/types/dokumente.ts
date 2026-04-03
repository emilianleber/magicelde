// ── Dokument-Workflow-Typen ──────────────────────────────────────────────────

export type DokumentTyp =
  | 'angebot'
  | 'auftragsbestaetigung'
  | 'rechnung'
  | 'abschlagsrechnung'
  | 'mahnung'
  | 'gutschrift'
  | 'stornorechnung'

export type DokumentStatus =
  | 'entwurf'
  | 'gesendet'
  | 'akzeptiert'    // Angebot
  | 'abgelehnt'     // Angebot
  | 'offen'         // Rechnung, noch nicht bezahlt
  | 'teilbezahlt'
  | 'bezahlt'
  | 'ueberfaellig'
  | 'storniert'

export interface DokumentEmpfaenger {
  name: string
  firma?: string
  adresse: string
  plz: string
  ort: string
  land: string
  email?: string
  ustId?: string
}

export interface DokumentAbsender {
  name: string
  firma?: string
  adresse: string
  plz: string
  ort: string
  land: string
  email: string
  telefon?: string
  website?: string
  ustId?: string
  steuernummer?: string
  kleinunternehmer: boolean
  iban?: string
  bic?: string
  bank?: string
  logoUrl?: string
}

export interface Dokumentposition {
  id: string
  position: number
  typ: 'leistung' | 'produkt' | 'text' | 'zwischensumme' | 'seitenumbruch'
  bezeichnung: string
  beschreibung?: string
  menge: number
  einheit: string
  einzelpreis: number
  gesamt: number
  mwstSatz: number        // 0, 7, 19
  rabattProzent?: number
  artikelId?: string
}

export interface MwstGruppe {
  satz: number
  netto: number
  steuer: number
}

export interface Zahlung {
  id: string
  datum: string
  betrag: number
  zahlungsart: 'ueberweisung' | 'bar' | 'paypal' | 'karte' | 'sonstiges'
  notiz?: string
}

export interface Dokument {
  id: string
  nummer: string              // z.B. "AN-2026-001"
  typ: DokumentTyp
  status: DokumentStatus

  // Workflow-Verknüpfungen
  quelldokumentId?: string    // woher umgewandelt wurde
  quelldokumentNummer?: string
  folgedokumentId?: string    // wohin umgewandelt wurde
  folgedokumentTyp?: DokumentTyp

  // CRM-Verknüpfungen
  customerId?: string         // portal_customers.id
  eventId?: string            // portal_events.id
  requestId?: string          // portal_requests.id
  showId?: string             // shows_intern.id
  produktionId?: string       // produktionen.id

  // Empfänger (aus CRM gezogen, aber überschreibbar)
  empfaenger: DokumentEmpfaenger

  // Absender (Snapshot aus Einstellungen zum Zeitpunkt der Erstellung)
  absender: DokumentAbsender

  // Daten
  datum: string               // Ausstellungsdatum
  gueltigBis?: string         // Nur Angebote
  lieferdatum?: string        // Leistungsdatum (Rechnung)
  faelligAm?: string          // Zahlungsziel
  zahlungszielTage: number

  // Inhalte
  positionen: Dokumentposition[]
  kopftext: string
  fusstext: string
  infoText?: string           // z.B. Bankdaten im Fußbereich

  // Berechnete Summen (immer aktuell)
  netto: number
  mwstGruppen: MwstGruppe[]
  mwstBetrag: number
  brutto: number
  rabattProzent?: number
  rabattBetrag?: number

  // Zahlungsverfolgung
  zahlungen: Zahlung[]
  bezahltBetrag: number
  offenerBetrag: number

  // Intern
  notizen?: string
  createdAt: string
  updatedAt: string
  previewHtml?: string
}

// ── Artikel-Stamm ───────────────────────────────────────────────────────────

export interface Artikel {
  id: string
  nummer?: string
  bezeichnung: string
  beschreibung?: string
  einheit: string
  preis: number
  mwstSatz: number
  kategorie?: string
  aktiv: boolean
  createdAt: string
  updatedAt: string
}

// ── Berechnungshilfsmittel ──────────────────────────────────────────────────

export interface DokumentSummen {
  netto: number
  mwstGruppen: MwstGruppe[]
  mwstBetrag: number
  brutto: number
  rabattBetrag: number
  offenerBetrag: number
}

// ── Nummernkreis ────────────────────────────────────────────────────────────

export interface Nummernkreis {
  prefix: string
  naechsteNummer: number
}

// ── Textvorlagen ────────────────────────────────────────────────────────────

export interface Textvorlagen {
  angebotKopf: string
  angebotFuss: string
  rechnungKopf: string
  rechnungFuss: string
  abKopf: string        // Auftragsbestätigung
  abFuss: string
  mahnungKopf: string
  mahnungFuss: string
  mailAngebot: string
  mailRechnung: string
}
