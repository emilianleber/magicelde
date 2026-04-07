import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Plus, Save, Trash2, Pencil, X, Check, Upload, Image } from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";

interface MailTemplate {
  id: string;
  name: string;
  subject: string | null;
  body: string;
  created_at: string;
}

interface AdminSettingsData {
  id: string;
  company_name: string;
  company_subtitle: string;
  company_owner: string;
  company_address: string;
  company_zip: string;
  company_city: string;
  company_country: string;
  company_email: string;
  company_phone: string;
  company_website: string;
  tax_number: string;
  vat_id: string;
  bank_name: string;
  bank_iban: string;
  bank_bic: string;
  bank_account_holder: string;
  default_payment_days: number;
  default_offer_days: number;
  default_tax_rate: number;
  kleinunternehmer: boolean;
  document_template: number;
  company_logo_url: string;
}

const DEFAULT_SETTINGS: Omit<AdminSettingsData, "id"> = {
  company_name: "Emilian Leber",
  company_subtitle: "",
  company_owner: "Emilian Leber",
  company_address: "",
  company_zip: "",
  company_city: "Regensburg",
  company_country: "Deutschland",
  company_email: "el@magicel.de",
  company_phone: "",
  company_website: "magicel.de",
  tax_number: "",
  vat_id: "",
  bank_name: "",
  bank_iban: "",
  bank_bic: "",
  bank_account_holder: "Emilian Leber",
  default_payment_days: 14,
  default_offer_days: 14,
  default_tax_rate: 0,
  kleinunternehmer: false,
  document_template: 1,
  company_logo_url: "",
};

const LAYOUTS_META = [
  { id: 1,  name: "Klassisch",     desc: "Weißes Blatt, Logo oben rechts" },
  { id: 2,  name: "Farbstreifen",  desc: "Dünner Akzentstreifen oben" },
  { id: 3,  name: "Farbkopf",      desc: "Voller Farbblock als Briefkopf" },
  { id: 4,  name: "Retro",         desc: "Schreibmaschinen-Stil" },
  { id: 5,  name: "Seitenstreifen",desc: "Vertikaler Farbbalken links" },
  { id: 6,  name: "Dark Premium",  desc: "Dunkler Kopf mit Akzentlinie" },
  { id: 7,  name: "Corporate",     desc: "Logo + Name zentriert" },
  { id: 8,  name: "Kreativ",       desc: "Diagonale Farbfläche" },
  { id: 9,  name: "Skandinavisch", desc: "Ultra-minimal" },
  { id: 10, name: "Luxus",         desc: "Doppelte Linien, Serif" },
  { id: 11, name: "Rahmen",        desc: "Vollständige Rahmung" },
  { id: 12, name: "Technik",       desc: "Zweispaltiger Header" },
  { id: 13, name: "Pfeile",        desc: "Breadcrumb-Navigation" },
  { id: 14, name: "Panorama",      desc: "Farbverlauf-Kopf" },
  { id: 15, name: "Initialen",     desc: "Großes Logo/Monogramm" },
];

const inputCls =
  "w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

type TabId = "vorlagen" | "textvorlagen" | "signatur" | "unternehmen" | "bank" | "dokumente" | "artikel" | "kalender";

interface DokumentTextvorlage {
  id: string;
  name: string;
  typ: "angebot" | "rechnung" | "auftragsbestaetigung" | "mahnung" | "alle";
  bereich: "kopf" | "fuss";
  inhalt: string;
  is_default: boolean;
  sort_order: number;
  created_at: string;
}

const DOK_TYPEN: { key: DokumentTextvorlage["typ"]; label: string }[] = [
  { key: "angebot",            label: "Angebot" },
  { key: "rechnung",           label: "Rechnung" },
  { key: "auftragsbestaetigung", label: "Auftragsbestätigung" },
  { key: "mahnung",            label: "Mahnung" },
  { key: "alle",               label: "Alle Dokumenttypen" },
];

const AdminSettings = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<TabId>("vorlagen");

  // Templates
  const [templates, setTemplates] = useState<MailTemplate[]>([]);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [draftName, setDraftName] = useState("");
  const [draftSubject, setDraftSubject] = useState("");
  const [draftBody, setDraftBody] = useState("");
  const [savingTemplate, setSavingTemplate] = useState(false);
  const [templateMsg, setTemplateMsg] = useState("");

  // E-Mail-Vorlagen (send-template-mail)
  const [emailTemplates, setEmailTemplates] = useState<{ id: string; slug: string; name: string; betreff: string; inhalt: string; kategorie: string; aktiv: boolean }[]>([]);
  const [editingEmailTpl, setEditingEmailTpl] = useState<string | null>(null);
  const [etDraftBetreff, setEtDraftBetreff] = useState("");
  const [etDraftInhalt, setEtDraftInhalt] = useState("");
  const [etSaving, setEtSaving] = useState(false);

  // Signatur
  const [signaturHtml, setSignaturHtml] = useState("");
  const [signaturSaving, setSignaturSaving] = useState(false);

  // Dokument-Textvorlagen
  const [textvorlagen, setTextvorlagen] = useState<DokumentTextvorlage[]>([]);
  const [tvEditingId, setTvEditingId] = useState<string | "new" | null>(null);
  const [tvDraftName, setTvDraftName] = useState("");
  const [tvDraftTyp, setTvDraftTyp] = useState<DokumentTextvorlage["typ"]>("angebot");
  const [tvDraftBereich, setTvDraftBereich] = useState<DokumentTextvorlage["bereich"]>("kopf");
  const [tvDraftInhalt, setTvDraftInhalt] = useState("");
  const [tvDraftDefault, setTvDraftDefault] = useState(false);
  const [tvSaving, setTvSaving] = useState(false);
  const [tvMsg, setTvMsg] = useState("");

  // Signature
  const [signatureId, setSignatureId] = useState<string | null>(null);
  const [signatureBody, setSignatureBody] = useState("");
  const [savingSignature, setSavingSignature] = useState(false);
  const [signatureMsg, setSignatureMsg] = useState("");

  // Admin settings
  const [settings, setSettings] = useState<AdminSettingsData | null>(null);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState("");

  // Logo upload
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoMsg, setLogoMsg] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) { navigate("/admin/login"); return; }
      setUser(session.user);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { navigate("/admin/login"); return; }
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

      const [templatesResult, signatureResult, settingsResult, tvResult, etResult] = await Promise.all([
        supabase.from("portal_mail_templates").select("*").order("created_at", { ascending: false }),
        supabase.from("portal_signature").select("*").limit(1).maybeSingle(),
        supabase.from("admin_settings").select("*").limit(1).maybeSingle(),
        supabase.from("dokument_textvorlagen").select("*").order("typ").order("bereich").order("sort_order"),
        supabase.from("email_templates").select("*").order("sortierung", { ascending: true }),
      ]);

      if (!templatesResult.error) setTemplates(templatesResult.data || []);
      if (!tvResult.error) setTextvorlagen((tvResult.data || []) as DokumentTextvorlage[]);
      if (!etResult.error) setEmailTemplates(etResult.data || []);
      if (!signatureResult.error && signatureResult.data) {
        setSignatureId(signatureResult.data.id);
        setSignatureBody(signatureResult.data.body);
      }
      if (!settingsResult.error && settingsResult.data) {
        setSettings(settingsResult.data as AdminSettingsData);
      } else {
        // Insert default row if none exists
        const { data: newSettings } = await supabase
          .from("admin_settings")
          .insert({})
          .select("*")
          .single();
        if (newSettings) setSettings(newSettings as AdminSettingsData);
      }

      setLoading(false);
    };

    loadData();
  }, [user]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
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

  const uploadLogo = async (file: File) => {
    if (!settings) return;
    setUploadingLogo(true);
    setLogoMsg("");
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || "png";
      const path = `company-logo.${ext}`;
      const { error: upErr } = await supabase.storage.from("logos").upload(path, file, { upsert: true, contentType: file.type });
      if (upErr) throw upErr;
      const { data: urlData } = supabase.storage.from("logos").getPublicUrl(path);
      const url = urlData.publicUrl + `?t=${Date.now()}`;
      const { error: dbErr } = await supabase.from("admin_settings").update({ company_logo_url: url }).eq("id", settings.id);
      if (dbErr) throw dbErr;
      setSettings(prev => prev ? { ...prev, company_logo_url: url } : prev);
      setLogoMsg("Logo gespeichert.");
    } catch (e) {
      setLogoMsg("Fehler beim Hochladen.");
    } finally {
      setUploadingLogo(false);
      setTimeout(() => setLogoMsg(""), 4000);
    }
  };

  const removeLogo = async () => {
    if (!settings) return;
    const { error } = await supabase.from("admin_settings").update({ company_logo_url: "" }).eq("id", settings.id);
    if (!error) setSettings(prev => prev ? { ...prev, company_logo_url: "" } : prev);
  };

  const updateSetting = <K extends keyof AdminSettingsData>(key: K, value: AdminSettingsData[K]) => {
    setSettings(prev => prev ? { ...prev, [key]: value } : prev);
  };

  const saveSettings = async () => {
    if (!settings) return;
    setSavingSettings(true);
    setSettingsMsg("");

    const { id, ...rest } = settings;
    const { error } = await supabase
      .from("admin_settings")
      .update({ ...rest, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      setSettingsMsg("Fehler beim Speichern.");
    } else {
      setSettingsMsg("Gespeichert.");
      setTimeout(() => setSettingsMsg(""), 3000);
    }
    setSavingSettings(false);
  };

  // ── Textvorlagen CRUD ──────────────────────────────────────────────────────
  const tvStartNew = (typ: DokumentTextvorlage["typ"], bereich: DokumentTextvorlage["bereich"]) => {
    setTvEditingId("new");
    setTvDraftName("");
    setTvDraftTyp(typ);
    setTvDraftBereich(bereich);
    setTvDraftInhalt("");
    setTvDraftDefault(false);
    setTvMsg("");
  };

  const tvStartEdit = (v: DokumentTextvorlage) => {
    setTvEditingId(v.id);
    setTvDraftName(v.name);
    setTvDraftTyp(v.typ);
    setTvDraftBereich(v.bereich);
    setTvDraftInhalt(v.inhalt);
    setTvDraftDefault(v.is_default);
    setTvMsg("");
  };

  const tvCancel = () => { setTvEditingId(null); setTvMsg(""); };

  const tvSave = async () => {
    if (!tvDraftName.trim() || !tvDraftInhalt.trim()) {
      setTvMsg("Name und Inhalt sind Pflichtfelder.");
      return;
    }
    setTvSaving(true);
    setTvMsg("");
    const payload = {
      name: tvDraftName.trim(),
      typ: tvDraftTyp,
      bereich: tvDraftBereich,
      inhalt: tvDraftInhalt,
      is_default: tvDraftDefault,
    };
    if (tvEditingId === "new") {
      const { data, error } = await supabase
        .from("dokument_textvorlagen")
        .insert(payload)
        .select("*")
        .single();
      if (error) { setTvMsg("Fehler: " + error.message); setTvSaving(false); return; }
      setTextvorlagen((prev) => [...prev, data as DokumentTextvorlage]);
    } else {
      const { data, error } = await supabase
        .from("dokument_textvorlagen")
        .update(payload)
        .eq("id", tvEditingId!)
        .select("*")
        .single();
      if (error) { setTvMsg("Fehler: " + error.message); setTvSaving(false); return; }
      setTextvorlagen((prev) => prev.map((v) => v.id === tvEditingId ? data as DokumentTextvorlage : v));
    }
    setTvEditingId(null);
    setTvSaving(false);
  };

  const tvDelete = async (id: string) => {
    if (!confirm("Vorlage löschen?")) return;
    const { error } = await supabase.from("dokument_textvorlagen").delete().eq("id", id);
    if (!error) setTextvorlagen((prev) => prev.filter((v) => v.id !== id));
    if (tvEditingId === id) setTvEditingId(null);
  };

  if (loading) return <div className="pt-28 text-center">Wird geladen…</div>;
  if (isAdmin === false) return <div className="pt-28 text-center">Kein Zugriff</div>;

  const tabs: { id: TabId; label: string }[] = [
    { id: "vorlagen", label: "Mail-Vorlagen" },
    { id: "textvorlagen", label: "Textvorlagen" },
    { id: "signatur", label: "Signatur" },
    { id: "unternehmen", label: "Unternehmen" },
    { id: "bank", label: "Bank" },
    { id: "dokumente", label: "Dokumente" },
    { id: "artikel", label: "Artikel" },
    { id: "kalender", label: "Kalender-Abo" },
  ];

  return (
    <AdminLayout
      title="Einstellungen"
      subtitle="Mail-Vorlagen, Signatur und Unternehmensdaten"
      actions={
        <button onClick={logout} className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
          <LogOut className="w-4 h-4" /> Abmelden
        </button>
      }
    >
      {/* Tabs */}
      <div className="flex flex-wrap gap-1 bg-muted/40 rounded-2xl p-1 mb-8 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
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

      {/* ── E-Mail-Vorlagen (send-template-mail) ── */}
      {activeTab === "vorlagen" && emailTemplates.length > 0 && (
        <div className="space-y-4 mt-8 pt-8 border-t border-border/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-bold text-foreground">Schnellversand-Vorlagen</h3>
              <p className="font-sans text-xs text-muted-foreground mt-1">Diese Vorlagen können mit 1-Klick aus der Buchungs-Detailseite gesendet werden. Platzhalter: {"{{begruessung}}"}, {"{{anlass}}"}, {"{{datum}}"}, {"{{ort}}"}</p>
            </div>
          </div>
          {emailTemplates.map((tpl) => (
            <div key={tpl.id} className="p-5 rounded-2xl bg-muted/20 border border-border/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="font-sans text-sm font-bold text-foreground">{tpl.name}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${tpl.aktiv ? "bg-green-50 text-green-700 border border-green-200" : "bg-muted text-muted-foreground border border-border/20"}`}>
                    {tpl.aktiv ? "Aktiv" : "Inaktiv"}
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (editingEmailTpl === tpl.id) { setEditingEmailTpl(null); }
                    else { setEditingEmailTpl(tpl.id); setEtDraftBetreff(tpl.betreff); setEtDraftInhalt(tpl.inhalt); }
                  }}
                  className="font-sans text-xs text-accent hover:text-accent/80"
                >
                  {editingEmailTpl === tpl.id ? "Abbrechen" : "Bearbeiten"}
                </button>
              </div>

              {editingEmailTpl === tpl.id ? (
                <div className="space-y-3">
                  <div>
                    <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">Betreff</label>
                    <input value={etDraftBetreff} onChange={(e) => setEtDraftBetreff(e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">Inhalt</label>
                    <textarea value={etDraftInhalt} onChange={(e) => setEtDraftInhalt(e.target.value)} rows={12} className={`${inputCls} resize-y font-mono text-xs`} />
                  </div>
                  <button
                    disabled={etSaving}
                    onClick={async () => {
                      setEtSaving(true);
                      await supabase.from("email_templates").update({ betreff: etDraftBetreff, inhalt: etDraftInhalt, updated_at: new Date().toISOString() }).eq("id", tpl.id);
                      setEmailTemplates((prev) => prev.map((t) => t.id === tpl.id ? { ...t, betreff: etDraftBetreff, inhalt: etDraftInhalt } : t));
                      setEditingEmailTpl(null);
                      setEtSaving(false);
                    }}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> {etSaving ? "Speichert…" : "Speichern"}
                  </button>
                </div>
              ) : (
                <div>
                  <p className="font-sans text-xs text-muted-foreground mb-1">Betreff: <span className="text-foreground font-medium">{tpl.betreff}</span></p>
                  <p className="font-sans text-xs text-muted-foreground line-clamp-3 whitespace-pre-line">{tpl.inhalt.slice(0, 200)}…</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Textvorlagen ── */}
      {activeTab === "textvorlagen" && (
        <div className="space-y-8">
          <p className="font-sans text-sm text-muted-foreground">
            Kopf- und Fußzeilen-Vorlagen für jede Dokumentart. Im Editor per Klick einfügen.
          </p>

          {DOK_TYPEN.map(({ key: dokTyp, label: typLabel }) => (
            <div key={dokTyp} className="space-y-4">
              {/* Section header */}
              <div className="flex items-center gap-3">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted/60 px-2.5 py-1 rounded">{typLabel}</span>
                <div className="flex-1 border-t border-dashed border-border/40" />
              </div>

              {(["kopf", "fuss"] as const).map((bereich) => {
                const items = textvorlagen.filter((v) => v.typ === dokTyp && v.bereich === bereich);
                const isAddingHere = tvEditingId === "new" && tvDraftTyp === dokTyp && tvDraftBereich === bereich;
                return (
                  <div key={bereich} className="pl-3 space-y-2">
                    {/* Sub-header row */}
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-semibold">
                        {bereich === "kopf" ? "Kopfzeile" : "Fußzeile"}
                      </p>
                      {!tvEditingId && (
                        <button
                          onClick={() => tvStartNew(dokTyp, bereich)}
                          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground border border-border/30 rounded-lg px-2.5 py-1 transition-colors"
                        >
                          <Plus className="w-3 h-3" /> Neue Vorlage
                        </button>
                      )}
                    </div>

                    {/* Inline add form */}
                    {isAddingHere && (
                      <div className="p-5 rounded-2xl bg-accent/5 border border-accent/20 space-y-4">
                        <div>
                          <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Name *</label>
                          <input
                            value={tvDraftName}
                            onChange={(e) => setTvDraftName(e.target.value)}
                            placeholder="z.B. Herzlich &amp; Persönlich"
                            className={inputCls}
                            autoFocus
                          />
                        </div>
                        <div>
                          <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Inhalt *</label>
                          <textarea
                            value={tvDraftInhalt}
                            onChange={(e) => setTvDraftInhalt(e.target.value)}
                            rows={5}
                            placeholder="Vorlagentext…"
                            className="w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
                          />
                        </div>
                        <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                          <input type="checkbox" checked={tvDraftDefault} onChange={(e) => setTvDraftDefault(e.target.checked)} className="rounded" />
                          Als Standard verwenden
                        </label>
                        {tvMsg && <p className="text-xs text-red-500">{tvMsg}</p>}
                        <div className="flex gap-2">
                          <button onClick={tvSave} disabled={tvSaving} className="btn-primary disabled:opacity-60">
                            <Save className="w-4 h-4 mr-2" /> {tvSaving ? "Speichert…" : "Speichern"}
                          </button>
                          <button onClick={tvCancel} className="inline-flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground border border-border/40 rounded-xl px-4 py-2.5 transition-colors">
                            <X className="w-4 h-4" /> Abbrechen
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Existing items */}
                    {items.map((v) => (
                      <div key={v.id} className="rounded-2xl bg-muted/20 border border-border/30 overflow-hidden">
                        {tvEditingId === v.id ? (
                          <div className="p-5 space-y-4">
                            <div>
                              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Name *</label>
                              <input value={tvDraftName} onChange={(e) => setTvDraftName(e.target.value)} className={inputCls} autoFocus />
                            </div>
                            <div>
                              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Inhalt *</label>
                              <textarea
                                value={tvDraftInhalt}
                                onChange={(e) => setTvDraftInhalt(e.target.value)}
                                rows={5}
                                className="w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
                              />
                            </div>
                            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                              <input type="checkbox" checked={tvDraftDefault} onChange={(e) => setTvDraftDefault(e.target.checked)} className="rounded" />
                              Als Standard verwenden
                            </label>
                            {tvMsg && <p className="text-xs text-red-500">{tvMsg}</p>}
                            <div className="flex gap-2">
                              <button onClick={tvSave} disabled={tvSaving} className="btn-primary disabled:opacity-60">
                                <Check className="w-4 h-4 mr-2" /> {tvSaving ? "Speichert…" : "Speichern"}
                              </button>
                              <button onClick={tvCancel} className="inline-flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground border border-border/40 rounded-xl px-4 py-2.5 transition-colors">
                                <X className="w-4 h-4" /> Abbrechen
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between gap-4 p-4">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <p className="font-sans text-sm font-semibold text-foreground">{v.name}</p>
                                {v.is_default && (
                                  <span className="inline-block text-[9px] font-bold uppercase tracking-wider bg-foreground text-background px-1.5 py-0.5 rounded">Standard</span>
                                )}
                              </div>
                              <p className="mt-1 text-xs text-muted-foreground line-clamp-2 whitespace-pre-line">{v.inhalt}</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <button onClick={() => tvStartEdit(v)} className="inline-flex items-center gap-1.5 font-sans text-xs text-muted-foreground hover:text-foreground border border-border/30 rounded-lg px-3 py-1.5 transition-colors">
                                <Pencil className="w-3.5 h-3.5" /> Bearbeiten
                              </button>
                              <button onClick={() => tvDelete(v.id)} className="inline-flex items-center gap-1.5 font-sans text-xs text-destructive hover:text-destructive/80 border border-destructive/20 rounded-lg px-3 py-1.5 transition-colors">
                                <Trash2 className="w-3.5 h-3.5" /> Löschen
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {items.length === 0 && !isAddingHere && (
                      <p className="text-xs text-muted-foreground/50 italic pl-1">Keine Vorlagen</p>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* ── Signatur ── */}
      {activeTab === "signatur" && (
        <div className="max-w-2xl space-y-6">
          <p className="font-sans text-sm text-muted-foreground">
            Die Signatur wird automatisch an jede E-Mail angehängt (Status-Mails, Vorlagen, Rechnungsadresse etc.).
          </p>

          {/* Vorschau der aktuellen Signatur */}
          <div className="p-5 rounded-2xl bg-muted/20 border border-border/30">
            <h3 className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Aktuelle E-Mail-Signatur (Vorschau)</h3>
            <div className="bg-white rounded-xl border border-border/20 p-6" dangerouslySetInnerHTML={{ __html: `
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                <tr><td colspan="2" style="padding-bottom:16px;"><div style="height:2px;background:linear-gradient(90deg,#6366f1 0%,#a855f7 40%,#e4e4e7 40%);border-radius:2px;"></div></td></tr>
                <tr>
                  <td style="width:64px;vertical-align:top;padding-right:18px;"><img src="/favicon.ico" alt="EL" width="48" height="48" style="border-radius:12px;display:block;" /></td>
                  <td style="vertical-align:top;font-family:Inter,sans-serif;">
                    <p style="margin:0;font-size:15px;font-weight:700;color:#18181b;">Emilian Leber</p>
                    <p style="margin:2px 0 0;font-size:10px;font-weight:600;color:#6366f1;text-transform:uppercase;letter-spacing:1px;">Zauberer & Entertainer</p>
                    <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:8px;">
                      <tr><td style="padding:2px 0;font-size:11px;color:#71717a;width:14px;">T</td><td style="padding:2px 0 2px 6px;font-size:11px;"><a href="#" style="color:#3f3f46;text-decoration:none;">+49 155 637 44 696</a></td></tr>
                      <tr><td style="padding:2px 0;font-size:11px;color:#71717a;">E</td><td style="padding:2px 0 2px 6px;font-size:11px;"><a href="#" style="color:#3f3f46;text-decoration:none;">el@magicel.de</a></td></tr>
                      <tr><td style="padding:2px 0;font-size:11px;color:#71717a;">W</td><td style="padding:2px 0 2px 6px;font-size:11px;"><a href="#" style="color:#3f3f46;text-decoration:none;">www.magicel.de</a></td></tr>
                    </table>
                    <p style="margin:6px 0 0;font-size:10px;color:#a1a1aa;">Regensburg · Deutschland · <a href="#" style="color:#a1a1aa;text-decoration:none;">WhatsApp</a></p>
                  </td>
                </tr>
              </table>
            ` }} />
            <p className="font-sans text-[10px] text-muted-foreground mt-3">Diese Signatur wird in allen automatischen E-Mails verwendet. Um sie zu ändern, kontaktiere den Entwickler.</p>
          </div>

          <p className="font-sans text-xs text-muted-foreground">
            Diese Signatur wird in <strong>allen</strong> E-Mails verwendet — automatische Status-Mails, Vorlagen, Rechnungsadresse, Feedback, Magic Link etc.
          </p>
        </div>
      )}

      {/* ── Unternehmen ── */}
      {activeTab === "unternehmen" && settings && (
        <div className="max-w-2xl space-y-8">
          <p className="font-sans text-sm text-muted-foreground">
            Diese Daten erscheinen auf allen Dokumenten (Angebote, Rechnungen, etc.).
          </p>

          {/* Logo upload */}
          <div>
            <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-3">Firmenlogo</label>
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 rounded-xl border-2 border-dashed border-border/40 bg-muted/10 flex items-center justify-center shrink-0 overflow-hidden">
                {settings.company_logo_url ? (
                  <img src={settings.company_logo_url} alt="Logo" className="w-full h-full object-contain p-1" />
                ) : (
                  <Image className="w-8 h-8 text-muted-foreground/30" />
                )}
              </div>
              <div className="space-y-2">
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadLogo(f); }}
                />
                <button
                  onClick={() => logoInputRef.current?.click()}
                  disabled={uploadingLogo}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border/30 text-sm hover:bg-muted/40 transition-colors disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  {uploadingLogo ? "Wird hochgeladen…" : "Logo hochladen"}
                </button>
                {settings.company_logo_url && (
                  <button onClick={removeLogo} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-red-600 text-sm hover:bg-red-50 transition-colors">
                    <X className="w-4 h-4" />
                    Logo entfernen
                  </button>
                )}
                {logoMsg && <p className={`text-sm font-sans ${logoMsg.includes("Fehler") ? "text-red-500" : "text-green-600"}`}>{logoMsg}</p>}
                <p className="text-xs text-muted-foreground">PNG, JPG, SVG · max. 2 MB</p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {([
              { key: "company_name",     label: "Firmenname / Name" },
              { key: "company_subtitle", label: "Untertitel (z.B. Zauberer und Mentalist)" },
              { key: "company_owner",    label: "Inhaber/-in" },
              { key: "company_email",    label: "E-Mail" },
              { key: "company_phone",    label: "Telefon" },
              { key: "company_website",  label: "Website" },
              { key: "company_address",  label: "Straße & Hausnummer" },
              { key: "company_zip",      label: "PLZ" },
              { key: "company_city",     label: "Stadt" },
              { key: "company_country",  label: "Land" },
              { key: "tax_number",       label: "Steuernummer" },
              { key: "vat_id",           label: "USt-IdNr." },
            ] as { key: keyof AdminSettingsData; label: string }[]).map(({ key, label }) => (
              <div key={key} className={key === "company_subtitle" ? "sm:col-span-2" : ""}>
                <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">{label}</label>
                <input
                  value={String(settings[key] ?? "")}
                  onChange={(e) => updateSetting(key, e.target.value as AdminSettingsData[typeof key])}
                  className={inputCls}
                />
              </div>
            ))}
          </div>
          {settingsMsg && (
            <p className={`font-sans text-sm ${settingsMsg.includes("Fehler") ? "text-red-500" : "text-green-600"}`}>
              {settingsMsg}
            </p>
          )}
          <button onClick={saveSettings} disabled={savingSettings} className="btn-primary disabled:opacity-60">
            <Save className="w-4 h-4 mr-2" />
            {savingSettings ? "Speichert…" : "Speichern"}
          </button>
        </div>
      )}

      {/* ── Bank ── */}
      {activeTab === "bank" && settings && (
        <div className="max-w-2xl space-y-6">
          <p className="font-sans text-sm text-muted-foreground">
            Bankdaten werden auf Rechnungen angezeigt.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {([
              { key: "bank_name", label: "Bank" },
              { key: "bank_account_holder", label: "Kontoinhaber" },
              { key: "bank_iban", label: "IBAN" },
              { key: "bank_bic", label: "BIC" },
            ] as { key: keyof AdminSettingsData; label: string }[]).map(({ key, label }) => (
              <div key={key}>
                <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">{label}</label>
                <input
                  value={String(settings[key] ?? "")}
                  onChange={(e) => updateSetting(key, e.target.value as AdminSettingsData[typeof key])}
                  className={inputCls}
                />
              </div>
            ))}
          </div>
          {settingsMsg && (
            <p className={`font-sans text-sm ${settingsMsg.includes("Fehler") ? "text-red-500" : "text-green-600"}`}>
              {settingsMsg}
            </p>
          )}
          <button onClick={saveSettings} disabled={savingSettings} className="btn-primary disabled:opacity-60">
            <Save className="w-4 h-4 mr-2" />
            {savingSettings ? "Speichert…" : "Speichern"}
          </button>
        </div>
      )}

      {/* ── Dokumente ── */}
      {activeTab === "dokumente" && settings && (
        <div className="max-w-2xl space-y-8">
          {/* Default payment days */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                Zahlungsziel Rechnung (Tage)
              </label>
              <input
                type="number"
                value={settings.default_payment_days}
                onChange={(e) => updateSetting("default_payment_days", parseInt(e.target.value) || 0)}
                className={inputCls}
                min={0}
                max={365}
              />
            </div>
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                Gültig bis Angebot (Tage)
              </label>
              <input
                type="number"
                value={(settings as any).default_offer_days ?? 14}
                onChange={(e) => updateSetting("default_offer_days" as any, parseInt(e.target.value) || 0)}
                className={inputCls}
                min={0}
                max={365}
              />
            </div>
          </div>

          {/* Default tax rate */}
          <div>
            <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
              Standard Mehrwertsteuersatz
            </label>
            <div className="flex gap-2">
              {[0, 7, 19].map((rate) => (
                <button
                  key={rate}
                  onClick={() => updateSetting("default_tax_rate", rate)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                    settings.default_tax_rate === rate
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background text-muted-foreground border-border/30 hover:text-foreground"
                  }`}
                >
                  {rate} %
                </button>
              ))}
            </div>
          </div>

          {/* Kleinunternehmerregelung */}
          <div>
            <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
              Umsatzsteuer
            </label>
            <label className="flex items-center gap-3 cursor-pointer group w-fit">
              <div
                onClick={() => updateSetting("kleinunternehmer", !settings.kleinunternehmer)}
                className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${settings.kleinunternehmer ? "bg-foreground" : "bg-border"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${settings.kleinunternehmer ? "translate-x-5" : ""}`} />
              </div>
              <div>
                <div className="text-sm font-medium group-hover:text-foreground transition-colors">Kleinunternehmerregelung (§ 19 UStG)</div>
                <div className="text-xs text-muted-foreground">Keine Umsatzsteuer auf Rechnungen ausweisen</div>
              </div>
            </label>
          </div>

          {/* Document template / layout selection */}
          <div>
            <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-1">
              Standard-Layout für neue Dokumente
            </label>
            <p className="text-xs text-muted-foreground mb-3">Wird beim Erstellen neuer Dokumente vorausgewählt. Im Editor jederzeit änderbar.</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {LAYOUTS_META.map((layout) => (
                <button
                  key={layout.id}
                  onClick={() => updateSetting("document_template", layout.id)}
                  title={layout.desc}
                  className={`relative rounded-xl overflow-hidden border-2 transition-all text-left ${
                    settings.document_template === layout.id
                      ? "border-foreground ring-2 ring-foreground ring-offset-1"
                      : "border-border/30 hover:border-border/60"
                  }`}
                >
                  <div className="bg-white p-2" style={{ aspectRatio: "210/297" }}>
                    <div className="space-y-1 h-full flex flex-col">
                      <div className="h-3 bg-gray-200 rounded w-full" />
                      <div className="flex gap-1 flex-1">
                        <div className="w-1/2 space-y-0.5">
                          <div className="h-0.5 bg-gray-100 rounded w-full" />
                          <div className="h-0.5 bg-gray-100 rounded w-3/4" />
                        </div>
                        <div className="flex-1 space-y-0.5">
                          <div className="h-0.5 bg-gray-100 rounded w-full" />
                          <div className="h-0.5 bg-gray-100 rounded w-full" />
                        </div>
                      </div>
                      <div className="h-0.5 bg-gray-100 rounded w-1/2" />
                      <div className="h-1.5 bg-gray-200 rounded w-full" />
                      <div className="space-y-0.5">
                        <div className="h-0.5 bg-gray-100 rounded w-full" />
                        <div className="h-0.5 bg-gray-100 rounded w-full" />
                        <div className="h-0.5 bg-gray-100 rounded w-2/3" />
                      </div>
                    </div>
                  </div>
                  <div className="px-1.5 py-1 bg-muted/20 text-center border-t border-border/20">
                    <div className="text-[8px] font-semibold text-foreground truncate">{layout.name}</div>
                    <div className="text-[7px] text-muted-foreground truncate">{layout.id}</div>
                  </div>
                  {settings.document_template === layout.id && (
                    <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-foreground flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-background" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {settingsMsg && (
            <p className={`font-sans text-sm ${settingsMsg.includes("Fehler") ? "text-red-500" : "text-green-600"}`}>
              {settingsMsg}
            </p>
          )}
          <button onClick={saveSettings} disabled={savingSettings} className="btn-primary disabled:opacity-60">
            <Save className="w-4 h-4 mr-2" />
            {savingSettings ? "Speichert…" : "Speichern"}
          </button>
        </div>
      )}
      {activeTab === "artikel" && (
        <div className="p-6 rounded-2xl bg-muted/20 border border-border/30 text-center">
          <p className="text-sm text-muted-foreground mb-3">Artikel-Stammdaten verwalten: Leistungen, Produkte und Preise für Angebote und Rechnungen.</p>
          <a href="/admin/artikel" className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2.5 text-sm font-semibold hover:opacity-80 transition-opacity">
            Artikel verwalten
          </a>
        </div>
      )}

      {activeTab === "kalender" && (() => {
        const calUrl = `https://rjhvqctjtgfpxzhnrozt.supabase.co/functions/v1/calendar-feed`;
        const copyUrl = () => {
          navigator.clipboard.writeText(calUrl);
        };
        return (
          <div className="space-y-5">
            <div className="p-6 rounded-2xl bg-muted/20 border border-border/30">
              <h3 className="text-sm font-bold text-foreground mb-3">Kalender-Abo URL</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Abonniere diesen Kalender-Feed in Apple Kalender, Google Kalender oder Outlook.
                Alle Anfragen und gebuchten Events erscheinen automatisch mit Status-Erkennung.
              </p>
              <div className="flex items-center gap-2 mb-4">
                <input
                  readOnly
                  value={calUrl}
                  className="flex-1 rounded-xl bg-background border border-border/30 px-4 py-2.5 text-xs font-mono text-foreground select-all"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <button
                  onClick={copyUrl}
                  className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-foreground text-background px-4 py-2.5 text-sm font-semibold hover:opacity-80 transition-opacity"
                >
                  Kopieren
                </button>
              </div>

              <div className="space-y-3 text-xs text-muted-foreground">
                <div className="p-3 rounded-xl bg-background/60 border border-border/20">
                  <p className="font-semibold text-foreground mb-1">Apple Kalender (iPhone/Mac)</p>
                  <p>Einstellungen → Kalender → Accounts → Kalenderabo hinzufügen → URL einfügen</p>
                </div>
                <div className="p-3 rounded-xl bg-background/60 border border-border/20">
                  <p className="font-semibold text-foreground mb-1">Google Kalender</p>
                  <p>Andere Kalender → Per URL → URL einfügen (aktualisiert ca. alle 12h)</p>
                </div>
                <div className="p-3 rounded-xl bg-background/60 border border-border/20">
                  <p className="font-semibold text-foreground mb-1">Outlook</p>
                  <p>Kalender → Kalender hinzufügen → Aus dem Internet abonnieren → URL einfügen</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-muted/20 border border-border/30">
              <h3 className="text-sm font-bold text-foreground mb-3">So erkennst du den Status</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3 p-2 rounded-lg">
                  <span className="text-lg">✅</span>
                  <div>
                    <p className="font-semibold text-foreground">GEBUCHT</p>
                    <p className="text-xs text-muted-foreground">Fest gebuchtes Event mit Erinnerungen</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg">
                  <span className="text-lg">🟡</span>
                  <div>
                    <p className="font-semibold text-foreground">ANFRAGE</p>
                    <p className="text-xs text-muted-foreground">Termin reserviert, noch nicht gebucht</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg">
                  <span className="text-lg">⚠️</span>
                  <div>
                    <p className="font-semibold text-foreground">Erinnerung</p>
                    <p className="text-xs text-muted-foreground">Automatisch wenn Uhrzeit noch fehlt</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Meinen Kalender verbinden ── */}
            <div className="p-6 rounded-2xl bg-muted/20 border border-border/30">
              <h3 className="text-sm font-bold text-foreground mb-1">Meinen Kalender verbinden</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Verbinde deinen privaten Kalender (Apple/Google/Outlook) damit deine Termine im CRM-Kalender angezeigt werden und Konflikte bei Anfragen erkannt werden.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">iCal URL</label>
                  <input
                    value={(settings as any)?.calendar_url || ""}
                    onChange={(e) => setSettings((s: any) => ({ ...s, calendar_url: e.target.value }))}
                    placeholder="https://p123-caldav.icloud.com/..."
                    className="w-full rounded-xl bg-muted/40 border border-border/30 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Apple: Kalender → Kalender teilen → Privater Link. Google: Kalender-Einstellungen → Geheime Adresse im iCal-Format.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(settings as any)?.calendar_enabled || false}
                      onChange={(e) => setSettings((s: any) => ({ ...s, calendar_enabled: e.target.checked }))}
                      className="h-4 w-4 rounded"
                    />
                    <span className="text-sm text-foreground">Kalender-Sync aktivieren</span>
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={async () => {
                      if (!settings?.id) return;
                      setSaving(true);
                      await supabase.from("admin_settings").update({
                        calendar_url: (settings as any).calendar_url || null,
                        calendar_enabled: (settings as any).calendar_enabled || false,
                      }).eq("id", settings.id);

                      // Sofort synchronisieren
                      if ((settings as any).calendar_enabled && (settings as any).calendar_url) {
                        try {
                          const { data: { session } } = await supabase.auth.getSession();
                          await fetch("https://rjhvqctjtgfpxzhnrozt.supabase.co/functions/v1/sync-calendar", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
                              ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
                            },
                          }).then(r => r.json()).then(d => {
                            setMessage(d.error ? `Fehler: ${d.error}` : `✓ ${d.synced} Termine synchronisiert`);
                          });
                        } catch { setMessage("Sync-Fehler"); }
                      } else {
                        setMessage("Gespeichert");
                      }
                      setSaving(false);
                    }}
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2.5 text-sm font-semibold hover:opacity-80 disabled:opacity-50"
                  >
                    {saving ? "Speichert..." : "Speichern & Sync"}
                  </button>

                  {(settings as any)?.calendar_enabled && (settings as any)?.calendar_url && (
                    <button
                      onClick={async () => {
                        const { data: { session } } = await supabase.auth.getSession();
                        const res = await fetch("https://rjhvqctjtgfpxzhnrozt.supabase.co/functions/v1/sync-calendar", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
                            ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
                          },
                        });
                        const d = await res.json();
                        setMessage(d.error ? `Fehler: ${d.error}` : `✓ ${d.synced} Termine synchronisiert`);
                      }}
                      className="inline-flex items-center gap-2 rounded-xl border border-border/30 px-4 py-2.5 text-sm font-medium hover:bg-muted/40"
                    >
                      🔄 Jetzt synchronisieren
                    </button>
                  )}
                </div>

                {message && <p className={`text-xs ${message.startsWith("Fehler") || message.startsWith("Sync") ? "text-destructive" : "text-green-600"}`}>{message}</p>}
              </div>
            </div>
          </div>
        );
      })()}
    </AdminLayout>
  );
};

export default AdminSettings;
