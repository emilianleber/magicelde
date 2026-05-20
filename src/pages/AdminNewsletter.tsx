import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import {
  Mail,
  Send,
  Trash2,
  Search,
  RefreshCw,
  Plus,
  CheckCircle2,
  AlertCircle,
  Users,
  Loader2,
} from "lucide-react";

type Subscriber = {
  id: string;
  email: string;
  name: string | null;
  status: "active" | "unsubscribed" | "bounced";
  source: string | null;
  subscribed_at: string;
  unsubscribed_at: string | null;
};

type Campaign = {
  id: string;
  subject: string;
  body_html: string | null;
  body_text: string | null;
  status: "draft" | "sending" | "sent" | "failed";
  created_at: string;
  sent_at: string | null;
  recipient_count: number;
  failed_count: number;
};

const SUPABASE_URL = "https://rjhvqctjtgfpxzhnrozt.supabase.co";

const AdminNewsletter = () => {
  const [tab, setTab] = useState<"subscribers" | "campaigns" | "compose">("subscribers");
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [camps, setCamps] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "unsubscribed">("active");
  const [search, setSearch] = useState("");

  // Compose state
  const [subject, setSubject] = useState("");
  const [bodyHtml, setBodyHtml] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    const [subResult, campResult] = await Promise.all([
      supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false }),
      supabase
        .from("newsletter_campaigns")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);
    if (subResult.data) setSubs(subResult.data as Subscriber[]);
    if (campResult.data) setCamps(campResult.data as Campaign[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const filtered = useMemo(() => {
    let list = subs;
    if (filter !== "all") list = list.filter((s) => s.status === filter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (s) =>
          s.email.toLowerCase().includes(q) ||
          (s.name || "").toLowerCase().includes(q),
      );
    }
    return list;
  }, [subs, filter, search]);

  const counts = useMemo(
    () => ({
      total: subs.length,
      active: subs.filter((s) => s.status === "active").length,
      unsubscribed: subs.filter((s) => s.status === "unsubscribed").length,
    }),
    [subs],
  );

  const handleDelete = async (id: string) => {
    if (!window.confirm("Diesen Eintrag wirklich löschen? (Nicht abmelden — komplett aus DB entfernen.)")) return;
    const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", id);
    if (error) {
      alert("Löschen fehlgeschlagen: " + error.message);
      return;
    }
    setSubs((prev) => prev.filter((s) => s.id !== id));
  };

  const handleUnsubscribe = async (id: string) => {
    const { error } = await supabase
      .from("newsletter_subscribers")
      .update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      alert("Abmelden fehlgeschlagen: " + error.message);
      return;
    }
    setSubs((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: "unsubscribed" as const, unsubscribed_at: new Date().toISOString() }
          : s,
      ),
    );
  };

  const handleReactivate = async (id: string) => {
    const { error } = await supabase
      .from("newsletter_subscribers")
      .update({ status: "active", unsubscribed_at: null })
      .eq("id", id);
    if (error) {
      alert("Re-Aktivierung fehlgeschlagen: " + error.message);
      return;
    }
    setSubs((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "active" as const, unsubscribed_at: null } : s)),
    );
  };

  const handleSend = async () => {
    if (!subject.trim() || (!bodyHtml.trim() && !bodyText.trim())) {
      setSendError("Subject + Body erforderlich.");
      return;
    }
    if (!window.confirm(`Newsletter an ${counts.active} aktive Subscriber senden?`)) return;
    setSending(true);
    setSendError(null);
    setSendResult(null);
    try {
      // 1) Campaign als draft anlegen
      const { data: campaign, error: cErr } = await supabase
        .from("newsletter_campaigns")
        .insert({
          subject: subject.trim(),
          body_html: bodyHtml,
          body_text: bodyText || htmlToText(bodyHtml),
          status: "draft",
        })
        .select("id")
        .single();
      if (cErr) throw cErr;

      // 2) Send-Function aufrufen
      const session = (await supabase.auth.getSession()).data.session;
      const jwt = session?.access_token;
      if (!jwt) throw new Error("Nicht eingeloggt.");

      const res = await fetch(
        `${SUPABASE_URL}/functions/v1/newsletter-send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ campaignId: campaign.id }),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || `Versand fehlgeschlagen (${res.status})`);
      setSendResult(`Versendet: ${data.sent} · Fehler: ${data.failed} · Total: ${data.total}`);
      setSubject("");
      setBodyHtml("");
      setBodyText("");
      fetchAll();
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Unbekannter Fehler");
    }
    setSending(false);
  };

  return (
    <>
      <Helmet>
        <title>Newsletter — Admin · Emilian Leber</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <AdminLayout title="Newsletter">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <StatCard label="Total" value={counts.total} icon={Users} />
          <StatCard label="Aktiv" value={counts.active} icon={CheckCircle2} accent />
          <StatCard label="Abgemeldet" value={counts.unsubscribed} icon={AlertCircle} />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-muted/40 rounded-xl p-1 mb-6 overflow-x-auto">
          {(
            [
              { key: "subscribers", label: "Subscribers" },
              { key: "campaigns", label: "Kampagnen" },
              { key: "compose", label: "Newsletter schreiben" },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                tab === t.key
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "subscribers" && (
          <div>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="flex gap-1 bg-muted/40 rounded-lg p-1">
                {(["all", "active", "unsubscribed"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded text-xs font-medium ${
                      filter === f
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {f === "all" ? "Alle" : f === "active" ? "Aktiv" : "Abgemeldet"}
                  </button>
                ))}
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Email oder Name suchen…"
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-border/40 bg-background text-sm focus:outline-none focus:border-foreground/30"
                />
              </div>
              <button
                onClick={fetchAll}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-muted/40 hover:bg-muted text-muted-foreground"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Neu laden
              </button>
            </div>

            {loading ? (
              <p className="text-sm text-muted-foreground py-8 text-center">Laden…</p>
            ) : filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">Keine Subscriber.</p>
            ) : (
              <div className="border border-border/30 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/30">
                      <tr>
                        <th className="text-left px-3 py-2.5 text-xs font-semibold text-muted-foreground">Email</th>
                        <th className="text-left px-3 py-2.5 text-xs font-semibold text-muted-foreground whitespace-nowrap">Name</th>
                        <th className="text-left px-3 py-2.5 text-xs font-semibold text-muted-foreground whitespace-nowrap">Quelle</th>
                        <th className="text-left px-3 py-2.5 text-xs font-semibold text-muted-foreground whitespace-nowrap">Datum</th>
                        <th className="text-left px-3 py-2.5 text-xs font-semibold text-muted-foreground">Status</th>
                        <th className="text-right px-3 py-2.5 text-xs font-semibold text-muted-foreground whitespace-nowrap">Aktionen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((s) => (
                        <tr key={s.id} className="border-t border-border/20 hover:bg-muted/20">
                          <td className="px-3 py-2.5 text-foreground font-mono text-xs">{s.email}</td>
                          <td className="px-3 py-2.5 text-foreground whitespace-nowrap">{s.name || "—"}</td>
                          <td className="px-3 py-2.5 text-muted-foreground text-xs whitespace-nowrap">{s.source || "—"}</td>
                          <td className="px-3 py-2.5 text-muted-foreground text-xs whitespace-nowrap tabular-nums">
                            {new Date(s.subscribed_at).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })}
                          </td>
                          <td className="px-3 py-2.5">
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${
                                s.status === "active"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : s.status === "unsubscribed"
                                    ? "bg-muted text-muted-foreground"
                                    : "bg-red-100 text-red-700"
                              }`}
                            >
                              {s.status === "active" ? "Aktiv" : s.status === "unsubscribed" ? "Abgemeldet" : "Bounce"}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 text-right whitespace-nowrap">
                            {s.status === "active" ? (
                              <button
                                onClick={() => handleUnsubscribe(s.id)}
                                className="text-xs text-muted-foreground hover:text-foreground mr-3"
                              >
                                Abmelden
                              </button>
                            ) : (
                              <button
                                onClick={() => handleReactivate(s.id)}
                                className="text-xs text-emerald-600 hover:text-emerald-700 mr-3"
                              >
                                Re-Aktivieren
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(s.id)}
                              className="text-xs text-red-600 hover:text-red-700 inline-flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              Löschen
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "campaigns" && (
          <div>
            {loading ? (
              <p className="text-sm text-muted-foreground py-8 text-center">Laden…</p>
            ) : camps.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">Noch keine Kampagnen versendet.</p>
            ) : (
              <div className="space-y-2">
                {camps.map((c) => (
                  <div key={c.id} className="border border-border/30 rounded-xl p-4 hover:bg-muted/10">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-semibold text-foreground">{c.subject}</h3>
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide whitespace-nowrap ${
                          c.status === "sent"
                            ? "bg-emerald-100 text-emerald-700"
                            : c.status === "sending"
                              ? "bg-blue-100 text-blue-700"
                              : c.status === "failed"
                                ? "bg-red-100 text-red-700"
                                : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {c.sent_at ? `Versendet ${new Date(c.sent_at).toLocaleString("de-DE")}` : `Erstellt ${new Date(c.created_at).toLocaleString("de-DE")}`}
                      {" · "}
                      {c.recipient_count} Empfänger
                      {c.failed_count > 0 && ` · ${c.failed_count} Fehler`}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "compose" && (
          <div className="max-w-3xl">
            <p className="text-sm text-muted-foreground mb-5">
              Wird an alle <strong className="text-foreground">{counts.active}</strong> aktiven
              Subscriber geschickt. Personalisierung: <code className="bg-muted/40 px-1 rounded">{`{{name}}`}</code> wird durch Subscriber-Name ersetzt (leer wenn nicht gesetzt).
            </p>
            <div className="space-y-3">
              <label className="block">
                <span className="text-[11px] tracking-[0.1em] uppercase font-semibold text-muted-foreground mb-2 block">
                  Betreff
                </span>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="z.B. Magic Dinner Summer Edition — Vorverkauf gestartet"
                  className="w-full px-4 py-3 rounded-xl border border-border/40 bg-background focus:outline-none focus:border-foreground/30"
                />
              </label>
              <label className="block">
                <span className="text-[11px] tracking-[0.1em] uppercase font-semibold text-muted-foreground mb-2 block">
                  Body (HTML erlaubt — wird in Mail-Template eingebettet)
                </span>
                <textarea
                  value={bodyHtml}
                  onChange={(e) => setBodyHtml(e.target.value)}
                  rows={10}
                  placeholder={'<p>Hallo {{name}},</p><p>kurze Nachricht…</p><p><a href="https://www.magicel.de/tickets">Hier reservieren</a></p>'}
                  className="w-full px-4 py-3 rounded-xl border border-border/40 bg-background font-mono text-sm focus:outline-none focus:border-foreground/30 resize-y"
                />
              </label>
              <label className="block">
                <span className="text-[11px] tracking-[0.1em] uppercase font-semibold text-muted-foreground mb-2 block">
                  Plain-Text-Fallback (optional — wird aus HTML automatisch generiert wenn leer)
                </span>
                <textarea
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border/40 bg-background text-sm focus:outline-none focus:border-foreground/30 resize-y"
                />
              </label>

              {sendError && (
                <p className="text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> {sendError}
                </p>
              )}
              {sendResult && (
                <p className="text-sm text-emerald-600 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> {sendResult}
                </p>
              )}

              <button
                onClick={handleSend}
                disabled={sending || !subject.trim() || !bodyHtml.trim() || counts.active === 0}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #5c1622, #9a2640)" }}
              >
                {sending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {sending ? "Wird gesendet…" : `An ${counts.active} Subscriber senden`}
              </button>
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
};

interface StatProps {
  label: string;
  value: number;
  icon: typeof Mail;
  accent?: boolean;
}
const StatCard = ({ label, value, icon: Icon, accent }: StatProps) => (
  <div className="bg-white border border-border/30 rounded-xl p-4">
    <div className="flex items-center justify-between mb-2">
      <span className="text-[10px] tracking-[0.1em] uppercase font-semibold text-muted-foreground">
        {label}
      </span>
      <Icon className={`w-4 h-4 ${accent ? "text-emerald-600" : "text-muted-foreground"}`} />
    </div>
    <p className="text-2xl font-display font-black tabular-nums text-foreground">{value}</p>
  </div>
);

// Helpers
function htmlToText(html: string): string {
  return html
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Avoid unused-import warning
void Plus;

export default AdminNewsletter;
