import { supabase } from "@/integrations/supabase/client";
import type { Paket } from "@/types/productions";

// DB row → TS interface
const toPaket = (row: Record<string, unknown>): Paket => ({
  id: row.id as string,
  name: row.name as string,
  beschreibungIntern: (row.beschreibung_intern as string) || "",
  beschreibungKunde: (row.beschreibung_kunde as string) || "",
  effektIds: (row.effekt_ids as string[]) || [],
  zieldauer: (row.zieldauer as number) ?? 60,
  preis: (row.preis as number) ?? 0,
  anlaesse: (row.anlaesse as string[]) || [],
  createdAt: row.created_at as string,
  updatedAt: row.updated_at as string,
});

export const paketeService = {
  async getAll(): Promise<Paket[]> {
    const { data, error } = await supabase
      .from("pakete")
      .select("*")
      .order("name");
    if (error) throw error;
    return (data || []).map((row) => toPaket(row as unknown as Record<string, unknown>));
  },

  async getById(id: string): Promise<Paket | null> {
    const { data, error } = await supabase
      .from("pakete")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data ? toPaket(data as unknown as Record<string, unknown>) : null;
  },

  async create(input: Omit<Paket, "id" | "createdAt" | "updatedAt">): Promise<Paket> {
    const { data, error } = await supabase
      .from("pakete")
      .insert({
        name: input.name,
        beschreibung_intern: input.beschreibungIntern,
        beschreibung_kunde: input.beschreibungKunde,
        effekt_ids: input.effektIds,
        zieldauer: input.zieldauer,
        preis: input.preis,
        anlaesse: input.anlaesse,
      })
      .select()
      .single();
    if (error) throw error;
    return toPaket(data as unknown as Record<string, unknown>);
  },

  async update(id: string, input: Partial<Omit<Paket, "id" | "createdAt" | "updatedAt">>): Promise<Paket> {
    const patch: Record<string, unknown> = {};
    if (input.name !== undefined) patch.name = input.name;
    if (input.beschreibungIntern !== undefined) patch.beschreibung_intern = input.beschreibungIntern;
    if (input.beschreibungKunde !== undefined) patch.beschreibung_kunde = input.beschreibungKunde;
    if (input.effektIds !== undefined) patch.effekt_ids = input.effektIds;
    if (input.zieldauer !== undefined) patch.zieldauer = input.zieldauer;
    if (input.preis !== undefined) patch.preis = input.preis;
    if (input.anlaesse !== undefined) patch.anlaesse = input.anlaesse;
    patch.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("pakete")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return toPaket(data as unknown as Record<string, unknown>);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("pakete").delete().eq("id", id);
    if (error) throw error;
  },
};
