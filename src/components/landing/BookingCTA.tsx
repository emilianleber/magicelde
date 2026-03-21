import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface BookingCTAProps {
  headline?: string;
  subline?: string;
  buttonText?: string;
  hint?: string;
}

const BookingCTA = ({
  headline = "Mach dein Event\nunvergesslich.",
  subline = "Erzähl mir von deinem Event — ich entwickle ein maßgeschneidertes Konzept, das deine Gäste begeistert.",
  buttonText = "Jetzt unverbindlich anfragen",
  hint = "Kostenlos · Unverbindlich · Antwort innerhalb 24h",
}: BookingCTAProps) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-full" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Bereit?</span>
          <h2 className="headline-hero text-foreground mb-8 whitespace-pre-line">
            {headline}
          </h2>
          <p className="text-body max-w-lg mx-auto mb-12">{subline}</p>
          <Link to="/buchung" className="btn-primary btn-large group">
            {buttonText}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="font-sans text-xs text-muted-foreground/40 mt-6 tracking-wide">{hint}</p>
        </div>
      </div>
    </section>
  );
};

export default BookingCTA;
