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
      } else if (data) {
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

  if (loading) {
    return (
      <PageLayout>
        <section className="min-h-screen pt-28 pb-16 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground font-sans">
            Wird geladen…
          </div>
        </section>
      </PageLayout>
    );
  }

  if (isAdmin === false) {
    return (
      <PageLayout>
        <section className="min-h-screen pt-28 pb-16">
          <div className="container px-6 max-w-3xl mx-auto">
            <div className="p-10 rounded-3xl bg-muted/20 border border-border/30 text-center">
              <h1 className="font-display text-2xl font-bold text-foreground mb-3">
                Kein Zugriff
              </h1>
              <p className="font-sans text-sm text-muted-foreground">
                Dein Account ist nicht als Admin freigegeben.
              </p>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  if (!request) {
    return (
      <PageLayout>
        <section className="min-h-screen pt-28 pb-16">
          <div className="container px-6 max-w-3xl mx-auto">
            <div className="p-10 rounded-3xl bg-muted/20 border border-border/30 text-center">
              <h1 className="font-display text-2xl font-bold text-foreground mb-3">
                Anfrage nicht gefunden
              </h1>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="min-h-screen pt-28 pb-16">
        <div className="container px-6 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <Link
                to="/admin/requests"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-3"
              >
                <ArrowLeft className="w-4 h-4" />
                Zurück zur Übersicht
              </Link>

              <p className="font-sans text-xs text-muted-foreground uppercase tracking-widest mb-1">
                Admin / CRM
              </p>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Anfrage von {request.name}
              </h1>
              <p className="font-sans text-sm text-muted-foreground mt-1">
                Eingegangen am{" "}
                {new Date(request.created_at).toLocaleDateString("de-DE")}
              </p>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" /> Abmelden
            </button>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-muted/20 border border-border/30">
                <h2 className="font-display text-lg font-bold text-foreground mb-5">
                  Anfrage-Details
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                    <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                      Name
                    </p>
                    <p className="font-sans text-sm text-foreground font-medium">
                      {request.name}
                    </p>
                  </div>

                  <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                    <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                      E-Mail
                    </p>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-accent" />
                      <p className="font-sans text-sm text-foreground">{request.email}</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                    <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                      Telefon
                    </p>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-accent" />
                      <p className="font-sans text-sm text-foreground">
                        {request.phone || "Nicht angegeben"}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                    <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                      Anlass
                    </p>
                    <p className="font-sans text-sm text-foreground">
                      {request.anlass || "Nicht angegeben"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                    <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                      Datum
                    </p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      <p className="font-sans text-sm text-foreground">
                        {request.datum
                          ? new Date(request.datum).toLocaleDateString("de-DE")
                          : "Nicht angegeben"}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                    <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                      Ort
                    </p>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      <p className="font-sans text-sm text-foreground">
                        {request.ort || "Nicht angegeben"}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                    <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                      Gäste
                    </p>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-accent" />
                      <p className="font-sans text-sm text-foreground">
                        {request.gaeste ?? "Nicht angegeben"}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                    <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                      Format
                    </p>
                    <div className="flex items-center gap-2">
                      <Theater className="w-4 h-4 text-accent" />
                      <p className="font-sans text-sm text-foreground">
                        {request.format || "Nicht angegeben"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-background/60 border border-border/20 p-4">
                  <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                    Nachricht
                  </p>
                  <p className="font-sans text-sm text-foreground leading-relaxed whitespace-pre-line">
                    {request.nachricht || "Keine zusätzliche Nachricht angegeben."}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-muted/20 border border-border/30">
                <h2 className="font-display text-lg font-bold text-foreground mb-5">
                  Bearbeitung
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block font-sans text-sm font-medium text-foreground mb-2">
                      Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20"
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    <p className="font-sans text-xs text-muted-foreground mt-2">
                      Aktuell: {formatStatusLabel(request.status)}
                    </p>
                  </div>

                  <div>
                    <label className="block font-sans text-sm font-medium text-foreground mb-2">
                      Interne Notizen
                    </label>
                    <textarea
                      value={internalNotes}
                      onChange={(e) => setInternalNotes(e.target.value)}
                      rows={8}
                      placeholder="Hier kannst du interne Informationen, Rückrufe, Absprachen oder nächste Schritte festhalten …"
                      className="w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
                    />
                  </div>

                  {message && (
                    <div className="rounded-xl bg-accent/10 text-accent px-4 py-3 text-sm">
                      {message}
                    </div>
                  )}

                  <button
                    onClick={saveChanges}
                    disabled={saving}
                    className="btn-primary w-full justify-center disabled:opacity-60"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? "Speichert…" : "Änderungen speichern"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AdminRequestDetail;
