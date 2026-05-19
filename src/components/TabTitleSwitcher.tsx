import { useEffect, useRef } from "react";

/**
 * Tab-Title-Visibility-Switcher
 *
 * Wenn der Tab verlassen wird (document.hidden = true), wechselt der Title
 * abwechselnd zwischen dem Original und "Wir vermissen dich ✨" alle 3.5s,
 * solange der Tab im Hintergrund ist. Bei Rückkehr Original wiederhergestellt.
 *
 * Mountet sich global in App.tsx — kein Render-Output.
 */
const VERMISSEN_TITLE = "Wir vermissen dich ✨";
const INITIAL_DELAY_MS = 2500;
const TOGGLE_INTERVAL_MS = 3500;

const TabTitleSwitcher = () => {
  const originalTitleRef = useRef<string | null>(null);
  const initialTimerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const showingVermissen = useRef(false);

  useEffect(() => {
    const stopToggling = () => {
      if (initialTimerRef.current) {
        window.clearTimeout(initialTimerRef.current);
        initialTimerRef.current = null;
      }
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const startToggling = () => {
      stopToggling();
      // Erst nach delay den ersten Switch zu "Wir vermissen dich"
      initialTimerRef.current = window.setTimeout(() => {
        document.title = VERMISSEN_TITLE;
        showingVermissen.current = true;
        // Dann alle TOGGLE_INTERVAL_MS hin- und herwechseln
        intervalRef.current = window.setInterval(() => {
          if (showingVermissen.current) {
            document.title = originalTitleRef.current ?? VERMISSEN_TITLE;
            showingVermissen.current = false;
          } else {
            document.title = VERMISSEN_TITLE;
            showingVermissen.current = true;
          }
        }, TOGGLE_INTERVAL_MS);
      }, INITIAL_DELAY_MS);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        // Tab verlassen — original Title merken, dann Toggling starten
        if (originalTitleRef.current === null) {
          originalTitleRef.current = document.title;
        }
        startToggling();
      } else {
        // Tab wieder sichtbar — Toggling stoppen, Original zurück
        stopToggling();
        if (originalTitleRef.current !== null) {
          document.title = originalTitleRef.current;
          originalTitleRef.current = null;
          showingVermissen.current = false;
        }
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      stopToggling();
      if (originalTitleRef.current !== null) {
        document.title = originalTitleRef.current;
      }
    };
  }, []);

  return null;
};

export default TabTitleSwitcher;
