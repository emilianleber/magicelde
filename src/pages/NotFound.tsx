import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import PageLayout from "@/components/landing/PageLayout";

const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageLayout>
      <section className="min-h-screen flex flex-col justify-center">
        <div className="container px-6 pt-28 pb-16">
          <div className="max-w-2xl mx-auto text-center">
            <span className="font-display text-8xl font-bold text-accent/20">404</span>
            <h1 className="headline-section text-foreground mt-4 mb-6">Seite nicht gefunden.</h1>
            <p className="text-body max-w-md mx-auto mb-10">
              Die Seite, die du suchst, existiert leider nicht. Vielleicht ist sie umgezogen — oder sie war nie hier.
            </p>
            <Link to="/" className="btn-primary">
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default NotFound;
