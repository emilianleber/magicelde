/** Bausteine für öffentliche Termine: Showreel-Video, Event-Karte, Teaser-Band. */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Clock, MapPin, Ticket, Volume2, VolumeX } from "lucide-react";
import { COBALT, MAGENTA, INK, WHITE, L_LINE, L_DIM, CARD_LIGHT, up } from "@/components/voltage/theme";
import { salesOpen, type PublicEvent } from "@/data/events";

const cta = "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold transition-transform hover:scale-[1.02]";

/** Ticket-Button: vor Vorverkaufsstart „Vorverkauf ab …", danach „Tickets sichern". */
export function TicketButton({ event, dark = false }: { event: PublicEvent; dark?: boolean }) {
  const open = salesOpen(event);
  return (
    <a
      href={event.ticketUrl}
      target="_blank"
      rel="noopener"
      className={cta}
      style={{ background: dark ? WHITE : COBALT, color: dark ? INK : WHITE }}
    >
      <Ticket className="w-4 h-4" />
      {open ? `Tickets sichern · ${event.priceLabel}` : `Vorverkauf ab ${event.salesStartLabel.replace(/ 2026$/, "")}`}
      <ArrowRight className="w-4 h-4" />
    </a>
  );
}

/**
 * Showreel: Querformat ab 768 px, Hochformat darunter. Startet stumm (Autoplay
 * erlaubt nur stumm), Ton per Knopf. Quelle wird erst nach dem Mount gewählt,
 * damit nie beide Dateien geladen werden.
 */
export function EventVideo({ event, className = "" }: { event: PublicEvent; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [tall, setTall] = useState<boolean | null>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const set = () => setTall(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted) v.play().catch(() => {});
    setMuted(v.muted);
  };

  const src = tall ? event.video.tall : event.video.wide;
  const poster = tall ? event.video.posterTall : event.video.posterWide;

  return (
    <div
      className={`relative overflow-hidden mx-auto ${className}`}
      style={{
        borderRadius: "1.5rem",
        background: INK,
        aspectRatio: tall ? "9/16" : "16/9",
        maxWidth: tall ? 440 : undefined,
        boxShadow: "0 40px 80px -34px rgba(10,11,15,0.45)",
      }}
    >
      {tall !== null && (
        <video
          key={src}
          ref={ref}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={event.video.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <button
        type="button"
        onClick={toggleSound}
        className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold"
        style={{ background: "rgba(10,11,15,0.6)", color: WHITE, backdropFilter: "blur(10px)" }}
        aria-pressed={!muted}
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        {muted ? "Ton an" : "Ton aus"}
      </button>
    </div>
  );
}

/** Große Event-Karte für /tickets. */
export function EventCard({ event, image }: { event: PublicEvent; image: string }) {
  const facts = [
    { Icon: CalendarDays, v: event.dateLabel },
    { Icon: Clock, v: `Einlass ${event.doorLabel} · Beginn ${event.startLabel}` },
    { Icon: MapPin, v: `${event.venue.name}, ${event.venue.street}, ${event.venue.postalCode} ${event.venue.city}` },
  ];
  return (
    <motion.article
      variants={up}
      className="grid lg:grid-cols-[1.05fr_1fr] rounded-[28px] overflow-hidden"
      style={{ background: CARD_LIGHT, border: `1px solid ${L_LINE}`, boxShadow: "0 30px 70px -36px rgba(10,11,15,0.35)" }}
    >
      <Link to={event.path} className="block" style={{ background: INK }}>
        <img
          src={image}
          alt={`Plakat ${event.name} — ${event.weekdayShort}, ${event.venue.regionHint}`}
          className="w-full h-full object-cover"
          style={{ aspectRatio: "10/7" }}
          loading="lazy"
        />
      </Link>
      <div className="p-7 md:p-10 flex flex-col">
        <span
          className="self-start inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[12px] font-semibold mb-5"
          style={{ background: INK, color: WHITE }}
        >
          <span className="w-2 h-2 rounded-full" style={{ background: MAGENTA }} />
          {salesOpen(event) ? "Vorverkauf läuft" : `Vorverkauf ab ${event.salesStartLabel}`}
        </span>
        <h3 className="font-extrabold tracking-[-0.02em] leading-tight mb-2" style={{ fontSize: "clamp(1.6rem,2.4vw,2.2rem)", color: INK }}>
          <Link to={event.path}>Magic Dinner</Link>
          <span style={{ color: MAGENTA }}>.</span>
        </h3>
        <p className="text-[15px] font-semibold mb-5" style={{ color: COBALT }}>{event.tagline} · {event.venue.regionHint}</p>
        <ul className="space-y-3 mb-6">
          {facts.map(({ Icon, v }) => (
            <li key={v} className="flex items-start gap-3 text-[15px]" style={{ color: INK }}>
              <Icon className="w-4 h-4 mt-1 shrink-0" style={{ color: COBALT }} />
              {v}
            </li>
          ))}
        </ul>
        <p className="text-[15px] leading-[1.65] mb-7" style={{ color: L_DIM }}>
          {event.priceLabel} pro Person — {event.priceIncludes}. Zwischen den Gängen kommt die Magie direkt an euren Tisch.
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-4">
          <TicketButton event={event} />
          <Link to={event.path} className="inline-flex items-center gap-1.5 text-[14px] font-semibold border-b pb-1" style={{ color: INK, borderColor: L_LINE }}>
            Alle Infos zum Abend <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/** Schmales Teaser-Band für Format-Seiten (z. B. /magic-dinner). */
export function EventTeaser({ event }: { event: PublicEvent }) {
  return (
    <section className="px-5 md:px-10 py-8 md:py-10" style={{ background: INK }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
        <div className="flex-1">
          <p className="text-[12px] tracking-[0.16em] uppercase font-bold mb-2" style={{ color: MAGENTA }}>
            Nächster öffentlicher Termin
          </p>
          <p className="font-extrabold tracking-[-0.02em] text-[22px] md:text-[26px] leading-tight" style={{ color: WHITE }}>
            Magic Dinner · {event.weekdayShort} · {event.venue.name}, {event.venue.city}
          </p>
          <p className="text-[15px] mt-1.5" style={{ color: "rgba(255,255,255,0.7)" }}>
            {event.priceIncludes} · {event.priceLabel} pro Person · Einlass {event.doorLabel}, Beginn {event.startLabel}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <TicketButton event={event} dark />
          <Link to={event.path} className="inline-flex items-center gap-1.5 text-[14px] font-semibold" style={{ color: WHITE }}>
            Mehr zum Abend <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
