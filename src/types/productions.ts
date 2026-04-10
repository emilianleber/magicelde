// ── Effekte & Pakete ─────────────────────────────────────────────────

export interface Effekt {
  id: string
  name: string
  typ: 'closeup' | 'buehne' | 'beides'
  dauer: number           // minutes
  resetZeit: number       // minutes
  schwierigkeit: 1 | 2 | 3
  anlaesse: ('hochzeit' | 'firma' | 'familie' | 'geburtstag' | 'gala')[]
  status: 'aktiv' | 'entwicklung' | 'pausiert'
  props: string[]
  interneNotizen: string
  wiederholbar: boolean
  // NEW fields
  kategorie?: string
  wowRating?: number
  setupZeit?: number        // minutes
  videoUrl?: string
  fotoUrls?: string[]
  beschreibung?: string
  createdAt: string
  updatedAt: string
}

export interface Paket {
  id: string
  name: string
  beschreibungIntern: string
  beschreibungKunde: string
  effektIds: string[]
  zieldauer: number
  preis: number
  anlaesse: string[]
  createdAt: string
  updatedAt: string
}

// ── Show ─────────────────────────────────────────────────────────────

export interface ShowPhase {
  label: string
  typ: 'empfang' | 'akt1' | 'pause' | 'akt2' | 'finale' | 'gang1' | 'gang2' | 'gang3' | 'gang4'
  effektIds: string[]
}

export interface MusikTrack {
  titel: string
  kuenstler: string
  dauer: number // seconds
  gemaNr?: string
}

export interface ShowScript {
  phasenLabel: string
  text: string
}

export interface GemaDaten {
  werktitel: string
  urheber: string
  verlag?: string
  dauer: number
}

export interface MarketingAsset {
  typ: 'plakat' | 'social_media' | 'presstext' | 'foto' | 'video' | 'sonstiges'
  name: string
  url?: string
  notizen?: string
}

export type ShowTyp = 'vorlage' | 'individuell' | 'eigenes-programm'

export interface Show {
  id: string
  name: string
  anlass: string
  format: 'kundenbuchung' | 'abendshow' | 'magic-dinner' | 'tourshow' | 'close-up' | 'workshop'
  showTyp: ShowTyp
  eventId?: string
  produktionId?: string
  basisPaketId?: string
  phasen: ShowPhase[]
  zieldauer: number
  preis?: number
  beschreibungKunde?: string
  konzeptKundentext: string
  technischeAnforderungen: string
  status: 'entwurf' | 'gesendet' | 'akzeptiert' | 'proben' | 'fertig' | 'archiviert'
  // Extended fields
  beschreibung?: string
  musikPlaylist?: MusikTrack[]
  texteScripts?: ShowScript[]
  gemaDaten?: GemaDaten[]
  marketingAssets?: MarketingAsset[]
  budget?: Record<string, any>
  createdAt: string
  updatedAt: string
}

// ── Locations ────────────────────────────────────────────────────────

export interface LocationVenue {
  id: string
  name: string
  typ: 'theater' | 'restaurant' | 'hotel' | 'outdoor' | 'sonstiges'
  kapazitaet: number
  buehnenBreite?: number
  buehnenTiefe?: number
  vorhandeneTechnik: string
  kontaktName?: string
  kontaktEmail?: string
  kontaktTel?: string
  notizen: string
  adresse: string
  // NEW fields
  buehnenHoehe?: number
  stromAnschluss?: string
  lichtVorhanden?: boolean
  tonVorhanden?: boolean
  anfahrtHinweise?: string
  parkplaetze?: number
  website?: string
  createdAt: string
  updatedAt: string
}

// ── Team ─────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string
  name: string
  rolle: 'techniker' | 'assistent' | 'fotograf' | 'videograf' | 'moderator' | 'musiker' | 'servicekraft' | 'fahrer' | 'sonstiges'
  kontaktEmail?: string
  kontaktTel?: string
  stundensatz?: number
  tagessatz?: number
  notizen: string
  createdAt: string
  updatedAt: string
}

// ── Tour ─────────────────────────────────────────────────────────────

export interface Tour {
  id: string
  name: string
  beschreibung: string
  showId?: string
  show?: Show // joined
  status: 'planung' | 'aktiv' | 'abgeschlossen' | 'abgesagt'
  startDatum?: string
  endDatum?: string
  budgetGesamt: Record<string, any>
  notizen: string
  termine?: TourTermin[] // joined
  createdAt: string
  updatedAt: string
}

export interface TourTermin {
  id: string
  tourId: string
  datum: string
  uhrzeitEinlass?: string
  uhrzeitShow?: string
  uhrzeitAufbau?: string
  uhrzeitSoundcheck?: string
  uhrzeitAbbau?: string
  locationId?: string
  location?: LocationVenue // joined
  kapazitaet: number
  ticketPreis: number
  ticketsVerkauft: number
  ticketLink?: string
  ticketAnbieter?: 'eventim' | 'okticket' | 'reservix' | 'eigen' | 'sonstiges'
  umsatzIst: number
  kosten: number
  status: 'geplant' | 'beworben' | 'ausverkauft' | 'abgeschlossen' | 'abgesagt'
  notizen: string
  team?: TourTeamAssignment[] // joined
  createdAt: string
}

export interface TourTeamAssignment {
  id: string
  tourTerminId: string
  teamMemberId: string
  teamMember?: TeamMember
  rolle?: string
  honorar?: number
  bestaetigt: boolean
}

export interface ShowTeamAssignment {
  id: string
  showId: string
  teamMemberId: string
  teamMember?: TeamMember
  rolle?: string
}

// ── Termine (legacy) ─────────────────────────────────────────────────

export interface Termin {
  id: string
  produktionId: string
  datum: string
  uhrzeit: string
  locationId?: string
  ticketLink?: string
  status: 'geplant' | 'beworben' | 'ausverkauft' | 'abgeschlossen'
  auslastungIst?: number
}

// ── Ausgaben ─────────────────────────────────────────────────────────

export interface Ausgabe {
  id: string
  produktionId: string
  kategorie: string
  betrag: number
  notiz?: string
}

export interface MarketingKanal {
  id: string
  kanal: string
  deadline: string
  status: 'offen' | 'erledigt'
}

export interface Kalkulation {
  ticketpreis: number
  kapazitaet: number
}

// ── DEPRECATED: Use Tour instead ─────────────────────────────────────
/** @deprecated Use Tour interface instead */
export interface Produktion {
  id: string
  format: 'abendshow' | 'magic-dinner' | 'tourshow'
  titel: string
  untertitel?: string
  status: 'idee' | 'konzept' | 'produktion' | 'bewerbung' | 'aktiv' | 'abgeschlossen'
  showId?: string
  locationId?: string
  kalkulation: Kalkulation
  marketingKanaele: MarketingKanal[]
  notizen: string
  ideenSammlung: string[]
  pressetext: string
  kurzbeschreibung: string
  createdAt: string
  updatedAt: string
}

// ── DEPRECATED: Use TeamMember instead ───────────────────────────────
/** @deprecated Use TeamMember interface instead */
export interface Partner {
  id: string
  name: string
  rolle: 'location' | 'technik' | 'restaurant' | 'fotograf' | 'sonstiges'
  kontaktEmail?: string
  kontaktTel?: string
  notizen: string
  produktionIds: string[]
  createdAt: string
  updatedAt: string
}

export interface Angebotsposition {
  id: string
  beschreibung: string
  menge: number
  einzelpreis: number
  gesamt: number
}
