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
          phone: form.phone?.trim() || null,
          anlass: form.anlass?.trim() || null,
          datum: form.datum?.trim() || null,
          ort: form.ort?.trim() || null,
          gaeste: form.gaeste ? Number(form.gaeste) : null,
          format: form.format?.trim() || null,
          nachricht: form.nachricht?.trim() || null,
          source: form.source || "manuell",
        }),
      }
    );

    let data: any = null;

    try {
      data = await response.json();
    } catch {
      throw new Error("Ungültige Server-Antwort.");
    }

    if (!response.ok) {
      throw new Error(data?.error || "Fehler beim Erstellen der Anfrage.");
    }

    console.log("ADMIN CREATE REQUEST RESPONSE:", data);

    setMessage("Anfrage erstellt und Kundenmail versendet.");
    navigate("/admin/requests");
  } catch (err: any) {
    console.error("CREATE REQUEST ERROR:", err);
    setMessage(err?.message || "Fehler beim Speichern.");
  } finally {
    setLoading(false);
  }
};
