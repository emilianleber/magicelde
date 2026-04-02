import { supabase } from "@/integrations/supabase/client";
import type { Artikel } from "@/types/dokumente";

function toArtikel(row: Record<string, unknown>): Artikel {
  return {
    id: row.id as string,
    nummer: (row.nummer as string) || undefined,
    bezeichnung: row.bezeichnung as string,
    beschreibung: (row.beschreibung as string) || undefined,
    einheit: (row.einheit as string) || "pauschal",
    preis: (row.preis as number) || 0,
    mwstSatz: (row.mwst_satz as number) || 0,
    kategorie: (row.kategorie as string) || undefined,
    aktiv: (row.aktiv as boolean) ?? true,
    createdAt: row.created_at as string,
    updatedAt: (row.updated_at as string) || (row.created_at as string),
  };
}

export const artikelService = {
  async getAll(nurAktiv = true): Promise<Artikel[]> {
    let q = supabase.from("artikel_stamm").select("*").order("bezeichnung");
    if (nurAktiv) q = q.eq("aktiv", true);
    const { data, error } = await q;
    if (error) throw error;
    return (data || []).map(toArtikel);
  },

  async search(query: string): Promise<Artikel[]> {
    const { data, error } = await supabase
      .from("artikel_stamm")
      .select("*")
      .eq("aktiv", true)
      .ilike("bezeichnung", `%${query}%`)
      .order("bezeichnung")
      .limit(10);
    if (error) throw error;
    return (data || []).map(toArtikel);
  },

  async create(input: Omit<Artikel, "id" | "createdAt" | "updatedAt">): Promise<Artikel> {
    const { data, error } = await supabase
      .from("artikel_stamm")
      .insert({
        nummer: input.nummer || null,
        bezeichnung: input.bezeichnung,
        beschreibung: input.beschreibung || "",
        einheit: input.einheit,
        preis: input.preis,
        mwst_satz: input.mwstSatz,
        kategorie: input.kategorie || "",
        aktiv: input.aktiv,
      })
      .select()
      .single();
    if (error) throw error;
    return toArtikel(data);
  },

  async update(id: string, input: Partial<Omit<Artikel, "id" | "createdAt" | "updatedAt">>): Promise<Artikel> {
    const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (input.nummer !== undefined) patch.nummer = input.nummer;
    if (input.bezeichnung !== undefined) patch.bezeichnung = input.bezeichnung;
    if (input.beschreibung !== undefined) patch.beschreibung = input.beschreibung;
    if (input.einheit !== undefined) patch.einheit = input.einheit;
    if (input.preis !== undefined) patch.preis = input.preis;
    if (input.mwstSatz !== undefined) patch.mwst_satz = input.mwstSatz;
    if (input.kategorie !== undefined) patch.kategorie = input.kategorie;
    if (input.aktiv !== undefined) patch.aktiv = input.aktiv;

    const { data, error } = await supabase
      .from("artikel_stamm")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return toArtikel(data);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("artikel_stamm").delete().eq("id", id);
    if (error) throw error;
  },
};
