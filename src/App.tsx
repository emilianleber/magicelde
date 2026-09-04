import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useNavigate, useParams, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "./components/ScrollToTop.tsx";
import EngagementPopup from "./components/landing/EngagementPopup.tsx";
import TabTitleSwitcher from "./components/TabTitleSwitcher.tsx";
import ShowPlanerTrigger from "./components/landing/ShowPlanerTrigger.tsx";
import EmailReminderBanner from "./components/landing/EmailReminderBanner.tsx";


// Public pages — only loaded on www.magicel.de
const Index = lazy(() => import("./pages/Index.tsx"));
const StartDemo = lazy(() => import("./pages/StartDemo.tsx"));
// Voltage-Prototyp Unterseiten (/demo/*) — noindex
const DemoBuehnenshow = lazy(() => import("./pages/demo/Buehnenshow.tsx"));
const DemoHochzeit = lazy(() => import("./pages/demo/Hochzeit.tsx"));
const DemoUeber = lazy(() => import("./pages/demo/Ueber.tsx"));
const DemoReferenzen = lazy(() => import("./pages/demo/Referenzen.tsx"));
const DemoKontakt = lazy(() => import("./pages/demo/Kontakt.tsx"));
const DemoCloseUp = lazy(() => import("./pages/demo/CloseUp.tsx"));
const DemoMagicDinner = lazy(() => import("./pages/demo/MagicDinner.tsx"));
const DemoModeration = lazy(() => import("./pages/demo/Moderation.tsx"));
const DemoComedy = lazy(() => import("./pages/demo/Comedy.tsx"));
const DemoFirmenfeiern = lazy(() => import("./pages/demo/Firmenfeiern.tsx"));
const DemoGeburtstage = lazy(() => import("./pages/demo/Geburtstage.tsx"));
const DemoEventAgenturen = lazy(() => import("./pages/demo/EventAgenturen.tsx"));
const DemoMesse = lazy(() => import("./pages/demo/Messe.tsx"));
const DemoStadtRegensburg = lazy(() => import("./pages/demo/StadtRegensburg.tsx"));
const Hochzeit = lazy(() => import("./pages/Hochzeit.tsx"));
const Firmenfeiern = lazy(() => import("./pages/Firmenfeiern.tsx"));
const EventAgenturen = lazy(() => import("./pages/EventAgenturen.tsx"));
const MesseMagier = lazy(() => import("./pages/MesseMagier.tsx"));
const Geburtstage = lazy(() => import("./pages/Geburtstage.tsx"));
const Buehnenshow = lazy(() => import("./pages/Buehnenshow.tsx"));
const CloseUp = lazy(() => import("./pages/CloseUp.tsx"));
const MagicDinner = lazy(() => import("./pages/MagicDinner.tsx"));
const Moderation = lazy(() => import("./pages/Moderation.tsx"));
const ComedyZauberei = lazy(() => import("./pages/ComedyZauberei.tsx"));
const UeberMich = lazy(() => import("./pages/UeberMich.tsx"));
const Referenzen = lazy(() => import("./pages/Referenzen.tsx"));
const FAQPage = lazy(() => import("./pages/FAQ.tsx"));
const Presse = lazy(() => import("./pages/Presse.tsx"));
const Kontakt = lazy(() => import("./pages/Kontakt.tsx"));
const Buchung = lazy(() => import("./pages/Buchung.tsx"));
const Danke = lazy(() => import("./pages/Danke.tsx"));
const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));
const Tickets = lazy(() => import("./pages/Tickets.tsx"));
const Datenschutz = lazy(() => import("./pages/Datenschutz.tsx"));
const Impressum = lazy(() => import("./pages/Impressum.tsx"));
const AGB = lazy(() => import("./pages/AGB.tsx"));
const StadtSeite = lazy(() => import("./pages/StadtSeite.tsx"));
const ServiceStadtSeite = lazy(() => import("./pages/ServiceStadtSeite.tsx"));
const WissenSeite = lazy(() => import("./pages/WissenSeite.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();


// Hostname: nur noch localhost-Sonderfall fuer die Demo-Seiten.
const hostname = window.location.hostname;
const IS_DEV = hostname === "localhost" || hostname === "127.0.0.1";


// Globales Public-Chrome (Popup, ShowPlaner, Mail-Banner) — NICHT im Voltage-Prototyp /demo/*
const PublicChrome = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith("/demo")) return null;
  return (
    <>
      <EngagementPopup />
      <ShowPlanerTrigger />
      <EmailReminderBanner />
    </>
  );
};


// ── Oeffentliche Website (magicel.de) ────────────────────────────────────────
const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<StartDemo />} />
    <Route path="/demo" element={<StartDemo />} />
    <Route path="/demo/buehnenshow" element={<DemoBuehnenshow />} />
    <Route path="/demo/close-up" element={<DemoCloseUp />} />
    <Route path="/demo/magic-dinner" element={<DemoMagicDinner />} />
    <Route path="/demo/moderation" element={<DemoModeration />} />
    <Route path="/demo/comedy" element={<DemoComedy />} />
    <Route path="/demo/hochzeit" element={<DemoHochzeit />} />
    <Route path="/demo/firmenfeiern" element={<DemoFirmenfeiern />} />
    <Route path="/demo/geburtstage" element={<DemoGeburtstage />} />
    <Route path="/demo/event-agenturen" element={<DemoEventAgenturen />} />
    <Route path="/demo/messe-magier" element={<DemoMesse />} />
    <Route path="/demo/zauberer-regensburg" element={<DemoStadtRegensburg />} />
    <Route path="/demo/ueber" element={<DemoUeber />} />
    <Route path="/demo/referenzen" element={<DemoReferenzen />} />
    <Route path="/demo/kontakt" element={<DemoKontakt />} />
    <Route path="/hochzeit" element={<Hochzeit />} />
    <Route path="/firmenfeiern" element={<Firmenfeiern />} />
    <Route path="/event-agenturen" element={<EventAgenturen />} />
    <Route path="/messe-magier" element={<MesseMagier />} />
    <Route path="/geburtstage" element={<Geburtstage />} />
    <Route path="/buehnenshow" element={<Buehnenshow />} />
    <Route path="/close-up" element={<CloseUp />} />
    <Route path="/magic-dinner" element={<MagicDinner />} />
    <Route path="/moderation" element={<Moderation />} />
    <Route path="/comedy-zauberei" element={<ComedyZauberei />} />
    <Route path="/ueber-mich" element={<UeberMich />} />
    <Route path="/referenzen" element={<Referenzen />} />
    <Route path="/faq" element={<FAQPage />} />
    <Route path="/presse" element={<Presse />} />
    <Route path="/kontakt" element={<Kontakt />} />
    <Route path="/buchung" element={<Buchung />} />
    <Route path="/danke" element={<Danke />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/blog/:slug" element={<BlogPost />} />
    <Route path="/tickets" element={<Tickets />} />
    <Route path="/datenschutz" element={<Datenschutz />} />
    <Route path="/impressum" element={<Impressum />} />
    <Route path="/agb" element={<AGB />} />
    <Route path="/zauberer/:stadt" element={<StadtSeite />} />
    <Route path="/zauberer-hochzeit/:stadt" element={<ServiceStadtSeite />} />
    <Route path="/zauberer-firmenfeier/:stadt" element={<ServiceStadtSeite />} />
    <Route path="/zauberer-magic-dinner/:stadt" element={<ServiceStadtSeite />} />
    <Route path="/zauberer-close-up/:stadt" element={<ServiceStadtSeite />} />
    <Route path="/zauberer-buehnenshow/:stadt" element={<ServiceStadtSeite />} />
    {/* Neu-Form für Magic Dinner (SEO: keyword-tighter URL "magic-dinner-{stadt}"). */}
    <Route path="/magic-dinner-:stadt" element={<ServiceStadtSeite />} />
    {/* Neu-Form für Bühnenshow (SEO: "zaubershow-{stadt}" matched GSC-Queries). */}
    <Route path="/zaubershow-:stadt" element={<ServiceStadtSeite />} />
    <Route path="/wissen/:slug" element={<WissenSeite />} />
    {/* Block admin on public domain */}
    <Route path="/admin/*" element={<Navigate to="/" replace />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <TabTitleSwitcher />
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
              <div
                className="w-10 h-10 rounded-full border-2 border-foreground/15 border-t-[#1D3FFF] animate-spin"
                aria-label="Lade"
                role="status"
              />
            </div>
          }
        >
          <PublicChrome />
          {IS_DEV ? (
            // localhost: beide Route-Sets verfügbar
            <Routes>
              <Route path="/" element={<StartDemo />} />
              <Route path="/demo" element={<StartDemo />} />
              <Route path="/demo/buehnenshow" element={<DemoBuehnenshow />} />
              <Route path="/demo/close-up" element={<DemoCloseUp />} />
              <Route path="/demo/magic-dinner" element={<DemoMagicDinner />} />
              <Route path="/demo/moderation" element={<DemoModeration />} />
              <Route path="/demo/comedy" element={<DemoComedy />} />
              <Route path="/demo/hochzeit" element={<DemoHochzeit />} />
              <Route path="/demo/firmenfeiern" element={<DemoFirmenfeiern />} />
              <Route path="/demo/geburtstage" element={<DemoGeburtstage />} />
              <Route path="/demo/event-agenturen" element={<DemoEventAgenturen />} />
              <Route path="/demo/messe-magier" element={<DemoMesse />} />
              <Route path="/demo/zauberer-regensburg" element={<DemoStadtRegensburg />} />
              <Route path="/demo/ueber" element={<DemoUeber />} />
              <Route path="/demo/referenzen" element={<DemoReferenzen />} />
              <Route path="/demo/kontakt" element={<DemoKontakt />} />
              <Route path="/hochzeit" element={<Hochzeit />} />
              <Route path="/firmenfeiern" element={<Firmenfeiern />} />
              <Route path="/event-agenturen" element={<EventAgenturen />} />
              <Route path="/messe-magier" element={<MesseMagier />} />
              <Route path="/geburtstage" element={<Geburtstage />} />
              <Route path="/buehnenshow" element={<Buehnenshow />} />
              <Route path="/close-up" element={<CloseUp />} />
              <Route path="/magic-dinner" element={<MagicDinner />} />
              <Route path="/moderation" element={<Moderation />} />
    <Route path="/comedy-zauberei" element={<ComedyZauberei />} />
              <Route path="/ueber-mich" element={<UeberMich />} />
              <Route path="/referenzen" element={<Referenzen />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/presse" element={<Presse />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/buchung" element={<Buchung />} />
              <Route path="/danke" element={<Danke />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/agb" element={<AGB />} />
              <Route path="/zauberer/:stadt" element={<StadtSeite />} />
              <Route path="/zauberer-hochzeit/:stadt" element={<ServiceStadtSeite />} />
              <Route path="/zauberer-firmenfeier/:stadt" element={<ServiceStadtSeite />} />
              <Route path="/zauberer-magic-dinner/:stadt" element={<ServiceStadtSeite />} />
              <Route path="/magic-dinner-:stadt" element={<ServiceStadtSeite />} />
              <Route path="/zaubershow-:stadt" element={<ServiceStadtSeite />} />
              <Route path="/zauberer-close-up/:stadt" element={<ServiceStadtSeite />} />
              <Route path="/zauberer-buehnenshow/:stadt" element={<ServiceStadtSeite />} />
              <Route path="/wissen/:slug" element={<WissenSeite />} />

            </Routes>
          ) : <PublicRoutes />}
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
