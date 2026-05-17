import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

/* ──────────────────────────────────────────────────────────────────
   Stale-Chunk-Reload nach Vercel-Deploy
   Wenn der Browser einen alten Chunk-Hash referenziert (nach Deploy)
   und das lazy-import fehlschlägt, einmalig automatisch reloaden.
   Verhindert weiße Seiten beim Navigieren nach einem Deploy.
   ────────────────────────────────────────────────────────────────── */
const RELOAD_KEY = "_chunkReloadAt";
function maybeReloadOnce() {
  const last = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
  // Max ein Reload pro 30 Sekunden — keine Reload-Schleifen
  if (Date.now() - last > 30_000) {
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
    window.location.reload();
  }
}

// Vite emittiert dieses Event, wenn ein dynamischer Import-Preload scheitert
window.addEventListener("vite:preloadError", (event) => {
  event.preventDefault?.();
  maybeReloadOnce();
});

// Generischer Fallback für "Failed to fetch dynamically imported module"
window.addEventListener("error", (event) => {
  const msg = String(event?.message || event?.error?.message || "");
  if (
    msg.includes("dynamically imported module") ||
    msg.includes("Loading chunk") ||
    msg.includes("Loading CSS chunk") ||
    msg.includes("Failed to fetch")
  ) {
    maybeReloadOnce();
  }
});

window.addEventListener("unhandledrejection", (event) => {
  const reason = event?.reason;
  const msg = String(reason?.message || reason || "");
  if (
    msg.includes("dynamically imported module") ||
    msg.includes("Loading chunk") ||
    msg.includes("Loading CSS chunk")
  ) {
    maybeReloadOnce();
  }
});

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
