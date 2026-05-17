/**
 * Email-Capture-Persistenz
 *
 * Sammelt Email-Adressen die in Formularen eingegeben aber nicht abgesendet
 * wurden. Speichert in localStorage. Bei nächstem Besuch nach > 24h zeigt
 * Reminder-Banner.
 *
 * TODO (Operator): Echtes Auto-Reminder-Email braucht Server-Side-Cron mit
 * Mail-Provider (Resend/Mailgun). Aktuell rein Client-Side: Banner mit
 * Reminder beim nächsten Besuch.
 */

const KEY = "magicel_captured_email";
const SUBMITTED_KEY = "magicel_email_submitted";

type CapturedEmail = {
  email: string;
  context: string; // Wo eingegeben (z.B. "showplaner", "buchung", "chatbot")
  formData?: Record<string, unknown>; // Optionaler Form-Snapshot
  capturedAt: number; // Unix ms
};

/** Email speichern wenn nicht abgesendet. */
export function captureEmail(
  email: string,
  context: string,
  formData?: Record<string, unknown>,
): void {
  if (!email || !email.includes("@")) return;
  // Wenn schon submitted, kein Capture mehr
  if (localStorage.getItem(SUBMITTED_KEY) === "true") return;
  const data: CapturedEmail = {
    email: email.trim().toLowerCase(),
    context,
    formData,
    capturedAt: Date.now(),
  };
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Quota / private mode — silent fail
  }
}

/** Email als abgesendet markieren — kein Reminder mehr. */
export function markEmailSubmitted(): void {
  try {
    localStorage.setItem(SUBMITTED_KEY, "true");
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

/** Aktuelle Captured-Email + Kontext abrufen. */
export function getCapturedEmail(): CapturedEmail | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CapturedEmail;
  } catch {
    return null;
  }
}

/** True wenn Email älter als 24h und nicht submitted. */
export function shouldShowReminder(): boolean {
  if (localStorage.getItem(SUBMITTED_KEY) === "true") return false;
  const captured = getCapturedEmail();
  if (!captured) return false;
  const ageMs = Date.now() - captured.capturedAt;
  return ageMs > 24 * 60 * 60 * 1000;
}

/** Reminder dismissen ohne zu submitten. */
export function dismissReminder(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
