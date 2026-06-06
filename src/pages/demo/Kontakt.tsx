/** /demo/kontakt — Kontakt-Template. Echte Kontaktwege + Formular (Demo) + FAQ. */
import VoltageShell from "@/components/voltage/VoltageShell";
import { FAQ } from "@/components/voltage/sections";
import { motion } from "framer-motion";
import {
  INK, WHITE, PAPER, COBALT, MAGENTA, L_LINE, L_DIM,
  EMAIL, EMAIL_HREF, PHONE_HREF, PHONE_DISPLAY, WHATSAPP,
  up, stagger, vp, Eyebrow, Stars, GoogleG, cta,
} from "@/components/voltage/theme";
import { Mail, Phone, MessageCircle, ArrowRight, Clock } from "lucide-react";

const field = "w-full rounded-[12px] px-4 py-3 text-[15px] outline-none transition-colors focus:border-[#1D3FFF]";

export default function DemoKontakt() {
  return (
    <VoltageShell
      title="DEMO · Kontakt — Termin anfragen | Emilian Leber"
      description="Termin anfragen bei Emilian Leber, Comedy-Zauberer aus Regensburg. Eine kurze Nachricht reicht — Antwort in unter 24 Stunden, sieben Tage die Woche."
      path="/demo/kontakt"
    >
      <header className="relative overflow-hidden px-5 md:px-10 pt-12 md:pt-20 pb-10" style={{ background: WHITE }}>
        <div aria-hidden className="absolute -top-44 left-1/2 -translate-x-1/2 w-[760px] h-[680px] rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${COBALT}1a 0%, transparent 60%)`, filter: "blur(30px)" }} />
        <motion.div variants={stagger} initial="hidden" animate="show" className="relative max-w-3xl mx-auto text-center">
          <motion.div variants={up} className="flex justify-center"><Eyebrow>Kontakt</Eyebrow></motion.div>
          <motion.h1 variants={up} className="font-extrabold tracking-[-0.03em]" style={{ fontSize: "clamp(2.5rem,6vw,5rem)", lineHeight: 0.98, color: INK }}>Schreib mir<span style={{ color: MAGENTA }}>.</span></motion.h1>
          <motion.p variants={up} className="mt-6 text-[16px] md:text-lg leading-[1.6] max-w-xl mx-auto" style={{ color: L_DIM }}>Eine kurze Nachricht reicht: Datum, Anlass, Ort — und ich melde mich persönlich. Antwort in unter 24 Stunden, sieben Tage die Woche.</motion.p>
          <motion.div variants={up} className="mt-7 inline-flex items-center gap-3 text-[13px]" style={{ color: L_DIM }}>
            <Stars s={15} /> <span style={{ color: INK, fontWeight: 600 }}>5,0</span> · 30+ Bewertungen <GoogleG s={15} />
          </motion.div>
        </motion.div>
      </header>

      {/* Kontaktwege */}
      <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 pb-4">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-4">
          <motion.a variants={up} href={EMAIL_HREF} className="rounded-[20px] p-6 transition-transform hover:scale-[1.02]" style={{ background: COBALT, color: WHITE }}>
            <Mail className="w-6 h-6" /><p className="mt-4 text-[13px] uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.8)" }}>E-Mail</p><p className="text-[17px] font-bold mt-0.5">{EMAIL}</p>
          </motion.a>
          <motion.a variants={up} href={PHONE_HREF} className="rounded-[20px] p-6 transition-transform hover:scale-[1.02]" style={{ background: WHITE, border: `1px solid ${L_LINE}` }}>
            <Phone className="w-6 h-6" style={{ color: COBALT }} /><p className="mt-4 text-[13px] uppercase tracking-wide" style={{ color: L_DIM }}>Telefon</p><p className="text-[17px] font-bold mt-0.5" style={{ color: INK }}>{PHONE_DISPLAY}</p>
          </motion.a>
          <motion.a variants={up} href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="rounded-[20px] p-6 transition-transform hover:scale-[1.02]" style={{ background: WHITE, border: `1px solid ${L_LINE}` }}>
            <MessageCircle className="w-6 h-6" style={{ color: COBALT }} /><p className="mt-4 text-[13px] uppercase tracking-wide" style={{ color: L_DIM }}>WhatsApp</p><p className="text-[17px] font-bold mt-0.5" style={{ color: INK }}>Direkt schreiben</p>
          </motion.a>
        </div>
      </motion.section>

      {/* Formular (Demo) */}
      <motion.section variants={up} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-12 md:py-16">
        <div className="max-w-3xl mx-auto rounded-[28px] p-7 md:p-10" style={{ background: PAPER, border: `1px solid ${L_LINE}` }}>
          <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", color: INK }}>Erzähl mir von eurem Event</h2>
          <form className="mt-7 grid sm:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
            <input className={field} style={{ background: WHITE, border: `1px solid ${L_LINE}` }} placeholder="Name" />
            <input className={field} style={{ background: WHITE, border: `1px solid ${L_LINE}` }} placeholder="E-Mail" type="email" />
            <input className={field} style={{ background: WHITE, border: `1px solid ${L_LINE}` }} placeholder="Anlass (z.B. Hochzeit)" />
            <input className={field} style={{ background: WHITE, border: `1px solid ${L_LINE}` }} placeholder="Datum" />
            <input className={field} style={{ background: WHITE, border: `1px solid ${L_LINE}` }} placeholder="Gästezahl" />
            <input className={field} style={{ background: WHITE, border: `1px solid ${L_LINE}` }} placeholder="Ort" />
            <textarea className={`${field} sm:col-span-2`} style={{ background: WHITE, border: `1px solid ${L_LINE}`, minHeight: 120 }} placeholder="Worum geht's? (optional)" />
            <a href={EMAIL_HREF} className={`${cta} sm:col-span-2 justify-center`} style={{ background: COBALT, color: WHITE }}>Anfrage senden <ArrowRight className="w-4 h-4" /></a>
          </form>
          <p className="mt-5 text-[13px] inline-flex items-center gap-2" style={{ color: L_DIM }}><Clock className="w-4 h-4" style={{ color: COBALT }} /> Antwort in unter 24 Stunden — versprochen. (Demo-Formular — Versand per E-Mail.)</p>
        </div>
      </motion.section>

      <FAQ
        items={[
          { q: "Wie weit im Voraus sollte ich buchen?", a: "Wochenenden in der Hochsaison (Mai–September, Dezember) brauchen 8–12 Wochen Vorlauf. Kurzfristige Anfragen prüfe ich gern — manchmal geht auch noch was in 2 Wochen." },
          { q: "Wo trittst du auf?", a: "Schwerpunkt Bayern, deutschlandweit gerne mit transparent kalkulierter Anfahrt. Österreich und Schweiz auf Anfrage." },
          { q: "Welche Formate gibt es?", a: "Close-Up (Tischmagie), Bühnenshow, Magic Dinner und Moderation — einzeln oder kombiniert, passend zu eurem Anlass." },
          { q: "Wie läuft die Buchung ab?", a: "Kurze Nachricht mit Datum, Anlass und Ort. Ich melde mich in unter 24 Stunden mit Vorschlag und Angebot — unkompliziert und verbindlich." },
        ]}
      />
    </VoltageShell>
  );
}
