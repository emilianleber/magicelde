/**
 * Zentraler Helper für alle Lead-Capturing-Formulare.
 *
 * sendInquiry → create-portal-request (DB + Admin-Mail + Kunden-Bestätigung)
 *
 * Used by: Buchung, Chatbot, ShowPlanerModal.
 */

import { ANFRAGE_ENDPUNKT } from "./bookartist";

// Das alte Projekt ist stillgelegt (03.09.2026). Die ANFRAGE
// wandert nach bookartist (siehe bookartist.ts).

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

  const res = await fetch(ANFRAGE_ENDPUNKT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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

