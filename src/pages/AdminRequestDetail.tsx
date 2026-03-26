import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import PageLayout from "@/components/landing/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  Calendar,
  Mail,
  MapPin,
  Phone,
  Users,
  Theater,
  Save,
  LogOut,
  Sparkles,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";

interface PortalRequest {
  id: string;
  created_at: string;
  status: string | null;
  name: string;
  email: string;
  phone: string | null;
  anlass: string | null;
  datum: string | null;
  ort: string | null;
  gaeste: number | null;
  format: string | null;
  nachricht: string | null;
  notizen_intern: string | null;
  event_id?: string | null;
}

const statusOptions = [
  { value: "neu", label: "Neu" },
  { value: "in_bearbeitung", label: "In Bearbeitung" },
  { value: "angebot_gesendet", label: "Angebot gesendet" },
  { value: "warte_auf_kunde", label: "Warte auf Kunde" },
  { value: "bestätigt", label: "Bestätigt" },
  { value: "abgelehnt", label: "Abgelehnt" },
  { value: "archiviert", label: "Archiviert" },
];

const formatStatusLabel = (status?: string | null) => {
  switch (status) {
    case "neu":
      return "Neu";
    case "in_bearbeitung":
      return "In Bearbeitung";
    case "angebot_gesendet":
      return "Angebot gesendet";
    case "warte_auf_kunde":
      return "Warte auf Kunde";
    case "bestätigt":
      return "Bestätigt";
    case "abgelehnt":
      return "Abgelehnt";
    case "archiviert":
      return "Archiviert";
    default:
      return status || "Offen";
  }
};

const AdminRequestDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [converting, setConverting] = useState(false);
  const [request, setRequest] = useState<PortalRequest | null>(null);
  const [status, setStatus] = useState("neu");
  const [internalNotes, setInternalNotes] = useState("");
  const [message, setMessage] = useState("");

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

      const { data: adminEntry, error: adminError } = await supabase
        .from("portal_admins")
        .select("*")
        .eq("email", user.email)
        .maybeSingle();

      if (adminError || !adminEntry) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);

      const { data, error } = await supabase
        .from("portal_requests")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Fehler beim Laden der Anfrage:", error);
      if (error) {
        console.error("Fehler beim Laden der Anfrage:", error);
      } else if (data) {
        setRequest(data);
        setStatus(data.status || "neu");
        setInternalNotes(data.notizen_intern || "");
      }

      setLoading(false);
    };

    loadData();
  }, [user, id, navigate]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/kundenportal/login");
  };

  const saveChanges = async () => {
    if (!request) return;

    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("portal_requests")
      .update({
        status,
        notizen_intern: internalNotes,
      })
      .eq("id", request.id);

    if (error) {
      console.error(error);
      setMessage("Fehler beim Speichern.");
    } else {
      setMessage("Änderungen gespeichert.");
      setRequest({
        ...request,
        status,
        notizen_intern: internalNotes,
      });
    }

    setSaving(false);
  };

  const convertToEvent = async () => {
    if (!request) return;
    if (request.event_id) {
      setMessage("Diese Anfrage wurde bereits konvertiert.");
      return;
    }

    setConverting(true);
    setMessage("");

    try {
      let customerId: string;

      const { data: existingCustomer, error: customerError } = await supabase
        .from("portal_customers")
        .select("*")
        .eq("email", request.email)
        .maybeSingle();

      if (customerError) throw customerError;

      if (existingCustomer) {
        customerId = existingCustomer.id;
      } else {
        const { data: newCustomer, error: newCustomerError } = await supabase
          .from("portal_customers")
          .insert({
            email: request.email,
            name: request.name,
            kundennummer: "",
          })
          .select("*")
          .single();

        if (newCustomerError) throw newCustomerError;
        customerId = newCustomer.id;
      }

      const { data: newEvent, error: eventError } = await supabase
        .from("portal_events")
        .insert({
          customer_id: customerId,
          request_id: request.id,
          title: request.anlass || "Event",
          event_date: request.datum,
          location: request.ort,
          status: "in_planung",
          format: request.format,
          guests: request.gaeste,
        })
        .select("*")
        .single();

      if (eventError) throw eventError;

      const { error: requestUpdateError } = await supabase
        .from("portal_requests")
        .update({
          event_id: newEvent.id,
          status: "bestätigt",
        })
        .eq("id", request.id);

      if (requestUpdateError) throw requestUpdateError;

      setStatus("bestätigt");
      setRequest({
        ...request,
        event_id: newEvent.id,
        status: "bestätigt",
      });

      setMessage("Anfrage erfolgreich zu Event konvertiert.");
    } catch (err) {
      console.error(err);
      setMessage("Fehler beim Konvertieren.");
    } finally {
      setConverting(false);
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <section className="min-h-screen pt-28 pb-16 flex items-center justify-center">
          Wird geladen…
        </section>
      </PageLayout>
    );
  }

  if (isAdmin === false) {
    return (
      <PageLayout>
        <section className="min-h-screen pt-28 pb-16 text-center">
          Kein Zugriff
        </section>
      </PageLayout>
    );
  }

  if (!request) {
    return (
      <PageLayout>
        <section className="min-h-screen pt-28 pb-16 text-center">
          Anfrage nicht gefunden
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="min-h-screen pt-28 pb-16">
        <div className="container px-6 max-w-5xl mx-auto">

          <div className="mb-8">
            <Link to="/admin/requests" className="text-sm text-muted-foreground flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Zurück
            </Link>

            <h1 className="text-2xl font-bold mt-3">
              Anfrage von {request.name}
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="space-y-4">
              <p><Mail className="inline w-4 h-4 mr-2" />{request.email}</p>
              <p><Phone className="inline w-4 h-4 mr-2" />{request.phone || "-"}</p>
              <p><Calendar className="inline w-4 h-4 mr-2" />{request.datum || "-"}</p>
              <p><MapPin className="inline w-4 h-4 mr-2" />{request.ort || "-"}</p>
              <p><Users className="inline w-4 h-4 mr-2" />{request.gaeste || "-"}</p>
              <p><Theater className="inline w-4 h-4 mr-2" />{request.format || "-"}</p>
            </div>

            <div>
              <textarea
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                className="w-full p-3 border rounded"
                rows={6}
              />
            </div>

          </div>

          <div className="mt-6 space-y-4">

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="p-2 border rounded"
            >
              {statusOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>

            <button onClick={saveChanges} className="btn-primary">
              <Save className="w-4 h-4 mr-2" />
              Speichern
            </button>

            <button
              onClick={convertToEvent}
              disabled={!!request.event_id}
              className="btn-secondary"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {request.event_id ? "Schon konvertiert" : "Zu Event konvertieren"}
            </button>

            {message && <p className="text-sm">{message}</p>}

          </div>

        </div>
      </section>
    </PageLayout>
  );
};

export default AdminRequestDetail;
