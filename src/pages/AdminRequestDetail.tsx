import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Clock3,
  FileText,
  LogOut,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Save,
  Sparkles,
  Theater,
  Upload,
  Users,
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
  customer_id?: string | null;
}

interface PortalCustomer {
  id: string;
  name: string | null;
  firma?: string | null;
  email: string | null;
  phone?: string | null;
  kundennummer?: string | null;
}

interface PortalDocument {
  id: string;
  name: string;
  type: string | null;
  file_url: string | null;
  created_at: string;
  customer_id?: string | null;
  request_id?: string | null;
}

const statusOptions = [
  { value: "neu", label: "Neu" },
  { value: "in_bearbeitung", label: "In Bearbeitung" },
  { value: "details_besprechen", label: "Details besprechen" },
  { value: "angebot_gesendet", label: "Angebot gesendet" },
  { value: "warte_auf_kunde", label: "Warte auf Kunde" },
  { value: "bestätigt", label: "Bestätigt" },
  { value: "abgelehnt", label: "Abgelehnt" },
  { value: "archiviert", label: "Archiviert" },
];

const formatOptions = [
  { value: "", label: "Format wählen" },
  { value: "closeup", label: "Close-Up" },
  { value: "buehnenshow", label: "Bühnenshow" },
  { value: "walking_act", label: "Walking Act" },
  { value: "magic_dinner", label: "Magic Dinner" },
  { value: "kombination", label: "Kombination" },
  { value: "beratung", label: "Noch offen / Beratung" },
];

const formatStatusLabel = (status?: string | null) => {
  switch (status) {
    case "neu":
      return "Neu";
    case "in_bearbeitung":
      return "In Bearbeitung";
    case "details_besprechen":
      return "Details besprechen";
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

const formatStatusClasses = (status?: string | null) => {
  switch (status) {
    case "neu":
      return "text-accent bg-accent/10";
    case "in_bearbeitung":
    case "details_besprechen":
    case "angebot_gesendet":
    case "warte_auf_kunde":
      return "text-foreground bg-muted";
    case "bestätigt":
      return "text-green-700 bg-green-100";
    case "abgelehnt":
      return "text-destructive bg-destructive/10";
    case "archiviert":
      return "text-muted-foreground bg-muted";
    default:
      return "text-muted-foreground bg-muted";
  }
};

const inputCls =
  "w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

const cardCls = "p-6 rounded-2xl bg-muted/20 border border-border/30";

const readOnlyCardCls =
  "rounded-xl bg-background/60 border border-border/20 p-4";

const AdminRequestDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [converting, setConverting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [request, setRequest] = useState<PortalRequest | null>(null);
  const [customer, setCustomer] = useState<PortalCustomer | null>(null);
  const [documents, setDocuments] = useState<PortalDocument[]>([]);

  const [status, setStatus] = useState("neu");
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

      if (!data) return;

      setRequest(data);
      setStatus(data.status || "neu");
      setAnlass(data.anlass || "");
      setDatum(data.datum || "");
      setUhrzeit(data.uhrzeit || "");
      setOrt(data.ort || "");
      setGaeste(data.gaeste?.toString() || "");
      setFormat(data.format || "");
      setNachricht(data.nachricht || "");
      setInternalNotes(data.notizen_intern || "");

      // Kunde laden
      if (data.customer_id) {
        const { data: cust } = await supabase
          .from("portal_customers")
          .select("*")
          .eq("id", data.customer_id)
          .single();

        setCustomer(cust || null);
      }

      // Dokumente laden
      const { data: docs } = await supabase
        .from("portal_documents")
        .select("*")
        .eq("request_id", data.id)
        .order("created_at", { ascending: false });

      setDocuments(docs || []);

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

    setIsEditing(false);
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
        customer_id: request.customer_id,
        event_type: anlass,
        title: `${anlass} · ${customer?.firma || customer?.name}`,
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

    setMessage("Event erstellt");
    setConverting(false);
  };

  const handleUpload = async (file: File) => {
    if (!request) return;

    setUploading(true);

    const filePath = `requests/${request.id}/${Date.now()}-${file.name}`;

    await supabase.storage
      .from("documents")
      .upload(filePath, file);

    const { data } = supabase.storage
      .from("documents")
      .getPublicUrl(filePath);

    await supabase.from("portal_documents").insert({
      name: file.name,
      file_url: data.publicUrl,
      type: "angebot",
      request_id: request.id,
      customer_id: request.customer_id,
    });

    location.reload();
  };

  if (loading) return <div className="pt-28 text-center">Wird geladen…</div>;
  if (isAdmin === false) return <div className="pt-28 text-center">Kein Zugriff</div>;

  return (
    <AdminLayout
      title={`${anlass || "Anfrage"} · ${customer?.firma || customer?.name}`}
      subtitle="Anfrage verwalten"
      actions={
        <button onClick={() => supabase.auth.signOut()}>
          <LogOut className="w-4 h-4" />
        </button>
      }
    >
      <Link to="/admin/requests" className="text-sm mb-4 inline-block">
        ← Zurück
      </Link>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">

        {/* LEFT */}
        <div className="space-y-6">

          {/* Kunde */}
          <div className={cardCls}>
            <h2 className="font-bold mb-4">Kunde</h2>

            <div className={readOnlyCardCls}>
              <p>{customer?.name}</p>
              <p className="text-muted-foreground text-sm">{customer?.firma}</p>
              <p className="text-sm">{customer?.email}</p>
              <p className="text-sm">{customer?.phone}</p>

              <Link
                to={`/admin/customers/${customer?.id}`}
                className="text-accent text-sm mt-2 inline-block"
              >
                Kundenkonto öffnen →
              </Link>
            </div>
          </div>

          {/* Anfrage */}
          <div className={cardCls}>
            <div className="flex justify-between mb-4">
              <h2 className="font-bold">Anfrage</h2>

              {!isEditing && (
                <button onClick={() => setIsEditing(true)}>
                  <Pencil className="w-4 h-4" />
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-3">
                <input value={anlass} onChange={e => setAnlass(e.target.value)} className={inputCls}/>
                <input type="date" value={datum} onChange={e => setDatum(e.target.value)} className={inputCls}/>
                <input type="time" value={uhrzeit} onChange={e => setUhrzeit(e.target.value)} className={inputCls}/>
                <input value={ort} onChange={e => setOrt(e.target.value)} className={inputCls}/>
                <input value={gaeste} onChange={e => setGaeste(e.target.value)} className={inputCls}/>

                <select value={format} onChange={e => setFormat(e.target.value)} className={inputCls}>
                  {formatOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>

                <textarea value={nachricht} onChange={e => setNachricht(e.target.value)} className={inputCls}/>
              </div>
            ) : (
              <div className="space-y-2 text-sm">
                <p>{anlass}</p>
                <p>{datum}</p>
                <p>{uhrzeit || "Ganztägig"}</p>
                <p>{ort}</p>
                <p>{gaeste} Gäste</p>
              </div>
            )}
          </div>

          {/* Dokumente */}
          <div className={cardCls}>
            <h2 className="font-bold mb-4">Dokumente</h2>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary mb-4"
            >
              <Upload className="w-4 h-4 mr-2" />
              Angebot / Info hochladen
            </button>

            <div className="space-y-2">
              {documents.map(doc => (
                <a key={doc.id} href={doc.file_url || "#"} target="_blank">
                  {doc.name}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          <div className={cardCls}>
            <h2 className="font-bold mb-3">Status</h2>

            <select value={status} onChange={e => setStatus(e.target.value)} className={inputCls}>
              {statusOptions.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>

            <div className="mt-4">
              <textarea
                value={internalNotes}
                onChange={e => setInternalNotes(e.target.value)}
                placeholder="Interne Notizen"
                className={inputCls}
              />
            </div>

            <button onClick={saveChanges} className="btn-primary w-full mt-4">
              <Save className="w-4 h-4 mr-2" />
              Speichern
            </button>

            {!request?.event_id && (
              <button onClick={convertToEvent} className="btn-secondary w-full mt-3">
                <Sparkles className="w-4 h-4 mr-2"/>
                Zu Event konvertieren
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