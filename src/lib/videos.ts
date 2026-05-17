// Zentrale Video-Konstanten für alle Showreel-Embeds.
//
// TODO (Operator): TVA_VIDEO_ID — bitte die echte YouTube-Video-ID des
// TVA-TV-Auftritts hier eintragen. Solange dies der Showreel-Default ist,
// zeigen StadtSeite + Index + Anlässe-Pages das alte Showreel.
//
// Wo wird das gebraucht:
// - src/pages/StadtSeite.tsx → "Sieh dir den Zauberer an"
// - src/pages/Index.tsx → optional auf Startseite
// - src/pages/Magic*.tsx, Buehnenshow.tsx etc. → bisher hardcoded "ZdIDq9VtqxU"

/** Aktuelles Standard-Showreel (Default vor TVA-Update). */
export const SHOWREEL_VIDEO_ID = "ZdIDq9VtqxU";

/**
 * TVA-TV-Auftritt 2025. Aktuell Fallback auf Showreel, bis echte ID gesetzt.
 * Wenn du die echte TVA-Video-ID hast, hier eintragen:
 */
export const TVA_VIDEO_ID = "ZdIDq9VtqxU";

/** Magic-Dinner-Showreel (falls separat). */
export const MAGIC_DINNER_VIDEO_ID = "R0_mXGxzC9E";
