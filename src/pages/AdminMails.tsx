import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Inbox,
  Send,
  AlertTriangle,
  Trash2,
  RefreshCw,
  Star,
  StarOff,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Loader2,
  MailOpen,
  Mail,
  CheckCheck,
  X,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

interface InboxMail {
  id: string;
  uid: string;
  folder: string;
  from_name: string | null;
  from_email: string | null;
  to_email: string | null;
  subject: string | null;
  body_html: string | null;
  body_text: string | null;
  received_at: string | null;
  is_read: boolean;
  is_starred: boolean;
  created_at: string;
}

const FOLDERS = [
  { key: "INBOX", label: "Posteingang", icon: Inbox },
  { key: "Sent",  label: "Gesendet",    icon: Send },
  { key: "Spam",  label: "Spam",        icon: AlertTriangle },
  { key: "Trash", label: "Papierkorb",  icon: Trash2 },
];

const AdminMails = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [mails, setMails] = useState<InboxMail[]>([]);
  const [folder, setFolder] = useState("INBOX");
  const [selected, setSelected] = useState<InboxMail | null>(null);
  const [bodyLoading, setBodyLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncLog, setSyncLog] = useState<string | null>(null);
  const [syncLogs, setSyncLogs] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const PAGE_SIZE = 50;

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/kundenportal/login");
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { navigate("/kundenportal/login"); return; }
      supabase
        .from("portal_admins")
        .select("*")
        .eq("email", session.user.email)
        .maybeSingle()
        .then(({ data }) => {
          setIsAdmin(!!data);
          setLoading(false);
        });
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadMails = async (f = folder, p = page) => {
    const from = p * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    const { data, count } = await supabase
      .from("portal_inbox_mails")
      .select("*", { count: "exact" })
      .eq("folder", f)
      .eq("is_deleted", false)
      .order("received_at", { ascending: false })
      .range(from, to);
    setMails((data as InboxMail[]) || []);
    if (count !== null) setTotalCount(count);
  };

  useEffect(() => {
    if (!isAdmin) return;
    setSelected(null);
    setPage(0);
    loadMails(folder, 0);
  }, [folder, isAdmin]);

  useEffect(() => {
    if (!isAdmin) return;
    loadMails(folder, page);
  }, [page]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/kundenportal/login");
  };

  const openMail = async (mail: InboxMail) => {
    setSelected(mail);
    if (!mail.is_read) {
      await supabase.from("portal_inbox_mails").update({ is_read: true }).eq("id", mail.id);
      setMails((prev) => prev.map((m) => m.id === mail.id ? { ...m, is_read: true } : m));
    }
    if (!mail.body_html && !mail.body_text) {
      setBodyLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-mail-body`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.access_token}`,
            },
            body: JSON.stringify({ mail_id: mail.id, uid: mail.uid }),
          }
        );
        const json = await res.json();
        if (json.body_html || json.body_text) {
          const updated = { ...mail, is_read: true, body_html: json.body_html, body_text: json.body_text };
          setSelected(updated);
          setMails((prev) => prev.map((m) => m.id === mail.id ? updated : m));
        }
      } catch (e) {
        console.error("fetch-mail-body error", e);
      } finally {
        setBodyLoading(false);
      }
    }
  };

  const toggleStar = async (mail: InboxMail, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !mail.is_starred;
    await supabase.from("portal_inbox_mails").update({ is_starred: next }).eq("id", mail.id);
    setMails((prev) => prev.map((m) => m.id === mail.id ? { ...m, is_starred: next } : m));
    if (selected?.id === mail.id) setSelected((s) => s ? { ...s, is_starred: next } : s);
  };

  const toggleRead = async (mail: InboxMail, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const next = !mail.is_read;
    await supabase.from("portal_inbox_mails").update({ is_read: next }).eq("id", mail.id);
    setMails((prev) => prev.map((m) => m.id === mail.id ? { ...m, is_read: next } : m));
    if (selected?.id === mail.id) setSelected((s) => s ? { ...s, is_read: next } : s);
  };

  const deleteMail = async (mail: InboxMail, e?: React.MouseEvent) => {
    e?.stopPropagation();
    await supabase.from("portal_inbox_mails").update({ is_deleted: true }).eq("id", mail.id);
    setMails((prev) => prev.filter((m) => m.id !== mail.id));
    if (selected?.id === mail.id) setSelected(null);
  };

  const markAllRead = async () => {
    await supabase
      .from("portal_inbox_mails")
      .update({ is_read: true })
      .eq("folder", folder)
      .eq("is_deleted", false);
    setMails((prev) => prev.map((m) => ({ ...m, is_read: true })));
  };

  const syncInbox = async () => {
    setSyncing(true);
    setSyncLog(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sync-inbox`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${session?.access_token}` },
        }
      );
      const raw = await res.text();
      let json: any = {};
      try { json = JSON.parse(raw); } catch (_) {}
      if (!res.ok && !json.error) json.error = `HTTP ${res.status}: ${raw.slice(0, 200)}`;
      setSyncLog(json.success ? `Synchronisiert: ${json.synced} E-Mails` : `Fehler: ${json.error ?? raw.slice(0, 200)}`);
      setSyncLogs(json.logs || []);
      await loadMails(folder, page);
    } catch (e: any) {
      setSyncLog(`Fehler: ${e.message}`);
      setSyncLogs([]);
    } finally {
      setSyncing(false);
    }
  };

  const unreadCount = mails.filter((m) => !m.is_read).length;

  if (loading) return <div className="pt-28 text-center">Wird geladen…</div>;
  if (isAdmin === false) return <div className="pt-28 text-center">Kein Zugriff</div>;

  return (
    <AdminLayout
      title="Postfach"
      subtitle="IMAP-Synchronisiertes E-Mail-Postfach"
      actions={
        <div className="flex items-center gap-3">
          <button
            onClick={syncInbox}
            disabled={syncing}
            className="inline-flex items-center gap-2 rounded-xl border border-border/30 bg-muted/30 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted/60 transition-colors disabled:opacity-50"
          >
            {syncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            {syncing ? "Synchronisiert…" : "Sync"}
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" /> Abmelden
          </button>
        </div>
      }
    >
      {syncLog && (
        <div className="mb-4 rounded-xl border border-border/30 bg-muted/30 overflow-hidden">
          <p className="px-4 py-3 text-sm text-muted-foreground">{syncLog}</p>
          {syncLogs.length > 0 && (
            <div className="border-t border-border/20 px-4 py-3 space-y-0.5">
              {syncLogs.map((line, i) => (
                <p key={i} className={`font-mono text-xs ${line.startsWith("ERROR") || line.startsWith("DB error") ? "text-destructive" : "text-muted-foreground"}`}>
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="grid lg:grid-cols-[200px_minmax(0,1fr)] gap-4">
        {/* Folder sidebar */}
        <div className="rounded-2xl border border-border/30 bg-muted/20 p-3 h-fit">
          <nav className="space-y-1">
            {FOLDERS.map(({ key, label, icon: Icon }) => {
              const isActive = folder === key;
              return (
                <button
                  key={key}
                  onClick={() => setFolder(key)}
                  className={`w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                    isActive
                      ? "bg-background text-foreground shadow-sm border border-border/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/60"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{label}</span>
                  </span>
                  {isActive && unreadCount > 0 && (
                    <span className="text-[10px] font-bold rounded-full bg-accent text-accent-foreground px-1.5 py-0.5">
                      {unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mail list + detail */}
        <div className="min-w-0">
          {selected ? (
            <div className="rounded-2xl border border-border/30 bg-muted/20 overflow-hidden">
              {/* Detail header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border/20 flex-wrap">
                <button
                  onClick={() => setSelected(null)}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Zurück
                </button>
                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-base font-bold text-foreground truncate">
                    {selected.subject || "(Kein Betreff)"}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => toggleRead(selected, e)}
                    title={selected.is_read ? "Als ungelesen markieren" : "Als gelesen markieren"}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                  >
                    {selected.is_read ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={(e) => toggleStar(selected, e)}
                    title="Stern"
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                  >
                    {selected.is_starred
                      ? <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      : <StarOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={(e) => deleteMail(selected, e)}
                    title="Löschen"
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Meta */}
              <div className="px-5 py-3 border-b border-border/20 space-y-1 text-sm text-muted-foreground">
                <div>
                  <span className="font-medium text-foreground">Von: </span>
                  {selected.from_name ? `${selected.from_name} <${selected.from_email}>` : selected.from_email}
                </div>
                {selected.to_email && (
                  <div>
                    <span className="font-medium text-foreground">An: </span>
                    {selected.to_email}
                  </div>
                )}
                <div>
                  <span className="font-medium text-foreground">Datum: </span>
                  {selected.received_at ? new Date(selected.received_at).toLocaleString("de-DE") : "—"}
                </div>
              </div>

              {/* Body */}
              <div className="px-5 py-5">
                {bodyLoading ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    E-Mail wird geladen…
                  </div>
                ) : selected.body_html ? (
                  <div
                    className="prose prose-sm max-w-none text-foreground"
                    dangerouslySetInnerHTML={{ __html: selected.body_html }}
                  />
                ) : selected.body_text ? (
                  <pre className="font-sans text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                    {selected.body_text}
                  </pre>
                ) : (
                  <p className="text-sm text-muted-foreground">Kein Inhalt verfügbar.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-border/30 bg-muted/20 overflow-hidden">
              {/* Toolbar */}
              {totalCount > 0 && (
                <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-border/20 flex-wrap">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, totalCount)} von {totalCount}
                    </span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        Alle gelesen
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      disabled={page === 0}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 disabled:opacity-30 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-muted-foreground px-1">
                      Seite {page + 1} / {Math.ceil(totalCount / PAGE_SIZE)}
                    </span>
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      disabled={(page + 1) * PAGE_SIZE >= totalCount}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 disabled:opacity-30 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {mails.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-sm text-muted-foreground">Keine E-Mails in diesem Ordner.</p>
                </div>
              ) : (
                <div className="divide-y divide-border/20">
                  {mails.map((mail) => (
                    <div
                      key={mail.id}
                      onClick={() => openMail(mail)}
                      className="w-full text-left px-5 py-3.5 hover:bg-background/60 transition-colors flex items-start gap-3 cursor-pointer group"
                    >
                      {/* Unread dot */}
                      <div className="mt-2 w-2 flex-shrink-0">
                        {!mail.is_read && <span className="block w-2 h-2 rounded-full bg-accent" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <span className={`text-sm truncate ${mail.is_read ? "text-muted-foreground" : "font-semibold text-foreground"}`}>
                            {mail.from_name || mail.from_email || "Unbekannt"}
                          </span>
                          <span className="text-xs text-muted-foreground flex-shrink-0">
                            {mail.received_at ? new Date(mail.received_at).toLocaleDateString("de-DE") : "—"}
                          </span>
                        </div>
                        <p className={`text-sm truncate ${mail.is_read ? "text-muted-foreground" : "text-foreground"}`}>
                          {mail.subject || "(Kein Betreff)"}
                        </p>
                      </div>

                      {/* Row actions */}
                      <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => toggleRead(mail, e)}
                          title={mail.is_read ? "Ungelesen" : "Gelesen"}
                          className="p-1 rounded text-muted-foreground hover:text-foreground"
                        >
                          {mail.is_read ? <Mail className="w-3.5 h-3.5" /> : <MailOpen className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={(e) => toggleStar(mail, e)}
                          className="p-1 rounded text-muted-foreground hover:text-yellow-500"
                        >
                          {mail.is_starred
                            ? <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                            : <StarOff className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={(e) => deleteMail(mail, e)}
                          className="p-1 rounded text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMails;
