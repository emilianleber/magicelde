/**
 * /tickets/:slug — Detailseite eines öffentlichen Termins (Daten: src/data/events.ts).
 * JSON-LD (FoodEvent, VideoObject, FAQPage, BreadcrumbList) kommt aus dem
 * Prerender (scripts/seo-content.mjs) — Helmet rendert keine <script>-Tags.
 */
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin, Ticket, ArrowRight, ChevronRight } from "lucide-react";
import VoltageShell from "@/components/voltage/VoltageShell";
import { FactsGrid, PullQuote, FAQ, FinalCTA, SectionHeader } from "@/components/voltage/sections";
import { COBALT, MAGENTA, INK, WHITE, PAPER, L_LINE, L_DIM, REAL_REVIEWS, Eyebrow, up, stagger, vp } from "@/components/voltage/theme";
import { EventVideo, TicketButton } from "@/components/events/EventBits";
import { EVENTS } from "@/data/events";
import plakatImg from "@/assets/magic-dinner-2027-plakat.webp";

export default function EventDetail() {
  const { slug } = useParams();
  const event = EVENTS.find((e) => e.slug === slug);
  if (!event) return <Navigate to="/tickets" replace />;

  const past = new Date(event.startDate) < new Date();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${event.venue.name}, ${event.venue.street}, ${event.venue.postalCode} ${event.venue.city}`,
  )}`;

  return (
    <VoltageShell
      title={`Magic Dinner bei Regensburg: ${event.weekdayShort} – Tickets`}
      description={event.summary}
      path={event.path}
      image={event.images.wide}
      noindex={false}
    >
      {/* Hero */}
      <header className="relative overflow-hidden px-5 md:px-10 pt-8 md:pt-14 pb-14 md:pb-20" style={{ background: WHITE }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-24 w-[640px] h-[640px] rounded-full" style={{ background: `radial-gradient(circle, ${MAGENTA}1c 0%, transparent 60%)`, filter: "blur(30px)" }} />
        </div>
        <motion.div variants={stagger} initial="hidden" animate="show" className="relative max-w-7xl mx-auto">
          <motion.nav variants={up} aria-label="Brotkrumen" className="flex items-center gap-1.5 text-[13px] mb-6" style={{ color: L_DIM }}>
            <Link to="/">Start</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/tickets">Tickets</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: INK }}>Magic Dinner {event.weekdayShort.replace(/^Sa /, "")}</span>
          </motion.nav>

          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-center">
            <div>
              <motion.div variants={up}>
                <Eyebrow>{event.weekdayShort} · {event.venue.regionHint}</Eyebrow>
              </motion.div>
              <motion.h1 variants={up} className="font-extrabold tracking-[-0.03em]" style={{ fontSize: "clamp(2.5rem,6vw,5rem)", lineHeight: 0.98, color: INK }}>
                Magic Dinner<span style={{ color: MAGENTA }}>.</span>
                <br />
                <span style={{ color: COBALT }}>Eine Show in 3 Gängen</span>
              </motion.h1>
              <motion.p variants={up} className="mt-6 max-w-lg text-[16px] md:text-lg leading-[1.6]" style={{ color: L_DIM }}>
                {event.dateLabel} im {event.venue.name} in {event.venue.regionHint}: ein 3-Gänge-Menü — und zwischen den Gängen
                Zauberei und Comedy von Emilian Leber direkt an eurem Tisch.
              </motion.p>
              <motion.div variants={up} className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                {past ? (
                  <span className="text-[15px] font-semibold" style={{ color: INK }}>Dieser Abend hat bereits stattgefunden.</span>
                ) : (
                  <TicketButton event={event} />
                )}
                <a href="#der-abend" className="inline-flex items-center gap-1.5 text-[14px] font-semibold border-b pb-1 self-start sm:self-auto" style={{ color: INK, borderColor: L_LINE }}>
                  Was euch erwartet <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
              <motion.p variants={up} className="mt-6 text-[14px]" style={{ color: L_DIM }}>
                <strong style={{ color: INK }}>{event.priceLabel}</strong> pro Person · {event.priceIncludes} · Einlass {event.doorLabel}, Beginn {event.startLabel}
              </motion.p>
            </div>
            <motion.div variants={up}>
              <EventVideo event={event} />
            </motion.div>
          </div>
        </motion.div>
      </header>

      <FactsGrid
        items={[
          { Icon: CalendarDays, k: "Datum", v: event.weekdayShort },
          { Icon: Clock, k: "Einlass · Beginn", v: `${event.doorLabel.replace(" Uhr", "")} · ${event.startLabel}` },
          { Icon: MapPin, k: "Ort", v: `Wald & Wiese, ${event.venue.city}` },
          { Icon: Ticket, k: "Ticket p. P.", v: `${event.priceLabel} inkl. Menü` },
        ]}
      />

      {/* Der Abend */}
      <motion.section id="der-abend" variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
          <div>
            <motion.div variants={up}>
              <SectionHeader
                eyebrow="Der Abend"
                title={<>Lachen, Staunen und <span style={{ color: COBALT }}>Genießen</span>.</>}
              />
            </motion.div>
            {event.description.map((para) => (
              <motion.p key={para.slice(0, 24)} variants={up} className="mt-5 text-[16px] md:text-[17px] leading-[1.75]" style={{ color: L_DIM }}>
                {para}
              </motion.p>
            ))}
            <motion.ul variants={up} className="mt-8 space-y-3">
              {event.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-[15.5px]" style={{ color: INK }}>
                  <span className="mt-2 w-2 h-2 rounded-full shrink-0" style={{ background: MAGENTA }} />
                  {h}
                </li>
              ))}
            </motion.ul>
          </div>
          <motion.figure variants={up} className="rounded-[24px] overflow-hidden" style={{ background: INK, boxShadow: "0 40px 80px -34px rgba(10,11,15,0.4)" }}>
            <img
              src={plakatImg}
              alt={`Plakat: Magic Dinner – Eine Show in 3 Gängen, ${event.weekdayShort}, Wald & Wiese Sinzing, ${event.priceLabel} pro Person`}
              className="w-full h-auto"
              width={1200}
              height={840}
              loading="lazy"
            />
          </motion.figure>
        </div>
      </motion.section>

      {/* Anfahrt */}
      <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-20" style={{ background: PAPER, borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <motion.div variants={up}>
            <SectionHeader
              eyebrow="Location"
              title={<>{event.venue.name}<span style={{ color: MAGENTA }}>.</span></>}
              sub={`${event.venue.street}, ${event.venue.postalCode} ${event.venue.city} — im Landkreis Regensburg, direkt vor den Toren der Stadt. Das Wald & Wiese ist Emilians Hauspartner für das Magic Dinner.`}
            />
          </motion.div>
          <motion.div variants={up} className="flex flex-wrap gap-4 md:justify-end">
            <a href={mapsUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold" style={{ background: INK, color: WHITE }}>
              <MapPin className="w-4 h-4" /> Route planen
            </a>
            <a href={event.venue.url} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold" style={{ border: `1px solid ${L_LINE}`, color: INK, background: WHITE }}>
              Zum Restaurant <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </motion.section>

      <PullQuote review={REAL_REVIEWS.waldwiese} />

      <FAQ eyebrow="Gut zu wissen" title="Fragen zum Magic Dinner." items={event.faqs} />

      {!past && (
        <section className="px-5 md:px-10 pb-4">
          <div className="max-w-7xl mx-auto rounded-[26px] px-6 md:px-14 py-12 md:py-16 flex flex-col md:flex-row md:items-center gap-6 md:gap-10" style={{ background: INK }}>
            <div className="flex-1">
              <p className="text-[12px] tracking-[0.16em] uppercase font-bold mb-2" style={{ color: MAGENTA }}>{event.weekdayShort} · {event.venue.city}</p>
              <p className="font-extrabold tracking-[-0.02em] leading-tight" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: WHITE }}>
                Sichert euch euren Tisch beim Magic Dinner.
              </p>
              <p className="mt-2 text-[15px]" style={{ color: "rgba(255,255,255,0.7)" }}>
                {event.priceLabel} pro Person · {event.priceIncludes} · Tickets bei {event.ticketProvider}
              </p>
            </div>
            <TicketButton event={event} dark />
          </div>
        </section>
      )}

      <FinalCTA
        title={<>Magic Dinner für eure eigene Feier<span style={{ color: MAGENTA }}>?</span></>}
        sub="Das Format gibt es auch privat — für Firmen- und Weihnachtsfeiern, Geburtstage oder Hochzeiten, im Wald & Wiese oder in eurer Location. Antwort innerhalb von 24 Stunden."
      />
    </VoltageShell>
  );
}
