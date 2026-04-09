import { supabase } from "@/integrations/supabase/client";
import type { LocationVenue } from "@/types/productions";

// DB row → TS interface
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
  // NEW fields
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

export const locationService = {
  async getAll(): Promise<LocationVenue[]> {
    const { data, error } = await supabase
      .from("locations_intern")
      .select("*")
      .order("name");
    if (error) throw error;
    return (data || []).map((row) => toLocation(row as unknown as Record<string, unknown>));
  },

  async getById(id: string): Promise<LocationVenue | null> {
    const { data, error } = await supabase
      .from("locations_intern")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data ? toLocation(data as unknown as Record<string, unknown>) : null;
  },

  async create(input: Omit<LocationVenue, "id" | "createdAt" | "updatedAt">): Promise<LocationVenue> {
    const { data, error } = await supabase
      .from("locations_intern")
      .insert({
        name: input.name,
        typ: input.typ,
        kapazitaet: input.kapazitaet,
        buehnen_breite: input.buehnenBreite ?? null,
        buehnen_tiefe: input.buehnenTiefe ?? null,
        vorhandene_technik: input.vorhandeneTechnik,
        kontakt_name: input.kontaktName ?? null,
        kontakt_email: input.kontaktEmail ?? null,
        kontakt_tel: input.kontaktTel ?? null,
        notizen: input.notizen,
        adresse: input.adresse,
        buehnen_hoehe: input.buehnenHoehe ?? null,
        strom_anschluss: input.stromAnschluss ?? null,
        licht_vorhanden: input.lichtVorhanden ?? null,
        ton_vorhanden: input.tonVorhanden ?? null,
        anfahrt_hinweise: input.anfahrtHinweise ?? null,
        parkplaetze: input.parkplaetze ?? null,
        website: input.website ?? null,
      })
      .select()
      .single();
    if (error) throw error;
    return toLocation(data as unknown as Record<string, unknown>);
  },

  async update(id: string, input: Partial<Omit<LocationVenue, "id" | "createdAt" | "updatedAt">>): Promise<LocationVenue> {
    const patch: Record<string, unknown> = {};
    if (input.name !== undefined) patch.name = input.name;
    if (input.typ !== undefined) patch.typ = input.typ;
    if (input.kapazitaet !== undefined) patch.kapazitaet = input.kapazitaet;
    if (input.buehnenBreite !== undefined) patch.buehnen_breite = input.buehnenBreite ?? null;
    if (input.buehnenTiefe !== undefined) patch.buehnen_tiefe = input.buehnenTiefe ?? null;
    if (input.vorhandeneTechnik !== undefined) patch.vorhandene_technik = input.vorhandeneTechnik;
    if (input.kontaktName !== undefined) patch.kontakt_name = input.kontaktName ?? null;
    if (input.kontaktEmail !== undefined) patch.kontakt_email = input.kontaktEmail ?? null;
    if (input.kontaktTel !== undefined) patch.kontakt_tel = input.kontaktTel ?? null;
    if (input.notizen !== undefined) patch.notizen = input.notizen;
    if (input.adresse !== undefined) patch.adresse = input.adresse;
    if (input.buehnenHoehe !== undefined) patch.buehnen_hoehe = input.buehnenHoehe ?? null;
    if (input.stromAnschluss !== undefined) patch.strom_anschluss = input.stromAnschluss ?? null;
    if (input.lichtVorhanden !== undefined) patch.licht_vorhanden = input.lichtVorhanden ?? null;
    if (input.tonVorhanden !== undefined) patch.ton_vorhanden = input.tonVorhanden ?? null;
    if (input.anfahrtHinweise !== undefined) patch.anfahrt_hinweise = input.anfahrtHinweise ?? null;
    if (input.parkplaetze !== undefined) patch.parkplaetze = input.parkplaetze ?? null;
    if (input.website !== undefined) patch.website = input.website ?? null;
    patch.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("locations_intern")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return toLocation(data as unknown as Record<string, unknown>);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("locations_intern").delete().eq("id", id);
    if (error) throw error;
  },
};
