import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Plus, Save, Trash2, Pencil, X, Check } from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";

interface MailTemplate {
  id: string;
  name: string;
  subject: string | null;
  body: string;
  created_at: string;
}

const inputCls =
  "w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

const AdminSettings = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<"vorlagen" | "signatur">("vorlagen");

  // Templates
  const [templates, setTemplates] = useState<MailTemplate[]>([]);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [draftName, setDraftName] = useState("");
  const [draftSubject, setDraftSubject] = useState("");
  const [draftBody, setDraftBody] = useState("");
  const [savingTemplate, setSavingTemplate] = useState(false);
  const [templateMsg, setTemplateMsg] = useState("");

  // Signature
  const [signatureId, setSignatureId] = useState<string | null>(null);
  const [signatureBody, setSignatureBody] = useState("");
  const [savingSignature, setSavingSignature] = useState(false);
  const [signatureMsg, setSignatureMsg] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) { navigate("/kundenportal/login"); return; }
      setUser(session.user);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { navigate("/kundenportal/login"); return; }
      setUser(session.user);
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user?.email) return;

    const loadData = async () => {
      setLoading(true);

      const { data: admin } = await supabase
        .from("portal_admins").select("*").eq("email", user.email!).maybeSingle();

      if (!admin) { setIsAdmin(false); setLoading(false); return; }
      setIsAdmin(true);

      const [templatesResult, signatureResult] = await Promise.all([
        supabase.from("portal_mail_templates").select("*").order("created_at", { ascending: false }),
        supabase.from("portal_signature").select("*").limit(1).maybeSingle(),
      ]);

      if (!templatesResult.error) setTemplates(templatesResult.data || []);
      if (!signatureResult.error && signatureResult.data) {
        setSignatureId(signatureResult.data.id);
        setSignatureBody(signatureResult.data.body);
      }

      setLoading(false);
    };

    loadData();
  }, [user]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/kundenportal/login");
  };

  const startNew = () => {
    setEditingId("new");
    setDraftName("");
    setDraftSubject("");
    setDraftBody("");
    setTemplateMsg("");
  };

  const startEdit = (t: MailTemplate) => {
    setEditingId(t.id);
    setDraftName(t.name);
    setDraftSubject(t.subject || "");
    setDraftBody(t.body);
    setTemplateMsg("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTemplateMsg("");
  };

  const saveTemplate = async () => {
    if (!draftName.trim() || !draftBody.trim()) {
      setTemplateMsg("Name und Inhalt sind Pflichtfelder.");
      return;
    }
    setSavingTemplate(true);
    setTemplateMsg("");

    if (editingId === "new") {
      const { data, error } = await supabase
        .from("portal_mail_templates")
        .insert({ name: draftName.trim(), subject: draftSubject.trim() || null, body: draftBody })
        .select("*").single();

      if (error) { setTemplateMsg("Fehler beim Speichern."); setSavingTemplate(false); return; }
      setTemplates((prev) => [data, ...prev]);
    } else {
      const { data, error } = await supabase
        .from("portal_mail_templates")
        .update({ name: draftName.trim(), subject: draftSubject.trim() || null, body: draftBody })
        .eq("id", editingId!)
        .select("*").single();

      if (error) { setTemplateMsg("Fehler beim Speichern."); setSavingTemplate(false); return; }
      setTemplates((prev) => prev.map((t) => (t.id === editingId ? data : t)));
    }

    setEditingId(null);
    setSavingTemplate(false);
  };

  const deleteTemplate = async (id: string) => {
    const { error } = await supabase.from("portal_mail_templates").delete().eq("id", id);
    if (!error) setTemplates((prev) => prev.filter((t) => t.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const saveSignature = async () => {
    if (!signatureBody.trim()) {
      setSignatureMsg("Signatur darf nicht leer sein.");
      return;
    }
    setSavingSignature(true);
    setSignatureMsg("");

    if (signatureId) {
      const { error } = await supabase
        .from("portal_signature")
        .update({ body: signatureBody, updated_at: new Date().toISOString() })
        .eq("id", signatureId);

      if (error) { setSignatureMsg("Fehler beim Speichern."); setSavingSignature(false); return; }
    } else {
      const { data, error } = await supabase
        .from("portal_signature")
        .insert({ body: signatureBody })
        .select("*").single();

      if (error) { setSignatureMsg("Fehler beim Speichern."); setSavingSignature(false); return; }
      setSignatureId(data.id);
    }

    setSignatureMsg("Signatur gespeichert.");
    setSavingSignature(false);
  };

  if (loading) return <div className="pt-28 text-center">Wird geladen…</div>;
  if (isAdmin === false) return <div className="pt-28 text-center">Kein Zugriff</div>;

  return (
    <AdminLayout
      title="Einstellungen"
      subtitle="Mail-Vorlagen und Signatur verwalten"
      actions={
        <button onClick={logout} className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
          <LogOut className="w-4 h-4" /> Abmelden
        </button>
      }
    >
      {/* Tabs */}
      <div className="flex gap-1 bg-muted/40 rounded-2xl p-1 mb-8 w-fit">
        {[
          { id: "vorlagen", label: "Mail-Vorlagen" },
          { id: "signatur", label: "Signatur" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "vorlagen" | "signatur")}
            className={`font-sans text-sm px-5 py-2.5 rounded-xl transition-all ${
              activeTab === tab.id
                ? "bg-background shadow-sm text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Vorlagen ── */}
      {activeTab === "vorlagen" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <p className="font-sans text-sm text-muted-foreground">
              {templates.length} Vorlage{templates.length !== 1 ? "n" : ""}
            </p>
            {editingId !== "new" && (
              <button onClick={startNew} className="btn-primary inline-flex items-center gap-2">
                <Plus className="w-4 h-4" /> Neue Vorlage
              </button>
            )}
          </div>

          {/* Neue Vorlage Form */}
          {editingId === "new" && (
            <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20 space-y-4">
              <h3 className="font-display text-base font-bold text-foreground">Neue Vorlage</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Name der Vorlage *</label>
                  <input value={draftName} onChange={(e) => setDraftName(e.target.value)} placeholder="z.B. Angebot Firmenfeier" className={inputCls} />
                </div>
                <div>
                  <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Betreff (optional)</label>
                  <input value={draftSubject} onChange={(e) => setDraftSubject(e.target.value)} placeholder="Betreff wird vorausgefüllt" className={inputCls} />
                </div>
              </div>
              <div>
                <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Inhalt *</label>
                <RichTextEditor value={draftBody} onChange={setDraftBody} placeholder="Vorlage schreiben…" minHeight="220px" />
              </div>
              {templateMsg && <p className="font-sans text-xs text-red-500">{templateMsg}</p>}
              <div className="flex gap-2">
                <button onClick={saveTemplate} disabled={savingTemplate} className="btn-primary disabled:opacity-60">
                  <Save className="w-4 h-4 mr-2" />
                  {savingTemplate ? "Speichert…" : "Vorlage speichern"}
                </button>
                <button onClick={cancelEdit} className="inline-flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground border border-border/40 rounded-xl px-4 py-2.5 transition-colors">
                  <X className="w-4 h-4" /> Abbrechen
                </button>
              </div>
            </div>
          )}

          {/* Vorlagen-Liste */}
          {templates.length === 0 && editingId !== "new" ? (
            <div className="p-10 rounded-3xl bg-muted/20 border border-border/30 text-center">
              <p className="font-sans text-sm text-muted-foreground">Noch keine Vorlagen erstellt.</p>
            </div>
          ) : (
            templates.map((t) => (
              <div key={t.id} className="rounded-2xl bg-muted/20 border border-border/30 overflow-hidden">
                {editingId === t.id ? (
                  <div className="p-6 space-y-4">
                    <h3 className="font-display text-base font-bold text-foreground">Vorlage bearbeiten</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Name *</label>
                        <input value={draftName} onChange={(e) => setDraftName(e.target.value)} className={inputCls} />
                      </div>
                      <div>
                        <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Betreff</label>
                        <input value={draftSubject} onChange={(e) => setDraftSubject(e.target.value)} className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Inhalt *</label>
                      <RichTextEditor value={draftBody} onChange={setDraftBody} minHeight="220px" />
                    </div>
                    {templateMsg && <p className="font-sans text-xs text-red-500">{templateMsg}</p>}
                    <div className="flex gap-2">
                      <button onClick={saveTemplate} disabled={savingTemplate} className="btn-primary disabled:opacity-60">
                        <Check className="w-4 h-4 mr-2" />
                        {savingTemplate ? "Speichert…" : "Speichern"}
                      </button>
                      <button onClick={cancelEdit} className="inline-flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground border border-border/40 rounded-xl px-4 py-2.5 transition-colors">
                        <X className="w-4 h-4" /> Abbrechen
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-4 p-4">
                    <div className="min-w-0">
                      <p className="font-sans text-sm font-semibold text-foreground truncate">{t.name}</p>
                      {t.subject && (
                        <p className="font-sans text-xs text-muted-foreground mt-0.5 truncate">Betreff: {t.subject}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => startEdit(t)} className="inline-flex items-center gap-1.5 font-sans text-xs text-muted-foreground hover:text-foreground border border-border/30 rounded-lg px-3 py-1.5 transition-colors">
                        <Pencil className="w-3.5 h-3.5" /> Bearbeiten
                      </button>
                      <button onClick={() => deleteTemplate(t.id)} className="inline-flex items-center gap-1.5 font-sans text-xs text-destructive hover:text-destructive/80 border border-destructive/20 rounded-lg px-3 py-1.5 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" /> Löschen
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* ── Signatur ── */}
      {activeTab === "signatur" && (
        <div className="max-w-2xl space-y-4">
          <p className="font-sans text-sm text-muted-foreground">
            Die Signatur wird automatisch an jede Mail angehängt.
          </p>
          <RichTextEditor
            value={signatureBody}
            onChange={setSignatureBody}
            placeholder="Signatur eingeben, z.B. Mit freundlichen Grüßen, Emilian Leber…"
            minHeight="200px"
            showPlaceholders={false}
          />
          {signatureMsg && (
            <p className={`font-sans text-sm ${signatureMsg.includes("Fehler") ? "text-red-500" : "text-accent"}`}>
              {signatureMsg}
            </p>
          )}
          <button onClick={saveSignature} disabled={savingSignature} className="btn-primary disabled:opacity-60">
            <Save className="w-4 h-4 mr-2" />
            {savingSignature ? "Speichert…" : "Signatur speichern"}
          </button>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminSettings;
