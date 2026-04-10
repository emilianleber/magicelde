import { supabase } from "@/integrations/supabase/client";
import type { Show, ShowPhase, ShowTeamAssignment, TeamMember } from "@/types/productions";

// DB row → TS interface
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
  showTyp: (row.show_typ as Show["showTyp"]) || "individuell",
  preis: (row.preis as number) ?? undefined,
  beschreibungKunde: (row.beschreibung_kunde as string) || undefined,
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

const toShowTeamAssignment = (row: Record<string, unknown>): ShowTeamAssignment => ({
  id: row.id as string,
  showId: row.show_id as string,
  teamMemberId: row.team_member_id as string,
  teamMember: row.team_members
    ? toTeamMember(row.team_members as Record<string, unknown>)
    : undefined,
  rolle: (row.rolle as string) || undefined,
});

export const showService = {
  async getAll(): Promise<Show[]> {
    const { data, error } = await supabase
      .from("shows_intern")
      .select("*")
      .order("name");
    if (error) throw error;
    return (data || []).map((row) => toShow(row as unknown as Record<string, unknown>));
  },

  async getById(id: string): Promise<Show | null> {
    const { data, error } = await supabase
      .from("shows_intern")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data ? toShow(data as unknown as Record<string, unknown>) : null;
  },

  async getByProduktionId(produktionId: string): Promise<Show[]> {
    const { data, error } = await supabase
      .from("shows_intern")
      .select("*")
      .eq("produktion_id", produktionId)
      .order("name");
    if (error) throw error;
    return (data || []).map((row) => toShow(row as unknown as Record<string, unknown>));
  },

  async create(input: Omit<Show, "id" | "createdAt" | "updatedAt">): Promise<Show> {
    const { data, error } = await supabase
      .from("shows_intern")
      .insert({
        name: input.name,
        anlass: input.anlass,
        format: input.format,
        event_id: input.eventId || null,
        produktion_id: input.produktionId || null,
        basis_paket_id: input.basisPaketId || null,
        phasen: input.phasen,
        zieldauer: input.zieldauer,
        konzept_kundentext: input.konzeptKundentext,
        technische_anforderungen: input.technischeAnforderungen,
        show_typ: input.showTyp || "individuell",
        preis: input.preis ?? null,
        beschreibung_kunde: input.beschreibungKunde ?? null,
        status: input.status,
        beschreibung: input.beschreibung ?? null,
        musik_playlist: input.musikPlaylist ?? null,
        texte_scripts: input.texteScripts ?? null,
        gema_daten: input.gemaDaten ?? null,
        marketing_assets: input.marketingAssets ?? null,
        budget: input.budget ?? null,
      })
      .select()
      .single();
    if (error) throw error;
    return toShow(data as unknown as Record<string, unknown>);
  },

  async update(id: string, input: Partial<Omit<Show, "id" | "createdAt" | "updatedAt">>): Promise<Show> {
    const patch: Record<string, unknown> = {};
    if (input.name !== undefined) patch.name = input.name;
    if (input.anlass !== undefined) patch.anlass = input.anlass;
    if (input.format !== undefined) patch.format = input.format;
    if (input.eventId !== undefined) patch.event_id = input.eventId || null;
    if (input.produktionId !== undefined) patch.produktion_id = input.produktionId || null;
    if (input.basisPaketId !== undefined) patch.basis_paket_id = input.basisPaketId || null;
    if (input.phasen !== undefined) patch.phasen = input.phasen;
    if (input.zieldauer !== undefined) patch.zieldauer = input.zieldauer;
    if (input.konzeptKundentext !== undefined) patch.konzept_kundentext = input.konzeptKundentext;
    if (input.technischeAnforderungen !== undefined) patch.technische_anforderungen = input.technischeAnforderungen;
    if (input.showTyp !== undefined) patch.show_typ = input.showTyp;
    if (input.preis !== undefined) patch.preis = input.preis ?? null;
    if (input.beschreibungKunde !== undefined) patch.beschreibung_kunde = input.beschreibungKunde ?? null;
    if (input.status !== undefined) patch.status = input.status;
    if (input.beschreibung !== undefined) patch.beschreibung = input.beschreibung ?? null;
    if (input.musikPlaylist !== undefined) patch.musik_playlist = input.musikPlaylist ?? null;
    if (input.texteScripts !== undefined) patch.texte_scripts = input.texteScripts ?? null;
    if (input.gemaDaten !== undefined) patch.gema_daten = input.gemaDaten ?? null;
    if (input.marketingAssets !== undefined) patch.marketing_assets = input.marketingAssets ?? null;
    if (input.budget !== undefined) patch.budget = input.budget ?? null;
    patch.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("shows_intern")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return toShow(data as unknown as Record<string, unknown>);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("shows_intern").delete().eq("id", id);
    if (error) throw error;
  },

  // ── Show Team ──────────────────────────────────────────────────────

  async getShowTeam(showId: string): Promise<ShowTeamAssignment[]> {
    const { data, error } = await supabase
      .from("show_team")
      .select("*, team_members(*)")
      .eq("show_id", showId);
    if (error) throw error;
    return (data || []).map((row) => toShowTeamAssignment(row as unknown as Record<string, unknown>));
  },

  async assignTeamMember(
    input: Omit<ShowTeamAssignment, "id" | "teamMember">
  ): Promise<ShowTeamAssignment> {
    const { data, error } = await supabase
      .from("show_team")
      .insert({
        show_id: input.showId,
        team_member_id: input.teamMemberId,
        rolle: input.rolle ?? null,
      })
      .select("*, team_members(*)")
      .single();
    if (error) throw error;
    return toShowTeamAssignment(data as unknown as Record<string, unknown>);
  },

  async removeTeamMember(id: string): Promise<void> {
    const { error } = await supabase.from("show_team").delete().eq("id", id);
    if (error) throw error;
  },
};
