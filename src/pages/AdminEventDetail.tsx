import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageLayout from "@/components/landing/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  Calendar,
  LogOut,
  MapPin,
  Save,
  Theater,
  Users,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";

interface PortalEvent {
  id: string;
  title: string;
  event_date: string | null;
  location: string | null;
  status: string | null;
  format: string | null;
  guests: number | null;
  request_id?: string | null;
  customer_id?: string | null;
  details_status?: string | null;
  contract_status?: string | null;
  invoice_status?: string | null;
  notes?: string | null;
  created_at?: string | null;
}

const eventStatusOptions = [
  { value: "in_planung", label: "In Planung" },
  { value: "details_offen", label: "Details offen" },
  { value: "vertrag_gesendet", label: "Vertrag gesendet" },
  { value: "vertrag_bestaetigt", label: "Vertrag bestätigt" },
  { value: "rechnung_gesendet", label: "Rechnung gesendet" },
  { value: "rechnung_bezahlt", label: "Rechnung bezahlt" },
  { value: "event_erfolgt", label: "Event erfolgt" },
  { value: "storniert", label: "Storniert" },
];

const simpleStatusOptions = [
  { value: "offen", label: "Offen" },
  { value: "in_bearbeitung", label: "In Bearbeitung" },
  { value: "erledigt", label: "Erledigt" },
];

const AdminEventDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [event, setEvent] = useState<PortalEvent | null>(null);
  const [status, setStatus] = useState("in_planung");
  const [detailsStatus, setDetailsStatus] = useState("offen");
  const [contractStatus, setContractStatus] = useState("offen");
  const [invoiceStatus, setInvoiceStatus] = useState("offen");
    const [notes, setNotes] = useState("");
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

      const { data, error } = await supabase
        .from("portal_events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setEvent(data);
        setStatus(data.status || "in_planung");
        setDetailsStatus(data.details_status || "offen");
        setContractStatus(data.contract_status || "offen");
        setInvoiceStatus(data.invoice_status || "offen");
        setNotes(data.notes || "");
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
    if (!event) return;

    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("portal_events")
      .update({
        status,
        details_status: detailsStatus,
        contract_status: contractStatus,
        invoice_status: invoiceStatus,
        notes,
      })
      .eq("id", event.id);

    if (error) {
      console.error(error);
      setMessage("Fehler beim Speichern.");
    } else {
      setEvent({
        ...event,
        status,
        details_status: detailsStatus,
        contract_status: contractStatus,
        invoice_status: invoiceStatus,
        notes,
      });
      setMessage("Gespeichert.");
    }

    setSaving(false);
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

  if (!event) {
    return (
      <PageLayout>
        <section className="min-h-screen pt-28 pb-16 text-center">
          Event nicht gefunden
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="min-h-screen pt-28 pb-16">
        <div className="container px-6 max-w-5xl mx-auto">

          <Link to="/admin/events" className="flex items-center gap-2 text-sm mb-6">
            <ArrowLeft className="w-4 h-4" /> Zurück
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-bold">{event.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {event.event_date
                ? new Date(event.event_date).toLocaleDateString("de-DE")
                : "Kein Datum"}{" "}
              {event.location ? `· ${event.location}` : ""}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* LEFT */}
            <div className="space-y-4">
              <p><Calendar className="inline w-4 h-4 mr-2" />{event.event_date || "-"}</p>
              <p><MapPin className="inline w-4 h-4 mr-2" />{event.location || "-"}</p>
              <p><Theater className="inline w-4 h-4 mr-2" />{event.format || "-"}</p>
              <p><Users className="inline w-4 h-4 mr-2" />{event.guests || "-"}</p>
            </div>

            {/* RIGHT */}
            <div className="space-y-4">

              <div>
                <label>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  {eventStatusOptions.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label>Details</label>
                <select value={detailsStatus} onChange={(e) => setDetailsStatus(e.target.value)}>
                  {simpleStatusOptions.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label>Vertrag</label>
                <select value={contractStatus} onChange={(e) => setContractStatus(e.target.value)}>
                  {simpleStatusOptions.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label>Rechnung</label>
                <select value={invoiceStatus} onChange={(e) => setInvoiceStatus(e.target.value)}>
                  {simpleStatusOptions.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label>Notizen</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={5}
                />
              </div>

              <button onClick={saveChanges} className="btn-primary">
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Speichert…" : "Speichern"}
              </button>

              {message && <p className="text-sm">{message}</p>}

            </div>

          </div>

        </div>
      </section>
    </PageLayout>
  );
};

export default AdminEventDetail;
