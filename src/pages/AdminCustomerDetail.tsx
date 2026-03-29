import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  Calendar,
  FileText,
  LogOut,
  MapPin,
  Plus,
  Save,
  Search,
  Theater,
  Users,
  Building2,
  Link2,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";
import AdminLayout from "@/components/admin/AdminLayout";

interface PortalCustomer {
  id: string;
  name: string | null;
  firma?: string | null;
  email: string | null;
  phone?: string | null;
  kundennummer?: string | null;
  created_at?: string | null;
}

interface PortalRequest {
  id: string;
  created_at: string;
  status: string | null;
  anlass: string | null;
  datum: string | null;
  ort: string | null;
  gaeste: number | null;
  format: string | null;
  email: string;
  name?: string | null;
  firma?: string | null;
  deleted_at?: string | null;
}

interface PortalEvent {
  id: string;
  title: string;
  event_date: string | null;
  location: string | null;
  status: string | null;
  format: string | null;
  guests: number | null;
  deleted_at?: string | null;
}

interface PortalDocument {
  id: string;
  name: string;
  type: string | null;
  file_url: string | null;
  created_at: string;
}

const inputCls =
  "w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

const formatEventStatusLabel = (status?: string | null) => {
  switch (status) {
    case "in_planung":
      return "In Planung";
    case "details_offen":
      return "Details offen";
    case "vertrag_gesendet":
      return "Vertrag gesendet";
    case "vertrag_bestaetigt":
      return "Vertrag bestätigt";
    case "rechnung_gesendet":
      return "Rechnung gesendet";
    case "rechnung_bezahlt":
      return "Rechnung bezahlt";
    case "event_erfolgt":
      return "Event erfolgt";
    case "storniert":
      return "Storniert";
    default:
      return status || "Offen";
  }
};

const AdminCustomerDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [customer, setCustomer] = useState<PortalCustomer | null>(null);
  const [requests, setRequests] = useState<PortalRequest[]>([]);
  const [events, setEvents] = useState<PortalEvent[]>([]);
  const [documents, setDocuments] = useState<PortalDocument[]>([]);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [firma, setFirma] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [kundennummer, setKundennummer] = useState("");

  // Assign request panel
  const [showAssignRequest, setShowAssignRequest] = useState(false);
  const [unassignedRequests, setUnassignedRequests] = useState<PortalRequest[]>([]);
  const [requestSearch, setRequestSearch] = useState("");
  const [loadingUnassignedRequests, setLoadingUnassignedRequests] = useState(false);
  const [assigningRequestId, setAssigningRequestId] = useState<string | null>(null);

  // Assign event panel
  const [showAssignEvent, setShowAssignEvent] = useState(false);
  const [unassignedEvents, setUnassignedEvents] = useState<PortalEvent[]>([]);
  const [eventSearch, setEventSearch] = useState("");
  const [loadingUnassignedEvents, setLoadingUnassignedEvents] = useState(false);
  const [assigningEventId, setAssigningEventId] = useState<string | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/kundenportal/login");
        return;
      }
      setUser(session.user);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/kundenportal/login");
        return;
      }
      setUser(session.user);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user?.email || !id) return;

    const loadData = async () => {
      setLoading(true);

      const { data: adminEntry } = await supabase
        .from("portal_admins")
        .select("*")
        .eq("email", user.email)
        .maybeSingle();

      if (!adminEntry) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);

      const { data: customerData, error: customerError } = await supabase
        .from("portal_customers")
        .select("*")
        .eq("id", id)
        .single();

      if (customerError || !customerData) {
        console.error("Fehler beim Laden des Kunden:", customerError);
        setLoading(false);
        return;
      }

      setCustomer(customerData);
      setName(customerData.name || "");
      setFirma(customerData.firma || "");
      setEmail(customerData.email || "");
      setPhone(customerData.phone || "");
      setKundennummer(customerData.kundennummer || "");

      const [requestsResult, eventsResult, docsResult] = await Promise.all([
        supabase
          .from("portal_requests")
          .select("*")
          .eq("customer_id", customerData.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("portal_events")
          .select("*")
          .eq("customer_id", customerData.id)
          .order("event_date", { ascending: true }),
        supabase
          .from("portal_documents")
          .select("*")
          .eq("customer_id", customerData.id)
          .order("created_at", { ascending: false }),
      ]);

      if (!requestsResult.error) setRequests(requestsResult.data || []);
      else console.error(requestsResult.error);

      if (!eventsResult.error) setEvents(eventsResult.data || []);
      else console.error(eventsResult.error);

      if (!docsResult.error) setDocuments(docsResult.data || []);
      else console.error(docsResult.error);

      setLoading(false);
    };

    loadData();
  }, [user, id, navigate]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/kundenportal/login");
  };

  const saveCustomer = async () => {
    if (!customer) return;

    setSaving(true);
    setMessage("");

    const safeEmail = email.trim().toLowerCase();
    const safeName = name.trim();

    if (!safeName || !safeEmail) {
      setMessage("Name und E-Mail dürfen nicht leer sein.");
      setSaving(false);
      return;
    }

    const { error: customerError } = await supabase
      .from("portal_customers")
      .update({
        name: safeName,
        firma: firma.trim() || null,
        email: safeEmail,
        phone: phone.trim() || null,
        kundennummer: kundennummer.trim() || null,
      })
      .eq("id", customer.id);

    if (customerError) {
      console.error("CUSTOMER UPDATE ERROR:", customerError);
      setMessage("Fehler beim Speichern.");
      setSaving(false);
      return;
    }

    await supabase
      .from("portal_requests")
      .update({
        name: safeName,
        firma: firma.trim() || null,
        email: safeEmail,
        phone: phone.trim() || null,
      })
      .eq("customer_id", customer.id);

    setCustomer({
      ...customer,
      name: safeName,
      firma: firma.trim() || null,
      email: safeEmail,
      phone: phone.trim() || null,
      kundennummer: kundennummer.trim() || null,
    });

    setRequests((prev) =>
      prev.map((request) => ({
        ...request,
        email: safeEmail,
        firma: firma.trim() || null,
      }))
    );

    setMessage("Kundendaten gespeichert.");
    setSaving(false);
  };

  const openAssignRequestPanel = async () => {
    setShowAssignRequest(true);
    setRequestSearch("");
    setLoadingUnassignedRequests(true);

    const { data, error } = await supabase
      .from("portal_requests")
      .select("*")
      .is("customer_id", null)
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (!error) setUnassignedRequests(data || []);
    else console.error(error);

    setLoadingUnassignedRequests(false);
  };

  const assignRequest = async (requestId: string) => {
    if (!customer) return;
    setAssigningRequestId(requestId);

    const { error } = await supabase
      .from("portal_requests")
      .update({
        customer_id: customer.id,
        name: name.trim() || customer.name,
        firma: firma.trim() || null,
        email: email.trim().toLowerCase() || customer.email,
        phone: phone.trim() || null,
      })
      .eq("id", requestId);

    if (error) {
      console.error("ASSIGN REQUEST ERROR:", error);
      setAssigningRequestId(null);
      return;
    }

    const assigned = unassignedRequests.find((r) => r.id === requestId);
    if (assigned) {
      setRequests((prev) => [{ ...assigned, customer_id: customer.id } as PortalRequest & { customer_id: string }, ...prev]);
      setUnassignedRequests((prev) => prev.filter((r) => r.id !== requestId));
    }

    setAssigningRequestId(null);
  };

  const openAssignEventPanel = async () => {
    setShowAssignEvent(true);
    setEventSearch("");
    setLoadingUnassignedEvents(true);

    const { data, error } = await supabase
      .from("portal_events")
      .select("*")
      .is("customer_id", null)
      .is("deleted_at", null)
      .order("event_date", { ascending: true });

    if (!error) setUnassignedEvents(data || []);
    else console.error(error);

    setLoadingUnassignedEvents(false);
  };

  const assignEvent = async (eventId: string) => {
    if (!customer) return;
    setAssigningEventId(eventId);

    const { error } = await supabase
      .from("portal_events")
      .update({
        customer_id: customer.id,
        customer_name: name.trim() || customer.name,
        firma: firma.trim() || null,
      })
      .eq("id", eventId);

    if (error) {
      console.error("ASSIGN EVENT ERROR:", error);
      setAssigningEventId(null);
      return;
    }

    const assigned = unassignedEvents.find((e) => e.id === eventId);
    if (assigned) {
      setEvents((prev) => [...prev, assigned]);
      setUnassignedEvents((prev) => prev.filter((e) => e.id !== eventId));
    }

    setAssigningEventId(null);
  };

  const filteredUnassignedRequests = unassignedRequests.filter((r) => {
    if (!requestSearch) return true;
    const q = requestSearch.toLowerCase();
    return (
      r.name?.toLowerCase().includes(q) ||
      r.email?.toLowerCase().includes(q) ||
      r.firma?.toLowerCase().includes(q) ||
      r.ort?.toLowerCase().includes(q) ||
      r.anlass?.toLowerCase().includes(q)
    );
  });

  const filteredUnassignedEvents = unassignedEvents.filter((e) => {
    if (!eventSearch) return true;
    const q = eventSearch.toLowerCase();
    return (
      e.title?.toLowerCase().includes(q) ||
      e.location?.toLowerCase().includes(q) ||
      e.format?.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return <div className="pt-28 text-center">Wird geladen…</div>;
  }

  if (isAdmin === false) {
    return <div className="pt-28 text-center">Kein Zugriff</div>;
  }

  if (!customer) {
    return <div className="pt-28 text-center">Kunde nicht gefunden</div>;
  }

  return (
    <AdminLayout
      title={name || customer.name || "Kunde"}
      subtitle="Alle zugehörigen Daten dieses Kunden im Überblick"
      actions={
        <button
          onClick={logout}
          className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" /> Abmelden
        </button>
      }
    >
      <div className="mb-6">
        <Link
          to="/admin/customers"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Kundenübersicht
        </Link>
      </div>

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 mb-8">
        <div className="p-6 rounded-2xl bg-muted/20 border border-border/30">
          <h2 className="font-display text-lg font-bold text-foreground mb-5">
            Kundendaten
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputCls}
              />
            </div>

            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                Firma
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={firma}
                  onChange={(e) => setFirma(e.target.value)}
                  className="w-full rounded-xl bg-background/60 border border-border/30 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                E-Mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
              />
            </div>

            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                Telefon
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputCls}
              />
            </div>

            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                Kundennummer
              </label>
              <input
                value={kundennummer}
                onChange={(e) => setKundennummer(e.target.value)}
                className={inputCls}
              />
            </div>

            {message && (
              <div className="rounded-xl bg-accent/10 text-accent px-4 py-3 text-sm">
                {message}
              </div>
            )}

            <button
              onClick={saveCustomer}
              disabled={saving}
              className="btn-primary w-full justify-center disabled:opacity-60"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Speichert…" : "Kundendaten speichern"}
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl bg-muted/30 border border-border/30">
            <p className="font-display text-2xl font-bold text-foreground">
              {requests.filter((r) => !r.deleted_at).length}
            </p>
            <p className="font-sans text-xs text-muted-foreground mt-1">
              Anfragen
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-muted/30 border border-border/30">
            <p className="font-display text-2xl font-bold text-foreground">
              {events.filter((e) => !e.deleted_at).length}
            </p>
            <p className="font-sans text-xs text-muted-foreground mt-1">
              Events
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-muted/30 border border-border/30">
            <p className="font-display text-2xl font-bold text-foreground">
              {documents.length}
            </p>
            <p className="font-sans text-xs text-muted-foreground mt-1">
              Dokumente
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Anfragen */}
        <div className="p-6 rounded-2xl bg-muted/20 border border-border/30">
          <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
            <h2 className="font-display text-lg font-bold text-foreground">
              Anfragen
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (showAssignRequest) {
                    setShowAssignRequest(false);
                  } else {
                    openAssignRequestPanel();
                  }
                }}
                className="inline-flex items-center gap-1.5 font-sans text-xs text-muted-foreground hover:text-foreground border border-border/40 rounded-lg px-3 py-1.5 transition-colors"
              >
                <Link2 className="w-3.5 h-3.5" />
                Zuordnen
              </button>
              <Link
                to={`/admin/requests/new?customerId=${customer.id}`}
                className="inline-flex items-center gap-1.5 font-sans text-xs text-accent hover:text-accent/80 border border-accent/30 rounded-lg px-3 py-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Anfrage erstellen
              </Link>
            </div>
          </div>

          {/* Assign unlinked request panel */}
          {showAssignRequest && (
            <div className="mb-5 p-4 rounded-xl bg-background/40 border border-border/30">
              <p className="font-sans text-xs text-muted-foreground mb-3">
                Anfragen ohne Kundenzuordnung
              </p>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={requestSearch}
                  onChange={(e) => setRequestSearch(e.target.value)}
                  placeholder="Suche nach Name, E-Mail, Ort, Firma…"
                  className="w-full rounded-lg bg-background/60 border border-border/30 pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>

              {loadingUnassignedRequests ? (
                <p className="font-sans text-sm text-muted-foreground py-2">Lädt…</p>
              ) : filteredUnassignedRequests.length === 0 ? (
                <p className="font-sans text-sm text-muted-foreground py-2">
                  {requestSearch ? "Keine Treffer." : "Keine offenen Anfragen ohne Kundenzuordnung."}
                </p>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredUnassignedRequests.map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-lg bg-background/60 border border-border/20"
                    >
                      <div className="min-w-0">
                        <p className="font-sans text-sm font-medium text-foreground truncate">
                          {r.anlass || r.name || "Anfrage"}
                        </p>
                        <p className="font-sans text-xs text-muted-foreground mt-0.5">
                          {r.email}
                          {r.ort ? ` · ${r.ort}` : ""}
                          {r.datum
                            ? ` · ${new Date(r.datum).toLocaleDateString("de-DE")}`
                            : ""}
                        </p>
                      </div>
                      <button
                        onClick={() => assignRequest(r.id)}
                        disabled={assigningRequestId === r.id}
                        className="shrink-0 font-sans text-xs text-accent hover:text-accent/80 border border-accent/30 rounded-lg px-3 py-1.5 disabled:opacity-50 transition-colors"
                      >
                        {assigningRequestId === r.id ? "…" : "Zuordnen"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="space-y-3">
            {requests.filter((r) => !r.deleted_at).length === 0 ? (
              <p className="font-sans text-sm text-muted-foreground">
                Keine Anfragen vorhanden.
              </p>
            ) : (
              requests
                .filter((r) => !r.deleted_at)
                .map((request) => (
                  <div
                    key={request.id}
                    className="p-4 rounded-xl bg-background/60 border border-border/20"
                  >
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <p className="font-sans text-sm font-semibold text-foreground">
                          {request.anlass || "Anfrage"}
                        </p>
                        <p className="font-sans text-xs text-muted-foreground mt-1">
                          {new Date(request.created_at).toLocaleDateString("de-DE")}
                        </p>
                      </div>

                      <Link
                        to={`/admin/requests/${request.id}`}
                        className="text-sm text-accent hover:text-accent/80"
                      >
                        Öffnen
                      </Link>
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm text-muted-foreground mt-3">
                      {request.datum && (
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-accent" />
                          {new Date(request.datum).toLocaleDateString("de-DE")}
                        </span>
                      )}
                      {request.ort && (
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-accent" />
                          {request.ort}
                        </span>
                      )}
                      {request.gaeste && (
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-accent" />
                          {request.gaeste} Gäste
                        </span>
                      )}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Events */}
        <div className="p-6 rounded-2xl bg-muted/20 border border-border/30">
          <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
            <h2 className="font-display text-lg font-bold text-foreground">
              Events
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (showAssignEvent) {
                    setShowAssignEvent(false);
                  } else {
                    openAssignEventPanel();
                  }
                }}
                className="inline-flex items-center gap-1.5 font-sans text-xs text-muted-foreground hover:text-foreground border border-border/40 rounded-lg px-3 py-1.5 transition-colors"
              >
                <Link2 className="w-3.5 h-3.5" />
                Zuordnen
              </button>
              <Link
                to={`/admin/events/new?customerId=${customer.id}`}
                className="inline-flex items-center gap-1.5 font-sans text-xs text-accent hover:text-accent/80 border border-accent/30 rounded-lg px-3 py-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Event erstellen
              </Link>
            </div>
          </div>

          {/* Assign unlinked event panel */}
          {showAssignEvent && (
            <div className="mb-5 p-4 rounded-xl bg-background/40 border border-border/30">
              <p className="font-sans text-xs text-muted-foreground mb-3">
                Events ohne Kundenzuordnung
              </p>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={eventSearch}
                  onChange={(e) => setEventSearch(e.target.value)}
                  placeholder="Suche nach Titel, Ort, Format…"
                  className="w-full rounded-lg bg-background/60 border border-border/30 pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>

              {loadingUnassignedEvents ? (
                <p className="font-sans text-sm text-muted-foreground py-2">Lädt…</p>
              ) : filteredUnassignedEvents.length === 0 ? (
                <p className="font-sans text-sm text-muted-foreground py-2">
                  {eventSearch ? "Keine Treffer." : "Keine Events ohne Kundenzuordnung."}
                </p>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredUnassignedEvents.map((e) => (
                    <div
                      key={e.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-lg bg-background/60 border border-border/20"
                    >
                      <div className="min-w-0">
                        <p className="font-sans text-sm font-medium text-foreground truncate">
                          {e.title}
                        </p>
                        <p className="font-sans text-xs text-muted-foreground mt-0.5">
                          {formatEventStatusLabel(e.status)}
                          {e.event_date
                            ? ` · ${new Date(e.event_date).toLocaleDateString("de-DE")}`
                            : ""}
                          {e.location ? ` · ${e.location}` : ""}
                        </p>
                      </div>
                      <button
                        onClick={() => assignEvent(e.id)}
                        disabled={assigningEventId === e.id}
                        className="shrink-0 font-sans text-xs text-accent hover:text-accent/80 border border-accent/30 rounded-lg px-3 py-1.5 disabled:opacity-50 transition-colors"
                      >
                        {assigningEventId === e.id ? "…" : "Zuordnen"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="space-y-3">
            {events.filter((e) => !e.deleted_at).length === 0 ? (
              <p className="font-sans text-sm text-muted-foreground">
                Keine Events vorhanden.
              </p>
            ) : (
              events
                .filter((e) => !e.deleted_at)
                .map((event) => (
                  <div
                    key={event.id}
                    className="p-4 rounded-xl bg-background/60 border border-border/20"
                  >
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <p className="font-sans text-sm font-semibold text-foreground">
                          {event.title}
                        </p>
                        <p className="font-sans text-xs text-muted-foreground mt-1">
                          {formatEventStatusLabel(event.status)}
                        </p>
                      </div>

                      <Link
                        to={`/admin/events/${event.id}`}
                        className="text-sm text-accent hover:text-accent/80"
                      >
                        Öffnen
                      </Link>
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm text-muted-foreground mt-3">
                      {event.event_date && (
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-accent" />
                          {new Date(event.event_date).toLocaleDateString("de-DE")}
                        </span>
                      )}
                      {event.location && (
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-accent" />
                          {event.location}
                        </span>
                      )}
                      {event.format && (
                        <span className="flex items-center gap-2">
                          <Theater className="w-4 h-4 text-accent" />
                          {event.format}
                        </span>
                      )}
                      {event.guests && (
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-accent" />
                          {event.guests} Gäste
                        </span>
                      )}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Dokumente */}
        <div className="p-6 rounded-2xl bg-muted/20 border border-border/30">
          <h2 className="font-display text-lg font-bold text-foreground mb-5">
            Dokumente
          </h2>

          <div className="space-y-3">
            {documents.length === 0 ? (
              <p className="font-sans text-sm text-muted-foreground">
                Keine Dokumente vorhanden.
              </p>
            ) : (
              documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-xl bg-background/60 border border-border/20"
                >
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-accent" />
                      <div>
                        <p className="font-sans text-sm font-semibold text-foreground">
                          {doc.name}
                        </p>
                        <p className="font-sans text-xs text-muted-foreground mt-1">
                          {doc.type || "Dokument"} ·{" "}
                          {new Date(doc.created_at).toLocaleDateString("de-DE")}
                        </p>
                      </div>
                    </div>

                    {doc.file_url && (
                      <a
                        href={doc.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-accent hover:text-accent/80"
                      >
                        Öffnen
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCustomerDetail;
