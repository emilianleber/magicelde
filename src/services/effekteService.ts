import { supabase } from "@/integrations/supabase/client";
import type { Effekt } from "@/types/productions";

// DB row → TS interface
const toEffekt = (row: Record<string, unknown>): Effekt => ({
  id: row.id as string,
  name: row.name as string,
  typ: row.typ as Effekt["typ"],
  dauer: row.dauer as number,
  resetZeit: row.reset_zeit as number,
  schwierigkeit: row.schwierigkeit as Effekt["schwierigkeit"],
  anlaesse: (row.anlaesse as Effekt["anlaesse"]) || [],
  status: row.status as Effekt["status"],
  props: (row.props as string[]) || [],
  interneNotizen: (row.interne_notizen as string) || "",
  wiederholbar: row.wiederholbar as boolean,
  // NEW fields
  kategorie: (row.kategorie as string) || undefined,
  wowRating: (row.wow_rating as number) ?? undefined,
  setupZeit: (row.setup_zeit as number) ?? undefined,
  videoUrl: (row.video_url as string) || undefined,
  fotoUrls: (row.foto_urls as string[]) || undefined,
  beschreibung: (row.beschreibung as string) || undefined,
  createdAt: row.created_at as string,
  updatedAt: row.updated_at as string,
});

export const effekteService = {
  async getAll(): Promise<Effekt[]> {
    const { data, error } = await supabase
      .from("effekte")
      .select("*")
      .order("name");
    if (error) throw error;
    return (data || []).map((row) => toEffekt(row as unknown as Record<string, unknown>));
  },

  async getById(id: string): Promise<Effekt | null> {
    const { data, error } = await supabase
      .from("effekte")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data ? toEffekt(data as unknown as Record<string, unknown>) : null;
  },

  async create(input: Omit<Effekt, "id" | "createdAt" | "updatedAt">): Promise<Effekt> {
    const { data, error } = await supabase
      .from("effekte")
      .insert({
        name: input.name,
        typ: input.typ,
        dauer: input.dauer,
        reset_zeit: input.resetZeit,
        schwierigkeit: input.schwierigkeit,
        anlaesse: input.anlaesse,
        status: input.status,
        props: input.props,
        interne_notizen: input.interneNotizen,
        wiederholbar: input.wiederholbar,
        kategorie: input.kategorie ?? null,
        wow_rating: input.wowRating ?? null,
        setup_zeit: input.setupZeit ?? null,
        video_url: input.videoUrl ?? null,
        foto_urls: input.fotoUrls ?? null,
        beschreibung: input.beschreibung ?? null,
      })
      .select()
      .single();
    if (error) throw error;
    return toEffekt(data as unknown as Record<string, unknown>);
  },

  async update(id: string, input: Partial<Omit<Effekt, "id" | "createdAt" | "updatedAt">>): Promise<Effekt> {
    const patch: Record<string, unknown> = {};
    if (input.name !== undefined) patch.name = input.name;
    if (input.typ !== undefined) patch.typ = input.typ;
    if (input.dauer !== undefined) patch.dauer = input.dauer;
    if (input.resetZeit !== undefined) patch.reset_zeit = input.resetZeit;
    if (input.schwierigkeit !== undefined) patch.schwierigkeit = input.schwierigkeit;
    if (input.anlaesse !== undefined) patch.anlaesse = input.anlaesse;
    if (input.status !== undefined) patch.status = input.status;
    if (input.props !== undefined) patch.props = input.props;
    if (input.interneNotizen !== undefined) patch.interne_notizen = input.interneNotizen;
    if (input.wiederholbar !== undefined) patch.wiederholbar = input.wiederholbar;
    if (input.kategorie !== undefined) patch.kategorie = input.kategorie ?? null;
    if (input.wowRating !== undefined) patch.wow_rating = input.wowRating ?? null;
    if (input.setupZeit !== undefined) patch.setup_zeit = input.setupZeit ?? null;
    if (input.videoUrl !== undefined) patch.video_url = input.videoUrl ?? null;
    if (input.fotoUrls !== undefined) patch.foto_urls = input.fotoUrls ?? null;
    if (input.beschreibung !== undefined) patch.beschreibung = input.beschreibung ?? null;
    patch.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("effekte")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return toEffekt(data as unknown as Record<string, unknown>);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("effekte").delete().eq("id", id);
    if (error) throw error;
  },
};
