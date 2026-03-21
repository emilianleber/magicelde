import { useScrollReveal } from "@/hooks/useScrollReveal";

const USPSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <span className="badge-blue mb-8 inline-flex">Warum MagicEL</span>
          </div>
          <h2
            className={`headline-section text-foreground mb-8 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
            style={{ animationDelay: "0.12s" }}
          >
            Nicht nur Zauberei.
          </h2>
          <p
            className={`text-body max-w-xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}
            style={{ animationDelay: "0.24s" }}
          >
            Modern, interaktiv, individuell — Entertainment, das Menschen verbindet,
            statt sie nur zu unterhalten.
          </p>
        </div>

        {/* 4 keywords — super minimal */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-px mt-24 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          style={{ animationDelay: "0.36s" }}
        >
          {[
            { word: "Interaktiv", sub: "Deine Gäste sind Teil der Show." },
            { word: "Individuell", sub: "Kein Programm von der Stange." },
            { word: "Professionell", sub: "Hunderte erfolgreiche Auftritte." },
            { word: "Humorvoll", sub: "Entertainment mit Charme." },
          ].map((item, i) => (
            <div
              key={item.word}
              className="text-center py-12 px-6"
            >
              <h3 className="font-display text-2xl md:text-3xl italic text-foreground mb-3">
                {item.word}
              </h3>
              <p className="text-detail max-w-[200px] mx-auto">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USPSection;
