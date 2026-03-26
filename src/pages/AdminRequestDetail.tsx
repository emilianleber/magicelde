import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
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

      const { data } = await supabase
        .from("portal_requests")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setRequest(data);
        setStatus(data.status || "neu");
        setInternalNotes(data.notizen_intern || "");
      }

      setLoading(false);
    };

    loadData();
  }, [user, id]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/kundenportal/login");
  };

  // 🔥 MAIL FUNCTION
  const sendStatusMail = async (recordId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) return;

    await fetch(
      "https://rjhvqctjtgfpxzhnrozt.supabase.co/functions/v1/admin-send-status-mail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          type: "request",
          recordId,
        }),
      }
    );
  };

  // 💾 SAVE
  const saveChanges = async () => {
    if (!request) return;

    setSaving(true);
    setMessage("");

    const previousStatus = request.status;

    const { error } = await supabase
      .from("portal_requests")
      .update({
        status,
        notizen_intern: internalNotes,
      })
      .eq("id", request.id);

    if (error) {
      setMessage("Fehler beim Speichern.");
    } else {
      setRequest({
        ...request,
        status,
        notizen_intern: internalNotes,
      });

      setMessage("Gespeichert.");

      if (previousStatus !== status) {
        await sendStatusMail(request.id);
      }
    }

    setSaving(false);
  };

  // 🚀 CONVERT
  const convertToEvent = async () => {
    if (!request) return;

    setConverting(true);
    setMessage("");

    try {
      const { data: customer } = await supabase
        .from("portal_customers")
        .select("*")
        .eq("email", request.email)
        .maybeSingle();

      let customerId = customer?.id;

      if (!customerId) {
        const { data: newCustomer } = await supabase
          .from("portal_customers")
          .insert({
            name: request.name,
            email: request.email,
          })
          .select("*")
          .single();

        customerId = newCustomer.id;
      }

      const { data: newEvent } = await supabase
        .from("portal_events")
        .insert({
          customer_id: customerId,
          title: request.anlass || "Event",
          event_date: request.datum,
          location: request.ort,
          guests: request.gaeste,
          format: request.format,
          status: "in_planung",
          request_id: request.id,
        })
        .select("*")
        .single();

      await supabase
        .from("portal_requests")
        .update({
          event_id: newEvent.id,
          status: "bestätigt",
        })
        .eq("id", request.id);

      setRequest({
        ...request,
        event_id: newEvent.id,
        status: "bestätigt",
      });

      await sendStatusMail(request.id);

      setMessage("Event erstellt 🎉");
    } catch (err) {
      console.error(err);
      setMessage("Fehler beim Konvertieren.");
    }

    setConverting(false);
  };

  if (loading || isAdmin === null) return <div>Loading...</div>;
  if (!isAdmin) return <div>Kein Zugriff</div>;

  return (
    <PageLayout>
      <div className="p-10 max-w-3xl mx-auto space-y-6">
        <button onClick={() => navigate(-1)}>← Zurück</button>

        <h1 className="text-2xl font-bold">{request?.anlass}</h1>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {statusOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        <textarea
          value={internalNotes}
          onChange={(e) => setInternalNotes(e.target.value)}
          placeholder="Interne Notizen"
        />

        <button onClick={saveChanges}>
          <Save /> Speichern
        </button>

        {!request?.event_id && (
          <button onClick={convertToEvent}>
            <Sparkles /> Zu Event konvertieren
          </button>
        )}

        {message && <p>{message}</p>}
      </div>
    </PageLayout>
  );
};

export default AdminRequestDetail;
