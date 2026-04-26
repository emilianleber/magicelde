import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";
import { AdminPersistentShell } from "@/components/admin/AdminLayout";
import ScrollToTop from "./components/ScrollToTop.tsx";
import EngagementPopup from "./components/landing/EngagementPopup.tsx";

// Admin pages — only loaded on admin.magicel.de / localhost
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const AdminKalender = lazy(() => import("@/pages/AdminKalender"));
const AdminLocations = lazy(() => import("@/pages/AdminLocations"));
const AdminArtikel = lazy(() => import("@/pages/AdminArtikel"));
const AdminRequests = lazy(() => import("@/pages/AdminRequests"));
const AdminRequestDetail = lazy(() => import("@/pages/AdminRequestDetail"));
const AdminEvents = lazy(() => import("@/pages/AdminEvents"));
const AdminEventDetail = lazy(() => import("@/pages/AdminEventDetail"));
const AdminNewRequest = lazy(() => import("@/pages/AdminNewRequest"));
const AdminNewEvent = lazy(() => import("@/pages/AdminNewEvent"));
const AdminMails = lazy(() => import("@/pages/AdminMails"));
const AdminCustomers = lazy(() => import("@/pages/AdminCustomers"));
const AdminCustomerDetail = lazy(() => import("@/pages/AdminCustomerDetail"));
const AdminNewCustomer = lazy(() => import("@/pages/AdminNewCustomer"));
const AdminSettings = lazy(() => import("@/pages/AdminSettings"));
const AdminTodos = lazy(() => import("@/pages/AdminTodos"));
const AdminLogin = lazy(() => import("@/pages/AdminLogin"));
const AdminPasswordReset = lazy(() => import("@/pages/AdminPasswordReset"));
const AdminDokumentEditor = lazy(() => import("@/pages/AdminDokumentEditor"));
const AdminDokumentDetail = lazy(() => import("@/pages/AdminDokumentDetail"));
const AdminDokumenteListe = lazy(() => import("@/pages/AdminDokumenteListe"));
const AdminBookings = lazy(() => import("@/pages/AdminBookings"));
const AdminBookingDetail = lazy(() => import("@/pages/AdminBookingDetail"));
const AdminProgrammHub = lazy(() => import("@/pages/AdminProgrammHub"));
const AdminShowsList = lazy(() => import("@/pages/AdminShowsList"));
const AdminShowDetail = lazy(() => import("@/pages/AdminShowDetail"));
const AdminShowEditor = lazy(() => import("@/pages/AdminShowEditor"));
const AdminTouren = lazy(() => import("@/pages/AdminTouren"));
const AdminTourDetail = lazy(() => import("@/pages/AdminTourDetail"));
const AdminEffekteBibliothek = lazy(() => import("@/pages/AdminEffekteBibliothek"));
const AdminMusik = lazy(() => import("@/pages/AdminMusik"));
const AdminTechnik = lazy(() => import("@/pages/AdminTechnik"));
const AdminTeam = lazy(() => import("@/pages/AdminTeam"));
const AdminPakete = lazy(() => import("@/pages/AdminPakete"));

// Public pages — only loaded on www.magicel.de
const Index = lazy(() => import("./pages/Index.tsx"));
const Hochzeit = lazy(() => import("./pages/Hochzeit.tsx"));
const Firmenfeiern = lazy(() => import("./pages/Firmenfeiern.tsx"));
const Geburtstage = lazy(() => import("./pages/Geburtstage.tsx"));
const Buehnenshow = lazy(() => import("./pages/Buehnenshow.tsx"));
const CloseUp = lazy(() => import("./pages/CloseUp.tsx"));
const MagicDinner = lazy(() => import("./pages/MagicDinner.tsx"));
const Moderation = lazy(() => import("./pages/Moderation.tsx"));
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
const KundenportalLogin = lazy(() => import("./pages/KundenportalLogin.tsx"));
const Kundenportal = lazy(() => import("./pages/Kundenportal.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

// Redirect /admin/bookings/event/:id → /admin/bookings/:requestId
const EventToBookingRedirect = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) { navigate("/admin/bookings", { replace: true }); return; }
    supabase.from("portal_requests").select("id").eq("event_id", id).maybeSingle().then(({ data }) => {
      navigate(data?.id ? `/admin/bookings/${data.id}` : "/admin/bookings", { replace: true });
    });
  }, [id, navigate]);
  return <div className="pt-28 text-center text-sm text-muted-foreground">Weiterleitung…</div>;
};

// Hostname detection – admin.magicel.de = CRM only, magicel.de = public + portal
const hostname = window.location.hostname;
const IS_ADMIN_DOMAIN = hostname === "admin.magicel.de";
const IS_DEV = hostname === "localhost" || hostname === "127.0.0.1";

// Catches PASSWORD_RECOVERY event fired from any page
const AuthEventHandler = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        navigate("/admin/passwort-setzen");
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);
  return null;
};

// ── Admin CRM routes (only on admin.magicel.de or localhost) ─────────────────
const AdminRoutes = () => (
  <Routes>
    {/* Login / Passwort – kein Sidebar */}
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin/passwort-setzen" element={<AdminPasswordReset />} />

    {/* Vollbild-Seiten ohne Sidebar */}
    <Route path="/admin/dokumente/new" element={<AdminDokumentEditor />} />
    <Route path="/admin/dokumente/:id/bearbeiten" element={<AdminDokumentEditor />} />
    <Route path="/admin/dokumente/:id" element={<AdminDokumentDetail />} />

    {/* Persistente Shell – Sidebar bleibt immer sichtbar */}
    <Route element={<AdminPersistentShell />}>
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Unified Bookings */}
      <Route path="/admin/bookings" element={<AdminBookings />} />
      <Route path="/admin/bookings/new" element={<AdminNewRequest />} />
      <Route path="/admin/bookings/:id" element={<AdminBookingDetail />} />
      <Route path="/admin/bookings/event/:id" element={<EventToBookingRedirect />} />

      {/* Old routes → redirect */}
      <Route path="/admin/requests" element={<Navigate to="/admin/bookings" replace />} />
      <Route path="/admin/requests/new" element={<Navigate to="/admin/bookings/new" replace />} />
      <Route path="/admin/requests/:id" element={<AdminBookingDetail />} />
      <Route path="/admin/events" element={<Navigate to="/admin/bookings" replace />} />
      <Route path="/admin/events/new" element={<AdminNewEvent />} />
      <Route path="/admin/events/:id" element={<EventToBookingRedirect />} />
      <Route path="/admin/new-request" element={<Navigate to="/admin/bookings/new" replace />} />

      {/* Kunden */}
      <Route path="/admin/customers" element={<AdminCustomers />} />
      <Route path="/admin/customers/:id" element={<AdminCustomerDetail />} />
      <Route path="/admin/customers/new" element={<AdminNewCustomer />} />

      {/* Kalender */}
      <Route path="/admin/kalender" element={<AdminKalender />} />

      {/* Dokumente */}
      <Route path="/admin/dokumente" element={<AdminDokumenteListe />} />
      <Route path="/admin/dokumente/angebote" element={<AdminDokumenteListe />} />
      <Route path="/admin/dokumente/rechnungen" element={<AdminDokumenteListe />} />
      <Route path="/admin/dokumente/auftragsbestaetigung" element={<AdminDokumenteListe />} />
      <Route path="/admin/dokumente/mahnungen" element={<AdminDokumenteListe />} />
      <Route path="/admin/documents" element={<Navigate to="/admin/dokumente" replace />} />
      <Route path="/admin/documents/*" element={<Navigate to="/admin/dokumente" replace />} />

      {/* Mein Programm */}
      <Route path="/admin/programm" element={<AdminProgrammHub />} />
      <Route path="/admin/programm/shows" element={<AdminShowsList />} />
      <Route path="/admin/programm/shows/:id" element={<AdminShowDetail />} />
      <Route path="/admin/programm/shows/:id/edit" element={<AdminShowEditor />} />
      <Route path="/admin/programm/touren" element={<AdminTouren />} />
      <Route path="/admin/programm/touren/:id" element={<AdminTourDetail />} />
      <Route path="/admin/programm/effekte" element={<AdminEffekteBibliothek />} />
      <Route path="/admin/programm/musik" element={<AdminMusik />} />
      <Route path="/admin/programm/technik" element={<AdminTechnik />} />
      <Route path="/admin/programm/locations" element={<AdminLocations />} />
      <Route path="/admin/programm/team" element={<AdminTeam />} />

      {/* Old programm routes → redirect */}
      <Route path="/admin/produktionen" element={<Navigate to="/admin/programm/touren" replace />} />
      <Route path="/admin/partner" element={<Navigate to="/admin/programm/team" replace />} />
      <Route path="/admin/effekte" element={<Navigate to="/admin/programm/effekte" replace />} />
      <Route path="/admin/programm/pakete" element={<AdminPakete />} />
      <Route path="/admin/pakete" element={<Navigate to="/admin/programm/pakete" replace />} />
      <Route path="/admin/shows" element={<Navigate to="/admin/programm/shows" replace />} />
      <Route path="/admin/shows/:id" element={<AdminShowDetail />} />
      <Route path="/admin/locations" element={<Navigate to="/admin/programm/locations" replace />} />

      {/* Einstellungen */}
      <Route path="/admin/settings" element={<AdminSettings />} />
      <Route path="/admin/artikel" element={<AdminArtikel />} />

      {/* Mails & Todos */}
      <Route path="/admin/mails" element={<AdminMails />} />
      <Route path="/admin/todos" element={<AdminTodos />} />

      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Route>
  </Routes>
);

// ── Public website + Kundenportal routes (magicel.de) ────────────────────────
const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/hochzeit" element={<Hochzeit />} />
    <Route path="/firmenfeiern" element={<Firmenfeiern />} />
    <Route path="/geburtstage" element={<Geburtstage />} />
    <Route path="/buehnenshow" element={<Buehnenshow />} />
    <Route path="/close-up" element={<CloseUp />} />
    <Route path="/magic-dinner" element={<MagicDinner />} />
    <Route path="/moderation" element={<Moderation />} />
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
    <Route path="/kundenportal/login" element={<KundenportalLogin />} />
    <Route path="/kundenportal" element={<Kundenportal />} />
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
        <AuthEventHandler />
        <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
          {!IS_ADMIN_DOMAIN && <EngagementPopup />}
          {IS_ADMIN_DOMAIN ? <AdminRoutes /> : IS_DEV ? (
            // localhost: beide Route-Sets verfügbar
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/hochzeit" element={<Hochzeit />} />
              <Route path="/firmenfeiern" element={<Firmenfeiern />} />
              <Route path="/geburtstage" element={<Geburtstage />} />
              <Route path="/buehnenshow" element={<Buehnenshow />} />
              <Route path="/close-up" element={<CloseUp />} />
              <Route path="/magic-dinner" element={<MagicDinner />} />
              <Route path="/moderation" element={<Moderation />} />
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
              <Route path="/kundenportal/login" element={<KundenportalLogin />} />
              <Route path="/kundenportal" element={<Kundenportal />} />

              {/* Login / Passwort ohne Shell */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/passwort-setzen" element={<AdminPasswordReset />} />

              {/* Vollbild-Seiten ohne Shell */}
              <Route path="/admin/dokumente/new" element={<AdminDokumentEditor />} />
              <Route path="/admin/dokumente/:id/bearbeiten" element={<AdminDokumentEditor />} />
              <Route path="/admin/dokumente/:id" element={<AdminDokumentDetail />} />

              {/* Persistente Shell */}
              <Route element={<AdminPersistentShell />}>
                <Route path="/admin" element={<AdminDashboard />} />
                {/* Unified Bookings */}
                <Route path="/admin/bookings" element={<AdminBookings />} />
                <Route path="/admin/bookings/new" element={<AdminNewRequest />} />
                <Route path="/admin/bookings/:id" element={<AdminBookingDetail />} />
                <Route path="/admin/bookings/event/:id" element={<EventToBookingRedirect />} />
                {/* Old routes redirect */}
                <Route path="/admin/requests" element={<Navigate to="/admin/bookings" replace />} />
                <Route path="/admin/requests/new" element={<Navigate to="/admin/bookings/new" replace />} />
                <Route path="/admin/requests/:id" element={<AdminBookingDetail />} />
                <Route path="/admin/events" element={<Navigate to="/admin/bookings" replace />} />
                <Route path="/admin/events/new" element={<AdminNewEvent />} />
                <Route path="/admin/events/:id" element={<EventToBookingRedirect />} />
                <Route path="/admin/new-request" element={<Navigate to="/admin/bookings/new" replace />} />
                {/* Kunden */}
                <Route path="/admin/customers" element={<AdminCustomers />} />
                <Route path="/admin/customers/:id" element={<AdminCustomerDetail />} />
                <Route path="/admin/customers/new" element={<AdminNewCustomer />} />
                {/* Kalender + Dokumente */}
                <Route path="/admin/kalender" element={<AdminKalender />} />
                <Route path="/admin/dokumente" element={<AdminDokumenteListe />} />
                <Route path="/admin/dokumente/angebote" element={<AdminDokumenteListe />} />
                <Route path="/admin/dokumente/rechnungen" element={<AdminDokumenteListe />} />
                <Route path="/admin/dokumente/auftragsbestaetigung" element={<AdminDokumenteListe />} />
                <Route path="/admin/dokumente/mahnungen" element={<AdminDokumenteListe />} />
                <Route path="/admin/documents" element={<Navigate to="/admin/dokumente" replace />} />
                <Route path="/admin/documents/*" element={<Navigate to="/admin/dokumente" replace />} />
                {/* Mein Programm */}
                <Route path="/admin/programm" element={<AdminProgrammHub />} />
                <Route path="/admin/programm/shows" element={<AdminShowsList />} />
                <Route path="/admin/programm/shows/:id" element={<AdminShowDetail />} />
                <Route path="/admin/programm/shows/:id/edit" element={<AdminShowEditor />} />
                <Route path="/admin/programm/touren" element={<AdminTouren />} />
                <Route path="/admin/programm/touren/:id" element={<AdminTourDetail />} />
                <Route path="/admin/programm/effekte" element={<AdminEffekteBibliothek />} />
                <Route path="/admin/programm/musik" element={<AdminMusik />} />
                <Route path="/admin/programm/technik" element={<AdminTechnik />} />
                <Route path="/admin/programm/locations" element={<AdminLocations />} />
                <Route path="/admin/programm/team" element={<AdminTeam />} />
                {/* Old programm routes → redirect */}
                <Route path="/admin/produktionen" element={<Navigate to="/admin/programm/touren" replace />} />
                <Route path="/admin/partner" element={<Navigate to="/admin/programm/team" replace />} />
                <Route path="/admin/effekte" element={<Navigate to="/admin/programm/effekte" replace />} />
                <Route path="/admin/programm/pakete" element={<AdminPakete />} />
                <Route path="/admin/pakete" element={<Navigate to="/admin/programm/pakete" replace />} />
                <Route path="/admin/shows" element={<Navigate to="/admin/programm/shows" replace />} />
                <Route path="/admin/shows/:id" element={<AdminShowDetail />} />
                <Route path="/admin/locations" element={<Navigate to="/admin/programm/locations" replace />} />
                {/* Einstellungen */}
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="/admin/artikel" element={<AdminArtikel />} />
                {/* Mails & Todos */}
                <Route path="/admin/mails" element={<AdminMails />} />
                <Route path="/admin/todos" element={<AdminTodos />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          ) : <PublicRoutes />}
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
