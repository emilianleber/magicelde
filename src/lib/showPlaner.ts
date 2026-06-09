/**
 * Show-Planer Cookie-Persistenz
 * Speichert Fortschritt + Antworten im localStorage. Bei nächstem Besuch
 * Resume möglich.
 */

const STORAGE_KEY = "magicel_showplaner_draft";
const COMPLETED_KEY = "magicel_showplaner_completed";

export type ShowPlanerAnswers = {
  anlass?: string;
  ort?: string;
  zeitraum?: string;
  /** echte Gästezahl aus dem Slider */
  gaeste?: number;
  /** "closeup" | "buehne" | "kombi" | "dinner" | "beratung" */
  format?: string;
  /** Close-Up-Dauer in Min (Slider-Repräsentant) */
  cuMin?: number;
  /** Bühnen-Dauer in Min (Slider-Repräsentant) */
  buehneMin?: number;
  /** Baustein-IDs in gewählter Reihenfolge (Abend-Baukasten) */
  ablauf?: string[];
  notizen?: string;
  // Legacy-Felder (alte Drafts) — bleiben optional, werden nicht mehr gesetzt
  saison?: string;
  monat?: string;
  gaesteCount?: string;
  dauer?: string;
  tonalitaet?: string;
  budget?: string;
};

export type ShowPlanerDraft = {
  step: number;
  answers: ShowPlanerAnswers;
  email?: string;
  name?: string;
  startedAt: number;
  updatedAt: number;
};

export function loadDraft(): ShowPlanerDraft | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ShowPlanerDraft;
  } catch {
    return null;
  }
}

export function saveDraft(draft: ShowPlanerDraft): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...draft, updatedAt: Date.now() }),
    );
  } catch {
    // silent fail in private/quota
  }
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function markCompleted(): void {
  try {
    localStorage.setItem(COMPLETED_KEY, String(Date.now()));
    clearDraft();
  } catch {
    // ignore
  }
}

export function hasDraft(): boolean {
  return loadDraft() !== null;
}

export function isCompleted(): boolean {
  return localStorage.getItem(COMPLETED_KEY) !== null;
}
