import { useEffect, useRef } from "react";

/**
 * Tab-Title-Visibility-Switcher
 *
 * Wenn der Tab verlassen wird (document.hidden = true), wird nach 3 Sek der
 * Page-Title auf "Wir vermissen dich ✨" geändert. Wenn der Tab wieder
 * sichtbar wird, original Title wiederhergestellt.
 *
 * Mountet sich global in App.tsx — kein Render-Output.
 */
const VERMISSEN_TITLE = "Wir vermissen dich ✨";
const DELAY_MS = 3000;

const TabTitleSwitcher = () => {
  const originalTitleRef = useRef<string | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        // Tab verlassen — original Title merken, dann nach 3s ändern
        if (originalTitleRef.current === null) {
          originalTitleRef.current = document.title;
        }
        if (timerRef.current) {
          window.clearTimeout(timerRef.current);
        }
        timerRef.current = window.setTimeout(() => {
          document.title = VERMISSEN_TITLE;
        }, DELAY_MS);
      } else {
        // Tab wieder sichtbar — Timer abbrechen, original Title zurück
        if (timerRef.current) {
          window.clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        if (originalTitleRef.current !== null) {
          document.title = originalTitleRef.current;
          originalTitleRef.current = null;
        }
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      // Original Title sicherstellen falls Component unmounted während Tab hidden
      if (originalTitleRef.current !== null) {
        document.title = originalTitleRef.current;
      }
    };
  }, []);

  return null;
};

export default TabTitleSwitcher;
