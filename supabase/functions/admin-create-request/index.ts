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

      const res = await fetch(
        "https://rjhvqctjtgfpxzhnrozt.supabase.co/functions/v1/admin-create-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
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
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Fehler beim Erstellen der Anfrage.");
      }

      setMessage("Anfrage erstellt und Kundenmail versendet.");
      navigate("/admin/requests");
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || "Fehler beim Speichern.");
    }

    setLoading(false);
  };
