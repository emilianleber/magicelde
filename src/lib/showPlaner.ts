/**
 * Show-Planer Cookie-Persistenz
 * Speichert Fortschritt + Antworten im localStorage. Bei nächstem Besuch
 * Resume möglich.
 */

const STORAGE_KEY = "magicel_showplaner_draft";
const COMPLETED_KEY = "magicel_showplaner_completed";

export type ShowPlanerAnswers = {
  anlass?: string;
  saison?: string;
  monat?: string;
  ort?: string;
  gaesteCount?: string;
  format?: string;
  dauer?: string;
  tonalitaet?: string;
  budget?: string;
  notizen?: string;
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
