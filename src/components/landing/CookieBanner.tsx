import { useState, useEffect } from "react";

const COOKIE_KEY = "cookie-consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      // Small delay so it doesn't flash on page load
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] left-4 right-4 sm:left-6 sm:right-6 z-[60] animate-fade-up"
      style={{ animationDuration: "0.4s" }}
    >
      <div className="max-w-xl mx-auto bg-background/95 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-xl p-5 sm:p-6">
        <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">
          Diese Website verwendet Cookies, um Ihnen das beste Erlebnis zu
          bieten. Weitere Informationen finden Sie in unserer{" "}
          <a
            href="/datenschutz"
            className="text-accent hover:underline"
          >
            Datenschutzerkl&auml;rung
          </a>
          .
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={handleAccept}
            className="btn-primary !px-5 !py-2 !text-sm"
          >
            Akzeptieren
          </button>
          <button
            onClick={handleDecline}
            className="px-5 py-2 rounded-full font-sans text-sm font-medium text-muted-foreground hover:text-foreground border border-border/50 hover:border-border transition-colors"
          >
            Ablehnen
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
