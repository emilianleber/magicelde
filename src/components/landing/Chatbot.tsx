import { useState, useRef, useEffect, useMemo, type FormEvent } from "react";
import {
  X,
  Send,
  Sparkles,
  Wand2,
  Calendar,
  Heart,
  Building2,
  Coins,
  MapPin,
  Mail,
  ArrowRight,
  Cake,
  Mic2,
  Utensils,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { captureEmail, markEmailSubmitted } from "@/lib/emailCapture";

// ──────────────────────────────────────────────────────────────────────────
// CI v3 Tokens (Burgunder + Amber + Cream)
// ──────────────────────────────────────────────────────────────────────────

const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";
const AMBER = "#f3d9a8";
const CREAM = "hsl(36, 30%, 97%)";
const DARK_BG = "#08060c";
const SERIF_ITALIC =
  "font-['Instrument_Serif',ui-serif,Georgia,serif] italic font-normal";

// ──────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────

type ActionKind = "navigate" | "open-planer" | "show-form" | "send-message";

type ChatAction = {
  label: string;
  icon?: LucideIcon;
  kind: ActionKind;
  target?: string;
};

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
  actions?: ChatAction[];
  showForm?: boolean;
};

type KnowledgeEntry = {
  id: string;
  keywords: string[];
  response: string;
  actions?: ChatAction[];
};

// ──────────────────────────────────────────────────────────────────────────
// Knowledge-Base
// ──────────────────────────────────────────────────────────────────────────

const KNOWLEDGE: KnowledgeEntry[] = [
  {
    id: "preis",
    keywords: [
      "preis",
      "kosten",
      "honorar",
      "wie teuer",
      "gage",
      "budget",
      "investition",
      "rechnung",
    ],
    response:
      "Preise sind format- und reichweiten-abhaengig. Ein kompakter Close-Up-Slot startet im mittleren dreistelligen Bereich, Magic-Dinner-Abende oder Premium-Buehnenshows liegen darueber. Sag mir Anlass, Datum und Gaestezahl im Show-Planer, ich schicke ein konkretes Angebot innerhalb 24h.",
    actions: [
      { label: "Show-Planer starten", icon: Wand2, kind: "open-planer" },
      { label: "Direkt anfragen", icon: Mail, kind: "show-form" },
    ],
  },
  {
    id: "hochzeit",
    keywords: [
      "hochzeit",
      "trauung",
      "brautpaar",
      "hochzeitsfeier",
      "sektempfang",
      "braut",
      "braeutigam",
      "standesamt",
    ],
    response:
      "Hochzeitszauber war ueber 100 Mal. Close-Up beim Sektempfang, Tisch-zu-Tisch beim Dinner, ein Buehnen-Highlight vor dem Tanz. Eure Geschichte fliesst in die Show ein - Datum, Anekdote, Trauring-Effekt.",
    actions: [
      { label: "Hochzeit-Seite", icon: Heart, kind: "navigate", target: "/hochzeit" },
      { label: "Show-Planer", icon: Wand2, kind: "open-planer" },
    ],
  },
  {
    id: "firma",
    keywords: [
      "firma",
      "firmenfeier",
      "weihnachtsfeier",
      "konzern",
      "vorstand",
      "corporate",
      "unternehmen",
      "business",
      "betriebsfeier",
      "sommerfest",
      "incentive",
      "kundenabend",
      "messe",
    ],
    response:
      "Firmenfeiern ueber 200 Mal - DAX-Konzerne, Mittelstand, Start-ups. Tonalitaet ans Unternehmen angepasst, Insider-Pointen aus dem Briefing, Magie-Bridges in der Moderation, Standing-Ovation-Finale. Kunden: Sixt, STRABAG, Sparkasse, VKB, XXXLutz.",
    actions: [
      {
        label: "Firmenfeier-Seite",
        icon: Building2,
        kind: "navigate",
        target: "/firmenfeiern",
      },
      { label: "Show-Planer", icon: Wand2, kind: "open-planer" },
    ],
  },
  {
    id: "close-up",
    keywords: [
      "close-up",
      "closeup",
      "close up",
      "tischzauberer",
      "tischzauberei",
      "walk around",
      "walk-around",
      "walkaround",
      "tafel",
      "tisch",
    ],
    response:
      "Close-Up direkt am Tisch - Karten in eure Hand, Muenzen die wandern, drei Sekunden Stille danach. Ueber 100 Auftritte, von intimen Tafeln bis 300+ Gaeste-Empfaenge. Kein Technik-Setup, flexible Dauer.",
    actions: [
      {
        label: "Close-Up-Seite",
        icon: Sparkles,
        kind: "navigate",
        target: "/close-up",
      },
      { label: "Show-Planer", icon: Wand2, kind: "open-planer" },
    ],
  },
  {
    id: "buehne",
    keywords: [
      "buehne",
      "bühne",
      "buehnenshow",
      "bühnenshow",
      "show",
      "stage",
      "abendshow",
      "gala",
      "galashow",
    ],
    response:
      "Durchkomponierte Buehnenshow 15-60 Min - Hook, Aufbau, Peaks, Climax, Uebergabe. Mentaleffekte, Comedy-Pointen, Standing-Ovation-Finale. Greatest-Talent-Finalist und Kreativpreistraeger.",
    actions: [
      {
        label: "Buehnenshow-Seite",
        icon: Mic2,
        kind: "navigate",
        target: "/buehnenshow",
      },
      { label: "Show-Planer", icon: Wand2, kind: "open-planer" },
    ],
  },
  {
    id: "magic-dinner",
    keywords: [
      "magic dinner",
      "dinner",
      "mehrgaenge",
      "mehrgänge",
      "menue",
      "menü",
      "abendessen",
      "dinner-show",
      "dinner show",
    ],
    response:
      "Magic Dinner ist mein Spezialgebiet - Mehrgaenge-Abend mit Magie zwischen den Gaengen. Close-Up am Tisch, Buehnenshow als Finale, 20-120 Gaeste. Hauspartner: Wald & Wiese in Sinzing bei Regensburg.",
    actions: [
      {
        label: "Magic Dinner-Seite",
        icon: Utensils,
        kind: "navigate",
        target: "/magic-dinner",
      },
      { label: "Show-Planer", icon: Wand2, kind: "open-planer" },
    ],
  },
  {
    id: "geburtstag",
    keywords: ["geburtstag", "jubilaeum", "jubiläum", "geburtstagsfeier", "runder"],
    response:
      "Von 30er-Geburtstag bis Goldene Hochzeit - Memory-Lane mit Anekdoten vom Geburtstagskind, Close-Up und Buehnen-Highlight, personalisiertes Finale. Funktioniert am besten als Ueberraschung.",
    actions: [
      {
        label: "Geburtstage-Seite",
        icon: Cake,
        kind: "navigate",
        target: "/geburtstage",
      },
      { label: "Show-Planer", icon: Wand2, kind: "open-planer" },
    ],
  },
  {
    id: "moderation",
    keywords: ["moderation", "moderator", "moderieren", "moderiert", "durch den abend"],
    response:
      "Moderation mit magischem Twist - charmant, witzig, souveraen. Magische Einlagen zwischen den Programmpunkten. Statt einem Moderator UND einem Kuenstler beides in einer Person.",
    actions: [
      {
        label: "Moderation-Seite",
        icon: Mic2,
        kind: "navigate",
        target: "/moderation",
      },
      { label: "Show-Planer", icon: Wand2, kind: "open-planer" },
    ],
  },
  {
    id: "comedy",
    keywords: ["comedy", "comedyzauberei", "lachen", "humor", "witz"],
    response:
      "Comedy-Zauberei - Magie mit Pointen-Dichte. Im Schnitt 17 Lacher in 20 Minuten. Funktioniert auf Buehne und Close-Up gleichermassen.",
    actions: [
      {
        label: "Comedy-Seite",
        icon: Sparkles,
        kind: "navigate",
        target: "/comedy-zauberei",
      },
    ],
  },
  {
    id: "ort",
    keywords: [
      "wo",
      "stadt",
      "regensburg",
      "muenchen",
      "münchen",
      "nuernberg",
      "nürnberg",
      "augsburg",
      "anfahrt",
      "in der naehe",
      "in der nähe",
      "region",
      "bayern",
      "deutschland",
      "ort",
      "reise",
    ],
    response:
      "Basis Regensburg, Bayern primaer, deutschlandweit und international buchbar. Anfahrt wird transparent im Angebot kalkuliert. Sag mir deine Stadt, ich pruefe Termin und Logistik.",
    actions: [
      { label: "Show-Planer", icon: Wand2, kind: "open-planer" },
      { label: "Anfragen", icon: Mail, kind: "show-form" },
    ],
  },
  {
    id: "termin",
    keywords: [
      "termin",
      "verfuegbar",
      "verfügbar",
      "wann",
      "datum",
      "samstag",
      "wochenende",
      "frei",
    ],
    response:
      "Q1-Q2 entspannt, Q3 mittel, Q4 (Weihnachten) eng - bitte frueh anfragen. Hochzeits-Samstage Mai-September gehen schnell weg. Sag mir Datum und Anlass im Show-Planer, ich antworte in 24h.",
    actions: [
      { label: "Show-Planer starten", icon: Wand2, kind: "open-planer" },
      { label: "Direkt anfragen", icon: Mail, kind: "show-form" },
    ],
  },
  {
    id: "dauer",
    keywords: ["dauer", "wie lang", "lange", "minuten", "stunden"],
    response:
      "Dauer wird ans Event angepasst: Close-Up 30-90 Min, Buehnenshow 15-60 Min, Magic Dinner 3-4 Stunden, Moderation nach Bedarf. Bei Empfaengen reichen oft 45-60 Min Close-Up.",
  },
  {
    id: "technik",
    keywords: [
      "technik",
      "ton",
      "licht",
      "mikrofon",
      "aufbau",
      "vorbereitung",
      "rider",
      "buehne aufbau",
      "soundcheck",
    ],
    response:
      "Close-Up braucht nichts - ich bringe alles mit. Buehnenshow idealerweise Mikrofon und Licht, ich stimme mit eurer Location ab und liefere einen Technik-Rider. Keine Sorgen.",
  },
  {
    id: "anfrage",
    keywords: ["anfrage", "buchen", "buchung", "show planen", "anlass", "anfragen", "reservieren"],
    response:
      "Am schnellsten geht der Show-Planer in 90 Sekunden - Format, Datum, Gaestezahl. Oder direkt das Mini-Formular hier im Chat. Antwort innerhalb 24h, oft schneller.",
    actions: [
      { label: "Show-Planer starten", icon: Wand2, kind: "open-planer" },
      { label: "Direkt anfragen", icon: Mail, kind: "show-form" },
      { label: "Zur Buchung", icon: ArrowRight, kind: "navigate", target: "/buchung" },
    ],
  },
  {
    id: "kontakt",
    keywords: ["kontakt", "telefon", "email", "e-mail", "whatsapp", "anrufen", "schreiben"],
    response:
      "Email el@magicel.de oder direkt das Mini-Formular hier im Chat. Antwortzeit in der Regel 24h, oft Minuten. WhatsApp-Button findest du unten auf der Seite.",
    actions: [
      { label: "Direkt anfragen", icon: Mail, kind: "show-form" },
      { label: "Buchungsseite", icon: Phone, kind: "navigate", target: "/buchung" },
    ],
  },
  {
    id: "referenzen",
    keywords: ["referenz", "bewertung", "rezension", "erfahrung", "kunde", "logo"],
    response:
      "5,0 Sterne auf Google und ProvenExpert, 30+ Bewertungen, 200+ Events. Kunden: Sixt, STRABAG, Sparkasse, VKB, XXXLutz, Schneider Weisse, Stadt Regensburg. Greatest Talent Finalist, Kreativpreistraeger.",
    actions: [
      {
        label: "Referenzen-Seite",
        icon: Building2,
        kind: "navigate",
        target: "/referenzen",
      },
    ],
  },
  {
    id: "faq",
    keywords: ["faq", "haeufige", "häufige", "fragen", "haeufig", "häufig"],
    response:
      "Komplette FAQ-Sammlung auf der FAQ-Seite - Buchung, Technik, Anfahrt, Stornierung, alles drin.",
    actions: [
      { label: "FAQ-Seite", icon: ArrowRight, kind: "navigate", target: "/faq" },
    ],
  },
  {
    id: "stornierung",
    keywords: ["storno", "stornierung", "absage", "absagen", "abbrechen", "verschieben"],
    response:
      "Stornogebuehren: bis 30 Tage 55%, bis 20 Tage 75%, unter 14 Tage 100%. Bei hoeherer Gewalt finden wir eine faire Loesung - am besten Termin verschieben statt absagen.",
  },
  {
    id: "ueber-mich",
    keywords: ["ueber dich", "über dich", "wer bist", "emilian", "leber", "magier"],
    response:
      "Emilian Leber - Magier seit dem 8. Lebensjahr, vollberuflich seit 2025. Greatest Talent Finalist 2023, Talents of Magic Finalist + Kreativpreis 2024, TVA TV-Auftritt 2025. Spezialitaet: Magic Dinner und Bayern-weite Privatfeiern.",
    actions: [
      {
        label: "Ueber mich",
        icon: ArrowRight,
        kind: "navigate",
        target: "/ueber-mich",
      },
    ],
  },
  {
    id: "kindergeburtstag",
    keywords: ["kindergeburtstag", "kinder", "kindergarten"],
    response:
      "Aktuell konzentriere ich mich auf Erwachsenen-Entertainment - Hochzeiten, Firmenfeiern, private Feiern. Bei Familienfeiern beziehe ich juengere Gaeste ein, reine Kindergeburtstage vermittle ich gerne weiter.",
  },
];

// ──────────────────────────────────────────────────────────────────────────
// Match-Logik
// ──────────────────────────────────────────────────────────────────────────

const GREETING_RE = /^(hi|hallo|hey|moin|servus|gruess|gruss|guten tag|guten morgen|guten abend|na)/i;
const THANKS_RE = /^(danke|vielen dank|super|toll|perfekt|klasse|geil|cool)/i;
const YES_RE = /^(ja|klar|gerne|auf jeden|definitiv|jep|jup)\b/i;
const NO_RE = /^(nein|nee|noe|nö|nicht|kein)\b/i;

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[?!.,;:]/g, " ")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/\s+/g, " ")
    .trim();
}

function findMatch(input: string): KnowledgeEntry | null {
  const norm = normalize(input);
  if (!norm) return null;
  let best: KnowledgeEntry | null = null;
  let bestScore = 0;
  for (const entry of KNOWLEDGE) {
    let score = 0;
    for (const kw of entry.keywords) {
      const nkw = normalize(kw);
      if (norm.includes(nkw)) {
        // length-weighted match, prefers more specific keywords
        score += nkw.length + 2;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return bestScore > 0 ? best : null;
}

function buildResponse(input: string): { text: string; actions?: ChatAction[] } {
  const norm = normalize(input);

  const match = findMatch(input);
  if (match) {
    return { text: match.response, actions: match.actions };
  }

  if (GREETING_RE.test(norm)) {
    return {
      text:
        "Hi, ich bin Karta - ich helfe bei Fragen zur Show und Buchung. Was interessiert dich? Anlass, Format, Preise oder Termin?",
      actions: WELCOME_QUICK,
    };
  }

  if (THANKS_RE.test(norm)) {
    return {
      text:
        "Gerne. Wenn du direkt anfragen magst: Show-Planer dauert 90 Sekunden, oder Mini-Formular hier im Chat.",
      actions: [
        { label: "Show-Planer", icon: Wand2, kind: "open-planer" },
        { label: "Direkt anfragen", icon: Mail, kind: "show-form" },
      ],
    };
  }

  if (YES_RE.test(norm)) {
    return {
      text:
        "Super. Am schnellsten geht der Show-Planer - 90 Sekunden, dann habe ich Anlass, Datum und Gaestezahl und antworte innerhalb 24h.",
      actions: [
        { label: "Show-Planer starten", icon: Wand2, kind: "open-planer" },
        { label: "Direkt anfragen", icon: Mail, kind: "show-form" },
      ],
    };
  }

  if (NO_RE.test(norm)) {
    return {
      text:
        "Alles gut. Frag einfach weiter, ich beantworte Anlass, Format, Preise, Termine oder Technik. Oder schau in die FAQ.",
      actions: [
        { label: "FAQ-Seite", icon: ArrowRight, kind: "navigate", target: "/faq" },
      ],
    };
  }

  return {
    text:
      "Das beantworte ich am besten persoenlich. Starte den Show-Planer (90 Sek) oder schicke mir kurz Name + Email hier im Chat - Antwort innerhalb 24h.",
    actions: [
      { label: "Show-Planer starten", icon: Wand2, kind: "open-planer" },
      { label: "Direkt anfragen", icon: Mail, kind: "show-form" },
      { label: "FAQ-Seite", icon: ArrowRight, kind: "navigate", target: "/faq" },
    ],
  };
}

// ──────────────────────────────────────────────────────────────────────────
// Welcome Quick-Replies
// ──────────────────────────────────────────────────────────────────────────

const WELCOME_QUICK: ChatAction[] = [
  { label: "Hochzeit", icon: Heart, kind: "send-message", target: "Ich plane eine Hochzeit" },
  {
    label: "Firmenfeier",
    icon: Building2,
    kind: "send-message",
    target: "Wir planen eine Firmenfeier",
  },
  { label: "Preise", icon: Coins, kind: "send-message", target: "Was kostet eine Buchung?" },
  { label: "Termin", icon: Calendar, kind: "send-message", target: "Habt ihr einen Termin frei?" },
  { label: "Show-Planer oeffnen", icon: Wand2, kind: "open-planer" },
];

// ──────────────────────────────────────────────────────────────────────────
// Mini-Inquiry-Form
// ──────────────────────────────────────────────────────────────────────────

type InquiryForm = {
  name: string;
  email: string;
  anlass: string;
  message: string;
};

const EMPTY_FORM: InquiryForm = {
  name: "",
  email: "",
  anlass: "",
  message: "",
};

// ──────────────────────────────────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────────────────────────────────

let msgCounter = 0;
const newId = () => `m-${Date.now()}-${msgCounter++}`;

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<InquiryForm>(EMPTY_FORM);

  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: newId(),
      role: "bot",
      text:
        "Hi, ich bin Karta - dein Show-Helfer fuer magicel.de. Frag mich zu Hochzeit, Firmenfeier, Magic Dinner, Preisen oder Terminen. Oder starte direkt den Show-Planer.",
      actions: WELCOME_QUICK,
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Count bot messages to trigger automatic form prompt after 3+
  const botMessageCount = useMemo(
    () => messages.filter((m) => m.role === "bot").length,
    [messages],
  );

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  // External trigger (open-chatbot event)
  useEffect(() => {
    const handler = () => setOpen(true);
    document.addEventListener("open-chatbot", handler);
    return () => document.removeEventListener("open-chatbot", handler);
  }, []);

  // Body scroll-lock on mobile fullscreen
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(max-width: 767px)");
    if (!mq.matches) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Email-capture on form input
  useEffect(() => {
    if (form.email && form.email.includes("@") && !submitted) {
      captureEmail(form.email, "chatbot", {
        name: form.name,
        anlass: form.anlass,
        message: form.message,
      });
    }
  }, [form, submitted]);

  // ────────────────────────────────────────────────────────────────────────
  // Send / Action handling
  // ────────────────────────────────────────────────────────────────────────

  const pushBot = (msg: Omit<Message, "id" | "role">) => {
    setMessages((prev) => [
      ...prev,
      { id: newId(), role: "bot", ...msg },
    ]);
  };

  const pushUser = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: newId(), role: "user", text },
    ]);
  };

  const triggerPlaner = () => {
    setOpen(false);
    // ShowPlanerTrigger listens for hashchange
    window.location.hash = "#planer";
  };

  const triggerNavigate = (target: string) => {
    setOpen(false);
    window.location.href = target;
  };

  const triggerForm = () => {
    setMessages((prev) => {
      // Avoid duplicate form-prompts
      if (prev.some((m) => m.showForm)) return prev;
      return [
        ...prev,
        {
          id: newId(),
          role: "bot",
          text:
            "Klar. Name, Email und eine kurze Nachricht reichen - ich melde mich innerhalb 24h zurueck.",
          showForm: true,
        },
      ];
    });
  };

  const handleSend = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    setInput("");
    pushUser(text);
    setIsTyping(true);

    const delay = 380 + Math.random() * 380;
    setTimeout(() => {
      const response = buildResponse(text);
      pushBot({ text: response.text, actions: response.actions });
      setIsTyping(false);

      // After 3+ bot messages, gently nudge inline-form once
      setTimeout(() => {
        setMessages((prev) => {
          const botCount = prev.filter((m) => m.role === "bot").length;
          const hasForm = prev.some((m) => m.showForm);
          const alreadyNudged = prev.some(
            (m) => m.role === "bot" && m.text.startsWith("Soll ich direkt"),
          );
          if (botCount >= 3 && !hasForm && !alreadyNudged && !submitted) {
            return [
              ...prev,
              {
                id: newId(),
                role: "bot",
                text:
                  "Soll ich direkt eine Anfrage aufnehmen? Name + Email + kurze Nachricht, ich antworte in 24h.",
                actions: [
                  { label: "Ja, anfragen", icon: Mail, kind: "show-form" },
                  {
                    label: "Lieber Show-Planer",
                    icon: Wand2,
                    kind: "open-planer",
                  },
                ],
              },
            ];
          }
          return prev;
        });
      }, 600);
    }, delay);
  };

  const handleAction = (action: ChatAction) => {
    switch (action.kind) {
      case "navigate":
        if (action.target) triggerNavigate(action.target);
        break;
      case "open-planer":
        triggerPlaner();
        break;
      case "show-form":
        triggerForm();
        break;
      case "send-message":
        if (action.target) handleSend(action.target);
        break;
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.email.includes("@")) return;
    setSubmitting(true);

    // Capture + mark submitted
    captureEmail(form.email, "chatbot", {
      name: form.name,
      anlass: form.anlass,
      message: form.message,
    });
    markEmailSubmitted();

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      pushBot({
        text: `Danke ${form.name.split(" ")[0]}. Ich habe deine Anfrage notiert und melde mich innerhalb 24h auf ${form.email}. Falls du Lust hast, fuelle den Show-Planer mit Details aus.`,
        actions: [
          { label: "Show-Planer starten", icon: Wand2, kind: "open-planer" },
          {
            label: "Zur Buchungsseite",
            icon: ArrowRight,
            kind: "navigate",
            target: `/buchung?name=${encodeURIComponent(form.name)}&email=${encodeURIComponent(form.email)}&anlass=${encodeURIComponent(form.anlass)}`,
          },
        ],
      });
    }, 700);
  };

  // ────────────────────────────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Floating FAB - bottom LEFT (Show-Planer-FAB is bottom right) */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] left-5 md:bottom-7 md:left-7 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg md:shadow-xl flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95 group"
        style={{
          background: `linear-gradient(135deg, ${ACCENT_DEEP} 0%, ${ACCENT} 60%, ${ACCENT_DEEP} 100%)`,
          boxShadow: `0 10px 24px -10px ${ACCENT_DEEP}99, 0 3px 8px -3px ${ACCENT}66`,
        }}
        aria-label={open ? "Chat schliessen" : "Chat oeffnen"}
        aria-expanded={open}
      >
        {open ? (
          <X className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
        ) : (
          <>
            <Wand2 className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
            <span
              className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white animate-pulse"
              style={{ background: AMBER }}
              aria-hidden="true"
            />
          </>
        )}
      </button>

      {/* Chat Panel */}
      {open && (
        <div
          className="fixed z-50 flex flex-col overflow-hidden shadow-2xl
                     inset-0 md:inset-auto
                     md:bottom-24 md:left-7
                     md:w-[380px] md:max-h-[600px] md:h-[600px]
                     md:rounded-3xl
                     animate-fade-up"
          style={{
            background: CREAM,
            animationDuration: "0.28s",
            border: `1px solid ${ACCENT}1f`,
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Chat mit Karta"
        >
          {/* Header */}
          <div
            className="relative px-5 py-4 flex items-center gap-3 shrink-0"
            style={{
              background: `linear-gradient(135deg, ${ACCENT_DEEP} 0%, ${DARK_BG} 100%)`,
            }}
          >
            {/* Warm amber glow */}
            <div
              className="absolute inset-0 pointer-events-none opacity-60"
              style={{
                background: `radial-gradient(ellipse at top right, ${AMBER}26 0%, transparent 60%)`,
              }}
              aria-hidden="true"
            />
            <div
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-white font-display font-black text-lg shrink-0"
              style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DEEP} 100%)`,
                boxShadow: `0 0 0 2px ${AMBER}40, 0 4px 12px -2px ${ACCENT_DEEP}`,
              }}
              aria-hidden="true"
            >
              K
            </div>
            <div className="relative flex-1 min-w-0">
              <p className="font-display text-sm font-bold text-white tracking-tight">
                Karta
              </p>
              <p
                className={`${SERIF_ITALIC} text-[12px] text-white/75 leading-tight truncate`}
              >
                Dein Show-Helfer
              </p>
            </div>
            <div className="relative flex items-center gap-1.5 mr-1">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#5ee49c" }}
                aria-hidden="true"
              />
              <span className="text-[10px] text-white/70 uppercase tracking-widest font-semibold hidden sm:inline">
                online
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="relative w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Chat schliessen"
            >
              <X className="w-4 h-4 text-white" aria-hidden="true" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            style={{ background: CREAM }}
          >
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                msg={msg}
                form={form}
                setForm={setForm}
                onAction={handleAction}
                onSubmit={handleFormSubmit}
                submitting={submitting}
                submitted={submitted}
              />
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2 justify-start">
                <BotAvatar />
                <div
                  className="px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1.5 bg-white"
                  style={{ borderLeft: `2px solid ${ACCENT}` }}
                  aria-label="Karta tippt"
                >
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{
                        background: ACCENT,
                        animationDelay: `${d}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex gap-2 px-4 py-3 shrink-0"
            style={{
              borderTop: `1px solid ${ACCENT}1a`,
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(8px)",
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Frag mich etwas..."
              aria-label="Nachricht an Karta"
              className="flex-1 px-4 py-2.5 rounded-full text-sm focus:outline-none transition-shadow"
              style={{
                background: "white",
                border: `1px solid ${ACCENT}26`,
                color: "hsl(260 15% 12%)",
              }}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Nachricht senden"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              style={{
                background: input.trim()
                  ? `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DEEP} 100%)`
                  : "#cfc6c0",
              }}
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

// ──────────────────────────────────────────────────────────────────────────
// Sub-Components
// ──────────────────────────────────────────────────────────────────────────

const BotAvatar = () => (
  <div
    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 text-white font-display font-black text-[11px]"
    style={{
      background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DEEP} 100%)`,
      boxShadow: `0 0 0 2px ${AMBER}40`,
    }}
    aria-hidden="true"
  >
    K
  </div>
);

type MessageBubbleProps = {
  msg: Message;
  form: InquiryForm;
  setForm: (f: InquiryForm) => void;
  onAction: (a: ChatAction) => void;
  onSubmit: (e: FormEvent) => void;
  submitting: boolean;
  submitted: boolean;
};

const MessageBubble = ({
  msg,
  form,
  setForm,
  onAction,
  onSubmit,
  submitting,
  submitted,
}: MessageBubbleProps) => {
  const isBot = msg.role === "bot";
  return (
    <div>
      <div
        className={`flex gap-2 ${isBot ? "justify-start" : "justify-end"}`}
      >
        {isBot && <BotAvatar />}
        <div
          className="max-w-[82%] px-4 py-2.5 text-[13.5px] leading-[1.55] whitespace-pre-line"
          style={
            isBot
              ? {
                  background: "white",
                  color: "hsl(260 15% 12%)",
                  borderLeft: `2px solid ${ACCENT}`,
                  borderRadius: "18px 18px 18px 6px",
                  boxShadow: "0 6px 18px -8px rgba(92,22,34,0.25)",
                }
              : {
                  background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DEEP} 100%)`,
                  color: "white",
                  borderRadius: "18px 18px 6px 18px",
                  boxShadow: "0 6px 18px -8px rgba(92,22,34,0.4)",
                }
          }
        >
          {msg.text}
        </div>
      </div>

      {/* Actions */}
      {isBot && msg.actions && msg.actions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 ml-9 mt-2">
          {msg.actions.map((a, j) => {
            const Icon = a.icon;
            return (
              <button
                key={j}
                onClick={() => onAction(a)}
                aria-label={a.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] font-semibold tracking-tight transition-all hover:scale-[1.03] active:scale-[0.97]"
                style={{
                  background: "white",
                  border: `1px solid ${ACCENT}33`,
                  color: ACCENT_DEEP,
                }}
              >
                {Icon && <Icon className="w-3 h-3" aria-hidden="true" />}
                {a.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Inline Mini-Form */}
      {isBot && msg.showForm && !submitted && (
        <form
          onSubmit={onSubmit}
          className="ml-9 mt-3 p-3 rounded-2xl space-y-2"
          style={{
            background: "white",
            border: `1px solid ${ACCENT}33`,
            boxShadow: "0 8px 24px -10px rgba(92,22,34,0.25)",
          }}
        >
          <FormField
            label="Name"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
            placeholder="Vor- und Nachname"
            required
          />
          <FormField
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            placeholder="name@beispiel.de"
            required
          />
          <FormField
            label="Anlass"
            value={form.anlass}
            onChange={(v) => setForm({ ...form, anlass: v })}
            placeholder="Hochzeit, Firmenfeier, Magic Dinner..."
          />
          <FormField
            label="Nachricht"
            value={form.message}
            onChange={(v) => setForm({ ...form, message: v })}
            placeholder="Datum, Gaestezahl, Wunsch"
            multiline
          />
          <button
            type="submit"
            disabled={submitting || !form.name.trim() || !form.email.includes("@")}
            className="w-full px-4 py-2.5 rounded-full text-[12px] font-semibold tracking-[0.08em] uppercase text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DEEP} 100%)`,
            }}
          >
            {submitting ? "Sende..." : "Anfrage senden"}
          </button>
          <p className="text-[10px] text-foreground/50 text-center pt-1">
            Antwort innerhalb 24h auf deine Email.
          </p>
        </form>
      )}
    </div>
  );
};

type FormFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
};

const FormField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  multiline,
}: FormFieldProps) => {
  const baseStyle = {
    background: CREAM,
    border: `1px solid ${ACCENT}26`,
    color: "hsl(260 15% 12%)",
  } as const;
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.1em] font-semibold mb-1 text-foreground/60">
        {label}
        {required && <span style={{ color: ACCENT }}> *</span>}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={2}
          className="w-full px-3 py-2 rounded-xl text-[12.5px] focus:outline-none resize-none"
          style={baseStyle}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full px-3 py-2 rounded-xl text-[12.5px] focus:outline-none"
          style={baseStyle}
        />
      )}
    </label>
  );
};

// Suppress unused-import lint hint - icons used dynamically via knowledge actions
void MapPin;

export default Chatbot;
