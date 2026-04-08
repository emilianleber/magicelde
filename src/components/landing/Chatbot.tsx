import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  role: "bot" | "user";
  text: string;
  buttons?: { label: string; value: string }[];
}

// ── Umfangreiche FAQ-Wissensbasis ──────────────────────────────────────────

const faqAnswers: { keywords: string[]; answer: string; buttons?: { label: string; value: string }[] }[] = [
  // Preise & Kosten
  { keywords: ["kostet", "preis", "kosten", "budget", "geld", "teuer", "günstig", "was zahlt", "investition"],
    answer: "Die Investition hängt von Format, Dauer und Gästezahl ab. Hier eine grobe Orientierung:\n\n• Close-Up Magie: ab 495 €\n• Bühnenshow: ab 895 €\n• Magic Dinner: ab 1.495 €\n• Hochzeitspaket: ab 395 €\n\nJedes Event wird individuell kalkuliert. Soll ich dir ein unverbindliches Angebot erstellen?",
    buttons: [{ label: "Angebot anfragen", value: "buchen" }, { label: "Formate vergleichen", value: "formate" }] },

  // Buchung & Anfrage
  { keywords: ["buchen", "buchung", "anfrage", "anfragen", "reservieren", "termin"],
    answer: "So einfach geht's:\n\n1. Anfrage senden (dauert nur 2 Min.)\n2. Ich melde mich innerhalb von 24h\n3. Wir besprechen alles Persönlich\n4. Du erhältst dein individuelles Angebot\n\nKomplett kostenlos und unverbindlich!",
    buttons: [{ label: "Jetzt anfragen", value: "kontakt" }, { label: "Was brauche ich?", value: "was brauche ich für die anfrage" }] },

  // Was brauche ich
  { keywords: ["was brauche ich", "welche infos", "angaben"],
    answer: "Für ein Angebot brauche ich nur:\n\n• Datum & ungefähre Uhrzeit\n• Art des Events (Hochzeit, Firma, etc.)\n• Ungefähre Gästezahl\n• Gewünschtes Format (Close-Up, Show, etc.)\n• Ort / Region\n\nAlles andere besprechen wir dann persönlich!" },

  // Hochzeit
  { keywords: ["hochzeit", "heiraten", "braut", "bräutigam", "trauung", "standesamt", "hochzeitsfeier", "sektempfang"],
    answer: "Magie auf Hochzeiten ist mein Spezialgebiet! Ich gestalte eure Feier mit:\n\n✨ Sektempfang-Magie während die Gäste warten\n✨ Tischzauberei beim Dinner\n✨ Große Bühnenshow als Abend-Highlight\n\nDas Besondere: Ich baue persönliche Details eurer Geschichte in die Show ein – z.B. erscheint euer Hochzeitsdatum auf magische Weise. Über 100 Hochzeiten habe ich bereits verzaubert!",
    buttons: [{ label: "Hochzeitsseite ansehen", value: "hochzeit-seite" }, { label: "Paket anfragen", value: "buchen" }] },

  // Firmenevent
  { keywords: ["firma", "firmenfeier", "corporate", "unternehmen", "business", "teambuilding", "betriebsfeier", "weihnachtsfeier", "sommerfest", "jubiläum", "messe"],
    answer: "Über 200 Firmenauftritte – von DAX-Konzernen bis Start-ups:\n\n🏢 Empfang & Networking: Close-Up Magie als Eisbrecher\n🎤 Bühnenprogramm: Comedy-Magic als Highlight\n🍽️ Dinner-Entertainment: Magie zwischen den Gängen\n\nReferenzen: Sixt, STRABAG, Sparkasse, Versicherungskammer Bayern u.v.m.\n\nMein Entertainment ist der perfekte Networking-Booster!",
    buttons: [{ label: "Firmenseite ansehen", value: "firmen-seite" }, { label: "Referenzen", value: "referenzen" }] },

  // Formate
  { keywords: ["formate", "unterschied", "close-up oder", "was passt", "welches format", "empfehlung", "beraten"],
    answer: "Hier die Formate im Überblick:\n\n🃏 Close-Up Magie\nDirekt bei den Gästen, perfekt für Empfänge & Networking. 30-90 Min.\n\n🎭 Bühnenshow\nDas große Highlight, Comedy & Magie. 15-60 Min. Ab 50 Gästen.\n\n🍷 Magic Dinner\nEin kompletter Abend mit Menü & Show. 3-4 Stunden.\n\n🎤 Moderation\nCharmante Eventführung mit magischen Einlagen.\n\nWas ist dein Anlass? Dann empfehle ich das perfekte Format!" },

  // Dauer
  { keywords: ["dauer", "lang", "minuten", "zeit", "wie lange"],
    answer: "Die Dauer passe ich an euer Event an:\n\n• Close-Up: 30–90 Minuten (flexibel)\n• Bühnenshow: 15–60 Minuten\n• Magic Dinner: kompletter Abend (3-4 Std.)\n• Moderation: nach Bedarf\n\nMein Tipp: Bei Empfängen reichen oft 45-60 Min. Close-Up. Die Gäste sollen ja auch miteinander reden! 😊" },

  // Ort & Region
  { keywords: ["wo", "ort", "reise", "region", "stadt", "münchen", "regensburg", "nürnberg", "bayern", "deutschland", "anfahrt"],
    answer: "Mein Schwerpunkt: Bayern & Süddeutschland (Regensburg, München, Nürnberg, Augsburg).\n\nAber: Ich bin deutschlandweit und international buchbar! Bei Events außerhalb Bayerns kommen ggf. Reisekosten dazu – die teile ich transparent im Angebot mit.\n\n📍 Basis: Regensburg" },

  // Close-Up
  { keywords: ["close-up", "closeup", "tisch", "nah", "tischzauberei", "hautnah"],
    answer: "Close-Up Magie – mein Signature-Format:\n\nDirekt vor den Augen deiner Gäste passieren unmögliche Dinge. Karten, Münzen, geliehene Gegenstände – alles wird zum Wunder.\n\n✅ Perfekt für: Empfänge, Networking, Dinner, Messen\n✅ Interaktiv & persönlich\n✅ Kein Technik-Setup nötig\n✅ Flexible Dauer\n\nDas Besondere: Jeder Gast erlebt seine eigene persönliche Show!",
    buttons: [{ label: "Close-Up Seite", value: "closeup-seite" }] },

  // Bühnenshow
  { keywords: ["bühne", "bühnenshow", "show", "stage", "abendshow", "galashow"],
    answer: "Die große Bühnenshow – das Highlight jeden Events:\n\n🎭 Durchkomponiertes Programm aus Comedy & Magie\n🎭 Perfekt für 50 bis 500+ Gäste\n🎭 Professionelle Technik-Abstimmung\n🎭 Individuell angepasst an euer Event\n\nAuszeichnungen: Kreativpreisträger & Greatest Talent Finalist!\n\nIdeal als Rahmenprogramm, Dinner-Show oder Gala-Highlight.",
    buttons: [{ label: "Bühnenshow Seite", value: "show-seite" }] },

  // Magic Dinner
  { keywords: ["magic dinner", "dinner", "dinner show", "abendessen", "menü"],
    answer: "Das Magic Dinner – ein kompletter Show-Abend:\n\n🍷 3-4 Gänge Menü + professionelle Zaubershow\n🍷 Magie direkt am Tisch zwischen den Gängen\n🍷 Große Bühnenshow als Finale\n🍷 Perfekt für 20-120 Gäste\n\nDas ultimative Erlebnis: Genuss für alle Sinne! Ideal für besondere Anlässe, bei denen alles stimmen muss.",
    buttons: [{ label: "Magic Dinner Seite", value: "dinner-seite" }] },

  // Geburtstag
  { keywords: ["geburtstag", "birthday", "geburtstagsfeier", "jubiläum"],
    answer: "Zauberhafte Geburtstage – für jedes Alter:\n\n🎂 Runder Geburtstag? Close-Up beim Empfang + kurze Show\n🎂 Große Feier? Bühnenshow als Überraschungs-Highlight\n🎂 Intimer Rahmen? Tischzauberei beim Dinner\n\nMein Tipp: Die beste Überraschung ist, wenn der Jubilar NICHT damit rechnet! Oft buchen Freunde oder Familie heimlich. 😄",
    buttons: [{ label: "Geburtstagsseite", value: "geburtstag-seite" }, { label: "Anfragen", value: "buchen" }] },

  // Verfügbarkeit
  { keywords: ["verfügbar", "frei", "termin frei", "wann", "datum", "samstag", "wochenende"],
    answer: "Gute Termine sind schnell vergeben – besonders Samstage in der Hochzeitssaison (Mai–September)!\n\nMein Tipp: Je früher anfragen, desto besser. Aber auch kurzfristige Buchungen sind manchmal möglich.\n\nSchick mir einfach dein Wunschdatum – ich checke sofort meine Verfügbarkeit!" },

  // Erfahrung & Qualität
  { keywords: ["erfahrung", "referenz", "bewertung", "rezension", "gut", "qualität", "professionell", "seriös"],
    answer: "Meine Credentials:\n\n⭐ Google: 5.0 Sterne\n⭐ ProvenExpert: 4.9 Sterne\n🏆 Kreativpreisträger\n🏆 Greatest Talent Finalist\n📊 200+ erfolgreiche Events\n🏢 Kunden: Sixt, STRABAG, Sparkasse u.v.m.\n\nJeder Auftritt wird individuell vorbereitet – das macht den Unterschied!",
    buttons: [{ label: "Referenzen ansehen", value: "referenzen" }] },

  // Moderation
  { keywords: ["moderation", "moderator", "moderieren", "durch den abend"],
    answer: "Moderation mit magischem Twist:\n\n🎤 Professionelle Eventführung\n🎤 Charmant, witzig, souverän\n🎤 Magische Einlagen zwischen den Programmpunkten\n🎤 Perfekt für Galas, Preisverleihungen, Firmenfeiern\n\nDer Vorteil: Statt einem Moderator UND einem Künstler – beides in einer Person!" },

  // Kundenportal
  { keywords: ["kundenportal", "portal", "login", "mein konto", "anmelden"],
    answer: "Im Kundenportal findest du alles zu deiner Buchung:\n\n📋 Event-Status & Timeline\n📄 Angebote & Rechnungen\n💬 Direkte Kommunikation\n⭐ Feedback nach dem Event\n\nDein Login-Link wurde dir per E-Mail zugesendet. Falls du keinen Zugang hast, kontaktiere mich einfach!",
    buttons: [{ label: "Zum Portal", value: "portal" }] },

  // Technik
  { keywords: ["technik", "ton", "licht", "mikrofon", "bühne aufbau", "aufbau", "vorbereitung", "was braucht ihr"],
    answer: "Technische Anforderungen:\n\n🃏 Close-Up: Gar nichts! Ich bringe alles mit.\n🎭 Bühnenshow: Idealerweise Mikrofon + Licht. Ich stimme alles vorher mit eurer Location ab.\n\nIch kümmere mich um alle Details – ihr müsst euch um nichts sorgen. Bei der Planung erstelle ich einen detaillierten Technik-Rider." },

  // Stornierung
  { keywords: ["storno", "stornieren", "absagen", "absage", "abbrechen"],
    answer: "Stornobedingungen:\n\n• Bis 30 Tage vorher: 55% der Gage\n• Bis 20 Tage vorher: 75% der Gage\n• Unter 14 Tage: 100% der Gage\n\nBei höherer Gewalt finden wir immer eine faire Lösung! Am besten: Termin verschieben statt absagen." },

  // Kontakt
  { keywords: ["kontakt", "telefon", "email", "whatsapp", "erreichen", "anrufen", "schreiben"],
    answer: "So erreichst du mich am schnellsten:\n\n📱 WhatsApp: Klick auf den grünen Button unten\n📧 E-Mail: Über das Kontaktformular\n📞 Telefon: Für dringende Anfragen\n\nAntwortzeit: In der Regel innerhalb von 24 Stunden, oft schon nach wenigen Minuten!",
    buttons: [{ label: "Kontaktformular", value: "kontakt" }] },

  // Kindergeburtstag / Kinder
  { keywords: ["kind", "kinder", "kindergeburtstag"],
    answer: "Aktuell konzentriere ich mich auf Erwachsenen-Entertainment: Hochzeiten, Firmenfeiern und private Feiern. Für Kindergeburtstage empfehle ich gerne einen Kollegen!\n\nAber: Bei Familienfeiern beziehe ich natürlich auch jüngere Gäste mit ein – Magie begeistert jedes Alter! 😊" },
];

// ── Schnellvorschläge ───────────────────────────────────────────────────────

const quickSuggestions = [
  { label: "Was kostet es?", value: "Was kostet eine Buchung?" },
  { label: "Welches Format?", value: "Welches Format passt zu meinem Event?" },
  { label: "Hochzeit", value: "Ich plane eine Hochzeit" },
  { label: "Firmenevent", value: "Wir planen ein Firmenevent" },
];

// ── Navigations-Mapping ─────────────────────────────────────────────────────

const NAV_MAP: Record<string, string> = {
  "kontakt": "/buchung",
  "buchen": "/buchung",
  "hochzeit-seite": "/hochzeit",
  "firmen-seite": "/firmenfeiern",
  "geburtstag-seite": "/geburtstage",
  "closeup-seite": "/close-up",
  "show-seite": "/buehnenshow",
  "dinner-seite": "/magic-dinner",
  "referenzen": "/referenzen",
  "portal": "/kundenportal/login",
};

// ── Intelligente Antwortlogik ───────────────────────────────────────────────

const getAnswer = (input: string): { text: string; buttons?: { label: string; value: string }[] } => {
  const lower = input.toLowerCase().replace(/[?!.,]/g, "");

  // Multi-Keyword-Matching mit Scoring
  let bestMatch: typeof faqAnswers[0] | null = null;
  let bestScore = 0;

  for (const faq of faqAnswers) {
    let score = 0;
    for (const kw of faq.keywords) {
      if (lower.includes(kw)) score += kw.length; // Längere Matches = relevanter
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq;
    }
  }

  if (bestMatch && bestScore > 0) {
    return { text: bestMatch.answer, buttons: bestMatch.buttons };
  }

  // Begrüßungen
  if (/^(hi|hallo|hey|moin|servus|grüß|guten tag|guten morgen|guten abend)/.test(lower)) {
    return { text: "Hey! 👋 Schön, dass du hier bist! Wie kann ich dir helfen? Planst du ein Event oder hast du Fragen zu meinem Programm?", buttons: quickSuggestions.map(s => ({ label: s.label, value: s.value })) };
  }

  // Danke
  if (/^(danke|vielen dank|super|toll|perfekt|klasse)/.test(lower)) {
    return { text: "Sehr gerne! 😊 Wenn du noch Fragen hast, schreib einfach. Oder starte direkt mit einer unverbindlichen Anfrage – ich freue mich auf dein Event!", buttons: [{ label: "Jetzt anfragen", value: "buchen" }] };
  }

  // Ja / Interesse
  if (/^(ja|klar|gerne|auf jeden fall|definitiv)/.test(lower)) {
    return { text: "Super! Am besten schickst du mir eine kurze Anfrage mit Datum, Anlass und Gästezahl. Dann erstelle ich dir ein individuelles Angebot – komplett kostenlos! 🎩", buttons: [{ label: "Anfrage senden", value: "buchen" }] };
  }

  return {
    text: "Das ist eine gute Frage! Damit ich dir die beste Antwort geben kann, empfehle ich ein kurzes persönliches Gespräch. Schreib mir gerne per WhatsApp oder über das Kontaktformular – ich antworte meistens innerhalb von wenigen Minuten! 😊",
    buttons: [{ label: "Kontaktformular", value: "kontakt" }, { label: "Alle Formate", value: "formate" }],
  };
};

// ── Chatbot Component ───────────────────────────────────────────────────────

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! 👋 Ich bin der Assistent von Emilian Leber – Zauberkünstler & Entertainer. Wie kann ich dir helfen?", buttons: quickSuggestions.map(s => ({ label: s.label, value: s.value })) },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const handler = () => setOpen(true);
    document.addEventListener("open-chatbot", handler);
    return () => document.removeEventListener("open-chatbot", handler);
  }, []);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg = text.trim();
    setInput("");

    // Check if it's a navigation action
    const navTarget = NAV_MAP[userMsg];
    if (navTarget) {
      window.location.href = navTarget;
      return;
    }

    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsTyping(true);

    // Simulate natural typing delay (300-800ms)
    const delay = 400 + Math.random() * 400;
    setTimeout(() => {
      const response = getAnswer(userMsg);
      setMessages((prev) => [...prev, { role: "bot", text: response.text, buttons: response.buttons }]);
      setIsTyping(false);
    }, delay);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group"
        style={{ background: "linear-gradient(135deg, hsl(230, 65%, 48%), hsl(280, 55%, 45%), hsl(345, 70%, 42%))" }}
        aria-label="Chat öffnen"
      >
        {open ? <X className="w-6 h-6 text-white" /> : (
          <>
            <MessageCircle className="w-6 h-6 text-white" />
            {!open && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
            )}
          </>
        )}
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] bg-background rounded-3xl shadow-2xl border border-border/50 flex flex-col overflow-hidden animate-fade-up" style={{ animationDuration: "0.3s", height: "520px" }}>
          {/* Header */}
          <div className="px-5 py-4 border-b border-border/30 flex items-center gap-3" style={{ background: "linear-gradient(135deg, hsl(230, 65%, 48%), hsl(280, 55%, 45%), hsl(345, 70%, 42%))" }}>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-display text-sm font-bold text-white">Emilian Leber</p>
              <p className="font-sans text-[11px] text-white/70">Entertainment-Berater • Antwort in Sekunden</p>
            </div>
            <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i}>
                <div className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "bot" && (
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1" style={{ background: "linear-gradient(135deg, hsl(230, 65%, 48%), hsl(280, 55%, 45%))" }}>
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-foreground text-background rounded-br-md"
                      : "bg-muted/60 text-foreground rounded-bl-md"
                  }`}>
                    {msg.text}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-foreground/10 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-3.5 h-3.5 text-foreground" />
                    </div>
                  )}
                </div>
                {/* Action Buttons */}
                {msg.role === "bot" && msg.buttons && msg.buttons.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 ml-9 mt-2">
                    {msg.buttons.map((btn, j) => (
                      <button
                        key={j}
                        onClick={() => handleSend(btn.value)}
                        className="px-3 py-1.5 rounded-full text-xs font-medium border border-border/40 bg-background hover:bg-muted/60 text-foreground transition-colors"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1" style={{ background: "linear-gradient(135deg, hsl(230, 65%, 48%), hsl(280, 55%, 45%))" }}>
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-muted/60 px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border/30 bg-background">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Schreib mir deine Frage..."
                className="flex-1 px-4 py-2.5 rounded-full bg-muted/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 border border-border/20"
              />
              <button type="submit" disabled={!input.trim()} className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all disabled:opacity-40" style={{ background: input.trim() ? "linear-gradient(135deg, hsl(230, 65%, 48%), hsl(280, 55%, 45%))" : "hsl(0, 0%, 80%)" }}>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
