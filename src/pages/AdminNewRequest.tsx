import { useState, useEffect } from "react";
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

      if (!admin) {
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
      }
    };

    checkUser();
  }, [navigate]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createRequest = async () => {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("portal_requests").insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      anlass: form.anlass || null,
      datum: form.datum || null,
      ort: form.ort || null,
      gaeste: form.gaeste ? Number(form.gaeste) : null,
      format: form.format || null,
      nachricht: form.nachricht || null,
      source: form.source,
      status: "neu",
    });

    if (error) {
      console.error(error);
      setMessage("Fehler beim Speichern.");
    } else {
      setMessage("Anfrage erstellt.");

      // später: Mail triggern
      navigate("/admin/requests");
    }

    setLoading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/kundenportal/login");
  };

  if (isAdmin === false) {
    return <PageLayout><div className="pt-32 text-center">Kein Zugriff</div></PageLayout>;
  }

  return (
    <PageLayout>
      <section className="min-h-screen pt-28 pb-16">
        <div className="container px-6 max-w-3xl mx-auto">

          <div className="flex justify-between mb-8">
            <h1 className="text-2xl font-bold">Neue Anfrage</h1>
            <button onClick={logout}><LogOut /></button>
          </div>

          <div className="space-y-4">

            {["name","email","phone","anlass","datum","ort","gaeste","format"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field}
                value={(form as any)[field]}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
            ))}

            <textarea
              name="nachricht"
              placeholder="Nachricht"
              value={form.nachricht}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />

            <select name="source" value={form.source} onChange={handleChange}>
              <option value="telefon">Telefon</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="email">E-Mail</option>
              <option value="instagram">Instagram</option>
              <option value="website">Website</option>
            </select>

            <button onClick={createRequest} className="btn-primary">
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
