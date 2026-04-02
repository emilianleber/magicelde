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

export interface ShowPhase {
  label: string
  typ: 'empfang' | 'akt1' | 'pause' | 'akt2' | 'finale' | 'gang1' | 'gang2' | 'gang3' | 'gang4'
  effektIds: string[]
}

export interface Show {
  id: string
  name: string
  anlass: string
  format: 'kundenbuchung' | 'abendshow' | 'magic-dinner' | 'tourshow'
  eventId?: string
  produktionId?: string
  basisPaketId?: string
  phasen: ShowPhase[]
  zieldauer: number
  konzeptKundentext: string
  technischeAnforderungen: string
  status: 'entwurf' | 'gesendet' | 'akzeptiert'
  createdAt: string
  updatedAt: string
}

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
  createdAt: string
  updatedAt: string
}

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
