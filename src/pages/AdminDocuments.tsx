import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Plus, FileText, Euro, Clock, CheckCircle, ChevronRight, Download, ExternalLink } from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";
import DocumentCreator, { type DocumentData, type DocumentPosition } from "@/components/admin/DocumentCreator";

interface AdminDoc {
  id: string;
  name: string;
  type: string;
  document_number: string | null;
  document_date: string | null;
  due_date: string | null;
  total: number | null;
  amount: number | null;
  file_url: string | null;
  created_at: string;
  customer_id: string | null;
  event_id: string | null;
  request_id: string | null;
  customer_name?: string;
}

const AdminDocuments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [docs, setDocs] = useState<AdminDoc[]>([]);
  const [customers, setCustomers] = useState<Record<string, string>>({});
  const [showCreator, setShowCreator] = useState(false);
  const [editingDoc, setEditingDoc] = useState<(DocumentData & { positions?: DocumentPosition[] }) | null>(null);

  const isOverview = location.pathname === "/admin/documents";
  const typeFilter =
    location.pathname.includes("angebote") ? "Angebot" :
    location.pathname.includes("rechnungen") ? "Rechnung" :
    location.pathname.includes("auftragsbestaetigung") ? "Auftragsbestätigung" :
    null;

  const pageTitle =
    typeFilter === "Angebot" ? "Angebote" :
    typeFilter === "Rechnung" ? "Rechnungen" :
    typeFilter === "Auftragsbestätigung" ? "Auftragsbestätigungen" :
    "Dokumente";

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
    loadData();
  }, [user, location.pathname]);

  const loadData = async () => {
    setLoading(true);
    const { data: admin } = await supabase.from("portal_admins").select("*").eq("email", user!.email!).maybeSingle();
    if (!admin) { setIsAdmin(false); setLoading(false); return; }
    setIsAdmin(true);

    let query = supabase
      .from("portal_documents")
      .select("*")
      .in("type", ["Angebot", "Rechnung", "Auftragsbestätigung", "Abschlagsrechnung"])
      .order("created_at", { ascending: false });

    if (typeFilter) {
      if (typeFilter === "Rechnung") {
        query = supabase
          .from("portal_documents")
          .select("*")
          .in("type", ["Rechnung", "Abschlagsrechnung"])
          .order("created_at", { ascending: false });
      } else {
        query = supabase
          .from("portal_documents")
          .select("*")
          .eq("type", typeFilter)
          .order("created_at", { ascending: false });
      }
    }

    const { data } = await query;
    const docList = data || [];
    setDocs(docList);

    const customerIds = [...new Set(docList.filter(d => d.customer_id).map(d => d.customer_id!))];
    if (customerIds.length > 0) {
      const { data: custs } = await supabase
        .from("portal_customers")
        .select("id, name")
        .in("id", customerIds);
      if (custs) {
        const map: Record<string, string> = {};
        custs.forEach(c => { map[c.id] = c.name || ""; });
        setCustomers(map);
      }
    }

    setLoading(false);
  };

  const angebote = docs.filter(d => d.type === "Angebot");
  const rechnungen = docs.filter(d => d.type === "Rechnung" || d.type === "Abschlagsrechnung");
  const auftragsbestaetigung = docs.filter(d => d.type === "Auftragsbestätigung");

  const offeneRechnungen = rechnungen.filter(d => !d.due_date || new Date(d.due_date) >= new Date());
  const faelligeRechnungen = rechnungen.filter(d => d.due_date && new Date(d.due_date) < new Date());
  const totalAusstehend = offeneRechnungen.reduce((s, d) => s + (d.total || d.amount || 0), 0);

  const formatCurrency = (v: number) => v.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
  const formatDate = (s: string | null) => s ? new Date(s).toLocaleDateString("de-DE") : "—";

  const getStatusBadge = (doc: AdminDoc) => {
    if (doc.type === "Rechnung" || doc.type === "Abschlagsrechnung") {
      if (doc.due_date && new Date(doc.due_date) < new Date()) {
        return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700">Fällig</span>;
      }
      return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Offen</span>;
    }
    if (doc.type === "Angebot") {
      return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Angebot</span>;
    }
    return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">{doc.type}</span>;
  };

  if (loading) return <AdminLayout title={pageTitle} subtitle=""><div className="text-center py-20 text-muted-foreground">Wird geladen…</div></AdminLayout>;
  if (isAdmin === false) return <AdminLayout title="Zugriff verweigert" subtitle=""><div className="text-center py-20 text-destructive">Kein Zugriff</div></AdminLayout>;

  return (
    <>
    <AdminLayout
      title={pageTitle}
      subtitle={isOverview ? "Alle Dokumente auf einen Blick" : undefined}
      actions={
        <button
          onClick={() => { setEditingDoc(null); setShowCreator(true); }}
          className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-bold hover:bg-foreground/90"
        >
          <Plus className="w-4 h-4" /> Neues Dokument
        </button>
      }
    >
      {/* Overview stats */}
      {isOverview && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Offene Rechnungen", value: formatCurrency(totalAusstehend), sub: `${offeneRechnungen.length} Dokument${offeneRechnungen.length !== 1 ? "e" : ""}`, icon: Clock, color: "text-amber-600 bg-amber-50" },
            { label: "Fällige Rechnungen", value: `${faelligeRechnungen.length}`, sub: faelligeRechnungen.length > 0 ? "Überfällig" : "Alles bezahlt ✓", icon: CheckCircle, color: faelligeRechnungen.length > 0 ? "text-red-600 bg-red-50" : "text-green-600 bg-green-50" },
            { label: "Angebote", value: `${angebote.length}`, sub: "Gesamt", icon: FileText, color: "text-blue-600 bg-blue-50" },
            { label: "Auftragsbestät.", value: `${auftragsbestaetigung.length}`, sub: "Gesamt", icon: CheckCircle, color: "text-purple-600 bg-purple-50" },
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-2xl bg-muted/20 border border-border/30">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              <p className="text-[10px] text-muted-foreground/60 mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      )}

      {/* Quick Links on overview */}
      {isOverview && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Angebote", count: angebote.length, href: "/admin/documents/angebote", color: "bg-blue-50 border-blue-100 text-blue-700" },
            { label: "Rechnungen", count: rechnungen.length, href: "/admin/documents/rechnungen", color: "bg-amber-50 border-amber-100 text-amber-700" },
            { label: "Auftragsbestätigungen", count: auftragsbestaetigung.length, href: "/admin/documents/auftragsbestaetigung", color: "bg-green-50 border-green-100 text-green-700" },
          ].map((cat) => (
            <Link key={cat.href} to={cat.href} className={`flex items-center justify-between p-4 rounded-2xl border ${cat.color} hover:opacity-80 transition-opacity`}>
              <div>
                <p className="font-bold text-sm">{cat.label}</p>
                <p className="text-xs opacity-70">{cat.count} Dokument{cat.count !== 1 ? "e" : ""}</p>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>
          ))}
        </div>
      )}

      {/* Document list */}
      <div className="space-y-2">
        {docs.length > 0 && (
          <div className="grid text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-4 pb-1"
            style={{ gridTemplateColumns: "1fr 120px 100px 100px 80px" }}>
            <span>Dokument</span>
            <span>Kunde</span>
            <span>Datum</span>
            <span className="text-right">Betrag</span>
            <span className="text-right">Aktion</span>
          </div>
        )}

        {docs.length === 0 ? (
          <div className="text-center py-16 rounded-2xl bg-muted/10 border border-border/20">
            <FileText className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm font-medium text-muted-foreground">Noch keine Dokumente</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Klicke auf „Neues Dokument" um zu starten</p>
          </div>
        ) : (
          docs.map((doc) => (
            <div key={doc.id} className="grid items-center gap-3 p-4 rounded-2xl bg-muted/20 border border-border/30 hover:border-border/60 transition-all"
              style={{ gridTemplateColumns: "1fr 120px 100px 100px 80px" }}>
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-foreground/5 border border-border/20 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-foreground truncate">{doc.document_number || doc.name}</p>
                    {getStatusBadge(doc)}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{doc.type}{doc.due_date ? ` · Fällig ${formatDate(doc.due_date)}` : ""}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground truncate">{doc.customer_id ? customers[doc.customer_id] || "—" : "—"}</p>
              <p className="text-xs text-muted-foreground">{formatDate(doc.document_date || doc.created_at)}</p>
              <p className="text-sm font-semibold text-foreground text-right">{doc.total || doc.amount ? formatCurrency(doc.total || doc.amount || 0) : "—"}</p>
              <div className="flex items-center justify-end gap-1">
                {doc.file_url && (
                  <a href={doc.file_url} target="_blank" rel="noopener noreferrer"
                    className="p-1.5 rounded-lg hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>

    {showCreator && (
      <DocumentCreator
        customerId={null}
        eventId={null}
        requestId={null}
        customer={null}
        onDocumentSaved={(doc) => {
          setDocs(prev => {
            const exists = prev.find(d => d.id === doc.id);
            if (exists) return prev.map(d => d.id === doc.id ? { ...d, ...doc } : d);
            return [{
              id: doc.id!,
              name: `${doc.type} ${doc.document_number}`,
              type: doc.type,
              document_number: doc.document_number,
              document_date: doc.document_date,
              due_date: doc.due_date || null,
              total: doc.total,
              amount: doc.total,
              file_url: doc.file_url || null,
              created_at: new Date().toISOString(),
              customer_id: null,
              event_id: null,
              request_id: null,
            }, ...prev];
          });
          setShowCreator(false);
        }}
        onClose={() => setShowCreator(false)}
        existingDoc={editingDoc}
      />
    )}
    </>
  );
};

export default AdminDocuments;
