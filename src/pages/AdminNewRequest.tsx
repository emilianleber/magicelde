import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/landing/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import { Save, LogOut } from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";

const AdminNewRequest = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    anlass: "",
    datum: "",
    ort: "",
    gaeste: "",
    format: "",
    nachricht: "",
    source: "telefon",
  });

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/kundenportal/login");
        return;
      }

      setUser(session.user);

      const { data: admin, error } = await supabase
        .from("portal_admins")
        .select("*")
        .eq("email", session.user.email)
        .maybeSingle();

      if (error || !admin) {
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
      }
    };

    checkUser();
  }, [navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const createRequest = async () => {
    setLoading(true);
    setMessage("");

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error("Keine Admin-Session gefunden.");
      }

      const response = await fetch(
        "https://rjhvqctjtgfpxzhnrozt.supabase.co/functions/v1/admin-create-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim() || null,
            anlass: form.anlass.trim() || null,
            datum: form.datum.trim() || null,
            ort: form.ort.trim() || null,
            gaeste: form.gaeste ? Number(form.gaeste) : null,
            format: form.format.trim() || null,
            nachricht: form.nachricht.trim() || null,
            source: form.source || "manuell",
          }),
        }
      );

      let data: { error?: string; success?: boolean } | null = null;

      try {
        data = await response.json();
      } catch {
        throw new Error("Ungültige Server-Antwort.");
      }

      if (!response.ok) {
        throw new Error(data?.error || "Fehler beim Erstellen der Anfrage.");
      }

      setMessage("Anfrage erstellt und Kundenmail versendet.");
      navigate("/admin/requests");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Fehler beim Speichern.";
      console.error("CREATE REQUEST ERROR:", err);
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/kundenportal/login");
  };

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

  return (
    <PageLayout>
      <section className="min-h-screen pt-28 pb-16">
        <div className="container px-6 max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Neue Anfrage</h1>
            <button onClick={logout} className="text-muted-foreground hover:text-foreground">
              <LogOut />
            </button>
          </div>

          <div className="space-y-4">
            <input
              name="name"
              placeholder="Name *"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />

            <input
              name="email"
              placeholder="E-Mail *"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />

            <input
              name="phone"
              placeholder="Telefon"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />

            <input
              name="anlass"
              placeholder="Anlass"
              value={form.anlass}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />

            <input
              name="datum"
              placeholder="Datum"
              value={form.datum}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />

            <input
              name="ort"
              placeholder="Ort"
              value={form.ort}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />

            <input
              name="gaeste"
              placeholder="Gäste"
              value={form.gaeste}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />

            <input
              name="format"
              placeholder="Format"
              value={form.format}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />

            <textarea
              name="nachricht"
              placeholder="Nachricht"
              value={form.nachricht}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              rows={5}
            />

            <select
              name="source"
              value={form.source}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            >
              <option value="telefon">Telefon</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="email">E-Mail</option>
              <option value="instagram">Instagram</option>
              <option value="website">Website</option>
              <option value="manuell">Manuell</option>
            </select>

            <button onClick={createRequest} className="btn-primary" disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Speichert…" : "Anfrage erstellen"}
            </button>

            {message && <p>{message}</p>}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AdminNewRequest;
