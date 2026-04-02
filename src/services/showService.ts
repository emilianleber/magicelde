import { supabase } from "@/integrations/supabase/client";
import type { Show, ShowPhase } from "@/types/productions";

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
  status: row.status as Show["status"],
  createdAt: row.created_at as string,
  updatedAt: row.updated_at as string,
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
        status: input.status,
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
    if (input.status !== undefined) patch.status = input.status;
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
};
