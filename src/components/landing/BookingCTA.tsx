import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";

interface BookingCTAProps {
  headline?: string;
  subline?: string;
  buttonText?: string;
  hint?: string;
}

const BookingCTA = ({
  headline = "Mach dein Event\nunvergesslich.",
  subline = "Erzähl mir von deinem Event — ich entwickle ein Konzept für dich.",
  buttonText = "Jetzt unverbindlich anfragen",
  hint = "Kostenlos · Unverbindlich · Antwort innerhalb 24h",
}: BookingCTAProps) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="kontakt" className="section-full" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-hero text-foreground mb-8 whitespace-pre-line">
            {headline}
          </h2>
          <p className="text-body max-w-md mx-auto mb-12">{subline}</p>
          <Link
            to="/buchung"
            className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-foreground font-sans text-base font-medium text-background transition-all duration-300 hover:bg-foreground/85 hover:shadow-[0_12px_40px_hsla(0,0%,0%,0.12)] active:scale-[0.97]"
          >
            {buttonText}
          </Link>
          <p className="font-sans text-xs text-muted-foreground/50 mt-6">{hint}</p>
        </div>
      </div>
    </section>
  );
};

export default BookingCTA;
