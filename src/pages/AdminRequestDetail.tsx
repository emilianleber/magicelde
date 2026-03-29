import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  Calendar,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Users,
  Theater,
  Save,
  LogOut,
  Sparkles,
  Building2,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";
import AdminLayout from "@/components/admin/AdminLayout";

interface PortalRequest {
  id: string;
  created_at: string;
  status: string | null;
  name: string;
  firma?: string | null;
  email: string;
  phone: string | null;
  anlass: string | null;
  datum: string | null;
  uhrzeit?: string | null;
  ort: string | null;
  gaeste: number | null;
  format: string | null;
  nachricht: string | null;
  notizen_intern: string | null;
  event_id?: string | null;
}

const inputCls =
  "w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

const cardCls = "p-6 rounded-2xl bg-muted/20 border border-border/30";

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
  const [name, setName] = useState("");
  const [firma, setFirma] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [anlass, setAnlass] = useState("");
  const [datum, setDatum] = useState("");
  const [uhrzeit, setUhrzeit] = useState("");
  const [ort, setOrt] = useState("");
  const [gaeste, setGaeste] = useState("");
  const [format, setFormat] = useState("");
  const [nachricht, setNachricht] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        navigate("/kundenportal/login");
        return;
      }

      setUser(session.user);

      const { data: admin } = await supabase
        .from("portal_admins")
        .select("*")
        .eq("email", session.user.email)
        .maybeSingle();

      setIsAdmin(!!admin);
    };

    checkUser();
  }, [navigate]);

  useEffect(() => {
    if (!user?.email || !id) return;

    const load = async () => {
      const { data } = await supabase
        .from("portal_requests")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setRequest(data);
        setStatus(data.status || "neu");
        setName(data.name || "");
        setFirma(data.firma || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setAnlass(data.anlass || "");
        setDatum(data.datum || "");
        setUhrzeit(data.uhrzeit || "");
        setOrt(data.ort || "");
        setGaeste(data.gaeste?.toString() || "");
        setFormat(data.format || "");
        setNachricht(data.nachricht || "");
        setInternalNotes(data.notizen_intern || "");
      }

      setLoading(false);
    };

    load();
  }, [user, id]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/kundenportal/login");
  };

  const saveChanges = async () => {
    if (!request) return;

    setSaving(true);

    await supabase
      .from("portal_requests")
      .update({
        status,
        name,
        firma,
        email,
        phone,
        anlass,
        datum,
        uhrzeit,
        ort,
        gaeste: gaeste ? Number(gaeste) : null,
        format,
        nachricht,
        notizen_intern: internalNotes,
      })
      .eq("id", request.id);

    setMessage("Gespeichert");
    setSaving(false);
  };

  const convertToEvent = async () => {
    if (!request) return;

    setConverting(true);

    const { data: newEvent } = await supabase
      .from("portal_events")
      .insert({
        request_id: request.id,
        event_type: anlass,
        customer_name: name,
        firma: firma || null,
        title: anlass || "Event",
        event_date: datum,
        start_time: uhrzeit || null,
        location: ort,
        format,
        guests: gaeste ? Number(gaeste) : null,
        status: "in_planung",
      })
      .select("*")
      .single();

    await supabase
      .from("portal_requests")
      .update({
        event_id: newEvent?.id,
        status: "bestätigt",
      })
      .eq("id", request.id);

    setMessage("Zu Event konvertiert");
    setConverting(false);
  };

  if (loading) return <div className="pt-28 text-center">Wird geladen…</div>;
  if (isAdmin === false) return <div className="pt-28 text-center">Kein Zugriff</div>;

  return (
    <AdminLayout
      title={`${anlass || "Anfrage"} · ${firma || name}`}
      subtitle="Anfrage bearbeiten und verwalten"
      actions={
        <button onClick={logout} className="text-sm">
          <LogOut className="w-4 h-4" /> Abmelden
        </button>
      }
    >
      <Link to="/admin/requests" className="text-sm mb-4 inline-block">
        ← Zurück
      </Link>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">

        {/* LEFT */}
        <div className="space-y-6">

          <div className={cardCls}>
            <h2 className="font-bold mb-4">Kontaktdaten</h2>

            <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className={inputCls}/>
            <input value={firma} onChange={e => setFirma(e.target.value)} placeholder="Firma" className={inputCls}/>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-Mail" className={inputCls}/>
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Telefon" className={inputCls}/>
          </div>

          <div className={cardCls}>
            <h2 className="font-bold mb-4">Event-Daten</h2>

            <input value={anlass} onChange={e => setAnlass(e.target.value)} placeholder="Anlass" className={inputCls}/>
            <input type="date" value={datum} onChange={e => setDatum(e.target.value)} className={inputCls}/>
            <input type="time" value={uhrzeit} onChange={e => setUhrzeit(e.target.value)} className={inputCls}/>
            <input value={ort} onChange={e => setOrt(e.target.value)} placeholder="Ort" className={inputCls}/>
            <input value={gaeste} onChange={e => setGaeste(e.target.value)} placeholder="Gäste" className={inputCls}/>
          </div>

          <div className={cardCls}>
            <textarea value={nachricht} onChange={e => setNachricht(e.target.value)} placeholder="Nachricht" className={inputCls}/>
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          <div className={cardCls}>
            <button onClick={saveChanges} className="btn-primary w-full">
              <Save className="w-4 h-4 mr-2"/> Speichern
            </button>

            {!request?.event_id && (
              <button onClick={convertToEvent} className="btn-secondary w-full mt-3">
                <Sparkles className="w-4 h-4 mr-2"/> Zu Event konvertieren
              </button>
            )}

            {message && <p className="mt-3">{message}</p>}
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminRequestDetail;