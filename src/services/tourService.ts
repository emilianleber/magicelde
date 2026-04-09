import { supabase } from "@/integrations/supabase/client";
import type {
  Tour,
  TourTermin,
  TourTeamAssignment,
  Show,
  ShowPhase,
  LocationVenue,
  TeamMember,
} from "@/types/productions";

// ── Mappers ──────────────────────────────────────────────────────────

const toShow = (row: Record<string, unknown>): Show => ({
  id: row.id as string,
  name: row.name as string,
  anlass: (row.anlass as string) || "",
  format: row.format as Show["format"],
  eventId: (row.event_id as string) || undefined,
  produktionId: (row.produktion_id as string) || undefined,
  basisPaketId: (row.basis_paket_id as string) || undefined,
  phasen: (row.phasen as ShowPhase[]) || [],
  zieldauer: (row.zieldauer as number) ?? 60,
  konzeptKundentext: (row.konzept_kundentext as string) || "",
  technischeAnforderungen: (row.technische_anforderungen as string) || "",
  status: row.status as Show["status"],
  beschreibung: (row.beschreibung as string) || undefined,
  musikPlaylist: (row.musik_playlist as Show["musikPlaylist"]) || undefined,
  texteScripts: (row.texte_scripts as Show["texteScripts"]) || undefined,
  gemaDaten: (row.gema_daten as Show["gemaDaten"]) || undefined,
  marketingAssets: (row.marketing_assets as Show["marketingAssets"]) || undefined,
  budget: (row.budget as Record<string, any>) || undefined,
  createdAt: row.created_at as string,
  updatedAt: row.updated_at as string,
});

const toLocation = (row: Record<string, unknown>): LocationVenue => ({
  id: row.id as string,
  name: row.name as string,
  typ: row.typ as LocationVenue["typ"],
  kapazitaet: (row.kapazitaet as number) ?? 0,
  buehnenBreite: (row.buehnen_breite as number) ?? undefined,
  buehnenTiefe: (row.buehnen_tiefe as number) ?? undefined,
  vorhandeneTechnik: (row.vorhandene_technik as string) || "",
  kontaktName: (row.kontakt_name as string) || undefined,
  kontaktEmail: (row.kontakt_email as string) || undefined,
  kontaktTel: (row.kontakt_tel as string) || undefined,
  notizen: (row.notizen as string) || "",
  adresse: (row.adresse as string) || "",
  buehnenHoehe: (row.buehnen_hoehe as number) ?? undefined,
  stromAnschluss: (row.strom_anschluss as string) || undefined,
  lichtVorhanden: (row.licht_vorhanden as boolean) ?? undefined,
  tonVorhanden: (row.ton_vorhanden as boolean) ?? undefined,
  anfahrtHinweise: (row.anfahrt_hinweise as string) || undefined,
  parkplaetze: (row.parkplaetze as number) ?? undefined,
  website: (row.website as string) || undefined,
  createdAt: row.created_at as string,
  updatedAt: row.updated_at as string,
});

const toTeamMember = (row: Record<string, unknown>): TeamMember => ({
  id: row.id as string,
  name: row.name as string,
  rolle: row.rolle as TeamMember["rolle"],
  kontaktEmail: (row.kontakt_email as string) || undefined,
  kontaktTel: (row.kontakt_tel as string) || undefined,
  stundensatz: (row.stundensatz as number) ?? undefined,
  tagessatz: (row.tagessatz as number) ?? undefined,
  notizen: (row.notizen as string) || "",
  createdAt: row.created_at as string,
  updatedAt: row.updated_at as string,
});

const toTourTeamAssignment = (row: Record<string, unknown>): TourTeamAssignment => ({
  id: row.id as string,
  tourTerminId: row.tour_termin_id as string,
  teamMemberId: row.team_member_id as string,
  teamMember: row.team_members
    ? toTeamMember(row.team_members as Record<string, unknown>)
    : undefined,
  rolle: (row.rolle as string) || undefined,
  honorar: (row.honorar as number) ?? undefined,
  bestaetigt: (row.bestaetigt as boolean) ?? false,
});

const toTourTermin = (row: Record<string, unknown>): TourTermin => ({
  id: row.id as string,
  tourId: row.tour_id as string,
  datum: row.datum as string,
  uhrzeitEinlass: (row.uhrzeit_einlass as string) || undefined,
  uhrzeitShow: (row.uhrzeit_show as string) || undefined,
  uhrzeitAufbau: (row.uhrzeit_aufbau as string) || undefined,
  uhrzeitSoundcheck: (row.uhrzeit_soundcheck as string) || undefined,
  uhrzeitAbbau: (row.uhrzeit_abbau as string) || undefined,
  locationId: (row.location_id as string) || undefined,
  location: row.locations_intern
    ? toLocation(row.locations_intern as Record<string, unknown>)
    : undefined,
  kapazitaet: (row.kapazitaet as number) ?? 0,
  ticketPreis: (row.ticket_preis as number) ?? 0,
  ticketsVerkauft: (row.tickets_verkauft as number) ?? 0,
  ticketLink: (row.ticket_link as string) || undefined,
  ticketAnbieter: (row.ticket_anbieter as TourTermin["ticketAnbieter"]) || undefined,
  umsatzIst: (row.umsatz_ist as number) ?? 0,
  kosten: (row.kosten as number) ?? 0,
  status: row.status as TourTermin["status"],
  notizen: (row.notizen as string) || "",
  team: row.tour_team
    ? (row.tour_team as Record<string, unknown>[]).map(toTourTeamAssignment)
    : undefined,
  createdAt: row.created_at as string,
});

const toTour = (row: Record<string, unknown>): Tour => ({
  id: row.id as string,
  name: row.name as string,
  beschreibung: (row.beschreibung as string) || "",
  showId: (row.show_id as string) || undefined,
  show: row.shows_intern
    ? toShow(row.shows_intern as Record<string, unknown>)
    : undefined,
  status: row.status as Tour["status"],
  startDatum: (row.start_datum as string) || undefined,
  endDatum: (row.end_datum as string) || undefined,
  budgetGesamt: (row.budget_gesamt as Record<string, any>) || {},
  notizen: (row.notizen as string) || "",
  termine: row.tour_termine
    ? (row.tour_termine as Record<string, unknown>[]).map(toTourTermin)
    : undefined,
  createdAt: row.created_at as string,
  updatedAt: row.updated_at as string,
});

// ── Service ──────────────────────────────────────────────────────────

export const tourService = {
  // ── Main CRUD ────────────────────────────────────────────────────

  async getAll(): Promise<Tour[]> {
    const { data, error } = await supabase
      .from("touren")
      .select("*, shows_intern(*)")
      .order("name");
    if (error) throw error;
    return (data || []).map((row) => toTour(row as unknown as Record<string, unknown>));
  },

  async getById(id: string): Promise<Tour | null> {
    const { data, error } = await supabase
      .from("touren")
      .select(
        "*, shows_intern(*), tour_termine(*, locations_intern(*), tour_team(*, team_members(*)))"
      )
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data ? toTour(data as unknown as Record<string, unknown>) : null;
  },

  async create(
    input: Omit<Tour, "id" | "createdAt" | "updatedAt" | "show" | "termine">
  ): Promise<Tour> {
    const { data, error } = await supabase
      .from("touren")
      .insert({
        name: input.name,
        beschreibung: input.beschreibung,
        show_id: input.showId ?? null,
        status: input.status,
        start_datum: input.startDatum ?? null,
        end_datum: input.endDatum ?? null,
        budget_gesamt: input.budgetGesamt,
        notizen: input.notizen,
      })
      .select("*, shows_intern(*)")
      .single();
    if (error) throw error;
    return toTour(data as unknown as Record<string, unknown>);
  },

  async update(
    id: string,
    input: Partial<Omit<Tour, "id" | "createdAt" | "updatedAt" | "show" | "termine">>
  ): Promise<Tour> {
    const patch: Record<string, unknown> = {};
    if (input.name !== undefined) patch.name = input.name;
    if (input.beschreibung !== undefined) patch.beschreibung = input.beschreibung;
    if (input.showId !== undefined) patch.show_id = input.showId ?? null;
    if (input.status !== undefined) patch.status = input.status;
    if (input.startDatum !== undefined) patch.start_datum = input.startDatum ?? null;
    if (input.endDatum !== undefined) patch.end_datum = input.endDatum ?? null;
    if (input.budgetGesamt !== undefined) patch.budget_gesamt = input.budgetGesamt;
    if (input.notizen !== undefined) patch.notizen = input.notizen;
    patch.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("touren")
      .update(patch)
      .eq("id", id)
      .select("*, shows_intern(*)")
      .single();
    if (error) throw error;
    return toTour(data as unknown as Record<string, unknown>);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("touren").delete().eq("id", id);
    if (error) throw error;
  },

  // ── Tour-Termine ─────────────────────────────────────────────────

  async addTermin(
    input: Omit<TourTermin, "id" | "createdAt" | "location" | "team">
  ): Promise<TourTermin> {
    const { data, error } = await supabase
      .from("tour_termine")
      .insert({
        tour_id: input.tourId,
        datum: input.datum,
        uhrzeit_einlass: input.uhrzeitEinlass ?? null,
        uhrzeit_show: input.uhrzeitShow ?? null,
        uhrzeit_aufbau: input.uhrzeitAufbau ?? null,
        uhrzeit_soundcheck: input.uhrzeitSoundcheck ?? null,
        uhrzeit_abbau: input.uhrzeitAbbau ?? null,
        location_id: input.locationId ?? null,
        kapazitaet: input.kapazitaet,
        ticket_preis: input.ticketPreis,
        tickets_verkauft: input.ticketsVerkauft,
        ticket_link: input.ticketLink ?? null,
        ticket_anbieter: input.ticketAnbieter ?? null,
        umsatz_ist: input.umsatzIst,
        kosten: input.kosten,
        status: input.status,
        notizen: input.notizen,
      })
      .select("*, locations_intern(*), tour_team(*, team_members(*))")
      .single();
    if (error) throw error;
    return toTourTermin(data as unknown as Record<string, unknown>);
  },

  async updateTermin(
    id: string,
    input: Partial<Omit<TourTermin, "id" | "tourId" | "createdAt" | "location" | "team">>
  ): Promise<TourTermin> {
    const patch: Record<string, unknown> = {};
    if (input.datum !== undefined) patch.datum = input.datum;
    if (input.uhrzeitEinlass !== undefined) patch.uhrzeit_einlass = input.uhrzeitEinlass ?? null;
    if (input.uhrzeitShow !== undefined) patch.uhrzeit_show = input.uhrzeitShow ?? null;
    if (input.uhrzeitAufbau !== undefined) patch.uhrzeit_aufbau = input.uhrzeitAufbau ?? null;
    if (input.uhrzeitSoundcheck !== undefined) patch.uhrzeit_soundcheck = input.uhrzeitSoundcheck ?? null;
    if (input.uhrzeitAbbau !== undefined) patch.uhrzeit_abbau = input.uhrzeitAbbau ?? null;
    if (input.locationId !== undefined) patch.location_id = input.locationId ?? null;
    if (input.kapazitaet !== undefined) patch.kapazitaet = input.kapazitaet;
    if (input.ticketPreis !== undefined) patch.ticket_preis = input.ticketPreis;
    if (input.ticketsVerkauft !== undefined) patch.tickets_verkauft = input.ticketsVerkauft;
    if (input.ticketLink !== undefined) patch.ticket_link = input.ticketLink ?? null;
    if (input.ticketAnbieter !== undefined) patch.ticket_anbieter = input.ticketAnbieter ?? null;
    if (input.umsatzIst !== undefined) patch.umsatz_ist = input.umsatzIst;
    if (input.kosten !== undefined) patch.kosten = input.kosten;
    if (input.status !== undefined) patch.status = input.status;
    if (input.notizen !== undefined) patch.notizen = input.notizen;

    const { data, error } = await supabase
      .from("tour_termine")
      .update(patch)
      .eq("id", id)
      .select("*, locations_intern(*), tour_team(*, team_members(*))")
      .single();
    if (error) throw error;
    return toTourTermin(data as unknown as Record<string, unknown>);
  },

  async deleteTermin(id: string): Promise<void> {
    const { error } = await supabase.from("tour_termine").delete().eq("id", id);
    if (error) throw error;
  },

  // ── Tour-Team ────────────────────────────────────────────────────

  async assignTeam(
    input: Omit<TourTeamAssignment, "id" | "teamMember">
  ): Promise<TourTeamAssignment> {
    const { data, error } = await supabase
      .from("tour_team")
      .insert({
        tour_termin_id: input.tourTerminId,
        team_member_id: input.teamMemberId,
        rolle: input.rolle ?? null,
        honorar: input.honorar ?? null,
        bestaetigt: input.bestaetigt,
      })
      .select("*, team_members(*)")
      .single();
    if (error) throw error;
    return toTourTeamAssignment(data as unknown as Record<string, unknown>);
  },

  async removeTeam(id: string): Promise<void> {
    const { error } = await supabase.from("tour_team").delete().eq("id", id);
    if (error) throw error;
  },

  async updateTeamAssignment(
    id: string,
    input: Partial<Omit<TourTeamAssignment, "id" | "tourTerminId" | "teamMemberId" | "teamMember">>
  ): Promise<TourTeamAssignment> {
    const patch: Record<string, unknown> = {};
    if (input.rolle !== undefined) patch.rolle = input.rolle ?? null;
    if (input.honorar !== undefined) patch.honorar = input.honorar ?? null;
    if (input.bestaetigt !== undefined) patch.bestaetigt = input.bestaetigt;

    const { data, error } = await supabase
      .from("tour_team")
      .update(patch)
      .eq("id", id)
      .select("*, team_members(*)")
      .single();
    if (error) throw error;
    return toTourTeamAssignment(data as unknown as Record<string, unknown>);
  },
};
