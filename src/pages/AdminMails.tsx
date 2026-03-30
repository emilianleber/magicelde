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
  LogOut,
  Loader2,
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

  // Auth check
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

  // Load mails for folder
  useEffect(() => {
    if (!isAdmin) return;
    setSelected(null);
    supabase
      .from("portal_inbox_mails")
      .select("*")
      .eq("folder", folder)
      .eq("is_deleted", false)
      .order("received_at", { ascending: false })
      .then(({ data }) => setMails((data as InboxMail[]) || []));
  }, [folder, isAdmin]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/kundenportal/login");
  };

  const openMail = async (mail: InboxMail) => {
    setSelected(mail);

    // Mark as read in DB
    if (!mail.is_read) {
      await supabase.from("portal_inbox_mails").update({ is_read: true }).eq("id", mail.id);
      setMails((prev) => prev.map((m) => m.id === mail.id ? { ...m, is_read: true } : m));
    }

    // Fetch body if not cached
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
      const json = await res.json();
      setSyncLog(json.success ? `Synchronisiert: ${json.synced} E-Mails` : `Fehler: ${json.error}`);
      setSyncLogs(json.logs || []);
      // Reload mails
      const { data } = await supabase
        .from("portal_inbox_mails")
        .select("*")
        .eq("folder", folder)
        .eq("is_deleted", false)
        .order("received_at", { ascending: false });
      setMails((data as InboxMail[]) || []);
    } catch (e: any) {
      setSyncLog(`Fehler: ${e.message}`);
      setSyncLogs([]);
    } finally {
      setSyncing(false);
    }
  };

  const unreadCount = (f: string) => mails.filter((m) => m.folder === f && !m.is_read).length;

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
            {syncing ? "Synchronisiert…" : "Postfach sync"}
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
        <details className="mb-4 rounded-xl border border-border/30 bg-muted/30 overflow-hidden" open={syncLogs.some((l) => l.startsWith("ERROR") || l.startsWith("DB error"))}>
          <summary className="px-4 py-3 text-sm text-muted-foreground cursor-pointer select-none hover:text-foreground">
            {syncLog}
          </summary>
          {syncLogs.length > 0 && (
            <div className="border-t border-border/20 px-4 py-3 space-y-0.5">
              {syncLogs.map((line, i) => (
                <p key={i} className={`font-mono text-xs ${line.startsWith("ERROR") || line.startsWith("DB error") ? "text-destructive" : "text-muted-foreground"}`}>
                  {line}
                </p>
              ))}
            </div>
          )}
        </details>
      )}

      <div className="grid lg:grid-cols-[200px_minmax(0,1fr)] gap-4">
        {/* Folder sidebar */}
        <div className="rounded-2xl border border-border/30 bg-muted/20 p-3 h-fit">
          <nav className="space-y-1">
            {FOLDERS.map(({ key, label, icon: Icon }) => {
              const count = mails.filter((m) => m.folder === key && !m.is_read).length;
              return (
                <button
                  key={key}
                  onClick={() => setFolder(key)}
                  className={`w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                    folder === key
                      ? "bg-background text-foreground shadow-sm border border-border/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/60"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{label}</span>
                  </span>
                  {key === folder && count > 0 && (
                    <span className="text-[10px] font-bold rounded-full bg-accent text-accent-foreground px-1.5 py-0.5">
                      {count}
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
            // Mail detail view
            <div className="rounded-2xl border border-border/30 bg-muted/20 overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-border/20">
                <button
                  onClick={() => setSelected(null)}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Zurück
                </button>
                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-lg font-bold text-foreground truncate">
                    {selected.subject || "(Kein Betreff)"}
                  </h2>
                </div>
                <button onClick={(e) => toggleStar(selected, e)}>
                  {selected.is_starred
                    ? <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    : <StarOff className="w-4 h-4 text-muted-foreground" />}
                </button>
              </div>

              <div className="px-6 py-4 border-b border-border/20 space-y-1 text-sm text-muted-foreground">
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
                  {selected.received_at
                    ? new Date(selected.received_at).toLocaleString("de-DE")
                    : "—"}
                </div>
              </div>

              <div className="px-6 py-6">
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
            // Mail list
            <div className="rounded-2xl border border-border/30 bg-muted/20 overflow-hidden">
              {mails.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-sm text-muted-foreground">Keine E-Mails in diesem Ordner.</p>
                </div>
              ) : (
                <div className="divide-y divide-border/20">
                  {mails.map((mail) => (
                    <button
                      key={mail.id}
                      onClick={() => openMail(mail)}
                      className="w-full text-left px-5 py-4 hover:bg-background/60 transition-colors flex items-start gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {!mail.is_read && (
                            <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                          )}
                          <span className={`text-sm truncate ${mail.is_read ? "text-muted-foreground" : "font-semibold text-foreground"}`}>
                            {mail.from_name || mail.from_email || "Unbekannt"}
                          </span>
                        </div>
                        <p className={`text-sm truncate ${mail.is_read ? "text-muted-foreground" : "text-foreground font-medium"}`}>
                          {mail.subject || "(Kein Betreff)"}
                        </p>
                      </div>

                      <div className="flex-shrink-0 flex flex-col items-end gap-2">
                        <span className="text-xs text-muted-foreground">
                          {mail.received_at
                            ? new Date(mail.received_at).toLocaleDateString("de-DE")
                            : "—"}
                        </span>
                        {mail.is_starred && (
                          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        )}
                      </div>
                    </button>
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
