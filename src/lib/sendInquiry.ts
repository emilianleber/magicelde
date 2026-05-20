/**
 * Zentraler Helper für alle Lead-Capturing-Formulare.
 *
 * sendInquiry → create-portal-request (DB + Admin-Mail + Kunden-Bestätigung)
 * subscribeNewsletter → newsletter-subscribe (Subscriber-Liste + Welcome-Mail)
 *
 * Used by: Buchung, Newsletter (Tickets/Blog), Chatbot, ShowPlanerModal,
 * MagicDinnerSummerEdition.
 */

const SUPABASE_URL = "https://rjhvqctjtgfpxzhnrozt.supabase.co";

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

function publishableKey(): string {
  return (import.meta as { env: Record<string, string> }).env
    .VITE_SUPABASE_PUBLISHABLE_KEY;
}

export async function sendInquiry(payload: InquiryPayload): Promise<void> {
  const body: Record<string, unknown> = {
    ...payload,
    name: payload.name || `${payload.vorname ?? ""} ${payload.nachname ?? ""}`.trim(),
  };

  const res = await fetch(`${SUPABASE_URL}/functions/v1/create-portal-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: publishableKey(),
      Authorization: `Bearer ${publishableKey()}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Versand fehlgeschlagen (${res.status})`);
  }
}

export type SubscribePayload = {
  email: string;
  name?: string;
  source: string;
  metadata?: Record<string, unknown>;
};

/** Newsletter-Subscribe via Edge-Function. Idempotent. */
export async function subscribeNewsletter(payload: SubscribePayload): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/newsletter-subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: publishableKey(),
      Authorization: `Bearer ${publishableKey()}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Newsletter-Anmeldung fehlgeschlagen (${res.status})`);
  }
}
