import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { partnerService } from "@/services/partnerService";
import type { Partner } from "@/types/productions";
import { Plus, Search, X, Users2, Mail, Phone } from "lucide-react";

const ROLLE_MAP: Record<Partner["rolle"], [string, string]> = {
  location:   ["Location",   "bg-teal-100 text-teal-700"],
  technik:    ["Technik",    "bg-blue-100 text-blue-700"],
  restaurant: ["Restaurant", "bg-green-100 text-green-700"],
  fotograf:   ["Fotograf",   "bg-amber-100 text-amber-700"],
  sonstiges:  ["Sonstiges",  "bg-gray-100 text-gray-500"],
};

const RolleBadge = ({ rolle }: { rolle: Partner["rolle"] }) => {
  const [label, cls] = ROLLE_MAP[rolle] ?? ["–", "bg-gray-100 text-gray-400"];
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cls}`}>{label}</span>;
};

const blankForm = (): Omit<Partner, "id" | "createdAt" | "updatedAt"> => ({
  name: "",
  rolle: "sonstiges",
  kontaktEmail: undefined,
  kontaktTel: undefined,
  notizen: "",
  produktionIds: [],
});

export default function AdminPartner() {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [partner, setPartner] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterRolle, setFilterRolle] = useState<Partner["rolle"] | "alle">("alle");

  const [panel, setPanel] = useState<Partner | null | "new">(null);
  const [form, setForm] = useState(blankForm());
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin/login");
      else setAuthChecked(true);
    });
  }, [navigate]);

  const load = async () => {
    setLoading(true);
    const all = await partnerService.getAll();
    setPartner(all);
    setLoading(false);
  };

  useEffect(() => { if (authChecked) load(); }, [authChecked]);

  const filtered = partner.filter((p) => {
    if (filterRolle !== "alle" && p.rolle !== filterRolle) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const openNew = () => { setForm(blankForm()); setPanel("new"); };
  const openEdit = (p: Partner) => {
    setForm({ name: p.name, rolle: p.rolle, kontaktEmail: p.kontaktEmail, kontaktTel: p.kontaktTel, notizen: p.notizen, produktionIds: p.produktionIds });
    setPanel(p);
  };

  const handleSave = async () => {
    if (!form.name) return;
    setSaving(true);
    try {
      if (panel === "new") await partnerService.create(form);
      else if (panel) await partnerService.update((panel as Partner).id, form);
      await load();
      setPanel(null);
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (panel === "new" || !panel) return;
    if (!confirm("Partner löschen?")) return;
    setDeleting(true);
    try {
      await partnerService.delete((panel as Partner).id);
      await load();
      setPanel(null);
    } finally { setDeleting(false); }
  };

  const inputCls = "w-full rounded-xl bg-background border border-border/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20";
  const labelCls = "text-xs text-muted-foreground mb-1 block";

  if (!authChecked) return null;

  return (
    <AdminLayout title="Partner" subtitle="Kooperationspartner und Dienstleister">
      <div className="flex h-full overflow-hidden relative">
        <div className="flex-1 overflow-y-auto px-6 py-6">

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold">Partner</h1>
              <p className="text-sm text-muted-foreground">{filtered.length} Partner</p>
            </div>
            <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90">
              <Plus className="w-4 h-4" />
              Neuer Partner
            </button>
          </div>

          <div className="flex gap-3 mb-5 flex-wrap">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input placeholder="Suchen…" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 rounded-xl border border-border/30 bg-background text-sm focus:outline-none" />
            </div>
            <select value={filterRolle} onChange={(e) => setFilterRolle(e.target.value as Partner["rolle"] | "alle")} className="px-3 py-2 rounded-xl border border-border/30 bg-background text-sm focus:outline-none">
              <option value="alle">Alle Rollen</option>
              {Object.entries(ROLLE_MAP).map(([v, [l]]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><div className="animate-spin rounded-full h-8 w-8 border-2 border-foreground border-t-transparent" /></div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <Users2 className="w-12 h-12 mb-3 opacity-30" />
              <p className="text-sm">Noch keine Partner angelegt</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <button key={p.id} onClick={() => openEdit(p)} className="text-left rounded-2xl border border-border/20 bg-muted/5 p-5 hover:bg-muted/20 hover:border-border/40 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                      {p.name.charAt(0).toUpperCase()}
                    </div>
                    <RolleBadge rolle={p.rolle} />
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{p.name}</h3>
                  <div className="space-y-1">
                    {p.kontaktEmail && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="w-3 h-3 shrink-0" />
                        <span className="truncate">{p.kontaktEmail}</span>
                      </div>
                    )}
                    {p.kontaktTel && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="w-3 h-3 shrink-0" />
                        <span>{p.kontaktTel}</span>
                      </div>
                    )}
                  </div>
                  {p.produktionIds.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-2">{p.produktionIds.length} Produktion(en)</p>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Panel ── */}
        {panel && (
          <>
            <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={() => setPanel(null)} />
            <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background border-l border-border/20 shadow-2xl z-40 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/20">
                <h2 className="font-semibold text-sm">{panel === "new" ? "Neuer Partner" : "Partner bearbeiten"}</h2>
                <button onClick={() => setPanel(null)} className="p-2 rounded-xl hover:bg-muted/60 text-muted-foreground"><X className="w-4 h-4" /></button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
                <div>
                  <label className={labelCls}>Name *</label>
                  <input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} className={inputCls} placeholder="z.B. Technik GmbH Heidelberg" />
                </div>
                <div>
                  <label className={labelCls}>Rolle</label>
                  <select value={form.rolle} onChange={(e) => setForm(f => ({ ...f, rolle: e.target.value as Partner["rolle"] }))} className={inputCls}>
                    {Object.entries(ROLLE_MAP).map(([v, [l]]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>E-Mail</label>
                  <input type="email" value={form.kontaktEmail ?? ""} onChange={(e) => setForm(f => ({ ...f, kontaktEmail: e.target.value || undefined }))} className={inputCls} placeholder="kontakt@partner.de" />
                </div>
                <div>
                  <label className={labelCls}>Telefon</label>
                  <input value={form.kontaktTel ?? ""} onChange={(e) => setForm(f => ({ ...f, kontaktTel: e.target.value || undefined }))} className={inputCls} placeholder="+49 …" />
                </div>
                <div>
                  <label className={labelCls}>Notizen</label>
                  <textarea value={form.notizen} onChange={(e) => setForm(f => ({ ...f, notizen: e.target.value }))} rows={4} className="w-full rounded-xl bg-background border border-border/30 px-3 py-2 text-sm focus:outline-none resize-none" placeholder="Konditionen, Besonderheiten, Erfahrungen…" />
                </div>
              </div>

              <div className="px-5 py-4 border-t border-border/20 flex gap-2">
                {panel !== "new" && (
                  <button onClick={handleDelete} disabled={deleting} className="px-4 py-2 rounded-xl border border-red-200 text-red-600 text-sm hover:bg-red-50 disabled:opacity-50">
                    {deleting ? "…" : "Löschen"}
                  </button>
                )}
                <button onClick={() => setPanel(null)} className="px-4 py-2 rounded-xl border border-border/30 text-sm hover:bg-muted/60">Abbrechen</button>
                <button onClick={handleSave} disabled={saving || !form.name} className="flex-1 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 disabled:opacity-50">
                  {saving ? "Speichere…" : "Speichern"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
