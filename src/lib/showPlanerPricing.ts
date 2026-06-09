/**
 * Show-Planer — Richtpreis-Logik (unverbindliche Ersteinschätzung).
 *
 * Single Source of Truth für alle Preise im Show-Planer. Bewusst klein &
 * datengetrieben gehalten — Zahlen hier ändern, fertig. NICHT als Festpreis
 * kommuniziert: immer als „ab"-Richtwert, finales Angebot nach Briefing.
 *
 * Quelle (Inhaber, 2026-06-09):
 *   Close-Up: 20–30 Min/20–60 Gäste = 395 · 30–45/60–100 = 495 · 45–60 = 649 · 60+ od. >100 Gäste = auf Anfrage
 *   Bühne:    20–30 = 495 · 30–45 = 749 · 45+ = auf Anfrage
 *   Kombi:    Bausteine kombiniert, leicht gebündelt (z.B. 20–30 Bühne + 30–45 Close-Up ≈ 949)
 *   Magic Dinner / Beratung: auf Anfrage
 */

export type FormatKey = "closeup" | "buehne" | "kombi" | "dinner" | "beratung";

/** Close-Up-Richtpreis nach Dauer (Min) + Gästezahl. null = auf Anfrage. */
export function closeUpPrice(min: number, gaeste?: number): number | null {
  if (gaeste && gaeste > 100) return null; // Close-Up skaliert nicht > 100 Gäste
  if (min <= 30) return 395;
  if (min <= 45) return 495;
  if (min <= 60) return 649;
  return null; // 60+ Min
}

/** Bühnen-Richtpreis nach Dauer (Min). null = auf Anfrage. */
export function buehnePrice(min: number): number | null {
  if (min <= 30) return 495;
  if (min <= 45) return 749;
  return null; // 45+ Min
}

/** Auf „…9 €" runden (charmante Preis-Endung), immer aufgerundet. */
function charm(x: number): number {
  return Math.ceil((x - 9) / 10) * 10 + 9;
}

export type PriceResult =
  | { kind: "ab"; amount: number }
  | { kind: "anfrage" };

/**
 * Gesamt-Richtpreis für die aktuelle Auswahl.
 * Kombi = Summe der Bausteine, 5 % Bündel-Vorteil, auf …9 € gerundet
 * (z.B. (495+495)·0.95 ≈ 949). Fehlt ein Baustein-Preis → auf Anfrage.
 */
export function estimatePrice(a: {
  format?: FormatKey;
  cuMin?: number;
  buehneMin?: number;
  gaeste?: number;
}): PriceResult {
  const { format, cuMin = 30, buehneMin = 30, gaeste } = a;

  if (format === "closeup") {
    const p = closeUpPrice(cuMin, gaeste);
    return p == null ? { kind: "anfrage" } : { kind: "ab", amount: p };
  }
  if (format === "buehne") {
    const p = buehnePrice(buehneMin);
    return p == null ? { kind: "anfrage" } : { kind: "ab", amount: p };
  }
  if (format === "kombi") {
    const cu = closeUpPrice(cuMin, gaeste);
    const bu = buehnePrice(buehneMin);
    if (cu == null || bu == null) return { kind: "anfrage" };
    return { kind: "ab", amount: charm((cu + bu) * 0.95) };
  }
  // dinner | beratung | unbekannt → individuelles Angebot
  return { kind: "anfrage" };
}

/** Hübsche €-Anzeige ohne Nachkommastellen. */
export function formatEuro(amount: number): string {
  return `${amount.toLocaleString("de-DE")} €`;
}

/** Dauer-Stufen für die Slider — Index → { label, minutes-Repräsentant }. */
export const CLOSEUP_TIERS = [
  { label: "20–30 Min", min: 30 },
  { label: "30–45 Min", min: 45 },
  { label: "45–60 Min", min: 60 },
  { label: "60+ Min", min: 90 },
] as const;

export const BUEHNE_TIERS = [
  { label: "20–30 Min", min: 30 },
  { label: "30–45 Min", min: 45 },
  { label: "45+ Min", min: 60 },
] as const;
