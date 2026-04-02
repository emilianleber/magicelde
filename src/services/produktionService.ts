import { supabase } from "@/integrations/supabase/client";
import type { Produktion, Termin, Ausgabe, MarketingKanal } from "@/types/productions";

// DB row → TS interface
const toProduktion = (row: Record<string, unknown>): Produktion => ({
  id: row.id as string,
  format: row.format as Produktion["format"],
  titel: row.titel as string,
  untertitel: (row.untertitel as string) || undefined,
  status: row.status as Produktion["status"],
  showId: (row.show_id as string) || undefined,
  locationId: (row.location_id as string) || undefined,
  kalkulation: {
    ticketpreis: (row.kalkulation_ticketpreis as number) ?? 0,
    kapazitaet: (row.kalkulation_kapazitaet as number) ?? 0,
  },
  marketingKanaele: (row.marketing_kanaele as MarketingKanal[]) || [],
  notizen: (row.notizen as string) || "",
  ideenSammlung: (row.ideen_sammlung as string[]) || [],
  pressetext: (row.pressetext as string) || "",
  kurzbeschreibung: (row.kurzbeschreibung as string) || "",
  createdAt: row.created_at as string,
  updatedAt: row.updated_at as string,
});

const toTermin = (row: Record<string, unknown>): Termin => ({
  id: row.id as string,
  produktionId: row.produktion_id as string,
  datum: row.datum as string,
  uhrzeit: (row.uhrzeit as string) || "",
  locationId: (row.location_id as string) || undefined,
  ticketLink: (row.ticket_link as string) || undefined,
  status: row.status as Termin["status"],
  auslastungIst: (row.auslastung_ist as number) ?? undefined,
});

const toAusgabe = (row: Record<string, unknown>): Ausgabe => ({
  id: row.id as string,
  produktionId: row.produktion_id as string,
  kategorie: row.kategorie as string,
  betrag: (row.betrag as number) ?? 0,
  notiz: (row.notiz as string) || undefined,
});

export const produktionService = {
  // ── Main CRUD ───────────────────────────────────────────────────────

  async getAll(): Promise<Produktion[]> {
    const { data, error } = await supabase
      .from("produktionen")
      .select("*")
      .order("titel");
    if (error) throw error;
    return (data || []).map((row) => toProduktion(row as unknown as Record<string, unknown>));
  },

  async getById(id: string): Promise<Produktion | null> {
    const { data, error } = await supabase
      .from("produktionen")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data ? toProduktion(data as unknown as Record<string, unknown>) : null;
  },

  async create(input: Omit<Produktion, "id" | "createdAt" | "updatedAt">): Promise<Produktion> {
    const { data, error } = await supabase
      .from("produktionen")
      .insert({
        format: input.format,
        titel: input.titel,
        untertitel: input.untertitel ?? null,
        status: input.status,
        show_id: input.showId ?? null,
        location_id: input.locationId ?? null,
        kalkulation_ticketpreis: input.kalkulation.ticketpreis,
        kalkulation_kapazitaet: input.kalkulation.kapazitaet,
        marketing_kanaele: input.marketingKanaele,
        notizen: input.notizen,
        ideen_sammlung: input.ideenSammlung,
        pressetext: input.pressetext,
        kurzbeschreibung: input.kurzbeschreibung,
      })
      .select()
      .single();
    if (error) throw error;
    return toProduktion(data as unknown as Record<string, unknown>);
  },

  async update(id: string, input: Partial<Omit<Produktion, "id" | "createdAt" | "updatedAt">>): Promise<Produktion> {
    const patch: Record<string, unknown> = {};
    if (input.format !== undefined) patch.format = input.format;
    if (input.titel !== undefined) patch.titel = input.titel;
    if (input.untertitel !== undefined) patch.untertitel = input.untertitel ?? null;
    if (input.status !== undefined) patch.status = input.status;
    if (input.showId !== undefined) patch.show_id = input.showId ?? null;
    if (input.locationId !== undefined) patch.location_id = input.locationId ?? null;
    if (input.kalkulation !== undefined) {
      patch.kalkulation_ticketpreis = input.kalkulation.ticketpreis;
      patch.kalkulation_kapazitaet = input.kalkulation.kapazitaet;
    }
    if (input.marketingKanaele !== undefined) patch.marketing_kanaele = input.marketingKanaele;
    if (input.notizen !== undefined) patch.notizen = input.notizen;
    if (input.ideenSammlung !== undefined) patch.ideen_sammlung = input.ideenSammlung;
    if (input.pressetext !== undefined) patch.pressetext = input.pressetext;
    if (input.kurzbeschreibung !== undefined) patch.kurzbeschreibung = input.kurzbeschreibung;
    patch.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("produktionen")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return toProduktion(data as unknown as Record<string, unknown>);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("produktionen").delete().eq("id", id);
    if (error) throw error;
  },

  // ── Termine ─────────────────────────────────────────────────────────

  async getTermine(produktionId: string): Promise<Termin[]> {
    const { data, error } = await supabase
      .from("produktions_termine")
      .select("*")
      .eq("produktion_id", produktionId)
      .order("datum");
    if (error) throw error;
    return (data || []).map((row) => toTermin(row as unknown as Record<string, unknown>));
  },

  async addTermin(input: Omit<Termin, "id">): Promise<Termin> {
    const { data, error } = await supabase
      .from("produktions_termine")
      .insert({
        produktion_id: input.produktionId,
        datum: input.datum,
        uhrzeit: input.uhrzeit || null,
        location_id: input.locationId ?? null,
        ticket_link: input.ticketLink ?? null,
        status: input.status,
        auslastung_ist: input.auslastungIst ?? null,
      })
      .select()
      .single();
    if (error) throw error;
    return toTermin(data as unknown as Record<string, unknown>);
  },

  async updateTermin(id: string, input: Partial<Omit<Termin, "id" | "produktionId">>): Promise<Termin> {
    const patch: Record<string, unknown> = {};
    if (input.datum !== undefined) patch.datum = input.datum;
    if (input.uhrzeit !== undefined) patch.uhrzeit = input.uhrzeit || null;
    if (input.locationId !== undefined) patch.location_id = input.locationId ?? null;
    if (input.ticketLink !== undefined) patch.ticket_link = input.ticketLink ?? null;
    if (input.status !== undefined) patch.status = input.status;
    if (input.auslastungIst !== undefined) patch.auslastung_ist = input.auslastungIst ?? null;

    const { data, error } = await supabase
      .from("produktions_termine")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return toTermin(data as unknown as Record<string, unknown>);
  },

  async deleteTermin(id: string): Promise<void> {
    const { error } = await supabase.from("produktions_termine").delete().eq("id", id);
    if (error) throw error;
  },

  // ── Ausgaben ─────────────────────────────────────────────────────────

  async getAusgaben(produktionId: string): Promise<Ausgabe[]> {
    const { data, error } = await supabase
      .from("produktions_ausgaben")
      .select("*")
      .eq("produktion_id", produktionId)
      .order("kategorie");
    if (error) throw error;
    return (data || []).map((row) => toAusgabe(row as unknown as Record<string, unknown>));
  },

  async addAusgabe(input: Omit<Ausgabe, "id">): Promise<Ausgabe> {
    const { data, error } = await supabase
      .from("produktions_ausgaben")
      .insert({
        produktion_id: input.produktionId,
        kategorie: input.kategorie,
        betrag: input.betrag,
        notiz: input.notiz ?? null,
      })
      .select()
      .single();
    if (error) throw error;
    return toAusgabe(data as unknown as Record<string, unknown>);
  },

  async updateAusgabe(id: string, input: Partial<Omit<Ausgabe, "id" | "produktionId">>): Promise<Ausgabe> {
    const patch: Record<string, unknown> = {};
    if (input.kategorie !== undefined) patch.kategorie = input.kategorie;
    if (input.betrag !== undefined) patch.betrag = input.betrag;
    if (input.notiz !== undefined) patch.notiz = input.notiz ?? null;

    const { data, error } = await supabase
      .from("produktions_ausgaben")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return toAusgabe(data as unknown as Record<string, unknown>);
  },

  async deleteAusgabe(id: string): Promise<void> {
    const { error } = await supabase.from("produktions_ausgaben").delete().eq("id", id);
    if (error) throw error;
  },
};
