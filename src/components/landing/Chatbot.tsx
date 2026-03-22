import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  role: "bot" | "user";
  text: string;
}

const faqAnswers: { keywords: string[]; answer: string }[] = [
  { keywords: ["kostet", "preis", "kosten", "budget", "geld"], answer: "Die Kosten hängen von Format, Dauer und Anlass ab. Hochzeitspakete starten ab 395€. Für ein individuelles Angebot schick mir einfach eine Anfrage — komplett kostenlos und unverbindlich!" },
  { keywords: ["buchen", "buchung", "anfrage", "anfragen"], answer: "Ganz einfach: Schick mir eine unverbindliche Anfrage über das Kontaktformular. Ich melde mich innerhalb von 24 Stunden bei dir!" },
  { keywords: ["hochzeit", "heiraten", "braut"], answer: "Magie auf Hochzeiten ist mein Spezialgebiet! Vom Sektempfang bis zur Abendshow — ich passe mein Programm individuell an eure Feier an. Schau dir die Hochzeitsseite an für mehr Details!" },
  { keywords: ["firma", "firmenfeier", "corporate", "unternehmen", "business"], answer: "Ich habe über 200 Firmenauftritte absolviert — von DAX-Konzernen bis Start-ups. Mein Entertainment ist der perfekte Networking-Booster für jedes Business-Event." },
  { keywords: ["dauer", "lang", "minuten", "zeit"], answer: "Close-Up Magie dauert typischerweise 30–90 Minuten, Bühnenshows 15–60 Minuten. Wir finden gemeinsam die perfekte Länge für deinen Ablauf." },
  { keywords: ["wo", "ort", "reise", "region", "stadt"], answer: "Mein Schwerpunkt liegt in Bayern und Süddeutschland, aber ich bin deutschlandweit und auf Wunsch auch international buchbar!" },
  { keywords: ["close-up", "closeup", "tisch", "nah"], answer: "Close-Up Magie findet direkt bei deinen Gästen statt — am Tisch, beim Empfang oder beim Networking. Interaktiv, witzig und unvergesslich nah." },
  { keywords: ["bühne", "bühnenshow", "show", "stage"], answer: "Meine Bühnenshow ist ein durchkomponiertes Erlebnis aus Comedy und Magie — perfekt als Highlight für Events mit 50 bis 500+ Gästen." },
];

const getAnswer = (input: string): string => {
  const lower = input.toLowerCase();
  for (const faq of faqAnswers) {
    if (faq.keywords.some((kw) => lower.includes(kw))) return faq.answer;
  }
  return "Gute Frage! Am besten erreichst du mich direkt über das Kontaktformular oder per WhatsApp — ich antworte innerhalb von 24 Stunden. 😊";
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! 👋 Ich bin der MagicEL Assistent. Wie kann ich dir helfen? Frag mich alles über Shows, Preise oder Buchung!" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getAnswer(userMsg) }]);
    }, 600);
  };

  return (
    <>
      {/* Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
        style={{ background: "linear-gradient(135deg, hsl(230, 65%, 48%), hsl(280, 55%, 45%), hsl(345, 70%, 42%))" }}
        aria-label="Chat öffnen"
      >
        {open ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] bg-background rounded-3xl shadow-2xl border border-border/50 flex flex-col overflow-hidden animate-fade-up" style={{ animationDuration: "0.3s", height: "480px" }}>
          {/* Header */}
          <div className="px-5 py-4 border-b border-border/30 flex items-center gap-3" style={{ background: "linear-gradient(135deg, hsl(225, 80%, 56%), hsl(260, 70%, 55%))" }}>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-display text-sm font-bold text-white">MagicEL Assistent</p>
              <p className="font-sans text-[11px] text-white/70">Antwort in Sekunden</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-accent" />
                  </div>
                )}
                <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-foreground text-background rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                }`}>
                  {msg.text}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-foreground/10 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border/30">
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Deine Frage…"
                className="flex-1 px-4 py-2.5 rounded-full bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
              <button type="submit" className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground hover:bg-accent/90 transition-colors">
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
