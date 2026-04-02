import { supabase } from "@/integrations/supabase/client";
import type { Partner } from "@/types/productions";

// DB row → TS interface
const toPartner = (row: Record<string, unknown>): Partner => ({
  id: row.id as string,
  name: row.name as string,
  rolle: row.rolle as Partner["rolle"],
  kontaktEmail: (row.kontakt_email as string) || undefined,
  kontaktTel: (row.kontakt_tel as string) || undefined,
  notizen: (row.notizen as string) || "",
  produktionIds: (row.produktion_ids as string[]) || [],
  createdAt: row.created_at as string,
  updatedAt: row.updated_at as string,
});

export const partnerService = {
  async getAll(): Promise<Partner[]> {
    const { data, error } = await supabase
      .from("partner_intern")
      .select("*")
      .order("name");
    if (error) throw error;
    return (data || []).map((row) => toPartner(row as unknown as Record<string, unknown>));
  },

  async getById(id: string): Promise<Partner | null> {
    const { data, error } = await supabase
      .from("partner_intern")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data ? toPartner(data as unknown as Record<string, unknown>) : null;
  },

  async getByProduktionId(produktionId: string): Promise<Partner[]> {
    const { data, error } = await supabase
      .from("partner_intern")
      .select("*")
      .contains("produktion_ids", [produktionId])
      .order("name");
    if (error) throw error;
    return (data || []).map((row) => toPartner(row as unknown as Record<string, unknown>));
  },

  async create(input: Omit<Partner, "id" | "createdAt" | "updatedAt">): Promise<Partner> {
    const { data, error } = await supabase
      .from("partner_intern")
      .insert({
        name: input.name,
        rolle: input.rolle,
        kontakt_email: input.kontaktEmail ?? null,
        kontakt_tel: input.kontaktTel ?? null,
        notizen: input.notizen,
        produktion_ids: input.produktionIds,
      })
      .select()
      .single();
    if (error) throw error;
    return toPartner(data as unknown as Record<string, unknown>);
  },

  async update(id: string, input: Partial<Omit<Partner, "id" | "createdAt" | "updatedAt">>): Promise<Partner> {
    const patch: Record<string, unknown> = {};
    if (input.name !== undefined) patch.name = input.name;
    if (input.rolle !== undefined) patch.rolle = input.rolle;
    if (input.kontaktEmail !== undefined) patch.kontakt_email = input.kontaktEmail ?? null;
    if (input.kontaktTel !== undefined) patch.kontakt_tel = input.kontaktTel ?? null;
    if (input.notizen !== undefined) patch.notizen = input.notizen;
    if (input.produktionIds !== undefined) patch.produktion_ids = input.produktionIds;
    patch.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("partner_intern")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return toPartner(data as unknown as Record<string, unknown>);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("partner_intern").delete().eq("id", id);
    if (error) throw error;
  },
};
