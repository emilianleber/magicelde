// src/pages/AdminRequestDetail.tsx

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

  if (loading) return <PageLayout>Wird geladen…</PageLayout>;
  if (isAdmin === false) return <PageLayout>Kein Zugriff</PageLayout>;

  return (
    <PageLayout>
      <section className="pt-28 pb-16">
        <div className="container max-w-3xl mx-auto space-y-4">

          <Link to="/admin/requests" className="text-sm">← Zurück</Link>

          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="input"/>
          <input value={firma} onChange={e => setFirma(e.target.value)} placeholder="Firma" className="input"/>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="input"/>
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Telefon" className="input"/>
          <input value={anlass} onChange={e => setAnlass(e.target.value)} placeholder="Anlass" className="input"/>

          <input type="date" value={datum} onChange={e => setDatum(e.target.value)} className="input"/>

          {/* 🔥 Uhrzeit */}
          <input type="time" value={uhrzeit} onChange={e => setUhrzeit(e.target.value)} className="input"/>

          <input value={ort} onChange={e => setOrt(e.target.value)} placeholder="Ort" className="input"/>

          <button onClick={saveChanges} className="btn-primary">
            {saving ? "Speichert…" : "Speichern"}
          </button>

          {!request?.event_id && (
            <button onClick={convertToEvent} className="btn-secondary">
              {converting ? "..." : "Zu Event"}
            </button>
          )}

          {message && <p>{message}</p>}
        </div>
      </section>
    </PageLayout>
  );
};

export default AdminRequestDetail;