import { supabase } from "@/integrations/supabase/client";
import type { TeamMember } from "@/types/productions";

// DB row → TS interface
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

export const teamService = {
  async getAll(): Promise<TeamMember[]> {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("name");
    if (error) throw error;
    return (data || []).map((row) => toTeamMember(row as unknown as Record<string, unknown>));
  },

  async getById(id: string): Promise<TeamMember | null> {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data ? toTeamMember(data as unknown as Record<string, unknown>) : null;
  },

  async create(input: Omit<TeamMember, "id" | "createdAt" | "updatedAt">): Promise<TeamMember> {
    const { data, error } = await supabase
      .from("team_members")
      .insert({
        name: input.name,
        rolle: input.rolle,
        kontakt_email: input.kontaktEmail ?? null,
        kontakt_tel: input.kontaktTel ?? null,
        stundensatz: input.stundensatz ?? null,
        tagessatz: input.tagessatz ?? null,
        notizen: input.notizen,
      })
      .select()
      .single();
    if (error) throw error;
    return toTeamMember(data as unknown as Record<string, unknown>);
  },

  async update(id: string, input: Partial<Omit<TeamMember, "id" | "createdAt" | "updatedAt">>): Promise<TeamMember> {
    const patch: Record<string, unknown> = {};
    if (input.name !== undefined) patch.name = input.name;
    if (input.rolle !== undefined) patch.rolle = input.rolle;
    if (input.kontaktEmail !== undefined) patch.kontakt_email = input.kontaktEmail ?? null;
    if (input.kontaktTel !== undefined) patch.kontakt_tel = input.kontaktTel ?? null;
    if (input.stundensatz !== undefined) patch.stundensatz = input.stundensatz ?? null;
    if (input.tagessatz !== undefined) patch.tagessatz = input.tagessatz ?? null;
    if (input.notizen !== undefined) patch.notizen = input.notizen;
    patch.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("team_members")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return toTeamMember(data as unknown as Record<string, unknown>);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("team_members").delete().eq("id", id);
    if (error) throw error;
  },
};
