/**
 * Zentraler Helper für alle Lead-Capturing-Formulare.
 *
 * Schickt Payload an Supabase-Edge-Function `create-portal-request`, die
 * den Eintrag in die DB schreibt + Admin-Mail (Resend) + Kunden-Bestätigung
 * verschickt. Used by: Buchung, Newsletter (Tickets/Blog), Chatbot,
 * ShowPlanerModal, MagicDinnerSummerEdition.
 */

export type InquiryPayload = {
  anrede?: string;
  vorname?: string;
  nachname?: string;
  name?: string;
  firma?: string | null;
  email: string;
  phone?: string;
  anlass: string;
  datum?: string;
  ort?: string;
  gaeste?: number | null;
  format?: string;
  nachricht?: string;
};

const ENDPOINT =
  "https://rjhvqctjtgfpxzhnrozt.supabase.co/functions/v1/create-portal-request";

export async function sendInquiry(payload: InquiryPayload): Promise<void> {
  // Edge-Function erwartet "name" — wenn vorname+nachname kommt, kombinieren
  const body: Record<string, unknown> = {
    ...payload,
    name: payload.name || `${payload.vorname ?? ""} ${payload.nachname ?? ""}`.trim(),
  };

  const publishableKey = (import.meta as { env: Record<string, string> }).env
    .VITE_SUPABASE_PUBLISHABLE_KEY;

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Versand fehlgeschlagen (${res.status})`);
  }
}
