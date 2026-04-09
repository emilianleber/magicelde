import AdminDashboard from "@/pages/AdminDashboard";
import AdminKalender from "@/pages/AdminKalender";
import AdminLocations from "@/pages/AdminLocations";
import AdminArtikel from "@/pages/AdminArtikel";
import AdminRequests from "@/pages/AdminRequests";
import AdminRequestDetail from "@/pages/AdminRequestDetail";
import AdminEvents from "@/pages/AdminEvents";
import AdminEventDetail from "@/pages/AdminEventDetail";
import AdminNewRequest from "@/pages/AdminNewRequest";
import AdminNewEvent from "@/pages/AdminNewEvent";
import AdminMails from "@/pages/AdminMails";
import AdminCustomers from "@/pages/AdminCustomers";
import AdminCustomerDetail from "@/pages/AdminCustomerDetail";
import AdminNewCustomer from "@/pages/AdminNewCustomer";
import AdminSettings from "@/pages/AdminSettings";
import AdminTodos from "@/pages/AdminTodos";
import AdminDocuments from "@/pages/AdminDocuments";
import AdminLogin from "@/pages/AdminLogin";
import AdminPasswordReset from "@/pages/AdminPasswordReset";
import AdminDokumentEditor from "@/pages/AdminDokumentEditor";
import AdminDokumentDetail from "@/pages/AdminDokumentDetail";
import AdminDokumenteListe from "@/pages/AdminDokumenteListe";
import AdminBookings from "@/pages/AdminBookings";
import AdminBookingDetail from "@/pages/AdminBookingDetail";
import AdminProgrammHub from "@/pages/AdminProgrammHub";
import AdminShowsList from "@/pages/AdminShowsList";
import AdminShowDetail from "@/pages/AdminShowDetail";
import AdminTouren from "@/pages/AdminTouren";
import AdminTourDetail from "@/pages/AdminTourDetail";
import AdminEffekteBibliothek from "@/pages/AdminEffekteBibliothek";
import AdminTeam from "@/pages/AdminTeam";

import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index.tsx";
import Hochzeit from "./pages/Hochzeit.tsx";
import Firmenfeiern from "./pages/Firmenfeiern.tsx";
import Geburtstage from "./pages/Geburtstage.tsx";
import Buehnenshow from "./pages/Buehnenshow.tsx";
import CloseUp from "./pages/CloseUp.tsx";
import MagicDinner from "./pages/MagicDinner.tsx";
import Moderation from "./pages/Moderation.tsx";
import UeberMich from "./pages/UeberMich.tsx";
import Referenzen from "./pages/Referenzen.tsx";
import FAQPage from "./pages/FAQ.tsx";
import Presse from "./pages/Presse.tsx";
import Kontakt from "./pages/Kontakt.tsx";
import Buchung from "./pages/Buchung.tsx";
import Danke from "./pages/Danke.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import Tickets from "./pages/Tickets.tsx";
import Datenschutz from "./pages/Datenschutz.tsx";
import Impressum from "./pages/Impressum.tsx";
import AGB from "./pages/AGB.tsx";
import StadtSeite from "./pages/StadtSeite.tsx";

import KundenportalLogin from "./pages/KundenportalLogin.tsx";
import Kundenportal from "./pages/Kundenportal.tsx";

import NotFound from "./pages/NotFound.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import { supabase } from "@/integrations/supabase/client";
import { AdminPersistentShell } from "@/components/admin/AdminLayout";

const queryClient = new QueryClient();

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
// AdminPersistentShell wraps all sidebar-pages so the sidebar NEVER remounts.
// Editor + Detail have their own full-screen UI → outside the shell.
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
      <Route path="/admin/bookings/event/:id" element={<AdminEventDetail />} />

      {/* Old routes → redirect */}
      <Route path="/admin/requests" element={<Navigate to="/admin/bookings" replace />} />
      <Route path="/admin/requests/new" element={<Navigate to="/admin/bookings/new" replace />} />
      <Route path="/admin/requests/:id" element={<AdminRequestDetail />} />
      <Route path="/admin/events" element={<Navigate to="/admin/bookings" replace />} />
      <Route path="/admin/events/new" element={<AdminNewEvent />} />
      <Route path="/admin/events/:id" element={<AdminEventDetail />} />
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
      <Route path="/admin/programm/touren" element={<AdminTouren />} />
      <Route path="/admin/programm/touren/:id" element={<AdminTourDetail />} />
      <Route path="/admin/programm/effekte" element={<AdminEffekteBibliothek />} />
      <Route path="/admin/programm/locations" element={<AdminLocations />} />
      <Route path="/admin/programm/team" element={<AdminTeam />} />

      {/* Old programm routes → redirect */}
      <Route path="/admin/produktionen" element={<Navigate to="/admin/programm/touren" replace />} />
      <Route path="/admin/partner" element={<Navigate to="/admin/programm/team" replace />} />
      <Route path="/admin/effekte" element={<Navigate to="/admin/programm/effekte" replace />} />
      <Route path="/admin/pakete" element={<Navigate to="/admin/programm/shows" replace />} />
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
              <Route path="/admin/bookings/event/:id" element={<AdminEventDetail />} />
              {/* Old routes redirect */}
              <Route path="/admin/requests" element={<Navigate to="/admin/bookings" replace />} />
              <Route path="/admin/requests/new" element={<Navigate to="/admin/bookings/new" replace />} />
              <Route path="/admin/requests/:id" element={<AdminRequestDetail />} />
              <Route path="/admin/events" element={<Navigate to="/admin/bookings" replace />} />
              <Route path="/admin/events/new" element={<AdminNewEvent />} />
              <Route path="/admin/events/:id" element={<AdminEventDetail />} />
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
              <Route path="/admin/programm/touren" element={<AdminTouren />} />
              <Route path="/admin/programm/touren/:id" element={<AdminTourDetail />} />
              <Route path="/admin/programm/effekte" element={<AdminEffekteBibliothek />} />
              <Route path="/admin/programm/locations" element={<AdminLocations />} />
              <Route path="/admin/programm/team" element={<AdminTeam />} />

              {/* Old programm routes → redirect */}
              <Route path="/admin/produktionen" element={<Navigate to="/admin/programm/touren" replace />} />
              <Route path="/admin/partner" element={<Navigate to="/admin/programm/team" replace />} />
              <Route path="/admin/effekte" element={<Navigate to="/admin/programm/effekte" replace />} />
              <Route path="/admin/pakete" element={<Navigate to="/admin/programm/shows" replace />} />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
